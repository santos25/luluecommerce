import React, { useState } from "react";
// import InputField from '../FormInput/InputField';
import { Link as RouterLink } from "react-router-dom";

// import Button from '../Button/Button';
import { signInWithGoogle, auth } from "../../FireBase/FireBaseUtil";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  makeStyles,
  Container,
  CssBaseline,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  Grid,
  Box,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  bold: {
    fontWeight: "bold",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignInComponent = (props) => {
  const classes = useStyles();

  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validInput = (name, value) => {
    if (name === "email") {
      return value === ""
        ? { valid: false, message: "Email Requerido!" }
        : { valid: true, message: "" };
    }

    if (name === "password") {
      return value === ""
        ? { valid: false, message: "Contraseña Requerida!" }
        : { valid: true, message: "" };
    }

    return true;
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;

    const statusInput = validInput(name, value);

    if (statusInput.valid) {
      setUser({ ...user, [name]: value });
      setErrors({ ...errors, [name]: statusInput.message });
    } else {
      setUser({ ...user, [name]: "" });
      setErrors({ ...errors, [name]: statusInput.message });
    }
  };

  const validateForm = () => {
    let emailMsj,
      passwordMsj = "";

    if (!user.email) {
      emailMsj = "Email Requerido";
    }
    if (!user.password) {
      passwordMsj = "Contraseña Requerida";
    }

    if (emailMsj || passwordMsj) {
      setErrors({ email: emailMsj, password: passwordMsj });
      return false;
    }
    return true;
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("register user", validateForm());
    }
    // auth.signInWithEmailAndPassword(user.email, user.password);
    // setUser({ username: "", password: "" });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Grid container>
        <Grid xs={12} component={Box} py={1} item>
          <Typography className={classes.bold} align="center" variant="body1">
            ACCEDE CON TU EMAIL
          </Typography>
        </Grid>
        <Grid xs={12} component={Box} item>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleInputs}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  error={errors.email ? true : false}
                  helperText={errors.email ? errors.email : null}
                  label="Dirección de Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleInputs}
                  variant="outlined"
                  required
                  fullWidth
                  error={errors.password ? true : false}
                  helperText={errors.password ? errors.password : null}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleSignIn}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Acceder
            </Button>
          </form>
        </Grid>
        <Grid xs={12} item>
          <Box my={3}>
            <Typography className={classes.bold} align="center" variant="h6">
              O
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12} item>
          <Box>
            <Typography className={classes.bold} align="center" variant="body1">
              ACCEDE CON...
            </Typography>
          </Box>
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
      </Grid>
    </Container>
  );
};

export default SignInComponent;
