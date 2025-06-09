import React from "react";
import NavBar from '../components/navBar'

export default function LoginPage() {
  return (

    <div className="min-h-screen bg-white">
      {/* Barra de navegación arriba */}
      <NavBar />
          {/* Contenedor del contenido principal dividido en dos columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-80px)]">
        {/* Imagen a la izquierda */}
        <div className="hidden md:block bg-gray-200">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://th.bing.com/th/id/R.668965f4d7de2943a75a23ee3b3337a9?rik=a%2ftymm%2b0lmcw8Q&pid=ImgRaw&r=0')",
            }}
          ></div>
        </div>

        {/* Formulario de login a la derecha */}
        <div className="flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Log in to your account</h2>

            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <button
                  type="button"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Log In
                </button>
              </div>

              <div className="text-sm text-right">
                <button type="button" className="text-blue-600 hover:underline">
                  Forgot your password?
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm">
                Don't have an account?
                <button type="button" className="text-blue-600 ml-1 hover:underline">
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
