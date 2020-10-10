import React, { useEffect, useState } from "react";

//material UI
import {
  Box,
  Button,
  Grid,
  Typography,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { AddCircle as AddCircleIcon } from "@material-ui/icons";

import { GridOnOutlined } from "@material-ui/icons";

//components
import TableList from "../Utils/TableList";
import CreateUser from "./CreateUser";
import ModalDialog from "../Utils/ModalDialog";
import CreateOrder from "../Orders/CreateOrder";
import ViewOrder from "../Orders/ViewOrder";

import { firestore } from "../../../FireBase/FireBaseUtil";

const useStyles = makeStyles((theme) => ({
  tittle: {
    textAlign: "center",
  },
}));

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [openModalAddUser, setOpenModalUser] = useState(false);
  const [openModalAddOrder, setOpenModalOrder] = useState(false);
  const [openModalUserOrders, setopenModalUserOrders] = useState(false);
  const [ordersFromClient, setOrdersFromClient] = useState({});

  const classes = useStyles();
  console.log("render");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    const collectionRef = firestore.collection("clients");
    collectionRef.get().then((snapshot) => {
      const userDatas = snapshot.docs.map((doc) => doc.data());
      setUsers(userDatas);
    });
  };
  const handleModalAddUser = () => {
    setOpenModalUser(!openModalAddUser);
  };

  const handleModalAddOrder = () => {
    setOpenModalOrder(!openModalAddOrder);
  };

  const handleModalUserOrders = () => {
    setopenModalUserOrders(!openModalUserOrders);
  };

  const HandleOrderFromClient = (index) => {
    setopenModalUserOrders(!openModalUserOrders);
    setOrdersFromClient(users[index]);
  };

  const columnsDataTable = [
    { name: "CEDULA", align: "right" },
    { name: "NOMBRES", align: "right" },
    { name: "APELLIDOS", align: "right" },
    { name: "ACCIONES", align: "right" },
  ];

  const rowsDataTable = users.map((user) => ({
    columnValue1: { image: false, value: user.cedula },
    columnValue2: { image: false, value: user.name },
    columnValue3: { image: false, value: user.lastName },
  }));

  return (
    <Box>
      <ModalDialog
        tittle="Crear Cliente"
        open={openModalAddUser}
        handleClose={handleModalAddUser}
      >
        <CreateUser closeModal={handleModalAddUser} fetchUsers={fetchUsers} />
      </ModalDialog>

      <ModalDialog
        tittle="Crear Orden"
        open={openModalAddOrder}
        handleClose={handleModalAddOrder}
      >
        <CreateOrder closeModal={handleModalAddOrder} />
      </ModalDialog>

      <ModalDialog
        tittle="Ordenes"
        open={openModalUserOrders}
        handleClose={handleModalUserOrders}
      >
        <ViewOrder closeModal={handleModalUserOrders} data={ordersFromClient} />
      </ModalDialog>

      <Typography variant="h6" className={classes.tittle}>
        {" "}
        LISTADO DE CLIENTES
      </Typography>
      <Grid spacing={2} container>
        <Grid xs={12} item>
          <Button
            onClick={handleModalAddUser}
            size="small"
            variant="contained"
            color="primary"
            endIcon={<AddCircleIcon />}
          >
            Agregar Cliente
          </Button>

          <Button
            onClick={handleModalAddOrder}
            size="small"
            variant="contained"
            color="primary"
            endIcon={<AddCircleIcon />}
          >
            Crear Orden
          </Button>
        </Grid>
        <Grid xs={12} item>
          <TableList
            columns={columnsDataTable}
            datas={rowsDataTable}
            renderButtons={(index) => (
              <Box display="flex" justifyContent="flex-end">
                <IconButton
                  onClick={() => HandleOrderFromClient(index)}
                  aria-label="delete"
                >
                  <GridOnOutlined />
                </IconButton>
              </Box>
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserList;
