import React, { useState, useEffect } from "react";

import { Box, Button, Grid } from "@material-ui/core";
import { AddCircle as AddCircleIcon } from "@material-ui/icons";

//components
import ModalDialog from "../Utils/ModalDialog";
import TableList from "../Utils/TableList";
import CreateOrder from "./CreateOrder";

import { firestore } from "../../../FireBase/FireBaseUtil";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [openModalAdd, setOpenModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleModalAdd = () => {
    setOpenModal(!openModalAdd);
  };

  const fetchOrders = () => {
    const collectionRef = firestore.collection("orders");
    collectionRef.get().then((snapshot) => {
      const ordersDatas = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(ordersDatas);
    });
  };

  const columnsDataTable = [
    { name: "ID ORDEN", align: "right" },
    { name: "ID CLIENTE", align: "right" },
    { name: "CLIENTE", align: "right" },
  ];

  const rowsDataTable = orders.map((order) => ({
    columnValue1: { image: false, value: order.id },
    columnValue2: { image: false, value: order.clientid },
    columnValue3: { image: false, value: order.client },
  }));

  return (
    <Box textAlign="center">
      <ModalDialog
        tittle="Crear Orden"
        open={openModalAdd}
        handleClose={handleModalAdd}
      >
        <CreateOrder closeModal={handleModalAdd} fetchOrders={fetchOrders} />
      </ModalDialog>

      <h4>Listado de Ordenes de Compra</h4>
      <Grid container>
        <Grid xs={12} item>
          <Button
            onClick={handleModalAdd}
            size="small"
            variant="contained"
            color="primary"
            endIcon={<AddCircleIcon />}
          >
            Agregar
          </Button>
        </Grid>
        <Grid xs={12} item>
          <TableList columns={columnsDataTable} datas={rowsDataTable} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderList;
