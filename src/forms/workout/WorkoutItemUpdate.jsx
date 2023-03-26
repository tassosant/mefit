import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { selectExercisesByIds, updateExercise } from "../../reduxParts/reducers/exerciseSlice";
import { updateWorkout } from "../../reduxParts/reducers/workoutSlice";
import ExerciseItem from "../exercise/ExerciseItem";

const WorkoutItemUpdate = ({exercises, workout, dispatch})=>{
    // const dispatch = useDispatch();
    const [loaded,setLoaded]=useState(false);
    const [formData,setFormData]=useState(workout);
    const [exercisesPool,setExercisesPool]=useState(exercises);
    const [workoutStable,setWorkoutStable]=useState(workout);
    // const {state:exerciseState, exercise:exercisesInit, status: statusExercises} =useSelector((state)=>state.exercises);
    console.log(formData);
    useEffect(()=>{
        if(!loaded){
            console.log(exercises);
            dispatch(selectExercisesByIds(workout.exercise))
            setWorkoutStable(workout);
            if(exercisesPool!=exercises)
                setExercisesPool(exercises)
            // if(statusExercises=='succeeded'){
            //     setExercisesPool(exercisesInit)
            // }
            setLoaded(true)     
        }
        if(workoutStable!=workout){
            setWorkoutStable(workout)
        }   
        // if(loaded){
        //     setExercisesPool(exercises)
        // }
    },[dispatch,workout,loaded,exercisesPool])
    // useEffect(()=>{
    //     if(statusExercises=='succeeded'){
    //             setExercisesPool(exercises)
    //             setLoaded(true);
    //             console.log('mpika');
    //         }
    // },[statusExercises])
    const handleSubmit =(event)=>{
        // event.preventDefault();
        console.log('Submit button Clicked');
        // setFormData(formData)
        const itemPayload= {id:workout.id,name: formData.name, type: formData.type, complete: formData.complete, exercise: formData.exercise};
        dispatch(updateWorkout(itemPayload));
    }
    const date = String(new Date());
    return(
    <>
    <form onSubmit={handleSubmit}>
        <div>
            <label>
                Name:
                <input
                    type="text"
                    value={formData.name}
                    // defaultValue={exercise.name}
                    onChange={(event) =>
                    setFormData({ ...formData, name: event.target.value })
                }/>
                
            </label>
        </div>
        <div>
            <label>
                Type:
                <input
                    type="text"
                    value={formData.type}
                    // defaultValue={exercise.desc}
                    onChange={(event) =>
                    setFormData({ ...formData, type: event.target.value })
                }/>
                
            </label>
        </div>
        <div>
            <label>
                Complete:
                <input
                    type="text"
                    value={formData.complete}
                    // defaultValue={exercise.tmg}
                    onChange={(event) =>
                    setFormData({ ...formData, complete: event.target.value })
                }/>
               
            </label>
        </div>
        <div>
            <label>
                Exercises:
                {/* <input
                    type="text"
                    value={formData.repetitions}
                    // defaultValue={exercise.repetitions}
                    onChange={(event) =>
                    setFormData({ ...formData, repetitions: event.target.value })
                }/> */}
                
                {loaded&& exercisesPool.map((exercise,index)=>{
                    return (
                        <div key={`${date}_${index}`}>
                            <ExerciseItem  exercise={exercise}/><br></br>
                        </div>
                    )
                })}
            </label>
        </div>
        <button type="submit">Save</button>
    </form>
    </>
    )
}
export default WorkoutItemUpdate