import { useState } from 'react';
import logo from '/public/apple-touch-icon1.png';

export default function Register() {
  const [form, setForm] = useState({
    nombre: '',
    password: '',
    rol: 'cliente'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos registrados:', form);
    // Aquí iría la llamada al backend para registrar el usuario
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <div style={{ textAlign: 'center' }}>
          <img src={logo} alt="Pinceladas de Belleza" className="logo-redondo" />
          <h2 style={{ textAlign: 'center' }}>Registro</h2>
        </div>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label>Rol</label>
          <select
            name="rol"
            value={form.rol}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="cliente">Inventario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button type="submit" style={{ padding: '10px 20px' }}>
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
