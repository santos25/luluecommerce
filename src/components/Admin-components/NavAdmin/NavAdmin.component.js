import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { auth } from '../../../FireBase/FireBaseUtil';
import { connect } from 'react-redux';
import { currentUserSelector } from '../../../Redux/user/user-selectors';


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

const NavAdmin = ({ currentUser }) => {
    // console.log({ currentUser, hidden });
    const classes = useStyle();
    return (
        <AppBar position="fixed" color="default">
            <Toolbar>
                <Link className={classes.link} component={RouterLink} to="/"> LULU STORE Administrador</Link>
                <Link className={classes.link} component={RouterLink} to="/producto"> Productos</Link>
                <Link className={classes.link} component={RouterLink} to="/prendas"> Prendas</Link>

                {
                    currentUser ? (
                        <Button variant="outlined" size="small" color="primary" onClick={() => auth.signOut()}>
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
    currentUser: currentUserSelector(state)
})


export default connect(mapStatetoProps)(NavAdmin);