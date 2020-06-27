import React, { useState, useEffect } from 'react';
// import InputField from '../FormInput/InputField';
import { Link as RouterLink } from 'react-router-dom';

// import Button from '../Button/Button';
import { signInWithGoogle  , auth} from '../../FireBase/FireBaseUtil';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
  Grid
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignInComponent = (props) => {
  const classes = useStyles();

  const [user, setUser] = useState({ email: '', password: '' });

  const handleInputs = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  }

  const handleSignIn = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(user.email, user.password)
    setUser({ username: '', password: '' })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {/* <Typography component="h1" variant="h5">
          Iniciar Sesion
        </Typography> */}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleInputs}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInputs}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignIn}
          >
            Iniciar Sesion
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={signInWithGoogle}
          >
            Iniciar Sesion con cuenta de Google
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                No tienes cuenta? Registrate!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>

    

  );
}


export default SignInComponent;