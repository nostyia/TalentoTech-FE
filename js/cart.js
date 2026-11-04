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
  if (cartModalList.hasChildNodes()) {
    const cartResetText = document.createElement("p");
    const totalPriceText = document.querySelector(".total-price");
    cartResetText.textContent = "Empty cart list, please add movie's";
    cartModalList.replaceChildren(cartResetText);
    totalPriceText.innerText = "$ 0";
  }
});
