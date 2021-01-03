import React from "react";

import TableList from "../Utils/TableList";

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

const ListPrenda = ({ rowsDataTable, columnsDataTable, handleCurrentPage }) => {
  return (
    <Box textAlign="center">
      {/* <ModalDialogAdd open={openModalAdd} handleClose={handleModalAdd} /> */}

      {/* {openModalEdit.open && <ModalDialogEdit open={openModalEdit.open}
              item={openModalEdit.item}
              handleClose={handleModalEdit} />} */}

      {/* <AlertComponent
        open={openDelete.open}
        itemToDelete={openDelete.itemdelete}
        handleClose={handleCloseDelete}
        handleConfirm={handleDeleteItem}
        message="Al eliminar será borrado en la Base de datos y no podra ser recuperado.
                      ¿Está Seguro de eliminarlo?"
        title="Eliminar Prenda?"
      /> */}

      <Typography component="h4"> Listado de Prendas</Typography>

      <Grid container>
        <Grid xs={4} item>
          <Button
            onClick={() => handleCurrentPage("create")}
            size="small"
            variant="contained"
            color="primary"
            // className={classes.button}
            endIcon={<AddCircleIcon />}
          >
            Agregar Prenda
          </Button>
        </Grid>
        <Grid xs={4} item>
          {/* <Button
            onClick={() => handleCurrentPage("createCategory")}
            size="small"
            variant="contained"
            color="primary"
            // className={classes.button}
            endIcon={<AddCircleIcon />}
          >
            Agregar Categoria
          </Button> */}
        </Grid>
        <Grid xs={4} item>
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
          <TableList
            datas={rowsDataTable}
            columns={columnsDataTable}
            // renderButtons={(index) => (
            //     <Box display="flex" justifyContent="flex-end">
            //       <IconButton
            //         onClick={() => HandleOrderFromClient(index)}
            //         aria-label="delete"
            //       >
            //         <GridOnOutlined />
            //       </IconButton>
            //     </Box>
            //   )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ListPrenda;
