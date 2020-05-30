import React from 'react';
import ShopCollection from '../../components/ShopCollectionsView/ShopCollection';
import HOMBREDATA from './HombreData';

class HombrePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataHombres: HOMBREDATA
        }
    }

    render() {
        const { dataHombres } = this.state;
        
        return (
            <div>
                {
                    dataHombres.map(({ id, ...others }) => {
                        return <ShopCollection key={id} {...others} />
                    })
                }
            </div>
        );

    }

}


export default HombrePage;