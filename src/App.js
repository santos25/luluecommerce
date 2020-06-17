import React, { useEffect } from 'react';
import { auth, createDocumentUserDb } from './FireBase/FireBaseUtil';
import { connect } from 'react-redux';
import { setCurrentUser } from './Redux/user/user.actions';
import { currentUserSelector } from './Redux/user/user-selectors';

import AdminPage from './pages/adminPage/AdminPage';
import Nav from './components/Navegation/Nav';
import HomePage from './pages/homepage/HomePage';
// import MujerPage from './pages/MujerPage/MujerPage';
import ShopPage from './pages/ShopPage/ShopPage';
import CheckoutPage from './pages/CheckoutPage/checkout.component';

import SignInComponent from './components/SignInComponent/SignInComponent';
import SignUp from './components/SignUpComponent/SignUp';
// import Footer from './components/Footer/Footer';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

const App = ({ setCurrentUser, currentUser }) => {

  useEffect(() => {
    // const { setCurrentUser } = props;
    console.log("APP home");

    auth.onAuthStateChanged(async (user) => {

      if (user) {
        const userRef = createDocumentUserDb(user);
        const currentUserRef = await userRef;
        currentUserRef.onSnapshot(docSnapshot => {
          // console.log(docSnapshot);
          setCurrentUser({
            id: docSnapshot.id,
            ...docSnapshot.data()
          })
        });

      } else {
        setCurrentUser(user)
      }
    });
  }, []);

  return (
    <div>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          {/* <Route path="/mujer">
            <MujerPage />
          </Route> */}
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/signin" render={() => currentUser ? <Redirect to="/" /> : <SignInComponent />} />
          <Route exact path="/signup" render={() => currentUser ? <Redirect to="/" /> : <SignUp />} />
          <Route exact path="/checkout">
            <CheckoutPage />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

const mapSateToProps = (state) => ({
  currentUser: currentUserSelector(state)
})

const mapDispatchToState = dispatch => ({
  setCurrentUser: user => { dispatch(setCurrentUser(user)) }
})
export default connect(mapSateToProps, mapDispatchToState)(App);
