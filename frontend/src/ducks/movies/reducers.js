import types from "./types";

const initState = {
    movies: [],
	loading:false,
    error: ''
}

export const movieReducer=(state=initState,action)=>{
	switch(action.type){
		case types.MOVIES_LIST_REQUEST:
			return{...state,loading:true}
			
		case types.MOVIES_LIST_SUCCESS:
			return {...state,movies:[...action.payload],loading: false}
			
		case types.MOVIES_LIST_FAILURE:
			alert(action.payload)
			return {...state, loading:false, error: action.payload}

		case types.CREATE_MOVIE_REQUEST:
			return{ ...state,loading:true}
		
		case types.CREATE_MOVIE_FAILURE:
			alert(action.payload)
			return {...state, loading:false, error: action.payload}

		case types.CREATE_MOVIE_SUCCESS:
			alert("film dodano")
			return {...state,movies:[...state.movies,action.payload],loading:false};

		case types.EDIT_MOVIE_REQUEST:
			return{...state,loading:true}

		case types.EDIT_MOVIE_FAILURE:
			alert(action.payload)
			return {...state, loading:false, error: action.payload}
			
		case types.EDIT_MOVIE_SUCCESS:
			alert("film edytowano")
			return {...state, movies:[...state.movies.filter(movie=>movie.id!==parseInt(action.payload.id)),action.payload],loading:false}

		case types.MOVIE_DELETE_REQUEST:
			return{...state,loading:true}

		case types.MOVIE_DELETE_FAILURE:
			alert(action.payload)
			return{...state,loading:false,error:action.payload}

		case types.MOVIE_DELETE_SUCCESS:
			alert("film usunięto")
			return { ...state ,movies:[...state.movies.filter(movie=>movie.id!==parseInt(action.payload))],loading:false}

		case types.UPDATE_DIRECTOR_FAILURE:
			alert(action.payload)
			return{...state,loading:false,error:action.payload}

		case types.UPDATE_DIRECTOR_SUCCESS:
			const newDirectorId = action.payload[1]
			const updatedMovieId = parseInt(action.payload[0])
			const updatedMovie=state.movies.find(movie => movie.id ===updatedMovieId)
			updatedMovie.director_id= newDirectorId
			return  {...state,movies:[...state.movies.filter(movie=>movie.id!==updatedMovieId),updatedMovie],loading:false}
		
		default:
			 return state
	}

}

