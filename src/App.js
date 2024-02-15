import './App.css';
import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap'; // Import Bootstrap Button component
import Sidebar from './Sidebar'; // Import Sidebar component

// The 1st three imports are related to the UI. 
// useProSidebar is a hook that lets us access and manage sidebar state.
import { Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

//import { format } from 'date-fns';
import moment from 'moment';

function App() {
  const { collapseSidebar } = useProSidebar();
  const [content, setContent] = useState('');

  const handleItemClick = (content) => {
    setContent(content);
  }
  return (
    <div className="app" style={{ display: "flex", height: "100vh" }}>
      <Sidebar handleItemClick={handleItemClick} />
      <div className="content">
//      <Sidebar className="app">
        <Menu>
          <MenuItem className="menu1" icon={<MenuOutlinedIcon />}            
             onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}> 
            {" "}
            <h2>Shift Reporting</h2>
            <p>{content}</p>
          </MenuItem>
          <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>ShiftCalendar</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>Program Calendar</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>Downtime Entry</MenuItem>
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>Systems</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>Beam Destinations</MenuItem>
        </Menu>
      </Sidebar>
      </div>
      <main>
        <h1 style={{ color: "white", marginLeft: "5rem" }}>
          React-Pro-Sidebar
        </h1>
      </main>
    </div>
  );
}

export default App;