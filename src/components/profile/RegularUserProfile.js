import React from "react";
import { Grid, CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import Button from "../common/Button";

const RegularUserProfile = ({ user, setUser, handleRegister, editUser }) => {
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
              <span>{user.name}</span>
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
                <span>{50}</span>
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
                <span>{0}</span>
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
          <CardActionArea style={{ padding: "5px 0px" }} onClick={() => {}}>
            <span style={{ fontSize: "15px" }}>History</span>
          </CardActionArea>
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
              setUser((s) => ({ ...s, type: !s.type }));
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
