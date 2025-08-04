/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {
  Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Button,
  TextField, MenuItem, Checkbox, FormGroup, FormControlLabel,
  Tabs, Tab, Divider, IconButton, Tooltip, Chip, Grid,
  Card, CardContent, Avatar, List, ListItem, ListItemText,
  ListItemIcon, Badge, Modal, TablePagination, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@mui/material";
import {
  AddCircleOutline, CheckCircle, EditOutlined, DeleteOutline,
  LocalBar, Restaurant, WineBar, Fastfood, Close,
  FilterAlt, People, Schedule, Email, Phone, Receipt,
  MenuBook as MenuIcon, Visibility as VisibilityIcon
} from "@mui/icons-material";
import { motion } from 'framer-motion';
import axios from "axios";

// Product categories for menu/product management UI
const categoriasProductos = [
  { value: "bebidas", label: "Drinks", icon: <LocalBar />, color: "#460166" },
  { value: "cocteles", label: "Cocktails", icon: <WineBar />, color: "#660121" },
  { value: "alimentos", label: "Food", icon: <Restaurant />, color: "#016646" },
  { value: "snacks", label: "Snacks", icon: <Fastfood />, color: "#f7b330" },
];

const MenuAdmin = () => {
  const [menus, setMenus] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [openMenuDetails, setOpenMenuDetails] = useState(false);
  const [openMenuForm, setOpenMenuForm] = useState(false);
  const [openProductForm, setOpenProductForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeFormTab, setActiveFormTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  // selectedCategory: only for global search filters
  const [selectedCategory, setSelectedCategory] = useState(null);
  // menuFormCategory: only for create/edit menu modal
  const [menuFormCategory, setMenuFormCategory] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [productSearchTerm, setProductSearchTerm] = useState("");

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: null,
    type: 'delete' // 'delete', 'save', 'edit'
  });

  // Form states
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

  // Utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'activo':
        return 'success';
      case 'inactivo':
        return 'error';
      default:
        return 'default';
    }
  };

  const getCategoryIcon = (categoria) => {
    const cat = categoriasProductos.find(c => c.value === categoria);
    return cat ? cat.icon : <Restaurant />;
  };

  const getCategoryColor = (categoria) => {
    const cat = categoriasProductos.find(c => c.value === categoria);
    return cat ? cat.color : "#660152";
  };

  // Get products by IDs for menus - with safety checks
  const getProductosByIDs = (ids) => {
    if (!Array.isArray(ids) || !Array.isArray(productos)) {
      return [];
    }
    return ids.map(({ IDProducto }) => productos.find(p => p._id === IDProducto)).filter(Boolean);
  };


  // Helper function to show confirmation dialogs
  const showConfirmDialog = (title, message, onConfirm, type = 'delete') => {
    setConfirmDialog({
      open: true,
      title,
      message,
      onConfirm,
      type
    });
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialog({
      open: false,
      title: '',
      message: '',
      onConfirm: null,
      type: 'delete'
    });
  };

  const handleConfirm = () => {
    if (confirmDialog.onConfirm) {
      confirmDialog.onConfirm();
    }
    handleCloseConfirmDialog();
  };

  // Filters with safety checks
  const filteredMenus = Array.isArray(menus) ? menus.filter((menu) => {
    const matchesSearch = menu.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      menu.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = filterEstado ? menu.estado === filterEstado : true;
    const matchesCategory = selectedCategory ? menu.tipoMenu === selectedCategory : true;
    return matchesSearch && matchesEstado && matchesCategory;
  }) : [];

  const filteredProducts = Array.isArray(productos) ? productos.filter((producto) => {
    const matchesSearch = producto.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? producto.categoria === selectedCategory : true;
    const matchesEstado = filterEstado ? filterEstado === producto.estado : true;
    return matchesSearch && matchesCategory && matchesEstado;
  }) : [];

  // Pagination
  const paginatedMenus = filteredMenus.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const paginatedProducts = filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Menu details handling
  const handleOpenMenuDetails = (menu) => {
    setSelectedMenu(menu);
    setOpenMenuDetails(true);
  };

  const handleCloseMenuDetails = () => {
    setOpenMenuDetails(false);
    setSelectedMenu(null);
  };

  // Menu management
  const handleOpenMenuForm = (menu = null) => {
    if (menu) {
      setIsEditMode(true);
      setMenuFormData({
        ...menu,
        productos: Array.isArray(menu.productos)
          ? menu.productos.filter(Boolean).map(p => p.IDProducto)
          : [],
      });
      setMenuFormCategory(menu.tipoMenu);
      setSelectedMenu(menu); // Asegura que selectedMenu se establece al editar
    } else {
      setIsEditMode(false);
      setMenuFormData({
        nombre: "",
        descripcion: "",
        tipoMenu: "",
        estado: "activo",
        productos: [],
      });
      setMenuFormCategory("");
      setSelectedMenu(null); // Limpia selectedMenu al crear
    }
    setOpenMenuForm(true);
    setActiveFormTab(0);
  };

  const handleCloseMenuForm = () => {
    setOpenMenuForm(false);
    setMenuFormData({});
    setMenuFormCategory("");
    setProductSearchTerm(""); // Limpiar búsqueda de productos
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

  // CRUD Menus
  const handleSaveMenu = () => {
    const action = isEditMode ? 'Update' : 'Create';
    const title = isEditMode ? 'Confirm Update' : 'Confirm Creation';
    const message = isEditMode 
      ? `Are you sure you want to update the menu "${menuFormData.nombre}"?`
      : `Are you sure you want to create the menu "${menuFormData.nombre}"?`;

    showConfirmDialog(title, message, async () => {
      // Chequeo de null para selectedMenu en modo edición
      if (isEditMode && (!selectedMenu || !selectedMenu._id)) {
        showSnackbar('No menu selected for update. Please close and reopen the edit form.', 'error');
        return;
      }
      // Filtrar productos para que solo se incluyan los que existen en la lista de productos válidos y no sean nulos/undefined
      const productosValidos = Array.isArray(menuFormData.productos)
        ? menuFormData.productos.filter(id => id != null && id !== '' && productos.some(p => p && p._id === (typeof id === 'string' ? id : id.IDProducto)))
        : [];
      const productosFormateados = productosValidos
        .filter(Boolean)
        .map(p => typeof p === 'string' ? { IDProducto: p } : p);
      const newMenu = {
        nombre: menuFormData.nombre,
        descripcion: menuFormData.descripcion,
        tipoMenu: menuFormCategory || "",
        estado: menuFormData.estado,
        productos: productosFormateados,
      };
      try {
        if (isEditMode) {
          await axios.put(`http://localhost:3000/adminBackend/menus/${selectedMenu._id}`, newMenu);
          showSnackbar('Menu updated successfully!', 'success');
        } else {
          await axios.post("http://localhost:3000/adminBackend/menus", newMenu);
          showSnackbar('Menu created successfully!', 'success');
        }
        await fetchMenus();
        handleCloseMenuForm();
      } catch (err) {
        let msg = isEditMode ? 'Failed to update menu.' : 'Failed to create menu.';
        if (err.response && err.response.data && err.response.data.message) {
          msg += ` ${err.response.data.message}`;
        }
        showSnackbar(msg, 'error');
      }
    }, 'save');
  };

  // Product management
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
    setProductFormData(prev => ({
      ...prev,
      [name]: name === "categoria" ? value.toLowerCase() : value
    }));
  };

  // CRUD Products
  const handleSaveProduct = () => {
    const action = isEditMode ? 'Update' : 'Create';
    const title = isEditMode ? 'Confirm Update' : 'Confirm Creation';
    const message = isEditMode 
      ? `Are you sure you want to update the product "${productFormData.nombre}"?`
      : `Are you sure you want to create the product "${productFormData.nombre}"?`;

    showConfirmDialog(title, message, async () => {
      try {
        if (isEditMode) {
          await axios.put(`http://localhost:3000/adminBackend/productos/${productFormData._id}`, productFormData);
          showSnackbar('Product updated successfully!', 'success');
        } else {
          const { _id, ...productDataSinId } = productFormData;
          await axios.post("http://localhost:3000/adminBackend/productos", productDataSinId);
          showSnackbar('Product created successfully!', 'success');
        }
        await fetchProductos();
        await fetchMenus();
        handleCloseProductForm();
      } catch (err) {
        let msg = isEditMode ? 'Failed to update product.' : 'Failed to create product.';
        if (err.response && err.response.data && err.response.data.message) {
          msg += ` ${err.response.data.message}`;
        }
        showSnackbar(msg, 'error');
      }
    }, 'save');
  };

  const handleToggleProductStatus = async (id) => {
    const producto = productos.find(p => p._id === id);
    if (!producto) return;
    const isActive = producto.estado === 'activo';
    const dialogType = isActive ? 'deactivate' : 'activate';
    showConfirmDialog(
      `${isActive ? 'Deactivate' : 'Activate'} Product`,
      `Are you sure you want to ${isActive ? 'deactivate' : 'activate'} the product "${producto.nombre}"?`,
      async () => {
        try {
          const updatedProduct = { ...producto, estado: isActive ? 'inactivo' : 'activo' };
          await axios.put(`http://localhost:3000/adminBackend/productos/${id}`, updatedProduct);
          await fetchProductos();
          await fetchMenus();
          showSnackbar(`Product ${isActive ? 'deactivated' : 'activated'} successfully!`, 'success');
        } catch (err) {
          showSnackbar(`Failed to ${isActive ? 'deactivate' : 'activate'} product.`, 'error');
        }
      },
      dialogType
    );
  };

  const handleToggleMenuStatus = (id) => {
    const menu = menus.find(m => m._id === id);
    const menuName = menu ? menu.nombre : 'this menu';
    const isActive = menu && menu.estado === 'activo';
    const newEstado = isActive ? 'inactivo' : 'activo';
    const dialogType = isActive ? 'deactivate' : 'activate';
    showConfirmDialog(
      `${isActive ? 'Deactivate' : 'Activate'} Menu`,
      `Are you sure you want to ${isActive ? 'deactivate' : 'activate'} the menu "${menuName}"?`,
      async () => {
        try {
          if (!menu) throw new Error('Menu not found');
          const productosFormateados = Array.isArray(menu.productos)
            ? menu.productos
                .filter(p => p && (typeof p === 'string' || p.IDProducto || p._id))
                .map(p => {
                  if (typeof p === 'string') return { IDProducto: p };
                  if (p.IDProducto) return { IDProducto: p.IDProducto };
                  if (p._id) return { IDProducto: p._id };
                  return null;
                })
                .filter(Boolean)
            : [];
          const updatedMenu = {
            nombre: menu.nombre,
            descripcion: menu.descripcion,
            tipoMenu: menu.tipoMenu,
            estado: newEstado,
            productos: productosFormateados
          };
          await axios.put(`http://localhost:3000/adminBackend/menus/${id}`, updatedMenu);
          await fetchMenus();
          showSnackbar(`Menu ${isActive ? 'deactivated' : 'activated'} successfully!`, 'success');
        } catch (err) {
          showSnackbar(`Failed to ${isActive ? 'deactivate' : 'activate'} menu.`, 'error');
        }
      },
      dialogType
    );
  };
  // Filter products by selected category and search term
    const productsByCategory = selectedCategory && Array.isArray(productos)
      ? productos.filter(p => 
          p.categoria === selectedCategory && 
          (p.nombre?.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
          p.descripcion?.toLowerCase().includes(productSearchTerm.toLowerCase()))
        )
      : productos?.filter(p => 
          p.nombre?.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
          p.descripcion?.toLowerCase().includes(productSearchTerm.toLowerCase())
        ) || [];

  useEffect(() => {
    fetchProductos();
    fetchMenus();
  }, []);

  // Reset page when filters change

  // Snackbar state for user notifications
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Show a notification to the user
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  useEffect(() => {
    setPage(0);
  }, [searchTerm, filterEstado, selectedCategory, activeTab]);

  const fetchProductos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/adminBackend/productos");
      setProductos(res.data);
    } catch {
      console.error("Error loading products");
    }
  };

  const fetchMenus = async () => {
    try {
      const res = await axios.get("http://localhost:3000/adminBackend/menus");
      setMenus(res.data);
    } catch {
      console.error("Error loading menus");
    }
  };

  return (
    <Box component={motion.div} 
      sx={{ padding: 3 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header - Main title for menu and product management */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <MenuIcon sx={{ mr: 2, color: '#660152', fontSize: 40 }} />
        <Typography variant="h4" color="#660152" fontWeight="bold">
          Menu and Product Management
        </Typography>
      </Box>

      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Menus" />
        <Tab label="Products" />
      </Tabs>

      {activeTab === 0 ? (
        <Box>
           <Box sx={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
              <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button 
                  variant="contained" 
                  startIcon={<AddCircleOutline />}
                  onClick={() => handleOpenMenuForm()}
                  sx={{ 
                    backgroundColor: "#660152", 
                    '&:hover': { backgroundColor: "#520040" },
                    alignSelf: 'flex-start'
                  }}
                >
                  Add New Menu
                </Button>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  <TextField
                    label="Search menus by name or description"
                    variant="outlined"
                    size="small"
                    sx={{ width: 250 }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <TextField
                    select
                    label="Filter by status"
                    size="small"
                    sx={{ width: 180 }}
                    value={filterEstado}
                    onChange={(e) => setFilterEstado(e.target.value)}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="activo">Active</MenuItem>
                    <MenuItem value="inactivo">Inactive</MenuItem>
                  </TextField>
                  <TextField
                    select
                    label="Filter by category"
                    size="small"
                    sx={{ width: 200 }}
                    value={selectedCategory || ""}
                    onChange={(e) => setSelectedCategory(e.target.value || null)}
                  >
                    <MenuItem value="">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FilterAlt />
                        All categories
                      </Box>
                    </MenuItem>
                    {categoriasProductos.map((cat) => (
                      <MenuItem key={cat.value} value={cat.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {cat.icon}
                          {cat.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Box>

              {/* Estadísticas rápidas con verificaciones de seguridad */}
              <Box sx={{ mb: 3, display: 'flex', gap: 2, justifyContent: "flex-end" }}>
                <Card sx={{ minWidth: 120 }}>
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="h4" color="primary.main" fontWeight="bold">
                      {Array.isArray(menus) ? menus.length : 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Menus
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ minWidth: 120 }}>
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="h4" color="success.main" fontWeight="bold">
                      {Array.isArray(menus) ? menus.filter(m => m.estado === 'activo').length : 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ minWidth: 120 }}>
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="h4" color="error.main" fontWeight="bold">
                      {Array.isArray(menus) ? menus.filter(m => m.estado === 'inactivo').length : 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Inactive
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
           </Box>

          <Card elevation={3}>
            <CardContent sx={{ p: 0 }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#660152' }}>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'montserrat', fontSize: '1rem' }}>Menu</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'montserrat', fontSize: '1rem' }}>Type</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'montserrat', fontSize: '1rem' }}>Products</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'montserrat', fontSize: '1rem' }}>Status</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'montserrat', fontSize: '1rem' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedMenus.map((menu) => (
                      <TableRow 
                        key={menu._id}
                        hover
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar 
                              sx={{ 
                                width: 50, 
                                height: 50,
                                backgroundColor: getCategoryColor(menu.tipoMenu),
                              }}
                            >
                              {getCategoryIcon(menu.tipoMenu)}
                            </Avatar>
                            <Box>
                              <Typography variant="h6" fontFamily="montserrat" fontWeight="bold">
                                {menu.nombre}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" fontFamily="montserrat" fontWeight={600}>
                                {menu.descripcion?.length > 50 ? 
                                  `${menu.descripcion.substring(0, 50)}...` : 
                                  menu.descripcion || 'No description'}
                              </Typography>
                              <Typography variant="caption" color="text.secondary ">
                                ID: {menu._id}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {getCategoryIcon(menu.tipoMenu)}
                            <Typography variant="body1" fontWeight="medium">
                              {menu.tipoMenu}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Badge badgeContent={Array.isArray(menu.productos) ? menu.productos.length : 0} color="primary">
                              <Restaurant />
                            </Badge>
                            <Typography variant="body2" color="text.secondary">
                              Products
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                          
                            label={menu.estado === "activo" ? "ACTIVE" : "INACTIVE"}
                            color={getStatusColor(menu.estado)}
                            size="small"
                            sx={{ 
                              fontWeight: 'bold',
                              minWidth: 80
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Tooltip title="View menu details">
                              <IconButton
                                color="secondary"
                                onClick={() => handleOpenMenuDetails(menu)}
                                size="small"
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit menu">
                              <IconButton
                                color="primary"
                                onClick={() => handleOpenMenuForm(menu)}
                                size="small"
                              >
                                <EditOutlined />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={menu.estado === 'activo' ? 'Deactivate menu' : 'Activate menu'}>
                              <IconButton
                                color={menu.estado === 'activo' ? 'error' : 'success'}
                                onClick={() => handleToggleMenuStatus(menu._id)}
                                size="small"
                              >
                                {menu.estado === 'activo' ? (
                                  <DeleteOutline />
                                ) : (
                                  <CheckCircle sx={{ color: 'success.main' }} />
                                )}
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredMenus.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Box sx={{ py: 6 }}>
                            <MenuIcon sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
                            <Typography variant="h6" color="text.secondary">
                              No menus found
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {selectedCategory 
                                ? `No menus of type "${selectedCategory}" found` 
                                : filterEstado 
                                  ? `No menus with status "${filterEstado}" found` 
                                  : 'No menus available'}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <TablePagination
                  component="div"
                  count={filteredMenus.length}
                  page={page}
                  onPageChange={(e, newPage) => setPage(newPage)}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                  }}
                  rowsPerPageOptions={[5, 10, 25]}
                />
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      ) : (
        // Vista de productos con estadísticas
        <Box>
          <Box sx={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
            <Box>
                <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button 
                  variant="contained" 
                  startIcon={<AddCircleOutline />}
                  onClick={() => handleOpenProductForm()}
                  sx={{ 
                    backgroundColor: "#660152", 
                    '&:hover': { backgroundColor: "#520040" },
                    alignSelf: 'flex-start'
                  }}
                >
                  Add New Product
                </Button>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <TextField
                  label="Search products by name or description"
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ width: 250 }}
                />
                <TextField
                  select
                  label="Filter by status"
                  size="small"
                  sx={{ width: 180 }}
                  value={filterEstado}
                  onChange={(e) => setFilterEstado(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="activo">Active</MenuItem>
                  <MenuItem value="inactivo">Inactive</MenuItem>
                </TextField>
                <TextField
                  select
                  label="Filter by category"
                  size="small"
                  sx={{ width: 200 }}
                  value={selectedCategory || ""}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                >
                  <MenuItem value="">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FilterAlt />
                      All categories
                    </Box>
                  </MenuItem>
                  {categoriasProductos.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {cat.icon}
                        {cat.label}
                      </Box>
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              </Box>
            </Box>
              {/* Estadísticas de productos con verificaciones de seguridad */}
              <Box sx={{ mb: 3, display: 'flex', gap: 2, justifyContent: "flex-end" }}>
                <Card sx={{ minWidth: 120 }}>
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="h4" color="primary.main" fontWeight="bold">
                      {Array.isArray(productos) ? productos.length : 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Products
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ minWidth: 120 }}>
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="h4" color="success.main" fontWeight="bold">
                      {Array.isArray(productos) ? productos.filter(p => p.estado === 'activo').length : 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ minWidth: 120 }}>
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="h4" color="error.main" fontWeight="bold">
                      {Array.isArray(productos) ? productos.filter(p => p.estado === 'inactivo').length : 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Inactive
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
          </Box>        
          <Card elevation={3}>
            <CardContent sx={{ p: 0 }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#660152' }}>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Product</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Category</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedProducts.map((producto) => (
                      <TableRow 
                        key={producto._id}
                        hover
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar 
                              sx={{ 
                                width: 40, 
                                height: 40,
                                backgroundColor: getCategoryColor(producto.categoria)
                              }}
                            >
                              {getCategoryIcon(producto.categoria)}
                            </Avatar>
                            <Box>
                              <Typography variant="h6" fontWeight="bold">
                                {producto.nombre}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {producto.descripcion}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" fontFamily="montserrat">
                                ID: {producto._id}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {getCategoryIcon(producto.categoria)}
                            <Typography variant="body1">
                              {producto.categoria}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" color="success.main" fontWeight="bold">
                            ${producto.precio}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={producto.estado === "activo" ? "ACTIVE" : "INACTIVE"} 
                            color={getStatusColor(producto.estado)}
                            size="small"
                            sx={{ 
                              fontWeight: 'bold',
                              minWidth: 80
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title="Edit product">
                              <IconButton
                                color="primary"
                                onClick={() => handleOpenProductForm(producto)}
                                size="small"
                              >
                                <EditOutlined />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={producto.estado === 'activo' ? 'Deactivate product' : 'Activate product'}>
                              <IconButton
                                color={producto.estado === 'activo' ? 'error' : 'success'}
                                onClick={() => handleToggleProductStatus(producto._id)}
                                size="small"
                              >
                                {producto.estado === 'activo' ? (
                                  <DeleteOutline />
                                ) : (
                                  <CheckCircle sx={{ color: 'success.main' }} />
                                )}
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredProducts.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Box sx={{ py: 6 }}>
                            <Restaurant sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
                            <Typography variant="h6" color="text.secondary">
                              No products found
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {selectedCategory 
                                ? `No products of category "${selectedCategory}" found` 
                                : filterEstado 
                                  ? `No products with status "${filterEstado}" found` 
                                  : 'No products available'}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <TablePagination
                  component="div"
                  count={filteredProducts.length}
                  page={page}
                  onPageChange={(e, newPage) => setPage(newPage)}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                  }}
                  rowsPerPageOptions={[5, 10, 25]}
                />
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Modal de Detalles del Menú */}
      <Modal open={openMenuDetails} onClose={handleCloseMenuDetails}>
        <Box sx={{ 
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: '90%', md: 600 },
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 0,
          maxHeight: '90vh',
          overflow: 'hidden'
        }}>
          {selectedMenu && (
            <>
              {/* Header del modal */}
              <Box sx={{ 
                p: 3, 
                backgroundColor: getCategoryColor(selectedMenu.tipoMenu),
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar 
                    sx={{ 
                      width: 50, 
                      height: 50,
                      backgroundColor: 'rgba(255,255,255,0.2)'
                    }}
                  >
                    {getCategoryIcon(selectedMenu.tipoMenu)}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      {selectedMenu.nombre}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {selectedMenu.tipoMenu} • {selectedMenu._id}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip 
                    label={selectedMenu.estado.toUpperCase()} 
                    size="small"
                    sx={{ 
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                  <IconButton 
                    onClick={handleCloseMenuDetails}
                    sx={{ color: 'white' }}
                  >
                    <Close />
                  </IconButton>
                </Box>
              </Box>

              {/* Contenido del modal */}
              <Box sx={{ p: 3, maxHeight: '60vh', overflow: 'auto' }}>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {selectedMenu.descripcion}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* Estadísticas del menú */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                      <Typography variant="h5" color="primary.main" fontWeight="bold">
                        {Array.isArray(selectedMenu.productos) ? selectedMenu.productos.length : 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Productos
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Products included:
                </Typography>

                <List dense>
                  {getProductosByIDs(selectedMenu.productos || []).map((prod, index) => (
                    <ListItem 
                      key={prod._id} 
                      sx={{ 
                        px: 0,
                        borderBottom: index < getProductosByIDs(selectedMenu.productos || []).length - 1 ? '1px solid #f0f0f0' : 'none'
                      }}
                    >
                      <ListItemIcon>
                        <Avatar 
                          sx={{ 
                            width: 32, 
                            height: 32,
                            backgroundColor: getCategoryColor(prod.categoria)
                          }}
                        >
                          {getCategoryIcon(prod.categoria)}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body1" fontWeight="medium">
                              {prod.nombre}
                            </Typography>
                            <Typography variant="h6" color="success.main" fontWeight="bold">
                              ${prod.precio}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            {prod.descripcion}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* Footer del modal */}
              <Box sx={{ p: 3, backgroundColor: '#f9f9f9', display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  startIcon={<EditOutlined />}
                  onClick={() => {
                    handleCloseMenuDetails();
                    handleOpenMenuForm(selectedMenu);
                  }}
                  sx={{ 
                    backgroundColor: "#660152", 
                    '&:hover': { backgroundColor: "#520040" },
                    flex: 1
                  }}
                >
                  Update Menu
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Modal Crear/Editar Menú */}
      <Modal open={openMenuForm} onClose={handleCloseMenuForm}>
        <Box sx={{ 
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: '90%', md: 700 },
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          maxHeight: '90vh',
          overflowY: 'auto'
        }}>
          {/* Encabezado */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" color="#660152" fontWeight="bold">
              {isEditMode ? "Update Menu" : "Create New Menu"}
            </Typography>
            <IconButton onClick={handleCloseMenuForm}>
              <Close />
            </IconButton>
          </Box>

          {/* Tabs */}
          <Tabs value={activeFormTab} onChange={(e, newValue) => setActiveFormTab(newValue)} sx={{ mb: 3 }}>
            <Tab label="Basic Information" />
            <Tab label="Product Selection" />
          </Tabs>

          {/* Pestaña 1: Datos Básicos */}
          {activeFormTab === 0 ? (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} width={"100%"}>
                <Box sx={{ display: "flex", gap: 1}}>
                  <TextField 
                    fullWidth 
                    name="nombre" 
                    label="Menu Name" 
                    placeholder="Menu Name" 
                    value={menuFormData.nombre} 
                    onChange={handleMenuChange} 
                    required
                    InputLabelProps={{ shrink: true }}
                    sx={{ flex: 1}}
                  />
                  <TextField 
                    fullWidth 
                    select 
                    name="tipoMenu" 
                    label="Menu Type" 
                    placeholder="Menu Type" 
                    value={menuFormCategory || ""}
                    onChange={e => {
                      setMenuFormCategory(e.target.value);
                      setMenuFormData(prev => ({ ...prev, tipoMenu: e.target.value, productos: [] }));
                    }}
                    required
                    InputLabelProps={{ shrink: true }}
                    sx={{ flex: 1 }}
                  >
                    <MenuItem value="">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FilterAlt />
                        Select Type
                      </Box>
                    </MenuItem>
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
                    select 
                    name="estado" 
                    label="Status" 
                    placeholder="Status" 
                    value={menuFormData.estado} 
                    onChange={handleMenuChange}
                    required
                    InputLabelProps={{ shrink: true }}
                    sx={{ flex: 1 }}
                  >
                    <MenuItem value="activo">Active</MenuItem>
                    <MenuItem value="inactivo">Inactive</MenuItem>
                  </TextField>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ width: '100%' }}>
                </Box>
              </Grid>
              <Box sx={{ width: '100%' }}>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    name="descripcion" 
                    label="Description" 
                    placeholder="Description" 
                    multiline 
                    rows={3} 
                    value={menuFormData.descripcion} 
                    onChange={handleMenuChange} 
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Box>
            </Grid>
          ) : (
            // Pestaña 2: Productos
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Selected Menu Type: <strong>{menuFormCategory || "None"}</strong>
              </Typography>

          <Grid container spacing={1} sx={{ mb: 2 }}>
            {categoriasProductos.map((cat) => (
              <Grid item key={cat.value}>
                <Chip
                  label={cat.label}
                  icon={cat.icon}
                  color={menuFormCategory === cat.value ? "primary" : "default"}
                  variant={menuFormCategory === cat.value ? "filled" : "outlined"}
                  clickable={menuFormCategory === cat.value}
                  onClick={menuFormCategory === cat.value ? undefined : () => {}}
                  disabled={menuFormCategory !== cat.value}
                  sx={{
                    opacity: menuFormCategory === cat.value ? 1 : 0.5,
                    fontWeight: menuFormCategory === cat.value ? 'bold' : 'normal',
                    pointerEvents: menuFormCategory === cat.value ? 'auto' : 'none',
                  }}
                />
              </Grid>
            ))}
          </Grid>

          {menuFormCategory && (
            <>
              <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
                Products available in <strong>{menuFormCategory}</strong>:
              </Typography>

              {/* Buscador de productos */}
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Search Products..."
                  placeholder="Search by name"
                  value={productSearchTerm}
                  onChange={(e) => setProductSearchTerm(e.target.value)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                        <FilterAlt sx={{ color: 'text.secondary', fontSize: 20 }} />
                      </Box>
                    ),
                  }}
                />
                {/* Contador de productos encontrados */}
                <Typography variant="caption" color="text.secondary">
                  {productos.filter(p => p.categoria === menuFormCategory && p.estado === "activo" && (p.nombre?.toLowerCase().includes(productSearchTerm.toLowerCase()) || p.descripcion?.toLowerCase().includes(productSearchTerm.toLowerCase()))).length} products found
                </Typography>
              </Box>

              <Box sx={{ maxHeight: 250, overflowY: 'auto', mb: 2 }}>
                <FormGroup>
                  {productos
                    .filter(p => p.categoria === menuFormCategory && p.estado === "activo" && (p.nombre?.toLowerCase().includes(productSearchTerm.toLowerCase()) || p.descripcion?.toLowerCase().includes(productSearchTerm.toLowerCase())))
                    .map(prod => {
                      if (!prod || !prod._id) return null;
                      // Only allow checked if prod._id is in a non-null, non-undefined productos array
                      const checked = Array.isArray(menuFormData.productos)
                        ? menuFormData.productos.filter(Boolean).includes(prod._id)
                        : false;
                      return (
                        <FormControlLabel
                          key={prod._id}
                          control={
                            <Checkbox
                              checked={checked}
                              onChange={() => handleProductCheckChange(prod._id)}
                            />
                          }
                          label={`${prod.nombre} - $${prod.precio} - ${prod.descripcion}`}
                        />
                      );
                    })}
                </FormGroup>
                {/* Mensaje cuando no hay productos */}
                {productos.filter(p => p.categoria === menuFormCategory && p.estado === "activo" && (p.nombre?.toLowerCase().includes(productSearchTerm.toLowerCase()) || p.descripcion?.toLowerCase().includes(productSearchTerm.toLowerCase()))).length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 3 }}>
                    <Restaurant sx={{ fontSize: 40, color: 'grey.400', mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {productSearchTerm 
                        ? `No results found for "${productSearchTerm}"`
                        : `No active products found in the "${menuFormCategory}" category`
                      }
                    </Typography>
                  </Box>
                )}
              </Box>

              {menuFormData.productos?.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Selected Products ({menuFormData.productos.length}):
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {menuFormData.productos.map(id => {
                      // Extra null filtering to avoid errors if id is null or product is missing
                      if (!id) return null;
                      const prod = productos.find(p => p && p._id === id);
                      return prod ? (
                        <Chip
                          key={id}
                          label={`${prod.nombre} - $${prod.precio}`}
                          onDelete={() => handleProductCheckChange(id)}
                          sx={{ mb: 1 }}
                          color="primary"
                          variant="outlined"
                        />
                      ) : null;
                    })}
                  </Box>
                </Box>
              )}
            </>
          )}
        </Box>
          )}

          {/* Botones de acción */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button 
              variant="outlined" 
              onClick={() => activeFormTab === 0 ? handleCloseMenuForm() : setActiveFormTab(0)}
              sx={{ color: "#660152", borderColor: "#660152" }}
            >
              {activeFormTab === 0 ? 'Cancel' : 'Back to Basic Info'}
            </Button>
            
            <Button 
              variant="contained" 
              onClick={activeFormTab === 0 ? () => setActiveFormTab(1) : handleSaveMenu}
              disabled={
                (activeFormTab === 1 && (
                  !menuFormData.nombre ||
                  !menuFormCategory ||
                  !menuFormData.estado ||
                  !Array.isArray(menuFormData.productos) ||
                  menuFormData.productos.length === 0
                ))
              }
              sx={{ backgroundColor: "#660152", '&:hover': { backgroundColor: "#520040" } }}
            >
              {activeFormTab === 0 ? 'Next' : isEditMode ? 'Update Menu' : 'Save Menu'}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal Crear/Editar Producto */}
      <Modal open={openProductForm} onClose={handleCloseProductForm}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", md: 500 },
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h6" color="#660152" fontWeight="bold">
              {isEditMode ? "Edit Product" : "New Product"}
            </Typography>
            <IconButton onClick={handleCloseProductForm}>
              <Close />
            </IconButton>
          </Box>

          {/* Formulario */}
          <Grid container spacing={2} >
            {/* Nombre */}
            <Grid item xs={12} md={6}> 
              <TextField
                fullWidth
                name="nombre"
                label="Product Name"
                placeholder="Product Name"
                value={productFormData.nombre}
                onChange={handleProductChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Precio, Categoría y Estado */}
          <Grid item xs={12}>
          <Box sx={{ display: "flex", gap: 1  }}>
          <TextField
            name="precio"
            label="Price"
            placeholder="Price"
            type="number"
            value={productFormData.precio}
            onChange={handleProductChange}
            InputProps={{
              startAdornment: <span>$</span>,
            }}
            required
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1, minWidth: 100 }}
          />

          <TextField
            select
            name="categoria"
            label="Category"
            placeholder="Category"
            value={productFormData.categoria}
            onChange={handleProductChange}
            required
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1, minWidth: 100 }}
          >
            {categoriasProductos.map((cat) => (
              <MenuItem key={cat.value} value={cat.value}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {cat.icon}
                  {cat.label}
                </Box>
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            name="estado"
            label="Status"
            placeholder="Status"
            value={productFormData.estado}
            onChange={handleProductChange}
            required
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1, minWidth: 100 }}
          >
            <MenuItem value="activo">Active</MenuItem>
            <MenuItem value="inactivo">Inactive</MenuItem>
          </TextField>
          </Box>
        </Grid>

            {/* Descripción */}
            <Box sx={{width: "100%"}}> 
              <Grid item xs={12}>
                <TextField  
                  fullWidth
                  name="descripcion"
                  label="Description"
                  placeholder="Description"
                  multiline
                  rows={3}
                  value={productFormData.descripcion}
                  onChange={handleProductChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Box>
          </Grid>

          {/* Botones */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 4,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleCloseProductForm}
              sx={{ color: "#660152", borderColor: "#660152" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveProduct}
              disabled={
                !productFormData.nombre ||
                !productFormData.precio ||
                !productFormData.categoria
              }
              sx={{
                backgroundColor: "#660152",
                "&:hover": { backgroundColor: "#520040" },
              }}
            >
              {isEditMode ? "Update Product" : "Save Product"}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Dialog de Confirmación */}
      <Dialog
        open={confirmDialog.open}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle 
          id="confirm-dialog-title"
          sx={{ 
            color:
              confirmDialog.type === 'activate' ? 'success.main'
              : confirmDialog.type === 'deactivate' ? 'error.main'
              : 'primary.main',
            fontWeight: 'bold'
          }}
        >
          {confirmDialog.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            {confirmDialog.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button 
            onClick={handleCloseConfirmDialog}
            variant="outlined"
            sx={{ 
              color: 'grey.600',
              borderColor: 'grey.400',
              '&:hover': {
                borderColor: 'grey.600',
                backgroundColor: 'grey.50'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            variant="contained"
            sx={{
              fontWeight: 'bold',
              backgroundColor:
                confirmDialog.type === 'activate' ? '#2e7d32' // green
                : confirmDialog.type === 'deactivate' ? '#d32f2f' // red
                : '#660152',
              color: 'white',
              '&:hover': {
                backgroundColor:
                  confirmDialog.type === 'activate' ? '#1b5e20'
                  : confirmDialog.type === 'deactivate' ? '#b71c1c'
                  : '#520040',
              },
            }}
          >
            {confirmDialog.type === 'activate' ? 'Activate'
              : confirmDialog.type === 'deactivate' ? 'Deactivate'
              : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for user notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={5000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box> 
  );
};

export default MenuAdmin;