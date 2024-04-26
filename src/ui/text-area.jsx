import React from "react";

const TextArea = ({ label, value, setValue, height = "100px" }) => {
  return (
    <div className="mb-3">
      <textarea
        className="form-control"
        style={{ height: height }}
        id="exampleFormControlTextarea1"
        rows="3"
        placeholder={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
    </div>
  );
};

export default TextArea;
