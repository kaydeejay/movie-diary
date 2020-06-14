import axios from 'axios';

export default {
  // save a new movie (create):
  saveMovie: (movie) => {
    return axios.post('/api/movies/new', movie);
  },
  // get all movies (read):
  getMovies: () => {
    return axios.get('/api/movies');
  },
  // get movie by id:
  getMovieById: (id) => {
    return axios.get('/api/movies/' + id);
  },
  // update movie (update):
  updateMovie: (movie) => {
    return axios.put('/api/movies/update', movie);
  },
  // delete movie (delete):
  deleteMovie: (id) => {
    return axios.delete('/api/movies/delete/' + id);
  },
  // search for new movies on omdb:
  omdbSearch: (body) => {
    return axios.put('/search', body);
  }
}