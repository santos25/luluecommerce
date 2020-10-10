import React, { useState, useEffect } from "react";

import ModalDialogAdd from "./ModalDialogAdd";
import AlertComponent from "../Utils/Alert";

//components
import TableList from "../Utils/TableList";

import { firestore, removePrenda } from "../../../FireBase/FireBaseUtil";

import {
  // makeStyles,
  Button,
  Typography,
  Grid,
  Box,
  TextField,
} from "@material-ui/core";

import {
  // Delete as DeleteIcon,
  //   Edit as EditIcon,
  AddCircle as AddCircleIcon,
} from "@material-ui/icons";

// const useStyles = makeStyles((theme) => ({
//   large: {
//     width: theme.spacing(8),
//     height: theme.spacing(8),
//   },
//   table: {
//     minWidth: 650,
//   },
// }));

const ListPrendas = () => {
  const [prendas, setPrendas] = useState([]);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [page, setPage] = useState(0);
  const [openModalAdd, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState({ open: false, itemdelete: {} });

  // const classes = useStyles();

  useEffect(() => {
    fetchPrendas();
  }, []);

  const fetchPrendas = () => {
    const collectionRef = firestore.collection("genre");
    collectionRef.get().then((snapshot) => {
      const datas = [];
      snapshot.docs.forEach((doc) => {
        Object.keys(doc.data().prendas).forEach((keyPrenda) => {
          datas.push({
            ...doc.data().prendas[keyPrenda],
            genre: doc.data().name,
          });
        });
      });
      setPrendas(datas);
    });
  };

  const handleModalAdd = () => {
    setOpenModal(!openModalAdd);
  };

  const handleCloseDelete = () => {
    setOpenDelete({ open: false, itemdelete: {} });
  };

  const handleDeleteItem = (item) => {
    console.log(item);
    const docRef = firestore.collection("genre").doc(item.genre.toLowerCase());

    removePrenda(docRef, item);

    handleCloseDelete();
    fetchPrendas();
  };

  const rowsDataTable = prendas.map((prenda) => ({
    columnValue1: prenda.image,
    columnValue2: prenda.name,
    columnValue3: prenda.genre,
  }));

  const columnsDataTable = [
    { name: "IMAGEN", align: "left" },
    { name: "NOMBRE", align: "right" },
    { name: "GENERO", align: "right" },
    { name: "ACCIONES", align: "right" },
  ];

  return (
    <Box textAlign="center">
      <ModalDialogAdd open={openModalAdd} handleClose={handleModalAdd} />

      {/* {openModalEdit.open && <ModalDialogEdit open={openModalEdit.open}
                item={openModalEdit.item}
                handleClose={handleModalEdit} />} */}

      <AlertComponent
        open={openDelete.open}
        itemToDelete={openDelete.itemdelete}
        handleClose={handleCloseDelete}
        handleConfirm={handleDeleteItem}
        message="Al eliminar será borrado en la Base de datos y no podra ser recuperado.
                        ¿Está Seguro de eliminarlo?"
        title="Eliminar Prenda?"
      />

      <Typography component="h4"> Listado de Prendas</Typography>

      <Grid container>
        <Grid xs={6} item>
          <Button
            onClick={handleModalAdd}
            size="small"
            variant="contained"
            color="primary"
            // className={classes.button}
            endIcon={<AddCircleIcon />}
          >
            Agregar
          </Button>
        </Grid>
        <Grid xs={6} item>
          <TextField
            // onChange={(e) => setFilterQUery(e.target.value)}
            // autoComplete="fname"
            name="filterTable"
            variant="outlined"
            id="filterTable"
            label="Filtrar"
            size="small"
          />
        </Grid>
        <Grid xs={12} item>
          <TableList datas={rowsDataTable} columns={columnsDataTable} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ListPrendas;
