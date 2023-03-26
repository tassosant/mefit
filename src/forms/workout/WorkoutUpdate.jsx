import React from 'react'
import { useParams } from 'react-router'

export default function WorkoutUpdate() {

    const { workoutId } = useParams();

  return (
      <>
          WorkoutUpdate
          id: {workoutId}
      </>
  )
}
