import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchWorkouts } from './../../reduxParts/reducers/workoutSlice';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router';

function WorkoutList() {
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { workouts, status, error } = useSelector((state) => state.workouts);

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [dispatch]);

  const onEditBtnClick = (workoutId) => {
    navigate(`/workouts/edit/${workoutId}`);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Type</th>
            <th>Complete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {status === 'succeeded' &&
            workouts.map((workout) => (
              <tr key={uuidv4()}>
                <td>{workout.name}</td>
                <td>{workout.type}</td>
                <td>{workout.complete}</td>
                <td>
                  <button
                    type='button'
                    onClick={() => onEditBtnClick(workout.id)}
                  >
                    <i className='fa-solid fa-pen-to-square'></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default WorkoutList;
