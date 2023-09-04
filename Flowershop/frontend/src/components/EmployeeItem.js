import React, { useState } from 'react';
import ScheduleForm from './ScheduleForm';

const EmployeeItem = ({ employee }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <h3>{employee.name}</h3>
      {showForm ? (
        <ScheduleForm userId={employee._id} />
      ) : (
        <button onClick={() => setShowForm(true)}>Dodaj smjenu</button>
      )}
    </div>
  );
};

export default EmployeeItem;
