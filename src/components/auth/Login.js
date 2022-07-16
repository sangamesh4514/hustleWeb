import React, { useState } from "react";
import { Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "../common/Button";
import { getOtp } from "../slices/authSlice";
import Loader from "../common/Loader";
import Alert from "../common/Alert";
import TextField from "../common/TextField";

const Login = () => {
  const [loader, setLoader] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: null,
    type: null,
  });
  const [number, setNumber] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {
    setAlertInfo((s) => ({ ...s, open: false }));
    setNumber("");
  };
  const handleChange = (e) => {
    setNumber(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    dispatch(getOtp(number), navigate)
      .unwrap()
      .then((res) => {
        navigate("/otp");
      })
      .catch((err) => {
        setLoader(false);
        setAlertInfo({
          open: true,
          message: "Server under maintainance!",
          type: 1,
        });
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container style={{ position: "absolute", bottom: "40px" }}>
          <Grid
            item
            xs={12}
            style={{ padding: "10px 10px 10px 10px", display: "flex" }}
          >
            <TextField
              inputProps={{
                style: {
                  padding: 8,
                  maxWidth: "40px",
                },
              }}
              defaultValue={"+91"}
              disabled
              style={{ paddingRight: "5px" }}
            />
            <TextField
              placeholder="Phone Number"
              style={{ width: "100%" }}
              inputProps={{
                style: {
                  padding: 8,
                },
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
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
      <Loader open={loader} />
      <Alert
        open={alertInfo.open}
        message={alertInfo.message}
        type={alertInfo.type}
        handleClose={handleClose}
      />
    </>
  );
};

export default Login;
