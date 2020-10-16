import React, { useState, useEffect } from "react";

import { Box, Button, Grid, IconButton, Typography } from "@material-ui/core";
import { ArrowBack , Visibility } from "@material-ui/icons";

//components
import ModalDialog from "../Utils/ModalDialog";
import TableList from "../Utils/TableList";
import ViewOrder from "../Orders/ViewOrder";

// import CreateOrder from "./CreateOrder";

import {formatDate} from '../Utils/FormatDate';
import { firestore } from "../../../FireBase/FireBaseUtil";

const OrderList = ({user, returnPage}) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [openModalUserOrders, setopenModalUserOrders] = useState(false);

  // console.log(user);
  useEffect(() => {
    fetchOrders();
    
  }, []);

  // const handleModalAdd = () => {
  //   setOpenModal(!openModalAdd);
  // };

  const fetchOrders = () => {
    const collectionRef = firestore.collection("clients").doc(user.cedula).collection('orders');
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
    { name: "FECHA", align: "right" },
    { name: "ACCIONES", align: "right" },
  ];

  const rowsDataTable = orders.map((order) => ({
    columnValue1: { image: false, value: order.id },
    columnValue2: { image: false, value: formatDate(order.date.toDate())},
    
  }));

  
  const handleModalUserOrders = () => {
    setopenModalUserOrders(!openModalUserOrders);
  };

  const handleOrderView = (index)=>{
      console.log(orders[index]);
      setSelectedOrder((orders[index]))
      handleModalUserOrders();
      

  }

  return (
    <Box >
        <ModalDialog
        tittle="Detalles Orden"
        open={openModalUserOrders}
        handleClose={handleModalUserOrders}
      >
        
        <ViewOrder closeModal={handleModalUserOrders} dataUser={user} dataOrder={selectedOrder} />
      </ModalDialog>

      <Typography variant="h6">
        {`Ordenes de compra Usuario: ${user.name} ${user.lastName}`}
      </Typography>
      <Grid container>
        <Grid xs={12} item>
          <Button
            onClick={returnPage}
            size="small"
            variant="contained"
            color="primary"
            endIcon={<ArrowBack />}
          >
            Regresar
          </Button>
        </Grid>
        <Grid xs={12} item>
          <TableList columns={columnsDataTable} 
          datas={rowsDataTable}
          renderButtons={(index) => (
            <Box display="flex" justifyContent="flex-end">
              <IconButton
                onClick={() => handleOrderView(index)}
                aria-label="delete"
              >
                <Visibility />
              </IconButton>
            </Box>
          )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderList;
