import React from "react";
import "../CSS/Navbar.css";

const Navbar = ({searchLocation,setLocation,location}) => {
 /* const [search, setSearch] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  
  
  const handleChange = (searchData) => {
    setSearch(searchData.value);
    setSelectedCity(null);
  };
*/

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
