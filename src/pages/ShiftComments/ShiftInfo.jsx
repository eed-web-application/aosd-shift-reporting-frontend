// ShiftInfo.jsx
// Front end for entering Shift Data
import React, { useState } from 'react';
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

  const handleShiftChange = (name, date) => {
    setShiftDates({ ...shiftDates, [name]: date });
  };

  const handleCommentChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCommentsData = [...commentsData];
    updatedCommentsData[index] = { ...updatedCommentsData[index], [name]: value };
    setCommentsData(updatedCommentsData);
  };

  const handleAddComment = () => {
    setCommentsData([...commentsData, { comments: '' }]);
  };

  const handleRemoveComment = (index) => {
    const updatedCommentsData = [...commentsData];
    updatedCommentsData.splice(index, 1);
    setCommentsData(updatedCommentsData);
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
      <h1>Shift Data & Comments Form</h1>
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
              <input
                type="text"
                name="comments"
                value={comments.comments}
                onChange={(e) => handleCommentChange(index, e)}
                required
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
        <button type="submit">Submit Shift Data</button>
      </form>
    </div>
  );
}

export default ShiftInfo;
