import { useDispatch } from 'react-redux';
import { AppDispatch } from '../servises/store';
import { getTodos } from '@/servises/thunks/todosThunk';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return <></>;
}
