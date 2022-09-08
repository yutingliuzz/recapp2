export async function getMovie(movieTitle) {
  const a = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=1985ea9f71a9f54b4301260f1e18311a&language=en-US&page=1&include_adult=false&query=${movieTitle}`
  ).then((res) => {
    return res.json();
  });
  return a.results[0];
}

export async function handleResults(arr, setState) {
  const movieArrayd = await arr;
  const movieMetaData = await Promise.all(
    movieArrayd.map((movie) => getMovie(movie))
  );
  setState(movieMetaData);
}
