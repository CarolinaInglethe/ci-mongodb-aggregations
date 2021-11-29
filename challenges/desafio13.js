db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: new Date("2016/03/10") },
    },
  },
  {
    // sdivide para transformar em minutos
    $addFields: {
      duracaoMaxDeCadaViagem: {
        $divide: [
          {
            $subtract: ["$stopTime", "$startTime"],
          },
          60000,
        ],
      },
    },
  },
  {
    // passa por cada um e seu tempo em minutos e pega a media
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: "$duracaoMaxDeCadaViagem",
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
