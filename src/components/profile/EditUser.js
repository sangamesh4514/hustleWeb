import { Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "../common/TextField";
import SelectField from "../common/SelectField";
import Button from "../common/Button";
import { editUser, getUser } from "../slices/profileSlice";
import Loader from "./../common/Loader";
import Alert from "../common/Alert";

const EditUser = () => {
  const [user, setUser] = useState(useSelector((state) => state.profile.user));
  const [loader, setLoader] = useState(true);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: null,
    type: null,
  });
  const [genderOptions, setGenderOptions] = useState({
    male: "Male",
    female: "Female",
  });
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user && userId) {
      dispatch(getUser(userId))
        .unwrap()
        .then((res) => {
          setUser({ ...res.data });
          setLoader(false);
        })
        .catch((err) => {
          setLoader(false);
          setAlertInfo({
            open: true,
            message: "Server under maintainance!",
            type: 1,
          });
        });
    } else {
      setLoader(false);
    }

    return () => {};
  }, []);

  const handleName = (e) => {
    setUser((s) => ({ ...s, name: e.target.value }));
  };
  const handleDate = (e) => {
    setUser((s) => ({ ...s, dob: e.target.value }));
  };
  const handleGender = (e) => {
    setUser((s) => ({ ...s, gender: e.target.value }));
  };
  const handleClose = () => {
    setAlertInfo((s) => ({ ...s, open: false }));
  };
  const handleEmail = (e) => {
    setUser((s) => ({ ...s, email: e.target.value }));
  };
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(user);
    if (!user.name) {
      setAlertInfo({
        open: true,
        message: "Name is missing!",
        type: 2,
      });
    } else {
      setLoader(true);
      if (user.email && !validateEmail(user.email)) {
        setLoader(false);

        setAlertInfo({
          open: true,
          message: "Please enter a valid email!",
          type: 1,
        });
        return;
      }
      dispatch(editUser({ userId, data: user }))
        .unwrap()
        .then((res) => {
          navigate(`/home/me`);
        })
        .catch((err) => {
          setLoader(false);
          setAlertInfo({
            open: true,
            message: "Server under maintainance!",
            type: 1,
          });
        });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <span style={{ fontSize: "25px" }}>Edit Profile</span>
          </Grid>
          <Grid item xs={12} style={{ padding: "10px 20px" }}>
            <TextField
              label="Name"
              style={{ width: "100%" }}
              value={user?.name || ""}
              onChange={handleName}
            />
          </Grid>
          <Grid item xs={12} style={{ padding: "10px 20px" }}>
            <TextField
              label="Date of Birth"
              type="date"
              style={{ width: "100%" }}
              value={user?.dob.split("T")[0] || ""}
              onChange={handleDate}
            />
          </Grid>
          <Grid item xs={12} style={{ padding: "10px 20px" }}>
            <SelectField
              label="Gender"
              options={genderOptions}
              value={user?.gender || ""}
              onChange={handleGender}
            />
          </Grid>

          <Grid item xs={12} style={{ padding: "10px 20px" }}>
            <TextField
              value={user?.email || ""}
              onChange={handleEmail}
              label="Email"
              type="email"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} style={{ padding: "10px 20px" }}>
            <TextField
              label="Phone Number"
              style={{ width: "100%" }}
              value={user?.phoneNumber || ""}
              disabled={true}
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
          <Grid item xs={12} style={{ padding: "10px 20px" }}>
            <Button
              value="Cancel"
              onClick={() => {
                navigate("/home/me");
              }}
              style={{
                width: "100%",
                backgroundColor: "darkred",
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

export default EditUser;
