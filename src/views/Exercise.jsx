import { Navigate } from "react-router"
import { Link } from "react-router-dom";
import ExerciseFormAdd from '../forms/exercise/ExerciseFormAdd';

const Exercise = ()=>{
    const handleAdd =(event)=>{
        
    }
    return(
        <>
        {/* <Link to="/exerciseAdd" className="btn"></Link> */}
        <button onClick={handleAdd((event)=>{return <ExerciseFormAdd/>})}>Add an exercise</button>
        </>
    )
}

export default Exercise