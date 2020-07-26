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
    Grid,
    Box,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody

} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    table: {
        minWidth: 650,
    },
}));

const ProductList = ({ products, handleCurrentPage, handleRemoveItems }) => {
    const classes = useStyles();
    console.log(products);
    return (
        <div>
            <Box display="flex" justifyContent="center">
                <Typography component="h4"> Listado de Productos en Stock</Typography>
            </Box>

            <Grid container>
                <Grid xs={12} item>
                    <TableContainer >
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Imagen</TableCell>
                                    <TableCell align="right">Nombre</TableCell>
                                    <TableCell align="right">Precio</TableCell>
                                    <TableCell align="right">Fecha de Creación</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {rows.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right">{row.carbs}</TableCell>
                                    </TableRow>
                                ))} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            {/* {
                products.map((product, i) => {
                    return (
                        <Grid key={i} container>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center">
                                    <Box>
                                        <Typography component="h4"> TIENDA : {product.brand}</Typography>

                                        <Typography component="h4"> GENERO : {product.genre}</Typography>
                                    </Box>
                                    <Box >
                                        <Button
                                            onClick={() => handleCurrentPage({
                                                idcollection: product.id,
                                                brand: product.brand,
                                                genre: product.genre
                                            }, 'create')}
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                        >
                                            Agregar Categoria
                                            </Button>
                                    </Box>
                                </Box>
                            </Grid>
                            {
                                Object.keys(product.categories).map((category, index) => {

                                    return (
                                        <Box key={index} >
                                            <Box display="flex" >
                                                <Typography component="h4"> {`Categoria : ${category}`}</Typography>
                                                <Box ml={2}>
                                                    <Button
                                                        onClick={() => handleCurrentPage({
                                                            idcollection: product.id,
                                                            brand: product.brand,
                                                            genre: product.genre,
                                                            category
                                                        }, 'create')}
                                                        variant="outlined"
                                                        color="primary"
                                                        size="small"
                                                    >
                                                        Agregar Items
                                                </Button>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <List dense >
                                                    {
                                                        Object.keys(product.categories[category]).map((itemKey, i) => {

                                                            const item = product.categories[category][itemKey];
                                                            return (
                                                                <ListItem key={i} button>
                                                                    <ListItemAvatar>
                                                                        <Avatar
                                                                            className={classes.large}
                                                                            alt={item.name}
                                                                            src={item.image[0]}
                                                                        />
                                                                    </ListItemAvatar>
                                                                    <ListItemText primary={item.name} secondary={item.price} />

                                                                    <ListItemSecondaryAction>
                                                                        <IconButton aria-label="delete" onClick={() => handleRemoveItems(
                                                                            {
                                                                                idcollection: product.id,
                                                                            }, product.items[i])}>
                                                                            <DeleteIcon />
                                                                        </IconButton>
                                                                    </ListItemSecondaryAction>
                                                                </ListItem>
                                                            );
                                                        })
                                                    }
                                                </List>
                                            </Box>
                                        </Box>
                                    )
                                })
                            }
                        </Grid>
                    )
                })
            } */}
        </div>)
}

export default ProductList