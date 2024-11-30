import React from "react";
import "./BmiStatusCard.scss";
function BmiStatusCard({ bmiValue, bmiStatus }) {
  // const changeColorByBmiDetails = () => {
  //   if()
  // }
  return (
    <div className="bmi-card bmi-card--under-weight">
      <div className="bmi-card__circle">
        <div className="bmi-card__details">
          <p className="bmi-card__value bmi-card__value--under-weight">
            {bmiValue}
          </p>
          <p className="bmi-card__title bmi-card__title--under-weight">BMI</p>
        </div>
      </div>
      <div className="bmi-card__status-block">
        <p className="bmi-card__status bmi-card__status--under-weight">
          {bmiStatus}
        </p>
      </div>
    </div>
  );
}

export default BmiStatusCard;
