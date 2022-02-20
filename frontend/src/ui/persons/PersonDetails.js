import { connect, shallowEqual } from "react-redux"
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getOnePersonById } from "../../ducks/persons/selectors";
import { useSelector } from "react-redux";
import { deletePerson } from "../../ducks/persons/operations";
import { useEffect, useState } from "react";
import { updateDirector } from "../../ducks/movies/operations";
import { getMoviesList } from "../../ducks/movies/operations";
import { getPersonsList } from "../../ducks/persons/operations";
const PersonDetails = ({ deletePerson, movies, updateDirector,getMoviesList,getPersonsList}) => {

	// useEffect(() => {
	// 	getPersonsList()
	// 	getMoviesList();
	//   }, [getMoviesList]);

	const navigate = useNavigate();
	const { id } = useParams();
	const [moviesList, setMoviesList] = useState([])
	const person = useSelector(
		(state) => getOnePersonById(state, id),
		shallowEqual
	);

	useEffect(() => {
		if (movies) {
			const moviesResult = movies.filter(movie => movie.director_id === parseInt(id))
			setMoviesList(moviesResult)
		}
	}, [movies, person, id])

	function deleteDirector(){
		for (const movie of moviesList) {
			updateDirector(movie.id, null)
		}
		deletePerson(id)
		navigate("/persons")
		
	}

	return (
		<div className="PersonDetailsMain">
			{!person && <div>Nie ma takiej osoby</div>}
			{person && moviesList && (<div className="PersonDetailsPage">
				<div className="PersonDetails">
					<div className="PersonJob">REŻYSER</div>
					<div className="PersonName">{person.first_name} {person.last_name}</div>
					<img src={process.env.PUBLIC_URL + '/Director.jpg'} alt="tu powinno być zdjecie rezysera"></img>
					<div className="PersonBirthDate"> Data urodzenia {new Date(person.birth_date).toLocaleDateString('en-CA')}</div>
					<div className="PersonNationality">Narodowość {person.nationality}</div>
				</div>

				<div className="directorMovies">Filmy reżysera</div>
				<div id="moviesList">{moviesList && moviesList.map(movie => {
					return (
						<div key={movie.id} className="Movie">
							<Link className="link" to={`/movies/${movie.id}`}>
								<img src={movie.image_url} alt="movie" ></img>
							</Link>
							<h3>{movie.title}</h3>
						</div>
					)
				})}
				</div>
				<div className="buttons">
					<Link to={'/editPerson/' + id}><button>Edytuj</button></Link>
					<button onClick={() => { deleteDirector() }}>Usuń </button>
				</div>
			</div>)}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		movies: state.movies.movies
	}
}

const mapDispatchToProps = {
	deletePerson,
	updateDirector,
	getMoviesList,
	getPersonsList
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetails)