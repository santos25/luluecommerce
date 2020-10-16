import React from "react";

import { Box, Typography, makeStyles } from "@material-ui/core";

//components
// import TableList from "../Utils/TableList";
import OrderTable from "../Orders/OrderTable";

// import { firestore } from "../../../FireBase/FireBaseUtil";
// import { GridOnOutlined } from "@material-ui/icons";

const useStyle = makeStyles((theme) => ({
  header: {
    margin: "10px 15px",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "10px 15px",
  },
}));

const ViewOrder = ({ dataOrder, dataUser }) => {
  const classes = useStyle();

  console.log(dataOrder);

  const getTotal = () => {
    const total = dataOrder.items.reduce((total, item) => {
      return total + item.total;
    }, 0);
    return total - dataOrder.abono;
  };

  return (
    <Box>
      <Box display="flex">
        <Typography className={classes.header} component="h3">
          {" "}
          {`Cedula : ${dataUser.cedula}`}
        </Typography>
        <Typography className={classes.header} component="h3">
          {" "}
          {`Nombre : ${dataUser.name} ${dataUser.lastName}`}
        </Typography>
      </Box>
      <Box display="flex">
        <Typography className={classes.header} component="h3">
          {" "}
          {`Abono : ${dataOrder.abono}`}
        </Typography>
        <Typography className={classes.header} component="h3">
          {" "}
          {`Tipo de Pago : ${dataOrder.payType} `}
        </Typography>
      </Box>
      <OrderTable
        pdfRef={null}
        items={dataOrder.items}
        handleItems={null}
        disabled={true}
      />
      <Box display="flex">
        <Typography className={classes.header} component="h3">
          {" "}
          {`Total : ${getTotal()}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ViewOrder;
