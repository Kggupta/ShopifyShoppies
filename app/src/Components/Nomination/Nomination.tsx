import React from "react";
import { Card, Button } from "@shopify/polaris";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { useDispatch } from "react-redux";
import { setSnackbar, setStateValue, setNomination } from "../../actions";

const NominationCard = (props: {
  title: string;
  year: string;
  imdbID: string;
  poster: string;
}) => {
  const { title, year, imdbID, poster } = props;

  const dispatch = useDispatch();

  const Nomination = useSelector((state: RootState) => state.Nomination);

  function removeNomination() {
    const temp = Nomination.filter((nomination: any, index: number) => {
        return nomination.imdbID !== imdbID;
    });

    dispatch(setNomination(temp));
    dispatch(setStateValue());
    dispatch(setSnackbar(false));

    window.localStorage.setItem('nominations', JSON.stringify(temp));
  }

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
        <div className="remove">
            <Button onClick={() => removeNomination()} destructive>Remove</Button>
          </div>
      </div>
    </Card>
  </div>

  );
};

export default NominationCard;
