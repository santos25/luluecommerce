import React from 'react';
import { connect } from 'react-redux';

// import ButtonCustom from '../Button/Button';
import { addItemsToCart } from '../../Redux/Cart/cart.action';

import {
  Card,
  CardActionArea,
  Button,
  CardActions,
  Typography,
  CardMedia,
  CardContent,
  makeStyles

} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 745,
    marginLeft: 2
  },
  media: {
    height: 340,
  },
});

const CardImages = ({ item, addItemsToCart }) => {
  const classes = useStyles();
  console.log(item);
  
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={item.image}
        />
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Agregar al Carrito
      </Button>
      </CardActions>
    </Card>
  
    //   <ButtonCustom onClick={() => { addItemsToCart(item) }} >Agregar al Carro</ButtonCustom>
  );
}

const mapDispatchToState = (dispatch) => ({
  addItemsToCart: (item) => { dispatch(addItemsToCart(item)) }
})

export default connect(null, mapDispatchToState)(CardImages);