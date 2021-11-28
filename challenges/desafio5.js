db.movies.aggregate([
  {
    $match: {
      $and: [
        { countries: { $exists: true } },
        { countries: "USA" },
        { "tomatoes.viewer.rating": { $gte: 3 } },
        { cast: { $in: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"] } },
      ],
    },
  },
  {
    // salva os favoritos em uma variavel
    $addFields: {
      favs: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
    },
  },
  {
    // compara os favoritos do documento com os favoritos da variavel criada e gera uma nova
    // ($setIntersection);
    // conta o tamanho do array de favoritos gerado e salva em num_favs ($size);
    $addFields: {
      num_favs: { $size: { $setIntersection: ["$cast", "$favs"] } },
    },
  },
  {
    $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 },
  },
  // (skip e limit para pegar o 25° documento que segue os criterios)
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
  {
    $project: { _id: 0, title: 1 },
  },
]);
