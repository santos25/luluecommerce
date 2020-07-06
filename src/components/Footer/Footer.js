import React from 'react';

import {Facebook, Instagram} from '@material-ui/icons';

import {
    Container,
    makeStyles,
    Grid,
    TextField,
    Typography,
    Box
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    footer: {
        marginTop: theme.spacing(5)
    }
}))
const Footer = () => {
    const classes = useStyles();
    return (
        <footer>
            <Container maxWidth="md" className={classes.footer}>
                <Typography component="h5">Suscribete a nuestro newsletter </Typography>
                <form >
                    <TextField id="outlined-basic" label="Introduce tu Email" variant="outlined" />
                </form>
                <Box m={2}>
                    <Typography component="h5">Cartagena | Colombia </Typography>
                </Box>
                <Box m={2} display="flex" justifyContent="center" alignItems="center">
                    <Facebook/>
                    <Instagram/>

                </Box >
                <Typography component="h6">2020 LULU todos los derechos reservados</Typography>
            </Container>
        </footer>
    );
}

export default Footer;