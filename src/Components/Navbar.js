import React from "react";
import "../CSS/Navbar.css";

const Navbar = ({
  searchLocation,
  location,
  setLocation
}) => {
  

  return (
    <nav className="Navbar-bg">
      <div className="Navbar-search">
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={event =>setLocation(event.target.value)}
          onKeyDown={event =>searchLocation(event)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
