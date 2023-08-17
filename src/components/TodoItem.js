import React, { useState } from 'react';
import './TodoItem.css'

function TodoItem({ todo, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    if (editedText.trim() !== '') {
      onEdit(todo.id, editedText);
      setIsEditing(false);
    }
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <span className='added-item'>{todo.text}</span>
      )}
      <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>Delete</button>
      {isEditing && <button onClick={handleEdit}>Save</button>}
    </div>
  );
}

export default TodoItem;
