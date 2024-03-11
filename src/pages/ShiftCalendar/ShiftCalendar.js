// ShiftCalendar.js
import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import DataTable from './DataTable.js'; // Import the DataTable component
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ShiftCalendar() {
  const [shiftdata, setShiftCal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

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

  async function createShiftCal() {
    fetch('/api/aosd-shift-reporting-backend/shiftdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        start_time: moment.tz(startTime, 'America/Los_Angeles').toISOString(),
        end_time: moment.tz(endTime, 'America/Los_Angeles').toISOString(),
      }),
    })

      .then((response) => response.text())
      .then((data) => {
        alert(data);
        getShiftCal(); // Refresh data after adding shift
        handleCloseModal();
      });
  }

  async function deleteShiftCal() {
    let id = prompt('Enter Shift Id');
    fetch(`/api/aosd-shift-reporting-backend/shiftdata/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        getShiftCal(); // Refresh data after deleting shift
      });
  }

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    // Clear the input fields when the modal is closed
    setStartTime('');
    setEndTime('');
  };

 return (
    <div>
      <Button variant="primary" onClick={handleShowModal} style={{ margin: '5px' }}>
        Add Shift
      </Button>
      <Button variant="danger" onClick={deleteShiftCal} style={{ margin: '5px' }}>
        Delete Shift
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Shift</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="startTime">
              <Form.Label>Start Time:</Form.Label>
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Select Date and Time"
                required
              />
            </Form.Group>
            <Form.Group controlId="endTime">
              <Form.Label>End Time:</Form.Label>
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Select Date and Time"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={createShiftCal}>
            Add Shift
          </Button>
        </Modal.Footer>
      </Modal>

      {shiftdata ? (
        <DataTable key={JSON.stringify(shiftdata)} data={shiftdata} />
      ) : (
        'There is no Shift data available'
      )}
    </div>
  );
}

export default ShiftCalendar;
