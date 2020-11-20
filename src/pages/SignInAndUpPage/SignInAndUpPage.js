import React, { useState } from "react";

//components
import SignInComponent from "../../components/SignInComponent/SignInComponent";
import SignUp from "../../components/SignUpComponent/SignUp";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import {
  Box,
  Grid,
  Typography,
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  background: {
    backgroundColor: "#eee",
  },
  tabs: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  indicatorColor: {
    color: theme.palette.common.black,
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

function TabPanelRender(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  );
}

const SignInAndUpPage = () => {
  const [value, setValue] = useState("register");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container>
      <Grid
        component={Box}
        className={classes.background}
        textAlign="center"
        py={2}
        xs={12}
        item
      >
        <Typography className={classes.title} variant="h5">
          LULU
        </Typography>
      </Grid>
      <Container maxWidth={matches ? "lg" : "sm"}>
        <Grid xs={12} item>
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs
                // className={clsx(classes.tabs, classes.indicatorColor)}
                value={value}
                centered
                textColor="primary"
                indicatorColor="primary"
                onChange={handleChange}
                style={{
                  backgroundColor: "white",
                }}
                aria-label="identity"
                variant="fullWidth"
              >
                <Tab
                  value="register"
                  label="¿ES TU PRIMERA VEZ EN LULU?"
                  wrapped
                  {...a11yProps("register")}
                />
                <Tab
                  value="login"
                  wrapped
                  label="¿YA TE HAS REGISTRADO?"
                  {...a11yProps("login")}
                />
              </Tabs>
            </AppBar>
            <TabPanelRender value={value} index="register">
              <SignUp />
            </TabPanelRender>
            <TabPanelRender value={value} index="login">
              <SignInComponent />
            </TabPanelRender>
          </div>
        </Grid>
      </Container>
    </Grid>
  );
};

export default SignInAndUpPage;
