console.log("hello!")

var submitButton =  document.getElementById("submitButton");
var userSearch = document.getElementById("userSearch");
var movieGrid = document.getElementById("movie-grid");

var pages = 1;
var loadMoreMoviesBtn = document.getElementById("load-more-movies-btn")


async function loadMovies(){
    const api_key = "7284545292fe355c5ef22c4cfa1616a6"
        const pulledMovies = movieGrid.value;
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=${pages}`

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
        await loadMovies();

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
        await loadMovies();

        console.log(data);
    }
    catch{
        console.log("something is wrong with the load more movies button")
    }

})