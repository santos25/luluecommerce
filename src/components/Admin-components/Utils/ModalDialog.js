import React from "react";

import {
  DialogContent,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@material-ui/core";

const ModalDialog = ({ handleClose, open, tittle, ...props }) => {
  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">{tittle}</DialogTitle>
        <DialogContent>{props.children}</DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            size="small"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ModalDialog;
