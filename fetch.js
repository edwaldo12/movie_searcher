//fetch
// const searchButton = document.querySelector('.search-button');
// searchButton.addEventListener('click', function () {
    
//     const inputKeyword = document.querySelector('.input-keyword');
//     fetch('https://www.omdbapi.com/?apikey=1c137403&s=' + inputKeyword.value)
//         .then(response => response.json())
//         .then(response => {
//             let movies = response.Search;
//             let cards = '';
//             movies.forEach(element => {
//                 cards += showCards(element);
//                 const movieContainer = document.querySelector('.movie-container');
//                 movieContainer.innerHTML = cards;


//                 //ketika tombol detail di klik
//                 const detailButton = document.querySelectorAll('.modal-detail-button');
//                 detailButton.forEach((element) => {
//                     element.addEventListener('click', function () {
//                         const id = this.dataset.imdbid;
//                         fetch('https://www.omdbapi.com/?apikey=1c137403&i=' + id)
//                             .then(response => response.json())
//                             .then(response => {
//                                 const movieDetail = showDetail(response);
//                                 const modalBody = document.querySelector('.modal-body');
//                                 modalBody.innerHTML = movieDetail;
//                             });
//                     });
//                 });

//             });
//         });
// });

const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function () {
    try {
        const inputKeyword = document.querySelector('.input-keyword');
        const movies = await getMovies(inputKeyword.value);
        updateUI(movies);
    } catch (e) {
        console.log(error)
    }
});

function getMovies(element) {
    return fetch('https://www.omdbapi.com/?apikey=1c137403&s=' + element)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(response => {
            if (response.Response === false) {
                throw new Error(response.Error);
            }
            return response.Search;
        });
};

function updateUI(movies) {
    let cards = '';
    movies.forEach(movies => {
        cards += showCards(movies);
        const movieContainer = document.querySelector('.movie-container');
        movieContainer.innerHTML = cards;
    });               
}

// event binding
document.addEventListener('click', async function (e) {
    try {
        if (e.target.classList.contains('modal-detail-button')) {
            const imdbID = e.target.dataset.imdbid;
            console.log(imdbID)
            const movieDetail = await getMovieDetail(imdbID);
            updateUIDetail(movieDetail);
        }
    } catch(e) {
        console.log(e)
    }
});


function getMovieDetail(imdbid) {
    return fetch('https://www.omdbapi.com/?apikey=1c137403&i=' + imdbid)
        .then(response => response.json())
        .then(e => e);
}

function updateUIDetail(e) {
    const movieDetail = showMovieDetail(e);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}

function showCards(element) {
    return `<div class="col-md-4 my-3">
                    <div class="card">
                        <img src="${element.Poster}" class="card-img-top" />
                        <div class="card-body">
                        <h5 class="card-title">${element.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${element.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal"
                        data-bs-target="#movieDetailModal" data-imdbid="${element.imdbID}">Show Details</a>
                        </div>
                    </div>
                </div>`;
}

function showMovieDetail(e) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                    <img src="${e.Poster}" class="img-fluid" alt="" />
                    </div>
                    <div class="col-md">
                    <ul class="list-group">
                        <li class="list-group-item"><h4>${e.Title} (${e.Year})</h4></li>
                        <li class="list-group-item">
                        <strong>Director : </strong> ${e.Director}
                        </li>
                        <li class="list-group-item">
                        <strong>Actors : </strong> ${e.Actors}
                        </li>
                        <li class="list-group-item">
                        <strong>Writers : </strong> ${e.Writer}
                        </li>
                        <li class="list-group-item">
                        <strong>Plot : </strong> ${e.Plot}
                        </li>
                    </ul>
                    </div>
                </div>
            </div>`;
}


