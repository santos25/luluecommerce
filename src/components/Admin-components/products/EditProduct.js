import React, { useState, useEffect } from 'react'

import { firestore} from '../../../FireBase/FireBaseUtil'
import {
    Grid,
    Typography,
    TextField,
    Input,
    makeStyles,
    Chip,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    useTheme,
    Button,

} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({

    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


const EditProduct = ({ selectedItem }) => {
    const classes = useStyles()
    const { name, price, detail, createdt, tallas } = selectedItem;
    const theme = useTheme();
    const [item, setItem] = useState({ name: '', price: '', detail: '', tallas: [], image: [], createdt: '' })
    // const [item, setItem] = useState()

    // console.log(item);
    useEffect(() => {

        setItem({...item , tallas : tallas})
        // console.log(item);
    }, [])

    const handleItem = (e) => {

        const { name, value } = e.target;
        // console.log(name);
        // console.log(value);
        setItem({ ...item, [name]: value })
        console.log(item);
    }

    const handleSave = () => {
        console.log(selectedItem);
        const docRef = firestore.collection('collections').doc(selectedItem.id)

    }


    return (
        <Grid spacing={2} container>
            {/* <form noValidate> */}
            <Grid xs={12} md={2} item>
                <TextField id="name" label="Nombre" onChange={handleItem}
                    defaultValue={name} />
            </Grid>
            <Grid xs={12} md={4} item>
                <TextField id="detail" label="Detail" fullWidth onChange={handleItem}
                    defaultValue={detail} />
            </Grid>
            <Grid xs={12} md={2} item>
                <TextField id="price" label="price" onChange={handleItem}
                    defaultValue={price} />
            </Grid>
            <Grid xs={12} md={4} item>
                <FormControl className={classes.formControl}>
                    <InputLabel id={`select-talla`}>Tallas</InputLabel>
                    <Select
                        labelId={`select-talla`}
                        id={`tallas`}
                        name="tallas"
                        multiple
                        value={item.tallas}
                        onChange={(e) => handleItem(e)}
                        input={<Input id={`select-talla`} />}
                        renderValue={(selected) => (
                            <div className={classes.chips}>
                                {selected.map((value) => (
                                    <Chip size="small" key={value} label={value} className={classes.chip} />
                                ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                    >
                        {tallas.map((talla) => (
                            <MenuItem key={talla} value={talla} style={getStyles(talla, talla, theme)}>
                                {talla}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid xs={12}>
                <Button
                    onClick={handleSave}
                    // fullWidth
                    variant="contained"
                    color="primary"
                    size="small"
                // className={classes.submit}
                >
                    Guardar Cambios
                            </Button>
            </Grid>
            {/* </form> */}
        </Grid>
    )
}

export default EditProduct
