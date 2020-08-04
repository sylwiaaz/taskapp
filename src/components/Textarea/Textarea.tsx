import React, { FunctionComponent } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface TextareaProps {
  onBlur: () => void,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
  placeholder?: string
}

const Textarea: FunctionComponent<TextareaProps> = ({onBlur, value, onChange, placeholder} ) => {

  const moveCursorToEnd = (e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLTextAreaElement;
    const tempValue = target.value;
    target.value = "";
    target.value = tempValue;
  };

  const handleKeyDown = (e: React.KeyboardEvent, cb: Function): void => {
    if (e.key === "Enter") {
      cb();
    }
  };
  return (
      <TextareaAutosize
          autoFocus
          placeholder={placeholder ? placeholder : null!}
          onBlur={onBlur}
          value={value}
          onChange={onChange}
          onFocus={moveCursorToEnd}
          onKeyDown={(e: React.KeyboardEvent) => {
            handleKeyDown(e, onBlur);
          }}
      />
  );
};

export default Textarea;
