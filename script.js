console.log("hello!")

var submitButton =  document.getElementById("submitButton");
var userSearch = document.getElementById("userSearch");
var movieResults = document.getElementById("movieResults");

document.addEventListener("DOMContentLoaded", async (event) =>{
    event.preventDefault();
    console.log("It worked! :D");
    
    try{
        const api_key = "7284545292fe355c5ef22c4cfa1616a6"
        const pulledMovies = movieResults.value;
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1}`
        /*const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mjg0NTQ1MjkyZmUzNTVjNWVmMjJjNGNmYTE2MTZhNiIsInN1YiI6IjY0OGE0NzcxYTgwMjM2MDBhZDk2MzQxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AK7LPaanYH7dwAzvYVEwSXa2tNBNw7I2PoXFGFY1TLs'
            }
          };
          */
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;
        console.log(results)
        
        movieResults.innerHTML="";
        results.forEach(movie => {

            const title = document.createElement("p");
            title.textContent = movie.title;
            movieResults.appendChild(title)


            const containPoster = document.createElement("div");
            const poster = document.createElement("img");
            poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            poster.alt = movie.title;
            containPoster.appendChild(poster)
            movieResults.appendChild(containPoster)

            

            const rating = document.createElement("p")
            rating.textContent = "⭐️" + movie.vote_average +"⭐️";
            movieResults.appendChild(rating)
        });

        console.log(data);


            
    }
    catch{
        console.log("Something isn't right...")
    }
})