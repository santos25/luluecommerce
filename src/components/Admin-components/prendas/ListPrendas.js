import React, { useState, useEffect } from 'react'

import ModalDialogAdd from './ModalDialogAdd';
import AlertComponent from '../Utils/Alert';

import {firestore , removePrenda } from '../../../FireBase/FireBaseUtil'

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


const ListPrendas = () => {
    const [prendas, setPrendas] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [openModalAdd, setOpenModal] = useState(false)
    const [openDelete, setOpenDelete] = useState({ open: false, itemdelete: {} });



    const classes = useStyles();

    useEffect(() => {
        fetchPrendas()
    }, [])


    const fetchPrendas = () => {
        const collectionRef = firestore.collection('genre');
        collectionRef.get().then(snapshot => {
            const datas = [];
            snapshot.docs.forEach(doc => {
                Object.keys(doc.data().prendas).forEach(keyPrenda => {
                    datas.push({ ...doc.data().prendas[keyPrenda], genre: doc.data().name })
                })
            })
            setPrendas(datas)
        })
    }

    const handleModalAdd = () => {
        setOpenModal(!openModalAdd);
    }

    const handleChangePage = (event, newPage) => {
        console.log(event);
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        console.log(event.target.value);
        setRowsPerPage(parseInt(event.target.value))
    }

    const handleCloseDelete = () => {
        setOpenDelete({ open: false, itemdelete: {} })
    }

    const handleDeleteItem = (item) => {
        console.log(item);
        const docRef = firestore.collection('genre').doc(item.genre.toLowerCase());

        removePrenda(docRef, item)

        handleCloseDelete()
        fetchPrendas()
    }

    return (
        <div>

            <ModalDialogAdd open={openModalAdd} handleClose={handleModalAdd} />

            {/* {openModalEdit.open && <ModalDialogEdit open={openModalEdit.open}
                item={openModalEdit.item}
                handleClose={handleModalEdit} />} */}

            <AlertComponent open={openDelete.open}
                itemToDelete={openDelete.itemdelete}
                handleClose={handleCloseDelete}
                handleConfirm={handleDeleteItem}
                message="Al eliminar será borrado en la Base de datos y no podra ser recuperado.
                        ¿Está Seguro de eliminarlo?"
                title="Eliminar Prenda?" />
            <Box display="flex" justifyContent="center">
                <Typography component="h4"> Listado de Prendas</Typography>
            </Box>
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
                        variant="outlined"
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
                                    <TableCell align="right">GENERO</TableCell>
                                    <TableCell align="right">ACCIONES</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {(rowsPerPage > 0
                                    ? prendas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : prendas
                                ).map((prenda, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            <Avatar
                                                className={classes.large}
                                                alt={prenda.name}
                                                src={prenda.image}
                                            />
                                        </TableCell>
                                        <TableCell align="right">{prenda.name}</TableCell>
                                        <TableCell align="right">{prenda.genre}</TableCell>
                                        <TableCell >
                                            <Box display="flex" justifyContent="flex-end">
                                                {/* <IconButton aria-label="edit" onClick={() => handleEditItem(prenda)}>
                                                    <EditIcon />
                                                </IconButton>
                                             */}
                                                <IconButton aria-label="delete" onClick={() => setOpenDelete({ open: true, itemdelete: prenda })}>
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
                                        count={prendas.length}
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

        </div >
    )
}

export default ListPrendas
