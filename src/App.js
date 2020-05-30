import React from 'react';
import Nav from './components/Navegation/Nav';
import HomePage from './pages/homepage/HomePage';
import MujerPage from './pages/MujerPage/MujerPage';
import HombrePage from './pages/HombrePage/HombrePage';
import SignInAndUpPage from './pages/SignInAndUpPage/SignInAndUpPage';
import CheckoutPage from './pages/CheckoutPage/checkout.component';
import Footer from './components/Footer/Footer';
import { auth, createDocumentUserDb } from './FireBase/FireBaseUtil';
import { connect } from 'react-redux';
import { setCurrentUser } from './Redux/user/user.actions';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

class App extends React.Component {


  componentDidMount() {
    console.log(this.props);
    const { setCurrentUser } = this.props;

    auth.onAuthStateChanged(async (user) => {
      // console.log({user});

      if (user) {
        const userRef = createDocumentUserDb(user);
        const currentUser = await userRef;
        currentUser.onSnapshot(docSnapshot => {
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

  }

  render() {
    return (
      <div className="bg-white font-serif">
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/mujer">
              <MujerPage />
            </Route>
            <Route path="/hombre">
              <HombrePage />
            </Route>
            <Route exact path="/signin" render={() => this.props.currentUser ? <Redirect to="/" /> : <SignInAndUpPage />}/>
            <Route exact path="/checkout">
              <CheckoutPage />
            </Route>
          </Switch>
            <Footer />
        </Router>
      </div>
    )
  }
}

const mapSateToProps = ({user}) => ({
          currentUser : user.currentUser
})

const mapDispatchToState = dispatch => ({
          setCurrentUser: user => {
          dispatch(setCurrentUser(user));
  }
})
export default connect(mapSateToProps, mapDispatchToState)(App);
