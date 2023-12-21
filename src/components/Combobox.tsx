import React from 'react';
import ErrorMessage from './ErrorMessage';

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

const validateLengthError = (errorCombo: string | null | undefined): number => {
  return errorCombo === null || errorCombo === undefined ? 0 : errorCombo.trim().length;
};

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
  const lengthError = validateLengthError(errorCombo);

  if (options?.length === 0 || options === null || options === undefined) {
    return <p>cargando datos</p>;
  }

  return (
    <div className={`flex flex-col relative ${classBox}`}>
      <div
        className={` ${lengthError > 0 ? 'animate__animated animate__headShake' : ''} 
          relative `}>
        <select
          // eslint-disable-next-line prettier/prettier
          className={` ${lengthError > 0 ? 'border-2 border-rose-500 text-rose-500 ' : 'border-gray-900'}
            px-3 py-1 border-b-2 bg-white w-full text-base h-8 focus:outline-none`}
          name={name}
          id={name}
          onChange={handleChange}
          value={value}
          disabled={isDisabled}>
          {/* Si el Combo se usará para filtrar, se añade la opción TODOS */}
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
          className={` ${lengthError > 0 ? 'text-rose-500' : 'text-gray-600'} 
            absolute left-0 -top-4 px-0 text-xs cursor-text`}>
          {label}
        </label>
      </div>
      {lengthError > 0 && <ErrorMessage error={errorCombo} />}
    </div>
  );
};

export default Combobox;
