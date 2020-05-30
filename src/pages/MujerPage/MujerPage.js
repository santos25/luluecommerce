import React from 'react';
import ShopCollection from '../../components/ShopCollectionsView/ShopCollection';
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
                        return <ShopCollection key={id} {...others} />
                    })
                }
            </div>
        );

    }

}


export default MujerPage;