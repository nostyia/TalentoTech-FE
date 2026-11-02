const movieSearch = "";
const resultados = document.querySelector(".main");
const searchButton = document.querySelector("#search-movie");
const cartModalToggle = document.querySelector("#cart-link");
const cartModalClose = document.querySelector(".modalclose");

cartModalToggle.addEventListener("click", () => {
  const cartModal = document.querySelector(".cart-modal");
  cartModal.style.display = "flex";
  const menuToggle = document.querySelector("#menu-toggle");
  menuToggle.checked = false;
});

cartModalClose.addEventListener("click", () => {
  const cartModal = document.querySelector(".cart-modal");
  cartModal.style.display = "none";
});
searchButton.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchMovies(searchButton.value);
  }
});

/* API THEIMDB */
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjY2MzIyZGE0YzJhNDk4NWE4M2E3ZjgyOWUyYzhhYiIsIm5iZiI6MTc5MjYyMzM3MC44NDYwMDAyLCJzdWIiOiI2YWQ5NDMwYTA1YTNlODUwMDY3Mjg4ZTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1_CTVfHdze3rVU4MlV8Q79Pm-pUyXRrphejfsZhH4SE",
  },
};

fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", options)
  .then((res) => res.json())
  .then((res) => {
    // console.log("ToDo: add to cart functionality");
    // console.log(res);
    const movieContainer = document.createElement("div");
    movieContainer.className = "movieContainer";
    if (resultados) {
      resultados.append(movieContainer);
    }
    for (const key in res.results) {
      const element = res.results[key];
      const movie = document.createElement("div");
      const addToCart = document.createElement("button");
      addToCart.innerText = "Add to Cart";
      addToCart.classList.add("addcart");
      addToCart.type = "submit";
      addToCart.addEventListener("click", function () {
        const cartModalList = document.querySelector(".cart-modal-ul");
        const cartModalEmpty = document.querySelector(".cart-modal p");
        if (cartModalEmpty) {
          cartModalEmpty.remove();
        }
        const cartItem = document.createElement("li");
        cartItem.textContent = element.title;
        cartModalList.append(cartItem);
        // console.log("Added to cart: " + element.title);
      });
      movie.append(addToCart);
      movie.className = "movie";
      const movieImg = document.createElement("img");
      movieImg.src =
        "https://image.tmdb.org/t/p/original/" + element.poster_path;
      movie.append(movieImg);
      const movieTitle = document.createElement("h2");
      movieTitle.textContent = element.title;
      movie.append(movieTitle);
      movieContainer.append(movie);
    }
  })
  .catch((err) => console.error(err));

function searchMovies(title) {
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`,
    options,
  )
    .then((res) => res.json())
    .then((res) => {
      resultados.replaceChildren();
      const movieContainer = document.createElement("div");
      movieContainer.className = "movieContainer";
      resultados.append(movieContainer);
      for (const key in res.results) {
        const element = res.results[key];
        const movie = document.createElement("div");
        const addToCart = document.createElement("button");
        addToCart.innerText = "Add to Cart";
        addToCart.classList.add("addcart");
        addToCart.type = "submit";
        addToCart.addEventListener("click", function () {
          const cartModalList = document.querySelector(".cart-modal-ul");
          const cartModalEmpty = document.querySelector(".cart-modal p");
          if (cartModalEmpty) {
            cartModalEmpty.remove();
          }
          const cartItem = document.createElement("li");
          cartItem.textContent = element.title;
          cartModalList.append(cartItem);
          // console.log("Added to cart: " + element.title);
        });
        movie.append(addToCart);
        movie.className = "movie";
        const movieImg = document.createElement("img");
        movieImg.src =
          "https://image.tmdb.org/t/p/original/" + element.poster_path;
        movie.append(movieImg);
        const movieTitle = document.createElement("h2");
        movieTitle.textContent = element.title;
        movie.append(movieTitle);
        movieContainer.append(movie);
      }
    })
    .catch((err) => console.error(err));
}

const cartMenu = document.getElementById("cart-link");
