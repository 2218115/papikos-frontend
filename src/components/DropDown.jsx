import React, { useState, useRef, useLayoutEffect, useEffect } from "react";

const DropDown = ({ label, options, placeholder = "Select an option" , onChange, className}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [dropdownWidth, setDropdownWidth] = useState(0);
    const parentRef = useRef(null);

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange?.(option.key);
    };

    useLayoutEffect(() => {
        if (parentRef.current) {
            setDropdownWidth(parentRef.current.offsetWidth);
        }
    }, [isOpen]);

    const first = useRef(true);

    useEffect(() => {
        if (first.current) {
            if (options[0]) {
                setSelectedOption(options[0]);
            }
            first.current = false;
        }
    }, [options]);

    return (
        <div className={`w-full mb-4 flex flex-col ${className}`}>
            {
                label &&
                    <label className="text-xs mb-2 text-gray-500">{label}</label>
            }

            <div className="relative w-full" ref={parentRef}>
                {/* Select Box */}
                <div
                    className="rounded-lg px-3 py-3 w-full outline-none bg-white transition text-xs focus:ring-blue-500 focus:ring-1 border-gray-200 border flex justify-between"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <span className={selectedOption ? "text-gray-800" : "text-gray-400"}>
                        {selectedOption?.label || placeholder}
                    </span>
                    <svg
                        className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : "rotate-0"
                            }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>

                {isOpen && (
                    <ul
                        className={`absolute z-10 mt-2 bg-white border border-gray-100 rounded-md shadow-lg max-h-60 overflow-auto transition-transform duration-200 ease-in-out ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
                            }`}
                        style={{ width: `${dropdownWidth}px` }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {options.map((option, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-sm"
                                onClick={() => handleSelect(option)}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DropDown;
