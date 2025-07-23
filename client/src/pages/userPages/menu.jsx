// Ruta: client/src/pages/MenusCrud.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const MenusUser = () => {
  const [menus, setMenus] = useState([]);
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    _id: "",
    nombre: "",
    tipoMenu: "",
    estado: "activo",
    productos: [{ IDProducto: "" }],
  });

  useEffect(() => {
    fetchMenus();
    fetchProductos();
  }, []);

  const fetchMenus = async () => {
    const res = await axios.get("http://localhost:3000/userBackend/menu");
    setMenus(res.data);
  };

  const fetchProductos = async () => {
    const res = await axios.get("http://localhost:3000/userBackend/producto");
    setProductos(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProductChange = (index, value) => {
    const nuevosProductos = [...form.productos];
    nuevosProductos[index].IDProducto = value;
    setForm({ ...form, productos: nuevosProductos });
  };

  const addProductField = () => {
    setForm({ ...form, productos: [...form.productos, { IDProducto: "" }] });
  };

  const removeProductField = (index) => {
    const nuevosProductos = [...form.productos];
    nuevosProductos.splice(index, 1);
    setForm({ ...form, productos: nuevosProductos });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/userBackend/menu", form);
      fetchMenus();
      setForm({ _id: "", nombre: "", tipoMenu: "", estado: "activo", productos: [{ IDProducto: "" }] });
    } catch (error) {
      console.error("Error al guardar menú:", error);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/userBackend/menu/${id}`);
    fetchMenus();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">CRUD de Menús</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="_id" value={form._id} onChange={handleChange} placeholder="Código del Menú" className="border p-2 w-full" required />
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre del Menú" className="border p-2 w-full" required />
        <input name="tipoMenu" value={form.tipoMenu} onChange={handleChange} placeholder="Tipo de Menú" className="border p-2 w-full" required />
        <select name="estado" value={form.estado} onChange={handleChange} className="border p-2 w-full">
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>

        {form.productos.map((prod, index) => (
          <div key={index} className="flex items-center space-x-2">
            <select
              value={prod.IDProducto}
              onChange={(e) => handleProductChange(index, e.target.value)}
              className="border p-2 w-full"
              required
            >
              <option value="">Selecciona un producto</option>
              {productos.map((producto) => (
                <option key={producto._id} value={producto._id}>
                  {producto.nombre}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => removeProductField(index)} className="text-red-500">✖</button>
          </div>
        ))}
        <button type="button" onClick={addProductField} className="text-blue-500">+ Añadir producto</button>
        <button type="submit" className="bg-green-600 text-white px-4 py-2">Guardar</button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Lista de Menús</h3>
        <ul className="space-y-2">
          {menus.map((menu) => (
            <li key={menu._id} className="border p-4 rounded">
              <p><strong>Código:</strong> {menu._id}</p>
              <p><strong>Nombre:</strong> {menu.nombre}</p>
              <p><strong>Tipo:</strong> {menu.tipoMenu}</p>
              <p><strong>Estado:</strong> {menu.estado}</p>
              <p><strong>Productos:</strong> {menu.productos.map(p => p.IDProducto).join(", ")}</p>
              <button onClick={() => handleDelete(menu._id)} className="text-red-600 mt-2">Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenusUser;
