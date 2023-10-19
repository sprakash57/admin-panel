import React from 'react';
import { TextField } from 'components/common/TextField';
import { baseUrl } from 'helpers/constants';

export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
  segment: string;
  brand: string;
}

const Home = () => {
  const [title, setTitle] = React.useState('');
  const [todo, setTodo] = React.useState<TodoItem | null>(null);
  const [feedback, setFeedback] = React.useState('');
  const [loader, setLoader] = React.useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoader(true);
    const payload = { title };
    try {
      const resp = await fetch(baseUrl.createTodo, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await resp.json();
      setTodo(data);
      setTitle('');
    } catch (error) {
      setFeedback((error as { message: string }).message);
    } finally {
      setLoader(false);
    }
  };

  React.useEffect(() => {
    const checkSystem = async () => {
      const resp = await fetch(baseUrl.health);
      const data = (await resp.json()) as { message: string };
      setFeedback(data.message);
    };
    checkSystem();
  }, []);

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input name='todo' value={title} onChange={e => setTitle(e.target.value)} />
        <button type='submit'>Add</button>
      </form>
      <small>{loader ? 'Loading...' : feedback}</small>
      {todo && (
        <TextField variant='S1' htmlTag='p'>
          {todo.title} is create at {new Date(todo.createdAt).toLocaleDateString()}
        </TextField>
      )}
    </section>
  );
};

export default Home;
