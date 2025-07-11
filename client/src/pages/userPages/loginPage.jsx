import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        correo: email,
        password,
      });

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token); // guardamos el token
        navigate("/homeUser"); // Redirigir al panel de usuario administrador.
      }
    } catch (err) { // Está resaltado en rojo esta linea de código pero es funcional. No implica que no compile.
      setMensaje("Credenciales incorrectas o error en el servidor.");
    }
  };

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
