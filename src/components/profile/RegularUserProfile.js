import React, { useState, useEffect } from "react";
import { Grid, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import Button from "../common/Button";
import { clearProfile } from "../slices/profileSlice";

const RegularUserProfile = () => {
  const user = useSelector((state) => state.profile.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editUser = () => {
    navigate(`../../edit/user`);
  };
  const handleRegister = () => {
    if (user.name.length < 1) {
      alert("Add a name to register as a pro");
    } else {
      navigate(`../../register/hustler`);
    }
  };
  const logout = () => {
    localStorage.clear();
    dispatch(clearProfile());
    navigate("../../");
  };
  return (
    <>
      <Grid container style={{ paddingTop: "10px", paddingBottom: "64px" }}>
        <Grid item xs={12}>
          <Grid container style={{ padding: "10px" }}>
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ width: 100, height: 100 }}>
                <PersonIcon />
              </Avatar>
              <span>{user.name || "New User"}</span>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span>{user.coins}</span>
                <span>coins</span>
              </div>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {" "}
                <span>{user?.saved?.length}</span>
                <span>saved</span>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ padding: "0px 10px" }}>
          <Button
            value={"EDIT PROFILE"}
            onClick={() => {
              editUser();
            }}
            variant="outlined"
            style={{
              width: "100%",
              padding: "5px 10px",
              color: "black",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px 10px",
          }}
        >
          {/* <CardActionArea style={{ padding: "5px 0px" }} onClick={() => {}}>
            <span style={{ fontSize: "15px" }}>History</span>
          </CardActionArea> */}
          <CardActionArea style={{ padding: "5px 0px" }} onClick={() => {}}>
            <span style={{ fontSize: "15px" }}>Earn Coins [watch ads]</span>
          </CardActionArea>
          <CardActionArea style={{ padding: "5px 0px" }} onClick={() => {}}>
            <span style={{ fontSize: "15px" }}>Refer a friend</span>
          </CardActionArea>
          <CardActionArea
            style={{ padding: "5px 0px" }}
            onClick={handleRegister}
          >
            <span style={{ fontSize: "15px" }}>Register as a professional</span>
          </CardActionArea>

          <CardActionArea style={{ padding: "5px 0px" }} onClick={() => {}}>
            <span style={{ fontSize: "15px" }}>Feedback</span>
          </CardActionArea>
        </Grid>
        <Grid item xs={12} style={{ padding: "10px 10px" }}>
          <Button
            value={"LOGOUT"}
            onClick={() => {
              logout();
            }}
            style={{
              width: "100%",
              padding: "5px 10px",
              background: "green",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default RegularUserProfile;
