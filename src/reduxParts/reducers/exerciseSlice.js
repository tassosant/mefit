import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = process.env.REACT_APP_API_LOCAL_URL;
const apiKey = process.env.REACT_APP_API_LOCAL_KEY;

/**
 * export const selectItemsByIds = createAsyncThunk(
  'items/selectItemsByIds',
  async (ids) => {
    const response = await fetch(`/api/items?ids=${ids.join(',')}`);
    const data = await response.json();
    return data;
  }
);
 */

// export const selectExercisesByIds = createAsyncThunk("exercise/selectExercisesByIds", async (state,ids) => {
//   const selectedItems = [];
//   console.log(ids);
//   ids.forEach((id) => {
//     const item = state.exercises.exercise.find((item) => item.id === id);
//     if (item) {
//       selectedItems.push(item);
//     }
//   });
//   return selectedItems;
// });


export const fetchExercises = createAsyncThunk("exercise/fetchExercises", async () => {
  const response = await fetch(`${apiUrl}exercise`);
  const data = await response.json();
  return data;
});

export const addExercise = createAsyncThunk("exercise/addExercise", async (exercise) => {
  
  
  const response = await fetch(`${apiUrl}exercise`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'x-api-key':apiKey
    },
    body: JSON.stringify(exercise),
  });
  const data = await response.json();
  return data;
});

export const updateExercise = createAsyncThunk("exercise/updateExercise", async (exercise) => {
  const response = await fetch(`${apiUrl}exercise/${exercise.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      'x-api-key':apiKey
    },
    body: JSON.stringify(exercise),
  });
  const data = await response.json();
  return data;
});

export const deleteExercise = createAsyncThunk("exercise/deleteExercise", async (id) => {
  const response = await fetch(`${apiUrl}exercise${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
});

const initialState = {
  exercise:{
    exercise: [],
    status: "idle",
    error: null,
  }
  // exercise: [],
  // status: "idle",
  // error: null,
};

const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers:{
    selectExercisesByIds :(state, action) =>{
      console.log(action.payload);
      console.log(state.exercise.exercise);
       return state.exercise.exercise.filter((exercise) => action.payload.includes(exercise.id))
      }
  }
      
  
  ,
  extraReducers: (builder) => {
    builder
      .addCase(fetchExercises.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exercise = action.payload;
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // .addCase(selectExercisesByIds.pending,(state)=>{
      //   console.log('pending');
      //   state.status = "loading";
      //   state.error = null;
      // })
      // .addCase(selectExercisesByIds.fulfilled, (state, action) => {
      //   console.log('fulfilled');
      //   state.status = "succeeded";
      //   state.exercise = action.payload;
      // })
      // .addCase(selectExercisesByIds.rejected, (state, action) => {
      //   console.log('failed');
      //   state.status = "failed";
      //   state.error = action.error.message;
      // })
      .addCase(addExercise.fulfilled, (state, action) => {
        state.exercise.push(action.payload);
      })
      .addCase(updateExercise.fulfilled, (state, action) => {
        const index = state.exercise.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.exercise[index] = action.payload;
        }
      })
      .addCase(deleteExercise.fulfilled, (state, action) => {
        state.exercise = state.exercise.filter((item) => item.id !== action.payload);
      })
      .addCase(selectExercisesByIds, (state,ids) =>{
        return state.exercise.exercise.filter((exercise) => ids.includes(exercise.id))});
  },
});

export const selectExerciseById = (state, id) => state.exercise.exercise.find((item) => item.id === id);

// export const selectExercisesByIds = (state, ids) =>
//   state.exercise.exercise.filter((exercise) => ids.includes(exercise.id));

export const selectExercisesStatus = (state) => state.exercise.status;

export const selectExercisesError = (state) => state.exercise.error;

export const{ selectExercisesByIds} =exerciseSlice.actions;

export default exerciseSlice.reducer;
