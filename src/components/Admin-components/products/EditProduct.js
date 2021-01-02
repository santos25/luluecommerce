import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
//firebase
import {
  firestore,
  updateItem,
  uploadImages,
} from "../../../FireBase/FireBaseUtil";

//actions
// import {
//   uploadProductsStart,
//   uploadProductAsync,
// } from "../../../Redux/Admin/Products/product.actions";

// import { isUploadinSelector } from "../../../Redux/Admin/Products/product.selectors";

import {
  CircularProgress,
  Grid,
  //   Typography,
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
  Box,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
} from "@material-ui/core";

import {
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  circleprogress: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },

  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  gridList: {
    width: 500,
    height: "auto",
  },
  input: {
    display: "none",
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

const EditProduct = ({
  selectedItem,
  handleClose,
  isUploading,
  updateStart,
  updateSuccess,
}) => {
  const classes = useStyles();
  const { name, price, detail, createdt, tallas, image } = selectedItem;
  const theme = useTheme();
  const [item, setItem] = useState({
    name: "",
    price: "",
    detail: "",
    tallas: [],
    image: [],
    createdt: "",
  });
  let [imagesChips, setimagesChips] = useState([]);
  const addedImages = useRef([]);

  useEffect(() => {
    setItem({ ...selectedItem });
  }, [selectedItem]);

  const handleItem = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    if (name === "image") {
      // console.log(e.target.files);
      if (e.target.files.length > 0) {
        for (let index = 0; index < e.target.files.length; index++) {
          addedImages.current.push(e.target.files[index]);
          // console.log(addedImages);
          imagesChips.push(e.target.files[index].name);
        }
        setimagesChips([...imagesChips]);
      }
    } else {
      setItem({ ...item, [name]: value });
    }

    // console.log(item);
  };

  const handleDeleteImages = (e, index) => {
    console.log(item);
    console.log(index);
    item.image.splice(index, 1);
    setItem({ ...item });
  };
  const handleSave = async () => {
    updateStart();
    const docRef = firestore.collection("collections").doc(selectedItem.id);
    console.log(addedImages);
    try {
      const uploadedImages = await uploadImages(
        [{ image: addedImages.current }],
        item.category
      );
      image.push(...uploadedImages[0].image);
      console.log({ image });
      updateItem(docRef, item.category, item.itemkey, {
        name,
        detail,
        image,
        price,
        tallas,
        createdt,
      });
      updateSuccess();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  console.log({ isUploading });
  return (
    <Grid spacing={2} container>
      {/* <form noValidate> */}
      <Grid xs={12} sm={2} item>
        <TextField
          id="name"
          name="name"
          label="Nombre"
          onChange={handleItem}
          defaultValue={name}
        />
      </Grid>
      <Grid xs={12} sm={4} item>
        <TextField
          id="detail"
          name="detail"
          label="Detail"
          fullWidth
          onChange={handleItem}
          defaultValue={detail}
        />
      </Grid>
      <Grid xs={12} sm={2} item>
        <TextField
          id="price"
          name="price"
          label="price"
          onChange={handleItem}
          defaultValue={price}
        />
      </Grid>
      <Grid xs={12} sm={4} item>
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
                  <Chip
                    size="small"
                    key={value}
                    label={value}
                    className={classes.chip}
                  />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {tallas.map((talla) => (
              <MenuItem
                key={talla}
                value={talla}
                style={getStyles(talla, talla, theme)}
              >
                {talla}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid xs={12} item>
        <Box className={classes.root}>
          <GridList cellHeight={160} className={classes.gridList} cols={2}>
            {item.image.map((image, index) => (
              <GridListTile key={index} cols={1}>
                <img src={image} alt="" />

                <GridListTileBar
                  title=""
                  subtitle=""
                  actionIcon={
                    <IconButton
                      onClick={(e) => handleDeleteImages(e, index)}
                      aria-label={`delete image`}
                      className={classes.icon}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </Box>
      </Grid>
      <Grid xs={12} item>
        <Box>
          <input
            accept="image/*"
            className={classes.input}
            id={`contained-button-file`}
            onChange={(e) => handleItem(e)}
            name="image"
            type="file"
            multiple
          />
          <label htmlFor={`contained-button-file`}>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              startIcon={<CloudUploadIcon />}
              component="span"
            >
              Imagen
            </Button>
          </label>
          <Box display="flex" flexWrap="wrap">
            {imagesChips.map((name, i) => (
              <Chip
                size="small"
                key={i}
                label={name}
                // onDelete={(e) => handleDeleteChipsImages(e, index)}
              />
            ))}
          </Box>
        </Box>
      </Grid>
      {isUploading ? (
        <div className={classes.circleprogress}>
          <CircularProgress />
        </div>
      ) : null}

      <Grid xs={12} item>
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
  );
};

// const mapStateToProps = (state) => ({
//   isUploading: isUploadinSelector(state),
// });

// const mapDispatchToState = (dispatch) => ({
//   updateStart: () => dispatch(uploadProductsStart()),
//   updateSuccess: () => dispatch(uploadProductAsync()),
// });

// export default connect(mapStateToProps, mapDispatchToState)(EditProduct);
export default EditProduct;
