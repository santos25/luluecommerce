import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

import { Box, Typography, makeStyles, Grid, Button } from "@material-ui/core";

//components
// import TableList from "../Utils/TableList";
import OrderTable from "../Orders/OrderTable";
import PrintOrder from "../Orders/PrintOrder/PrintOrder";

// import { firestore } from "../../../FireBase/FireBaseUtil";
// import { GridOnOutlined } from "@material-ui/icons";

const useStyle = makeStyles((theme) => ({
  header: {},
  print: {
    visibility: "hidden",
  },
}));

const ViewOrder = ({ dataOrder, dataUser }) => {
  const classes = useStyle();
  const componentRef = useRef();

  console.log(dataUser);

  const getTotal = () => {
    const total = dataOrder.items.reduce((total, item) => {
      return total + item.total;
    }, 0);
    return total - dataOrder.abono;
  };

  return (
    <Box>
      <Grid container>
        <Grid xs={12} sm={6} item>
          <Typography className={classes.header} component="h3">
            {`Cedula : ${dataUser.cedula}`}
          </Typography>
        </Grid>
        <Grid xs={12} sm={6} item>
          <Typography className={classes.header} component="h3">
            {`Nombre : ${dataUser.name} ${dataUser.lastName}`}
          </Typography>
        </Grid>

        <Grid xs={12} sm={6} item>
          <Typography className={classes.header} component="h3">
            {`Abono : ${dataOrder.abono}`}
          </Typography>
        </Grid>
        <Grid xs={12} sm={6} item>
          <Typography className={classes.header} component="h3">
            {`Tipo de Pago : ${dataOrder.payType} `}
          </Typography>
        </Grid>
      </Grid>

      <OrderTable items={dataOrder.items} handleItems={null} disabled={true} />
      <Box display="flex" width={1} justifyContent="flex-end">
        <Typography variant="h6">{`Total : ${getTotal()}`}</Typography>
      </Box>

      <ReactToPrint
        trigger={() => (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            // disabled={client.id ? false : true}
          >
            Generar Factura
          </Button>
        )}
        content={() => componentRef.current}
      />
      <Box className={classes.print}>
        <PrintOrder
          items={dataOrder.items}
          client={dataUser}
          total={getTotal()}
          printRef={componentRef}
          orderInfo={dataOrder}
        />
      </Box>
    </Box>
  );
};

export default ViewOrder;
