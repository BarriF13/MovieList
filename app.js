// Movie constructor
//-1
function Movie(title, director, imdb) {
  this.title = title;
  this.director = director;
  this.imdb = imdb;

}

// UI constructor 
//-2
function UI() { }

//-7 Add movie to list
UI.prototype.addMovieToList = function (movie) {
  //-8 assign a list variable to an element = movie list  
  const list = document.getElementById('movie-list');

  //-9 create a table row element to add movie in it on DOM
  const row = document.createElement('tr');

  //-10 Insert cols or table data
  row.innerHTML = `
  <td>${movie.title}</td>
  <td>${movie.director}</td>
  <td>${movie.imdb}</td>
  <td><a href="#" class ="delete">x</a></td>
  `;
  //-11 Append
  list.appendChild(row);
}
//-15 Show alert
UI.prototype.showAlert = function (message, className) {
  // we have to construct the element 
  //-16 create a div
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
//-19 making delete prototype for UI

UI.prototype.deleteMovie = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }

}

//-13 Clear fields prototype
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('director').value = '';
  document.getElementById('imdb').value = '';
}



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
  //-21 Show alert for removing

ui.showAlert('Movie has been removed' , 'success');
  e.preventDefault();
});