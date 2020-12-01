import React, { useEffect } from "react";
import { auth, createDocumentUserDb } from "./FireBase/FireBaseUtil";
// import { createProducts, createCategories } from "./FireBase/ApiAsos";

//redux
import { connect } from "react-redux";
//actions
import { setCurrentUser } from "./Redux/user/user.actions";
import { fetchingCollectionsOverViewAsync } from "./Redux/shop/shop.actions";
//selectors
import { currentUserSelector } from "./Redux/user/user-selectors";

//Material UI
import {
  ThemeProvider,
  createMuiTheme,
  Box,
  makeStyles,
} from "@material-ui/core";

//components
import MiniDrawer from "./components/Admin-components/mini-drawer/MiniDrawer";
import Nav from "./components/Navegation/Nav";
// import HomePage from "./pages/homepage/HomePage";
import ShopPage from "./pages/ShopPage/ShopPage";
import CheckoutPage from "./pages/CheckoutPage/checkout.component";
import SignInAndUpPage from "./pages/SignInAndUpPage/SignInAndUpPage";
import Footer from "./components/Footer/Footer";
import SavedList from "./pages/savedList/SavedList";

//react-router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#2d2d2d",
    },
    secondary: {
      main: "#eee",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  bodyCheckout: {
    backgroundColor: "#eee",
  },
  containerApp: {
    maxWidth: "1170px",
    margin: "0 auto",
    minHeight: "calc(100vh - 64px - 218px)",
  },
}));

const App = ({ setCurrentUser, currentUser, fetchCollectionsOverView }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchCollectionsOverView("mujer");
  }, [fetchCollectionsOverView]);

  useEffect(() => {
    // const { setCurrentUser } = props;
    console.log("UseEffect User");

    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = createDocumentUserDb(user);
        const currentUserRef = await userRef;
        currentUserRef.onSnapshot((docSnapshot) => {
          setCurrentUser({
            id: docSnapshot.id,
            ...docSnapshot.data(),
          });
        });
      } else {
        setCurrentUser(user);
      }
    });

    // fetch(
    //   "https://asos2.p.rapidapi.com/products/v2/list?country=US&currency=USD&sort=freshness&lang=en-US&sizeSchema=US&offset=0&categoryId=6459&limit=30&store=US",
    //   {
    //     method: "GET",
    //     headers: {
    //       "x-rapidapi-host": "asos2.p.rapidapi.com",
    //       "x-rapidapi-key":
    //         "e0c2ff620emshb363b654f7a100dp11dc64jsnab02f06151eb",
    //     },
    //   }
    // )
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then(async (data) => {
    //     const { products } = data;

    //     // const insert = await createProducts(products);
    //     // console.log(insert);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [setCurrentUser]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        {currentUser && currentUser.isAdmin ? (
          <MiniDrawer />
        ) : (
          <Router basename="/luluecommerce">
            <Nav />
            <div className={classes.containerApp}>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/mujer" />
                </Route>
                <Route
                  exact
                  path="/identity"
                  render={() =>
                    currentUser ? <Redirect to="/mujer" /> : <SignInAndUpPage />
                  }
                />
                <Route exact path="/saved-lists">
                  <SavedList />
                </Route>
                <Route exact path="/checkout">
                  <Box
                    display="flex"
                    flexDirection="column"
                    pb={2}
                    className={classes.bodyCheckout}
                  >
                    <CheckoutPage />
                  </Box>
                </Route>
                <Route path="/:tagid">
                  <ShopPage />
                </Route>
              </Switch>
            </div>
            <Footer />
          </Router>
        )}
      </ThemeProvider>
    </div>
  );
};

const mapSateToProps = (state) => ({
  currentUser: currentUserSelector(state),
});

const mapDispatchToState = (dispatch) => ({
  setCurrentUser: (user) => {
    dispatch(setCurrentUser(user));
  },
  fetchCollectionsOverView: (genre) =>
    dispatch(fetchingCollectionsOverViewAsync(genre)),
});
export default connect(mapSateToProps, mapDispatchToState)(App);
