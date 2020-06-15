import React, { useState, useEffect } from "react";
import API from "./utils/API";
import MovieList from "./components/MovieList";

const App = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    API.getMovies().then((res) => {
      console.log(res.data.data);
      setMovieList(res.data.data);
    });
  }, []);

  return (
    <div>
      <MovieList />
    </div>
  );
};

export default App;
