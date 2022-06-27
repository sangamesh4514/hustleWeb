import React from "react";
import { TextField as MuiTextField } from "@mui/material";

const TextField = ({ value, onChange, ...props }) => {
  return (
    <>
      <MuiTextField
        autoComplete="off"
        value={value}
        onChange={onChange}
        {...props}
      />
    </>
  );
};

export default TextField;
