import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './ui/Navbar';
import MovieList from './ui/movies/MovieList';
import MovieDetails from './ui/movies/MovieDetails';
import MovieForm from './ui/movies/MovieForm';
import PersonsList from './ui/persons/PersonsList';
import PersonDetails from './ui/persons/PersonDetails';
import PersonForm from './ui/persons/PersonForm';
import { useEffect } from "react"
import { connect } from "react-redux"
import { getMoviesList } from "./ducks/movies/operations"
import { getPersonsList } from "./ducks/persons/operations";

function App({ getMoviesList, getPersonsList }) {

  useEffect(() => {

    getMoviesList();
    console.log("pobieranie filmów")
    getPersonsList();
    console.log("pobieranie osób")
  }, [getMoviesList,getPersonsList]);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/addMovie" element={<MovieForm />} />
            <Route path="/editMovie/:id" element={<MovieForm />} />
            <Route path="/persons" element={<PersonsList />} />
            <Route path="/persons/:id" element={<PersonDetails />} />
            <Route path="/addPerson" element={<PersonForm />} />
            <Route path="/editPerson/:id" element={<PersonForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

const mapDispatchToProps = {
  getMoviesList,
  getPersonsList
}

export default connect(null, mapDispatchToProps)(App);
