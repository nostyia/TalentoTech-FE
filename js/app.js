const movieSearch = "john wick";
const resultados = document.querySelector(".main");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjY2MzIyZGE0YzJhNDk4NWE4M2E3ZjgyOWUyYzhhYiIsIm5iZiI6MTc5MjYyMzM3MC44NDYwMDAyLCJzdWIiOiI2YWQ5NDMwYTA1YTNlODUwMDY3Mjg4ZTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1_CTVfHdze3rVU4MlV8Q79Pm-pUyXRrphejfsZhH4SE",
  },
};

fetch("https://jsonfakery.com/movies/paginated")
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    const movieContainer = document.createElement("div");
    movieContainer.className = "movieContainer";
    resultados.append(movieContainer);
    for (const key in res.data) {
      const element = res.data[key];
      const movie = document.createElement("div");
      movie.className = "movie";
      const movieImg = document.createElement("img");
      movieImg.src =
        "https://image.tmdb.org/t/p/original/" + element.poster_path;
      movie.append(movieImg);
      const movieTitle = document.createElement("h2");
      movieTitle.textContent = element.original_title;
      movie.append(movieTitle);
      movieContainer.append(movie);
    }
  })
  .catch((err) => console.error(err));
