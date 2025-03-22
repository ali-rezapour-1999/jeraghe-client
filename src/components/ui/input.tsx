import React from "react";

interface Props {
  type: string;
  id: string;
  label: string;
  value: string;
  style?: string;
  labelStyle?: string;
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<Props> = ({
  type,
  id,
  label,
  value,
  style,
  labelStyle,
  name,
  placeholder,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={id} className={labelStyle}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        className={`p-2 rounded-lg bg-light ${style}`}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};
export default CustomInput;
