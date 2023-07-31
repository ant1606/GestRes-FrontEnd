import React from 'react';
// import PropTypes from 'prop-types';

interface Options {
  id: number;
  value: string;
}

interface Props {
  name: string;
  options: Options[];
  label: string;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: string | number | readonly string[] | undefined;
  classBox: string;
  filter: boolean;
  errorCombo?: string | null;
  isDisabled?: boolean;
}

// Combobox.propTypes = {
//   classBox: PropTypes.string,
//   filter: PropTypes.bool,
//   handleChange: PropTypes.func.isRequired,
//   label: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   options: PropTypes.array.isRequired,
//   value: PropTypes.any.isRequired,
//   errorCombo: PropTypes.string
// };

// Combobox.defaultProps = {
//   classBox: '',
//   filter: false,
//   errorCombo: ''
// };

const Combobox: React.FC<Props> = ({
  name,
  options,
  label,
  handleChange,
  value,
  classBox,
  filter,
  errorCombo,
  isDisabled = false
}) => {
  const validateLengthError =
    errorCombo === null || errorCombo === undefined ? 0 : errorCombo.trim().length;
  if (options?.length === 0 || options === null || options === undefined) {
    return <p>cargando datos</p>;
  } else {
    return (
      <div className={`flex flex-col relative ${classBox}`}>
        <div
          className={` ${validateLengthError > 0 ? 'animate__animated animate__headShake' : ''} 
          relative `}>
          <select
            // eslint-disable-next-line prettier/prettier
            className={` ${validateLengthError > 0 ? 'border-2 border-rose-500 text-rose-500 ' : 'border-gray-900'}
            px-3 py-1 border-b-2 bg-white w-full text-base h-8 focus:outline-none`}
            name={name}
            id={name}
            onChange={handleChange}
            value={value}
            disabled={isDisabled}>
            {filter && (
              <>
                <option value={0}>TODOS</option>
              </>
            )}
            {options.map((option) => (
              <option value={option.id} key={option.id}>
                {option.value}
              </option>
            ))}
          </select>
          <label
            htmlFor={name}
            className={` ${validateLengthError > 0 ? 'text-rose-500' : 'text-gray-600'} 
            absolute left-0 -top-4 px-0 text-xs cursor-text`}>
            {label}
          </label>
        </div>
        {validateLengthError > 0 && (
          <span className="text-xs absolute -bottom-5 z-10 text-red-500 font-bold">
            {errorCombo}
          </span>
        )}
      </div>
    );
  }
};

export default Combobox;
