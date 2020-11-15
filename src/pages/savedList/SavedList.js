import React from "react";
//redux
import { connect } from "react-redux";
//selectos
import { savedListSelector } from "../../Redux/savedList/saved-selectors";
//material
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
//components
import CardImages from "../../components/CardImages/CardImages";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
  },
}));

const SavedList = ({ savedListProducts }) => {
  const classes = useStyles();

  console.log(savedListProducts);
  return (
    <Grid container>
      <Grid component={Box} py={2} bgcolor="grey.300" xs={12} item>
        <Typography variant="h6" className={classes.title} align="center">
          Articulos Guardados
        </Typography>
      </Grid>

      {savedListProducts.map((item, i) => (
        <Grid key={i} xs={6} sm={3} item>
          <CardImages
            key={i}
            item={item}
            typeCollection="saved"
            renderActions={false}
            iconFav={false}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  savedListProducts: savedListSelector(state),
});
export default connect(mapStateToProps)(SavedList);
