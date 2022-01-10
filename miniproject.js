$('.search-button').on('click', function () {
    $.ajax({
    url: 'http://www.omdbapi.com/?apikey=1c137403&s='+$('.input-keyword').val(),
    success: result => {
        const movies = result.Search;
        console.log(movies);
        let cards = '';
        movies.forEach(element => {
            cards += showCards(element);
        });
        $('.movie-container').html(cards);

        //ketika tombol detail di klik

        $('.modal-detail-button').on('click', function () {
            console.log($(this).data('imdbid'));
            $.ajax({
                url: 'http://www.omdbapi.com/?apikey=1c137403&i=' + $(this).data('imdbid'),
                success: e => {
                    const movieDetail = showDetail(e)
                    $('.modal-body').html(movieDetail);
                },
                error: (e) => {
                    console.log(e.responseText);
                },
            });
        });
    },
    error: (e) => {
        console.log(e.responseText);
    }
});

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

function showDetail(e) {
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
});


