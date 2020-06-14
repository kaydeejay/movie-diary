import React, { useState, useEffect } from "react";

const MovieListItem = (props) => {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    setSeen(props.seen);
  });

  return (
    <div>
      <h3>{props.title}</h3>
      <img src={props.poster} alt="" />
      <p>Directed By: {props.directors}</p>
      <p>Starring: {props.cast}</p>
      <p>Written By: {props.writers}</p>
    </div>
  );
};

export default MovieListItem;
