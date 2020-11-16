import React, { useRef } from "react";
import { connect } from "react-redux";

// import "./checkout.styles.css";
import { createStructuredSelector } from "reselect";
//react-prints
import ReactToPrint from "react-to-print";
//selectors
import {
  cartitemsSelector,
  itemTotaValueSelector,
} from "../../Redux/Cart/cart-selectors";

//components
import CheckOutItems from "../../components/checkoutitems/checkOutItems";
import PrintCart from "./PrintCart";

//material
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { LocalMallOutlined as MallIcon } from "@material-ui/icons";
import {
  WhatsApp as WhatsappIcon,
  GetApp as DownloadIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#018849",
    color: theme.palette.common.white,
  },
  print: {
    visibility: "hidden",
  },
}));

const CheckOutPage = ({ cartitems = [], totalprice }) => {
  console.log(cartitems);
  const classes = useStyles();
  const componentRef = useRef();

  const handleWhatsApp = () => {
    const numero = "573163934994";
    const message = "Hola, Esta es mi orden de compra.";
    const url = "https://wa.me/" + numero + "/?text=" + encodeURI(message);
    // console.log(encodeURIComponent(url));
    window.open(url, "_blank");
  };
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
          <Grid
            xs={12}
            component={Box}
            display="flex"
            justifyContent="flex-end"
            mt={2}
            item
          >
            <Typography variant="h6"> TOTAL: ${totalprice}</Typography>
          </Grid>
          <Grid
            xs={12}
            component={Box}
            // display="flex"
            // justifyContent="center"

            item
          >
            <Box m={1}>
              <ReactToPrint
                trigger={() => (
                  <Button
                    startIcon={<DownloadIcon />}
                    variant="contained"
                    className={classes.button}
                    size="small"
                    fullWidth
                    // onClick={() => addToTheCart(product)}
                  >
                    Descargar Orden de compra
                  </Button>
                )}
                content={() => componentRef.current}
              />
            </Box>
            <Box m={1}>
              <Button
                startIcon={<WhatsappIcon />}
                variant="contained"
                size="small"
                className={classes.button}
                fullWidth
                onClick={() => handleWhatsApp()}
              >
                Whatsapp
              </Button>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid component={Box} mt={2} container>
            <Grid xs={12} item>
              <Box textAlign="center">
                <MallIcon fontSize="large" />
                <Typography variant="h6">To bolsa está vacia</Typography>
              </Box>
            </Grid>
          </Grid>
          {/* <Box className={classes.print}>
            <PrintCart printRef={componentRef} />
          </Box> */}
        </>
      )}
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  cartitems: cartitemsSelector,
  totalprice: itemTotaValueSelector,
});
export default connect(mapStateToProps)(CheckOutPage);
