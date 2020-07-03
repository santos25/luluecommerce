import React from 'react';

import {

    makeStyles,
    Button,
    Typography,
    ListItem,
    Avatar,
    List,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Grid

} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
}));

const ProductList = ({ datas, handleCurrentPage, handleRemoveItems }) => {
    const classes = useStyles();


    return (
        <div>
            {
                datas.map((data, i) => {
                    return (
                        <Grid key={i} container direction="row">
                            <Grid item xs={12}  sm={6}>
                                <Typography component="h4"> TIENDA : {data.brand}</Typography>

                                <Typography component="h4"> GENERO : {data.genre}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Button
                                    onClick={() => handleCurrentPage({
                                        idcollection: data.id,
                                        brand: data.brand,
                                        genre: data.genre
                                    }, 'create')}
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                >
                                    Agregar Categoria
                                            </Button>
                            </Grid>
                            {
                                data.productos.map((product, index) => {
                                    return <div key={index}>

                                        <Typography component="h4"> CATEGORIA :  {product.category}</Typography>
                                        <Button
                                            onClick={() => handleCurrentPage({
                                                idcollection: data.id,
                                                brand: data.brand,
                                                genre: data.genre,
                                                productoid: product.id,
                                                category: product.category
                                            }, 'create')}
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                        >
                                            Agregar Items
                                            </Button>
                                        <List dense >
                                            {
                                                product.items.map((item, i) => {
                                                    // const labelId = `checkbox-list-secondary-label-${item.name}`;
                                                    return (
                                                        <ListItem key={i} button>
                                                            <ListItemAvatar>
                                                                <Avatar
                                                                    className={classes.large}
                                                                    alt={item.name}
                                                                    src={item.image}
                                                                />
                                                            </ListItemAvatar>
                                                            <ListItemText primary={item.name} secondary={item.price} />

                                                            <ListItemSecondaryAction>
                                                                <IconButton aria-label="delete" onClick={() => handleRemoveItems(
                                                                    {
                                                                        idcollection: data.id,
                                                                        productoid: product.id,
                                                                    }, product.items[i])}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                    );
                                                })
                                            }
                                        </List>
                                    </div>
                                })
                            }
                        </Grid>)
                })
            }
        </div>)
}

export default ProductList