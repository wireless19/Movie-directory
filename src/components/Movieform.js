import React, { useState } from 'react'

function Movieform(props) {

  const [movieName, setMovieName] = useState("");
  const [movieRating, setMovieRating] = useState("");
  const [movieDuration, setMovieDuration] = useState("");


  const [errMessDura, setErrMessDura] = useState(false);

  function handleNameChange(event) {
    const nameValue = event.target.value;
    setMovieName(nameValue);
  }

  function handleRatingChange(event) {
    const rateValue = event.target.value;
    setMovieRating(rateValue);
  }

  function handleDuraChange(event) {
    const durationValue = event.target.value;
    setMovieDuration(durationValue);
    setErrMessDura(false);
  }

  function handleSubmit(event) {
    if (!movieName) {
      alert("please enter movie name");
      return;
    }

    const rating = parseInt(movieRating);
    if (!rating || rating > 100) {
      let errorM = "please rate the movie";
      if (rating > 100) {
        errorM = "you can't rate more than 100";
      }
      alert(errorM);
      return;
    }

    if (!movieDuration) {
      alert("please enter movie duration");
      return;
    }

    const hoursReSingle = /^\d[h]$/;
    const hoursRe = /^\d.\d[h]$/;
    const minReTwod = /^\d\d[m]$/;
    const minRethreed = /^\d\d\d[m]$/

    if (movieDuration.match(minReTwod) || movieDuration.match(minRethreed) || movieDuration.match(hoursRe) || movieDuration.match(hoursReSingle)) {
      let duration = movieDuration.split("h")[0].concat("Hrs");
      // duration = movieDuration.split("m")[0];
      if (movieDuration.match(minReTwod) || movieDuration.match(minRethreed)) {
        duration = movieDuration.split("m")[0];
        duration = duration / 60;
        duration = parseInt(duration).toFixed(1).concat("Hrs");
      }
      props.onAdd(movieName, movieRating.concat("/100"), duration);
    } else {
      setErrMessDura(true);
    }

    setMovieName("");
    setMovieRating("");
    setMovieDuration("");
    event.preventDefault();
  }

  return (
    <section>
      <div className='card pa-30'>
        <form onSubmit={handleSubmit}>
          {/* <form> */}
          <div className='layout-column mb-15'>
            <label htmlFor='name' className='mb-3'>Movie Name</label>
            <input
              type='text'
              id='name'
              placeholder='Enter Movie Name'
              data-testid='nameInput'
              value={movieName}
              onChange={handleNameChange}
            />
          </div>

          <div className='layout-column mb-15'>
            <label htmlFor='ratings' className='mb-3'>Ratings</label>
            <input
              type='number'
              id='ratings'
              placeholder='Enter Rating on a scale of 1 to 100'
              data-testid='ratingsInput'
              value={movieRating}
              onChange={handleRatingChange}
            />
          </div>

          <div className='layout-column mb-30'>
            <label htmlFor='duration' className='mb-3'>Duration</label>
            <input
              type='text'
              id='duration'
              placeholder='Enter duration in hours or minutes'
              data-testid='durationInput'
              value={movieDuration}
              onChange={handleDuraChange}
            />
          </div>
          {/* Use this div when time format is invalid */}
          {errMessDura && <div
            className='alert error mb-30'
            data-testid='alert'
          >
            Please specify time in hours or minutes (e.g. 2.5h or 150m)
          </div>}

          <div className='layout-row justify-content-end'>
            <button
              type='submit'
              className='mx-0'
              data-testid='addButton'
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}


export default Movieform;
