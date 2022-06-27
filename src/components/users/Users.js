import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import UserCard from "../common/UserCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Grid, Button, Paper } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

const Users = () => {
  const [loader, setLoader] = useState(true);
  const [users, setUsers] = useState([]);
  const { skill } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setUsers([
      { name: skill, id: 1 },
      { name: "second user", id: 2 },
      { name: "third user", id: 3 },
    ]);

    return () => {};
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleClose = () => {
    setLoader(false);
  };

  const handleUser = (id) => {
    navigate(`../user/${id}`);
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
            <Grid container>
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
                }}
              >
                {skill}
              </Grid>
              <Grid item xs={2}>
                <Button
                  style={{
                    height: "100%",
                    width: "100%",
                    color: "black",
                  }}
                >
                  <FilterListIcon />
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid container style={{ paddingTop: "60px", paddingBottom: "64px" }}>
          <Grid item xs={12}>
            {users.length ? (
              users.map((user, index) => {
                return (
                  <div key={index} style={{ padding: " 10px" }}>
                    <UserCard
                      name={user.name}
                      id={user.id}
                      handleUser={handleUser}
                    />
                  </div>
                );
              })
            ) : (
              <h1>No Users Found</h1>
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
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Users;
