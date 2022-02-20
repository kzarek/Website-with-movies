import { useSelector, shallowEqual } from "react-redux";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { v4 as uuidv4 } from 'uuid'
import { connect } from "react-redux";
import * as Yup from 'yup';
import { createPerson } from "../../ducks/persons/operations";
import { useParams, useNavigate } from "react-router-dom";
import { getOnePersonById } from "../../ducks/persons/selectors";
import { useState, useEffect } from "react";
import { editPerson } from "../../ducks/persons/operations";

const personSchema = Yup.object().shape({
	first_name: Yup.string().required('Imie jest wymagane').max(30, "Imie nie może być takie długie "),
	last_name: Yup.string().required('Nazwisko jest wymagane').max(40, "Nazwisko nie może być takie długie"),
	birth_date: Yup.date().required('Data urodzenia jest wymagana'),
	nationality: Yup.string().required('Narodowość jest wymagana').max(30, "Narodowość jest za długa"),
})

const PersonForm = ({ createPerson, editPerson,error}) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const person = useSelector(state => getOnePersonById(state, id), shallowEqual)
	const [isEdited, setIsEdited] = useState(false)

	const [initialValues, setInitialValues] = useState({
		id: uuidv4(),
		first_name: '',
		last_name: '',
		birth_date: '2020-12-31',
		nationality: ''
	});

	const handleSubmit = (values) => {
		if (isEdited === true) {
			console.log(values)
			editPerson(values)
		
			navigate('/persons/' + id)
		} else {
			createPerson(values);
			if (error===''){
				navigate('/persons')
			}
			
		}
	}

	useEffect(() => {
		(async () => {
			if (person) {
				setInitialValues(Object.assign(person, { birth_date: person.birth_date.slice(0, 10) }));
				console.log(person)
				setIsEdited(true)
			}
		})()
	}, [person])

	return (
		<div className="MainForm" id="PersonForm">
			{person ? (<h2>Edytuj  <span className="span">Reżysera</span></h2>) : (<h2>Dodaj  <span className="span">Reżysera</span></h2>)}

			<Formik initialValues={initialValues}
				validationSchema={personSchema}
				onSubmit={(values) => handleSubmit(values)}
				enableReinitialize={true}>
				<Form>
					<label htmlFor="first_name" >Imie</label>
					<br />
					<Field name="first_name" id="Field" />
					<ErrorMessage name="first_name" component="div" />
					<br />
					<label htmlFor="last_name">Nazwisko</label>
					<br />
					<Field name="last_name" id="Field" />
					<ErrorMessage name="last_name" component="div" />
					<br />
					<label htmlFor="birth_date">Data urodzenia</label>
					<br />
					<Field as="input" name="birth_date" type="date" id="Field" />
					<ErrorMessage name="birth_date" component="div" />
					<br />
					<label htmlFor="nationality">Narodowość</label>
					<br />
					<Field name="nationality" as='select' id="Field">
						<option value="" label="-" />
						<option value="Polska" label="Polska" />
						<option value="USA" label="USA" />
						<option value="Wielka Brytania" label="Wielka Brytania" />
						<option value="Chiny" label="Chiny" />
						<option value="Japonia" label="Japonia" />
						<option value="Brazylia" label="Brazylia" />
						<option value="Kanada" label="Kanada" />
						<option value="Meksyk" label="Meksyk" />
						<option value="Hiszpania" label="Hiszpania" />
						<option value="Włochy" label="Włochy" />
						<option value="Niemcy" label="Niemcy" />
						<option value="Rosja" label="Rosja" />
						<option value="Czechy" label="Czechy" />
					</Field>
					<ErrorMessage name="nationality" component="div" />
					<br />
					<button type="submit" className="button">zatwierdź</button>
				</Form>
			</Formik>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		persons: state.persons.persons,
		error: state.persons.error
	}
};

const mapDispatchToProps = {
	createPerson,
	editPerson
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonForm)