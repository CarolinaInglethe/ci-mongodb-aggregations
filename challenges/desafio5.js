db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $addFields: { num_favs: { $sum: "$cast" } },
  },
  {
    $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 },
  },
]);
