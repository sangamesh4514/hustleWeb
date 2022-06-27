import { Card, Grid } from "@mui/material";
import React from "react";

const UserCard = ({ name, id, handleUser }) => {
  return (
    <Card
      onClick={() => handleUser(id)}
      sx={{ border: "0.1px solid #d2d2d2" }}
      elevation={1}
    >
      <Grid container style={{ padding: "20px" }}>
        <Grid item xs={12}>
          {name}
        </Grid>
      </Grid>
    </Card>
  );
};

export default UserCard;
