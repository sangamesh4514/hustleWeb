import { Card, Grid } from "@mui/material";
import React from "react";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";

const UserCard = ({ user, handleUser }) => {
  return (
    <Card
      onClick={() => handleUser(user.userId)}
      sx={{ border: "0.1px solid #d2d2d2" }}
      elevation={1}
    >
      <Grid container style={{ padding: "10px" }}>
        <Grid item xs={2}>
          {user.image ? (
            <></>
          ) : (
            <Avatar style={{ textTransform: "capitalize" }}>
              {user.name[0]}
            </Avatar>
          )}
        </Grid>
        <Grid item xs={7}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                paddingBottom: "5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "18px", paddingRight: "5px" }}>
                {user.userName}
              </span>
              {user.SIC ? (
                <VerifiedUserRoundedIcon
                  style={{ fontSize: "18px", color: "green" }}
                />
              ) : (
                <span
                  style={{
                    fontSize: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#d2d2d2",
                    padding: "2px 5px",
                  }}
                >
                  Not Verified
                </span>
              )}
            </div>
            <div
              style={{
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ paddingRight: "5px" }}>
                Speaks - {user.languages[0]}
                {user.languages.length > 1 ? (
                  <>(+{user.languages.length - 1})</>
                ) : (
                  <></>
                )}
                ,
              </span>
              <span>{user.distance}Km</span>
            </div>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div style={{ padding: "0px 10px" }}>
            <div
              style={{
                borderBottom: "0.1px solid #d2d2d2",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "22px" }}>
                {user.ratingValue.toFixed(1)}
              </span>
              <Rating
                value={1}
                readOnly
                max={1}
                sx={{ fontSize: "18px", color: "green" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "3px",
              }}
            >
              <span style={{ fontSize: "10px" }}>
                {user.ratingsCount} Reviews
              </span>
            </div>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default UserCard;
