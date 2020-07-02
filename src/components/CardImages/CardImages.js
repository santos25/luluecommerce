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
          image={item.imageUrl}
          // title="Contemplative Reptile"
        />
        {/* <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {item.name}
        </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
        </Typography>
        </CardContent> */}
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Agregar al Carrito
      </Button>
      </CardActions>
    </Card>
    // <div className="collection-item" >
    //   <div
    //     className='image'
    //     style={{
    //       backgroundImage: `url(${item.imageUrl})`
    //     }}
    //   />
    //   <div className='collection-footer'>
    //     <span className='name'>{item.name}</span>
    //     <span className='price'>{item.price}</span>
    //   </div>
    //   <ButtonCustom onClick={() => { addItemsToCart(item) }} >Agregar al Carro</ButtonCustom>
    // </div>
  );
}

const mapDispatchToState = (dispatch) => ({
  addItemsToCart: (item) => { dispatch(addItemsToCart(item)) }
})

export default connect(null, mapDispatchToState)(CardImages);