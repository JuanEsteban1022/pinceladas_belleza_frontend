import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductoById } from '../services/productosServices';
import { useCart } from '../context/CartContext';

const formatearComoCOP = (valor) => {
    const numero = parseInt((valor ?? '').toString().replace(/\D/g, '')) || 0;
    return numero.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
};

const getDriveImageUrl = (urlDrive) => {
    if (!urlDrive) return '/img_no_found.png';
    let match = urlDrive.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (!match) match = urlDrive.match(/id=([a-zA-Z0-9_-]+)/);
    return match?.[1] ? `https://lh3.googleusercontent.com/d/${match[1]}` : '/img_no_found.png';
};

export default function ProductDetail() {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cantidad, setCantidad] = useState(1);
    const { addToCart } = useCart();
    const [index, setIndex] = useState(0);


    useEffect(() => {
        const load = async () => {
            try {
                const data = await getProductoById(id);
                setProducto(data);
            } catch (e) {
                console.error('Error cargando producto:', e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    if (loading) return <div style={{ padding: 20 }}>Cargando...</div>;
    if (!producto) return <div style={{ padding: 20 }}>Producto no encontrado</div>;

    // Normaliza imágenes: usa arreglos del backend o separa urlDrive por comas
    const rawImages = producto.imagenes || producto.images || producto.fotos || [];
    const urlsFromDrive = (producto.urlDrive || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    const imageUrls = (Array.isArray(rawImages) && rawImages.length > 0)
        ? rawImages.map((u) => getDriveImageUrl(u))
        : (urlsFromDrive.length > 0
            ? urlsFromDrive.map((u) => getDriveImageUrl(u))
            : [getDriveImageUrl(producto.urlDrive)]);

    const goPrev = () => setIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
    const goNext = () => setIndex((prev) => (prev + 1) % imageUrls.length);
    const selectIdx = (i) => setIndex(i);

    return (
        <div className="detalle-container">
            <div className="detalle-grid">
                <div>
                    <div className="carousel">
                        <button className="carousel-btn prev" onClick={goPrev} aria-label="Imagen anterior">‹</button>
                        <img
                            src={imageUrls[index]}
                            alt={producto.nombre}
                            className="detalle-image"
                            onError={(e) => { e.currentTarget.src = '/img_no_found.png'; }}
                        />
                        <button className="carousel-btn next" onClick={goNext} aria-label="Imagen siguiente">›</button>
                    </div>
                    {imageUrls.length > 1 && (
                        <div className="thumbs">
                            {imageUrls.map((u, i) => (
                                <button key={i} className={`thumb ${i === index ? 'active' : ''}`} onClick={() => selectIdx(i)}>
                                    <img src={u} alt={`thumb-${i}`} onError={(e) => { e.currentTarget.src = '/img_no_found.png'; }} />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h1 className="detalle-title">{producto.nombre}</h1>
                    <div className="detalle-price">{formatearComoCOP(producto.precio)}</div>

                    {producto.descripcion && (
                        <>
                            <h3 className="detalle-section-title">Descripción</h3>
                            <p className="detalle-desc">{producto.descripcion}</p>
                        </>
                    )}

                    {producto.beneficios && (
                        <>
                            <h3 className="detalle-section-title">Beneficios</h3>
                            <p className="detalle-desc">{producto.beneficios}</p>
                        </>
                    )}

                    <div className="detalle-cta">
                        <input
                            type="number"
                            min="1"
                            value={cantidad}
                            onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value || '1', 10)))}
                            className="detalle-qty"
                        />
                        <button className="btn-add" onClick={() => addToCart(producto, cantidad)}>
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}