import React, { useEffect } from 'react';
import API from './utils/API';

const App = () => {

  useEffect(() => {
    API.getMovies()
    .then(res => console.log(res.data));
  })

  return (
    <div>
      <h1>Check the console ---></h1>
    </div>
  )
}

export default App;
