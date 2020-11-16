import React from "react";
//redux
import { connect } from "react-redux";
//selectos
import { savedListSelector } from "../../Redux/savedList/saved-selectors";
import { currentUserSelector } from "../../Redux/user/user-selectors";
//material
import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { Favorite as FavoriteIcon } from "@material-ui/icons";
//components
import CardImages from "../../components/CardImages/CardImages";
//router
import { Link as RouterLink } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#018849",
    color: theme.palette.common.white,
    // maxWidth: theme.spacing(35),
  },
  link: {
    textDecoration: "none",
  },
}));

const SavedList = ({ savedListProducts, currentUserSelector }) => {
  const classes = useStyles();

  console.log(savedListProducts);
  return (
    <Grid container>
      {currentUserSelector ? (
        <>
          <Grid component={Box} py={2} bgcolor="grey.300" xs={12} item>
            <Typography variant="h6" className={classes.title} align="center">
              Articulos Guardados
            </Typography>
          </Grid>
          {savedListProducts.length ? (
            savedListProducts.map((item, i) => (
              <Grid key={i} xs={6} sm={3} item>
                <CardImages
                  key={i}
                  item={item}
                  typeCollection={item.typeCollection}
                  genreid={item.tagid}
                  renderActions={false}
                  iconFav={false}
                  renderRemoveSaved={true}
                />
              </Grid>
            ))
          ) : (
            <Grid xs={12} item>
              <Box
                display="flex"
                // flexDirection="column"
                // alignContent="center"
                justifyContent="center"
                my={4}
              >
                <FavoriteIcon className={classes.root} fontSize="large" />
                <Typography
                  variant="body2"
                  className={classes.title}
                  align="center"
                >
                  No tienes ningún artículo guardado
                </Typography>
              </Box>
            </Grid>
          )}
        </>
      ) : (
        <>
          <Grid xs={12} item>
            <Box textAlign="center" py={2} my={4}>
              <Box mb={1}>
                <Typography align="center" variant="body1">
                  Accede para ver tus favoritos.
                </Typography>
              </Box>
              <RouterLink className={classes.link} to="/identity">
                <Button
                  variant="contained"
                  className={classes.button}
                  size="large"
                  // onClick={() => addToTheCart(product)}
                >
                  Acceder
                </Button>
              </RouterLink>
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  savedListProducts: savedListSelector(state),
  currentUserSelector: currentUserSelector(state),
});
export default connect(mapStateToProps)(SavedList);
