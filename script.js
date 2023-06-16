console.log("hello!")

var api_key = "7284545292fe355c5ef22c4cfa1616a6";

var searchnButton =  document.getElementById("search-button");
var userSearch = document.getElementById("search-input");
var movieGrid = document.getElementById("movie-grid");

var pages = 1;
var loadMoreMoviesBtn = document.getElementById("load-more-movies-btn")


async function loadMovies(action_url){
    const pulledMovies = movieGrid.value;
    const url = action_url;

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

document.addEventListener("DOMContentLoaded", async (event) =>{
    event.preventDefault();
    console.log("It worked! :D");
    movieGrid.innerHTML="";
    
    try{
        await loadMovies(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=${pages}`);

        console.log(data);
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
        await loadMovies(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=${pages}`);

        console.log(data);
    }
    catch{
        console.log("something is wrong with the load more movies button")
    }

})
/* 
searchButton.addEventListener("click", (event) =>{
    event.preventDefault();


})
*/