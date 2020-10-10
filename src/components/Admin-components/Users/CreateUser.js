import React, { useState } from "react";

import {
  Box,
  Grid,
  TextField,
  CircularProgress,
  makeStyles,
  Button,
} from "@material-ui/core";

import { firestore } from "../../../FireBase/FireBaseUtil";

const useStyle = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "40%",
    },
  },
  loading: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));
const CreateUser = ({ closeModal, fetchUsers }) => {
  const classes = useStyle();
  const [user, setUser] = useState({
    name: "",
    cedula: "",
    lastName: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const saveUser = async () => {
    if (user.cedula !== "") {
      setLoading(true);
      const collecRef = firestore.collection("clients");
      const newDocUser = collecRef.doc(user.cedula);
      await newDocUser.set(user);
      setLoading(false);
      closeModal();
      fetchUsers();
    } else {
      alert("cedula requerida");
    }
  };

  return (
    <Box>
      <Grid container>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            onChange={(e) => handleChange(e)}
            id="cedula"
            name="cedula"
            label="Cedula"
            variant="outlined"
            required={true}
          />
          <TextField
            onChange={(e) => handleChange(e)}
            id="name"
            name="name"
            label="Nombres"
            variant="outlined"
          />
          <TextField
            onChange={(e) => handleChange(e)}
            id="lastName"
            name="lastName"
            label="Apellidos"
            variant="outlined"
          />
          <TextField
            onChange={(e) => handleChange(e)}
            id="phone"
            name="phone"
            label="Telefono"
            variant="outlined"
          />
        </form>
        {loading ? (
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        ) : null}
        <Button onClick={saveUser} variant="contained" color="primary">
          Guardar
        </Button>
      </Grid>
    </Box>
  );
};

export default CreateUser;
