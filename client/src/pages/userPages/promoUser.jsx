import { useEffect, useState } from "react";
import axios from "axios";

export default function PromoUser() {
  const [promociones, setPromociones] = useState([]);
  const [form, setForm] = useState({
    _id: "",
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    estado: "activo",
    imagen: ""
  });

  useEffect(() => {
    obtenerPromociones();
  }, []);

  const obtenerPromociones = async () => {
    const res = await axios.get("http://localhost:3000/userBackend/promocion");
    setPromociones(res.data);
  };

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (form._id === "") return;
    try {
      await axios.post("http://localhost:3000/userBackend/promocion", form);
      obtenerPromociones();
      setForm({
        _id: "",
        nombre: "",
        descripcion: "",
        fechaInicio: "",
        fechaFin: "",
        estado: "activo",
        imagen: ""
      });
    } catch (error) {
      console.error("Error al agregar promoción", error);
    }
  };

  const manejarEliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/userBackend/promocion/${id}`);
      obtenerPromociones();
    } catch (error) {
      console.error("Error al eliminar promoción", error);
    }
  };

  const manejarActualizar = async () => {
    try {
      await axios.put(
        `http://localhost:3000/userBackend/promocion/${form._id}`,
        form
      );
      obtenerPromociones();
      setForm({
        _id: "",
        nombre: "",
        descripcion: "",
        fechaInicio: "",
        fechaFin: "",
        estado: "activo",
        imagen: ""
      });
    } catch (error) {
      console.error("Error al actualizar promoción", error);
    }
  };

  const seleccionarPromocion = (promo) => {
    setForm({
      _id: promo._id,
      nombre: promo.nombre,
      descripcion: promo.descripcion,
      fechaInicio: promo.fechaInicio.slice(0, 10),
      fechaFin: promo.fechaFin.slice(0, 10),
      estado: promo.estado,
      imagen: promo.imagen || ""
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gestión de Promociones</h2>
      <form onSubmit={manejarSubmit} className="grid gap-4 mb-6">
        <input name="_id" value={form._id} onChange={manejarCambio} placeholder="ID (obligatorio)" className="border p-2" />
        <input name="nombre" value={form.nombre} onChange={manejarCambio} placeholder="Nombre" className="border p-2" />
        <input name="descripcion" value={form.descripcion} onChange={manejarCambio} placeholder="Descripción" className="border p-2" />
        <input name="fechaInicio" value={form.fechaInicio} onChange={manejarCambio} type="date" className="border p-2" />
        <input name="fechaFin" value={form.fechaFin} onChange={manejarCambio} type="date" className="border p-2" />
        <select name="estado" value={form.estado} onChange={manejarCambio} className="border p-2">
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
          <option value="expirada">Expirada</option>
        </select>
        <input name="imagen" value={form.imagen} onChange={manejarCambio} placeholder="URL de imagen (opcional)" className="border p-2" />
        <div className="flex gap-4">
          <button type="submit" className="bg-green-500 text-white px-4 py-2">Agregar</button>
          <button type="button" onClick={manejarActualizar} className="bg-blue-500 text-white px-4 py-2">Actualizar</button>
        </div>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>ID</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Fechas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {promociones.map((promo) => (
            <tr key={promo._id} className="border-b">
              <td>{promo._id}</td>
              <td>{promo.nombre}</td>
              <td>{promo.estado}</td>
              <td>{promo.fechaInicio.slice(0, 10)} - {promo.fechaFin.slice(0, 10)}</td>
              <td className="flex gap-2">
                <button onClick={() => seleccionarPromocion(promo)} className="text-blue-600">Editar</button>
                <button onClick={() => manejarEliminar(promo._id)} className="text-red-600">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
