import React, { useState, useEffect } from 'react';
import FirmInput from '../FormInput/InputField';
import { Link as RouterLink } from 'react-router-dom';

// import Button from '../Button/Button';
import { auth, createDocumentUserDb } from '../../FireBase/FireBaseUtil';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {
    makeStyles,
    Container,
    CssBaseline,
    Avatar,
    Typography,
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const SignUp = (props) => {

    const classes = useStyles();

    const [userRegister, setUserRegister] = useState({ displayName: '', email: '', password: '', repassword: '' })

    const handleInputs = (e) => {
        const { name, value } = e.target;

        setUserRegister({ ...userRegister, [name]: value });
    }

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (userRegister.password === userRegister.repassword) {
            const { email, password, displayName } = userRegister;
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            createDocumentUserDb(user, { displayName })
        } else {
            alert("Contraseñas no Coinciden");
        }
    }

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Registro
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={handleInputs}
                                autoComplete="fname"
                                name="displayName"
                                variant="outlined"
                                required
                                fullWidth
                                id="displayName"
                                label="Nombre"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleInputs}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
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
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleInputs}
                                variant="outlined"
                                required
                                fullWidth
                                name="repassword"
                                label="Re-Password"
                                type="password"
                                id="repassword"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
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
                        Registrar
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/signin" variant="body2">
                                Ya tienes una cuenta? Inicia sesion.
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>

    );
}


export default SignUp;