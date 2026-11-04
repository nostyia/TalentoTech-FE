/* API THEIMDB */
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjY2MzIyZGE0YzJhNDk4NWE4M2E3ZjgyOWUyYzhhYiIsIm5iZiI6MTc5MjYyMzM3MC44NDYwMDAyLCJzdWIiOiI2YWQ5NDMwYTA1YTNlODUwMDY3Mjg4ZTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1_CTVfHdze3rVU4MlV8Q79Pm-pUyXRrphejfsZhH4SE",
  },
};
export default async function getMovies(movie) {
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
