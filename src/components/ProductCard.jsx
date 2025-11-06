import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onEdit }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const { addToCart } = useCart();
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const rol = localStorage.getItem('rol');
    setIsAdmin(rol === 'ADMIN');
  }, []);

  const handleCantidadChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) setCantidad(value);
  };

  const handleAdd = () => {
    addToCart(product, cantidad);
    setCantidad(1);
  };

  const formatearComoCOP = (valor) => {
    if (!valor) return '';
    const numero = parseInt(valor.toString().replace(/\D/g, '')) || 0;
    return numero.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    });
  };

  const getDriveImageUrl = (urlDrive) => {
    if (!urlDrive) return '/img_no_found.png';
    let match = urlDrive.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (!match) match = urlDrive.match(/id=([a-zA-Z0-9_-]+)/);
    return match?.[1] ? `https://lh3.googleusercontent.com/d/${match[1]}` : '/img_no_found.png';
  };

  const portadaUrl = (product.urlDrive || '').split(',')[0]?.trim();

  return (
    <div className="product-card">
      <img
        src={getDriveImageUrl(portadaUrl)}
        alt={product.nombre}
        className="product-image"
        loading="lazy"
        onError={(e) => {
          if (!e.currentTarget.dataset.fallback) {
            e.currentTarget.src = '/img_no_found.png';
            e.currentTarget.dataset.fallback = 'true';
          }
        }}
      />

      <h3 className="product-name">{product.nombre}</h3>
      <p className="product-price">{formatearComoCOP(product.precio)}</p>

      {!isAdmin ? (
        <div className="product-actions">
          <input
            type="number"
            min="1"
            value={cantidad}
            onChange={handleCantidadChange}
            className="cantidad-input"
          />
          <button className="btn-add" onClick={handleAdd}>
            Agregar
          </button>
          <Link to={`/producto/${product.id}`} className="btn-secondary" style={{ marginLeft: 8 }}>
            Ver más
          </Link>
        </div>
      ) : (
        <div className="product-actions">
          <button className="btn-add" onClick={() => onEdit(product)}>
            Editar producto
          </button>
          <Link to={`/producto/${product.id}`} className="btn-secondary" style={{ marginLeft: 8 }}>
            Ver más
          </Link>
        </div>
      )}
    </div>
  );
}
