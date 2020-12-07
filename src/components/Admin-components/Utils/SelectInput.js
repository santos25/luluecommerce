import React from "react";

import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const SelectInput = () => {
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Genero</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={genre}
        onChange={handleGenre}
      >
        <MenuItem value="mujer">Mujer</MenuItem>
        <MenuItem value="hombre">Hombre</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectInput;
