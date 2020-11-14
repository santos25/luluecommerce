import React, { useEffect } from "react";
import { auth, createDocumentUserDb } from "./FireBase/FireBaseUtil";
// import { createProducts, createCategories } from "./FireBase/ApiAsos";

//redux
import { connect } from "react-redux";
import { setCurrentUser } from "./Redux/user/user.actions";
import { currentUserSelector } from "./Redux/user/user-selectors";

//Material UI
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

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

const App = ({ setCurrentUser, currentUser }) => {
  useEffect(() => {
    // const { setCurrentUser } = props;
    console.log("APP home");

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
      {/* <MiniDrawer /> */}

      <ThemeProvider theme={theme}>
        {currentUser && currentUser.isAdmin ? (
          <MiniDrawer />
        ) : (
          <Router basename="/luluecommerce">
            <Nav />
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
              <Route
                exact
                path="/saved-lists"
                // render={() =>
                //   currentUser ? <Redirect to="/mujer" /> : <SignInAndUpPage />
                // }
              >
                <SavedList />
              </Route>
              {/* <Route
                exact
                path="/signin"
                render={() =>
                  currentUser ? <Redirect to="/" /> : <SignInComponent />
                }
              />
              <Route
                exact
                path="/signup"
                render={() => (currentUser ? <Redirect to="/" /> : <SignUp />)}
              /> */}
              <Route exact path="/checkout">
                <CheckoutPage />
              </Route>
              <Route path="/:tagid">
                <ShopPage />
              </Route>
            </Switch>
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
});
export default connect(mapSateToProps, mapDispatchToState)(App);
