import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSchedule } from '../actions/scheduleActions'; 
import FormContainer from '../components/FormContainer';

const ShiftForm = ({ history }) => {
  const { employeeId } = useParams();

  const [date, setDate] = useState('');
  const [shift, setShift] = useState('');
  const [task, setTask] = useState(' ');
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
  
    console.log('Submitting form...');
    console.log('Employee ID:', employeeId);
    console.log('Date:', date);
    console.log('Shift:', shift);
    console.log('Task:', task);
  
    try {
      const response = await dispatch(createSchedule(employeeId, date, shift, task));
      console.log('Response:', response);
  
      if (response && response.data) {
        console.log('Shift created successfully');
       // history.push('/schedule'); 
      } else {
        console.log('Shift creation failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <>
      <Link to="/schedule" className="btn btn-light my-3">
        Povratak
      </Link>
      <FormContainer>
        <h1>Dodaj novu smjenut</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="date">
            <Form.Label>Datum</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="shift">
            <Form.Label>Smjena</Form.Label>
            <Form.Control
              as="select"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              required
            >
              <option value="">Odaberi smjenu</option>
              <option value="morning">Prijepodne</option>
              <option value="afternoon">poslijepodne</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="task">
            <Form.Label>Zadatak</Form.Label>
            <Form.Control
              type="string"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary">
           Dodaj smjenu
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShiftForm;
