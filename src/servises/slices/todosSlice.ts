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
    toggleCompleted(state, action) {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    }
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

export const { toggleCompleted, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
