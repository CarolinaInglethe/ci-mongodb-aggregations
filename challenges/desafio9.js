db.trips.aggregate([
  {
    $match: { birthYear: { $exists: true, $ne: "" } },
  },
  {
    // agrupa passando por cada um e comparando se é maior ou menor que anterior ou proximo
    // usando $max e $min e retorna novo documento:
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
      menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
    },
  },
  {
    $project: { _id: 0 },
  },
]);
