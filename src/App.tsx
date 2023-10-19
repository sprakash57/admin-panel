import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TodoList from './routes/TodoList';
import Todo from './routes/Todo';
import DndKitDemo from './routes/DndKitDemo';

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path='/' element={<DndKitDemo />} />
          <Route path='/todos' element={<TodoList />} />
          <Route path='/todos/:id' element={<Todo />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
