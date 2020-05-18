import React from 'react';
import './Descuentos.css'

const CardDescuento = ({ webformatURL }) => {
  return (

    <div className="descuento">
      <div
        className='background-image'
        style={{
          backgroundImage: `url(${webformatURL})`
        }}
      />
      <div className='content'>
        <span className='subtitle'>SHOP NOW</span>
      </div>
    </div>
  );
}

export default CardDescuento;