import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Grid, Button, IconButton, Paper, Drawer } from "@mui/material";
import TextField from "../common/TextField";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { skills } from "./data";
import SkillCard from "../common/SkillCard";

const Home = () => {
  const [search, setSearch] = useState("");
  const [drawerState, setDrawerState] = useState(false);
  const navigate = useNavigate();
  const location = useSelector((state) => state.profile.location);

  useEffect(() => {
    console.log(location);
    if (!location) {
      setDrawerState(true);
    }

    return () => {};
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = search;
    console.log(search);
    setSearch("");
    navigate(`users/${name}`);
  };

  const handleSkill = (name) => {
    setSearch("");
    navigate(`hustlers/${name}`);
  };

  const handleLocation = () => {
    navigate(`/location/search`);
  };

  return (
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
            <Grid
              item
              xs={10}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={handleLocation}
            >
              <LocationOnIcon style={{ fontSize: "35px" }} />
              <span
                style={{
                  width: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontSize: "12px",
                }}
              >
                {location?.name}
              </span>
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <NotificationsOutlinedIcon />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container style={{ paddingTop: "60px", paddingBottom: "64px" }}>
        <Grid item xs={12}>
          <Grid container style={{ padding: "10px" }}>
            {/* <Grid item xs={12}>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  placeholder="Search..."
                  value={search}
                  sx={{ m: 1 }}
                  onChange={handleSearch}
                  inputProps={{
                    style: {
                      padding: 5,
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleSubmit}
                          style={{ padding: "0px" }}
                        >
                          <SearchOutlinedIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
            </Grid> */}
            {skills.map((skill) => {
              return (
                <Grid item xs={6} key={skill.name} style={{ padding: "5px" }}>
                  <SkillCard
                    name={skill.name}
                    image={skill.img}
                    handleSkill={handleSkill}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      <Drawer
        anchor={"bottom"}
        open={drawerState}
        //onClose={() => setDrawerState(false)}
      >
        <Grid container style={{ padding: "20px" }} spacing={2}>
          <Grid item xs={12}>
            <span>Choose location to find professionals near you!</span>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleLocation}
              variant="contained"
              style={{ width: "100%", backgroundColor: "green" }}
            >
              Choose Location
            </Button>
          </Grid>
        </Grid>
      </Drawer>
    </Paper>
  );
};

export default Home;
