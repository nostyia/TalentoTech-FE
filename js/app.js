const movieSearch = "john wick";
const resultados = document.querySelector(".main");

fetch("https://jsonfakery.com/movies/paginated")
  .then((res) => res.json())
  .then((res) => {
    console.log("ToDo: add to cart functionality");
    // console.log(res);
    const movieContainer = document.createElement("div");
    movieContainer.className = "movieContainer";
    resultados.append(movieContainer);
    for (const key in res.data) {
      const element = res.data[key];
      const movie = document.createElement("div");
      const addToCart = document.createElement("button");
      addToCart.innerText = "Add to Cart";
      addToCart.classList.add("addcart");
      addToCart.type = "submit";
      addToCart.addEventListener("click", function () {
        console.log("Added to cart: " + element.original_title);
      });
      movie.append(addToCart);
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
