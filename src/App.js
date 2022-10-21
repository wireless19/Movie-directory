import React, {useState} from 'react'
import './App.css'
import 'h8k-components'

import { Movieform, Movieslist, Search } from './components'

const title = 'Favorite Movie Directory'

function App() {

  const [movies, setMovies] = useState([]);

  function addMovie(newMovie){
    
    setMovies(prevMovies => {
      return [...prevMovies, newMovie];
    });
  }

  return (
    <div>
      <h8k-navbar header={ title } />
      <div className='layout-row justify-content-center mt-100'>
        <div className='w-30 mr-75'>
        <Movieform onAdd={addMovie} />
        </div>
        <div className='layout-column w-30'>
          <Search />
          {movies.map((movie, index) => {
          return (
          <Movieslist 
          key={index}
          name={movie.name}
          rating={movie.rating}
          duration={movie.duration}
           />);
           })} 
          <div data-testid='noResult'>
            <h3 className='text-center'>No Results Found</h3>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default App;
