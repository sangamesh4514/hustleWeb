import React from "react";
import { Button as MuiButton } from "@mui/material";

const Button = ({ value, onClick, ...props }) => {
  return (
    <>
      <MuiButton onClick={onClick} variant="contained" {...props}>
        {value}
      </MuiButton>
    </>
  );
};

export default Button;
