import React, { useEffect } from "react";
import { auth, createDocumentUserDb } from "./FireBase/FireBaseUtil";
import { connect } from "react-redux";
import { setCurrentUser } from "./Redux/user/user.actions";
import { currentUserSelector } from "./Redux/user/user-selectors";

//components
import MiniDrawer from "./components/Admin-components/mini-drawer/MiniDrawer";
// import ProductHome from './components/Admin-components/products/ProductHomePage.component'
// import ListPrendas from './components/Admin-components/prendas/ListPrendas'
import Nav from "./components/Navegation/Nav";
// import NavAdmin from './components/Admin-components/NavAdmin/NavAdmin.component';
import HomePage from "./pages/homepage/HomePage";
import ShopPage from "./pages/ShopPage/ShopPage";
import CheckoutPage from "./pages/CheckoutPage/checkout.component";
import SignInComponent from "./components/SignInComponent/SignInComponent";
import SignUp from "./components/SignUpComponent/SignUp";
import Footer from "./components/Footer/Footer";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const App = ({ setCurrentUser, currentUser }) => {
  useEffect(() => {
    // const { setCurrentUser } = props;
    console.log("APP home");

    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = createDocumentUserDb(user);
        const currentUserRef = await userRef;
        currentUserRef.onSnapshot((docSnapshot) => {
          // console.log(docSnapshot);
          setCurrentUser({
            id: docSnapshot.id,
            ...docSnapshot.data(),
          });
        });
      } else {
        setCurrentUser(user);
      }
    });
  }, [setCurrentUser]);

  return (
    <div>
      {
        <MiniDrawer />
        //  <MiniDrawer />
        // currentUser && currentUser.isAdmin ? (
        //   <MiniDrawer />
        // ) : (
        //   <Router basename="/luluecommerce">
        //     <Nav />
        //     <Switch>
        //       <Route exact path="/">
        //         <HomePage />
        //       </Route>
        //       <Route
        //         exact
        //         path="/signin"
        //         render={() =>
        //           currentUser ? <Redirect to="/" /> : <SignInComponent />
        //         }
        //       />
        //       <Route
        //         exact
        //         path="/signup"
        //         render={() => (currentUser ? <Redirect to="/" /> : <SignUp />)}
        //       />
        //       <Route exact path="/checkout">
        //         <CheckoutPage />
        //       </Route>
        //       <Route path="/:tagid">
        //         <ShopPage />
        //       </Route>
        //     </Switch>
        //     <Footer />
        //   </Router>
        // )
      }
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
