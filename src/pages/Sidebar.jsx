import { Link } from 'react-router-dom';
import { FiHome, FiShoppingBag, FiUser, FiShoppingCart, FiMenu } from 'react-icons/fi';

export default function Sidebar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <Link to="/" className="sidebar-link">
        <FiHome /> <span>Inicio</span>
      </Link>
      <Link to="/productos" className="sidebar-link">
        <FiShoppingBag /> <span>Productos</span>
      </Link>
      <Link to="/categorias" className="sidebar-link">
        <FiUser /> <span>Categorías</span>
      </Link>
      <Link to="/admin/productos-admin" className="sidebar-link">
        <FiShoppingCart /> <span>Proveedores</span>
      </Link>
    </aside>
  );
}
