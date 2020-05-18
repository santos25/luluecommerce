import React from 'react';
import Nav from './components/Navegation/Nav';
import HomePage from './pages/homepage/HomePage';
import Footer from './components/Footer/Footer';

class App extends React.Component {
  constructor() {
    super();
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
    console.log(imagesDescuento);
    
    return (
      <div className="bg-white font-serif">
        <Nav/>
        <HomePage imagesDescuento={imagesDescuento}/>
        <Footer/>
        
        {/* <section className="suggestion">
          <h1 className="">RECOMENDACIONES</h1>
          <div className="container">
            {
              imagesDescuento.map((image, index) => {
                if(index < 3) {
                  return <Card id={index} webformatURL={image.webformatURL} tags={image.tags} user={image.tags} />
                }
              }
              )
            }
          </div>
        </section> */}

      </div>

    );
  }


}

export default App;
