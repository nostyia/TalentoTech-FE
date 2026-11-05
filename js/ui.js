import { addMovieToCart } from "./cart.js";
const movieContainer = document.createElement("div");
const resultados = document.querySelector(".main");
const cartModalList = document.querySelector(".cart-modal-ul");
let totalPrice = 0;

export function movieDisplay(movies) {
  movieContainer.className = "movieContainer";
  const movie = document.createElement("div");
  const addToCart = document.createElement("button");
  addToCart.innerText = "Add to Cart";
  addToCart.classList.add("addcart");
  addToCart.type = "submit";
  addToCart.addEventListener("click", function () {
    addMovieToCart(movies);
    document.querySelector(".cart-modal").style.display = "flex";
    /* const cartModalEmpty = document.querySelector(".cart-modal p");
    if (cartModalEmpty) {
      cartModalEmpty.remove();
    }
    const cartPrice = document.querySelector(".total-price");
    const cartItem = document.createElement("li");
    cartItem.textContent = `${movies.title} $${parseInt(movies.popularity).toFixed(2)}`;
    cartModalList.append(cartItem);
    totalPrice = totalPrice + parseInt(movies.popularity.toFixed(2));
    cartPrice.textContent = `$ ${totalPrice}`; */
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
  price.textContent = "$ " + parseInt(movies.popularity * 10).toFixed(2);
  price.className = "movie-price";
  movie.append(price);
  movieContainer.append(movie);
  resultados.append(movieContainer);
}

export const updateCartCount = (cart) => {
  const counter = document.getElementsByClassName("cart-modal-ul");
  if (counter) {
    counter.textContent = cart.length;
  }
};
