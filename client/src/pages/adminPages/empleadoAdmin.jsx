import React, { useState, useEffect } from "react";

export default function EmpleadoAdmin() {
  const [empleados, setEmpleados] = useState([]);
  const [formData, setFormData] = useState({
    _id: "",
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    correo: "",
    password: "",
    estado: "activo",
    IDRol: "EMPLE",
  });
  const [modoEdicion, setModoEdicion] = useState(false);

  const fetchEmpleados = async () => {
    const res = await fetch("http://localhost:3000/adminBackend/empleados");
    const data = await res.json();
    setEmpleados(data);
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = modoEdicion
      ? `http://localhost:3000/adminBackend/empleados/${formData._id}`
      : "http://localhost:3000/adminBackend/empleados";

    const method = modoEdicion ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      fetchEmpleados();
      setFormData({
        _id: "",
        nombre: "",
        primerApellido: "",
        segundoApellido: "",
        correo: "",
        password: "",
        estado: "activo",
        IDRol: "EMPLE",
      });
      setModoEdicion(false);
    } else {
      const error = await res.json();
      alert("Error: " + error.error);
    }
  };

  const handleEdit = (empleado) => {
    setFormData(empleado);
    setModoEdicion(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este empleado?")) return;
    const res = await fetch(
      `http://localhost:3000/adminBackend/empleados/${id}`,
      { method: "DELETE" }
    );
    if (res.ok) {
      fetchEmpleados();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-800">
        Administrador de Empleados
      </h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow"
      >
        <input
          type="number"
          name="_id"
          value={formData._id}
          onChange={handleChange}
          placeholder="ID (único)"
          className="input"
          required
          disabled={modoEdicion}
        />
        <input
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="input"
          required
        />
        <input
          name="primerApellido"
          value={formData.primerApellido}
          onChange={handleChange}
          placeholder="Primer Apellido"
          className="input"
          required
        />
        <input
          name="segundoApellido"
          value={formData.segundoApellido || ""}
          onChange={handleChange}
          placeholder="Segundo Apellido (opcional)"
          className="input"
        />
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          placeholder="Correo"
          className="input"
          required
        />
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
          type="password"
          className="input"
          required={!modoEdicion}
        />
        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className="input"
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
        <select
          name="IDRol"
          value={formData.IDRol}
          onChange={handleChange}
          className="input"
        >
          <option value="ADMIN">Administrador</option>
          <option value="EMPLE">Empleado</option>
        </select>
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-purple-600 text-white rounded-lg py-2 hover:bg-purple-700 transition"
        >
          {modoEdicion ? "Actualizar" : "Registrar"} Empleado
        </button>
      </form>

      {/* Lista de empleados */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-purple-100 text-purple-800 text-left">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Correo</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Rol</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((emp) => (
              <tr
                key={emp._id}
                className="border-t hover:bg-purple-50 transition"
              >
                <td className="p-2">{emp._id}</td>
                <td className="p-2">{`${emp.nombre} ${emp.primerApellido}`}</td>
                <td className="p-2">{emp.correo}</td>
                <td className="p-2">{emp.estado}</td>
                <td className="p-2">{emp.IDRol}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(emp)}
                    className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(emp._id)}
                    className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {empleados.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No hay empleados registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
