import React, { useRef } from "react";
import { connect } from "react-redux";

//routers
import { Link as RouterLink } from "react-router-dom";

import { createStructuredSelector } from "reselect";
//react-prints
import ReactToPrint from "react-to-print";
//selectors
import {
  cartitemsSelector,
  itemTotaValueSelector,
} from "../../Redux/Cart/cart-selectors";
import { currentUserSelector } from "../../Redux/user/user-selectors";

//components
import CheckOutItems from "../../components/checkoutitems/checkOutItems";
import PrintCart from "./CartPrint/PrintCart";

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

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  // checkoutContainer: {
  //   margin: theme.spacing(1, 0, 2, 0),
  // },
  button: {
    backgroundColor: "#018849",
    color: theme.palette.common.white,
  },
  print: {
    display: "none",
  },
  fixedOnScroll: {
    position: "fixed",
  },
}));

const CheckOutPage = ({ cartitems = [], totalprice, currentUser }) => {
  // console.log(currentUser);
  const classes = useStyles();
  const componentRef = useRef();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const handleWhatsApp = () => {
    const numero = "573163934994";
    const message = "Hola, Esta es mi orden de compra.";
    const url = "https://wa.me/" + numero + "/?text=" + encodeURI(message);
    // console.log(encodeURIComponent(url));
    window.open(url, "_blank");
  };
  return (
    <Container
      // className={classes.checkoutContainer}
      maxWidth={matches ? "sm" : "md"}
    >
      {cartitems.length ? (
        <Box mt={2}>
          <Grid container>
            <Grid
              xs={12}
              md={8}
              // style={{ border: "1px solid black" }}
              item
              container
            >
              <Box width="95%" bgcolor="white" px={2}>
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
                <Grid xs={12} item>
                  <Box display="flex" justifyContent="center" mt={2}>
                    <Typography variant="h6"> TOTAL: ${totalprice}</Typography>
                  </Box>
                </Grid>
              </Box>
            </Grid>

            <Grid
              xs={12}
              md={4}
              item
              // style={{ border: "1px solid black" }}
              container
            >
              <Box
                width="95%"
                height={matches ? "auto" : "20%"}
                px={2}
                bgcolor="white"
                // className={matches ? null : classes.fixedOnScroll}
              >
                <Grid xs={12} item>
                  {matches ? null : (
                    <Box pt={matches ? 0 : 2} mt={matches ? 0 : 2}>
                      <Typography variant="h5">TOTAL: ${totalprice}</Typography>
                    </Box>
                  )}
                  <Box>
                    <Typography variant="caption">
                      Puede descargar la orden de compra y enviarla por
                      WhatsApp.
                    </Typography>
                  </Box>
                  <Box m={1}>
                    {currentUser ? (
                      <ReactToPrint
                        trigger={() => (
                          <Button
                            startIcon={<DownloadIcon />}
                            variant="contained"
                            className={classes.button}
                            size="small"
                            fullWidth
                          >
                            Descargar Orden de compra
                          </Button>
                        )}
                        content={() => componentRef.current}
                      />
                    ) : (
                      <RouterLink
                        style={{ textDecoration: "none" }}
                        to="/identity"
                      >
                        <Button
                          startIcon={<DownloadIcon />}
                          variant="contained"
                          className={classes.button}
                          size="small"
                          fullWidth
                        >
                          Accede para Descargar Orden de compra
                        </Button>
                      </RouterLink>
                    )}

                    {currentUser && (
                      <Box className={classes.print}>
                        <PrintCart
                          printRef={componentRef}
                          user={currentUser}
                          cartitems={cartitems}
                          totalprice={totalprice}
                        />
                      </Box>
                    )}
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
              </Box>
            </Grid>
          </Grid>
        </Box>
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
        </>
      )}
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  cartitems: cartitemsSelector,
  totalprice: itemTotaValueSelector,
  currentUser: currentUserSelector,
});
export default connect(mapStateToProps)(CheckOutPage);
