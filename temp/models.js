const db = require('../../db/connection');
const {
  checkCategoryExists,
  checkReviewExists,
  checkUsernameExists,
} = require('../../utils/models-utils/query-checks');

exports.selectCategories = async () => {
  const result = await db.query(`SELECT * FROM categories;`);
  return result.rows;
};

exports.selectReviews = async (
  sortBy = 'created_at',
  order = 'DESC',
  category
) => {
  const validColumns = [
    'title',
    'designer',
    'owner',
    'review_body',
    'category',
    'created_at',
    'votes',
    'review_img_url',
  ];
  const validOrder = ['ASC', 'DESC'];
  if (!validColumns.includes(sortBy)) {
    return Promise.reject({
      status: 400,
      msg: 'bad request: column does not exist',
    });
  }
  if (!validOrder.includes(order.toUpperCase())) {
    return Promise.reject({
      status: 400,
      msg: 'bad request: invalid order query',
    });
  }
  let result = '';
  let queryStr = `SELECT 
                    reviews.owner,
                    reviews.title,
                    reviews.review_id,
                    reviews.category,
                    review_img_url,
                    reviews.created_at,
                    reviews.votes,
                    COUNT(comment_id)::INTEGER AS comment_count
                  FROM reviews
                  LEFT JOIN comments ON comments.review_id = reviews.review_id`;
  if (category) {
    queryStr += ` WHERE category = $1
                  GROUP BY reviews.review_id ORDER BY ${sortBy} ${order};`;
    result = await db.query(queryStr, [category]);
  } else {
    queryStr += ` GROUP BY reviews.review_id ORDER BY ${sortBy} ${order};`;
    result = await db.query(queryStr);
  }

  if (result.rows.length === 0 && category) {
    await checkCategoryExists(category);
    return 'currently no reviews for this category';
  }

  return result.rows;
};

exports.selectReviewById = async (reviewId) => {
  const result = await db.query(
    `
    SELECT 
      reviews.*,
      COUNT(comment_id)::INTEGER AS comment_count 
    FROM reviews
    LEFT JOIN comments ON comments.review_id = reviews.review_id 
    WHERE reviews.review_id = $1
    GROUP BY reviews.review_id, comments.comment_id`,
    [reviewId]
  );
  if (result.rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: 'bad request: valid id type but out of range',
    });
  }
  return result.rows[0];
};

exports.updateReviewById = async (reviewId, reqBody) => {
  const reviewPatch = reqBody.inc_votes;
  if (typeof reviewPatch !== 'number') {
    return Promise.reject({
      status: 400,
      msg: 'bad request: invalid request body',
    });
  }
  const result = await db.query(
    `
      UPDATE reviews
      SET votes = votes + $1
      WHERE review_id = $2
      RETURNING *`,
    [reviewPatch, reviewId]
  );

  if (result.rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: 'bad request: valid type but out of range',
    });
  }
  return result.rows[0];
};

exports.selectCommentsByReviewId = async (reviewId) => {
  const result = await db.query(
    `
  SELECT 
    comment_id,
    votes,
    created_at,
    body,
    users.username AS author
  FROM comments
  LEFT JOIN users ON users.username = comments.author
  WHERE review_id = $1
  `,
    [reviewId]
  );
  if (result.rows.length === 0) {
    await checkReviewExists(reviewId);
    return 'currently no comments for this review';
  }
  return result.rows;
};

exports.insertCommentByReviewId = async (reviewId, comment) => {
  if (!comment.username || !comment.body) {
    return Promise.reject({
      status: 400,
      msg: 'bad request: missing body',
    });
  }
  await checkUsernameExists(comment.username);
  await checkReviewExists(reviewId);
  const result = await db.query(
    `
    INSERT INTO comments
      (author, review_id, body)
    VALUES
      ($1,$2,$3)
    RETURNING *;  
  `,
    [comment.username, reviewId, comment.body]
  );

  return result.rows[0];
};
