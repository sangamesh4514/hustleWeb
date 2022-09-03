import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Grid, IconButton } from "@mui/material";
import SelectField from "../common/SelectField";
import { useTheme } from "@mui/material/styles";
import TextField from "../common/TextField";
import Button from "../common/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import Loader from "../common/Loader";
import Alert from "../common/Alert";
import { editHustler } from "../slices/profileSlice";
import { skillOptions, expereinceOptions } from "../home/data";

const EditHustler = () => {
  const [user, setUser] = useState(
    useSelector((state) => state.profile.hustler)
  );
  const [languages, setLanguages] = useState(
    useSelector((state) => state.profile.hustler.languages)
  );
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: null,
    type: null,
  });
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const theme = useTheme();
  const languagesOptions = ["English", "Kannada", "Hindi"];
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

  useEffect(() => {
    if (!user || !languages) {
      navigate("/home/me");
    }

    return () => {};
  }, []);

  const handleClose = () => {
    setAlertInfo((s) => ({ ...s, open: false }));
  };
  const handleName = (e) => {
    setUser((s) => ({ ...s, name: e.target.value }));
  };
  const handleSkill = (e) => {
    setUser((s) => ({ ...s, skill: e.target.value }));
  };
  const handleCity = (e) => {
    setUser((s) => ({ ...s, city: e.target.value }));
  };
  const handlePincode = (e) => {
    setUser((s) => ({ ...s, pinCode: e.target.value }));
  };
  const handleDescription = (e) => {
    setUser((s) => ({ ...s, description: e.target.value }));
  };
  const handleAddress = (e) => {
    setUser((s) => {
      return { ...s, address: e.target.value };
    });
  };
  const handleExperience = (e) => {
    setUser((s) => {
      return { ...s, experience: e.target.value };
    });
  };
  const handleDate = (e) => {
    setUser((s) => ({ ...s, dob: e.target.value }));
  };

  const handleEmail = (e) => {
    setUser((s) => ({ ...s, email: e.target.value }));
  };
  const updateHustler = (e) => {
    e.preventDefault();
    if (!user.name.length) {
      setAlertInfo({
        open: true,
        message: "Name is missing!",
        type: 1,
      });
    } else if (!user.skill.length) {
      setAlertInfo({
        open: true,
        message: "Skill is missing!",
        type: 1,
      });
    } else if (!user.city.length) {
      setAlertInfo({
        open: true,
        message: "city is missing!",
        type: 1,
      });
    } else if (
      !String(user.pinCode).length ||
      String(user.pinCode).length !== 6
    ) {
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
      if (user.email && !validateEmail(user.email)) {
        setLoader(false);

        setAlertInfo({
          open: true,
          message: "Please enter a valid email!",
          type: 1,
        });
        return;
      }
      setLoader(true);
      console.log(user, languages);
      dispatch(editHustler({ userId, data: { ...user, languages } }))
        .unwrap()
        .then((res) => {
          setLoader(false);
          setAlertInfo({
            open: true,
            message: "Hustler updated successfully!",
            type: 0,
          });
          navigate("/home/me");
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
          setAlertInfo({
            open: true,
            message: err,
            type: 3,
          });
        });
    }
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
  function getStyles(language, languages, theme) {
    return {
      fontWeight:
        languages.indexOf(language) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  return (
    <>
      <form onSubmit={updateHustler}>
        <Grid container>
          <Grid item xs={12} style={{ padding: "20px 20px 10px 20px" }}>
            <TextField
              fullWidth
              label="Name"
              value={user?.name || ""}
              onChange={handleName}
            />
          </Grid>
          <Grid item xs={12} style={{ padding: "10px 20px" }}>
            <SelectField
              label="Choose your Skill/Profession"
              options={skillOptions}
              value={user?.skill || ""}
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
                  value={user?.dob.split("T")[0] || ""}
                  onChange={handleDate}
                />
              </Grid>
              <Grid item xs={4}>
                <SelectField
                  label="Experience"
                  options={expereinceOptions}
                  value={user.experience}
                  onChange={handleExperience}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ padding: "10px 20px" }}>
            <TextField
              label="Description"
              minRows={6}
              multiline
              style={{
                width: "100%",
                boxSizing: "border-box",
              }}
              value={user?.description || ""}
              onChange={handleDescription}
            />
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
              value={user.email || ""}
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
            <SelectField
              label="Choose your city"
              options={cityOptions}
              value={user?.city || ""}
              onChange={handleCity}
            />
          </Grid>
          <Grid item xs={12} style={{ padding: "10px 20px" }}>
            <TextField
              label="Address"
              multiline
              value={user.address}
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
                  type="number"
                  fullWidth
                  label="Pin Code"
                  value={user?.pinCode || ""}
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
              onClick={updateHustler}
              style={{
                width: "100%",
                backgroundColor: "green",
              }}
              variant="contained"
              value={"Update Hustler"}
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

export default EditHustler;
