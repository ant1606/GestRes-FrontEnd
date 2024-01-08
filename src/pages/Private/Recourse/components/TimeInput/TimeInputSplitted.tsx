import ErrorMessage from '#/components/ErrorMessage';
import React, { useRef, useState } from 'react';

/**
 * Casos de prueba para el componente
 * - Sólo debe permitir números y mover las flechas y las teclas para borrar
 * - En input horas
 *   [x]  - Debe permitir como máximo 3 números
 *   [x]  - Si no se ingresa ningún número y se pasa al siguiente input, se evalua si el valor está vacio y se colocará 00
 *   [x]  - Si se ingresa un valor entre 0 a 9 y se pasa al siguiente input, se evaluará el valor y se rellenará con un 0 a   la izquierda, quedando 00, 01, 02, 03, 04, 05, 06, 07, 08, 09
 *   [x]  - Si se ingresan 3 digitos se deberá cambiar el foco automáticamente al siguiente input
 *   [x]  - Si se presiona la tecla enter se deberá cambiar el foco automáticamente al siguiente input
 * - En input minutos
 *   [x]  - Debe permitir como máximo 2 números
 *   [x]  - Sólo se podran ingresar números desde 0 hasta 59
 *   [x]  - Si no se ingresa ningún número y se pasa al siguiente input, se evalua si el valor está vacio y se colocará 00
 *   [x]  - Si se ingresa un valor entre 0 a 9 y se pasa al siguiente input, se evaluará el valor y se rellenará con un 0 a   la izquierda, quedando 00, 01, 02, 03, 04, 05, 06, 07, 08, 09
 *   [x]  - Si se ingresan 2 digitos se deberá cambiar el foco automáticamente al siguiente input
 *   [x]  - Si se presiona la tecla enter se deberá cambiar el foco automáticamente al siguiente input
 * - En input segundos
 *   [x]  - Debe permitir como máximo 2 números
 *   [x]  - Sólo se podran ingresar números desde 0 hasta 59
 *   [x]  - Si no se ingresa ningún número y se pasa al siguiente input, se evalua si el valor está vacio y se colocará 00
 *   [x]  - Si se ingresa un valor entre 0 a 9 y se pasa al siguiente input, se evaluará el valor y se rellenará con un 0 a   la izquierda, quedando 00, 01, 02, 03, 04, 05, 06, 07, 08, 09
 *   [x]  - Si se ingresan 2 digitos se deberá cambiar el foco automáticamente al siguiente input
 *   [x]  - Si se presiona la tecla enter se deberá cambiar el foco automáticamente al siguiente input
 *
 */

interface Props {
  outInputFocus: string; // Id del input al que se le hará focus luego de escribir los segundos en este componente
  label: string;
  errorInput: string | null;
  classBox: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  timeValue: string;
}
interface CustomEvent {
  target: {
    value: string;
    name: string;
  };
}

const validateLengthError = (errorInput: string | null | undefined): number => {
  return errorInput === null || errorInput === undefined ? 0 : errorInput.trim().length;
};

export const TimeInputSplitted: React.FC<Props> = ({
  outInputFocus,
  label,
  errorInput,
  classBox,
  handleChange,
  name,
  timeValue
}) => {
  const [timeValueHour, timeValueMinute, timeValueSecond] = timeValue.split(':').map(String);
  const [hour, setHour] = useState(timeValueHour);
  const [minute, setMinute] = useState(timeValueMinute);
  const [second, setSecond] = useState(timeValueSecond);

  const LengthError = validateLengthError(errorInput);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);

  // Llamamos al método handleChange del parent para modificar el estado del customHook
  // Necesita el name de la propiedad para que sea enlazada en el customHook
  const callHandleChangeProp = (
    timeValue: string,
    timePart: 'hour' | 'minute' | 'second'
  ): void => {
    let value = '';
    if (timePart === 'hour') {
      value = `${timeValue}:${minute}:${second}`;
    } else if (timePart === 'minute') {
      value = `${hour}:${timeValue}:${second}`;
    } else if (timePart === 'second') {
      value = `${hour}:${minute}:${timeValue}`;
    }

    const customEvent: CustomEvent = {
      target: {
        value,
        name
      }
    };
    handleChange(customEvent as React.ChangeEvent<HTMLInputElement>);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    nextInput: 'hour' | 'minute' | 'second'
  ): void => {
    const value = e.target.value;
    if (/^\d+$/.test(value) || value === '') {
      switch (nextInput) {
        case 'hour':
          setHour(value);
          callHandleChangeProp(value, 'hour');
          if (value.length === 3) {
            document.getElementById('minute')?.focus();
          }
          break;
        case 'minute':
          if (value === '') {
            setMinute(value);
          } else {
            parseInt(value) <= 59 ? setMinute(value) : setMinute('59');
          }
          callHandleChangeProp(value, 'minute');
          if (value.length === 2) {
            setTimeout(() => {
              document.getElementById('second')?.focus();
            }, 100);
          }
          break;
        case 'second':
          if (value === '') {
            setSecond(value);
          } else {
            parseInt(value) <= 59 ? setSecond(value) : setSecond('59');
          }
          callHandleChangeProp(value, 'second');
          if (value.length === 2) {
            setTimeout(() => {
              document.getElementById(outInputFocus)?.focus();
            }, 100);
          }
          break;
        default:
          break;
      }
    }
  };

  // nextInputId: 'minute' | 'second' | string
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextInputRef: React.MutableRefObject<null>
  ): void => {
    if (e.key === 'Enter') {
      nextInputRef.current?.focus();
    }
    if (e.key === 'ArrowRight') {
      // Obtenemos la posición del cursor en el input mediante la propiedad selecctionStart
      if (
        (e.target as HTMLInputElement).selectionStart ===
        (e.target as HTMLInputElement).value.length
      ) {
        nextInputRef.current?.focus();
      }
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement, Element>,
    inputId: 'hour' | 'minute' | 'second'
  ): void => {
    // Formateamos el valor al dejar el foco del input
    let value = '';
    switch (inputId) {
      case 'hour':
        if (hour.length <= 1) {
          value = hour.padStart(2, '0');
          setHour(value);
          callHandleChangeProp(value, 'hour');
        }
        break;
      case 'minute':
        if (minute.length <= 1) {
          value = minute.padStart(2, '0');
          setMinute(value);
          callHandleChangeProp(value, 'minute');
        }
        break;
      case 'second':
        if (second.length <= 1) {
          value = second.padStart(2, '0');
          setSecond(value);
          callHandleChangeProp(value, 'second');
        }
        break;
      default:
        break;
    }
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement, Element>,
    inputId: 'hour' | 'minute' | 'second'
  ): void => {
    switch (inputId) {
      case 'hour':
        if (hour === '00') {
          setHour('');
        }
        break;
      case 'minute':
        if (minute === '00') {
          setMinute('');
        }
        break;
      case 'second':
        if (second === '00') {
          setSecond('');
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className={`flex flex-col relative ${classBox}`}>
        <div
          // eslint-disable-next-line prettier/prettier
          className={` ${LengthError > 0 ? 'animate__animated animate__headShake border-2 border-rose-500 text-rose-500' : ''} 
        relative `}>
          <div
            // eslint-disable-next-line prettier/prettier
            className={`${LengthError > 0 ? '' : 'border-b-2 border-gray-900'} inline-block p-1 bg-white  
            focus-within:border-b-2 focus-within:border-gray-900 `}>
            <input
              type="text"
              placeholder="HH"
              name="hour"
              id="hour"
              value={hour}
              onChange={(e) => {
                handleInputChange(e, 'hour');
              }}
              onKeyDown={(e) => {
                handleKeyDown(e, minuteRef);
              }}
              onBlur={(e) => {
                handleBlur(e, 'hour');
              }}
              onFocus={(e) => {
                handleFocus(e, 'hour');
              }}
              className="max-w-[2.3rem] text-center px-1 border-none outline-none focus:border-b-2 focus:border-gray-900"
            />
            <span className="font-bold">:</span>
            <input
              type="text"
              placeholder="MM"
              id="minute"
              max={59}
              value={minute}
              onChange={(e) => {
                handleInputChange(e, 'minute');
              }}
              onKeyDown={(e) => {
                handleKeyDown(e, secondRef);
              }}
              onBlur={(e) => {
                handleBlur(e, 'minute');
              }}
              onFocus={(e) => {
                handleFocus(e, 'minute');
              }}
              className="max-w-[2.3rem] text-center px-1 border-none outline-none"
              ref={minuteRef}
            />
            <span className="font-bold">:</span>
            <input
              type="text"
              placeholder="SS"
              id="second"
              value={second}
              onChange={(e) => {
                handleInputChange(e, 'second');
              }}
              onKeyDown={(e) => {
                handleKeyDown(e, secondRef);
              }}
              onBlur={(e) => {
                handleBlur(e, 'second');
              }}
              onFocus={(e) => {
                handleFocus(e, 'second');
              }}
              className="max-w-[2.3rem] text-center px-1 border-none outline-none"
              ref={secondRef}
            />
          </div>
          <span
            // eslint-disable-next-line prettier/prettier
            className={`${LengthError > 0 ? 'text-rose-500 peer-focus:text-rose-500' : 'text-gray-600 peer-focus:text-gray-900'} 
          absolute left-0 -top-4 text-xs cursor-text transition-all px-0 peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:px-3
          peer-focus:-top-4 peer-focus:text-xs  peer-focus:px-0`}>
            {label}
          </span>
        </div>
        {LengthError > 0 && <ErrorMessage error={errorInput} />}
      </div>
    </>
  );
};
