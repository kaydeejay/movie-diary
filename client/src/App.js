import React, { useState, useEffect } from "react";
import API from "./utils/API";
import MovieListItem from "./components/MovieListItem";

const App = () => {
  const [movie, setMovie] = useState({
    title: "",
    poster: "",
    directors: "",
    cast: "",
    writers: "",
  });

  useEffect(() => {
    API.getMovies().then((res) => {
      setMovie({
        title: res.data.title,
        poster: res.data.poster,
        directors: res.data.directors,
        cast: res.data.cast,
        writers: res.data.writers,
      });
    });
  }, []);

  return (
    <div>
      <MovieListItem
        title={movie.title}
        poster={movie.title}
        directors={movie.directors}
        cast={movie.cast}
        writers={movie.writers}
      />
    </div>
  );
};

export default App;
