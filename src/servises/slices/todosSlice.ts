import { createSlice } from '@reduxjs/toolkit';
import { getTodos } from '../thunks/todosThunk';
import { TodosState } from '@/utils/types';

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // clearEpisodes(state) {
    //   state.episodes = [];
    // }
  },
  extraReducers: builder => {
    builder
      .addCase(getTodos.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch episodes';
      });
  }
});

export const {} = todosSlice.actions;
export default todosSlice.reducer;
