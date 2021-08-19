exports.formatCategoryData = (categoryData) => {
  return categoryData.map((category) => {
    return [category.slug, category.description];
  });
};

exports.formatUserData = (userData) => {
  return userData.map((user) => {
    return [user.username, user.name, user.avatar_url];
  });
};

exports.formatReviewData = (reviewData) => {
  return reviewData.map((review) => {
    return [
      review.title,
      review.review_body,
      review.designer,
      review.review_img_url
        ? review.review_img_url
        : 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      review.votes,
      review.category,
      review.owner,
      review.created_at,
    ];
  });
};

exports.createReviewRef = (reviewData) => {
  const reviewRef = {};
  reviewData.forEach((review) => {
    reviewRef[review.title] = review.review_id;
  });
  return reviewRef;
};

exports.formatCommentData = (commentData, reviewRef) => {
  return commentData.map((comment) => {
    return [
      comment.created_by,
      reviewRef[comment.belongs_to],
      comment.votes,
      comment.created_at,
      comment.body,
    ];
  });
};
