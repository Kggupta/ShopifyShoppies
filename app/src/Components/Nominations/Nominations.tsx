import React, { useEffect, useState } from "react";
import "./NominationStyles.css";
import NominationCard from "../Nomination/Nomination";
import { Card } from "@shopify/polaris";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

const Nominations = () => {
  const Nomination = useSelector((state: RootState) => state.Nomination);
  const ChangeState = useSelector((state: RootState) => state.changeState);
  const [comp, setComp] = useState([]);

  useEffect(() => {
    setComp(Nomination);
  }, [ChangeState, Nomination])

  return (
    <div className="nominated-window">
      <Card sectioned>
        <h1 className="nominated-title">Nominations</h1>
        <br />
        <div className="nominated-height">
          {comp?.map((movie: any, index: number) => {
            return (
              <>
                <NominationCard key={index}
                  title={movie.title}
                  year={movie.year}
                  imdbID={movie.imdbID}
                  poster={movie.poster}
                />
                <br />
              </>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Nominations;
