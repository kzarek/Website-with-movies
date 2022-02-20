import { createAction } from "redux-api-middleware"
import types from "./types";

export const getPersonsList = () => {
	return createAction({
		endpoint: 'http://localhost:5000/api/persons',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		types: [
			types.PERSONS_LIST_REQUEST,
			types.PERSONS_LIST_SUCCESS,
			types.PERSONS_LIST_FAILURE
		]
	})
}

export const createPerson = (newPerson) => {
	return createAction({
		endpoint: 'http://localhost:5000/api/persons',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newPerson),
		types: [
			types.CREATE_PERSON_REQUEST,
			types.CREATE_PERSON_SUCCESS,
			types.CREATE_PERSON_FAILURE
		]
	})
}

export const editPerson = (editedPerson) => {
	return createAction({
		endpoint: 'http://localhost:5000/api/persons/' + editedPerson.id,
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(editedPerson),
		types: [
			types.EDIT_PERSON_REQUEST,
			types.EDIT_PERSON_SUCCESS,
			types.EDIT_PERSON_FAILURE
		]

	})
}


export const deletePerson = (PersonId) => {
	return createAction({
		endpoint: 'http://localhost:5000/api/persons/' + PersonId,
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		types: [
			types.PERSON_DELETE_REQUEST,
			{
				type: types.PERSON_DELETE_SUCCESS,
				payload: PersonId
			},
			types.PERSON_DELETE_FAILURE
		]
	})
}




