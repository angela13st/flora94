import React, { useState } from 'react';
import axios from 'axios';

const ScheduleForm = ({ userId }) => {
  const [date, setDate] = useState('');
  const [shift, setShift] = useState('morning');
  const [task, setTask] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/api/schedules', { userId, date, shift, task }) 
      .then(response => {
        
        console.log('Shift added:', response.data);
        
        setDate('');
        setShift('morning');
        setTask(''); 
      })
      .catch(error => {
        console.error('Shift creation failed:', error);
        
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Date:</label>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <label>Shift:</label>
      <select value={shift} onChange={e => setShift(e.target.value)}>
        <option value="morning">Prijepodne</option>
        <option value="afternoon">Poslijepodne</option>
      </select>
      <label>Task:</label> 
      <input type="text" value={task} onChange={e => setTask(e.target.value)} />
      <button type="submit">Dodaj smjenu</button>
    </form>
  );
};

export default ScheduleForm;
