const API_KEY = "thewdb"; // public demo key for OMDb API
const BASE_URL = "https://www.omdbapi.com/";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movieContainer = document.getElementById("movieContainer");

searchBtn.addEventListener("click", getMovies);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getMovies();
});

async function getMovies() {
  const query = searchInput.value.trim();
  if (!query) {
    alert("Please enter a movie name");
    return;
  }

  movieContainer.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(`${BASE_URL}?s=${query}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      movieContainer.innerHTML = "<p>No movies found 😢</p>";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    movieContainer.innerHTML = "<p>Error loading movies.</p>";
  }
}

function displayMovies(movies) {
  movieContainer.innerHTML = "";
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie");

    movieCard.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300"}" alt="${movie.Title}" />
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;

    movieContainer.appendChild(movieCard);
  });
}
