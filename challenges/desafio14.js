db.trips.aggregate([
  {
    $addFields: {
      duracaoEmMinutos: {
        $dateDiff: {
          startDate: "$startTime",
          endDate: "$stopTime",
          unit: "minute",
        },
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: { $avg: "$duracaoEmMinutos" },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
  {
    $project: {
      _id: false,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMedia" },
    },
  },
]);

// https://docs.mongodb.com/manual/reference/operator/aggregation/dateDiff/
