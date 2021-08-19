const db = require('../../db/connection');

exports.deleteCommentById = async (commentId) => {
  const result = await db.query(
    `
    DELETE 
    FROM comments
    WHERE comment_id = $1
    RETURNING *;
    `,
    [commentId]
  );
  if (result.rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: 'bad request: valid id type but out of range',
    });
  }
  return result.rows[0];
};

exports.updateCommentById = async (commentId, reqBody) => {
  const commentPatch = reqBody.inc_votes;
  if (typeof commentPatch !== 'number') {
    return Promise.reject({
      status: 400,
      msg: 'bad request: invalid request body',
    });
  }
  const result = await db.query(
    `
    UPDATE comments
    SET votes = votes + $1
    WHERE comment_id = $2
    RETURNING *;
  `,
    [commentPatch, commentId]
  );
  if (result.rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: 'bad request: valid id type but out of range',
    });
  }
  return result.rows[0];
};
