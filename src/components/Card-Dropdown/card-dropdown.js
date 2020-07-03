import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { cartitemsSelector } from '../../Redux/Cart/cart-selectors';
import { toggleCart } from '../../Redux/Cart/cart.action';

import CartItems from '../cart-items/cart-items.component'

import { makeStyles, Button, List } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    cartdropdown: {
        position: "absolute",
        width: 340,
        // height: 340,
        right: 30,
        top: 55,
        zIndex: 5,
        backgroundColor: theme.palette.common.white,
        border: theme.palette.common.black,
        display:"flex",
        flexDirection: "column"
        
    },
    root: {
        width: '100%',
        maxWidth: 360,
    }
}))
const CardDropdown = ({ cartitems, history, dispatch }) => {
    const classes = useStyles()
    return (
        <div className={classes.cartdropdown}>
            {
                cartitems.length ? <List className={classes.root}>
                    {cartitems.map((item, i) => <CartItems key={i} {...item} />)}
                </List>
                    :
                    <span className="empty-message">No hay items</span>
            }

            <Button variant="outlined" onClick={() => {
                dispatch(toggleCart());
                history.push("/checkout");
            }}>Go to Check out</Button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    cartitems: cartitemsSelector(state)
})
export default withRouter(connect(mapStateToProps)(CardDropdown));