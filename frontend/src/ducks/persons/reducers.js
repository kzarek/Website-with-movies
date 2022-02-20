import types from "./types";

const initState = {
    persons: [],
	loading:false,
    error: ''
}

export const personReducer=(state=initState,action)=>{
	switch(action.type){
		case types.PERSONS_LIST_REQUEST:
			return{...state,loading:true}

		case types.PERSONS_LIST_FAILURE:
			alert(action.payload)
			return{...state,loading:false,error:action.payload}

		case types.PERSONS_LIST_SUCCESS:
			return{...state,persons:[...action.payload],loading:false} 
	
		case types.CREATE_PERSON_REQUEST:
			return{...state,loading:true}

		case types.CREATE_PERSON_FAILURE:
			alert(action.payload)
			return{...state,loading:false,error:action.payload}

		case types.CREATE_PERSON_SUCCESS:
			alert("reżyser został dodany")
			return{ ...state, persons:[...state.persons,action.payload]};

		case types.PERSON_DELETE_REQUEST:
			return{...state,loading:true}

		case types.PERSON_DELETE_FAILURE:
			alert(action.payload)
			return{...state,loading:false,error:action.payload}

		case types.PERSON_DELETE_SUCCESS:
			alert("reżyser został usunięty")
			return {...state,persons:[...state.persons.filter(person=>person.id!==parseInt(action.payload))],loading:false}

		case types.EDIT_PERSON_REQUEST:
			return{...state,loading:true}
	
		case types.EDIT_PERSON_FAILURE:
			alert(action.payload)
			return{...state,loading:false,error:action.payload}

		case types.EDIT_PERSON_SUCCESS:
			alert("reżyser został edytowany")
			return {...state,persons:[...state.persons.filter(person=>person.id!==action.payload.id),action.payload],loading:false}
		default:
			 return state
	}

}