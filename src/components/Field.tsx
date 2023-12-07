import React from 'react';
import 'animate.css';
import ErrorMessage from './ErrorMessage';

interface Props {
  type: string;
  label: string;
  name: string;
  value: string | number | readonly string[] | undefined;
  classBox: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  errorInput: string | null;
  readonly?: boolean;
  classInput?: string;
  [key: string]: any;
}

const validateLengthError = (errorInput: string | null | undefined): number => {
  return errorInput === null || errorInput === undefined ? 0 : errorInput.trim().length;
};

const Field: React.FC<Props> = (props) => {
  const {
    type,
    label,
    name,
    value,
    classBox,
    handleChange,
    errorInput,
    readonly,
    classInput = '',
    ...rest
  } = props;
  const LengthError = validateLengthError(errorInput);
  return (
    <>
      <div className={`flex flex-col relative ${classBox}`}>
        <div
          className={`${LengthError > 0 ? 'animate__animated animate__headShake' : ''} 
        relative `}>
          <input
            type={type}
            id={name}
            placeholder=" "
            name={name}
            // eslint-disable-next-line prettier/prettier
            className={`${LengthError > 0 ? 'border-2 border-rose-500 text-rose-500 ' : 'border-gray-900'}
            px-3 py-1  border-b-2 bg-white peer w-full text-base transition-colors h-8 focus:outline-none ${classInput}`}
            onChange={handleChange}
            value={value}
            autoComplete="off"
            data-testid={name}
            readOnly={readonly}
            {...rest}
          />

          <label
            htmlFor={name}
            // eslint-disable-next-line prettier/prettier
            className={`${LengthError > 0 ? 'text-rose-500 peer-focus:text-rose-500' : 'text-gray-600 peer-focus:text-gray-900'} 
          absolute left-0 -top-4 text-xs cursor-text transition-all px-0 peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:px-3
          peer-focus:-top-4 peer-focus:text-xs  peer-focus:px-0`}>
            {label}
          </label>
        </div>
        {LengthError > 0 && <ErrorMessage error={errorInput} />}
      </div>
    </>
  );
};

export default Field;
