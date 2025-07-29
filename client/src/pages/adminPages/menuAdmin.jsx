/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Button,
  TextField, MenuItem, Checkbox, FormGroup, FormControlLabel,
  Tabs, Tab, Divider, IconButton, Tooltip, Chip, Grid,
  Card, CardContent, Avatar, List, ListItem, ListItemText,
  ListItemIcon, Badge, Modal
} from "@mui/material";
import {
  AddCircleOutline, EditOutlined, DeleteOutline,
  LocalBar, Restaurant, WineBar, Fastfood, Close,
  FilterAlt, People, Schedule, Email, Phone, Receipt
} from "@mui/icons-material";

import axios from "axios";

const categoriasProductos = [
  { value: "bebidas", label: "Bebidas", icon: <LocalBar /> },
  { value: "cocteles", label: "Cócteles", icon: <WineBar /> },
  { value: "alimentos", label: "Alimentos", icon: <Restaurant /> },
  { value: "snacks", label: "Snacks", icon: <Fastfood /> },
];

const MenuAdmin = () => {
  const [menus, setMenus] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [openMenuForm, setOpenMenuForm] = useState(false);
  const [openProductForm, setOpenProductForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeFormTab, setActiveFormTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  

  // Estados para formularios
  const [menuFormData, setMenuFormData] = useState({
    _id: "",
    nombre: "",
    descripcion: "",
    tipoMenu: "",
    estado: "activo",
    productos: [],
  });

  const [productFormData, setProductFormData] = useState({
    _id: "",
    nombre: "",
    precio: "",
    descripcion: "",
    categoria: "",
    estado: "activo",
  });

  // Obtener productos por IDs para los menús
  const getProductosByIDs = (ids) =>
    ids.map(({ IDProducto }) => productos.find(p => p._id === IDProducto)).filter(Boolean);

  // Manejo de menús
  const handleOpenMenuForm = (menu = null) => {
    if (menu) {
      setIsEditMode(true);
      setMenuFormData({
        ...menu,
        productos: menu.productos.map(p => p.IDProducto),
      });
      setSelectedCategory(menu.tipoMenu);
    } else {
      setIsEditMode(false);
      setMenuFormData({
        _id: `MENU${menus.length + 1}`.padStart(7, "0"),
        nombre: "",
        descripcion: "",
        tipoMenu: "",
        estado: "activo",
        productos: [],
      });
      setSelectedCategory(null);
    }
    setOpenMenuForm(true);
    setActiveFormTab(0);
  };

  const handleCloseMenuForm = () => {
    setOpenMenuForm(false);
    setMenuFormData({});
    setSelectedCategory(null);
  };

  const handleMenuChange = (e) => {
    const { name, value } = e.target;
    setMenuFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProductCheckChange = (id) => {
    setMenuFormData(prev => ({
      ...prev,
      productos: prev.productos.includes(id)
        ? prev.productos.filter(pid => pid !== id)
        : [...prev.productos, id],
    }));
  };

  // CRUD Menús
  const handleSaveMenu = async () => {
    const newMenu = {
      ...menuFormData,
      tipoMenu: selectedCategory || "",
      productos: menuFormData.productos.map(id => ({ IDProducto: id })),
    };
    try {
      if (isEditMode) {
        await axios.put(`http://localhost:3000/adminBackend/menus/${newMenu._id}`, newMenu);
      } else {
        await axios.post("http://localhost:3000/adminBackend/menus", newMenu);
      }
      await fetchMenus();
      handleCloseMenuForm();
    } catch (err) {
      alert("Error al guardar menú");
    }
  };

  // Manejo de productos
  const handleOpenProductForm = (product = null) => {
    if (product) {
      setIsEditMode(true);
      setProductFormData(product);
    } else {
      setIsEditMode(false);
      setProductFormData({
        _id: `PROD${productos.length + 1}`.padStart(7, "0"),
        nombre: "",
        precio: "",
        descripcion: "",
        categoria: "",
        estado: "activo",
      });
    }
    setOpenProductForm(true);
  };

  const handleCloseProductForm = () => {
    setOpenProductForm(false);
    setProductFormData({});
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    // Si el campo es categoria, guardar en minúsculas
    setProductFormData(prev => ({
      ...prev,
      [name]: name === "categoria" ? value.toLowerCase() : value
    }));
  };

  // CRUD Productos
  const handleSaveProduct = async () => {
    try {
      if (isEditMode) {
        await axios.put(`http://localhost:3000/adminBackend/productos/${productFormData._id}`, productFormData);
      } else {
        await axios.post("http://localhost:3000/adminBackend/productos", productFormData);
      }
      await fetchProductos();
      await fetchMenus(); // Para reflejar cambios en menús
      handleCloseProductForm();
    } catch (err) {
      alert("Error al guardar producto");
    }
  };

  const handleDeleteProduct = async (id) => {
    const enUso = menus.some(menu => 
      menu.productos.some(prod => prod.IDProducto === id)
    );
    if (enUso) {
      alert("Este producto está en uso en uno o más menús. No se puede eliminar manualmente.");
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/adminBackend/productos/${id}`);
      await fetchProductos();
      await fetchMenus();
    } catch (err) {
      alert("Error al eliminar producto");
    }
  };

  // Filtrar productos por categoría seleccionada
  const productsByCategory = selectedCategory 
    ? productos.filter(p => p.categoria === selectedCategory)
    : productos;

  useEffect(() => {
    fetchProductos();
    fetchMenus();
  }, []);

  const fetchProductos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/adminBackend/productos");
      setProductos(res.data);
    } catch {
      console.error("Error al cargar productos");
    }
  };

  const fetchMenus = async () => {
    try {
      const res = await axios.get("http://localhost:3000/adminBackend/menus");
      setMenus(res.data);
      if (res.data.length > 0) setSelectedMenu(res.data[0]);
    } catch {
      console.error("Error al cargar menús");
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" mb={2} color="#660152">
        Gestión de Menús y Productos
      </Typography>

      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Menús" />
        <Tab label="Productos" />
      </Tabs>

      {activeTab === 0 ? (
        <Grid container spacing={3} >
          {/* Columna izquierda - Tabla de menús */}
          <Grid item xs={10} md={selectedMenu ? 6 : 10}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Button variant="contained" onClick={() => handleOpenMenuForm()}>
                Crear Menú
              </Button>
              <TextField
                label="Buscar menús"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ width: 250 }}
              />
            </Box>

            <TableContainer component={Paper} elevation={3}>
              <Table >
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#660152" }}>
                    <TableCell sx={{ color: "white", }}>Nombre</TableCell>
                    <TableCell sx={{ color: "white", }}>Tipo</TableCell>
                    <TableCell sx={{ color: "white", }}>Productos</TableCell>
                    <TableCell sx={{ color: "white", }}>Estado</TableCell>
                    <TableCell sx={{ color: "white", }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {menus
                    .filter(menu => menu.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((menu) => (
                      <TableRow 
                        key={menu._id} 
                        hover 
                        selected={selectedMenu?._id === menu._id}
                        onClick={() => setSelectedMenu(menu)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell>
                          <Typography fontWeight={selectedMenu?._id === menu._id ? 'bold' : 'normal'}>
                            {menu.nombre}
                          </Typography>
                        </TableCell>
                       
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {categoriasProductos.find(cat => cat.value === menu.tipoMenu)?.icon}
                            {menu.tipoMenu}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Badge badgeContent={menu.productos.length} color="primary">
                            <Typography variant="body2"></Typography>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={menu.estado} 
                            color={menu.estado === "activo" ? "success" : "error"} 
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Editar menú">
                            <IconButton 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenMenuForm(menu);
                              }}
                              color="primary"
                            >
                              <EditOutlined />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Columna derecha - Detalles del menú seleccionado */}
          {selectedMenu && (
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%',  }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" color="#660152">
                      {selectedMenu.nombre}
                    </Typography>
                    <Chip 
                      label={selectedMenu.estado} 
                      color={selectedMenu.estado === "activo" ? "success" : "error"} 
                    />
                  </Box>

                  <Typography variant="body1" mt={1} color="text.secondary">
                    {selectedMenu.descripcion}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 3 }}>
                    {categoriasProductos.find(cat => cat.value === selectedMenu.tipoMenu)?.icon}
                    <Typography variant="subtitle1" ml={1}>
                      {selectedMenu.tipoMenu}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" gutterBottom>
                    Productos incluidos ({selectedMenu.productos.length})
                  </Typography>

                  <List dense sx={{ maxHeight: 300, overflow: 'auto' }}>
                    {getProductosByIDs(selectedMenu.productos).map((prod) => (
                      <ListItem key={prod._id}>
                        <ListItemIcon>
                          {categoriasProductos.find(cat => cat.value === prod.categoria)?.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={prod.nombre}
                          secondary={`$${prod.precio} - ${prod.descripcion}`}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                      variant="contained" 
                      startIcon={<Receipt />}
                      sx={{ backgroundColor: "#660152", '&:hover': { backgroundColor: "#520040" } }}
                    >
                      Generar Reporte
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
          
          {!selectedMenu && (
            <Grid item xs={12}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '200px',
                border: '2px dashed #ccc',
                borderRadius: 2,
                p: 4,
                textAlign: 'center'
              }}>
                <Typography variant="h6" color="text.secondary">
                  Selecciona un menú para ver los detalles
                </Typography>
                <Typography variant="body2" mt={1} color="text.secondary">
                  O crea un nuevo menú haciendo clic en el botón "Crear Menú"
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      ) : (
        // Vista de productos (se mantiene igual que antes)
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <TextField
              label="Buscar productos"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 300 }}
            />
            <Button variant="contained" startIcon={<AddCircleOutline />} onClick={() => handleOpenProductForm()}>
              Nuevo Producto
            </Button>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Filtrar por categoría:</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label="Todos"
                onClick={() => setSelectedCategory(null)}
                color={!selectedCategory ? "primary" : "default"}
                variant={!selectedCategory ? "filled" : "outlined"}
              />
              {categoriasProductos.map((cat) => (
                <Chip
                  key={cat.value}
                  label={cat.label}
                  onClick={() => setSelectedCategory(cat.value)}
                  color={selectedCategory === cat.value ? "primary" : "default"}
                  variant={selectedCategory === cat.value ? "filled" : "outlined"}
                  icon={cat.icon}
                />
              ))}
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#660152" }}>
                  <TableCell sx={{ color: "white" }}>Nombre</TableCell>
                  <TableCell sx={{ color: "white" }}>Descripción</TableCell>
                  <TableCell sx={{ color: "white" }}>Categoría</TableCell>
                  <TableCell sx={{ color: "white" }}>Precio</TableCell>
                  <TableCell sx={{ color: "white" }}>Estado</TableCell>
                  <TableCell sx={{ color: "white" }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productos
                  .filter(p => 
                    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
                    (selectedCategory ? p.categoria === selectedCategory : true)
                  )
                  .map((producto) => (
                    <TableRow key={producto._id}>
                      <TableCell>{producto.nombre}</TableCell>
                      <TableCell>{producto.descripcion}</TableCell>
                      <TableCell>
                        {categoriasProductos.find(cat => cat.value === producto.categoria)?.icon}
                        {producto.categoria}
                      </TableCell>
                      <TableCell>${producto.precio}</TableCell>
                      <TableCell>
                        <Chip 
                          label={producto.estado} 
                          color={producto.estado === "activo" ? "success" : "error"} 
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Editar">
                          <IconButton onClick={() => handleOpenProductForm(producto)} color="primary">
                            <EditOutlined />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <IconButton onClick={() => handleDeleteProduct(producto._id)} color="error">
                            <DeleteOutline />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Modal Crear/Editar Menú (se mantiene igual) */}
      <Modal open={openMenuForm} onClose={handleCloseMenuForm}>
        <Box sx={{ 
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" mb={2} color="#660152">
              {isEditMode ? "Editar Menú" : "Crear Nuevo Menú"}
            </Typography>
            <IconButton onClick={handleCloseMenuForm}>
              <Close />
            </IconButton>
          </Box>

          <Tabs value={activeFormTab} onChange={(e, newValue) => setActiveFormTab(newValue)} sx={{ mb: 3 }}>
            <Tab label="Información Básica" />
            <Tab label="Selección de Productos" />
          </Tabs>

          {activeFormTab === 0 ? (
            <Box>
              <TextField 
                fullWidth 
                margin="dense" 
                name="nombre" 
                label="Nombre del menú" 
                value={menuFormData.nombre} 
                onChange={handleMenuChange} 
                required
              />
              <TextField 
                fullWidth 
                margin="dense" 
                name="descripcion" 
                label="Descripción" 
                multiline 
                rows={3} 
                value={menuFormData.descripcion} 
                onChange={handleMenuChange} 
              />
              <TextField 
                fullWidth 
                margin="dense" 
                select 
                name="estado" 
                label="Estado" 
                value={menuFormData.estado} 
                onChange={handleMenuChange}
                required
              >
                <MenuItem value="activo">Activo</MenuItem>
                <MenuItem value="inactivo">Inactivo</MenuItem>
              </TextField>
            </Box>
          ) : (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Selecciona el tipo de menú:
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {categoriasProductos.map((cat) => (
                  <Grid item key={cat.value}>
                    <Chip
                      label={cat.label}
                      onClick={() => setSelectedCategory(cat.value)}
                      color={selectedCategory === cat.value ? "primary" : "default"}
                      variant={selectedCategory === cat.value ? "filled" : "outlined"}
                      icon={cat.icon}
                      sx={{ p: 2, fontSize: '0.875rem' }}
                    />
                  </Grid>
                ))}
              </Grid>

              {selectedCategory && (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    Productos disponibles en {selectedCategory}:
                  </Typography>
                  <FormGroup sx={{ maxHeight: 300, overflow: 'auto' }}>
                    {productsByCategory
                      .filter(p => p.estado === "activo")
                      .map(prod => (
                        <FormControlLabel
                          key={prod._id}
                          control={
                            <Checkbox
                              checked={menuFormData.productos?.includes(prod._id)}
                              onChange={() => handleProductCheckChange(prod._id)}
                            />
                          }
                          label={`${prod.nombre} - $${prod.precio}`}
                        />
                      ))}
                  </FormGroup>
                </>
              )}

              {Array.isArray(menuFormData.productos) && menuFormData.productos.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Productos seleccionados ({menuFormData.productos.length}):
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {menuFormData.productos.map(id => {
                      const prod = productos.find(p => p._id === id);
                      return prod ? (
                        <Chip
                          key={id}
                          label={`${prod.nombre} - $${prod.precio}`}
                          onDelete={() => handleProductCheckChange(id)}
                          sx={{ mb: 1 }}
                        />
                      ) : null;
                    })}
                  </Box>
                </Box>
              )}
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button 
              variant="outlined" 
              onClick={() => activeFormTab === 0 ? handleCloseMenuForm() : setActiveFormTab(0)}
            >
              {activeFormTab === 0 ? 'Cancelar' : 'Atrás'}
            </Button>
            
            <Button 
              variant="contained" 
              onClick={activeFormTab === 0 ? () => setActiveFormTab(1) : handleSaveMenu}
              disabled={activeFormTab === 1 && !selectedCategory}
              sx={{ backgroundColor: "#660152", '&:hover': { backgroundColor: "#520040" } }}
            >
              {activeFormTab === 0 ? 'Siguiente' : isEditMode ? 'Actualizar Menú' : 'Guardar Menú'}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal Crear/Editar Producto (se mantiene igual) */}
      <Modal open={openProductForm} onClose={handleCloseProductForm}>
        <Box sx={{ 
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" mb={2} color="#660152">
              {isEditMode ? "Editar Producto" : "Nuevo Producto"}
            </Typography>
            <IconButton onClick={handleCloseProductForm}>
              <Close />
            </IconButton>
          </Box>

          <TextField
            fullWidth
            margin="dense"
            name="nombre"
            label="Nombre del producto"
            value={productFormData.nombre}
            onChange={handleProductChange}
            required
          />

          <TextField
            fullWidth
            margin="dense"
            name="precio"
            label="Precio"
            type="number"
            value={productFormData.precio}
            onChange={handleProductChange}
            InputProps={{ startAdornment: "$" }}
            required
          />

          <TextField
            fullWidth
            margin="dense"
            name="descripcion"
            label="Descripción"
            multiline
            rows={3}
            value={productFormData.descripcion}
            onChange={handleProductChange}
          />

          <TextField
            fullWidth
            margin="dense"
            select
            name="categoria"
            label="Categoría"
            value={productFormData.categoria}
            onChange={handleProductChange}
            required
          >
            {categoriasProductos.map((cat) => (
              <MenuItem key={cat.value} value={cat.value}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {cat.icon}
                  {cat.label}
                </Box>
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            margin="dense"
            select
            name="estado"
            label="Estado"
            value={productFormData.estado}
            onChange={handleProductChange}
            required
          >
            <MenuItem value="activo">Activo</MenuItem>
            <MenuItem value="inactivo">Inactivo</MenuItem>
          </TextField>

          <Button
            fullWidth
            sx={{ mt: 2 }}
            variant="contained"
            onClick={handleSaveProduct}
            disabled={!productFormData.nombre || !productFormData.precio || !productFormData.categoria}
          >
            {isEditMode ? "Actualizar Producto" : "Guardar Producto"}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default MenuAdmin;