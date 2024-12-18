import React from 'react';
import PropTypes from 'prop-types';

const FileInput = ({
    label,
    onChange,
    isError = false,
    errorHint = '',
    disabled = false,
    className = '',
    ...props
}) => {
    const baseStyles = `rounded-lg px-5 py-3 w-full outline-none transition text-xs focus:ring-1`;
    const errorStyles = `border border-red-500 focus:ring-red-500`;
    const normalStyles = `border-zinc-200 border focus:ring-blue-500`;
    const disabledStyles = `bg-gray-100 cursor-not-allowed opacity-50`;

    return (
        <div className={`flex flex-col mb-4 ${className}`}>
            {label && <label className="text-sm mb-2 text-gray-500">{label}</label>}
            <input
                type="file"
                onChange={onChange}
                disabled={disabled}
                className={`${baseStyles} ${isError ? errorStyles : normalStyles} ${disabled ? disabledStyles : ''
                    }`}
                {...props}
            />
            {isError && errorHint && (
                <span className="text-xs text-red-500 mt-1">{errorHint}</span>
            )}
        </div>
    );
};

FileInput.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    isError: PropTypes.bool,
    errorHint: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

export default FileInput;
