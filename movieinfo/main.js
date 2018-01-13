$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
       
    })

})

function getMovies(searchText){
    fetch('https://www.omdbapi.com/?apikey=2ef4335d&s='+searchText)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        let movies = data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
            output += `
                <div class="col-md-3">
                    <div class="card text-center">
                        <img src="${movie.Poster}" class="card-img-top">
                        <h5 class="card-title">${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-success" href="#" id="movieDetails">Movie Details</a>
                    </div>
                </div>
            `;
        });

        $('#movies').html(output);
    })
    .catch((err) =>{
        console.log(err)
    })
}

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    fetch('http://www.omdbapi.com/?apikey=2ef4335d&i='+movieId)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
       let output = `
        <div class="row">
            <div class="col-md-4">
                <img src="${data.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
                <h2 class="text-center display-5 bg-primary"><strong>${data.Title}</strong></h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong> ${data.Genre}</li>
                    <li class="list-group-item"><strong>Year:</strong> ${data.Year}</li>
                    <li class="list-group-item"><strong>Director:</strong> ${data.Director}</li>
                    <li class="list-group-item"><strong>imdbRating:</strong> ${data.imdbRating}</li>
                    <li class="list-group-item"><strong>Runtime:</strong> ${data.Runtime}</li>
                    <li class="list-group-item"><strong>Short Description:</strong> ${data.Plot}</li>
                   
                </ul>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <a href="http://imdb.com/title/${data.imdbID}" target="_blank" class="btn btn-outline-success">View IMDB </a>
                    <a href="index.html" class="btn btn-secondary">Back to Search </a>
                </div>
            </div>
        </div>
       `;

       $('#movie').html(output);

    })
    .catch((err) =>{
        console.log(err)
    })
}