import { useState } from "react";
import { useDispatch } from "react-redux"
import { updateExercise } from "../../reduxParts/reducers/exerciseSlice";

const ExerciseItemUpdate = ({exercise})=>{
    const dispatch = useDispatch();
    const [formData,setFormData]=useState(exercise);
    console.log(formData);
    const handleSubmit =(event)=>{
        // event.preventDefault();
        console.log('Submit button Clicked');
        // setFormData(formData)
        const itemPayload= {id:exercise.id,name: formData.name, desc: formData.desc, repetitions: formData.repetitions, tmg: formData.tmg, img: formData.img, vid: formData.vid };
        dispatch(updateExercise(itemPayload));
    }
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
                Description:
                <input
                    type="text"
                    value={formData.desc}
                    // defaultValue={exercise.desc}
                    onChange={(event) =>
                    setFormData({ ...formData, desc: event.target.value })
                }/>
                
            </label>
        </div>
        <div>
            <label>
                Muscle Group:
                <input
                    type="text"
                    value={formData.tmg}
                    // defaultValue={exercise.tmg}
                    onChange={(event) =>
                    setFormData({ ...formData, tmg: event.target.value })
                }/>
               
            </label>
        </div>
        <div>
            <label>
                Repetitions:
                <input
                    type="text"
                    value={formData.repetitions}
                    // defaultValue={exercise.repetitions}
                    onChange={(event) =>
                    setFormData({ ...formData, repetitions: event.target.value })
                }/>
                
            </label>
        </div>
        <div>
            <label>
                Image:
                <input
                    type="text"
                    value={formData.img}
                    // defaultValue={exercise.img}
                    onChange={(event) =>
                    setFormData({ ...formData, img: event.target.value })
                }/>
                
            </label>
        </div>
        <div>
            <label>
                Video:
                <input
                    type="text"
                    value={formData.vid}
                    // defaultValue={exercise.vid}
                    onChange={(event) =>
                    setFormData({ ...formData, vid: event.target.value })
                }/>
                
            </label>
        </div>
        <div>
            <label>
                Complete:
                <input
                    type="text"
                    value={formData.complete}
                    // defaultValue={exercise.complete}
                    onChange={(event) =>
                    setFormData({ ...formData, complete: event.target.value })
                }/>
            </label>
        </div>
        <div>
            <label>
                Workouts:
                <input
                    type="text"
                    value={formData.workout}
                    // defaultValue={exercise.workout}
                    onChange={(event) =>
                    setFormData({ ...formData, workout: event.target.value })
                }/>
            </label>
        </div>
        <button type="submit">Save</button>
    </form>
    </>
    )
}
export default ExerciseItemUpdate