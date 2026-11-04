import getMovies from "./api.js";
import { movieDisplay } from "./ui.js";
import {} from "./cart.js";
/* fetch api and display results */

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
