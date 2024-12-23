import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import styles from '../../styles/AddToDo.module.scss';
import { useDispatch } from 'react-redux';
import { addTodo } from '@/servises/slices/todosSlice';

export default function AddToDo() {
  const [text, setText] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSave = async () => {
    if (text.trim() === '') {
      alert('Введите текст задачи!');
      return;
    }
    await dispatch(addTodo(text));
    router.push(`/`);
  };

  return (
    <div className={styles.container}>
      <TextField
        multiline
        fullWidth
        label="Введите текст"
        id="fullWidth"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div className={styles.buttons}>
        <Button
          variant="text"
          onClick={() => {
            router.push(`/`);
          }}
        >
          Вернуться
        </Button>
        <Button type="submit" variant="contained" onClick={handleSave}>
          Сохранить
        </Button>
      </div>
    </div>
  );
}
