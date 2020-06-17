import React from 'react';
import ShopCollections from '../../components/ShopCollectionsView/ShopCollections';
import MUJERDATA from './MujerData';

class MujerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataMujeres: MUJERDATA
        }
    }

    render() {
        const { dataMujeres } = this.state;
        
        return (
            <div>
                {
                    dataMujeres.map(({ id, ...others }) => {
                        return <ShopCollections key={id} {...others} />
                    })
                }
            </div>
        );

    }

}


export default MujerPage;