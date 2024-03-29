import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import UserCard from "../common/UserCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Grid, Button, Paper, Card, Slider, Drawer } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import axios from "axios";
import { getSkilledHustlers } from "../api/api";
import { styled, useTheme } from "@mui/material/styles";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import Instructions from "./Instructions";

const Hustlers = () => {
  const [loader, setLoader] = useState(false);
  const [sliderValue, setSliderValue] = useState(10);
  const [users, setUsers] = useState([]);
  const [openInstructions, setOpenInstructions] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const location = useSelector((state) => state.profile.location);
  const { skill } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    getHustlers(10);
    return () => {};
  }, []);

  const getHustlers = async (range = 10) => {
    try {
      setLoader(true);
      const res = await getSkilledHustlers(skill, { ...location, range });
      //console.log(location, res);
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].distance = getDistanceFromLatLonInKm(
          location.coordinates[0],
          location.coordinates[1],
          res.data[i].location.coordinates[0],
          res.data[i].location.coordinates[1]
        );
      }
      res.data.sort(
        (a, b) => b.ratingValue - a.ratingValue || a.distance - b.distance
      );
      setUsers(res.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d.toFixed(2);
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const handleBack = () => {
    navigate("/home");
  };
  //console.log(users);
  const sortByRating = () => {
    setUsers((s) => {
      s.sort(
        (a, b) => b.ratingValue - a.ratingValue || a.distance - b.distance
      );
      //console.log(s);
      return [...s];
    });
    handleClose();
  };
  const sortByDistance = () => {
    setUsers((s) => {
      s.sort(
        (a, b) => a.distance - b.distance || b.ratingValue - a.ratingValue
      );
      //console.log(s);
      return [...s];
    });
    handleClose();
  };
  const sortAlphabetically = () => {
    setUsers((s) => {
      s.sort((a, b) => a.userName.localeCompare(b.userName));
      //console.log(s);

      return [...s];
    });
    handleClose();
  };

  const handlefilter = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUser = (id) => {
    navigate(`../hustler/${id}`);
  };

  const handleSlider = async (value) => {
    console.log(value, sliderValue);

    await getHustlers(value);
  };

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
            <Grid container style={{ paddingRight: "10px" }}>
              <Grid item xs={2}>
                <Button
                  style={{
                    height: "100%",
                    width: "100%",
                    color: "black",
                  }}
                  onClick={handleBack}
                >
                  <ArrowBackIosIcon />
                </Button>
              </Grid>
              <Grid
                item
                xs={8}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textTransform: "capitalize",
                }}
              >
                <span>
                  {skill} ({users?.length})
                </span>
              </Grid>
              <Grid item xs={2}>
                <Button
                  style={{
                    height: "100%",
                    width: "100%",
                    color: "black",
                  }}
                  onClick={handlefilter}
                >
                  <FilterListIcon />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  // getContentAnchorEl={null}
                  // anchorOrigin={{
                  //   vertical: "bottom",
                  //   horizontal: "right",
                  // }}
                  // transformOrigin={{
                  //   vertical: "top",
                  //   horizontal: "left",
                  // }}
                >
                  <MenuItem onClick={sortByRating}>Rating(Default)</MenuItem>
                  <MenuItem onClick={sortByDistance}>Distance</MenuItem>
                  <MenuItem onClick={sortAlphabetically}>
                    Alphabetically
                  </MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <Grid container style={{ paddingTop: "60px", paddingBottom: "64px" }}>
          <Grid item xs={12} style={{ padding: "10px 10px 10px 10px" }}>
            <Card sx={{ border: "0.1px solid #d2d2d2" }} elevation={1}>
              <Grid container>
                <Grid
                  item
                  xs={10}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: "15px",
                  }}
                >
                  <Slider
                    aria-label="Distance"
                    value={sliderValue || 0}
                    defaultValue={0}
                    //getAriaValueText={sliderValue}
                    //valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={10}
                    max={50}
                    onChange={(e, value) => setSliderValue(value)}
                    onChangeCommitted={(e, value) => handleSlider(value)}
                    sx={{
                      color:
                        theme.palette.mode === "dark"
                          ? "#fff"
                          : "rgba(0,0,0,0.87)",
                      "& .MuiSlider-track": {
                        border: "none",
                      },
                      "& .MuiSlider-thumb": {
                        width: 20,
                        height: 20,
                        backgroundColor: "#fff",
                        "&:before": {
                          boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                        },
                        "&:hover, &.Mui-focusVisible, &.Mui-active": {
                          boxShadow: "none",
                        },
                      },
                    }}
                  />
                  <span style={{ paddingLeft: "15px" }}>({sliderValue}km)</span>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    style={{
                      width: "100%",
                      height: "100%",
                      color: "black",
                    }}
                    onClick={(e) => setOpenInstructions(true)}
                  >
                    <ListAltRoundedIcon />
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            {users?.length ? (
              users.map((user, index) => {
                return (
                  <div key={index} style={{ padding: " 10px" }}>
                    <UserCard user={user} handleUser={handleUser} />
                  </div>
                );
              })
            ) : loader ? (
              <></>
            ) : (
              <h1>No Users Found In this Location</h1>
            )}
          </Grid>
        </Grid>
      </Paper>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loader}
        //onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Drawer
        anchor={"bottom"}
        open={openInstructions}
        onClose={(e) => setOpenInstructions(false)}
      >
        <Instructions />
      </Drawer>
    </>
  );
};

export default Hustlers;
