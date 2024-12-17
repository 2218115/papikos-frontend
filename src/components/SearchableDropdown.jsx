import React, { useState, useRef, useEffect } from "react";

const SearchableDropdown = ({
  label,
  options,
  placeholder = "Select an option",
  onChange,
  className,
  isError = false,
  hintError = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchTerm(""); // Reset search term
    onChange?.(option.key);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredOptions(options);
    } else {
      const lowerCaseTerm = searchTerm.toLowerCase();
      setFilteredOptions(
        options.filter((option) =>
          option.label.toLowerCase().includes(lowerCaseTerm)
        )
      );
    }
  }, [searchTerm, options]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`w-full mb-4 flex flex-col ${className}`} ref={dropdownRef}>
      {label && <label className="text-xs mb-2 text-gray-500">{label}</label>}

      <div className="relative">
        {/* Select Box */}
        <div
          className={`rounded-lg px-3 py-3 w-full outline-none bg-white transition text-xs focus:ring-blue-500 focus:ring-1 border flex justify-between ${
            isError ? "border-red-500" : "border-gray-200"
          }`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={selectedOption ? "text-gray-800" : "text-gray-400"}>
            {selectedOption?.label || placeholder}
          </span>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
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

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-10 mt-2 bg-white border border-gray-100 rounded-md shadow-lg max-h-60 w-full overflow-auto">
            {/* Search Input */}
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search..."
              className="w-full px-3 py-2 text-sm text-gray-700 border-b border-gray-200 outline-none focus:ring-1 focus:ring-blue-500"
            />

            {/* Options */}
            <ul>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option.key}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-sm"
                    onClick={() => handleSelect(option)}
                  >
                    {option.label}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500 text-sm">
                  No results found
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Error Hint */}
      {isError && hintError && (
        <p className="text-xs text-red-500 mt-1">{hintError}</p>
      )}
    </div>
  );
};

export default SearchableDropdown;
