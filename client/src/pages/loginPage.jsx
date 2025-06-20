import React from "react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-white font-sans">
      {/* === CONTENEDOR GENERAL === */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {/* === LADO IZQUIERDO CON IMAGEN === */}
        <div className="hidden md:block">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://th.bing.com/th/id/R.668965f4d7de2943a75a23ee3b3337a9?rik=a%2ftymm%2b0lmcw8Q&pid=ImgRaw&r=0')",
            }}
          ></div>
        </div>

        {/* === FORMULARIO DE LOGIN === */}
        <div className="flex items-center justify-center px-8 py-12 bg-white bg-opacity-90 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
              Welcome Back!
            </h2>

            {/* === FORMULARIO === */}
            <form className="space-y-5">
              <div>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <button
                  type="button"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300"
                >
                  Log In
                </button>
              </div>

              <div className="text-sm text-right">
                <button type="button" className="text-purple-600 hover:underline">
                  Forgot your password?
                </button>
              </div>
            </form>

            {/* === ENLACE DE REGISTRO === */}
            <div className="mt-8 text-center">
              <p className="text-sm">
                Don't have an account?
                <button type="button" className="text-purple-600 ml-1 hover:underline">
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
