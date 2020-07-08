import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { cartitemsSelector } from '../../Redux/Cart/cart-selectors';
import { toggleCart } from '../../Redux/Cart/cart.action';

import CartItems from '../cart-items/cart-items.component'

import {
    makeStyles,
    Button,
    Box,
    List,
    Typography
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    cartdropdown: {
        position: "absolute",
        right: 30,
        top: 55,
        bgcolor: theme.palette.common.white,
        display: "flex",
        flexDirection: "column",
    },
    root: {
        width: '100%',
        maxWidth: 360,
    },
    title: {
        fontWeight: "bold"
    }
}))
const CardDropdown = ({ cartitems, history, dispatch }) => {
    const classes = useStyles()
    return (
        <Box zIndex="tooltip" width={350} bgcolor="white" borderRadius="borderRadius"
            border={1} className={classes.cartdropdown} p={2}>

            <Box display="flex" justifyContent="space-between" >
                <Typography fon component="h5" className={classes.title}>
                    Image
                </Typography>
                <Typography component="h5" className={classes.title}>
                    Nombre
                </Typography>
                <Typography component="h5" className={classes.title}>
                    precio
                </Typography>
                <Typography component="h5" className={classes.title}>
                    Cant.
                </Typography>
            </Box>
            {
                cartitems.length ? cartitems.map((item, i) => <CartItems key={i} {...item} />)
                    :
                    <span className="empty-message">No hay items</span>
            }
            <Box mt={2}>
                <Button fullWidth variant="outlined" onClick={() => {
                    dispatch(toggleCart());
                    history.push("/checkout");
                }}>Go to Check out</Button>
            </Box>

        </Box>
        // <div className={classes.cartdropdown}>
        //     {
        //         cartitems.length ? <List className={classes.root}>
        //             {cartitems.map((item, i) => <CartItems key={i} {...item} />)}
        //         </List>
        //             :
        //             <span className="empty-message">No hay items</span>
        //     }

        //     <Button variant="outlined" onClick={() => {
        //         dispatch(toggleCart());
        //         history.push("/checkout");
        //     }}>Go to Check out</Button>
        // </div>
    )
}

const mapStateToProps = (state) => ({
    cartitems: cartitemsSelector(state)
})
export default withRouter(connect(mapStateToProps)(CardDropdown));