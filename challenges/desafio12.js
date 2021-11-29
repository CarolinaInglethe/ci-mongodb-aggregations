db.trips.aggregate([
  {
    // resultado do dia da semana com maior viagens da query anterior deu 5
    // pega somente os que dia da semana seja 5
    $match: {
      $expr: { $eq: [{ $dayOfWeek: "$startTime" }, 5] },
    },
  },
  {
    // agrupa por cada station para contar
    $group: {
      _id: "$startStationName",
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: false,
      nomeEstacao: "$_id",
      total: "$total",
    },
  },
  // paga pegar o que aparece mais, valor maior :
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
