import React from "react";

import { Box, Typography } from "@material-ui/core";

import TableCheck from "./TableCheck";
import "./PrintCart.css";

class PrintCart extends React.Component {
  render() {
    const { printRef, user, cartitems, totalprice } = this.props;
    return (
      <Box id="page" ref={printRef}>
        <Box className="currentUser">
          <Typography align="center" variant="h5">{`Usuario: ${
            user.name ? user.name + " " + user.lastName : user.displayName
          }`}</Typography>
        </Box>
        <Box className="title">
          <Typography align="center" variant="h5">
            ORDEN DE COMPRA
          </Typography>
        </Box>
        <Box className="productTables">
          <TableCheck cartitems={cartitems} />
        </Box>
        <Box className="total">
          <Typography variant="h6"> TOTAL: ${totalprice}</Typography>
        </Box>
      </Box>
    );
  }
}

export default PrintCart;
