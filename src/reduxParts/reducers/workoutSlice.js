import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = process.env.REACT_APP_API_LOCAL_URL;
const apiKey = process.env.REACT_APP_API_LOCAL_KEY;

export const fetchWorkouts = createAsyncThunk(
  'workout/fetchworkouts',
  async () => {
    const response = await fetch(`${apiUrl}workout`);
    const data = await response.json();
    return data;
  }
);

export const addWorkout = createAsyncThunk(
  'workout/addWorkout',
  async (workout) => {
    const response = await fetch(`${apiUrl}workout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(workout),
    });
    const data = await response.json();
    return data;
  }
);

export const updateWorkout = createAsyncThunk(
  'workout/updateWorkout',
  async (workout) => {
    const response = await fetch(`${apiUrl}workout/${workout.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(workout),
    });
    const data = await response.json();
    return data;
  }
);

export const deleteWorkout = createAsyncThunk(
  'workout/deleteWorkout',
  async (id) => {
    const response = await fetch(`${apiUrl}workout${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  }
);

const initialState = {
  workouts: [],
  workout: {},
  status: 'idle',
  error: '',
};
  //   workout: [],
  //   status: "idle",
  //   error: null,

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    selectworkoutById: (state, action) => {
      const { payload } = action;
      console.log(payload);
      state.workout = state.workouts.find((item) => item.id === Number(payload));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkouts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWorkouts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.workouts = action.payload;
      })
      .addCase(fetchWorkouts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addWorkout.fulfilled, (state, action) => {
        state.workouts.push(action.payload);
      })
      .addCase(updateWorkout.fulfilled, (state, action) => {
        const index = state.workouts.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.workouts[index] = action.payload;
        }
      })
      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.workouts = state.workouts.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

// export const selectworkoutById = (state, id) =>
//   state.workout.workouts.find((item) => item.id === id);

export const selectworkoutsByIds = (state, ids) =>
  state.workouts.workouts.filter((workout) => ids.includes(workout.id));

export const selectworkoutsStatus = (state) => state.workout.status;

export const selectworkoutsError = (state) => state.workout.error;

export default workoutSlice;

// export default workoutSlice.reducer;
