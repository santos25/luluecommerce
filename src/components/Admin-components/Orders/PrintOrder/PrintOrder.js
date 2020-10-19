import React from "react";
import "./PrintOrder.css";
import Image from "../../../../assets/images/logo.jpeg";

import OrderTable from "../OrderTable";

class PrintOrder extends React.Component {
  render() {
    const { printRef, client, items, total, orderInfo } = this.props;
    return (
      <div className="containerPrint" ref={printRef}>
        <div className="header">
          <img src={Image} alt="" />
        </div>
        <div className="info">
          <h3>{`Cliente: ${client.name}`}</h3>
          <h3>{`Cedula: ${client.cedula}`}</h3>
        </div>
        <div className="info">
          <h3>{`Tipo de Pago: ${orderInfo.payType}`}</h3>
          <h3>{`Abono: ${orderInfo.abono}`}</h3>
        </div>
        <div className="items">
          <OrderTable
            items={items}
            handleItems={null}
            disabled={true}
            buttons={null}
          />
          <div className="total">
            <h6>{`TOTAL: ${total}`}</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default PrintOrder;
