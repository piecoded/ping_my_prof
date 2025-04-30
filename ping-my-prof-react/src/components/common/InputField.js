// components/common/InputField.js
import React from 'react';
import '../../styles.css';

const InputField = ({ label, type, id, name, value, onChange, required = false }) => {
  return (
    <div className="input-group">
      <form><label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      /></form>
    </div>
  );
};

export default InputField;
