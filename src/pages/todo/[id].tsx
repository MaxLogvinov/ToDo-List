import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/servises/store';
import styles from '@/styles/TodoDetails.module.scss';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { deleteTodo, toggleCompleted } from '../../servises/slices/todosSlice';

export default function TodoDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const todos = useSelector((state: RootState) => state.todos.todos);
  const todo = todos.find(t => t.id === Number(id));

  if (!todo) {
    return <p className={styles.error}>Задача не найдена</p>;
  }

  return (
    <div className={styles.todoDetails}>
      <h1 className={styles.title}>Детали задачи</h1>
      <List className={styles.list}>
        <ListItem
          secondaryAction={
            <IconButton
              onClick={() => {
                dispatch(deleteTodo(todo.id));
                router.push(`/`);
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
          }
        >
          <Checkbox
            checked={todo.completed}
            onChange={() => {
              dispatch(toggleCompleted(todo.id));
            }}
          />
          <div className={styles.block}>
            <ListItemText
              primary={`Название: ${todo.title}`}
              secondary={`ID: ${todo.id}`}
              className={todo.completed ? styles.completed : ''}
            />

            <p>Статус: {todo.completed ? 'Выполнено' : 'Не выполнено'}</p>
          </div>
        </ListItem>
        <Button
          variant="text"
          onClick={() => {
            router.push(`/`);
          }}
        >
          Вернуться
        </Button>
      </List>
    </div>
  );
}
