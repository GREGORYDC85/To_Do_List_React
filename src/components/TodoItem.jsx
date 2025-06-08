import { useState } from "react";

export default function TodoItem({ todo, onUpdate, onDelete }) {
  const [editText, setEditText] = useState(todo.text);

  const toggleDone = () => {
    onUpdate({ ...todo, done: !todo.done });
  };

  const startEdit = () => {
    onUpdate({ ...todo, editing: true });
  };

  const saveEdit = () => {
    if (editText.trim() !== "") {
      onUpdate({ ...todo, text: editText, editing: false });
    }
  };

  const cancelEdit = () => {
    setEditText(todo.text);
    onUpdate({ ...todo, editing: false });
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
          <div>
            <button onClick={saveEdit}>✅</button>
            <button onClick={cancelEdit}>❌</button>
          </div>
        </>
      ) : (
        <>
          <div>
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
          <div>
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
