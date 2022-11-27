import React from 'react'

function Search(props) {

  return (
    <section className='layout-row justify-content-center mb-40'>
      <input
        type='text'
        placeholder='Search for movie by name'
        className='w-75 py-2'
        data-testid='search'
        onChange={props.searches}
      />
    </section>
  )
}

export default Search
