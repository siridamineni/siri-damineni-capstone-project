import React from "react";
import "./ExcerciseCard.scss";
function ExcerciseCard({ thumbnailUrl, name, bodyRegion, equipment, id }) {
  return (
    <div className="excercise-card">
      {/* <iframe width={280} height={150} src={thumbnailUrl}></iframe> */}
      <img
        className="excercise-card__img"
        src={thumbnailUrl}
        alt="excercise Image"
      />
      <div className="excercise-card__details">
        <div>
          <p className="excercise-card__text">Excercise Name:</p>
        </div>
        <div>
          <p className="excercise-card__text">{name}</p>
        </div>
      </div>
      <div className="excercise-card__details">
        <div>
          <p className="excercise-card__text">Body Region:</p>
        </div>
        <div>
          <p className="excercise-card__text">{bodyRegion}</p>
        </div>
      </div>
      <div className="excercise-card__details">
        <div>
          <p className="excercise-card__text">Equipment:</p>
        </div>
        <div>
          <p className="excercise-card__text">{equipment}</p>
        </div>
      </div>
    </div>
  );
}

export default ExcerciseCard;
