import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { auth } from '../../FireBase/FireBaseUtil';
import { connect } from 'react-redux';
import { currentUserSelector } from '../../Redux/user/user-selectors';
import { hiddeCartSelector } from '../../Redux/Cart/cart-selectors';

import CartIconComponent from '../Cart-Icon/car-icon.component';
import CartDropdown from '../Card-Dropdown/card-dropdown';

import {
    AppBar,
    Toolbar,
    Link,
    makeStyles,
    Button
} from '@material-ui/core';

// import logo from "./lulu.png";
const useStyle = makeStyles({
    link: {
        flexGrow: 1
    }
});

const Nav = ({ currentUser, hidden }) => {
    // console.log({ currentUser, hidden });
    const classes = useStyle();
    return (
        <AppBar position="static" color="transparent">
            <Toolbar>
                <Link className={classes.link} component={RouterLink} to="/"> LULU STORE</Link>
                <Link className={classes.link} component={RouterLink} to="/shop"> SHOP</Link>
                {
                    currentUser ? (
                        <Button variant="contained" color="primary" onClick={() => auth.signOut()}>
                            Cerrar Sesion
                        </Button>
                    )
                        : (
                            <Link component={RouterLink} to="/signin"> Iniciar Sesion</Link>
                        )
                }

            </Toolbar>
        </AppBar>
    );
}

const mapStatetoProps = (state) => ({
    currentUser: currentUserSelector(state),
    hidden: hiddeCartSelector(state)
})


export default connect(mapStatetoProps)(Nav);