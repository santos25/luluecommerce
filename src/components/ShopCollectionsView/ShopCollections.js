import React from 'react';
import { withRouter} from 'react-router-dom';

import CardImages from '../CardImages/CardImages';

const ShopCollections = ({ items, title, match , history }) => {
   
     
    return (
        <div className='collection-preview'>
            <h1 className='title cursor-pointer' onClick={() => history.push(`${match.url}/${title}`)} >{title.toUpperCase()}</h1>
            <div className='preview'>
                {
                    items.filter((item, index) => index < 4)
                    .map((item) => {
                        return <CardImages key={item.id} item={item} />
                    }
                    )
                }
            </div>
        </div>

    );
}

export default withRouter(ShopCollections);