import React, { useState } from 'react';

//firestore
import { removeItem } from '../../../FireBase/FireBaseUtil'
//components
import ModalDialogAdd from './ModalDialogAdd'
import ModalDialogEdit from './ModalDialogEdit'

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

} from '@material-ui/core';

import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    AddCircle as AddCircleIcon,
} from '@material-ui/icons'
import { firestore } from '../../../FireBase/FireBaseUtil';


const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    table: {
        minWidth: 650,
    },
}));

const ProductList = ({ products }) => {
    const classes = useStyles();
    console.log(products);
    const [openModalAdd, setOpenModal] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState({ open: false, item: {} })
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    const handleModalAdd = () => {
        setOpenModal(!openModalAdd);
    }

    const handleDeleteItem = (item) => {
        console.log(item);
        const docRef = firestore.collection('collections').doc(item.id)
        removeItem(docRef, item.category, item.itemkey);
    }

    const handleEditItem = (selectedItem) => {
        console.log(selectedItem);
        setOpenModalEdit({ open: true, item: selectedItem });
    }

    const handleModalEdit = () => {
        setOpenModalEdit({ open: false, item: {} })
    }

    const handleChangePage = (event , newPage) =>{
        console.log(event);
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        console.log(event.target.value);
        setRowsPerPage(parseInt(event.target.value))
    }

    return (
        <div>
            {openModalAdd && <ModalDialogAdd open={openModalAdd} handleClose={handleModalAdd} />}
            {openModalEdit.open && <ModalDialogEdit open={openModalEdit.open}
                item={openModalEdit.item}
                handleClose={handleModalEdit} />}

            <Box display="flex" justifyContent="center">
                <Typography component="h4"> Listado de Productos en Stock</Typography>
            </Box>
            <Grid container>
                <Grid xs={12} item>
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
                                    ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : products
                                ).map((product , index) => (
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
                                        <TableCell >
                                            <Box display="flex" justifyContent="flex-end">
                                                <IconButton aria-label="edit" onClick={() => handleEditItem(product)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete" onClick={() => handleDeleteItem(product)}>
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
                                        count={products.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
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

        </div >)
}

export default ProductList