import React from "react";
import MovieCard from "../Movie/Movie";
import { Card } from "@shopify/polaris";
import "./MovieListStyles.css";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

const Results = () => {
  const movieList = useSelector((state: RootState) => state.movieList);
  return (
    <div className="main">
      <Card sectioned>
      <h1 className="result-title">Results</h1>
      <br />
        <div className="result-list">
          {movieList && movieList.map((movie: any, index: number) => {
            return (
              <>
                {" "}
                <MovieCard key={index}
                  title={movie.Title}
                  year={movie.Year}
                  poster={movie.Poster}
                  imdbID={movie.imdbID}
                />
                <br />{" "}
              </>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Results;
