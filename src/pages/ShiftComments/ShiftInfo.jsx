// ShiftInfo.jsx
// Front end for entering Shift Reporting data and any Downtime entries.
// Dates needed formatting to local timestamp, or else it was converting into UTC.
import React, { useState, useEffect } from 'react';
import './DowntimeEntry.css'; // Import the CSS file
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Form, Col, Row, Container } from 'react-bootstrap';


function ShiftInfo() {
  const [shiftDates, setShiftDates] = useState({
    startTime: new Date(),
    endTime: new Date(),
  });


  const [commentsData, setCommentsData] = useState([{ comments: '' }]);
// Category needs to be a dropdown selectable list
  const staticCategory = ["Configuration Change", "Tuning", "Accelerator Down", "User Off", "Scheduled Off"];
  
// Store the selected system_id in the form data
  const [downtimeData, setDowntimeData] = useState([
    { description: '', category: '', selectedSystemId: '', 
      start: null, end: null, caterId: '', elogUrl: ''},
  ]);
// Use the ACCEL_SYSTEMS module to retrieve system_id and system_name
  const [accelsystem, setAccelSystem] = useState([]);

  // Fetch the list of systems when the component mounts
  useEffect(() => {
    const fetchSystems = async () => {
      try {
        const response = await axios.get('/api/aosd-shift-reporting-backend/accelsystem');
        setAccelSystem(response.data);
      } catch (error) {
        console.error('Error fetching systems:', error.message);
      }
    };

    fetchSystems();
  }, []); // Empty dependency array ensures the effect runs only once on mount


  const handleShiftChange = (name, date) => {
    setShiftDates({ ...shiftDates, [name]: date });
  };

  const handleCommentChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCommentsData = [...commentsData];
    updatedCommentsData[index] = { ...updatedCommentsData[index], [name]: value };
    setCommentsData(updatedCommentsData);
  };

  const handleDowntimeChange = (index, fieldName, value) => {
    const updatedDowntimeData = [...downtimeData];
    updatedDowntimeData[index] = { ...updatedDowntimeData[index], [fieldName]: value };

    console.log('Updated Downtime Data:', updatedDowntimeData);

  // Find the selected system and set its system_id
  const selectedSystem = accelsystem.find(system => system.system_name === value);
  if (selectedSystem) {
    console.log('Selected System:', selectedSystem);

    updatedDowntimeData[index].selectedSystemId = selectedSystem.system_id;
  }

    setDowntimeData(updatedDowntimeData);
  };

  const handleAddComment = () => {
    setCommentsData([...commentsData, { comments: '' }]);
  };

  const handleRemoveComment = (index) => {
    const updatedCommentsData = [...commentsData];
    updatedCommentsData.splice(index, 1);
    setCommentsData(updatedCommentsData);
  };

  const handleAddDowntime = () => {
    setDowntimeData([...downtimeData, 
      { description: '', category: '', selectedSystemId: '', 
      start: null, end: null, caterId: '', elogUrl: '' }]);
  };

  const handleRemoveDowntime = (index) => {
    const updatedDowntimeData = [...downtimeData];
    updatedDowntimeData.splice(index, 1);
    setDowntimeData(updatedDowntimeData);
  };

  function createShiftInfo(event) {
    event.preventDefault();

    const formattedShiftDates = {
      startTime: moment(shiftDates.startTime).format('YYYY-MM-DDTHH:mm:ss'),
      endTime: moment(shiftDates.endTime).format('YYYY-MM-DDTHH:mm:ss'),
    };   

    console.log("Axios Request Payload:", {
      shiftDates: formattedShiftDates,
      commentsData,
      downtimeData: downtimeData.map(entry => ({
        ...entry,
        system_id: entry.selectedSystemId,
      })),
    });
    
    axios
      .post('/api/aosd-shift-reporting-backend/shiftDates', {
        shiftDates: formattedShiftDates,
        commentsData,
        // downtimeData,
        downtimeData: downtimeData.map(entry => ({
          ...entry,
          system_id: entry.selectedSystemId, // Include the system_id in the request
        })),
      })
      .then((response) => {
        console.log('Response:', response);
        return response.data;
      })
      .then((data) => {
        console.log('Data:', data);
        alert(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }



return (
  <Container>
    <h1>Shift Reporting Form</h1>
    <Form onSubmit={createShiftInfo}>
    <Row>
          <Col>
            <Form.Group controlId="startTime">
              <Form.Label>Start Time:</Form.Label>
              <DatePicker
                selected={shiftDates.startTime}
                onChange={(date) => handleShiftChange('startTime', date)}
                showTimeSelect
                dateFormat="Pp"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="endTime">
              <Form.Label>End Time: </Form.Label>
              <DatePicker
                selected={shiftDates.endTime}
                onChange={(date) => handleShiftChange('endTime', date)}
                showTimeSelect
                dateFormat="Pp"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {commentsData.map((comments, index) => (
          <div key={index} className="comment-container">
            <div className="comment-row">
              <Form.Group controlId={`comment${index}`} className="comment-group">
                <Form.Label>Comment:</Form.Label>
                <div className="comment-controls">
                  <Form.Control
                    as="textarea"
                    name="comments"
                    value={comments.comments}
                    onChange={(e) => handleCommentChange(index, e)}
                    required
                    className="comment-textarea"
                  />
                  <Button variant="danger" onClick={() => handleRemoveComment(index)}>
                    Remove Comment
                  </Button>
                </div>
              </Form.Group>
            </div>
          </div>
        ))}


      <Button variant="primary" onClick={handleAddComment}>
        Add Comment
      </Button>
<hr/>
      <h2>Downtime Entry</h2>
      <div className="downtime-header-row">
        <div className="downtime-header-label">Description</div>
          <div className="downtime-header-label">Category</div>
          <div className="downtime-header-label">System</div>
          <div className="downtime-header-label">Start Date/ Time</div>
          <div className="downtime-header-label">End Date/Time </div>
          <div className="downtime-header-label">Cater ID</div>
          <div className="downtime-header-label ">Elog URL</div>
      </div>

      {downtimeData.map((downtime, index) => (
        <div key={index} className="downtime-data-row">
          <textarea
            name="description"
            value={downtime.description}
            onChange={(e) => handleDowntimeChange(index, 'description', e.target.value)}
            className={index === 0 ? "expandable-textarea" : ""}
            required
          />
          <select
              name="category"
              value={downtime.category}
              onChange={(e) => handleDowntimeChange(index, 'category', e.target.value)}
          >
              <option value="" disabled>Select a Category</option>
              {staticCategory.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
          </select>
          <select
            name="selectedSystemId"
            value={downtime.selectedSystemId}
            onChange={(e) => handleDowntimeChange(index, 'selectedSystemId', e.target.value)}
          >
            <option value="" disabled>Select a System</option>
            {accelsystem.map((system) => (
              <option key={system.system_id} value={system.system_id}>
                {system.system_name}
              </option>
            ))}
          </select>

          <DatePicker
              selected={downtime.start}
              onChange={(date) => handleDowntimeChange(index, 'start', date)}
              showTimeSelect
              dateFormat="Pp"
              placeholderText="Select Date and Time"
              required
              className='date-height'
          />
    	    <DatePicker
                selected={downtime.end}
                onChange={(date) => handleDowntimeChange(index, 'end', date)}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Select Date and Time"
                required
                className='date-height'
          />
          <input
                type="text"
                name="caterId"
                value={downtime.caterId}
                onChange={(e) => handleDowntimeChange(index, 'caterId', e.target.value)}
          />
          <input
                type="text"
                name="elogUrl"
                value={downtime.elogUrl}
                onChange={(e) => handleDowntimeChange(index, 'elogUrl', e.target.value)}
          />
            <Button variant="danger" onClick={() => handleRemoveDowntime(index)}>
               Remove Row
            </Button>
        </div>
      ))}
      <Button variant="primary" onClick={handleAddDowntime}>
        Add Downtime Entry
      </Button><br/>
      <hr/>
      <Button variant="success" type="submit" className="submitShift">
        Submit Shift Data
      </Button>
    </Form>
  </Container>
);
}

export default ShiftInfo;