import React from "react";

import { Box, TextField, Typography, makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  container: {
    margin: "10px 0",
    // border: "1px solid black",
    display: "flex",
    flexDirection: "column",
    width: "90%",
  },
  header: {
    width: "100%",
    display: "flex",

    justifyContent: "center",
    "& > *": {
      border: "1px solid black",
      width: "13.75%",
      padding: "5px 10px",
    },
    "& .first": {
      width: "45%",
    },
    "& .desc , & .cantidad": {
      width: "11%",
    },
    "& .precio-total , & .precio": {
      width: "15%",
    },
  },
}));

const OrderTable = ({ pdfRef, items, handleItems , disabled }) => {
  const classes = useStyle();
  console.log(items);
  return (
    <Box className={classes.container} ref={pdfRef}>
      <Box className={classes.header}>
        <Box component="span" className="first">
          <Typography display="inline" component="h3">
            Descripcion Articulo
          </Typography>
        </Box>
        <Box component="span" className="cantidad">
          <Typography display="inline" component="h3">
            Cant.
          </Typography>
        </Box>
        <Box component="span" className="precio">
          <Typography display="inline" component="h3">
            P. Unitario
          </Typography>
        </Box>
        <Box component="span" className="precio-total">
          <Typography display="inline" component="h3">
            Total
          </Typography>
        </Box>
        <Box component="span" className="desc">
          <Typography display="inline" component="h3">
            Desc. %
          </Typography>
        </Box>
      </Box>
      {items.map((item, index) => {
        return (
          <Box key={index} className={classes.header}>
            <Box className="first">
              <TextField
                size="small"
                id={`desc_${index}`}
                name="description"
                fullWidth={true}
                variant="outlined"
                onChange={ handleItems && ((e) => handleItems(e, index)) }
                disabled={disabled}
                defaultValue={item.description}
              />
            </Box>
            <Box className="cantidad">
              <TextField
                size="small"
                id={`quantity_${index}`}
                name="quantity"
                type="number"
                // InputLabelProps={{
                //   shrink: true,
                // }}
                variant="outlined"
                onChange={ handleItems && ((e) => handleItems(e, index)) }
                disabled={disabled}
                defaultValue={item.quantity}

              />
            </Box>
            <Box className="precio">
              <TextField
                size="small"
                id={`price_${index}`}
                name="price"
                type="number"
                variant="outlined"
                onChange={ handleItems && ((e) => handleItems(e, index)) }
                disabled={disabled}
                defaultValue={item.price}

              />
            </Box>
            <Box className="precio-total">
              <TextField
                size="small"
                id={`total_${index}`}
                variant="outlined"
                disabled={true}
                value={item.total}
              />
            </Box>
            <Box className="desc">
              <TextField
                size="small"
                id={`discount_${index}`}
                variant="outlined"
                type="number"
                name="discount"
                defaultValue={item.discount}
                onChange={handleItems && ((e) => handleItems(e, index)) }
                disabled={disabled}
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default OrderTable;
