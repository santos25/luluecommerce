import React, { useState, useEffect } from 'react';
import FirmInput from '../FormInput/FormInput';
import { Link as RouterLink } from 'react-router-dom';

// import Button from '../Button/Button';
import { signInWithGoogle } from '../../FireBase/FireBaseUtil';
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

  const [user, setUser] = useState({ username: '', password: '' });

  const handleInputs = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  }

  const handleSignIn = (e) => {
    e.preventDefault();

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

    // <div className="flex justify-center">
    //   <div className="w-full max-w-xs">
    //     <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    //       <div className="mb-4">
    //         <FirmInput onChange={handleInputs} label="Usuario" id="username" name='username' type="text" placeholder="Usuario" />
    //       </div>
    //       <div className="mb-6">
    //         <FirmInput label="Contraseña" onChange={handleInputs} id="password" name="password" type="password" placeholder="******************" />
    //         <p className="text-red-500 text-xs italic">Please choose a password.</p>
    //       </div>
    //       <div className="flex items-center justify-between">
    //         <Button type="submit" onClick={handleSignIn}>Iniciar Sesion</Button>

    //         <Button type="button" onClick={signInWithGoogle}>Google</Button>

    //       </div>
    //     </form>
    //   </div>
    // </div>

  );
}


export default SignInComponent;