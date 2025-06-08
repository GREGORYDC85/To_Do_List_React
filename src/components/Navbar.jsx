import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        {!user && (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/signup">Inscription</Link>
          </>
        )}
        {user && <button onClick={handleLogout}>Déconnexion</button>}
      </div>
    </nav>
  );
}
