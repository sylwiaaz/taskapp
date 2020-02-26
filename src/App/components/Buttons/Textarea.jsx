import React from "react";
import TextareaAutosize from "react-textarea-autosize";

const moveCursorToEnd = e => {
  const tempValue = e.target.value;
  e.target.value = "";
  e.target.value = tempValue;
};

const handleKeyDown = (e, call) => {
  if (e.key === "Enter") {
    call();
  }
};

const Textarea = ({ onBlur, value, onChange, placeholder }) => {
  return (
    <TextareaAutosize
      autoFocus
      placeholder={placeholder ? placeholder : null}
      onBlur={onBlur}
      value={value}
      onChange={onChange}
      onFocus={moveCursorToEnd}
      onKeyDown={e => {
        handleKeyDown(e, onBlur);
      }}
    />
  );
};

export default Textarea;
