import React from "react";

class PrintCart extends React.Component {
  render() {
    const { printRef } = this.props;
    return <div ref={printRef}></div>;
  }
}

export default PrintCart;
