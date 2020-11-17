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
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Cantidad</TableCell>
            <TableCell align="center">Precio</TableCell>
            <TableCell align="center">Talla</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartitems.map((item, key) => {
            return (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  <img
                    className="productImage"
                    alt="complex"
                    src={`http://${item.images[0]}`}
                  />
                </TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="center">{item.price.current.text}</TableCell>
                <TableCell align="center">{item.selectedTalla}</TableCell>
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
