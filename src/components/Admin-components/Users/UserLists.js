import {
  Box,
  Button,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { GridOnOutlined } from "@material-ui/icons";
import { AddCircle as AddCircleIcon } from "@material-ui/icons";

import TableList from "../Utils/TableList";

import React from "react";

const useStyles = makeStyles((theme) => ({
  tittle: {
    textAlign: "center",
  },
}));

const UserLists = ({
  handleModalAddUser,
  HandleCreateOrder,
  HandleOrderFromClient,
  columnsDataTable,
  rowsDataTable,
}) => {
  const classes = useStyles();

  return (
    <Box>
      <Typography variant="h6" className={classes.tittle}>
        LISTADO DE CLIENTES
      </Typography>
      <Grid spacing={2} container>
        <Grid xs={12} item>
          <Box px={1} display="inline">
            <Button
              onClick={handleModalAddUser}
              size="small"
              variant="contained"
              color="primary"
              endIcon={<AddCircleIcon />}
            >
              Agregar Cliente
            </Button>
          </Box>
          <Box px={1} display="inline">
            <Button
              onClick={HandleCreateOrder}
              size="small"
              variant="contained"
              color="primary"
              endIcon={<AddCircleIcon />}
            >
              Crear Orden
            </Button>
          </Box>
        </Grid>
        <Grid xs={12} item>
          <TableList
            columns={columnsDataTable}
            datas={rowsDataTable}
            renderButtons={(index) => (
              <Box display="flex" justifyContent="flex-end">
                <IconButton
                  onClick={() => HandleOrderFromClient(index)}
                  aria-label="delete"
                >
                  <GridOnOutlined />
                </IconButton>
              </Box>
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserLists;
