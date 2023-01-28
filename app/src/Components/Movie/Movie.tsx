import React, { useEffect, useState } from "react";
import "./Movie.css";
import { Card, Button } from "@shopify/polaris";
import { useDispatch } from "react-redux";
import { setSnackbar, setStateValue, setNomination } from "../../actions";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

const MovieCard = (props: {
  title: string;
  year: string;
  poster: string;
  imdbID: string;
}) => {
  const { title, year, poster, imdbID } = props;
  const Nomination = useSelector((state: RootState) => state.Nomination);
  const [disabledButton, setDisabledButton] = useState(false);
  const dispatch = useDispatch();

  function setNominations() {
    let found = false;
    for (let i = 0; i < Nomination.length; i++) {
      found = Nomination[i].imdbID === imdbID;
      if (found) break;
    }
    if (Nomination.length >= 5) {
      dispatch(setSnackbar(true));
      return;
    }
    if (!found) {
      Nomination.push({
        title,
        year,
        imdbID,
        poster
      });
      window.localStorage.setItem("nominations", JSON.stringify(Nomination));
      dispatch(setNomination(Nomination));
      dispatch(setStateValue());
      setDisabledButton(true);
      dispatch(setSnackbar(Nomination.length >= 5));
    }
  }

  useEffect(() => {
    const result = Nomination.some((nomination: any) => nomination.imdbID === imdbID);
    setDisabledButton(result);
  }, [Nomination, imdbID]);

  return (
    <div className="card">
      <Card sectioned>
        <div className="cont">
          <img
            className="posters"
            alt="posters"
            src={
              poster !== "N/A"
                ? poster
                : "https://cdn.iconscout.com/icon/free/png-256/gallery-187-902099.png"
            }
          />
          <div className="spacing" />
          <div>
            <h2 className="title">{title}</h2>
            <p className="info">{year}</p>
          </div>
          <div className="button-space"></div>
          <div className="button">
            <Button
              primary
              disabled={disabledButton}
              onClick={() => setNominations()}
            >
              Nominate
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MovieCard;
