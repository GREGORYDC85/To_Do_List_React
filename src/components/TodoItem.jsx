import { useState } from "react";

export default function TodoItem({ todo, onUpdate, onDelete }) {
  const [editText, setEditText] = useState(todo.text);

  const toggleDone = () => {
    onUpdate({ done: !todo.done });
  };

  const startEdit = () => {
    onUpdate({ editing: true });
  };

  const saveEdit = () => {
    if (editText.trim() !== "") {
      onUpdate({ text: editText.trim(), editing: false });
    }
  };

  const cancelEdit = () => {
    setEditText(todo.text);
    onUpdate({ editing: false });
  };

  return (
    <li className={todo.done ? "done" : ""}>
      {todo.editing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <div className="todo-actions">
            <button onClick={saveEdit}>✅</button>
            <button onClick={cancelEdit}>❌</button>
          </div>
        </>
      ) : (
        <>
          <div className="todo-main">
            <span>{todo.text}</span>
          </div>

          <div className="todo-details">
            <span className={`priority ${todo.priority}`}>
              {todo.priority}
            </span>
            {todo.deadline && (
              <span className="deadline">
                📅 {new Date(todo.deadline).toLocaleDateString("fr-FR")}
              </span>
            )}
          </div>

          <div className="todo-actions">
            <button onClick={toggleDone}>
              {todo.done ? "↩️" : "✔️"}
            </button>
            <button onClick={startEdit}>✏️</button>
            <button onClick={onDelete}>🗑️</button>
          </div>
        </>
      )}
    </li>
  );
}
