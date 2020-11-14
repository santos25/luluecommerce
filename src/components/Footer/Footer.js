import React from "react";

import FollowIcons from "./FollowIcons";

import { makeStyles, Typography, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: theme.spacing(1),
  },
  image: {
    width: theme.spacing(5),
    height: "auto",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      {/* <Container maxWidth="md" className={classes.footer}> */}
      <FollowIcons />
      <Box
        borderTop={1}
        borderColor="grey.500"
        display="flex"
        flexDirection="column"
        p={1}
      >
        <Typography className={classes.title} variant="subtitle2">
          Medios de Pago
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
          <Box mr={3}>
            <img
              className={classes.image}
              src="https://images.sftcdn.net/images/t_app-logo-l,f_auto/p/e2be1092-1a73-46e3-b790-a7a4a55447d6/38858045/efecty-icon.png"
              alt=""
            />
          </Box>
          <Box mr={3}>
            <img
              className={classes.image}
              src="https://www.fintra.co/wp-content/uploads/2020/03/pagos-pse.png"
              alt=""
            />
          </Box>
          <Box>
            <img
              className={classes.image}
              src="https://is3-ssl.mzstatic.com/image/thumb/Purple124/v4/c9/25/12/c9251221-da4f-360e-c540-5e8626d1d69a/source/256x256bb.jpg"
              alt=""
            />
          </Box>
        </Box>
      </Box>
      <Box borderTop={1} borderColor="grey.500" p={1}>
        <Typography variant="caption">
          © 2020 LULU Todos los derechos reservados Cartagena || Colombia
        </Typography>
      </Box>
      {/* </Container> */}
    </footer>
  );
};

export default Footer;
