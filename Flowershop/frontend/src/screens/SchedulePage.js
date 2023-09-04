import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SchedulePage() {
  const [employeeUsers, setEmployeeUsers] = useState([]);

  useEffect(() => {
    async function fetchEmployeeUsers() {
      try {
        const response = await fetch('/api/users'); // Adjust the API endpoint as needed
        const data = await response.json();
        
        const employeeUsersData = data.filter(user => user.isEmployee === true);
        setEmployeeUsers(employeeUsersData);
      } catch (error) {
        console.error('Error fetching employee users:', error);
      }
    }

    fetchEmployeeUsers();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Stranica rasporeda</h1>
      <div>
        {employeeUsers.map(user => (
          <div
            key={user._id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '20px',
            }}
          >
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.isEmployee ? 'Employee' : 'Not an Employee'}</p>
            <Link to={`/admin/create-schedule/${user._id}`}>
              <button>Dodaj smjenu</button>
            </Link>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default SchedulePage;
