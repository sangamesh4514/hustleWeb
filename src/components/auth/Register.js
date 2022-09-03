import { Grid } from "@mui/material";
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "../common/Alert";
import Button from "../common/Button";
import Loader from "../common/Loader";
import SelectField from "../common/SelectField";
import TextField from "../common/TextField";
import { editUser } from "../slices/profileSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const [loader, setLoader] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: null,
    type: null,
  });
  const [genderOptions, setGenderOptions] = useState({
    male: "Male",
    female: "Female",
  });
  const [data, setData] = useState({
    name: null,
    gender: "",
    dob: "1999-03-24",
    email: null,
  });

  const handleName = (e) => {
    setData((s) => {
      return { ...s, name: e.target.value };
    });
  };
  const handleGender = (e) => {
    console.log(e.target.value);
    setData((s) => {
      return { ...s, gender: e.target.value };
    });
  };
  const handleDate = (e) => {
    setData((s) => ({ ...s, dob: e.target.value }));
  };

  const handleEmail = (e) => {
    setData((s) => ({ ...s, email: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    if (data.email && !validateEmail(data.email)) {
      setLoader(false);

      setAlertInfo({
        open: true,
        message: "Please enter a valid email!",
        type: 1,
      });
      return;
    }

    dispatch(editUser({ userId, data }))
      .unwrap()
      .then((res) => {
        navigate(`/home`, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        setAlertInfo({
          open: true,
          message: "Server under maintainance!",
          type: 1,
        });
      });

    //navigate(`/home`, { replace: true });
  };
  const handleSkip = () => {
    navigate(`/home`, { replace: true });
  };
  const handleClose = () => {
    setAlertInfo((s) => ({ ...s, open: false }));
  };
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} style={{ padding: "10px 20px" }}>
            <Grid container>
              <Grid item xs={10}>
                <span style={{ fontSize: "18px" }}>Create your profile</span>
              </Grid>
              <Grid item xs={2}>
                <Button
                  onClick={handleSkip}
                  value="Skip"
                  style={{
                    width: "100%",
                    backgroundColor: "green",
                    padding: "0px",
                  }}
                ></Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} style={{ padding: "10px 20px" }}>
            <TextField
              value={data.name || ""}
              onChange={handleName}
              label="Name"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} style={{ padding: "10px 20px" }}>
            <TextField
              label="Date of Birth"
              type="date"
              style={{ width: "100%" }}
              value={data?.dob.split("T")[0] || ""}
              onChange={handleDate}
            />
          </Grid>
          <Grid item xs={12} style={{ padding: "10px 20px" }}>
            <SelectField
              label="Gender"
              options={genderOptions}
              value={data.gender}
              onChange={handleGender}
            />
          </Grid>
          <Grid item xs={12} style={{ padding: "10px 20px" }}>
            <TextField
              value={data.email || ""}
              onChange={handleEmail}
              label="Email"
              type="email"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} style={{ padding: "10px 20px" }}>
            <Button
              value="Save"
              onClick={handleSubmit}
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "green",
              }}
            />
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

export default Register;
