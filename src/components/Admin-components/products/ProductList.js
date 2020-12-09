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
import SelectInput from "../Utils/SelectInput";
import TableList from "../Utils/TableList";

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

const ProductList = ({
  handleSelectInputs,
  categories,
  collections,
  colelctionSelected,
  products,
  handleCurrentPage,
}) => {
  const classes = useStyles();
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
    // fetchingProductsAsync();
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

  const columnsDataTable = [
    { name: "NOMBRE", align: "right" },
    { name: "PRECIO", align: "right" },
    // { name: "APELLIDOS", align: "right" },
    // { name: "ACCIONES", align: "right" },
  ];

  const rowsDataTable = products.map((product) => ({
    columnValue1: { image: false, value: product.name },
    columnValue2: { image: false, value: product.price.current.text },
    // columnValue3: { image: false, value: user.lastName },
  }));

  return (
    <div>
      {/* <ModalDialogAdd open={openModalAdd} handleClose={handleModalAdd} />

      {openModalEdit.open && (
        <ModalDialogEdit
          open={openModalEdit.open}
          item={openModalEdit.item}
          handleClose={handleModalEdit}
        />
      )} */}

      <AlertComponent
        open={openDelete.open}
        itemToDelete={openDelete.itemdelete}
        handleClose={handleCloseDelete}
        handleConfirm={handleDeleteItem}
        message="Al eliminar el producto será borrado en la Base de datos y no podra ser recuperado.
                        ¿Está Seguro de eliminarlo?"
        title="Eliminar Producto?"
      />

      <Grid container>
        <Grid xs={12} item>
          <Box display="flex" justifyContent="center">
            <Typography component="h4">
              Listado de Productos en Stock
            </Typography>
          </Box>
          <Box display="flex">
            <Box>
              <SelectInput
                label="Categoria"
                name="category"
                value={colelctionSelected.category}
                handleSelect={handleSelectInputs}
                options={categories.map((item) => ({
                  value: item,
                  name: item,
                }))}
              />
            </Box>
            <Box>
              <SelectInput
                label="Colleccion"
                name="collection"
                value={colelctionSelected.collection}
                handleSelect={handleSelectInputs}
                options={collections.map((item) => ({
                  value: item.name,
                  name: item.name,
                }))}
              />
            </Box>
          </Box>
        </Grid>

        <Grid xs={6} item>
          <Button
            onClick={() => handleCurrentPage("create")}
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
          <TableList
            columns={columnsDataTable}
            datas={rowsDataTable}
            // renderButtons={(index) => (
            //   <Box display="flex" justifyContent="flex-end">
            //     <IconButton
            //       onClick={() => HandleOrderFromClient(index)}
            //       aria-label="delete"
            //     >
            //       <GridOnOutlined />
            //     </IconButton>
            //   </Box>
            // )}
          />

          {/* <TableContainer component={Paper}>
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
                    count={filterData(products).length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer> */}
        </Grid>
      </Grid>
    </div>
  );
};

// const mapdispatchToState = (dispatch) => ({
//   fetchingProductsAsync: () => dispatch(fetchingProductsAsync()),
// });

export default ProductList;
