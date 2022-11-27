import React, { useState } from 'react'
import './App.css'
import 'h8k-components'

import { Movieform, Movieslist, Search } from './components'

const title = 'Favorite Movie Directory'

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function addMovie(movieName, movieRating, movieDuration) {

    setMovies((prevMovies) =>
      [...prevMovies, { movieName, movieRating, movieDuration }]
    );
  }

  function handleSearch(event) {
    const values = event.target.value;
    if (values.length >= 2) {
      return setSearchTerm(values);
    }
    return setSearchTerm("");
  }

  const filteredMovies = movies.filter(movie => {
    return movie.movieName.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div>
      <h8k-navbar header={title} />
      <div className='layout-row justify-content-center mt-100'>
        <div className='w-30 mr-75'>
          <Movieform onAdd={addMovie} />
        </div>
        <div className='layout-column w-30'>
          <Search searches={handleSearch} />
          {filteredMovies.map((movie, index) => {
            return (
              <Movieslist
                key={index}
                name={movie.movieName}
                rating={movie.movieRating}
                duration={movie.movieDuration}
              />);
          })}
          <div data-testid='noResult'>
            {!filteredMovies && null}
            {filteredMovies.length === 0 && <h3 className='text-center'>No Results Found</h3>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
