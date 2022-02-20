import { Field, Form, Formik, ErrorMessage } from "formik";
import { v4 as uuidv4 } from 'uuid'
import { connect } from "react-redux";
import * as Yup from 'yup';
import { createMovie } from "../../ducks/movies/operations";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { getOneMovieById } from "../../ducks/movies/selectors";
import { editMovie } from "../../ducks/movies/operations";
import { useEffect, useState } from "react";



const MovieForm = ({ createMovie, directors, editMovie, error,titles }, props) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const movie = useSelector(state => getOneMovieById(state, id), shallowEqual)
	const [isEdited, setIsEdited] = useState(false)
	const [initialValues, setInitialValues] = useState({
		id: uuidv4(),
		title: '',
		genre: '',
		release_date: '',
		description: '',
		image_url: '',
		director: null
	});

	


	const editedMovieSchema = Yup.object().shape(
		{
			title: Yup.string().required('Tytuł jest wymagany').max(40, "podany tytuł jest za długi"),
			genre: Yup.string().required("Gatunek jest wymagany"),
			release_date: Yup.date().required("Data jest wymagana"),
			description: Yup.string().required("Opis jest wymagany").min(50, "Podany opis jest za krótki"),
			image_url: Yup.string().matches(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/, "Niepoprawny adres url").required("Tytuł jest wymagany"),
		}
	)

	const addMovieSchema = Yup.object().shape(
		{
			title: Yup.string().required('Tytuł jest wymagany').notOneOf(titles,"tytuł nie może sie powtarzać").max(40, "podany tytuł jest za długi"),
			genre: Yup.string().required("Gatunek jest wymagany"),
			release_date: Yup.date().required("Data jest wymagana"),
			description: Yup.string().required("Opis jest wymagany").min(50, "Podany opis jest za krótki"),
			image_url: Yup.string().matches(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/, "Niepoprawny adres url").required("Tytuł jest wymagany"),
		}
	)

	const handleSubmit = (values) => {
		if (isEdited === false) {
			createMovie({
				id: uuidv4(),
				title: values.title,
				description: values.description,
				release_date: values.release_date,
				genre: values.genre,
				image_url: values.image_url,
				director_id: values.director_id
			});
			if (error === '') {
				navigate('/movies')
			}
		} else {
			editMovie({
				id: values.id,
				title: values.title,
				description: values.description,
				release_date: values.release_date,
				genre: values.genre,
				image_url: values.image_url,
				director_id: values.director_id
			})
			if (error === '') {
				navigate('/movies/' + id)
			} 
		}
	}

	useEffect(() => {
		(async () => {
			if (movie) {
				setInitialValues(Object.assign(movie, { release_date: movie.release_date.slice(0, 10) }));
				setIsEdited(true)
			}
		})()
	}, [movie])

	return (
		<div className="MainForm">

			{movie ? (<h2> Edit<span className="span"> Movie</span></h2>) : (
			<h2>Add <span className="span">Movie</span></h2>)}

			<Formik initialValues={initialValues}
				validationSchema={movie ? editedMovieSchema: addMovieSchema}
				onSubmit={(values) => handleSubmit(values)}
				enableReinitialize={true}>
				<Form>
					<label htmlFor="title">tytuł</label>
					<br />
					<Field name="title" id="Field" />
					<ErrorMessage name="title" component="div" />
					<br />
					<label htmlFor="genre">gatunek</label>
					<br />
					<Field name="genre" as='select' id="Field">
						<option value="" label="-" />
						<option value="akcja" label="akcja" />
						<option value="komedia" label="komedia" />
						<option value="dramat" label="dramat" />
						<option value="fantasy" label="fantasy" />
						<option value="horror" label="horror" />
						<option value="katastroficzny" label="katastroficzny" />
						<option value="przygodowy" label="przygodowy" />
						<option value="science-fiction" label="science-fiction" />
						<option value="thriller" label="thriller" />
						<option value="western" label="western" />
						<option value="wojenny" label="wojenny" />
						<option value="romans" label="romans" />
						<option value="kryminał" label="kryminał" />
					</Field>
					<ErrorMessage name="genre" component="div" />
					<br />
					<label htmlFor="release_date">data wydania</label>
					<br />
					<Field name="release_date" type="date" id="Field" />
					<ErrorMessage name="release_date" component="div" />
					<br />
					<label htmlFor="description">opis</label>
					<br />
					<Field name="description" id="Field" />
					<ErrorMessage name="description" component="div" />
					<br />
					<label htmlFor="image_url">adres obrazu</label>
					<br />
					<Field name="image_url" id="Field" />
					<ErrorMessage name="image_url" component="div" />
					<br />
					<label htmlFor="director_id">rezyser</label>
					<br />
					<Field name='director_id' as='select'>
						<option value={null} label="-" />
						{directors.map(director =>
							<option value={director.id}
								label={director.first_name + " " + director.last_name}
								key={director.id} />
						)}
					</Field> 
					<br />
					<button type="submit" className="button">submit</button>
				</Form>
			</Formik>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		directors: state.persons.persons,
		error: state.movies.error,
		titles: state.movies.movies.map(movie=>movie.title)
	}
};

const mapDispatchToProps = {
	createMovie,
	editMovie,

};

export default connect(mapStateToProps, mapDispatchToProps)(MovieForm)
