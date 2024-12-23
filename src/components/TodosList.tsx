import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import styles from '../styles/components/TodosList.module.scss';
import { toggleCompleted, deleteTodo } from '../servises/slices/todosSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/servises/store';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

export default function TodosList() {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const visibleTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <List className={styles.list}>
      <Fab
        className={styles.button}
        color="primary"
        aria-label="add"
        onClick={() => router.push(`/add-todo`)}
      >
        <AddIcon />
      </Fab>
      {visibleTodos.map(todo => (
        <React.Fragment key={todo.id}>
          <ListItem
            className={styles.listItem}
            onClick={() => router.push(`/todo/${todo.id}`)}
            secondaryAction={
              <IconButton
                onClick={e => {
                  e.stopPropagation();
                  dispatch(deleteTodo(todo.id));
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            }
          >
            <Checkbox
              checked={todo.completed}
              onClick={e => e.stopPropagation()}
              onChange={() => dispatch(toggleCompleted(todo.id))}
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
      <Stack spacing={2} className={styles.pagination}>
        <Pagination
          count={Math.ceil(todos.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </List>
  );
}
