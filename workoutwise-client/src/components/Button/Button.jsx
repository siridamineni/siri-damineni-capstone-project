import React from "react";
import "./Button.scss";
function Button({ text, handleClick }) {
  return (
    <button className="button" onClick={handleClick}>
      {text}
    </button>
  );
}

export default Button;
