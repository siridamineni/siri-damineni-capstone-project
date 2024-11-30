import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function UserDataTable({ rows, columns, handleDelete, handleEdit }) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {rows?.map((item, index) => {
              return (
                <StyledTableCell align="left" key={index}>
                  {item}
                </StyledTableCell>
              );
            })}
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {columns?.map((item, id) => (
            <StyledTableRow key={id}>
              <StyledTableCell align="left">{item.id}</StyledTableCell>
              <StyledTableCell align="left">
                {item.excerciseName}
              </StyledTableCell>
              <StyledTableCell align="left">{item.category}</StyledTableCell>
              <StyledTableCell align="left">{item.bodyRegion}</StyledTableCell>
              <StyledTableCell align="left">{item.repeatCount}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton
                  aria-label="home"
                  color="primary"
                  onClick={() => handleEdit(item.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="home"
                  color="primary"
                  onClick={() => handleDelete(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserDataTable;
