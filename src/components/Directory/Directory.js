import React from 'react';
import Header from '../../components/Header/Header';
import CardDescuento from '../Descuentos/CardDescuento';


class Directory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Header />
                <section className="suggestion">
                    <h1 className="">RECOMENDACIONES</h1>
                    <div className="container">
                        {
                            this.props.imagesDescuento.map((image, index) => {
                                if (index < 6) {
                                    return <CardDescuento id={index} webformatURL={image.webformatURL} />
                                }
                            }
                            )
                        }
                    </div>
                </section>
            </div>

        );
    }
}


export default Directory;

