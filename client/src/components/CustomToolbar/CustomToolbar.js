import React from "react";
import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";

import FlexBetween from "../FlexBetween/FlexBetween";
const CustomToolbar = ({
  searchInput,
  setSearchInput,
  setSearch,
  placeholder = "Search...",
}) => {
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%" minHeight="50px" flexWrap="wrap">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <TextField
          label={placeholder}
          variant="standard"
          sx={{ mb: "0.5rem", width: "15rem" }}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
