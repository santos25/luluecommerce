import React from 'react'

import {
    Grid,
    Box,
    Button,
    Typography,
    Container,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    TextField
} from '@material-ui/core';

const HandleRegisterPrenda = ({ tallavalues, quantity, prendasitems, setPrendasItems, savePrenda ,
                                setGenre, genre }) => {

    const handleInputs = (e) => {
        const { name, value } = e.target;

        if (name === 'itemsQuantity') {
            prendasitems = []
            for (let index = 0; index < value; index++) {
                prendasitems.push({ name: '', typetalla: '' })
            }
            setPrendasItems([...prendasitems]);
        }
    }

    const handleItems = (e, indexChange) => {
        const { name, value } = e.target;

        let objectChanged = { ...prendasitems[indexChange] };

        objectChanged[name] = value;
        prendasitems[indexChange] = objectChanged;
        setPrendasItems([...prendasitems])
    }


    return (
        <Box display="flex" flexDirection="column">
            <Container maxWidth="sm">
                <Grid container>
                    <Grid xs={12} item>
                        <Typography component="h4"> REGISTRO DE PRENDAS</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel id="select-genre">Seleccion Genero</InputLabel>
                            <Select
                                labelId="select-genre"
                                id="genre"
                                value={genre}
                                name="genre"
                                onChange={(e) => setGenre(e.target.value)}
                            >
                                <MenuItem value="mujer">Mujer</MenuItem>
                                <MenuItem value="hombre">Hombre</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography component="h3" variant="h5">
                            Cantidad
                            </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            onChange={handleInputs}
                            variant="outlined"
                            required
                            fullWidth
                            defaultValue={quantity}
                            id="itemsQuantity"
                            label="Cantidad"
                            name="itemsQuantity" />
                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth="lg">
                <Grid container>

                    {
                        prendasitems.map((item, index) => {
                            console.log(item.typetalla);
                            return (
                                <Box display="flex" key={index} m={2}>
                                    <Grid item xs={6} >
                                        <TextField
                                            onChange={(e) => handleItems(e, index)}
                                            // autoComplete="fname"
                                            name="name"
                                            variant="outlined"
                                            required
                                            // defaultValue={productEdit ? productEdit.category : null}
                                            fullWidth
                                            id={`name_${index}`}
                                            label="Nombre"
                                        // autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id={`select-type-talla_${index}`}> Talla</InputLabel>
                                            <Select fullWidth
                                                labelId={`select-type-talla_${index}`}
                                                id={`typetalla_${index}`}
                                                value={item.typetalla}
                                                name="typetalla"
                                                onChange={(e) => handleItems(e, index)}
                                            >
                                                {tallavalues.map((talla, i) => (
                                                    <MenuItem key={i} value={talla.id}>{talla.value}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Box>
                            )


                        })
                    }

                    <Grid xs={12} item>
                        <Button
                            onClick={() => savePrenda()}
                            // fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Guardar
                            </Button>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default HandleRegisterPrenda
