db.trips.aggregate([
  {
    // agrupa por dia da semana para contar quantas vezes se repetem
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: false,
      diaDaSemana: "$_id",
      total: "$total",
    },
  },
  // começar do maior para pegar o 1°, com maior numero de viagens (sort e limit):
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
