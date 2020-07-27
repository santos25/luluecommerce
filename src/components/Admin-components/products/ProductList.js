import React, { useState } from 'react';

//components
import ModalDialogAdd from './ModalDialogAdd'

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

} from '@material-ui/core';

import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    AddCircle as AddCircleIcon,
} from '@material-ui/icons'


const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    table: {
        minWidth: 650,
    },
}));

const ProductList = ({ products, handleCurrentPage, handleRemoveItems }) => {
    const classes = useStyles();
    console.log(products);
    const [openModal, setOpenModal] = useState(false)

    const handleModal = () => {
        setOpenModal(!openModal);

    }
    return (
        <div>
            {openModal && <ModalDialogAdd open={openModal} handleClose={handleModal}/>}

            <Box display="flex" justifyContent="center">
                <Typography component="h4"> Listado de Productos en Stock</Typography>
            </Box>
            <Grid container>
                <Grid xs={12} item>
                    <Button
                        onClick={handleModal}
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
                    <TableContainer >
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
                                {products.map((product) => (
                                    <TableRow key={product.name}>
                                        {/* {console.log(product.createdt.toDate())} */}
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
                                                <IconButton aria-label="delete">
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="edit">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            {/* <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={3}
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
                                            native: true,
                                        }}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter> */}
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

        </div >)
}

export default ProductList