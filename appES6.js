// now we make classes instead of constructors


//Class movie
class Movie {
  constructor(title, director, imdb) {
    this.title = title;
    this.director = director;
    this.imdb = imdb;

  }
}

//class UI we pt the methods in there
class UI {
  addMovieToList(movie) {
    const list = document.getElementById('movie-list');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${movie.title}</td>
    <td>${movie.director}</td>
    <td>${movie.imdb}</td>
    <td><a href="#" class ="delete">x</a></td>
    `;

    list.appendChild(row);
  }

  showAlert(message, className) {
    const div = document.createElement('div');
    //-16 Add classes
    div.className = `alert ${className}`;
    //-16 Add text 
    div.appendChild(document.createTextNode(message));
    //-16 Get parent
    const container = document.querySelector('.container');
    // -16 Get form
    const form = document.querySelector('#movie-form');
    //-16 Insert alert-- first arg is what we want to insert --second arg is where we want to insert before
    container.insertBefore(div, form);
    //-16 Timeout after secs
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 2000);
  }

  deleteMovie(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('director').value = '';
    document.getElementById('imdb').value = '';
  }
}

// Local storage class -features
class Store {
  static getMovies() { // First we need to get the movie from LS, then show them so we check first if we have any book -- else we get the books that are saved.
    let movies;
    if (localStorage.getItem('movies') === null) {
      movies = [];
    } else {
      movies = JSON.parse(localStorage.getItem('movies'));
    }
    return movies;
  }

  static displayMovies() {
    const movies = Store.getMovies();
    movies.forEach(function (movie) {

      const ui = new UI;
      // Add movie to UI
      ui.addMovieToList(movie);

    }
    )}

  static addMovie(movie) {
    const movies = Store.getMovies(); // we are using class name because it is static method

    movies.push(movie);
    localStorage.setItem('movies', JSON.stringify(movies));
  }

  static removeMovie(imdb) {
    const movies = Store.getMovies();
    movies.forEach(function (movie, index) {
     if(movie.imdb === imdb){
      movies.splice(index, 1);
    }
  });
  localStorage.setItem('movies' , JSON.stringify(movies));
}
}
// DOM load event
document.addEventListener('DOMContentLoaded' , Store.displayMovies);


//-3 Event Listeners for add movie
document.getElementById('movie-form').addEventListener('submit', function (e) {

  const title = document.getElementById('title').value,
    director = document.getElementById('director').value,
    imdb = document.getElementById('imdb').value;


  //-4 instantiate a movie
  const movie = new Movie(title, director, imdb);

  //-5 Instantiate a UI object
  const ui = new UI();

  //-14 form validation
  if (title === '' || director === '', imdb === '') {
    ui.showAlert('Please fill in all fields.', 'error');
  } else {

    //-6 Add movie to list 
    ui.addMovieToList(movie);
    // Add movie to LS
    Store.addMovie(movie);
    //-17 Show success
    ui.showAlert('Movie added!', 'success');
    //-12 Clear the field after adding a movie
    ui.clearFields();
  }
  // we put step 6 and 12 to validation section
  e.preventDefault();
});

// -18 Event listener for delete
document.getElementById('movie-list').addEventListener('click', function (e) {

  //-20 instantiate ui
  const ui = new UI();
  ui.deleteMovie(e.target);

  //Remove from LS
  Store.removeMovie(e.target.parentElement.previousElementSibling.textContent); // we are getting imdb to remove it form LS

  //-21 Show alert for removing

  ui.showAlert('Movie has been removed', 'success');
  e.preventDefault();
});