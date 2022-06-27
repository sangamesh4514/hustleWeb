import { Grid, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SelectField from "../common/SelectField";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "../common/TextField";
import Button from "../common/Button";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";

const HustlerRegister = () => {
  const [data, setData] = useState({
    skill: "",
    city: "",
    description: "",
  });
  const [languages, setLanguages] = useState([]);
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const languagesOptions = ["English", "Kannada", "Hindi"];
  const skillOptions = {
    mechanic: "Mechanic",
    painter: "Painter",
  };
  const cityOptions = {
    bangalore: "Bangalore",
    mysore: "Mysore",
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(language, languages, theme) {
    return {
      fontWeight:
        languages.indexOf(language) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleSkill = (e) => {
    setData((s) => {
      return { ...s, skill: e.target.value };
    });
  };
  const handleCity = (e) => {
    setData((s) => {
      return { ...s, city: e.target.value };
    });
  };
  const handlePincode = (e) => {
    setData((s) => {
      return { ...s, pinCode: e.target.value };
    });
  };
  const handleUserId = (e) => {
    setData((s) => {
      return { ...s, userId: e.target.value };
    });
  };
  const handleDescription = (e) => {
    setData((s) => {
      return { ...s, description: e.target.value };
    });
  };

  const handleLanguages = (event) => {
    const {
      target: { value },
    } = event;
    setLanguages(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleSubmit = () => {
    console.log(data, languages);
    navigate("../home");
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12} style={{ padding: "20px 20px 10px 20px" }}>
          <TextField
            fullWidth
            label="User ID for branding and search results"
            value={data.userId}
            onChange={handleUserId}
          />
        </Grid>
        <Grid item xs={12} style={{ padding: "10px 20px" }}>
          <SelectField
            label="Choose your Skill/Profession"
            options={skillOptions}
            value={data.skill}
            onChange={handleSkill}
          />
        </Grid>
        <Grid item xs={12} style={{ padding: "10px 20px" }}>
          <SelectField
            label="Choose your city"
            options={cityOptions}
            value={data.city}
            onChange={handleCity}
          />
        </Grid>
        <Grid item xs={12} style={{ padding: "10px 20px" }}>
          <Grid container spacing={1}>
            <Grid item xs={10}>
              <TextField
                type="number"
                fullWidth
                label="Pin Code"
                value={data.pinCode}
                onChange={handlePincode}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: "0px",
                }}
              >
                <AddLocationAltOutlinedIcon style={{ fontSize: "40px" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ padding: "10px 20px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-name-label">
              Choose Languages
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={languages}
              onChange={handleLanguages}
              input={<OutlinedInput label="Choose Languages" />}
              MenuProps={MenuProps}
            >
              {languagesOptions.map((language) => (
                <MenuItem
                  key={language}
                  value={language}
                  style={getStyles(language, languages, theme)}
                >
                  {language}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} style={{ padding: "10px 20px" }}>
          <TextField
            label="Description"
            minRows={6}
            multiline
            value={data.description}
            onChange={handleDescription}
            style={{
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        </Grid>
        <Grid item xs={12} style={{ padding: "10px 20px" }}>
          <Button
            type="submit"
            onClick={handleSubmit}
            style={{
              width: "100%",
              backgroundColor: "green",
            }}
            variant="contained"
            value={"Register as a Hustler"}
          ></Button>
        </Grid>
      </Grid>
    </>
  );
};

export default HustlerRegister;
