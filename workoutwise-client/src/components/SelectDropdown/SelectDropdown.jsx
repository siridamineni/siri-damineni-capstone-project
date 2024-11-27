import React, { useState } from "react";
import "./SelectDropdown.scss";
function SelectDropdown({ title, value, handleSelectChange, options }) {
  return (
    <div className="select">
      {/* <label htmlFor="category" className="select__label">
        Category
      </label> */}
      <select
        className="select__input"
        name="category"
        value={value}
        onChange={handleSelectChange}>
        <option className="select__options" value="">
          {title}
        </option>
        {options?.map((item, index) => {
          return (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectDropdown;
