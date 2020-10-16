import React, { useEffect, useState } from "react";

//material UI
import {
  Box,
  // Button,
  // Grid,
  // Typography,
  // IconButton,
  makeStyles,
} from "@material-ui/core";
// import { AddCircle as AddCircleIcon } from "@material-ui/icons";

// import { GridOnOutlined } from "@material-ui/icons";

//components
// import TableList from "../Utils/TableList";
import CreateUser from "./CreateUser";
import ModalDialog from "../Utils/ModalDialog";
import CreateOrder from "../Orders/CreateOrder";
import OrderList from "../Orders/OrderList";
import UserLists from "./UserLists";

import { firestore } from "../../../FireBase/FireBaseUtil";

// const useStyles = makeStyles((theme) => ({
//   tittle: {
//     textAlign: "center",
//   },
// }));

const UserHome = () => {
  const [users, setUsers] = useState([]);
  const [openModalAddUser, setOpenModalUser] = useState(false);
  const [openModalAddOrder, setOpenModalOrder] = useState(false);
  const [clientSelected, setClientSelected] = useState({});
  const [currentPage, setCurrentPage] = useState('listUsers');

  // const classes = useStyles();


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


  const HandleOrderFromClient = (index) => {
    // setopenModalUserOrders(!openModalUserOrders);
    setCurrentPage('listOrders')
    setClientSelected(users[index]);

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

  const renderPages = () => {

    if(currentPage === 'listUsers'){
      return (
        <UserLists handleModalAddUser={handleModalAddUser}
        handleModalAddOrder={handleModalAddOrder}
        HandleOrderFromClient={HandleOrderFromClient}
        columnsDataTable={columnsDataTable}
        rowsDataTable={rowsDataTable}/>
      )
    }else if(currentPage === 'listOrders'){
        return (
          <OrderList 
            returnPage={() => setCurrentPage('listUsers')}
            user={clientSelected}
            
            
            />
        )
    }
  }

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

    

     {renderPages()}
    </Box>
  );
};

export default UserHome;
