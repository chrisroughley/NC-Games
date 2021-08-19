const {
  formatCategoryData,
  formatUserData,
  formatReviewData,
  createReviewRef,
  formatCommentData,
} = require('../utils/db-utils/data-manipulation');

describe('formatCategoryData', () => {
  test('returns a new array', () => {
    const CategoryData = [
      {
        slug: 'strategy',
        description:
          'Strategy-focused board games that prioritise limited-randomness',
      },
    ];
    expect(Array.isArray(formatCategoryData(CategoryData))).toBe(true);
    expect(formatCategoryData(CategoryData)).not.toBe(CategoryData);
  });
  test('does not mutate input array', () => {
    const CategoryData = [
      {
        slug: 'strategy',
        description:
          'Strategy-focused board games that prioritise limited-randomness',
      },
    ];
    formatCategoryData(CategoryData);
    expect(CategoryData).toEqual([
      {
        slug: 'strategy',
        description:
          'Strategy-focused board games that prioritise limited-randomness',
      },
    ]);
  });
  test('objects contained in returned array are new', () => {
    const CategoryData = [
      {
        slug: 'strategy',
        description:
          'Strategy-focused board games that prioritise limited-randomness',
      },
    ];
    expect(formatCategoryData(CategoryData)[0]).not.toBe(CategoryData[0]);
  });
  test('when passed an array containing one Category object returns returns object values in nested array', () => {
    const CategoryData = [
      {
        slug: 'strategy',
        description:
          'Strategy-focused board games that prioritise limited-randomness',
      },
    ];
    expect(formatCategoryData(CategoryData)[0]).toEqual([
      'strategy',
      'Strategy-focused board games that prioritise limited-randomness',
    ]);
  });
  test('works for array containing multiple objects', () => {
    const CategoryData = [
      {
        slug: 'strategy',
        description:
          'Strategy-focused board games that prioritise limited-randomness',
      },
      {
        slug: 'hidden-roles',
        description:
          "One or more players around the table have a secret, and the rest of you need to figure out who! Players attempt to uncover each other's hidden role",
      },
    ];
    expect(formatCategoryData(CategoryData)[0]).toEqual([
      'strategy',
      'Strategy-focused board games that prioritise limited-randomness',
    ]);
    expect(formatCategoryData(CategoryData)[1]).toEqual([
      'hidden-roles',
      "One or more players around the table have a secret, and the rest of you need to figure out who! Players attempt to uncover each other's hidden role",
    ]);
  });
});

describe('formatUserData', () => {
  test('returns a new array', () => {
    const userData = [
      {
        username: 'tickle122',
        name: 'Tom Tickle',
        avatar_url:
          'https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg',
      },
    ];
    expect(Array.isArray(formatUserData(userData))).toBe(true);
    expect(formatUserData(userData)).not.toBe(userData);
  });
  test('does not mutate input array', () => {
    const userData = [
      {
        username: 'tickle122',
        name: 'Tom Tickle',
        avatar_url:
          'https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg',
      },
    ];
    formatUserData(userData);
    expect(userData).toEqual([
      {
        username: 'tickle122',
        name: 'Tom Tickle',
        avatar_url:
          'https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg',
      },
    ]);
  });
  test('objects contained in returned array are new', () => {
    const userData = [
      {
        username: 'tickle122',
        name: 'Tom Tickle',
        avatar_url:
          'https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg',
      },
    ];
    expect(formatUserData(userData)[0]).not.toBe(userData[0]);
  });
  test('when passed an array containing one User object returns returns object values in nested array', () => {
    const userData = [
      {
        username: 'tickle122',
        name: 'Tom Tickle',
        avatar_url:
          'https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg',
      },
    ];
    expect(formatUserData(userData)[0]).toEqual([
      'tickle122',
      'Tom Tickle',
      'https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg',
    ]);
  });
  test('works for array containing multiple objects', () => {
    const userData = [
      {
        username: 'tickle122',
        name: 'Tom Tickle',
        avatar_url:
          'https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg',
      },
      {
        username: 'grumpy19',
        name: 'Paul Grump',
        avatar_url:
          'https://www.tumbit.com/profile-image/4/original/mr-grumpy.jpg',
      },
    ];
    expect(formatUserData(userData)[0]).toEqual([
      'tickle122',
      'Tom Tickle',
      'https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg',
    ]);
    expect(formatUserData(userData)[1]).toEqual([
      'grumpy19',
      'Paul Grump',
      'https://www.tumbit.com/profile-image/4/original/mr-grumpy.jpg',
    ]);
  });
});

describe('formatReviewData', () => {
  test('returns a new array', () => {
    const reviewData = [
      {
        title: 'Agricola',
        designer: 'Uwe Rosenberg',
        owner: 'mallionaire',
        review_body: 'Farmyard fun!',
        category: 'euro game',
        created_at: new Date(1610964020514),
        votes: 1,
        review_img_url:
          'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
      },
    ];
    expect(Array.isArray(formatReviewData(reviewData))).toBe(true);
    expect(formatReviewData(reviewData)).not.toBe(reviewData);
  });
  test('does not mutate input array', () => {
    const reviewData = [
      {
        title: 'Agricola',
        designer: 'Uwe Rosenberg',
        owner: 'mallionaire',
        review_body: 'Farmyard fun!',
        category: 'euro game',
        created_at: new Date(1610964020514),
        votes: 1,
        review_img_url:
          'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
      },
    ];
    formatReviewData(reviewData);
    expect(reviewData).toEqual([
      {
        title: 'Agricola',
        designer: 'Uwe Rosenberg',
        owner: 'mallionaire',
        review_body: 'Farmyard fun!',
        category: 'euro game',
        created_at: new Date(1610964020514),
        votes: 1,
        review_img_url:
          'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
      },
    ]);
  });
  test('when passed an array containing one User object returns returns object values in nested array', () => {
    const reviewData = [
      {
        title: 'Agricola',
        designer: 'Uwe Rosenberg',
        owner: 'mallionaire',
        review_body: 'Farmyard fun!',
        category: 'euro game',
        created_at: new Date(1610964020514),
        votes: 1,
        review_img_url:
          'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
      },
    ];
    expect(formatReviewData(reviewData)[0]).toEqual([
      'Agricola',
      'Farmyard fun!',
      'Uwe Rosenberg',
      'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
      1,
      'euro game',
      'mallionaire',
      new Date(1610964020514),
    ]);
  });
  test('works for array containing multiple objects', () => {
    const reviewData = [
      {
        title: 'Agricola',
        designer: 'Uwe Rosenberg',
        owner: 'mallionaire',
        review_body: 'Farmyard fun!',
        category: 'euro game',
        created_at: new Date(1610964020514),
        votes: 1,
        review_img_url:
          'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
      },
      {
        title: 'Jenga',
        designer: 'Leslie Scott',
        owner: 'philippaclaire9',
        review_body: 'Fiddly fun for all the family',
        category: 'dexterity',
        created_at: new Date(1610964101251),
        votes: 5,
        review_img_url:
          'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
      },
    ];
    expect(formatReviewData(reviewData)[0]).toEqual([
      'Agricola',
      'Farmyard fun!',
      'Uwe Rosenberg',
      'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
      1,
      'euro game',
      'mallionaire',
      new Date(1610964020514),
    ]);
    expect(formatReviewData(reviewData)[1]).toEqual([
      'Jenga',
      'Fiddly fun for all the family',
      'Leslie Scott',
      'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
      5,
      'dexterity',
      'philippaclaire9',
      new Date(1610964101251),
    ]);
  });
  test('inserts default img url when non present in input data', () => {
    const reviewData = [
      {
        title: 'Agricola',
        designer: 'Uwe Rosenberg',
        owner: 'mallionaire',
        review_body: 'Farmyard fun!',
        category: 'euro game',
        created_at: new Date(1610964020514),
        votes: 1,
      },
    ];
    expect(formatReviewData(reviewData)[0]).toEqual([
      'Agricola',
      'Farmyard fun!',
      'Uwe Rosenberg',
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      1,
      'euro game',
      'mallionaire',
      new Date(1610964020514),
    ]);
  });
});

describe('createReviewRef', () => {
  test('does no mutate input array', () => {
    const reviewData = [
      {
        review_id: 1,
        title: 'Culture a Love of Agriculture With Agricola',
        designer: 'Uwe Rosenberg',
        owner: 'tickle122',
        review_img_url:
          'https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        review_body:
          "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
        category: 'strategy',
        created_at: new Date(1610964020514),
        votes: 1,
      },
    ];
    createReviewRef(reviewData);
    expect(reviewData).toEqual([
      {
        review_id: 1,
        title: 'Culture a Love of Agriculture With Agricola',
        designer: 'Uwe Rosenberg',
        owner: 'tickle122',
        review_img_url:
          'https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        review_body:
          "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
        category: 'strategy',
        created_at: new Date(1610964020514),
        votes: 1,
      },
    ]);
  });
  test('objects contained in returned array should have a key equal to the  value of title and this key should have a value of the review_id', () => {
    const reviewData = [
      {
        review_id: 1,
        title: 'Culture a Love of Agriculture With Agricola',
        designer: 'Uwe Rosenberg',
        owner: 'tickle122',
        review_img_url:
          'https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        review_body:
          "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
        category: 'strategy',
        created_at: new Date(1610964020514),
        votes: 1,
      },
    ];
    expect(createReviewRef(reviewData)).toEqual({
      'Culture a Love of Agriculture With Agricola': 1,
    });
  });
  test('works for array containing multiple objects', () => {
    const reviewData = [
      {
        review_id: 1,
        title: 'Culture a Love of Agriculture With Agricola',
        designer: 'Uwe Rosenberg',
        owner: 'tickle122',
        review_img_url:
          'https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        review_body:
          "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
        category: 'strategy',
        created_at: new Date(1610964020514),
        votes: 1,
      },
      {
        review_id: 2,
        title: 'JengARRGGGH!',
        designer: 'Leslie Scott',
        owner: 'grumpy19',
        review_img_url:
          'https://images.pexels.com/photos/4009761/pexels-photo-4009761.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        review_body:
          "Few games are equiped to fill a player with such a defined sense of mild-peril, but a friendly game of Jenga will turn the mustn't-make-it-fall anxiety all the way up to 11! Fiddly fun for all the family, this game needs little explaination. Whether you're a player who chooses to play it safe, or one who lives life on the edge, eventually the removal of blocks will destabilise the tower and all your Jenga dreams come tumbling down.",
        category: 'dexterity',
        created_at: new Date(1610964101251),
        votes: 5,
      },
    ];
    expect(createReviewRef(reviewData)).toEqual({
      'Culture a Love of Agriculture With Agricola': 1,
      'JengARRGGGH!': 2,
    });
  });
});

describe('formatCommentData', () => {
  test('returns a new array', () => {
    const commentData = [
      {
        body: 'I loved this game too!',
        belongs_to: 'JengARRGGGH!',
        created_by: 'happyamy2016',
        votes: 16,
        created_at: new Date(1511354163389),
      },
    ];
    const reviewRef = { 'JengARRGGGH!': 1 };
    expect(Array.isArray(formatCommentData(commentData, reviewRef))).toBe(true);
    expect(formatCommentData(commentData, reviewRef)).not.toBe(commentData);
  });
  test('does not mutate input array', () => {
    const commentData = [
      {
        body: 'I loved this game too!',
        belongs_to: 'JengARRGGGH!',
        created_by: 'happyamy2016',
        votes: 16,
        created_at: new Date(1511354163389),
      },
    ];
    const reviewRef = { 'JengARRGGGH!': 1 };
    formatCommentData(commentData, reviewRef);
    expect(commentData).toEqual([
      {
        body: 'I loved this game too!',
        belongs_to: 'JengARRGGGH!',
        created_by: 'happyamy2016',
        votes: 16,
        created_at: new Date(1511354163389),
      },
    ]);
  });
  test('when passed an array containing one User object returns returns object values in nested array', () => {
    const commentData = [
      {
        body: 'I loved this game too!',
        belongs_to: 'JengARRGGGH!',
        created_by: 'happyamy2016',
        votes: 16,
        created_at: new Date(1511354163389),
      },
    ];
    const reviewRef = { 'JengARRGGGH!': 1 };
    expect(formatCommentData(commentData, reviewRef)).toEqual([
      [
        'happyamy2016',
        1,
        16,
        new Date(1511354163389),
        'I loved this game too!',
      ],
    ]);
  });
  test('works for array containing multiple objects', () => {
    const commentData = [
      {
        body: 'I loved this game too!',
        belongs_to: 'JengARRGGGH!',
        created_by: 'happyamy2016',
        votes: 16,
        created_at: new Date(1511354163389),
      },
      {
        body: 'My dog loved this game too!',
        belongs_to: 'One Night Ultimate Werewolf',
        created_by: 'tickle122',
        votes: 3,
        created_at: new Date(1610964545410),
      },
    ];
    const reviewRef = { 'JengARRGGGH!': 1, 'One Night Ultimate Werewolf': 2 };

    expect(formatCommentData(commentData, reviewRef)[0]).toEqual([
      'happyamy2016',
      1,
      16,
      new Date(1511354163389),
      'I loved this game too!',
    ]);
    expect(formatCommentData(commentData, reviewRef)[1]).toEqual([
      'tickle122',
      2,
      3,
      new Date(1610964545410),
      'My dog loved this game too!',
    ]);
  });
});
