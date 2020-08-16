import React from 'react'

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogContent,
    DialogActions,
} from '@material-ui/core'

const Alert = ({message , title , open , itemToDelete, handleClose , handleConfirm}) => {
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
          </Button>
                    <Button onClick={() => handleConfirm(itemToDelete)} color="primary" autoFocus>
                        OK
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Alert
