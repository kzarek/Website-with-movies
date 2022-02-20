export const getMovies = (state) => state.movies.movies
export const getOneMovieById = (state,id) => { return state.movies.movies.find(movie => movie.id === parseInt(id)) }

