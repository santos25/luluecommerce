import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { auth } from '../../../FireBase/FireBaseUtil';
import { connect } from 'react-redux';
import { currentUserSelector } from '../../../Redux/user/user-selectors';
import clsx from 'clsx'

import {Menu as MenuIcon} from '@material-ui/icons'
import {
    AppBar,
    Toolbar,
    Link,
    makeStyles,
    Button,
    IconButton
} from '@material-ui/core';

const drawerWidth = 240;

// import logo from "./lulu.png";
const useStyle = makeStyles( (theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
      },
    link: {
        flexGrow: 1
    }
}));

const NavAdmin = ({ currentUser , open , handleDrawerOpen }) => {
    const classes = useStyle();

    return (
        <AppBar position="fixed" color="default"
            // className={classes.appBar}
        className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
        })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    // className={classes.menuButton}
                className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                })}
                >
                    <MenuIcon />
                </IconButton>

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