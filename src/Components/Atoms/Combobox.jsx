import React from 'react'

const Combobox = ({name, options, label, classBox='', filter=false}) => {
  return (
    <div className={`relative ${classBox}`}>
      <select 
        className='px-3 py-1 border-b-2 border-gray-900 bg-white w-full text-base h-8
          focus:outline-none' 
        name={name} 
        id={name}
      >
        {filter && (
          <>
            <option value="0">TODOS</option>
          </>
        )}
        {
          options.map((option, index) => (
            <option value="option" key={index}>{option}</option>
          ))
        }
      </select>
      <label htmlFor={name} 
        className="absolute left-0 -top-4 px-0 text-xs text-gray-600 cursor-text"
      >
        {label}
      </label>
    </div>
  )
}

export default Combobox