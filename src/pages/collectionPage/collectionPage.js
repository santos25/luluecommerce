import React from 'react';
import { connect } from 'react-redux';
import { dataCollectionSelector } from '../../Redux/shop/shop.selectors';
import CardImages from '../../components/CardImages/CardImages';
import './collection.styles.css';

const CollectionPage = ({ collection }) => {

    const { title, items } = collection;
    
    return (
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
                {
                    items.map(item => <CardImages key={item.id} item={item} />)
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    collection: dataCollectionSelector(ownProps.match.params.collectionId)(state)
})


export default connect(mapStateToProps)(CollectionPage);