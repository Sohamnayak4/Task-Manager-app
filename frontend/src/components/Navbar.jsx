// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Task Manager</Link>
        <div>
          {isAuthenticated ? (
            <button onClick={logout} className="text-white hover:underline">Logout</button>
          ) : (
            <>
              <Link to="/login" className="text-white hover:underline mr-4">Login</Link>
              <Link to="/register" className="text-white hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
