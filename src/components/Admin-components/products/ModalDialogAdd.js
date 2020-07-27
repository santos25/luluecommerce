import React from 'react'

//components
import CreateProduct from './CreateProduct.component'
import {
    makeStyles,
    DialogContent,
    Dialog,
    DialogContentText,
    DialogTitle,
    FormControl,
    DialogActions,
    Button
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
}))

const ModalDialogAdd = ({ open, handleClose }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Dialog
                fullWidth={true}
                maxWidth="md"
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">Agregar Productos</DialogTitle>
                <DialogContent>
                    <CreateProduct handleClose={handleClose} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="primary">
                        Cerrar
            </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default ModalDialogAdd
