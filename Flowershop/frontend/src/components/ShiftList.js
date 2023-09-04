import React from 'react';

const ShiftList = ({ shifts }) => {
  return (
    <ul>
      {shifts.map(shift => (
        <li key={shift.id}>
          Datum: {shift.date}, Smjena: {shift.shift}
        </li>
      ))}
    </ul>
  );
};

export default ShiftList;
