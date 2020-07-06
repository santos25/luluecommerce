import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { auth } from '../../FireBase/FireBaseUtil';
import { connect } from 'react-redux';
import { currentUserSelector } from '../../Redux/user/user-selectors';
import { hiddeCartSelector } from '../../Redux/Cart/cart-selectors';

import CartIconComponent from '../Cart-Icon/car-icon.component';
import CartDropdown from '../Card-Dropdown/card-dropdown';

import {
    Search,
    ShoppingCart,
    AccountCircle
} from '@material-ui/icons';
import { fade } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Link,
    makeStyles,
    Button,
    InputBase,
    Typography,
    IconButton,
    Badge
} from '@material-ui/core';

// import logo from "./lulu.png";
const useStyle = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        marginLeft: theme.spacing(7)
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 1.00),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "flex"
        }
    },
    link:{
        marginLeft: theme.spacing(3)
    }
}));

const Nav = ({ currentUser, hidden }) => {
    // console.log({ currentUser, hidden });
    const classes = useStyle();
    return (
        <div >
            <AppBar position="fixed" color="inherit">
                <Toolbar>
                    <Link component={RouterLink} to="/">
                        <Typography className={classes.title} variant="inherit" noWrap>
                            LULU STORE
                     </Typography>
                    </Link>
                    <div className={classes.grow}>
                        <Link className={classes.link} component={RouterLink} to="/mujer"> Mujer</Link>
                        <Link className={classes.link} component={RouterLink} to="/hombre"> Hombre</Link>

                    </div>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <Search />
                        </div>
                        <InputBase
                            placeholder="Buscar…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.sectionDesktop}>
                            <CartIconComponent />
                            {hidden ? <CartDropdown /> : null}
                        {
                            currentUser ? (
                                <Button variant="outlined" size="small" color="primary" onClick={() => auth.signOut()}>
                                    Cerrar Sesion
                                </Button>
                            )
                                : (
                                    <Link component={RouterLink} to="/signin">
                                        <IconButton
                                            edge="end"
                                            aria-label="account of current user"
                                            // aria-controls={menuId}
                                            aria-haspopup="true"
                                            // onClick={handleProfileMenuOpen}
                                            color="inherit"
                                        >
                                            <AccountCircle />
                                        </IconButton>
                                    </Link>
                                )
                        }

                    </div>
                </Toolbar>
            </AppBar>
            {/* {renderMobileMenu} */}
            {/* {renderMenu} */}
        </div>
    );
}

const mapStatetoProps = (state) => ({
    currentUser: currentUserSelector(state),
    hidden: hiddeCartSelector(state)
})


export default connect(mapStatetoProps)(Nav);