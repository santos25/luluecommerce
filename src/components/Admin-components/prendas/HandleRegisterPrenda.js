import React from "react";

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
  TextField,
} from "@material-ui/core";

import SelectInput from "../Utils/SelectInput";

const HandleRegisterPrenda = ({
  tallavalues,
  quantity,
  prendasitems,
  setPrendasItems,
  savePrenda,
  categorias,
  category,
  handleCategory,
}) => {
  console.log(categorias);

  const handleInputs = (e) => {
    const { name, value } = e.target;

    if (name === "itemsQuantity") {
      prendasitems = [];
      for (let index = 0; index < value; index++) {
        prendasitems.push({ name: "", typetalla: "" });
      }
      setPrendasItems([...prendasitems]);
    }
  };

  const handleItems = (e, indexChange) => {
    const { name, value } = e.target;

    let objectChanged = { ...prendasitems[indexChange] };

    objectChanged[name] = value;
    prendasitems[indexChange] = objectChanged;
    setPrendasItems([...prendasitems]);
  };

  return (
    <Container maxWidth="sm">
      <Grid container>
        <Grid xs={12} item>
          <Typography component="h4"> REGISTRO DE PRENDAS</Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <SelectInput
            label="category"
            name="category"
            value={category}
            handleSelect={handleCategory}
            options={Object.keys(categorias).map((item) => ({
              value: item,
              name: item,
            }))}
          />
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
            name="itemsQuantity"
          />
        </Grid>
      </Grid>

      {prendasitems.map((item, index) => {
        console.log(item.typetalla);
        return (
          //   <Box display="flex" key={index} m={2}>
          <Grid key={index} spacing={3} container>
            <Grid item xs={4}>
              <TextField
                onChange={(e) => handleItems(e, index)}
                // autoComplete="fname"
                name="name"
                variant="outlined"
                required
                // defaultValue={productEdit ? productEdit.category : null}

                id={`name_${index}`}
                label="Nombre"
                // autoFocus
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl>
                <InputLabel id={`select-type-talla_${index}`}>Talla</InputLabel>
                <Select
                  labelId={`select-type-talla_${index}`}
                  id={`typetalla_${index}`}
                  value={item.typetalla}
                  name="typetalla"
                  onChange={(e) => handleItems(e, index)}
                >
                  {tallavalues.map((talla, i) => (
                    <MenuItem key={i} value={talla.id}>
                      {talla.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={(e) => handleItems(e, index)}
                // autoComplete="fname"
                name="image"
                variant="outlined"
                required
                id={`image_${index}`}
                label="Imagen URL"
              />
            </Grid>
          </Grid>
        );
      })}

      <Grid xs={12} item>
        <Box m={3}>
          <Button
            onClick={() => savePrenda()}
            // fullWidth
            variant="contained"
            color="primary"
          >
            Guardar
          </Button>
        </Box>
      </Grid>
    </Container>
  );
};

export default HandleRegisterPrenda;
