// ShiftCalendar.js
import React, { useState, useEffect } from 'react';
//import { Button, Modal, Form } from 'react-bootstrap';
import DataTable from './DataTable.js'; // Import the DataTable component
//import moment from 'moment';
//import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ShiftCalendar() {
  const [shiftdata, setShiftCal] = useState(null);

  useEffect(() => {
    getShiftCal();
  }, []);

  useEffect(() => {
    // Reload the DataTable whenever shiftdata changes
    if (shiftdata !== null) {
      console.log('Reloading DataTable:', shiftdata);
    }
  }, [shiftdata]);

  async function getShiftCal() {
    console.log('Calling getShiftCal...');
    fetch('/api/aosd-shift-reporting-backend/shiftdata')
      .then((response) => response.json())
      .then((data) => setShiftCal(data));
  }

 return (
    <div>
        {shiftdata ? (
        <DataTable key={JSON.stringify(shiftdata)} data={shiftdata} />
      ) : (
        'There is no Shift data available'
      )}
    </div>
  );
}

export default ShiftCalendar;
