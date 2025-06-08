import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import TodoItem from "../components/TodoItem.jsx";

export default function ToDoApp() {
  const { user } = useAuth();           // 🔒 Récupère l'utilisateur connecté
  const navigate = useNavigate();       // 🔄 Pour redirection

  // 🔐 Redirige vers /login si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTodo, setNewTodo] = useState("");
  const [priority, setPriority] = useState("moyenne");
  const [deadline, setDeadline] = useState("");
  const [filter, setFilter] = useState("all");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.className = dark ? "dark" : "";
  }, [dark]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    setTodos([
      ...todos,
      {
        text: newTodo.trim(),
        done: false,
        editing: false,
        priority,
        deadline,
      },
    ]);

    setNewTodo("");
    setPriority("moyenne");
    setDeadline("");
  };

  const updateTodo = (index, updated) => {
    const newTodos = [...todos];
    newTodos[index] = updated;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-container">
      <h1>📝 Ma To-Do List</h1>

      <form onSubmit={addTodo}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Nouvelle tâche..."
          className="task-input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="moyenne">Priorité Moyenne</option>
          <option value="haute">Haute</option>
          <option value="basse">Basse</option>
        </select>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="date-input"
        />
        <button type="submit">Ajouter</button>
      </form>

      <div className="filters">
        <button onClick={() => setFilter("all")}>Toutes</button>
        <button onClick={() => setFilter("done")}>Terminées</button>
        <button onClick={() => setFilter("todo")}>À faire</button>
      </div>

      <ul>
        {todos
          .filter((todo) =>
            filter === "all"
              ? true
              : filter === "done"
              ? todo.done
              : !todo.done
          )
          .map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              onUpdate={(updated) => updateTodo(index, updated)}
              onDelete={() => deleteTodo(index)}
            />
          ))}
      </ul>

      <button className="theme-toggle" onClick={() => setDark(!dark)}>
        {dark ? "☀️ Mode clair" : "🌙 Mode sombre"}
      </button>
    </div>
  );
}
