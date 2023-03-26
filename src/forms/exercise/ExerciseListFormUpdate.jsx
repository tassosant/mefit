import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchExercises } from "../../reduxParts/reducers/exerciseSlice";
import { fetchWorkouts } from "../../reduxParts/reducers/workoutSlice";
import ExerciseItemUpdate from "./ExerciseItemUpdate";

const ExerciseListFormUpdate =()=>{
    const dispatch = useDispatch();
    const [loaded,setLoaded]=useState(false)
    const {workout:workoutsInit, status: statusWorkouts} =useSelector((state)=>state.workouts);
    const {exercise:exercisesInit, status: statusExercises} =useSelector((state)=>state.exercises);
    const [workouts,setWorkouts] =useState([]);
    const [exercises,setExercises]=useState([]);
    useEffect(()=>{
        if(!loaded){
            dispatch(fetchWorkouts());
            dispatch(fetchExercises());
        }
    },[dispatch])
    useEffect(()=>{
        if(statusWorkouts==="succeeded"){
            setWorkouts(workoutsInit);
        }
    },[statusWorkouts])
    useEffect(()=>{
        if(statusExercises==="succeeded"){
            setExercises(exercisesInit);
            console.log(exercises);
        }
    },[statusExercises])
    const date = String(new Date())
    return(
        <>
            <h1>Exercises Update</h1>
            {exercises.map(
                (exercise,index)=>{
                    return <ExerciseItemUpdate key={`${date}_${index}`} exercise={exercise}/>
                }
            )}
        </>
    )
}

export default ExerciseListFormUpdate