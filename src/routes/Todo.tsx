import { useParams } from 'react-router-dom';

const Todo = () => {
  const { id } = useParams();
  return <div>Todo {id}</div>;
};

export default Todo;
