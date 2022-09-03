import { Dialog, Grid, Rating } from "@mui/material";
import React, { useState } from "react";
import Button from "../common/Button";
import TextField from "../common/TextField";

const AddComment = ({ open, handleClose, handleSubmit }) => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const handleRating = (e) => {
    if (rating == e.target.value) {
      setRating(0);
    } else {
      setRating(Number(e.target.value));
    }
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleClear = () => {
    setRating(0);
    setDescription("");
    handleClose();
  };
  return (
    <>
      <Dialog onClose={handleClear} open={open}>
        <Grid container style={{ padding: "10px" }}>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <span style={{ fontWeight: "bold" }}>Based on your Experience</span>
          </Grid>
          <Grid item xs={12} style={{ padding: "10px 0px" }}>
            <Grid container>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "2px",
                }}
              >
                <span>Performance - </span>
              </Grid>
              <Grid item xs={8} style={{ padding: "0px", display: "flex" }}>
                <Rating
                  value={rating}
                  onChange={handleRating}
                  max={5}
                  precision={1}
                  name="rating"
                  sx={{ fontSize: "30px" }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ padding: "5px 0px" }}>
            <TextField
              label="Review on work"
              minRows={4}
              multiline
              style={{
                width: "100%",
                boxSizing: "border-box",
              }}
              value={description || ""}
              onChange={handleDescription}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              padding: "5px 0px 0px 0px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              value={"Cancel"}
              variant="standard"
              onClick={handleClear}
            ></Button>
            <Button
              value={"Save"}
              variant="standard"
              onClick={(e) => handleSubmit(rating, description)}
            ></Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default AddComment;
