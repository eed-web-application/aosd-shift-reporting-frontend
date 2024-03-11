// ShiftInfo.jsx
// Front end for entering Shift Data
import React, { useState, useEffect } from 'react';
import './DowntimeEntry.css'; // Import the CSS file
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ShiftInfo() {
  const [shiftDates, setShiftDates] = useState({
    startTime: new Date(),
    endTime: new Date(),
  });


  const [commentsData, setCommentsData] = useState([{ comments: '' }]);

  const staticCategory = ["Configuration Change", "Tuning", "Accelerator Down", "User Off", "Scheduled Off"];
  
// Store the selected system_id in the form data
  const [downtimeData, setDowntimeData] = useState([
    { description: '', category: '', selectedSystemId: '', 
      start: null, end: null, caterId: '', elogUrl: ''},
  ]);

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

    axios
      .post('/api/aosd-shift-reporting-backend/shiftDates', {
        shiftDates: formattedShiftDates,
        commentsData,
        downtimeData,
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
    <div>
      <h1>Shift Reporting Form</h1>
      <form onSubmit={createShiftInfo}>
        <label>
          Start Time:
          <DatePicker
            selected={shiftDates.startTime}
            onChange={(date) => handleShiftChange('startTime', date)}
            showTimeSelect
            dateFormat="Pp"
            required
          />
        </label>
        <br />
        <label>
          End Time:
          <DatePicker
            selected={shiftDates.endTime}
            onChange={(date) => handleShiftChange('endTime', date)}
            showTimeSelect
            dateFormat="Pp"
            required
          />
        </label>
        <br /><br />
        {commentsData.map((comments, index) => (
          <div key={index}>
            <label>
              Comment:
	           <textarea
                name="comments"
                value={comments.comments}
                onChange={(e) => handleCommentChange(index, e)}
                required
              className="expandable-textarea"
              />
            </label>
            <button type="button" onClick={() => handleRemoveComment(index)}>
              Remove Comment
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddComment}>
          Add Comment
        </button>
        <br />
        <h2>Downtime Entry</h2>
        <div className="downtime-header-row">
          <div className="downtime-header-label">Description</div>
          <div className="downtime-header-label">Category</div>
          <div className="downtime-header-label">System</div>
          <div className="downtime-header-label">Start</div>
          <div className="downtime-header-label">End</div>
          <div className="downtime-header-label">Cater ID</div>
          <div className="downtime-header-label">Elog URL</div>
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
            <button type="button">
              Add Program
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddDowntime}>
          Add Downtime Entry
        </button>
        <br />
        <button type="submit">Submit Shift Data</button>
      </form>
    </div>
  );
}

export default ShiftInfo;
