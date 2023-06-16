console.log("hello!")

var api_key = "7284545292fe355c5ef22c4cfa1616a6";

var searchButton =  document.getElementById("search-button");
var userSearch = document.getElementById("search-input");
var movieGrid = document.getElementById("movie-grid");

var pages = 1;
var pageLoadingType = 1 // this variable is used for identifying when i need to pass the "now playing url" vs the "search" url
var loadMoreMoviesBtn = document.getElementById("load-more-movies-btn")


async function loadMovies(loadingTypeId){
    try{
        const pulledMovies = movieGrid.value;
        const searchValue = userSearch.value;
        const url = loadingTypeId === 1 ? `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=${pages}` : `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&include_adult=false&language=en-US&page=${pages}&query=${searchValue}`;

        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;
        console.log(results)
        
        results.forEach(movie => {
            const movieCard = document.createElement("div");

            const title = document.createElement("p");
            title.textContent = movie.title;
            movieCard.appendChild(title)

            const poster = document.createElement("img");
            poster.src = `https://image.tmdb.org/t/p/w400${movie.poster_path}`;
            poster.alt = movie.title;
            movieCard.appendChild(poster)
        
            const rating = document.createElement("p")
            rating.textContent = "⭐️" + movie.vote_average +"⭐️";
            movieCard.appendChild(rating)

            movieCard.classList.add("poster-format")
            movieGrid.appendChild(movieCard)
        });
    }
    catch{
        console.log("loading isnt work")
    }
}

document.addEventListener("DOMContentLoaded", async (event) =>{
    event.preventDefault();
    console.log("It worked! :D");
    movieGrid.innerHTML="";
    
    try{
        await loadMovies(pageLoadingType);

    }
    catch{
        console.log("Something isn't right...")
    }
})

loadMoreMoviesBtn.addEventListener("click", async (event) =>{
    event.preventDefault();
    console.log("refresh prevented for load more movies")
    pages++;
    console.log(pages);
    try{
        await loadMovies(pageLoadingType);
    }
    catch{
        console.log("something is wrong with the load more movies button")
    }

})

searchButton.addEventListener("click", async (event) =>{
    event.preventDefault();
    pages = 1
    pageLoadingType = 2
    console.log(pages)
    console.log(userSearch.value)
    movieGrid.innerHTML="";
    try{
        
        await loadMovies(pageLoadingType);

        console.log()
    }
    catch{
        
        console.log("something is wrong with the search")
    }


})
