import React from 'react';
import PropTypes from 'prop-types';

const Spinner = () => (
    <div className="w-5 h-5 border-2 border-t-2 border-white border-solid rounded-full animate-spin"></div>
);

const Button = ({
    children,
    variant = 'primary',
    isLoading = false,
    disabled = false,
    onClick,
    className = '',
    ...props
}) => {
    // Define styles for each variant
    const variantStyles = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
    };

    const disabledStyles = 'opacity-50 cursor-not-allowed';
    const baseStyles = `py-2 px-4 rounded-lg transition duration-200 focus:outline-none`;

    const finalStyles = `
    ${baseStyles} 
    ${variantStyles[variant] || variantStyles.primary} 
    ${disabled || isLoading ? disabledStyles : ''} 
    ${className}
  `;

    return (
        <button
            className={finalStyles}
            onClick={onClick}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="flex justify-center items-center space-x-2">
                    <Spinner />
                    <span>Loading...</span>
                </div>
            ) : (
                children
            )}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
    isLoading: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
};

export default Button;
