import React from "react";
import { Grid, Tooltip } from "@mui/material";
import "./styles.css";

const DetailsCard = ({ location, languages, sic, details }) => {
  return (
    <div
      style={{
        padding: "10px",
        margin: "10px 10px",
        border: "0.1px solid #d2d2d2",
        borderRadius: "4px",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          style={{
            textAlign: "center",
            fontWeight: "bolder",
          }}
          s
        >
          {" "}
          <span>About</span>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            padding: "5px 0px 10px 10px",
          }}
          s
        >
          {" "}
          <span style={{ whiteSpace: "pre-line" }}>{details}</span>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            borderTop: "0.1px solid #d2d2d2",
          }}
        ></Grid>
        <Grid
          item
          xs={12}
          style={{
            padding: "5px 0px 0px 10px",
          }}
        >
          <Grid container>
            <Grid item xs={4}>
              <span>Location - </span>
            </Grid>
            <Grid item xs={8}>
              <span>{location}</span>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            padding: "5px 0px 0px 10px",
          }}
        >
          <Grid container>
            <Grid item xs={4}>
              <span>Langauages - </span>
            </Grid>
            <Grid item xs={8}>
              <span>{languages}</span>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            padding: "5px 0px 0px 10px",
          }}
        >
          <Grid container>
            <Grid item xs={4}>
              <span>SIC -</span>
            </Grid>
            <Grid item xs={8}>
              <span>{sic}</span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default DetailsCard;
