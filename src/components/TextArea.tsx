/* eslint-disable prettier/prettier */
import React from 'react';
import ErrorMessage from './ErrorMessage';

interface Props {
  label: string;
  name: string;
  value: string | number | readonly string[] | undefined;
  classBox: string;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errorInput: string | null;
  rows?: number;
}
const validateLengthError = (errorInput: string | null | undefined): number => {
  return errorInput === null || errorInput === undefined ? 0 : errorInput.trim().length;
};

const TextArea: React.FC<Props> = ({
  label,
  name,
  value,
  classBox,
  handleChange,
  errorInput,
  rows = 1
}) => {
  const lengthError = validateLengthError(errorInput);
  return (
    <div className={`flex flex-col relative ${classBox}`}>
      <div
        className={`${lengthError > 0 ? 'animate__animated animate__headShake' : ''} 
    relative `}>
        <textarea
          id={name}
          placeholder=" "
          name={name}
          rows={rows}
          className={` 
          ${lengthError > 0 ? 'border-2 border-rose-500 text-rose-500 ' : 'border-gray-900'}
          px-3 py-1 h-auto resize-y border-b-2  bg-white peer w-full text-base transition-colors
        focus:outline-none`}
          data-testid={name}
          value={value}
          onChange={handleChange}
        />
        <label
          htmlFor={name}
          className={`
          ${lengthError > 0
              ? 'text-rose-500 peer-focus:text-rose-500'
              : 'text-gray-600 peer-focus:text-gray-900'
            } 
          absolute left-0 -top-4 text-xs  cursor-text transition-all px-0
        peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:px-3
        peer-focus:-top-4 peer-focus:text-xs peer-focus:px-0`}>
          {label}
        </label>

      </div>
      {lengthError > 0 && <ErrorMessage error={errorInput} />}

    </div>
  );
};

export default TextArea;
