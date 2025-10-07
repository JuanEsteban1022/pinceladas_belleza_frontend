import { useEffect, useState } from 'react';
import { getProveedores, crearProveedor, actualizarProveedor, eliminarProveedor } from '../../services/proveedorServices';

export default function ProveedoresAdmin() {
    const [proveedores, setProveedores] = useState([]);
    const [nombre, setNombre] = useState('');
    const [contacto, setContacto] = useState('');
    const [editId, setEditId] = useState(null);

    const cargar = async () => {
        const data = await getProveedores();
        setProveedores(data);
    };

    useEffect(() => { cargar(); }, []);

    const resetForm = () => { setNombre(''); setContacto(''); setEditId(null); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { nombreProveedor: nombre.trim(), contacto: contacto.trim() || undefined };
        if (!payload.nombreProveedor) return;

        if (editId) {
            await actualizarProveedor(editId, payload);
        } else {
            await crearProveedor(payload);
        }
        await cargar();
        resetForm();
    };

    const onEdit = (p) => {
        setEditId(p.id);
        setNombre(p.nombreProveedor ?? p.nombre ?? '');
        setContacto(p.contacto ?? '');
    };

    const onDelete = async (id) => { await eliminarProveedor(id); await cargar(); };

    return (
        <div className="admin-container">
            <div className="form-section">
                <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
                    <h3 style={{ textAlign: 'center', paddingBottom: '1rem' }}>
                        {editId ? 'Editar Proveedor' : 'Nuevo Proveedor'}
                    </h3>

                    <span className="span-input">Nombre proveedor:</span>
                    <input
                        type="text"
                        placeholder="Ej: Distribuidora Atenea"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />

                    <span className="span-input">Contacto (opcional):</span>
                    <input
                        type="text"
                        placeholder="Teléfono/Email"
                        value={contacto}
                        onChange={(e) => setContacto(e.target.value)}
                    />

                    <div style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 16 }}>
                        <button type="submit" style={{ marginRight: 10 }}>
                            {editId ? 'Actualizar' : 'Crear'}
                        </button>
                        {editId && (
                            <button type="button" onClick={resetForm} style={{ background: '#e74c3c', color: '#fff' }}>
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="product-section">
                <h2 style={{ textAlign: 'center' }}>Administrar Proveedores</h2>
                <div className="product-list">
                    {proveedores.map((p) => (
                        <div key={p.id} className="product-card" style={{ padding: 16 }}>
                            <div style={{ fontWeight: 600, marginBottom: 8 }}>{p.nombreProveedor ?? p.nombre}</div>
                            {p.contacto && <div style={{ color: '#6b7280', marginBottom: 8 }}>{p.contacto}</div>}
                            <div className="product-actions">
                                <button onClick={() => onEdit(p)}>Editar</button>
                                <button onClick={() => onDelete(p.id)} style={{ background: '#e74c3c', color: '#fff' }}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                    {proveedores.length === 0 && <div>No hay proveedores</div>}
                </div>
            </div>
        </div>
    );
}