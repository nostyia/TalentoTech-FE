import {
  saveCartStorage,
  getCartStorage,
  emptyCartStorage,
} from "./storage.js";
import { updateCartCount } from "./ui.js";

export const addMovieToCart = (movieTitle) => {
  const cart = getCartStorage();
  cart.push(movieTitle);
  saveCartStorage(cart);
  renderCart();
};

export const deleteMovieCart = (index) => {
  const cart = getCartStorage();
  cart.splice(index, 1);
  saveCartStorage(cart);
  updateCartCount(cart);
};

export const emptyCart = () => {
  emptyCartStorage();
  updateCartCount([]);
};

export const renderCart = () => {
  const cartModalList = document.querySelector(".cart-modal-ul");
  const cartModalEmpty = document.querySelector(".cart-modal p");
  const cartPrice = document.querySelector(".total-price");
  const cart = getCartStorage();
  updateCartCount(cart);

  if (cartModalEmpty) {
    cartModalEmpty.remove();
  }
  cartModalList.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((element) => {
    // main list item
    const cartItem = document.createElement("li");
    cartItem.classList.add("cart-item");
    // title block
    const title = document.createElement("span");
    title.textContent = `${element.title}`;
    cartItem.append(title);

    // price block
    const moviePrice = parseInt(element.popularity * 10).toFixed(2);
    totalPrice = totalPrice + parseFloat(moviePrice);
    const price = document.createElement("span");
    price.textContent = `$${moviePrice}`;
    cartItem.append(price);
    cartModalList.append(cartItem);
  });
  cartPrice.textContent = `$ ${totalPrice}`;

  /* 
  const cartItem = document.createElement("li");
  cartItem.textContent = `${movies.title} $${parseInt(movies.popularity).toFixed(2)}`;
  cartModalList.append(cartItem);
  totalPrice = totalPrice + parseInt(movies.popularity.toFixed(2));
  cartPrice.textContent = `$ ${totalPrice}`; */
};
const cartModalToggle = document.querySelector("#cart-link");
const cartModalList = document.querySelector(".cart-modal-ul");

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
  emptyCart();
  if (cartModalList.hasChildNodes()) {
    const cartResetText = document.createElement("p");
    const totalPriceText = document.querySelector(".total-price");
    cartResetText.textContent = "Empty cart list, please add movie's";
    cartModalList.replaceChildren(cartResetText);
    totalPriceText.innerText = "$ 0";
  }
});
