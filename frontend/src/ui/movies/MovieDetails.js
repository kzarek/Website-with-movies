import { connect, shallowEqual } from "react-redux"
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getOneMovieById } from "../../ducks/movies/selectors";
import { useSelector } from "react-redux";
import { useState, useEffect} from "react";
import { deleteMovie } from "../../ducks/movies/operations";
import { updateDirector } from "../../ducks/movies/operations";
import { getMoviesList } from "../../ducks/movies/operations";
import { getPersonsList } from "../../ducks/persons/operations";
const MovieDetails = ({ director, deleteMovie, updateDirector,getMoviesList,getPersonsList }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [movieDirector, setMovieDirector] = useState({})
	const [directorToChange, setDirectorToChange] = useState(null)

	const movie = useSelector(
		(state) => getOneMovieById(state, id),
		shallowEqual
	);


	useEffect(() => {
		if (movie) {
			const directorFromState = director.find(director => director.id === movie.director_id)
			if (directorFromState){
				setMovieDirector(directorFromState)
				setDirectorToChange(directorFromState.id)
			}
			else{
				setMovieDirector("")
			}
					
		}
	}, [movie, director])

	useEffect(() => {
		if (movieDirector && movie) {
			document.getElementById("Select").value = (movieDirector.id == null ? "" : movieDirector.id)
		}
	}, [movie, movieDirector])

	function handleChange(directorId) {
		setDirectorToChange(directorId)
	}

	function handleSubmit() {
		if (directorToChange){
			const newDirector = director.find(director => director.id === parseInt(directorToChange))
			setMovieDirector(newDirector)
			updateDirector(id, directorToChange)
		}
		else{
			updateDirector(id, null)
			setMovieDirector(null)
		}
		
	}

	return (
		<div className="MainMovieDetail">
			{movie &&
				(
					<div className="MovieDetail">
						<img src={movie.image_url} alt="" />
						<div className="title">{movie.title}</div>
						<div className="release_date">data wydania {new Date(movie.release_date).toLocaleDateString('en-CA')}</div>
						<div className="genre">gatunek: {movie.genre}</div>
						<div className="description">{movie.description}</div>
						{!movieDirector && <div>reżyser: brak</div>}
						 {movieDirector && ( <Link className="link" to={`/persons/${movieDirector.id}`}>
							<div>reżyser: {movieDirector.first_name} {movieDirector.last_name} </div>
						</Link>)}
						<select id="Select" onChange={(e) => { handleChange(e.target.value) }}>
							<option value={null} label="-"/>
							{director.map(director => <option
								value={director.id}
								label={director.first_name + " " + director.last_name}
								key={director.id} />
							)}
						</select>
						<div className="ChangeDirector"><button onClick={handleSubmit} >Zmień reżysera</button></div>

						<div className="buttons">
							<Link to={'/editMovie/' + id}><button>Edytuj</button></Link>
							<button onClick={() => { deleteMovie(id); navigate("/movies") }}>Usuń</button>
						</div>

					</div>
				)}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		director: state.persons.persons
	}
}

const mapDispatchToProps = {
	getOneMovieById,
	deleteMovie,
	updateDirector,
	getMoviesList,
	getPersonsList
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);