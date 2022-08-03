import React, { useState, useEffect } from "react";
import { Grid, Button, Paper } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Rating from "@mui/material/Rating";

const Hustler = () => {
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setUser({
      name: "person1",
      image: "image1",
      profession: "plumber",
      age: 35,
      gender: "Male",
      description: "Good plumber",
    });
    return () => {};
  }, []);

  const handleBack = () => {
    navigate(-1);
  };
  const handleClose = () => {
    setLoader(false);
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
                {userId}
              </Grid>
              <Grid item xs={2}>
                <Button
                  style={{
                    height: "100%",
                    width: "100%",
                    color: "black",
                  }}
                >
                  <BookmarkBorderOutlinedIcon />
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid container style={{ paddingTop: "60px", paddingBottom: "64px" }}>
          <Grid item xs={12}>
            {user?.name}
          </Grid>
          <Grid item xs={12}>
            {user?.age}
          </Grid>
          <Grid item xs={12}>
            {user?.profession}
          </Grid>
          <Grid item xs={12}>
            {user?.image}
          </Grid>
          <Grid item xs={12}>
            {user?.gender}
          </Grid>
          <Grid item xs={12}>
            {user?.profession}
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

export default Hustler;
