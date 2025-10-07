import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from '/public/apple-touch-icon1.png';
import { FiMenu } from 'react-icons/fi';
import SkinTestForm from '../components/SkinTestForm';
import { FiShoppingBag } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

export default function Header({ sidebarOpen, setSidebarOpen }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    const rol = localStorage.getItem('rol');
    setIsAdmin(rol === 'ADMIN');
  }, []);

  const totalItems = cart.reduce((total, item) => total + item.cantidad, 0);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <header className="header" style={{
        marginLeft: isAdmin ? (sidebarOpen ? '200px' : '0') : '0',
        transition: 'margin-left 0.3s ease',
      }}>
        <div className="logo-header">
          {isAdmin && (
            <button
              onClick={toggleSidebar}
              className="boton-admin"
            >
              <FiMenu size={24} />
            </button>
          )}
          <Link to="/" className="logo-header">
            <img src={logo} alt="Pinceladas de Belleza" className="logo-redondo" />
            <h1 className="title">Pinceladas de belleza</h1>
          </Link>
          <div className="skin-test-container">
            <button className="btn-cloud" onClick={openModal}>
              Descubre tu tipo de piel
            </button>
          </div>
        </div>
        {!isAdmin && (
          <nav className="client-topbar">
            <div className="menu">
              <NavLink to="/" end>Inicio</NavLink>
              <NavLink to="/productos">Productos</NavLink>
              <NavLink to="/productos/1">Maquillaje</NavLink>
              <NavLink to="/productos/2">Cuidado Capilar</NavLink>
              <NavLink to="/productos/3">Uñas</NavLink>
              <NavLink to="/productos/4">Accesorios ▾</NavLink>
              <NavLink to="/productos/5">Perfumes ▾</NavLink>
            </div>

            <div className="menu-right">
              <span className="cart-total">
                ${' '}{(cart.reduce((t, it) => t + (parseInt((it.precio || 0).toString().replace(/\D/g, '')) || 0) * it.cantidad, 0)).toLocaleString('es-CO')}
              </span>
              <Link to="/carrito" className="bag-button" aria-label="Ir al carrito">
                <FiShoppingBag />
                <span className="bag-count">{totalItems}</span>
              </Link>
            </div>
          </nav>
        )}
      </header>
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <SkinTestForm />
          </div>
        </div>
      )}
    </>
  );
}
