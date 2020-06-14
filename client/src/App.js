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
      console.log(res.data.data);
      const { title, poster, directors, cast, writers } = res.data.data[0];
      setMovie({
        title,
        poster,
        directors,
        cast,
        writers,
      });
    });
  }, []);

  return (
    <div>
      <MovieListItem
        title={movie.title}
        poster={movie.poster}
        directors={movie.directors}
        cast={movie.cast}
        writers={movie.writers}
        seen={movie.seen}
      />
    </div>
  );
};

export default App;
