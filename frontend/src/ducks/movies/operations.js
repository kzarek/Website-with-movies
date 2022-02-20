
import { createAction } from "redux-api-middleware"
import types from "./types";

export const getMoviesList = () => {
	return createAction({
		endpoint: 'http://localhost:5000/api/movies',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		types: [
			types.MOVIES_LIST_REQUEST,
			types.MOVIES_LIST_SUCCESS,
			types.MOVIES_LIST_FAILURE
		]
	})
}

export const deleteMovie = (MovieId) => {
	return createAction({
		endpoint: 'http://localhost:5000/api/movies/' + MovieId,
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		types: [
			types.MOVIE_DELETE_REQUEST,
			{
				type: types.MOVIE_DELETE_SUCCESS,
				payload: MovieId
			},
			types.MOVIE_DELETE_FAILURE
		]
	})
}

export const createMovie = (newMovie) => {
	return createAction({
		endpoint: 'http://localhost:5000/api/movies',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newMovie),
		types: [
			types.CREATE_MOVIE_REQUEST,
			types.CREATE_MOVIE_SUCCESS,
			types.CREATE_MOVIE_FAILURE
		]
	})
}

export const editMovie = (editedMovie) => {
	return createAction({
		endpoint: 'http://localhost:5000/api/movies/' + editedMovie.id,
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(editedMovie),
		types: [
			types.EDIT_MOVIE_REQUEST,
			types.EDIT_MOVIE_SUCCESS,
			types.EDIT_MOVIE_FAILURE
		]
	})
}

export const updateDirector = (movieId, directorId) => {
	console.log("updateDirector:", movieId, directorId)
	let requestBody = directorId !== null ? JSON.stringify({ id: directorId }) : "{}"
	return createAction({
		endpoint: 'http://localhost:5000/api/movies/' + movieId + '/director',
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: requestBody,
		types: [
			types.UPDATE_DIRECTOR_REQUEST,
			{
				type: types.UPDATE_DIRECTOR_SUCCESS,
				payload: [movieId, directorId]
			},
			types.UPDATE_DIRECTOR_FAILURE
		]
	})
}