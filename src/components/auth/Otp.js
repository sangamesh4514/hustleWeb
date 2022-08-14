import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import Button from "../common/Button";
import TextField from "../common/TextField";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogin, hustlerLogin, userRegister } from "../slices/authSlice";
import Loader from "../common/Loader";
import Alert from "../common/Alert";
import { addHustler, addNewUser, addUser } from "../slices/profileSlice";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [loader, setLoader] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: null,
    type: null,
  });
  const data = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleClose = () => {
    setAlertInfo((s) => ({ ...s, open: false }));
    setOtp("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    if (data.userId) {
      if (data.type === 0) {
        dispatch(userLogin({ userId: data.userId, otp }))
          .unwrap()
          .then((res) => {
            console.log(res);
            dispatch(addUser({ data: res.data }));
            navigate("/home");
          })
          .catch((err) => {
            setLoader(false);
            setAlertInfo({
              open: true,
              message: err.message,
              type: 2,
            });
          });
      } else if (data.type === 1) {
        dispatch(hustlerLogin({ userId: data.userId, otp }))
          .unwrap()
          .then((res) => {
            console.log(res);
            dispatch(addHustler({ data: res.data }));
            navigate("/home");
          })
          .catch((err) => {
            setLoader(false);
            setAlertInfo({
              open: true,
              message: err.message,
              type: 2,
            });
          });
      }
    } else {
      dispatch(userRegister({ phoneNumber: data.phoneNumber, otp }))
        .unwrap()
        .then((res) => {
          dispatch(addNewUser({ data: res.data }));
          navigate("/register/user");
        })
        .catch((err) => {
          setLoader(false);
          setAlertInfo({
            open: true,
            message: err.message,
            type: 2,
          });
        });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} style={{ padding: "20px 10px 10px 10px" }}>
            <TextField
              placeholder="OTP"
              value={otp}
              onChange={handleChange}
              inputProps={{
                style: {
                  padding: 8,
                },
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              style={{ width: "100%" }}
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
      <Loader open={loader} />
      <Alert
        open={alertInfo.open}
        message={alertInfo.message}
        type={alertInfo.type}
        handleClose={handleClose}
        position={["bottom", "left"]}
      />
    </>
  );
};

export default Otp;
