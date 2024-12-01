import React from "react";
import "./UserDataTable.scss";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function UserDataTable({ rows, columns, handleDelete, handleEdit }) {
  return (
    <ul className="user-data__list">
      <li className="user-data__list-header">
        {rows?.map((item, index) => (
          <div className="user-data__cell" key={index}>
            <h4 className="user-data__heading">{item}</h4>
          </div>
        ))}
        <div className="user-data__cell"></div>
        <div className="user-data__cell"></div>
      </li>
      <div className="columns__container">
        {columns?.map((item, index) => (
          <li className="user-data__list-body" key={index}>
            <div className="user-data__cell">
              <h4 className="user-data__value">{item.id}</h4>
            </div>
            <div className="user-data__cell">
              <h4 className="user-data__value">{item.excerciseName}</h4>
            </div>
            <div className="user-data__cell">
              <h4 className="user-data__value">{item.category}</h4>
            </div>
            <div className="user-data__cell">
              <h4 className="user-data__value">{item.bodyRegion}</h4>
            </div>
            <div className="user-data__cell">
              <h4 className="user-data__value">{item.repeatCount}</h4>
            </div>
            <div className="user-data__cell">
              <IconButton
                aria-label="home"
                color="primary"
                onClick={() => handleEdit(item.id)}>
                <EditIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </div>
            <div className="user-data__cell">
              <IconButton
                aria-label="home"
                color="primary"
                onClick={() => handleDelete(item.id)}>
                <DeleteIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </div>
          </li>
        ))}
      </div>
    </ul>
  );
}

export default UserDataTable;
