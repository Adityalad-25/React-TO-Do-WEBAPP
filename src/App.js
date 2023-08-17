import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const titleText = 'Todo Appp';

  useEffect(() => {
    let timeoutId;

    if (titleIndex < titleText.length) {
      timeoutId = setTimeout(() => {
        setTitleIndex(titleIndex + 1);
      }, 500); 
    }
     return () => clearTimeout(timeoutId);
  }, [titleIndex]);

  useEffect(() => {
    if (titleIndex === titleText.length) {
      setTitleIndex(0);
    }
  }, [titleIndex, titleText]);


  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo }]);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      <div className="App">
        <h1>{titleText.substring(0, titleIndex)}</h1>
        <div className="add-todo">
          <input className="input-todo"
            type="text"
            placeholder="Add a new todo ..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button className="btn" onClick={handleAddTodo}>Add</button>
        </div>
        <TodoList
          todos={todos}
          onDelete={handleDeleteTodo}
          onEdit={handleEditTodo}
        />
      </div>
    </div>
  );
}

export default App;
