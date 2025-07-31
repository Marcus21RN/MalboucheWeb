import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const res = await axios.post('http://localhost:3000/authJWT/auth/login', {
        correo: email,
        password: password,
      });

      const { token, user } = res.data;
      localStorage.setItem('token', token);
      if (user) {
        localStorage.setItem('userAuth', JSON.stringify(user));
      }
      const decoded = jwtDecode(token);
      if (decoded.rol === 'ADMIN') {
        navigate('/admin/home');
      } else if (decoded.rol === 'EMPLE') {
        navigate('/user/home');
      } else {
        setMensaje('Rol no reconocido');
      }
    } catch ( err ){
      console.error("Error al iniciar sesión:", err);
      setMensaje("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
      return;
    }
  };

  // Redirigir a la página de inicio si ya está autenticado
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.rol === 'ADMIN') {
        navigate('/admin/home');
      } else if (decoded.rol === 'EMPLE') {
        navigate('/user/home');
      }
    }
  }, [navigate]); 

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-white font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {/* LADO IZQUIERDO */}
        <div className="hidden md:block">
          <div
            className="h-full w-full bg-cover bg-center "
            style={{
              backgroundImage:
                "url('https://tse2.mm.bing.net/th/id/OIP.uWq_GpX-JVffgGkWZFKX9QHaNK?r=0&cb=thvnextc1&rs=1&pid=ImgDetMain&o=7&rm=3')",
            }}
          ></div>
        </div>

        {/* FORMULARIO */}
        <div className="flex items-center justify-center px-8 py-12 bg-white bg-opacity-90 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
              Welcome Back!
            </h2>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                  placeholder="••••••••"
                  required
                />
              </div>

              {mensaje && (
                <div className="text-red-500 text-sm text-center">{mensaje}</div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
