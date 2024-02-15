import './App.css';
import React, {useState, useEffect} from 'react';
import DataTable from './pages/ShiftCalendar/DataTable.js'; // Import the DataTable component
import { Button } from 'react-bootstrap'; // Import Bootstrap Button component

// The 1st three imports are related to the UI. 
// useProSidebar is a hook that lets us access and manage sidebar state.
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
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
  const [shiftdata, setShiftCal] = useState(false);
  useEffect(() => {
    getShiftCal();
  }, []);
  
  function getShiftCal() {
    console.log("Calling getShiftCal...");
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setShiftCal(data);
      });
  }
  function createShiftCal() {
    let start_time = prompt('Enter Shift start time');
    let end_time = prompt('Enter Shift end time');
    fetch('http://localhost:3001/shiftdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({start_time, end_time}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getShiftCal();
      });
  }
  function deleteShiftCal() {
    let id = prompt('Enter Shift Id');
    fetch(`http://localhost:3001/shiftdata/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getShiftCal();
      });
  }
  return (
    <div >
      <Sidebar >
        <Menu>
          <MenuItem icon={<HomeOutlinedIcon />}            
             onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}> 
            {" "}
            <h2>Home</h2>
            </MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>ShiftData</MenuItem>
        </Menu>
      </Sidebar>
      <main>
        <h1 style={{ color: "white", marginLeft: "5rem" }}>
          React-Pro-Sidebar
        </h1>
      </main>
      <h1>Shift Data</h1>
      <Button variant="primary" onClick={createShiftCal} style={{margin:'5px'}}>Add Shift</Button>
      <Button variant="danger" onClick={deleteShiftCal} style={{margin:'5px'}}>Delete Shift</Button>
        {shiftdata ? (
          <DataTable/> // Render the DataTable component here
        ) : (
          'There is no Shift data available'
        )}      
    </div>
  );
}

export default App;