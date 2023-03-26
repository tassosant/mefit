import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchExercises } from "../../reduxParts/reducers/exerciseSlice";
import { fetchWorkouts } from "../../reduxParts/reducers/workoutSlice";
import WorkoutItemUpdate from "./WorkoutItemUpdate";

const WorkoutListFormUpdate =()=>{
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
            setLoaded(true);
        }
    },[statusExercises])
    const date = String(new Date())
    return(
        <>
            <h1>Exercises Update</h1>
            {loaded&& workouts.map(
                (workout,index)=>{
                    return <WorkoutItemUpdate key={`${date}_${index}`} workout={workout} exercises={exercises} dispatch={dispatch}/>
                }
            )}
        </>
    )
}

export default WorkoutListFormUpdate