export const getPersons =(state) =>state.persons.persons
export const getOnePersonById = (state,id) =>{return state.persons.persons.find(person=> person.id ===parseInt(id))}
export const getMovieDirectors = (state,id)=>{return state.movies.movies.filter(movie => movie.directorId ===parseInt(id))}