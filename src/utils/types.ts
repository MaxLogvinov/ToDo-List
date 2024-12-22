export interface Todos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodosState {
  todos: Todos[];
  loading: boolean;
  error: string | null;
}
