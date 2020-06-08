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
UI.prototype.showAlert = function(message, className){
  // we have to construct the element 
  //-16 create a div
  const div = document.createElement('div');

}


//-13 Clear fields prototype
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('director').value = '';
  document.getElementById('imdb').value = '';
}



//-3 Event Listeners
document.getElementById('movie-form').addEventListener('submit', function (e) {

  const title = document.getElementById('title').value,
    director = document.getElementById('director').value,
    imdb = document.getElementById('imdb').value;


  //-4 instantiate a movie
  const movie = new Movie(title, director, imdb);

  //-5 Instantiate a UI object
  const ui = new UI();

  //-14 form validation
  if(title === ''|| director === '', imdb === ''){
  UI.showAlert('please fill in all fields', '.error');
  } else {

  //-6 Add movie to list 
  ui.addMovieToList(movie);
  //-12 Clear the field after adding a movie
  ui.clearFields();


  }
// we put step 6 and 12 to validation section
  e.preventDefault();
}); 
