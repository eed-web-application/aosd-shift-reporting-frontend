import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { faHome, faNewspaper, faCog, faBox, faTicket, faLock, faCalendar, faCalendarAlt, faMapMarker, faInfo } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";
import logo from "../Components/slac-logo.png"; // Update the path to your logo image

function Sidebar() {
  // Use the current location to determine the active button
  const location = useLocation();
  // State to manage the collapsed/expanded state of the sidebar
  const [isCollapsed, setIsCollapsed] = useState(true);
  // State to keep track of the active button
  const [activeButton, setActiveButton] = useState(
    localStorage.getItem("activeButton") || location.pathname
  );

  // Handle button clicks and update the active button
  const handleClick = (buttonName, path) => {
    if (activeButton !== path) {
      setActiveButton(path);
      localStorage.setItem("activeButton", path);
    }
  };

  // Use useEffect to add a resize event listener and handle collapsing the sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      const sidebar = document.querySelector(".Sidebar");
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    // Remove the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures it only runs once on mount

  return (
    <div className={`Sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <ul>
        {/* Sidebar buttons with links */}
      
          <Link to="/home">
            <button
              onClick={() => handleClick("home", "/home")}
              className={`icon-button ${
                activeButton === "/home" ? "active-button" : ""
              }`}
            >
              <div className="button-label"> <div className="icon-container">
                <FontAwesomeIcon icon={faHome} className="icon" title="Home" />  </div>
                <span className="label">Home</span>
                </div>
            </button>
          </Link>
        

        
          <Link to="/ShiftCalendar">
            <button
              onClick={() => handleClick("ShiftCalendar", "/ShiftCalendar")}
              className={`icon-button ${
                activeButton === "/ShiftCalendar" ? "active-button" : ""
              }`}
            >
              <div className="button-label">  <div className="icon-container">
              <FontAwesomeIcon icon={faCalendar} className="icon" title="Shift Calendar" />  </div>
                <span className="label">Shift Calendar</span>
              </div>
            </button>
          </Link>
        

        
          <Link to="/ProgramCalendar">
            <button
              onClick={() => handleClick("ProgramCalendar", "/ProgramCalendar")}
              className={`icon-button ${
                activeButton === "/ProgramCalendar" ? "active-button" : ""
              }`}
            >
              <div className="button-label">  <div className="icon-container">
                <FontAwesomeIcon icon={faCalendarAlt} className="icon" title="Program Calendar" />  </div>
                <span className="label">Program Calendar</span>
              </div>
            </button>
          </Link>
        

        
          <Link to="/BeamDest">
            <button
              onClick={() => handleClick("BeamDestination", "/BeamDestination")}
              className={`icon-button ${
                activeButton === "/BeamDestination" ? "active-button" : ""
              }`}
            >
              <div className="button-label">  <div className="icon-container">
                <FontAwesomeIcon icon={faMapMarker} className="icon" title="Beam Destination" />  </div>
                <span className="label">Beam Destination</span>
              </div>
            </button>
          </Link>
        
          <Link to="/AccelSystems">
            <button
              onClick={() => handleClick("AccelSystems", "/AccelSystems")}
              className={`icon-button ${
                activeButton === "/AccelSystems" ? "active-button" : ""
              }`}
            >
              <div className="button-label">  <div className="icon-container">
                <FontAwesomeIcon icon={faCog} className="icon" title="Accel Systems" />  </div>
                <span className="label">Accel Systems</span>
              </div>
            </button>
          </Link>
        

        
          <Link to="/ShiftInfo">
            <button
              onClick={() => handleClick("ShiftInfo", "/ShiftInfo")}
              className={`icon-button ${
                activeButton === "/ShiftInfo" ? "active-button" : ""
              }`}
            >
              <div className="button-label"> 
              <div className="icon-container">
                <FontAwesomeIcon icon={faInfo} className="icon" title="Shift Reporting" />  </div>
                <span className="label">Shift Reporting</span>
              </div>
            </button>
          </Link>

      </ul>
    </div>


  );
}

export default Sidebar;