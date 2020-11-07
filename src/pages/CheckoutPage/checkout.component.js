import React from "react";
import { connect } from "react-redux";

import "./checkout.styles.css";
import { createStructuredSelector } from "reselect";
//selectors
import {
  cartitemsSelector,
  itemTotaValueSelector,
} from "../../Redux/Cart/cart-selectors";

//components
import CheckOutItems from "../../components/checkoutitems/checkOutItems";

//material
import { Box, Container, Grid, Typography } from "@material-ui/core";
import { LocalMallOutlined as MallIcon } from "@material-ui/icons";

const CheckOutPage = ({ cartitems = [], totalprice }) => {
  console.log(cartitems);

  return (
    <Container maxWidth="sm">
      {cartitems.length ? (
        <Grid component={Box} mt={2} container>
          <Grid xs={12} item>
            <Box textAlign="center">
              <Typography variant="h5">MI BOLSA</Typography>
            </Box>
          </Grid>
          <Grid xs={12} item>
            {cartitems.map((item, index) => (
              <CheckOutItems key={index} cartItem={item} />
            ))}
          </Grid>

          {/* <div className='total'>TOTAL: ${totalprice}</div> */}
        </Grid>
      ) : (
        <Grid component={Box} mt={2} container>
          <Grid xs={12} item>
            <Box textAlign="center">
              <MallIcon fontSize="large" />
              <Typography variant="h6">To bolsa está vacia</Typography>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
    // <div className='checkout-page'>
    //     <div className='checkout-header'>
    //         <div className='header-block'>
    //             <span>Product</span>
    //         </div>
    //         <div className='header-block'>
    //             <span>Description</span>
    //         </div>
    //         <div className='header-block'>
    //             <span>Quantity</span>
    //         </div>
    //         <div className='header-block'>
    //             <span>Price</span>
    //         </div>
    //         <div className='header-block'>
    //             <span>Remove</span>
    //         </div>
    //     </div>
    //

    // </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartitems: cartitemsSelector,
  totalprice: itemTotaValueSelector,
});
export default connect(mapStateToProps)(CheckOutPage);
