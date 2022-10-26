import React from 'react'

const Field = ({type, label, name, classBox='', handleChange=null  }) => {
  return (
    <div className={`relative ${classBox}`}>
      <input 
        type={type}
        id={name}
        placeholder=" "
        name={name}
        className="px-3 py-1 border-b-2 border-gray-900  bg-white peer w-full text-base transition-colors h-8
        focus:outline-none"
        onChange={handleChange}
      />
      <label htmlFor={name}
        className="absolute left-0 -top-4 text-xs text-gray-600 cursor-text transition-all px-0
        peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:px-3
        peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gray-900 peer-focus:px-0"
      >
        {label}
      </label>
    </div>
  )
}

export default Field