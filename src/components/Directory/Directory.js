import React from 'react';
import Header from '../../components/Header/Header';
import CardImages from '../CardImages/CardImages';


class Directory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imagesDescuento: []
        }
    }



    componentDidMount() {
        fetch('https://pixabay.com/api/?key=16434003-adc3d5ed6b80ff05886e00162&category=fashion&min_height=100')
            .then(data => data.json())
            .then(result => this.setState({ imagesDescuento: result.hits }))
            .catch(error => console.log(error));
    }

    render() {
        let { imagesDescuento } = this.state;
        return (
            <div>
                {/* <Header /> */}
                <section className="suggestion">
                    <h1 className="">DESCUENTOS</h1>
                    <div className="container">
                        {
                            imagesDescuento.filter((data, i) => i < 3)
                                .map((image, index) => (<CardImages key={index} item={{imageUrl : image.webformatURL}} />))
                        }
                    </div>
                </section>
                {/* <Footer /> */}
            </div>

        );
    }
}


export default Directory;

