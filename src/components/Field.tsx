import React from 'react';
import 'animate.css';

interface Props {
  type: string;
  label: string;
  name: string;
  value: string | number | readonly string[] | undefined;
  classBox: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorInput: string | null;
  min?: string;
  disabled?: boolean;
}

const Field: React.FC<Props> = ({
  type,
  label,
  name,
  value,
  classBox,
  handleChange,
  errorInput,
  ...props
}) => {
  const validateLengthErrorInput = errorInput !== null ? errorInput.trim().length : 0;
  return (
    <>
      <div className={`flex flex-col relative ${classBox}`}>
        <div
          className={`${validateLengthErrorInput > 0 ? 'animate__animated animate__headShake' : ''} 
        relative `}>
          <input
            type={type}
            id={name}
            placeholder=" "
            name={name}
            // eslint-disable-next-line prettier/prettier
            className={`${validateLengthErrorInput > 0 ? 'border-2 border-rose-500 text-rose-500 ' : 'border-gray-900'}
            px-3 py-1  border-b-2 bg-white peer w-full text-base transition-colors h-8 focus:outline-none`}
            onChange={handleChange}
            value={value}
            autoComplete="off"
            data-testid={name}
            {...props}
          />
          <label
            htmlFor={name}
            // eslint-disable-next-line prettier/prettier
            className={`${validateLengthErrorInput > 0 ? 'text-rose-500 peer-focus:text-rose-500' : 'text-gray-600 peer-focus:text-gray-900'} 
          absolute left-0 -top-4 text-xs cursor-text transition-all px-0 peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:px-3
          peer-focus:-top-4 peer-focus:text-xs  peer-focus:px-0`}>
            {label}
          </label>
        </div>
        {validateLengthErrorInput > 0 && (
          <span className="text-xs absolute -bottom-5 z-10 text-red-500 font-bold ">
            {errorInput}
          </span>
        )}
      </div>
    </>
  );
};

export default Field;
