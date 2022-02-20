import { useState, useEffect } from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { getPersons } from "../../ducks/persons/selectors";
import { deletePerson } from "../../ducks/persons/operations";
import { getPersonsList } from "../../ducks/persons/operations";
import { getMovies } from "../../ducks/movies/selectors";


const PersonList = ({ persons, deletePerson, getPersonsList,movies, loading }) => {
	const [sortingFunction, setSortingFunction] = useState("")
	const [displayedPersons, setDisplayedPersons] = useState([])
	const [search, setSearch] = useState("")


	

	useEffect(() => {
		let newDisplayedPersons = [...persons]
		if (sortingFunction) {
			newDisplayedPersons = newDisplayedPersons.sort(sortingFunction)
		}
		setDisplayedPersons(newDisplayedPersons)
	}, [sortingFunction, persons])

	function abcsort(a, b) {
		if (a.last_name > b.last_name)
			return 1
		else
			return -1
	}

	function datesort(a, b) {
		if (a.birth_date > b.birth_date)
			return 1
		else
			return -1
	}

	function moviesort(a, b) {
		let aMovieCount = movies.filter(m => m.director_id === a.id).length
		let bMovieCount = movies.filter(m => m.director_id === b.id).length
		if (aMovieCount > bMovieCount)
			return 1
		else
			return -1
	}

	function choice(e) {
		if (e.target.value === "alphabet") {
			setSortingFunction(() => abcsort)
		} else if (e.target.value === "birth date") {
			setSortingFunction(() => datesort)
		} else if (e.target.value === "movie directed count"){
			setSortingFunction(() => moviesort)
		} else {
			setSortingFunction("")
		}
	}

	const filterPersons = displayedPersons.filter(n =>
		n.last_name ?
			n.last_name.toLowerCase().includes(search.toLowerCase()) : null
	)

	

	return (

		<div className="PersonsList">
			{loading && "Ładowanie"}
			<h3>Lista reżyserów</h3>
			<div className="SortAndButtons">
				<div className="Buttons">
					<Link to="/addPerson"><button>Dodaj reżysera</button></Link>
				</div>

				<div className="Filter">
					<p>Szukaj nazwiska</p>
					<input onChange={(e) => { setSearch(e.target.value) }}></input>
				</div>
				<p>Sortuj</p>
				<select name="sort" onChange={choice} defaultValue="nie sortuj">
					<option value="nie sortuj">-</option>
					<option value="alphabet">alfabetycznie</option>
					<option value="birth date">data urodzenia</option>
					<option value="movie directed count">stworzone filmy</option>
				</select>
			</div>

			<div className="Persons">

				{persons && filterPersons.map(person => {
					return (
						<div key={person.id} className="Person">
							<Link className="link" to={`/persons/${person.id}`}>
								<div>
									<img src={process.env.PUBLIC_URL + '/Director.jpg'} alt="tu powinnien być reżyser"></img>
									<div>{person.first_name} {person.last_name} </div>
								</div>
							</Link>
						</div>)
				})}
			</div>
		</div>


	)
}

const mapStateToProps = (state) => {
	return {
		movies: getMovies(state),
		persons: getPersons(state),
		loading: state.persons.loading
	};
}

const mapDispatchToProps = {
	deletePerson,
	getPersonsList
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonList);