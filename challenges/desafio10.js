db.trips.aggregate([
  {
    // pega duracao em horas (dateDiff)
    $addFields: {
      duracao: {
        $dateDiff: {
          startDate: "$startTime",
          endDate: "$stopTime",
          unit: "hour",
        },
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$duracao" },
    },
  },
  {
    $project: {
      _id: false,
      tipo: "$_id",
      duracaoMedia: {
        $round: ["$duracaoMedia", 2],
      },
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);

// https://docs.mongodb.com/manual/reference/operator/aggregation/dateDiff/
