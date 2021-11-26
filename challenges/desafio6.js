use("aggregations");
db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /^Won*/i },
    },
  },
  {
    $project: { _id: 0, awards: 1 },
  },
]);
