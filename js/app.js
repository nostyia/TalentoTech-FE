import getMovies from "./api.js";
import { movieDisplay } from "./ui.js";
import { renderCart } from "./cart.js";
import {} from "./storage.js";
/* fetch api and display results */

document.addEventListener("DOMContentLoaded", () => {
  if (
    !window.location.pathname.endsWith("/contact.html") ||
    !window.location.pathname.endsWith("/category.html")
  ) {
    getMovies().then((data) => {
      for (const movies of data.results) {
        movieDisplay(movies);
      }
    });

    const searchButton = document.querySelector("#search-movie");
    let timer;
    const waitTime = 1000;
    searchButton.addEventListener("input", () => {
      /* if (event.key === "Enter") {} */ // change keyup event to input and timeout
      clearTimeout(timer);
      timer = setTimeout(() => {
        document.querySelector(".movieContainer").replaceChildren();
        getMovies(searchButton.value).then((data) => {
          for (const movies of data.results) {
            movieDisplay(movies);
          }
        });
      }, waitTime);
    });
  }
  renderCart();
});
