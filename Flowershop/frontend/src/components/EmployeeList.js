import React from 'react';
import ShiftList from './ShiftList';

const EmployeeList = ({ employees, selectedEmployee, onEmployeeClick }) => {
  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>
            {employee.name}{' '}
            <button onClick={() => onEmployeeClick(employee.id)}>Dodaj smjenu</button>
            {selectedEmployee === employee.id && (
              <div>
                <h3>Shifts for {employee.name}</h3>
                <ShiftList shifts={employee.shifts} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
