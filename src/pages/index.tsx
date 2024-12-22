import { useDispatch } from 'react-redux';
import { AppDispatch } from '../servises/store';
import { getTodos } from '@/servises/thunks/todosThunk';
import { useEffect } from 'react';
import TodosList from '@/components/TodosList';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <>
      <TodosList />
    </>
  );
}
