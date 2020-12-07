import React, { useState } from "react";
// import { connect } from "react-redux";
//actions
// import { fetchingProductsAsync } from "../../../Redux/Admin/Products/product.actions";

//firestore
import { removeItem } from "../../../FireBase/FireBaseUtil";
//components
import ModalDialogAdd from "./ModalDialogAdd";
import ModalDialogEdit from "./ModalDialogEdit";
import AlertComponent from "../Utils/Alert";

import {
  makeStyles,
  Button,
  Typography,
  Avatar,
  IconButton,
  Grid,
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  Paper,
  TablePagination,
  TextField,
} from "@material-ui/core";

import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  AddCircle as AddCircleIcon,
} from "@material-ui/icons";
import { firestore } from "../../../FireBase/FireBaseUtil";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  table: {
    minWidth: 650,
  },
}));

const ProductList = ({ products, fetchingProductsAsync }) => {
  const classes = useStyles();
  console.log(products);
  const [openModalAdd, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState({ open: false, item: {} });
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [filterQuery, setFilterQUery] = useState("");
  const [openDelete, setOpenDelete] = useState({ open: false, itemdelete: {} });

  const handleModalAdd = () => {
    setOpenModal(!openModalAdd);
  };

  const handleDeleteItem = (item) => {
    console.log(item);
    const docRef = firestore.collection("collections").doc(item.id);
    removeItem(docRef, item.category, item.itemkey);

    handleCloseDelete();
    fetchingProductsAsync();
  };

  const handleEditItem = (selectedItem) => {
    console.log(selectedItem);
    setOpenModalEdit({ open: true, item: selectedItem });
  };

  const handleModalEdit = () => {
    setOpenModalEdit({ open: false, item: {} });
  };

  const handleChangePage = (event, newPage) => {
    console.log(event);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value);
    setRowsPerPage(parseInt(event.target.value));
  };

  const filterData = (products) => {
    const filteredData = products.filter((data) =>
      data.name.toLowerCase().includes(filterQuery)
    );
    return filteredData;
  };

  const handleCloseDelete = () => {
    setOpenDelete({ open: false, itemdelete: {} });
  };

  return (
    <div>
      {/* {openModalAdd && <ModalDialogAdd open={openModalAdd} handleClose={handleModalAdd} />}
       */}
      <ModalDialogAdd open={openModalAdd} handleClose={handleModalAdd} />

      {openModalEdit.open && (
        <ModalDialogEdit
          open={openModalEdit.open}
          item={openModalEdit.item}
          handleClose={handleModalEdit}
        />
      )}

      {/* <ModalDialogEdit open={openModalEdit.open}
                item={openModalEdit.item}
                handleClose={handleModalEdit} /> */}

      <AlertComponent
        open={openDelete.open}
        itemToDelete={openDelete.itemdelete}
        handleClose={handleCloseDelete}
        handleConfirm={handleDeleteItem}
        message="Al eliminar el producto será borrado en la Base de datos y no podra ser recuperado.
                        ¿Está Seguro de eliminarlo?"
        title="Eliminar Producto?"
      />
      <Box display="flex" justifyContent="center">
        <Typography component="h4"> Listado de Productos en Stock</Typography>
      </Box>
      <Grid container>
        <Grid xs={6} item>
          <Button
            onClick={handleModalAdd}
            size="small"
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<AddCircleIcon />}
          >
            Agregar
          </Button>
        </Grid>
        <Grid xs={6} item>
          <TextField
            onChange={(e) => setFilterQUery(e.target.value)}
            // autoComplete="fname"
            name="filterTable"
            variant="outlined"
            id="filterTable"
            label="Filtrar"
            size="small"
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} item>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>IMAGEN</TableCell>
                  <TableCell align="right">NOMBRE</TableCell>
                  <TableCell align="right">PRECIO</TableCell>
                  <TableCell align="right">CATEGORIA</TableCell>
                  <TableCell align="right">FECHA CREACION</TableCell>
                  <TableCell align="right">ACCIONES</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filterData(products).slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filterData(products)
                ).map((product, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      <Avatar
                        className={classes.large}
                        alt={product.name}
                        src={product.image[0]}
                      />
                    </TableCell>
                    <TableCell align="right">{product.name}</TableCell>
                    <TableCell align="right">{`$${product.price}`}</TableCell>
                    <TableCell align="right">{product.category}</TableCell>
                    <TableCell align="right">Working on this cell</TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="flex-end">
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEditItem(product)}
                        >
                          <EditIcon />
                        </IconButton>
                        {/* <IconButton aria-label="delete" onClick={() => handleDeleteItem(product)}>
                                                    <DeleteIcon />
                                                </IconButton> */}
                        <IconButton
                          aria-label="delete"
                          onClick={() =>
                            setOpenDelete({ open: true, itemdelete: product })
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    // colSpan={3}
                    count={filterData(products).length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    // ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

// const mapdispatchToState = (dispatch) => ({
//   fetchingProductsAsync: () => dispatch(fetchingProductsAsync()),
// });

export default ProductList;
