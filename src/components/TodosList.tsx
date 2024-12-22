import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import styles from '../styles/components/TodosList.module.scss';
import { toggleCompleted, deleteTodo } from '../servises/slices/todosSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/servises/store';

export default function TodosList() {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  console.log(todos);

  const handleToggleCompleted = (id: number) => {
    dispatch(toggleCompleted(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <List className={styles.list}>
      {todos.map(todo => (
        <React.Fragment key={todo.id}>
          <ListItem
            secondaryAction={
              <IconButton onClick={() => handleDeleteTodo(todo.id)}>
                <DeleteForeverIcon />
              </IconButton>
            }
          >
            <Checkbox checked={todo.completed} onChange={() => handleToggleCompleted(todo.id)} />
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
