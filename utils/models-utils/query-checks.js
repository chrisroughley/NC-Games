const db = require('../../db/connection');

exports.checkCategoryExists = async (category) => {
  const response = await db.query(
    `
    SELECT * FROM categories
    WHERE slug = $1`,
    [category]
  );
  if (response.rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: 'bad request: category does not exist',
    });
  }
};

exports.checkReviewExists = async (reviewId) => {
  const response = await db.query(
    `
    SELECT * FROM reviews
    WHERE review_id = $1`,
    [reviewId]
  );
  if (response.rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: 'bad request: valid id type but out of range',
    });
  }
};

exports.checkUsernameExists = async (username) => {
  const response = await db.query(
    `
    SELECT * FROM users
    WHERE username = $1;
    `,
    [username]
  );
  if (response.rows.length === 0) {
    return Promise.reject({
      status: 400,
      msg: 'bad request: username does not exist',
    });
  }
};
