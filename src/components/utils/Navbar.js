import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Grid, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const Navbar = () => {
  const [home, setHome] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let path = location.pathname;
    if (path === "/home") {
      setHome(true);
    } else if (path === "/home/me") {
      setHome(false);
    }
    return () => {};
  }, [location]);

  const handleHome = () => {
    navigate("../home", { replace: true });
  };
  const handleProfile = () => {
    navigate("me", { replace: true });
  };
  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        sx={{ top: "auto", bottom: 0 }}
        style={{ height: "64px", background: "white" }}
      >
        <Toolbar style={{ height: "100%", width: "100%", padding: "0px" }}>
          <Grid container>
            <Grid item xs={6}>
              <Button
                style={{ height: "100%", width: "100%", color: "black" }}
                onClick={handleHome}
              >
                {home ? (
                  <HomeIcon style={{ fontSize: "40px" }} />
                ) : (
                  <HomeOutlinedIcon style={{ fontSize: "40px" }} />
                )}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                style={{ height: "100%", width: "100%", color: "black" }}
                onClick={handleProfile}
              >
                {!home ? (
                  <PersonIcon style={{ fontSize: "40px" }} />
                ) : (
                  <PersonOutlineIcon style={{ fontSize: "40px" }} />
                )}
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Navbar;
