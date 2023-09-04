import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ScheduleScreen() {
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const userId = userInfo._id;
  console.log("userId:", userId); 

  const [schedule, setSchedule] = useState([]);
  console.log("schedule:", schedule); 

  useEffect(() => {
    const fetchUserSchedule = async () => {
      try {
        const response = await fetch(`/api/schedules/${userId}`);
        console.log("Response:", response); 

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data); 
        setSchedule(data);
      } catch (error) {
        console.error("Error fetching user schedule:", error);
      }
    };

    fetchUserSchedule();
  }, [userId]);

  return (
    <div>
      <h1>Your Schedule</h1>
      {schedule.length === 0 ? (
        <p>Nemate smjena</p>
      ) : (
        <ul>
          {schedule.map((entry) => (
            <li key={entry._id}>
              <strong>Datum:</strong> {new Date(entry.date).toLocaleDateString()}<br />
              <strong>Smjena:</strong> {entry.shift}<br />
              <strong>Zadatak:</strong> {entry.task}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ScheduleScreen;
