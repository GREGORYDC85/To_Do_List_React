import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import TodoItem from "../components/TodoItem.jsx";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function ToDoApp() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [priority, setPriority] = useState("moyenne");
  const [deadline, setDeadline] = useState("");
  const [filter, setFilter] = useState("all");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (!user) return navigate("/login");

    const q = query(collection(db, "todos"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(items);
    });

    return () => unsubscribe();
  }, [user, navigate]);

  useEffect(() => {
    document.body.className = dark ? "dark" : "";
  }, [dark]);

  const addTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    await addDoc(collection(db, "todos"), {
      uid: user.uid,
      text: newTodo.trim(),
      done: false,
      editing: false,
      priority,
      deadline,
    });

    setNewTodo("");
    setPriority("moyenne");
    setDeadline("");
  };

  const updateTodo = async (changes) => {
    const ref = doc(db, "todos", changes.id);
    const { id, ...updatedFields } = changes;
    await updateDoc(ref, updatedFields);
  };

  const deleteTodo = async (id) => {
    const ref = doc(db, "todos", id);
    await deleteDoc(ref);
  };

  const filteredTodos = todos.filter((todo) =>
    filter === "all" ? true : filter === "done" ? todo.done : !todo.done
  );

  // 🔢 Progression calculée
  const total = todos.length;
  const completed = todos.filter((t) => t.done).length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="todo-container">
      <h1>📝 Ma To-Do List</h1>

      {/* Barre de progression */}
      {total > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              height: "20px",
              background: "#ddd",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                background: "#ffbb00",
                height: "100%",
                transition: "width 0.3s",
              }}
            ></div>
          </div>
          <p style={{ textAlign: "center", marginTop: "5px" }}>
            Progression : {progress}%
          </p>
        </div>
      )}

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
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={(changes) => updateTodo({ ...todo, ...changes })}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>

      <button className="theme-toggle" onClick={() => setDark(!dark)}>
        {dark ? "☀️ Mode clair" : "🌙 Mode sombre"}
      </button>
    </div>
  );
}
