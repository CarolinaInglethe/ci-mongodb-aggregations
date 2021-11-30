db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: new Date("2016/03/10") },
    },
  },
  {
    // calcula tempo e retorna em minutos(dateDiff)
    $addFields: {
      duracaoMinutos: {
        $dateDiff: {
          startDate: "$startTime",
          endDate: "$stopTime",
          unit: "minute",
        },
      },
    },
  },
  {
    // passa por cada um e seu tempo em minutos e pega a media
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: "$duracaoMinutos",
      },
    },
  },
  {
    // arredonda pra cima ($ceil)
    $project: {
      _id: false,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
]);

// https://docs.mongodb.com/manual/reference/operator/aggregation/dateDiff/
