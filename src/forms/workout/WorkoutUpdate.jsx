import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import workoutSlice, {
  updateWorkout,
} from './../../reduxParts/reducers/workoutSlice';
import { useSelector } from 'react-redux';

export default function WorkoutUpdate() {
  const { workoutId } = useParams();

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    type: '',
    complete: 'false',
    program: [],
    exercise: [],
  });

  const dispatch = useDispatch();

  const { workouts, workout } = useSelector((state) => state.workouts);

  const navigate = useNavigate();

  const { selectworkoutById } = workoutSlice.actions;

  useEffect(() => {
    if (workoutId === null || workoutId === 'undefined')
      navigate('/workouts/list');

    if (workoutId !== 'undefined' && workoutId !== null) {
      dispatch(selectworkoutById(workoutId));
    }

    if (workouts.length === 0) navigate('/workouts/list');
  }, [workoutId]);

  useEffect(() => {
    setFormData({ ...workout });
  }, [workout]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onCheckboxChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: JSON.stringify(e.target.checked),
    });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateWorkout(formData));
  };

  const { name, type, complete, program, exercise } = formData;

  return (
    <>
      WorkoutUpdate <br />
      {workouts.length > 0 && Object.keys(workout).length > 0 && (
        <form onSubmit={(e) => onSubmit(e)}>
          <label htmlFor='name'>Workout Name:</label>
          <br />
          <input
            type='text'
            id='name'
            name='name'
            aria-describedby='name'
            placeholder='Workout Name'
            onChange={(e) => {
              onChange(e);
            }}
            value={name}
            required={true}
          />
          <br />
          <label htmlFor='type'>Workout Type:</label>
          <br />
          <input
            type='text'
            id='type'
            name='type'
            aria-describedby='type'
            placeholder='Workout Type'
            onChange={(e) => {
              onChange(e);
            }}
            value={type}
            required={true}
          />
          <br />
          <label htmlFor='checked'>Complete: {JSON.stringify(complete)}</label>
          <br />
          <input
            type='checkbox'
            value={JSON.parse(complete)}
            id='complete'
            name='complete'
            checked={JSON.parse(complete)}
            onChange={(e) => {
              onCheckboxChange(e);
            }}
          />
          <button type='submit'>Submit</button>
        </form>
      )}
    </>
  );
}
