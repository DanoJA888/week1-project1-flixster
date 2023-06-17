var api_key = "7284545292fe355c5ef22c4cfa1616a6";

var searchButton =  document.getElementById("search-button");
var userSearch = document.getElementById("search-input");
var movieGrid = document.getElementById("movie-grid");

var pages = 1;
var pageLoadingType = 1 // this variable is used for identifying when i need to pass the "now playing url" vs the "search" url
var loadMoreMoviesBtn = document.getElementById("load-more-movies-btn");

var cancelSearch = document.getElementById("close-search-btn");

async function loadMovies(loadingTypeId){
    
        const pulledMovies = movieGrid.value;
        const searchValue = userSearch.value;
        const url = loadingTypeId === 1 ? `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=${pages}` : `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&include_adult=false&language=en-US&page=${pages}&query=${searchValue}`;

        
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;
        
        
        results.forEach(movie => {
            const movieCard = document.createElement("div");

            const title = document.createElement("p");
            title.textContent = movie.title;
            movieCard.appendChild(title)

            const poster = document.createElement("img");
            poster.src = `https://image.tmdb.org/t/p/w400${movie.poster_path}`;
            poster.alt = movie.title;
            poster.style.color = "white";
            movieCard.appendChild(poster)
        
            const rating = document.createElement("p")
            rating.textContent = "⭐️" + movie.vote_average +"⭐️";
            movieCard.appendChild(rating)

            movieCard.classList.add("poster-format")
            movieGrid.appendChild(movieCard)
        });
    
}

document.addEventListener("DOMContentLoaded", async (event) =>{
    
    event.preventDefault();
    movieGrid.innerHTML="";
    await loadMovies(pageLoadingType);

})

loadMoreMoviesBtn.addEventListener("click", async (event) =>{
    
    event.preventDefault();
    pages++;
    await loadMovies(pageLoadingType);
    
})

searchButton.addEventListener("click", async (event) =>{
    
    event.preventDefault();
    pages = 1
    pageLoadingType = 2
    movieGrid.innerHTML="";
    await loadMovies(pageLoadingType);

})

cancelSearch.addEventListener("click", async (event) =>{
    
    event.preventDefault();
    pages = 1
    pageLoadingType = 1
    movieGrid.innerHTML="";
    await loadMovies(pageLoadingType);
    
})
