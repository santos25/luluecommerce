import React from 'react';
import {connect} from 'react-redux';
import './CardImages.css'
import ButtonCustom from '../Button/Button';
import {addItemsToCart} from '../../Redux/Cart/cart.action';

const CardImages = ({  item , addItemsToCart }) => {
  
  return (

    <div className="descuento" >
      <div
        className='background-image'
        style={{
          backgroundImage: `url(${item.imageUrl})`
        }}
      />
      <div className='content'>
        <ButtonCustom onClick={() => {addItemsToCart(item)}} >Agregar al Carro</ButtonCustom>
        {/* <span className='subtitle'>SHOP NOW</span> */}
      </div>
    </div>
  );
}

const mapDispatchToState = (dispatch) => ({
  addItemsToCart: (item) => { dispatch(addItemsToCart(item))}
})

export default connect(null,mapDispatchToState)(CardImages);