import { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { deleteMovie } from "../../ducks/movies/operations"
import { getPersons } from "../../ducks/persons/selectors"
import { getMoviesList } from "../../ducks/movies/operations"
import { getPersonsList } from "../../ducks/persons/operations"
const MovieList = ({ movies, loading, deleteMovie, directors,getMoviesList,getPersonsList }) => {

	useEffect(() => {
		getMoviesList();
		getPersonsList();
		
	  }, [getMoviesList,getPersonsList]);


	const [moviesToDelete, setMoviesToDelete] = useState([])
	const [searchToFilter, setSearchToFilter] = useState("")
	const [directorToFilter, setDirectorToFilter] = useState("")
	const [categoriesToFilter, setCategoriesToFilter] = useState([])
	const [sortingFunction, setSortingFunction] = useState("")
	const [displayedMovies, setDisplayedMovies] = useState([])

	const filterMovies = displayedMovies
		.filter(movie => directorToFilter === "" || movie.director_id + "" === directorToFilter)
		.filter(movie => categoriesToFilter.length === 0 || categoriesToFilter.includes(movie.genre))
		.filter(movie => movie.title.toLowerCase().includes(searchToFilter.toLowerCase())
		)

	useEffect(() => {
		if (movies) {
			
			let newDisplayedMovies = [...movies]

			if (sortingFunction)
				newDisplayedMovies = newDisplayedMovies.sort(sortingFunction)

			setDisplayedMovies(newDisplayedMovies)
		}
	}, [sortingFunction, movies])
	
	function abcsort(a, b) {
		if (a.title > b.title)
			return 1
		else
			return -1
	}

	function abcsortd(a, b) {
		if (a.title < b.title)
			return 1
		else
			return -1
	}

	function datesort(a, b) {
		if (a.release_date > b.release_date)
			return 1
		else
			return -1
	}

	function idSort(a, b) {
		if (a.id > b.id)
			return 1
		else
			return -1
	}

	function deleteMany() {
		if( moviesToDelete.length===0){
			alert("nie zaznaczono żadnego filmu ")
		}
		else{
			for (const id of moviesToDelete)
			deleteMovie(id)
			alert("Zaznaczone filmy zostały usunięte");
		}
	
	}

	function addMoviesToDelete(id, value) {
		if (value === true)
			setMoviesToDelete([...moviesToDelete, id])
		else
			setMoviesToDelete(moviesToDelete.filter(n => n !== id))
	}

	function addCategoryFilter(id, checkboxStatus) {
		

		if (checkboxStatus)
			setCategoriesToFilter([...categoriesToFilter, id])
		else
			setCategoriesToFilter(categoriesToFilter.filter(n => n !== id))
	}

	function setDirectorFilter(id) {
	
		setDirectorToFilter(id)
	}

	function choice(e) {
		console.log(e.target.value);

		if (e.target.value === "alphabet")
			setSortingFunction(() => abcsort)
		else if (e.target.value === "alphabetd")
			setSortingFunction(() => abcsortd)
		else if (e.target.value === "release date")
			setSortingFunction(() => datesort)
		else if (e.target.value === "movieId")
			setSortingFunction(() => idSort)
		else
			setSortingFunction("")
	}

	return (
		<div className="MoviesListPage">
			<h3>Filmy</h3>
			<div className="MoviesList">
				<div className="MoviesFilters">
					<div className="Filter">
						<p>Szukaj tytuł</p>
						<input onChange={(e) => { setSearchToFilter(e.target.value) }}></input>
					</div>
					<div className="selectFilter">
						<select id="Select" onChange={(e) => { setDirectorFilter(e.target.value) }} >
							<option value="">-</option>
							{directors.map(director => {
								return (
									<option value={director.id} label={director.first_name + " " + director.last_name} key={director.id} />
								)
							})}
						</select>
					</div>
					<div className="checkboxFilter">
						<input type="checkbox" id="akcja" name="akcja" onChange={(e) => { addCategoryFilter(e.target.id, e.target.checked) }}></input>
						<label htmlFor="akcja">akcja</label>
						<input type="checkbox" id="komedia" name="komedia" onChange={(e) => { addCategoryFilter(e.target.id, e.target.checked) }}></input>
						<label htmlFor="komedia">komedia</label>
						<input type="checkbox" id="dramat" name="dramat" onChange={(e) => { addCategoryFilter(e.target.id, e.target.checked) }}></input>
						<label htmlFor="dramat">dramat</label>
						<input type="checkbox" id="fantasy" name="fantasy" onChange={(e) => { addCategoryFilter(e.target.id, e.target.checked) }}></input>
						<label htmlFor="fantasy">fantasy</label>
						<input type="checkbox" id="horror" name="horror" onChange={(e) => { addCategoryFilter(e.target.id, e.target.checked) }}></input>
						<label htmlFor="horror">horror</label>
						<input type="checkbox" id="katastroficzny" name="katastroficzny" onChange={(e) => { addCategoryFilter(e.target.id, e.target.checked) }}></input>
						<label htmlFor="katastroficzny">katastroficzny</label>
						<input type="checkbox" id="przygodowy" name="przygodowy" onChange={(e) => { addCategoryFilter(e.target.id, e.target.checked) }}></input>
						<label htmlFor="przygodowy">przygodowy</label>
						<input type="checkbox" id="science-fiction" name="science-fiction" onChange={(e) => { addCategoryFilter(e.target.id, e.target.checked) }}></input>
						<label htmlFor="science-fiction">science-fiction</label>
						<input type="checkbox" id="thriller" name="thriller" onChange={(e) => { addCategoryFilter(e.target.id, e.target.checked) }}></input>
						<label htmlFor="thriller">thriller</label>
						<input type="checkbox" id="western" name="western" onChange={(e) => { addCategoryFilter(e.target.id, e.target.checked) }}></input>
						<label htmlFor="western">western</label>
						<input type="checkbox" id="wojenny" name="wojenny" onChange={(e) => { addCategoryFilter(e.target.id, e.target.checked) }}></input>
						<label htmlFor="wojenny">wojenny</label>
						<input type="checkbox" id="romans" name="romans" onChange={(e) => { addCategoryFilter(e.target.id, e.target.checked) }}></input>
						<label htmlFor="romans">romans</label>
						<input type="checkbox" id="kryminal" name="scales" onChange={(e) => { addCategoryFilter(e.target.id, e.target.checked) }}></input>
						<label htmlFor="kryminal">kryminał</label>
					</div>
				</div>
				<div className="SortAndButtons">
					<Link to="/addMovie"><button>Dodaj Film</button></Link>
					<button onClick={() => deleteMany()}>Usuń zaznaczone</button>
					<div className="Sorting">
						<p>sortowanie</p>
						<select name="sort" onChange={choice} defaultValue="nie sortuj">
							<option value="nie sortuj">-</option>
							<option value="alphabet">alfabetycznie</option>
							<option value="alphabetd">alfabetycznie malejąco</option>
							<option value="release date">data wydania</option>
							<option value="movieId">id filmu</option>
						</select>
					</div>
				</div>
				<div className="OnlyMovies">
					{loading ?
						<div>Ładowanie....</div>
						:
						filterMovies.map(movie => {
							return (
								<div key={movie.id} className="Movie">
									<Link className="link" to={`/movies/${movie.id}`}>
										<img src={movie.image_url} alt="movie" ></img>
									</Link>
									<h3>{movie.title}</h3>
									<div className="GenreAndInput">
									<p>{movie.genre}</p>
									<input type="checkbox" value="checkbox" onChange={(e) => { addMoviesToDelete(movie.id, e.target.checked) }} />
									</div>
									
								</div>)
						})
					}
				</div>
			</div>
		</div>
	)
}

const mapDispatchToProps = {
	deleteMovie,
	getMoviesList,
	getPersonsList
}

const mapStateToProps = (state) => {
	return {
		movies: state.movies.movies,
		loading: state.movies.loading,
		directors: getPersons(state)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);