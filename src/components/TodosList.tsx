import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import styles from '../styles/components/TodosList.module.scss';
import { toggleCompleted, deleteTodo } from '../servises/slices/todosSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/servises/store';

export default function TodosList() {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(todos);

  const handleToggleCompleted = (id: number) => {
    dispatch(toggleCompleted(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleNavigateToTodo = (id: number) => {
    router.push(`/todo/${id}`);
  };

  return (
    <List className={styles.list}>
      {todos.map(todo => (
        <React.Fragment key={todo.id}>
          <ListItem
            className={styles.listItem}
            onClick={() => handleNavigateToTodo(todo.id)}
            secondaryAction={
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  handleDeleteTodo(todo.id);
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            }
          >
            <Checkbox
              checked={todo.completed}
              onChange={e => {
                e.stopPropagation();
                handleToggleCompleted(todo.id);
              }}
            />
            <ListItemText
              primary={todo.title}
              secondary={`ID: ${todo.id}`}
              className={todo.completed ? styles.completed : ''}
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
}
