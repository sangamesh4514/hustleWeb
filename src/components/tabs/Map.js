import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";
import { Grid } from "@mui/material";

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries: ["places"],
  });
  if (!isLoaded) {
    return <h1>loading</h1>;
  }
  return (
    <>
      <Grid container style={{ height: "100vh" }}>
        <Grid item xs={12}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={{
              lat: 12.9820683,
              lng: 77.6759833,
            }}
            zoom={20}
            //onLoad={onLoad}
            //onUnmount={onUnmount}
          >
            {/* Child components, such as markers, info windows, etc. */}
          </GoogleMap>
        </Grid>
      </Grid>
    </>
  );
};

export default Map;
