import { Grid, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
import { createHustler } from "../slices/profileSlice";
import Loader from "../common/Loader";
import Alert from "../common/Alert";
import {
  skillOptions,
  expereinceOptions,
  languagesOptions,
  cityOptions,
} from "../home/data";

const HustlerRegister = () => {
  const [data, setData] = useState({
    userName: "",
    skill: "",
    dob: "1999-03-24",
    city: "",
    pinCode: "",
    description: "",
    address: "",
    experience: 0,
    email: null,
  });
  const [languages, setLanguages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: null,
    type: null,
  });
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
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
  const handleExperience = (e) => {
    setData((s) => {
      return { ...s, experience: e.target.value };
    });
  };
  const handlePincode = (e) => {
    setData((s) => {
      return { ...s, pinCode: e.target.value };
    });
  };
  const handleUserName = (e) => {
    setData((s) => {
      return { ...s, userName: e.target.value };
    });
  };
  const handleDescription = (e) => {
    setData((s) => {
      return { ...s, description: e.target.value };
    });
  };
  const handleAddress = (e) => {
    setData((s) => {
      return { ...s, address: e.target.value };
    });
  };
  const handleEmail = (e) => {
    setData((s) => ({ ...s, email: e.target.value }));
  };
  const handleDate = (e) => {
    setData((s) => ({ ...s, dob: e.target.value }));
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
  const handleClose = () => {
    setAlertInfo((s) => ({ ...s, open: false }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.userName.length) {
      setAlertInfo({
        open: true,
        message: "UserName is missing!",
        type: 1,
      });
    } else if (!data.skill.length) {
      setAlertInfo({
        open: true,
        message: "Skill is missing!",
        type: 1,
      });
    } else if (!data.city.length) {
      setAlertInfo({
        open: true,
        message: "city is missing!",
        type: 1,
      });
    } else if (!data.pinCode.length || data.pinCode.length !== 6) {
      setAlertInfo({
        open: true,
        message: "Invalid pincode!",
        type: 1,
      });
    } else if (languages.length < 1) {
      setAlertInfo({
        open: true,
        message: "Choose Languages",
        type: 1,
      });
    } else {
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
      console.log(data, languages);
      dispatch(createHustler({ userId, data: { ...data, languages } }))
        .unwrap()
        .then((res) => {
          setLoader(false);
          setAlertInfo({
            open: true,
            message: "Hustler created successfully!",
            type: 0,
          });
          navigate("/home/me");
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
          if (err?.subCode) {
            setAlertInfo({
              open: true,
              message: err.message,
              type: 3,
            });
          } else {
            setAlertInfo({
              open: true,
              message: "Server under maintainance ,Try again later!",
              type: 3,
            });
          }
        });
    }
  };
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} style={{ padding: "20px 20px 10px 20px" }}>
            <TextField
              required
              fullWidth
              label="User Name is your Trademark(Brand)"
              value={data.userName}
              onChange={handleUserName}
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
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <TextField
                  label="Date of Birth"
                  type="date"
                  style={{ width: "100%" }}
                  value={data?.dob.split("T")[0] || ""}
                  onChange={handleDate}
                />
              </Grid>
              <Grid item xs={4}>
                <SelectField
                  label="Experience"
                  options={expereinceOptions}
                  value={data.experience}
                  onChange={handleExperience}
                />
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
              label="Description about you(optional)"
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
            <TextField
              value={data.email || ""}
              onChange={handleEmail}
              label="Email (Optional)"
              type="email"
              style={{ width: "100%" }}
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
            <TextField
              label="Address(optional)"
              minRows={3}
              multiline
              value={data.address}
              onChange={handleAddress}
              style={{
                width: "100%",
                boxSizing: "border-box",
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ padding: "10px 20px" }}>
            <Grid container spacing={1}>
              <Grid item xs={10}>
                <TextField
                  required
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

export default HustlerRegister;
