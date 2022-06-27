import { Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import React, { useState } from "react";
import TextField from "../common/TextField";
import SelectField from "../common/SelectField";
import Button from "../common/Button";

const EditUser = () => {
  const [genderOptions, setGenderOptions] = useState({
    male: "Male",
    female: "Female",
  });
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`../home/me`);
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12} style={{ padding: "20px" }}>
          <TextField label="Name" style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={12} style={{ padding: "10px 20px" }}>
          <TextField
            label="Date of Birth"
            defaultValue="1999-03-24"
            type="date"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} style={{ padding: "10px 20px" }}>
          <SelectField label="Gender" options={genderOptions} />
        </Grid>
        <Grid item xs={12} style={{ padding: "10px 20px" }}>
          <Button
            value="Update User"
            onClick={() => {
              handleSubmit();
            }}
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "green",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default EditUser;
