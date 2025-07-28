// LogoutButton.jsx
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token JWT
    navigate('/login'); // Redirige al login
  };

  return (
    <button 
      onClick={handleLogout} 
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Cerrar sesión
    </button>
  );
}

export default LogoutButton;
