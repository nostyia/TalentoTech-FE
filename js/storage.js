const KEY = "myCart";

export const saveCartStorage = (cart) => {
  sessionStorage.setItem("myCart", JSON.stringify(cart));
};

export const getCartStorage = () => {
  return JSON.parse(sessionStorage.getItem("myCart")) || [];
};

export const emptyCartStorage = () => {
  sessionStorage.removeItem("myCart");
};
