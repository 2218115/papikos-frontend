import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
    isError = false,
    errorHint = '',
    disabled = false,
    className = '',
    ...props
}) => {
    const baseStyles = `rounded-lg px-5 py-3 w-full  outline-none transition text-xs focus:ring-1`;
    const errorStyles = `border border-red-500 focus:ring-red-500`;
    const normalStyles = `border-zinc-200 border focus:ring-blue-500`;
    const disabledStyles = `bg-gray-100 cursor-not-allowed opacity-50`;
    return (
        <div className={`flex flex-col mb-4 ${className}`}>
            {label && <label className="text-sm mb-2 text-gray-500">{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`${baseStyles} ${isError ? errorStyles : normalStyles
                    } ${disabled ? disabledStyles : ''}`}
                {...props}
            />
            {isError && errorHint && (
                <span className="text-xs text-red-500 mt-1">{errorHint}</span>
            )}
        </div>
    );
};

TextInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    isError: PropTypes.bool,
    errorHint: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

export default TextInput;
