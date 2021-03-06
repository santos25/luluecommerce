import React, { useState, useEffect } from "react";
// import { useHistory, useRouteMatch } from "react-router-dom";
// import { connect } from "react-redux";
import {
  uploadImages,
  uploadProductDB,
  firestore,
} from "../../../FireBase/FireBaseUtil";

//selectors
// import { isUploadinSelector } from "../../../Redux/Admin/Products/product.selectors";

//actions
// import {
//   uploadProductsStart,
//   uploadProductAsync,
// } from "../../../Redux/Admin/Products/product.actions";

import { CloudUpload } from "@material-ui/icons";
import SelectInput from "../Utils/SelectInput";

import {
  CircularProgress,
  makeStyles,
  useTheme,
  Container,
  Button,
  Typography,
  CssBaseline,
  Grid,
  TextField,
  Chip,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  input: {
    display: "none",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
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

const CreateProduct = ({}) => {
  const classes = useStyles();
  const theme = useTheme();

  const [product, setProduct] = useState({
    brand: "",
    category: "",
    genre: "",
    collection: "",
    itemsQuantity: 1,
  });
  let [items, setItems] = useState([
    { image: [], name: "", price: 0, detail: "", tallas: [] },
  ]);
  let [itemschips, setItemsChip] = useState([{ chips: [] }]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [tallas, setTallas] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // if (productEdit.category) {
    //     console.log("enter" , productEdit.category);
    //     const prendasRef = firestore.collection('genre').doc(productEdit.genre)
    //     prendasRef.get().then(doc => {
    //         const { prendas } = doc.data();
    //         const valuesPrendas = Object.keys(prendas).map(prenda =>
    //             ({ name: prendas[prenda].name.toLowerCase(), talla: prendas[prenda].talla })
    //         )
    //         // console.log(valuesPrendas);
    //         setCategories(valuesPrendas)
    //         const categoryObjectSelected = valuesPrendas.find(category => category.name === productEdit.category)
    //         setTallas(categoryObjectSelected.talla)
    //     })
    // } else
    //     fetchCategoriesByGenre(productEdit.genre)
  }, []);

  const handleInputs = (e) => {
    const { name, value } = e.target;

    if (name === "itemsQuantity") {
      items = [];
      itemschips = [];
      for (let index = 0; index < value; index++) {
        items.push({
          id: index,
          image: [],
          name: "",
          price: 0,
          detail: "",
          tallas: [],
        });
        itemschips.push({ chips: [] });
      }
      setItems([...items]);
      setItemsChip([...itemschips]);
    } else setProduct({ ...product, [name]: value });
  };

  const handleSelectGenre = (e) => {
    const { name, value } = e.target;
    // fetchCategoriesByGenre(value)
    const prendasRef = firestore.collection("genre").doc(value);
    prendasRef.get().then((doc) => {
      const { categorias } = doc.data();
      // const valuesPrendas = Object.keys(categorias).map((prenda) => ({
      //   name: prendas[prenda].name,
      //   talla: prendas[prenda].talla,
      // }));
      // const valuesPrendas = Object.keys(categorias);
      // console.log(valuesPrendas);

      setCategories(categorias);
    });
    setProduct({ ...product, [name]: value });
  };

  const handleSelectCategory = (e) => {
    const { name, value } = e.target;
    const collections = categories[value];
    // const categoryObjectSelected = categories.find(
    //   (category) => category.name.toLowerCase() === value
    // );
    console.log(collections);
    // setTallas(categoryObjectSelected.talla);
    setCollections(collections);
    setProduct({ ...product, [name]: value });
  };

  const handleItems = (e, indexChange) => {
    const { name, value } = e.target;

    let objectChanged = { ...items[indexChange] };
    let objectItemChip = { ...itemschips[indexChange] };

    if (name === "image") {
      console.log(e.target.files);
      if (e.target.files.length > 0) {
        for (let index = 0; index < e.target.files.length; index++) {
          objectChanged["image"].push(e.target.files[index]); //[...objectChanged.image , e.target.files[0]] ;
          objectItemChip["chips"].push(e.target.files[index].name);
        }
        items[indexChange] = objectChanged;
        itemschips[indexChange] = objectItemChip;
        setItems([...items]);
        setItemsChip([...itemschips]);
      }
    } else {
      objectChanged[name] = value;
      items[indexChange] = objectChanged;
      setItems([...items]);
    }
    console.log({ itemschips });
  };

  // think later if we can avoid reading the document to insert

  const handleRegister = async (e) => {
    e.preventDefault();
    // uploadStart();
    setIsUploading(true);
    console.log({ product });
    console.log({ items });
    const collectionRef = firestore
      .collection("collections")
      .where("genre", "==", product.genre);
    // .where("brand", "==", product.brand);

    collectionRef.get().then((snapshot) => {
      snapshot.docs.forEach(async (document) => {
        if (document.exists) {
          const docuRef = document.ref
            .collection("categories")
            .where("name", "==", product.collection);

          docuRef.get().then((snapshot) => {
            if (snapshot.empty) {
              console.log("NO EXISTE DOCUMENTO");
              const newDoc = document.ref.collection("categories").doc();
              // const uploadedItemsImages = await uploadImages(
              //   items,
              //   product.category,
              //   product.genre
              // );
              // console.log(uploadedItemsImages);
              // const result = await uploadProductDB(
              //   document,
              //   product,
              //   uploadedItemsImages
              // );
              // console.log(result);
              setIsUploading(false);
            } else {
              const refDocExist = snapshot.docs[0].ref;

              setIsUploading(false);
            }
          });

          // uploadSuccess();
          // handleClose();
        } else {
          setIsUploading(false);
          console.log("No Brand || No Genre");
        }
      });
    });
  };

  // const handleAddNewItems = async (e) => {
  //     e.preventDefault();
  //     if (productEdit.category) {
  //         addNewItems({ ...productEdit, items })
  //         handleCurrentPage("home")
  //     } else {
  //         // const uploadedItemsImages = await uploadImages(items);
  //         addNewCategory({ idcollection: productEdit.idcollection, category: product.category, items })
  //     }

  // }

  const handleDeleteChipsImages = (e, indexKey) => {
    console.log("deleting");
  };

  return (
    <div>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Registro de Productos
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id={`select-genre`}> Genero</InputLabel>
                  <Select
                    labelId={`select-genre`}
                    id={`genre`}
                    value={product.genre}
                    name="genre"
                    onChange={handleSelectGenre}
                  >
                    {/* <MenuItem value="hombre">Hombre</MenuItem> */}
                    <MenuItem value="mujer">Mujer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <SelectInput
                  label="category"
                  name="category"
                  value={product.category}
                  handleSelect={handleSelectCategory}
                  options={Object.keys(categories).map((item) => ({
                    value: item,
                    name: item,
                  }))}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <SelectInput
                  label="colleccion"
                  name="collection"
                  value={product.collection}
                  handleSelect={handleInputs}
                  options={collections.map((item) => ({
                    value: item.name,
                    name: item.name,
                  }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography component="h3" variant="h5">
                  Items
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  onChange={handleInputs}
                  variant="outlined"
                  required
                  fullWidth
                  defaultValue={product.itemsQuantity}
                  id="itemsQuantity"
                  label="Cantidad"
                  name="itemsQuantity"
                  // autoComplete="email"
                />
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Container component="main" maxWidth="lg">
        <div className={classes.paper}>
          {items.map((item, index) => {
            return (
              <Grid key={index} container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <TextField
                    onChange={(e) => handleItems(e, index)}
                    variant="outlined"
                    required
                    fullWidth
                    id={`name_${index}`}
                    label="Nombre"
                    name="name"
                    // autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    onChange={(e) => handleItems(e, index)}
                    variant="outlined"
                    required
                    fullWidth
                    id={`detail_${index}`}
                    label="Descripcion"
                    name="detail"
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Box>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id={`contained-button-file_${index}`}
                      onChange={(e) => handleItems(e, index)}
                      name="image"
                      type="file"
                      multiple
                    />
                    <label htmlFor={`contained-button-file_${index}`}>
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        startIcon={<CloudUpload />}
                        component="span"
                      >
                        Imagenes
                      </Button>
                    </label>
                    <Box display="flex" flexWrap="wrap">
                      {itemschips[index]["chips"].map((name, i) => (
                        <Chip
                          size="small"
                          key={i}
                          label={name}
                          onDelete={(e) => handleDeleteChipsImages(e, index)}
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id={`select-talla_${index}`}>Talla</InputLabel>
                    <Select
                      labelId={`select-talla_${index}`}
                      id={`tallas_${index}`}
                      name="tallas"
                      multiple
                      value={item.tallas}
                      onChange={(e) => handleItems(e, index)}
                      input={<Input id={`select-talla_${index}`} />}
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
                <Grid item xs={12} sm={2}>
                  <TextField
                    onChange={(e) => handleItems(e, index)}
                    variant="outlined"
                    required
                    fullWidth
                    id={`price_${index}`}
                    label="Precio"
                    name="price"
                  />
                </Grid>
              </Grid>
            );
          })}
          {isUploading ? (
            <div className={classes.root}>
              <CircularProgress />
            </div>
          ) : null}
          <Button
            onClick={handleRegister}
            // fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrar Productos
          </Button>
        </div>
      </Container>
    </div>
  );
};

// const mapDispatchToState = (dispatch) => ({
//   // addNewItems: (product) => dispatch(addNewItemsAsync(product)),
//   // addNewCategory: (product) => dispatch(addCategory(product)),
//   uploadStart: () => dispatch(uploadProductsStart()),
//   uploadSuccess: () => dispatch(uploadProductAsync()),
// });

// const mapStateToProps = (state) => ({
//   isUploading: isUploadinSelector(state),
// });

// export default connect(mapStateToProps, mapDispatchToState)(CreateProduct);
export default CreateProduct;
