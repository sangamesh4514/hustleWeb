import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Grid, Button, IconButton, Paper } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "../common/TextField";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";

const SearchPlaces = () => {
  const [search, setSearch] = useState("");
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries: ["places"],
  });
  const navigate = useNavigate();

  useEffect(() => {
    getLocation();
    return () => {};
  }, []);
  const getLocation = () => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(console.log, console.log);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCurrentLocation = () => {
    navigate("/location/map");
  };

  if (!isLoaded) {
    return <h1>"Loading"</h1>;
  }
  return (
    <>
      <Paper style={{ height: "100vh" }}>
        <AppBar
          position="fixed"
          color="transparent"
          style={{
            height: "56px",
            background: "white",
            borderBottom: "0.1px solid #d2d2d2",
          }}
          elevation={1}
        >
          <Toolbar style={{ height: "100%", width: "100%", padding: "0px" }}>
            <Grid container>
              <Grid item xs={1} style={{ paddingLeft: "15px" }}>
                <ArrowBackIosIcon />
              </Grid>
              <Grid item xs={9} style={{ padding: "0px " }}>
                <Autocomplete>
                  <TextField
                    placeholder="Search..."
                    value={search}
                    variant="standard"
                    fullWidth
                    onChange={handleSearch}
                  />
                </Autocomplete>
              </Grid>
              <Grid item xs={1}>
                <MyLocationOutlinedIcon onClick={handleCurrentLocation} />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Paper>
      <Grid container>
        <Grid item xs={12}>
          <Autocomplete>
            <TextField
              placeholder="Search..."
              value={search}
              variant="standard"
              fullWidth
              onChange={handleSearch}
            />
          </Autocomplete>
        </Grid>
      </Grid>
    </>
  );
};

export default SearchPlaces;
