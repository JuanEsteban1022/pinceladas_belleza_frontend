import { useCart } from '../context/CartContext';

function formatearComoCOP(valor) {
  if (valor == null) return '';
  const numero = parseInt(valor.toString().replace(/\D/g, '')) || 0;
  return numero.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
}

function getDriveImageUrl(urlDrive) {
  if (!urlDrive) return '/img_no_found.png';
  let match = urlDrive.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) match = urlDrive.match(/id=([a-zA-Z0-9_-]+)/);
  return match?.[1] ? `https://lh3.googleusercontent.com/d/${match[1]}` : '/img_no_found.png';
}

export default function Carrito() {
  const { cart, updateQty, removeFromCart, clearCart } = useCart();

  const items = Array.isArray(cart) ? cart : [];
  const subtotal = items.reduce((acc, it) => acc + (Number(it.precio ?? it.price ?? 0) * Number(it.cantidad ?? 1)), 0);
  const envio = 0; // placeholder
  const total = subtotal + envio;

  const handleClearWithConfirm = async () => {
    const res = await Swal.fire({
      title: 'Vaciar carrito',
      text: '¿Seguro que deseas eliminar todos los productos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e57d90',
      cancelButtonColor: '#6b7280',
      reverseButtons: true,
    });
    if (res.isConfirmed) {
      clearCart();
      Swal.fire({
        icon: 'success',
        title: 'Carrito vacío',
        showConfirmButton: false,
        timer: 1200,
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="container">
        <h2>Carrito de Compras</h2>
        <p>Tu carrito está vacío</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Carrito de Compras</h2>

      <div className="cart-grid">
        <div className="cart-left">
          {items.map((item) => {
            const portadaUrl = (item.urlDrive || '').split(',')[0]?.trim();
            const nombre = item.nombre ?? item.name ?? 'Producto';
            const precio = Number(item.precio ?? item.price ?? 0);
            const cantidad = Number(item.cantidad ?? 1);
            const lineTotal = precio * cantidad;
            return (
              <div className="cart-row" key={item.id}>
                <button className="cart-remove" aria-label="Eliminar" onClick={() => removeFromCart(item.id)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <img className="cart-thumb" src={getDriveImageUrl(portadaUrl)} alt={nombre} onError={(e) => { if (!e.currentTarget.dataset.fallback) { e.currentTarget.src = '/img_no_found.png'; e.currentTarget.dataset.fallback = 'true'; } }} />
                <div className="cart-col name">
                  <div className="cart-name">{nombre}</div>
                  <div className="cart-unit">Unidad: {formatearComoCOP(precio)}</div>
                </div>
                <div className="cart-col price">{formatearComoCOP(precio)}</div>
                <div className="cart-col qty">
                  <div className="qty-stepper">
                    <button onClick={() => updateQty(item.id, cantidad - 1)}>-</button>
                    <input type="number" min="1" value={cantidad} onChange={(e) => updateQty(item.id, e.target.value)} />
                    <button onClick={() => updateQty(item.id, cantidad + 1)}>+</button>
                  </div>
                </div>
                <div className="cart-col line-total">{formatearComoCOP(lineTotal)}</div>
              </div>
            );
          })}

          <div className="cart-actions">
            <input className="coupon-input" placeholder="Código de cupón" disabled />
            <button className="btn-secondary" disabled>Aplicar cupón</button>
            <button className="btn-outline" onClick={handleClearWithConfirm}>Limpiar Carrito</button>
            <button className="btn-dark" disabled>Compartir Carrito</button>
          </div>
        </div>

        <aside className="cart-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatearComoCOP(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Envío</span>
            <button className="summary-link" disabled>Calcular envío ▾</button>
          </div>
          <hr />
          <div className="summary-row total">
            <span>Total</span>
            <strong>{formatearComoCOP(total)}</strong>
          </div>
          <p className="summary-hint">calcula el envío para proceder…</p>
          <button className="btn-disabled" disabled>Finalizar compra</button>
        </aside>
      </div>
    </div>
  );
}
