import React from 'react'
import { useParams } from 'react-router'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import workoutSlice from './../../reduxParts/reducers/workoutSlice';
import { useSelector } from 'react-redux';



export default function WorkoutUpdate() {

    const { workoutId } = useParams();

    const [workoutToUpdate, setWorkoutToUpdate] = useState(null);

    const dispatch = useDispatch();

    const {workout} = useSelector(state => state.workouts)

    const { selectworkoutById } = workoutSlice.actions;

    useEffect(() => {
        if (workoutId !== 'undefined' && workoutId !== null)
            dispatch(selectworkoutById(workoutId));
    }, [workoutId])

    useEffect(() => {
        setWorkoutToUpdate(workout);
    }, [workout])


  return (
      <>
          WorkoutUpdate <br/>
          {workoutToUpdate !== null && workoutToUpdate.name}
      </>
  )
}
