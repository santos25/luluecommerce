import React from 'react';
import ShopComponent from '../ShopComponent/ShopComponent';

const ShopCollection = ({ id, items }) => {    
    return (
        <div className="container" key={id}>
            {
                items.map((item) => {                    
                    return <ShopComponent key={item.id} item={item} />
                }
                )
            }
        </div>
    );
}

export default ShopCollection;