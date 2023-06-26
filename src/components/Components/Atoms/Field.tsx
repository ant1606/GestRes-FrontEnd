import React from 'react';
import 'animate.css';
import PropTypes from 'prop-types';

const Field = ({
    type,
    label,
    name,
    value,
    classBox,
    handleChange,
    errorInput
}) => {
    return (
        <div className={`flex flex-col relative ${classBox}`}>
            <div
                className={`${errorInput ? 'animate__animated animate__headShake' : ''
                    } relative `}
            >
                <input
                    type={type}
                    id={name}
                    placeholder=' '
                    name={name}
                    className={`${errorInput
                            ? 'border-2 border-rose-500 text-rose-500 '
                            : 'border-gray-900'
                        }
                                px-3 py-1  border-b-2 bg-white peer w-full text-base transition-colors h-8
                                focus:outline-none`}
                    onChange={handleChange}
                    value={value}
                    autoComplete='off'
                    data-testid={name}
                />
                <label
                    htmlFor={name}
                    className={`${errorInput
                            ? 'text-rose-500 peer-focus:text-rose-500'
                            : 'text-gray-600 peer-focus:text-gray-900'
                        } 
                                absolute left-0 -top-4 text-xs cursor-text transition-all px-0        
                                peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:px-3
                                peer-focus:-top-4 peer-focus:text-xs  peer-focus:px-0`}
                >
                    {label}
                </label>
            </div>
            {errorInput && (
                <span className='text-xs absolute -bottom-5 z-10 text-red-500 font-bold'>
                    {errorInput}
                </span>
            )}
        </div>
    );
};

Field.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    classBox: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    errorInput: PropTypes.string
};

Field.defaultProps = {
    value: '',
    classBox: '',
    errorInput: ''
};
export default Field;
