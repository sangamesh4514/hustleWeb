import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import SelectField from "../common/SelectField";
import { useTheme } from "@mui/material/styles";
import TextField from "../common/TextField";
import Button from "../common/Button";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";

const EditHustler = () => {
  const [languages, setLanguages] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
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
  const updateUser = () => {
    navigate("../home/me");
  };
  function getStyles(language, languages, theme) {
    return {
      fontWeight:
        languages.indexOf(language) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  return (
    <Grid container>
      <Grid item xs={12} style={{ padding: "20px 20px 10px 20px" }}>
        <TextField fullWidth label="User ID for branding and search results" />
      </Grid>
      <Grid item xs={12} style={{ padding: "10px 20px" }}>
        <SelectField
          label="Choose your Skill/Profession"
          options={skillOptions}
        />
      </Grid>
      <Grid item xs={12} style={{ padding: "10px 20px" }}>
        <SelectField label="Choose your city" options={cityOptions} />
      </Grid>
      <Grid item xs={12} style={{ padding: "10px 20px" }}>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <TextField type="number" fullWidth label="Pin Code" />
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
        <TextField
          label="Description"
          minRows={6}
          multiline
          style={{
            width: "100%",
            boxSizing: "border-box",
          }}
        />
      </Grid>
      <Grid item xs={12} style={{ padding: "10px 20px" }}>
        <Button
          type="submit"
          onClick={() => {
            updateUser();
          }}
          style={{
            width: "100%",
            backgroundColor: "green",
          }}
          variant="contained"
          value={"Update Hustler"}
        ></Button>
      </Grid>
    </Grid>
  );
};

export default EditHustler;
