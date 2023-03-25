import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExercises } from "../../reduxParts/reducers/exerciseSlice";
import ExerciseItem from "./ExerciseItem";

const ExerciseGetAll = ()=>{
    const dispatch = useDispatch();
    const {exercise, status} = useSelector((state)=>state.items);
    const [exercisesFetched,setExercisesFetched] =useState([])
    const [loaded,setLoaded]=useState(false)
    
    useEffect(()=>{
        if(!loaded){
            
                dispatch(fetchExercises());
                
                console.log(exercise);
        
        }
    },[dispatch])

    useEffect(() => {
        if(status === "succeeded")
            setExercisesFetched(exercise)
    }, [status])

    const handleGetAll = (event)=>{
        // dispatch(fetchExercises());
            console.log(exercise);
            // setExercisesFetched([...exercise]);
            setLoaded(true)
            
    }

    const date = String(new Date());
    return(
        <>
        <button onClick={handleGetAll}>Get All Exercises</button>
        {loaded&& <>
            {exercisesFetched.map((exercise,index)=>{
                return(
                    <div key={`${date}_${index}`}>
                        <ExerciseItem exercise={exercise}/>
                    </div>
                )
            })}
        </>}
        </>
    )
}
export default ExerciseGetAll