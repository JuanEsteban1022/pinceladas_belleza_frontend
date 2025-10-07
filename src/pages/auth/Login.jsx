import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/public/apple-touch-icon1.png';
import { login } from '../../services/auth/authService';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // limpia error anterior

    try {
      const response = await login({
        username: form.username,
        password: form.password,
      });

      // Almacenamiento en storage
      localStorage.setItem('token', response.token);
      localStorage.setItem('rol', response.usuario.role); 
      if (response.usuario.role === 'ADMIN') {
        navigate('/admin/productos-admin')
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Error de login:', err);
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <div style={{ textAlign: 'center' }}>
          <img src={logo} alt="Pinceladas de Belleza" className="logo-redondo" />
          <h2>Iniciar Sesión</h2>
        </div>

        {error && (
          <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <div>
          <label>Nombre</label>
          <input
            type="text"
            name="username"
            value={form.username}
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

        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <button type="submit" style={{ padding: '10px 20px' }}>
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
}
