import React from 'react';
import { connect } from 'react-redux';
import './CardImage.styles.css'
import ButtonCustom from '../Button/Button';
import { addItemsToCart } from '../../Redux/Cart/cart.action';

const CardImages = ({ item, addItemsToCart }) => {

  return (
    <div className="collection-item" >
      <div
        className='image'
        style={{
          backgroundImage: `url(${item.imageUrl})`
        }}
      />
      <div className='collection-footer'>
        <span className='name'>{item.name}</span>
        <span className='price'>{item.price}</span>
      </div>
      <ButtonCustom onClick={() => { addItemsToCart(item) }} >Agregar al Carro</ButtonCustom>
    </div>
  );
}

const mapDispatchToState = (dispatch) => ({
  addItemsToCart: (item) => { dispatch(addItemsToCart(item)) }
})

export default connect(null, mapDispatchToState)(CardImages);