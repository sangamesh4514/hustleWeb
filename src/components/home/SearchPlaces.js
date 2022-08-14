import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Button, IconButton, Paper } from "@mui/material";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useSelector, useDispatch } from "react-redux";
import { addLocation, editUser, editHustler } from "../slices/profileSlice";
import Loader from "../common/Loader";

const libraries = ["places"];

const SearchPlaces = () => {
  const location = useSelector((state) => state.profile.location);
  const [loader, setLoader] = useState(false);
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const type = Number(localStorage.getItem("userType"));

  const handleSearch = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (description, place_id) => {
    setLoader(true);
    setValue(description, false);
    clearSuggestions();
    const results = await getGeocode({ address: description });
    const { lat, lng } = await getLatLng(results[0]);
    console.log(results, lat, lng);
    if (type === 0) {
      dispatch(
        editUser({
          userId,
          data: {
            location: {
              coordinates: [lat, lng],
              type: "Point",
              name: description,
            },
          },
        })
      )
        .unwrap()
        .then((res) => {
          navigate("/home");
        })
        .catch((err) => {
          setLoader(false);
          console.log(err);
        });
    } else if (type === 1) {
      dispatch(
        editHustler({
          userId,
          data: {
            location: {
              coordinates: [lat, lng],
              type: "Point",
              name: description,
            },
          },
        })
      )
        .unwrap()
        .then((res) => {
          navigate("/home");
        })
        .catch((err) => {
          setLoader(false);
          console.log(err);
        });
    }
  };

  const handleCurrentLocation = () => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (res) => {
          navigate("/location/map");
        },
        (err) => {
          console.log(err);
          alert(err.message);
        }
      );
    }
  };

  console.log(status, data);
  if (!ready) return <h1>loading</h1>;

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Grid
            container
            style={{
              display: "flex",
              alignItems: "center",
              borderBottom: "0.1px solid #d2d2d2",
            }}
          >
            <Grid item xs={1}>
              <ArrowBackIosIcon
                style={{
                  fontSize: "22px",
                  paddingLeft: "10px",
                  paddingTop: "5px",
                }}
                onClick={() => {
                  if (!location) {
                    alert("Choose a location!");
                  } else {
                    navigate("/home");
                  }
                }}
              />
            </Grid>
            <Grid item xs={10}>
              <input
                type="text"
                placeholder="Search..."
                value={value}
                disabled={!ready}
                onChange={handleSearch}
                style={{
                  border: "none",
                  outline: "none",
                  padding: "10px 0px",
                  fontSize: "16px",
                  width: "100%",
                }}
              />
            </Grid>
            <Grid item xs={1}>
              {value ? (
                <ClearOutlinedIcon
                  onClick={() => {
                    setValue("");
                    clearSuggestions();
                  }}
                />
              ) : (
                <h6></h6>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "5px solid #d2d2d2",
            //borderRadius: "5px",
            padding: "10px",
          }}
          onClick={handleCurrentLocation}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <MyLocationRoundedIcon
              style={{ color: "green", fontSize: "22px", paddingRight: "10px" }}
            />
            <span style={{ color: "green", paddingRight: "10px" }}>
              Use current location
            </span>
          </div>

          <ArrowForwardIosOutlinedIcon
            style={{ fontSize: "22px", paddingRight: "10px" }}
          />
        </Grid>

        {status === "OK" &&
          data.map(({ place_id, description, structured_formatting }) => (
            <Grid
              item
              xs={12}
              key={place_id}
              onClick={(e) => handleSelect(description, place_id)}
              style={{
                borderBottom: "0.1px solid #d2d2d2",
                //padding: "6px 0px",
              }}
            >
              <Grid container>
                <Grid
                  item
                  xs={1}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px 10px 10px 15px",
                  }}
                >
                  {" "}
                  <RoomOutlinedIcon />
                </Grid>
                <Grid
                  item
                  xs={11}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "10px 5px",
                  }}
                >
                  <span style={{ fontSize: "15px" }}>
                    {structured_formatting.main_text}
                  </span>
                  <span style={{ fontSize: "12px" }}>
                    {structured_formatting.secondary_text}
                  </span>
                </Grid>
              </Grid>
            </Grid>
          ))}
        {status === "ZERO_RESULTS" ? <h3>No Results Found</h3> : null}
      </Grid>
      <Loader open={loader} />
    </>
  );
};

export default SearchPlaces;
