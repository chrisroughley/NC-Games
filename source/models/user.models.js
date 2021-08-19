const db = require('../../db/connection');

exports.selectUsers = async () => {
  result = await db.query(`
    SELECT * FROM users;
  `);

  return result.rows;
};

exports.selectUserByUsername = async (username) => {
  result = await db.query(
    `
    SELECT * FROM users
    WHERE username = $1;
  `,
    [username]
  );
  if (result.rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: 'bad request: username does not exist',
    });
  }
  return result.rows[0];
};
