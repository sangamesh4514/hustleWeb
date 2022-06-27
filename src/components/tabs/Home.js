import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Grid, Button, IconButton, Paper } from "@mui/material";
import TextField from "../common/TextField";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import { skills } from "./data";
import SkillCard from "../common/SkillCard";

const Home = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = search;
    setSearch("");
    navigate(`users/${name}`);
  };

  const handleSkill = (name) => {
    setSearch("");
    navigate(`users/${name}`);
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
              xs={4}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  height: "100%",
                  width: "100%",
                  color: "black",
                }}
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
                  Bangalore
                </span>
              </Button>
            </Grid>
            <Grid
              item
              xs={8}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <form onSubmit={handleSubmit}>
                <TextField
                  placeholder="Search..."
                  value={search}
                  sx={{ m: 1, width: "25ch" }}
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
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container style={{ paddingTop: "60px", paddingBottom: "64px" }}>
        <Grid item xs={12}>
          <Grid container style={{ padding: "10px" }}>
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
    </Paper>
  );
};

export default Home;
