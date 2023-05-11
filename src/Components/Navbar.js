import React from "react";
import _debounce from "lodash.debounce";
import "../CSS/Navbar.css";

const Navbar = ({
  searchLocation,
  location,
  setLocation,
  suggestions,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  onSuggestionSelected,
  getSuggestionValue,
  renderSuggestion,
}) => {

  const handleFetchSuggestions = _debounce((value) => {
    onSuggestionsFetchRequested({ value });
  }, 200);

  const handleChange = (event) => {
    const value = event.target.value;
    setLocation(value);
    if (value === '') {
      onSuggestionsClearRequested();
    } else {
      handleFetchSuggestions( value );
    }
  };
 

  return (
    <nav className="Navbar-bg">
      <div className="Navbar-search">
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={handleChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              searchLocation(event);
              onSuggestionsClearRequested();
            }
          }}
        />
        {suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((suggestion) => (
              <div
                key={getSuggestionValue(suggestion)}
                className="suggestion"
                onClick={() => {
                  onSuggestionSelected(suggestion)
                  onSuggestionsClearRequested();
                  setLocation("")
                }}
              >
                {renderSuggestion(suggestion)}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
