import React, { useState } from "react";
import { Grid } from "@mui/material";
import PhoneInput from "react-phone-number-input";
import { useParams, useNavigate } from "react-router-dom";

import "react-phone-number-input/style.css";
import Button from "../common/Button";

const Login = () => {
  const [number, setNumber] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNumber(e);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(number);
    navigate("/otp");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container style={{ position: "absolute", top: "40%" }}>
          <Grid item xs={12} style={{ padding: "10px" }}>
            <PhoneInput
              defaultCountry="IN"
              placeholder="Enter phone number"
              value={number}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item xs={12} style={{ padding: "0px 10px" }}>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={!number}
              style={{
                width: "100%",
                backgroundColor: "green",
              }}
              variant="contained"
              value="Send OTP"
            ></Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Login;
