import React from "react";
import { Paper, Grid, CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import Button from "../common/Button";
import Rating from "@mui/material/Rating";
import Switch from "../common/Switch";
import DetailsCard from "../common/DetailsCard";

const HustlerProfile = ({ user, setUser, editHustler }) => {
  return (
    <>
      <Grid container style={{ paddingTop: "10px", paddingBottom: "64px" }}>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          UserId
        </Grid>
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
              <Avatar sx={{ width: 80, height: 80 }}>
                <PersonIcon />
              </Avatar>
              <span>{user.name}</span>
            </Grid>
            <Grid
              item
              xs={8}
              style={{
                height: "100px",
                display: "flex",
                justifyContent: "space-evenly",
                padding: "0px 20px",
              }}
            >
              <Grid container>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ height: "27px", fontSize: "25px" }}>
                    Plumbling
                  </span>
                  <Switch />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "top",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>Skill</span>
                  <span style={{ fontSize: "20px", width: "50px" }}>
                    Status
                  </span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ padding: "0px 10px" }}>
          <Button
            value={"EDIT PROFILE"}
            onClick={() => {
              editHustler();
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
            justifyContent: "space-between",
            padding: "15px 10px",
            overflow: "auto",
          }}
        >
          {["S", "t", "o", "r", "y"].map((item) => {
            return (
              <Avatar key={item} sx={{ width: 60, height: 60 }}>
                {item}
              </Avatar>
            );
          })}
        </Grid>
        <Grid item xs={12}>
          <DetailsCard
            location={"Bangalore"}
            languages="English,Hindi,Kannada"
            sic="Not Verified"
            details={user.details}
          />
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            margin: "10px 10px",
            padding: "5px",
            border: "0.1px solid #d2d2d2",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Rating
            //value={user.rating}
            //readOnly
            defaultValue={9}
            max={10}
            precision={1}
            name="rating"
            sx={{ fontSize: "30px" }}
          />
          <span style={{ fontSize: "1.6em" }}>(2)</span>
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
            <span style={{ fontSize: "15px" }}>Saved Profiles</span>
          </CardActionArea>
          <CardActionArea style={{ padding: "5px 0px" }} onClick={() => {}}>
            <span style={{ fontSize: "15px" }}>50 Coins [Earn more]</span>
          </CardActionArea>
          <CardActionArea style={{ padding: "5px 0px" }} onClick={() => {}}>
            <span style={{ fontSize: "15px" }}>Refer a friend</span>
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

export default HustlerProfile;
