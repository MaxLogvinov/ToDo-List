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
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    hydrateTodos(state, action) {
      state.todos = action.payload;
    },
    addTodo(state, action) {
      const maxId = state.todos.length > 0 ? Math.max(...state.todos.map(todo => todo.id)) : 0;
      const newTodo = {
        id: maxId + 1,
        title: action.payload,
        completed: false,
        userId: 1
      };
      state.todos.unshift(newTodo);
      localStorage.setItem('todos', JSON.stringify(state.todos));
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
        localStorage.setItem('todos', JSON.stringify(action.payload));
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch episodes';
      });
  }
});

export const { toggleCompleted, deleteTodo, hydrateTodos, addTodo } = todosSlice.actions;
export default todosSlice.reducer;
