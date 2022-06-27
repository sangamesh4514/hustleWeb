import React from "react";
import "./styles.css";

const Switch = ({ name, checked, onChange, disabled }) => {
  return (
    <>
      {/* <!-- Rectangular switch --> */}
      <label className="switch">
        <input
          type="checkbox"
          checked={checked}
          name={name}
          onChange={onChange}
          disabled={disabled}
        />
        <span className="slider"></span>
      </label>
    </>
  );
};

export default Switch;
