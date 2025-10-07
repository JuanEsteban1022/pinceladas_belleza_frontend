import { useEffect, useState } from 'react';
import { getCategorias, crearCategoria, actualizarCategoria, eliminarCategoria } from '../../services/categoriaServices';

export default function CategoriasAdmin() {
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState('');
    const [editId, setEditId] = useState(null);

    const cargar = async () => {
        const data = await getCategorias();
        setCategorias(data);
    };

    useEffect(() => { cargar(); }, []);

    const resetForm = () => { setNombre(''); setEditId(null); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nombre.trim()) return;
        if (editId) {
            await actualizarCategoria(editId, { nombreCategoria: nombre.trim() });
        } else {
            await crearCategoria({ nombreCategoria: nombre.trim() });
        }
        await cargar();
        resetForm();
    };

    const onEdit = (cat) => { setEditId(cat.id); setNombre(cat.nombreCategoria); };
    const onDelete = async (id) => { await eliminarCategoria(id); await cargar(); };

    return (
        <div className="admin-container">
            <div className="form-section">
                <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
                    <h3 style={{ textAlign: 'center', paddingBottom: '1rem' }}>
                        {editId ? 'Editar Categoría' : 'Nueva Categoría'}
                    </h3>

                    <span className="span-input">Nombre categoría:</span>
                    <input
                        type="text"
                        placeholder="Ej: Cuidado facial"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
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
                <h2 style={{ textAlign: 'center' }}>Administrar Categorías</h2>
                <div className="product-list">
                    {categorias.map((c) => (
                        <div key={c.id} className="product-card" style={{ padding: 16 }}>
                            <div style={{ fontWeight: 600, marginBottom: 8 }}>{c.nombreCategoria}</div>
                            <div className="product-actions">
                                <button onClick={() => onEdit(c)}>Editar</button>
                                <button onClick={() => onDelete(c.id)} style={{ background: '#e74c3c', color: '#fff' }}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                    {categorias.length === 0 && <div>No hay categorías</div>}
                </div>
            </div>
        </div>
    );
}