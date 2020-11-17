import React from "react";

import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
});

const TableCheck = ({ cartitems }) => {
  console.log(cartitems);
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Items Table">
        <TableHead>
          <TableRow>
            <TableCell>Imagen</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Talla</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartitems.map((item, key) => {
            return (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  <img
                    // className={classes.img}
                    alt="complex"
                    src={`http://${item.images[0]}`}
                  />
                </TableCell>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">{item.price.current.text}</TableCell>
                <TableCell align="right">{item.selectedTalla}</TableCell>
              </TableRow>
            );
          })}
          {/* {rows.map((row) => (
           
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableCheck;
