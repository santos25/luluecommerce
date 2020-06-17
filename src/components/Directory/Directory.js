import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { discountItemsSelector } from '../../Redux/directory/directory.selectors';
import { loadDiscountClothes } from '../../Redux/directory/directory.action';

import Header from '../../components/Header/Header';
import CardImages from '../CardImages/CardImages';


const Directory = ({ discountItems, loadItems }) => {

    useEffect(() => {
        console.log("Fetching Discount");

        fetch('https://pixabay.com/api/?key=16434003-adc3d5ed6b80ff05886e00162&category=fashion&min_height=100')
            .then(data => data.json())
            .then(result => loadItems(result.hits))
            .catch(error => console.log(error));
    }, []);

    // let { discountItems } = this.props;
    return (
        <div>
            {/* <Header /> */}
            <section className="suggestion">
                <h1 className="">DESCUENTOS</h1>
                <div className="container">
                    {
                        discountItems.filter((data, i) => i < 5)
                            .map((image, index) => (<CardImages key={index} item={{ imageUrl: image.webformatURL }} />))
                    }
                </div>
            </section>
        
        </div>

    );
}

const mapStateToProps = createStructuredSelector({
    discountItems: discountItemsSelector
})

const mapDispatchToState = (dispatch) => ({
    loadItems: (data) => dispatch(loadDiscountClothes(data))
})

export default connect(mapStateToProps, mapDispatchToState)(Directory);

