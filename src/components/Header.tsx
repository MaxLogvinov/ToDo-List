import styles from '../styles/components/Header.module.scss';

export default function Header() {
  return (
    <header>
      <h1 className={styles.title}>ToDo List</h1>
    </header>
  );
}
