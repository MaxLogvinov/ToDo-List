import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../servises/store';
import { getTodos } from '@/servises/thunks/todosThunk';
import { useEffect } from 'react';
import TodosList from '@/components/TodosList';
import { RootState } from '@/servises/store';
import { hydrateTodos } from '../servises/slices/todosSlice';
import Loading from '../components/Loading';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, todos } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      dispatch(hydrateTodos(parsedTodos));
    } else if (todos.length < 1) {
      dispatch(getTodos());
    }
  }, [dispatch, todos.length]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>Сервер временно недоступен. Попробуйте позже.</div>;
  }

  return (
    <>
      <TodosList />
    </>
  );
}
