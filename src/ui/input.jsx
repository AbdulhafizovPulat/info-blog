import React from "react";

const Input = ({ label, type = "text", value, setValue }) => {
  return (
    <div className="form-floating">
      <input
        type={type}
        className="form-control"
        id="floatingInput"
        placeholder={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <label htmlFor="floatingInput">{label}</label>
    </div>
  );
};

export default Input;
