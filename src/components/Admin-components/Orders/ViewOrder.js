import React, { useState, useEffect } from "react";

import {
  Box,
  Typography,
  makeStyles,
  Grid,
  IconButton,
} from "@material-ui/core";

//components
import TableList from "../Utils/TableList";
import OrderTable from "../Orders/OrderTable";

import { firestore } from "../../../FireBase/FireBaseUtil";
import { GridOnOutlined } from "@material-ui/icons";

const useStyle = makeStyles((theme) => ({
  header: {
    margin: "10px 15px",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "10px 15px",
  },
}));

const ViewOrder = (props) => {
  const { cedula, lastName, name } = props.data;
  const [orders, setOrders] = useState([]);
  const [PageDetail, setPageDetail] = useState({ open: false, dataDetail: [] });

  const classes = useStyle();
  useEffect(() => {
    const collRef = firestore
      .collection("clients")
      .doc(cedula)
      .collection("orders");
    collRef.get().then((snapShot) => {
      const dataOrders = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(dataOrders);
    });
  }, []);

  const columnsDataTable = [
    { name: "ID ORDEN", align: "right" },
    { name: "FECHA", align: "right" },
  ];

  const rowsDataTable = orders.map((order) => {
    const date = new Date(order.date.toDate()).toString();
    // console.log(order);
    return {
      columnValue1: { image: false, value: order.id },
      columnValue2: { image: false, value: date },
    };
  });

  const handleOrder = (index) => {
    console.log(orders[index].items);
    setPageDetail({ open: true, dataDetail: orders[index].items });
  };

  return (
    <Box>
      <Box display="flex">
        <Typography className={classes.header} component="h3">
          {" "}
          {`Cedula : ${cedula}`}
        </Typography>
        <Typography className={classes.header} component="h3">
          {" "}
          {`Nombre : ${name} ${lastName}`}
        </Typography>
      </Box>

      {PageDetail.page ? (
        <Grid container>
          <Grid xs={12} item>
            <TableList
              columns={columnsDataTable}
              datas={rowsDataTable}
              renderButtons={(index) => (
                <Box display="flex" justifyContent="flex-end">
                  <IconButton
                    onClick={() => handleOrder(index)}
                    aria-label="delete"
                  >
                    <GridOnOutlined />
                  </IconButton>
                </Box>
              )}
            />
          </Grid>
        </Grid>
      ) : (
        <OrderTable
          pdfRef={null}
          items={PageDetail.dataDetail}
          handleItems={null}
        />
      )}
    </Box>
  );
};

export default ViewOrder;
