import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import {
  getProductos,
  crearProducto,
  actualizarStock,
  actualizarProducto,
  getCategorias,
  getProveedor,
  // actualizarProducto,
} from '../../services/productosServices';

export default function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    id: null,
    nombre: '',
    descripcion: '',
    beneficios: '',
    precio: '',
    cantidadStock: '',
    categoriaId: '',
    proveedorId: '',
    urlDrive: '',
  });

  const [modoEdicion, setModoEdicion] = useState(false);

  const cargarProveedores = async () => {
    try {
      const provs = await getProveedor();
      setProveedores(provs);
    } catch (e) {
      console.error('Error cargando proveedores:', e);
    }
  };

  const cargarCategorias = async () => {
    try {
      const category = await getCategorias();
      setCategorias(category);
    } catch (error) {
      console.error('Error cargando categorias:', error);
    }
  };

  const cargarProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  };

  const handleChange = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  const handleChangePrecio = (e) => {
    const raw = e.target.value.replace(/\D/g, '');
    setNuevoProducto({ ...nuevoProducto, precio: raw });
  };

  const limpiarFormulario = () => {
    setNuevoProducto({
      id: null,
      nombre: '',
      descripcion: '',
      beneficios: '',
      precio: '',
      cantidadStock: '',
      categoriaId: '',
      proveedorId: '',
      urlDrive: '',
    });
  };

  const handleCrearProducto = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...nuevoProducto,
        precio: Number(nuevoProducto.precio || 0),
        cantidadStock: Number(nuevoProducto.cantidadStock || 0),
        categoriaId: Number(nuevoProducto.categoriaId),
        proveedorId: Number(nuevoProducto.proveedorId),
      };

      if (modoEdicion) {
        // actualizarProducto(...payload) si lo tienes
        await actualizarProducto(payload);
        setModoEdicion(false);
      } else {
        await crearProducto(payload);
      }

      await cargarProductos();
      limpiarFormulario();
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  const handleEditarProducto = (producto) => {
    setNuevoProducto({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      beneficios: producto.beneficios,
      precio: producto.precio,
      cantidadStock: producto.cantidadStock,
      categoriaId: producto.categoria?.id ?? '',
      proveedorId: producto.proveedor?.id ?? '',
      urlDrive: producto.urlDrive,
    });
    setModoEdicion(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelarEdicion = () => {
    limpiarFormulario();
    setModoEdicion(false);
  };

  useEffect(() => {
    cargarProductos();
    cargarCategorias();
    cargarProveedores();
  }, []);

  // -------- Google Drive Picker helpers --------
  const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.readonly';
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  if (!CLIENT_ID || !API_KEY) {
    console.error('Faltan variables de entorno: VITE_GOOGLE_CLIENT_ID y/o VITE_GOOGLE_API_KEY');
  }

  const ensureApisLoaded = () =>
    new Promise((resolve) => {
      if (window.gapi && window.google && window.google.picker) return resolve();
      window.gapi?.load?.('client:picker', resolve);
    });

  const requestAccessToken = () =>
    new Promise((resolve) => {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: DRIVE_SCOPE,
        callback: (resp) => resolve(resp.access_token),
      });
      client.requestAccessToken();
    });

  const openDrivePicker = async () => {
    await ensureApisLoaded();
    const token = await requestAccessToken();

    const view = new window.google.picker.DocsView(window.google.picker.ViewId.DOCS_IMAGES)
      .setIncludeFolders(true)
      .setSelectFolderEnabled(false);

    const picker = new window.google.picker.PickerBuilder()
      .addView(view)
      .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
      .setOAuthToken(token)
      .setDeveloperKey(API_KEY)
      .setCallback((data) => {
        if (data.action === window.google.picker.Action.PICKED) {
          const docs = Array.isArray(data.docs) ? data.docs : [];
          if (docs.length === 0) return;
          const urls = docs.map((d) => `https://drive.google.com/file/d/${d.id}/view`);
          setNuevoProducto((prev) => {
            const prevList = (prev.urlDrive || '')
              .split(',')
              .map((u) => u.trim())
              .filter(Boolean);
            const merged = [...prevList, ...urls];
            return { ...prev, urlDrive: merged.join(',') };
          });
        }
      })
      .build();
    picker.setVisible(true);
  };

  const getDriveImageUrl = (urlDrive) => {
    if (!urlDrive) return '/img_no_found.png';
    let match = urlDrive.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (!match) match = urlDrive.match(/id=([a-zA-Z0-9_-]+)/);
    return match?.[1] ? `https://lh3.googleusercontent.com/d/${match[1]}` : '/img_no_found.png';
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

  return (
    <div className="admin-container">
      <div className="form-section">
        <form onSubmit={handleCrearProducto} style={{ marginBottom: '20px' }}>
          <h3 style={{ textAlign: 'center', paddingBottom: '1rem' }}>
            {modoEdicion ? 'Editar Producto' : 'Nuevo Producto'}
          </h3>

          <span className="span-input">Nombre:</span>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={nuevoProducto.nombre}
            onChange={handleChange}
            required
          />

          <span className="span-input">Descripción:</span>
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={nuevoProducto.descripcion}
            onChange={handleChange}
            rows={2}
          />

          <span className="span-input">Beneficios:</span>
          <textarea
            name="beneficios"
            placeholder="Beneficios"
            value={nuevoProducto.beneficios}
            onChange={handleChange}
            rows={2}
          />

          <span className="span-input">Precio:</span>
          <input
            type="text"
            name="precio"
            placeholder="Precio"
            value={formatearComoCOP(nuevoProducto.precio)}
            onChange={handleChangePrecio}
          />

          <span className="span-input">Cantidad:</span>
          <input
            type="number"
            name="cantidadStock"
            value={nuevoProducto.cantidadStock}
            onChange={handleChange}
            min={0}
          />

          <span className="span-input">Categoria:</span>
          <select
            name="categoriaId"
            value={nuevoProducto.categoriaId}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, categoriaId: Number(e.target.value) })}
            required
          >
            <option value="" disabled>Seleccione categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nombreCategoria}</option>
            ))}
          </select>

          <span className="span-input">Proveedor:</span>
          <select
            name="proveedorId"
            value={nuevoProducto.proveedorId}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, proveedorId: Number(e.target.value) })}
            required
          >
            <option value="" disabled>Seleccione proveedor</option>
            {proveedores.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.nombreProveedor ?? prov.nombre}
              </option>
            ))}
          </select>

          <span className="span-input">Imágenes:</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="text"
              name="urlDrive"
              placeholder="URLs de Drive separadas por coma"
              value={nuevoProducto.urlDrive}
              onChange={handleChange}
              style={{ flex: 1 }}
              readOnly
            />
            <button type="button" onClick={openDrivePicker} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd', background: '#e57d90' }}>
              Agregar desde Drive
            </button>
          </div>

          {(() => {
            const list = (nuevoProducto.urlDrive || '').split(',').map(s => s.trim()).filter(Boolean);
            if (list.length === 0) return null;

            const setPortada = (idx) => {
              const re = [...list];
              const [sel] = re.splice(idx, 1);
              const nueva = [sel, ...re]; // mueve la elegida al inicio = portada
              setNuevoProducto(prev => ({ ...prev, urlDrive: nueva.join(',') }));
            };
            const quitar = (idx) => {
              const re = list.filter((_, i) => i !== idx);
              setNuevoProducto(prev => ({ ...prev, urlDrive: re.join(',') }));
            };

            return (
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
                {list.map((u, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    <img
                      src={getDriveImageUrl(u)}
                      alt={`img-${idx}`}
                      style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }}
                      onError={(e) => { e.currentTarget.src = '/img_no_found.png'; }}
                    />
                    <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                      <button type="button" onClick={() => setPortada(idx)} style={{ padding: '4px 8px', borderRadius: 6 }}>
                        Usar como portada
                      </button>
                      <button type="button" onClick={() => quitar(idx)} style={{ padding: '4px 8px', borderRadius: 6, background: '#fee2e2', border: '1px solid #fca5a5' }}>
                        Quitar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Galería a partir de urlDrive separado por comas */}
          {(() => {
            const list = (nuevoProducto.urlDrive || '')
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean);
            if (list.length === 0) return null;
            const setPortada = (idx) => {
              const re = [...list];
              const [sel] = re.splice(idx, 1);
              const nueva = [sel, ...re];
              setNuevoProducto((prev) => ({ ...prev, urlDrive: nueva.join(',') }));
            };
            const quitar = (idx) => {
              const re = list.filter((_, i) => i !== idx);
              setNuevoProducto((prev) => ({ ...prev, urlDrive: re.join(',') }));
            };
            return (
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
                {list.map((u, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    <img
                      src={getDriveImageUrl(u)}
                      alt={`img-${idx}`}
                      style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }}
                      onError={(e) => { e.currentTarget.src = '/img_no_found.png'; }}
                    />
                    <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                      <button type="button" onClick={() => setPortada(idx)} style={{ padding: '4px 8px', borderRadius: 6 }}>
                        Usar como portada
                      </button>
                      <button type="button" onClick={() => quitar(idx)} style={{ padding: '4px 8px', borderRadius: 6, background: '#fee2e2', border: '1px solid #fca5a5' }}>
                        Quitar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          <div style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 16 }}>
            <button type="submit" style={{ marginRight: '10px' }}>
              {modoEdicion ? 'Actualizar Producto' : 'Crear Producto'}
            </button>

            {modoEdicion && (
              <button
                type="button"
                onClick={handleCancelarEdicion}
                style={{
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  padding: '8px 14px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="product-section">
        <h2 style={{ textAlign: 'center' }}>Administrar Productos</h2>
        <div className="product-list">
          {productos.map((p) => (
            <div
              key={p.id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
              }}
            >
              <ProductCard product={p} onEdit={handleEditarProducto} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
