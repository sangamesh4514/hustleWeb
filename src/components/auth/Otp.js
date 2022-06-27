import { Grid } from "@mui/material";
import React, { useState } from "react";
import Button from "../common/Button";
import TextField from "../common/TextField";
import { useParams, useNavigate } from "react-router-dom";

const Otp = () => {
  const [otp, setOtp] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setOtp(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(otp);
    navigate("/register");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              value={otp}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                boxSizing: "border-box",
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ padding: "0px 10px" }}>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={!otp}
              style={{
                width: "100%",
                backgroundColor: "green",
              }}
              variant="contained"
              value={" Verify OTP"}
            ></Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Otp;
