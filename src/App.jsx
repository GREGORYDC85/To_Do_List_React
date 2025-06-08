// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ToDoApp from "./pages/ToDoApp"; // ✅ Casse corrigée ici
import Navbar from "./components/Navbar";

export default function App() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        {/* Redirige vers /todo si connecté, sinon vers /login */}
        <Route
          path="/"
          element={user ? <Navigate to="/todo" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/todo"
          element={user ? <ToDoApp /> : <Navigate to="/login" />} // ✅ Casse corrigée ici aussi
        />
      </Routes>
    </>
  );
}
