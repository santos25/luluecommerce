import React, { useState } from "react";
// import FirmInput from '../FormInput/InputField';
import { Link as RouterLink } from "react-router-dom";

// import Button from '../Button/Button';
import { auth, createDocumentUserDb } from "../../FireBase/FireBaseUtil";

import { signInWithGoogle } from "../../FireBase/FireBaseUtil";

import {
  makeStyles,
  Container,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Box,
  FormControl,
} from "@material-ui/core";

import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  bold: {
    fontWeight: "bold",
  },
}));

const SignUp = (props) => {
  const classes = useStyles();

  const [userRegister, setUserRegister] = useState({
    name: "",
    email: "",
    password: "",
    lastname: "",
  });

  const [errorFirebase, setErrorFirebase] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    lastname: "",
  });

  const validInput = (name, value) => {
    if (name === "email") {
      return value === ""
        ? { valid: false, message: "Email Requerido!" }
        : { valid: true, message: "" };
    }
    if (name === "name") {
      return value === ""
        ? { valid: false, message: "Nombre Requerido!" }
        : { valid: true, message: "" };
    }
    if (name === "password") {
      return value === ""
        ? { valid: false, message: "Contraseña Requerida!" }
        : { valid: true, message: "" };
    }

    return { valid: true, message: "" };
  };

  const validateForm = () => {
    let nameMsj,
      emailMsj,
      passwordMsj = "";

    if (!userRegister.name) {
      nameMsj = "Nombre Requerido";
    }
    if (!userRegister.email) {
      emailMsj = "Email Requerido";
    }
    if (!userRegister.password) {
      passwordMsj = "Contraseña Requerida";
    }

    if (nameMsj || emailMsj || passwordMsj) {
      setErrors({ name: nameMsj, email: emailMsj, password: passwordMsj });
      return false;
    }
    return true;
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;
    const statusInput = validInput(name, value);
    console.log(name, " ", value);
    if (statusInput.valid) {
      setUserRegister({ ...userRegister, [name]: value });
      setErrors({ ...errors, [name]: statusInput.message });
    } else {
      setUserRegister({ ...userRegister, [name]: "" });
      setErrors({ ...errors, [name]: statusInput.message });
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validateForm()) {
      console.log("register user", validateForm());
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          userRegister.email,
          userRegister.password
        );

        createDocumentUserDb(user, {
          name: userRegister.name,
          lastName: userRegister.lastname,
          // isAdmin: true,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setErrorFirebase("Debe tener minimo 6 caracteres la contraseña");
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Grid container>
        <Grid xs={12} component={Box} py={1} item>
          <Typography className={classes.bold} align="center" variant="body1">
            REGISTRATE CON...
          </Typography>
        </Grid>
        <Grid xs={12} item>
          <Button
            startIcon={<i className="fab fa-google"></i>}
            fullWidth
            variant="outlined"
            color="primary"
            onClick={signInWithGoogle}
          >
            Google
          </Button>
        </Grid>
        <Grid xs={12} component={Box} mt={1} item>
          <Typography variant="caption" gutterBottom>
            Iniciar sesión con tu perfil social es muy rápido. No tendrás que
            recordar más contraseñas, tu memoria no te fallará. No te preocupes,
            nunca compartiremos tus datos ni publicaremos nada en tu nombre
          </Typography>
        </Grid>

        <Grid xs={12} item>
          <Box mt={3}>
            <Typography className={classes.bold} align="center" variant="body1">
              REGÍSTRATE USANDO TU DIRECCIÓN DE EMAIL
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12} component={Box} item>
          <form className={classes.form}>
            <FormControl>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={handleInputs}
                    variant="outlined"
                    required
                    error={errors.email ? true : false}
                    helperText={errors.email ? errors.email : null}
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleInputs}
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    error={errors.name ? true : false}
                    helperText={errors.name ? errors.name : null}
                    required
                    fullWidth
                    id="name"
                    label="Nombre"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleInputs}
                    autoComplete="lastname"
                    name="lastname"
                    variant="outlined"
                    fullWidth
                    id="lastname"
                    label="Apellidos"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    onChange={handleInputs}
                    variant="outlined"
                    required
                    error={errors.password ? true : false}
                    helperText={errors.password ? errors.password : null}
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
            </FormControl>

            {errorFirebase && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {errorFirebase}
              </Alert>
            )}
            <Box mt={1}>{loading ? <CircularProgress /> : null}</Box>
            <Button
              onClick={handleSignIn}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Unete a Lulu
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUp;
