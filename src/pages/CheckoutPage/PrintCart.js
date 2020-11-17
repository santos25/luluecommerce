import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Box, Grid, Typography } from "@material-ui/core";

import CheckOutItems from "../../components/checkoutitems/checkOutItems";
import TableCheck from "./TableCheck";

const styles = {
  root: {
    backgroundColor: "red",
  },
};

class PrintCart extends React.Component {
  render() {
    const { printRef, user, cartitems, totalprice } = this.props;
    return (
      <div ref={printRef}>
        <Grid container>
          <Grid xs={12} item>
            <Typography align="center" variant="h5">{`Usuario: ${
              user.name ? user.name + " " + user.lastName : user.displayName
            }`}</Typography>
          </Grid>
          <Grid xs={12} item>
            <Box mt={1}>
              <Typography align="center" variant="h5">
                ORDEN DE COMPRA
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12} item>
            <TableCheck cartitems={cartitems} />
          </Grid>
          <Grid
            xs={12}
            component={Box}
            display="flex"
            justifyContent="flex-end"
            mt={2}
            item
          >
            <Box>
              <Typography variant="h6"> TOTAL: ${totalprice}</Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(PrintCart);
