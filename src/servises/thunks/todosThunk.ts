import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Todos } from '@/utils/types';

const TODOS_API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const getTodos = createAsyncThunk<Todos[], void, { rejectValue: string }>(
  'getTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(TODOS_API_URL);
      return response.data;
    } catch {
      return rejectWithValue('Failed to fetch todos');
    }
  }
);
