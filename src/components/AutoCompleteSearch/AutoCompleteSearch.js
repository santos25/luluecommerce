import React from "react";

//algolia Search Engine
import algoliasearch from "algoliasearch/lite";
import {
  connectAutoComplete,
  InstantSearch,
  SearchBox,
  Highlight,
  Hits,
} from "react-instantsearch-dom";
import { Box, InputBase, makeStyles } from "@material-ui/core";

const searchClient = algoliasearch(
  "GQ3274JAP6",
  "78af2c02f2bbc61265498ab13ea355f9"
);

const useStyles = makeStyles((theme) => ({
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
}));

const AutoComplete = ({ hits, currentRefinement, refine }) => (
  <Autosuggest
    suggestions={hits}
    multiSection={true}
    onSuggestionsFetchRequested={({ value }) => refine(value)}
    onSuggestionsClearRequested={() => refine("")}
    getSuggestionValue={(hit) => hit.name}
    renderSuggestion={(hit) =>
      hit.brand ? <Product hit={hit} /> : <CategoryOrBrand hit={hit} />
    }
    inputProps={{
      placeholder: "Search for a category, brand or product",
      value: currentRefinement,
      onChange: () => {},
    }}
    renderSectionTitle={(section) => section.index}
    getSectionSuggestions={(section) => section.hits}
  />
);

const AutoCompleteSearch = () => {
  return (
    <InstantSearch indexName="dev_products" searchClient={searchClient}>
      {/* <SearchBox /> */}
      <CustomAutocomplete />
      {/* <Hits hitComponent={Hit} /> */}
    </InstantSearch>
  );
};

const CustomAutocomplete = connectAutoComplete(AutoComplete);

export default AutoCompleteSearch;
