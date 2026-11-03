/* NEW VERSION FETCH ASYNC/AWAIT */
/* API THEIMDB */
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjY2MzIyZGE0YzJhNDk4NWE4M2E3ZjgyOWUyYzhhYiIsIm5iZiI6MTc5MjYyMzM3MC44NDYwMDAyLCJzdWIiOiI2YWQ5NDMwYTA1YTNlODUwMDY3Mjg4ZTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1_CTVfHdze3rVU4MlV8Q79Pm-pUyXRrphejfsZhH4SE",
  },
};
async function getMovies(movie) {
  try {
    if (!movie) {
      const API_URL =
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
      const response = await fetch(API_URL, options);
      const data = await response.json();
      return data;
    } else {
      const API_URL = `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`;
      const response = await fetch(API_URL, options);
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Failed to get Movies:", error);
  }
}

const resultados = document.querySelector(".main");
const movieContainer = document.createElement("div");
getMovies().then((data) => {
  for (movies of data.results) {
    resultados.replaceChildren();
    movieDisplay(movies);
  }
});
const cartModalList = document.querySelector(".cart-modal-ul");
let totalPrice = 0;
function movieDisplay(movies) {
  movieContainer.className = "movieContainer";
  const movie = document.createElement("div");
  const addToCart = document.createElement("button");
  addToCart.innerText = "Add to Cart";
  addToCart.classList.add("addcart");
  addToCart.type = "submit";
  addToCart.addEventListener("click", function () {
    const cartModalEmpty = document.querySelector(".cart-modal p");
    if (cartModalEmpty) {
      cartModalEmpty.remove();
    }
    const cartPrice = document.querySelector(".total-price");
    const cartItem = document.createElement("li");
    cartItem.textContent = `${movies.title} $${parseInt(movies.popularity).toFixed(2)}`;
    cartModalList.append(cartItem);
    totalPrice = totalPrice + parseInt(movies.popularity.toFixed(2));
    cartPrice.textContent = `$ ${totalPrice}`;
  });
  movie.append(addToCart);
  movie.className = "movie";
  const movieImg = document.createElement("img");
  movieImg.src = "https://image.tmdb.org/t/p/original/" + movies.poster_path;
  movie.append(movieImg);
  const movieTitle = document.createElement("h2");
  movieTitle.textContent = movies.title;
  movie.append(movieTitle);
  const price = document.createElement("span");
  price.textContent = "$ " + parseInt(movies.popularity).toFixed(2);
  price.className = "movie-price";
  movie.append(price);
  movieContainer.append(movie);
  resultados.append(movieContainer);
}
const searchButton = document.querySelector("#search-movie");
searchButton.addEventListener("keyup", (event) => {
  /* if (event.key === "Enter") {
    searchMovies(searchButton.value);
  } */

  if (event.key === "Enter") {
    movieContainer.replaceChildren();
    getMovies(searchButton.value).then((data) => {
      for (const movies of data.results) {
        movieDisplay(movies);
      }
    });
  }
});

const cartModalToggle = document.querySelector("#cart-link");
cartModalToggle.addEventListener("click", () => {
  const cartModal = document.querySelector(".cart-modal");
  cartModal.style.display = "flex";
  const menuToggle = document.querySelector("#menu-toggle");
  menuToggle.checked = false;
});

const cartModalClose = document.querySelector(".modalclose");
cartModalClose.addEventListener("click", () => {
  const cartModal = document.querySelector(".cart-modal");
  cartModal.style.display = "none";
});

const cartReset = document.querySelector(".cart-reset");
cartReset.addEventListener("click", () => {
  if (cartModalList) {
    const cartResetText = document.createElement("p");
    cartResetText.textContent = "Empty cart list, please add movie's";
    if (cartModalList.hasChildNodes()) {
      cartModalList.replaceChildren(cartResetText);
      totalPrice = 0;
      cartPrice.textContent = `$ ${totalPrice}`;
    }
  }
});

/* OLD VERSION FETCH .THEN */
/* fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", options)
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
        const cartModalEmpty = document.querySelector(".cart-modal p");
        if (cartModalEmpty) {
          cartModalEmpty.remove();
        }
        const cartItem = document.createElement("li");
        cartItem.textContent = `${element.title} $${parseInt(element.popularity).toFixed(2)}`;
        cartModalList.append(cartItem);
        totalPrice = totalPrice + parseInt(element.popularity.toFixed(2));
        cartPrice.textContent = `$ ${totalPrice}`;
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
      const price = document.createElement("span");
      price.textContent = "$ " + parseInt(element.popularity).toFixed(2);
      price.className = "movie-price";
      movie.append(price);
      movieContainer.append(movie);
    }
  })
  .catch((err) => console.error(err)); */

/* function searchMovies(title) {
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
        const price = document.createElement("span");
        price.textContent = "$ " + parseInt(element.popularity).toFixed(2);
        price.className = "movie-price";
        movie.append(price);
        movieContainer.append(movie);
      }
    })
    .catch((err) => console.error(err));
} */
/* OLD VERSION FETCH .THEN */
