import React from "react";

import {
  Box,
  TextField,
  Typography,
  makeStyles,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  table: {
    maxWidth: 900,
  },
  descriptionField: {
    width: "45%",
  },
  numberField: {
    width: "15%",
  },
  smallQuantityField: {
    width: "11%",
  },
  // head: {
  //   backgroundColor: theme.palette.common.black,
  //   color: theme.palette.common.white,
  // },
  // container: {
  //   margin: "10px 0",
  //   // border: "1px solid black",
  //   display: "flex",
  //   flexDirection: "column",
  //   width: "90%",
  // },
  // header: {
  //   width: "100%",
  //   display: "flex",

  //   justifyContent: "center",
  //   "& > *": {
  //     border: "1px solid black",
  //     width: "13.75%",
  //     padding: "5px 10px",
  //   },
  //   "& .first": {
  //     width: "45%",
  //   },
  //   "& .desc , & .cantidad": {
  //     width: "11%",
  //   },
  //   "& .precio-total , & .precio": {
  //     width: "15%",
  //   },
  // },
}));

const OrderTable = ({ items, handleItems, disabled, buttons }) => {
  const classes = useStyle();
  console.log(items);
  console.log(disabled);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.descriptionField}>
              Descripcion Articulo
            </TableCell>
            <TableCell className={classes.smallQuantityField} align="right">
              Cant.
            </TableCell>
            <TableCell className={classes.numberField} align="right">
              P. Unitario
            </TableCell>
            <TableCell className={classes.numberField} align="right">
              Total
            </TableCell>
            <TableCell className={classes.smallQuantityField} align="right">
              Desc. %
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <TextField
                    size="small"
                    id={`desc_${index}`}
                    name="description"
                    fullWidth={true}
                    variant="outlined"
                    onChange={handleItems && ((e) => handleItems(e, index))}
                    disabled={disabled}
                    value={item.description}
                  />
                </TableCell>

                <TableCell align="right">
                  <TextField
                    size="small"
                    id={`quantity_${index}`}
                    name="quantity"
                    type="number"
                    variant="outlined"
                    onChange={handleItems && ((e) => handleItems(e, index))}
                    disabled={disabled}
                    value={item.quantity}
                  />
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <TextField
                    size="small"
                    id={`price_${index}`}
                    name="price"
                    type="number"
                    variant="outlined"
                    onChange={handleItems && ((e) => handleItems(e, index))}
                    disabled={disabled}
                    value={item.price}
                  />
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <TextField
                    size="small"
                    id={`total_${index}`}
                    variant="outlined"
                    disabled={true}
                    value={item.total}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    size="small"
                    id={`discount_${index}`}
                    variant="outlined"
                    type="number"
                    name="discount"
                    value={item.discount}
                    onChange={handleItems && ((e) => handleItems(e, index))}
                    disabled={disabled}
                  />
                </TableCell>
                {buttons && (
                  <TableCell>
                    <Box>{buttons(index)}</Box>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
