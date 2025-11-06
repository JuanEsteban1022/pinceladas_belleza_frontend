import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './pages/Sidebar';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import Nosotros from './pages/Nosotros';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import imgBackground from './assets/images/bg-login.avif';
import ProductosAdmin from './pages/admin/ProductosAdmin';
import ProductDetail from './pages/ProductDetail';
import CategoriasAdmin from './pages/admin/CategoriasAdmin';
import ProveedoresAdmin from './pages/admin/ProveedoresAdmin';
import { login } from '../src/services/auth/authService';
import AdminRoute from './routes/AdminRoute';
import AdminLayout from './layouts/AdminLayout';

const loginSpecificBackground = imgBackground;
const defaultAppBackground = '#e57d90';

function AppContent() {
  const location = useLocation();
  const [currentBackground, setCurrentBackground] = useState(defaultAppBackground);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const routeVisit = location.pathname.startsWith('/admin');
  const hideHeader = location.pathname === '/login' || location.pathname === '/register' || routeVisit;

  useEffect(() => {
    if (!routeVisit) {
      const autoLogin = async () => {
        try {
          if (!localStorage.getItem('token')) {
            const response = await login({
              username: 'visitante',
              password: '',
            });

            localStorage.setItem('token', response.token);
            localStorage.setItem('rol', response.usuario.role);

            if (response.usuario.role === 'VISITANTE') {
              navigate('/');
            }
          }
        } catch (err) {
          console.error('Error de login:', err);
          setError(err.message || 'Error al iniciar sesión');
        }
      };

      autoLogin();
    }
  }, []);

  useEffect(() => {
    const path = location.pathname;
    setCurrentBackground(
      path === '/login' || path === '/register'
        ? loginSpecificBackground
        : defaultAppBackground
    );
  }, [location.pathname]);

  const appContainerStyle = {
    backgroundImage: `url(${currentBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    transition: 'background-image 0.5s ease-in-out',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  };

  const contentWrapperStyle = {
    position: 'relative',
    zIndex: 2,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    transition: 'margin-left 0.3s ease',
    marginLeft: sidebarOpen ? '250px' : '0px',
    paddingTop: hideHeader ? '0px' : '220px',
  };

  return (
    <div style={appContainerStyle}>
      <div style={overlayStyle}></div>
      {/* {!hideHeader && <Sidebar isOpen={sidebarOpen} />} */}
      <div style={contentWrapperStyle}>
        {!hideHeader && <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/nosotros" element={<Nosotros />} />

          <Route path="/admin" element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<ProductosAdmin />} />
              <Route path="productos-admin" element={<ProductosAdmin />} />
              <Route path="categorias-admin" element={<CategoriasAdmin />} />
              <Route path="proveedores-admin" element={<ProveedoresAdmin />} />
            </Route>
          </Route>

          <Route path="/producto/:id" element={<ProductDetail />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={
              <div style={{ textAlign: 'center', marginTop: '50px', color: '#333' }}>
                <h1>404 - Página No Encontrada</h1>
                <p>Lo sentimos, la página que buscas no existe.</p>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}