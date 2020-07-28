import React from 'react'

//components
import EditProduct from './EditProduct'

import {
    makeStyles,
    DialogContent,
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    ListItemAvatar
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

const ModalDialogEdit = ({ open, item ,  handleClose }) => {
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
                <DialogTitle id="max-width-dialog-title">Editar Producto</DialogTitle>
                <DialogContent>
                    <EditProduct selectedItem={item} handleClose={handleClose} />
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

export default ModalDialogEdit
