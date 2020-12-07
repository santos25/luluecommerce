import React from "react";
import Autosuggest from "react-autosuggest";

import Product from "./Product";

//algolia Search Engine
import algoliasearch from "algoliasearch/lite";
import {
  connectAutoComplete,
  InstantSearch,
  Configure,
} from "react-instantsearch-dom";
import { Box, InputBase, makeStyles } from "@material-ui/core";

const searchClient = algoliasearch(
  "GQ3274JAP6",
  "78af2c02f2bbc61265498ab13ea355f9"
);

const useStyles = makeStyles((theme) => ({
  // containerSearch: {
  //   position: "relative",
  // },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  containerSuggestions: {
    // position: "absolute",
    // maxHeight: "500px",
    // overflowY: "scroll",
  },
}));

const AutoComplete = connectAutoComplete(
  ({ hits, currentRefinement, refine }) => {
    const classes = useStyles();
    console.log(hits);
    return (
      <Autosuggest
        suggestions={hits}
        onSuggestionsFetchRequested={({ value }) => refine(value)}
        onSuggestionsClearRequested={() => refine("")}
        getSuggestionValue={(hit) => {
          console.log(hit.name);
        }}
        renderSuggestion={(hit) => {
          return <ProductItem hit={hit} />;
        }}
        inputProps={{
          placeholder: "Buscar Productos",
          value: currentRefinement,
          onChange: () => {},
        }}
        // renderSectionTitle={(section) => section.index}
        // getSectionSuggestions={(section) => section.hits}
      />
    );
  }
);

const ProductItem = ({ hit }) => {
  // const image = `https://ecommerce-images.algolia.com/img/produit/nano/${hit.objectID}-1.jpg%3Falgolia`;
  return (
    <Product
      name={hit.name}
      image={hit.images[0]}
      price={hit.price.current.text}
    />
  );
};

const AutoCompleteSearch = () => {
  const classes = useStyles();
  return (
    <InstantSearch indexName="dev_products" searchClient={searchClient}>
      {/* <SearchBox /> */}
      <Configure hitsPerPage={5} />
      {/* <div className={classes.containerSuggestions}> */}
      <AutoComplete />
      {/* </div> */}
      {/* <Hits hitComponent={Hit} /> */}
    </InstantSearch>
  );
};

// const CustomAutocomplete = connectAutoComplete(AutoComplete);

export default AutoCompleteSearch;
