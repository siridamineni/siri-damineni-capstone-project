import React from "react";
import "./BmiStatusCard.scss";
function BmiStatusCard({ bmiValue, bmiStatus }) {
  const changeColorByBmiDetails = (status) => {
    let backgroundColor = "";
    let valueColor = "";
    let titleColor = "";
    let statusColor = "";
    if (status === "Under Weight") {
      backgroundColor = "bmi-card--under-weight";
      valueColor = "bmi-card__value--under-weight";
      titleColor = "bmi-card__title--under-weight";
      statusColor = "bmi-card__status--under-weight";
    } else if (status === "Normal Weight") {
      backgroundColor = "bmi-card--normal-weight";
      valueColor = "bmi-card__value--normal-weight";
      titleColor = "bmi-card__title--normal-weight";
      statusColor = "bmi-card__status--normal-weight";
    } else if (status === "Over Weight") {
      backgroundColor = "bmi-card--over-weight";
      valueColor = "bmi-card__value--over-weight";
      titleColor = "bmi-card__title--over-weight";
      statusColor = "bmi-card__status--over-weight";
    } else if (status === "Obesity") {
      backgroundColor = "bmi-card--obesity";
      valueColor = "bmi-card__value--obesity";
      titleColor = "bmi-card__title--obesity";
      statusColor = "bmi-card__status--obesity";
    }
    return {
      cardBgColor: backgroundColor,
      cardValue: valueColor,
      cardTitle: titleColor,
      cardStatus: statusColor,
    };
  };
  return (
    <div
      className={`bmi-card ${changeColorByBmiDetails(bmiStatus).cardBgColor}`}>
      <div className="bmi-card__circle">
        <div className="bmi-card__details">
          <p
            className={`bmi-card__value ${
              changeColorByBmiDetails(bmiStatus).cardValue
            }`}>
            {bmiValue}
          </p>
          <p
            className={`bmi-card__title ${
              changeColorByBmiDetails(bmiStatus).cardTitle
            }`}>
            BMI
          </p>
        </div>
      </div>
      <div className="bmi-card__status-block">
        <p
          className={`bmi-card__status ${
            changeColorByBmiDetails(bmiStatus).cardStatus
          }`}>
          {bmiStatus}
        </p>
      </div>
    </div>
  );
}

export default BmiStatusCard;
