// TextInput.js
import React from 'react';

function TextInput({ label, id, name, value, onChange, type = 'text', placeholder = '', required = false }) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder} // Adicionando o placeholder aqui
        required={required}
      />
    </div>
  );
}

export default TextInput;
