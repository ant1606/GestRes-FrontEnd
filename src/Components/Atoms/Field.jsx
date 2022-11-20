import React from 'react'
import 'animate.css';
import PropTypes from 'prop-types';

const Field = ({ type, label, name, value, classBox , handleChange , errorInput }) => {
  //TODO: Verificar que el mensaje de error se agregue en esta seccion misma
  return (
    <div className={`${errorInput ? "animate__animated animate__headShake" : ""} relative ${classBox}`}>
      <input
        type={type}
        id={name}
        placeholder=" "
        name={name}
        className={`${errorInput ? "border-2 border-rose-500 text-rose-500 " : "border-gray-900"}
        px-3 py-1  border-b-2 bg-white peer w-full text-base transition-colors h-8
        focus:outline-none`}
        onChange={handleChange}
        value={value}
        autoComplete="off"
      />
      <label htmlFor={name}
        className={`${errorInput ? "text-rose-500 peer-focus:text-rose-500" : "text-gray-600 peer-focus:text-gray-900"} 
        absolute left-0 -top-4 text-xs cursor-text transition-all px-0        
        peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:px-3
        peer-focus:-top-4 peer-focus:text-xs  peer-focus:px-0`}
      >
        {label}
      </label>
    </div>
  )
}

Field.propTypes = {
    type: PropTypes.string.isRequired,
    label : PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    classBox: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    errorInput: PropTypes.string
}

Field.defaultProps={
    value: '',
    classBox: '',
    errorInput: ''
}
export default Field
