import { Grid } from "@mui/material";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import SelectField from "../common/SelectField";
import TextField from "../common/TextField";

const Register = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [genderOptions, setGenderOptions] = useState({
    male: "Male",
    female: "Female",
  });
  const [data, setData] = useState({
    name: null,
    gender: "",
  });
  const dob = useRef();

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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data, dob.current.value);
    navigate(`/home`, { replace: true });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} style={{ padding: "20px" }}>
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
              defaultValue="1999-03-24"
              inputRef={dob}
              type="date"
              style={{ width: "100%" }}
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
            <Button
              value="Register"
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
    </>
  );
};

export default Register;
