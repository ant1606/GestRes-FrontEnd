import React, { useEffect } from 'react'

const Combobox = ({ name, options, label, handleChange, value=1, classBox='', filter=false}) => {
    if(options?.length === 0 || options=== null || options=== undefined){
        return (<p>cargando datos</p>)
    }else {
        return (
          <div className={`relative ${classBox}`}>
            <select
              className='px-3 py-1 border-b-2 border-gray-900 bg-white w-full text-base h-8 focus:outline-none'
              name={name}
              id={name}
              onChange = {handleChange}
              defaultValue = {value}
            >
              {filter && (
                <>
                  <option value={0}>TODOS</option>
                </>
              )}
              {
                options.map((option) =>
                    (
                        <option
                            value={option.id}
                            key={option.id}
                        >
                            {option.value}
                        </option>
                    )

                )
              }
            </select>
            <label
                htmlFor={name}
                className="absolute left-0 -top-4 px-0 text-xs text-gray-600 cursor-text"
            >
              {label}
            </label>
          </div>
        )
  }
}

export default Combobox