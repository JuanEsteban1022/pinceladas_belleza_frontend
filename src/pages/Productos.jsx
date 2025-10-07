import { useEffect } from 'react';
import { useCartStore } from '../store/useCartStore';
import ProductCard from '../components/ProductCard';

export default function Productos() {
  const { productos, fetchProductos, loading, error } = useCartStore();

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  const items = Array.isArray(productos) ? productos : [];

  return (
    <div className="productos-container">
      <h2 className="productos-title">Productos</h2>

      {loading && <p>Cargando productos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="product-list">
        {items.length > 0 ? (
          items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))
        ) : (
          !loading && <p>No hay productos disponibles</p>
        )}
      </div>
    </div>
  );
}
