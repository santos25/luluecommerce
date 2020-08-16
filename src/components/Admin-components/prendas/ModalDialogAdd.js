import React, { useState } from 'react'

import { firestore } from '../../../FireBase/FireBaseUtil';
import {
    Grid,
    TextField,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    CircularProgress,
    makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    }
}));

const ModalDialogAdd = ({ open, handleClose }) => {
    const [newPrenda, setNewPrenda] = useState({ image: '', name: '', talla: [] })
    const [genre , setGenre] = useState('')
    const [isUploading, setIsUploading] = useState(false);

    const classes = useStyles()
    const handleInputs = (e) => {
        const { name, value } = e.target
        if (name === 'talla') {
            const values = value.split(',');
            console.log(values);
            setNewPrenda({ ...newPrenda, [name]: values })
        }else if( name === 'genre') {
            setGenre(value)
        } else {
            setNewPrenda({ ...newPrenda, [name]: value })
        }
    }

    const savePrenda = () => {
        console.log(newPrenda);
        setIsUploading(true);
        const genreRef = firestore.collection('genre').doc(genre);

        genreRef.set({
            prendas: {
                [newPrenda.name.toLowerCase()]: newPrenda
            }
        }, { merge: true }).then(() => setIsUploading(false))


    }


    return (
        <React.Fragment>
            <Dialog
                fullWidth={true}
                maxWidth="md"
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">Agregar Prenda</DialogTitle>
                <DialogContent>
                    <Grid container spacing={4}>
                        <Grid xs={12} sm={4} item>
                            <FormControl fullWidth>
                                <InputLabel id={`select-genre`}> Genero</InputLabel>
                                <Select
                                    labelId={`select-genre`}
                                    id={`genre`}
                                    name="genre"
                                    onChange={handleInputs}
                                >
                                    <MenuItem value="hombre">Hombre</MenuItem>
                                    <MenuItem value="mujer">Mujer</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid xs={12} sm={4} item>
                            <TextField
                                onChange={handleInputs}
                                // autoComplete="fname"
                                name="name"
                                variant="outlined"
                                required
                                id="name"
                                label="Nombre" />
                        </Grid>
                        <Grid xs={12} sm={4} item>
                            <FormControl fullWidth>
                                <InputLabel id={`select-talla`}> Tipo de Tallas</InputLabel>
                                <Select
                                    labelId={`select-talla`}
                                    id={`talla`}
                                    name="talla"
                                    onChange={handleInputs}
                                >
                                    <MenuItem value="32,34,36,38,40,41,42">Numerico</MenuItem>
                                    <MenuItem value="S,M,L,XL,XXL">Letras</MenuItem>
                                    <MenuItem value="talla unica">Talla Unica</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <TextField
                                onChange={handleInputs}
                                // autoComplete="fname"
                                name="image"
                                variant="outlined"
                                required
                                fullWidth
                                id="image"
                                label="URL de la imagen" />
                        </Grid>
                        {isUploading ? (
                            <div className={classes.root}>
                                <CircularProgress />
                            </div>
                        )
                            : null
                        }
                        <Grid xs={12} sm={6} item>
                            <Button
                                onClick={savePrenda}
                                variant="contained"
                                color="primary"
                            // className={classes.submit}
                            >
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="primary">
                        Cerrar
        </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default ModalDialogAdd
