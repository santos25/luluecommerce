import React from 'react';
import ShopCollections from '../ShopCollectionsView/ShopCollections';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {dataShopSelector} from '../../Redux/shop/shop.selectors';

const ShopOverview = ({datashop}) => {
    
    return (
        <div className='shop-page'>
            {
                datashop.map(({ id, ...others }) => {
                    return <ShopCollections key={id} {...others} />
                })
            }
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    datashop : dataShopSelector
})

export default connect(mapStateToProps) (ShopOverview);