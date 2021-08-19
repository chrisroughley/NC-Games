const format = require('pg-format');
const db = require('../connection');
const {
  formatCategoryData,
  formatUserData,
  formatReviewData,
  createReviewRef,
  formatCommentData,
} = require('../../utils/db-utils/data-manipulation');

const seed = async (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  await db.query(`
    DROP TABLE IF EXISTS comments;
    `);
  await db.query(`
    DROP TABLE IF EXISTS reviews;
    `);
  await db.query(`
    DROP TABLE IF EXISTS users;
    `);
  await db.query(`
    DROP TABLE IF EXISTS categories;
    `);
  await db.query(`
    CREATE TABLE categories(
      slug VARCHAR(500) PRIMARY KEY NOT NULL,
      description VARCHAR(2000) NOT NULL
    );`);
  await db.query(`
    CREATE TABLE users(
      username VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT  NULL,
      avatar_url VARCHAR(1027)
    );`);
  await db.query(`
    CREATE TABLE reviews(
      review_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      review_body VARCHAR(2055) NOT NULL,
      designer VARCHAR(255),
      review_img_url VARCHAR(1027),
      votes INT DEFAULT 0,
      category VARCHAR(500) REFERENCES categories(slug) NOT NULL,
      owner VARCHAR(255) REFERENCES users(username) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );`);
  await db.query(`
    CREATE TABLE comments(
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR(255) REFERENCES users(username) NOT NULL,
      review_id INT REFERENCES reviews(review_id) ON DELETE CASCADE NOT NULL,
      votes INT DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      body VARCHAR(4112) NOT NULL
    );`);

  const categoryValues = formatCategoryData(categoryData);
  const insertCategories = format(
    `INSERT INTO categories
      (slug, description)
    VALUES
      %L;
    `,
    categoryValues
  );
  await db.query(insertCategories);
  const userValues = formatUserData(userData);
  const insertUsers = format(
    `INSERT INTO users
      (username,name,avatar_url)
    VALUES
      %L
    `,
    userValues
  );
  await db.query(insertUsers);

  const reviewValues = formatReviewData(reviewData);
  const insertReviews = format(
    `INSERT INTO reviews
    (
      title,
      review_body,
      designer,
      review_img_url,
      votes,
      category,
      owner,
      created_at
    )
    VALUES
      %L
    RETURNING *
  `,
    reviewValues
  );
  const response = await db.query(insertReviews);

  const reviewRef = createReviewRef(response.rows);
  const commentValues = formatCommentData(commentData, reviewRef);
  const insertComments = format(
    `INSERT INTO comments
    (
      author,
      review_id,
      votes,
      created_at,
      body
    )
    VALUES
      %L;
    `,
    commentValues
  );
  await db.query(insertComments);
};

module.exports = seed;
