import axios from 'axios';

const API_URL = 'https://pinceladas-belleza-backend.onrender.com';
const token = localStorage.getItem('token');

const authHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

export const crearProveedor = async (proveedor) => {
    await axios.post(`${API_URL}/proveedor/create`, proveedor, authHeaders());
};

export const actualizarProveedor = async (proveedor) => {
    await axios.put(`${API_URL}/proveedor/update`, proveedor, authHeaders());
};

export const getProveedores = async () => {
    const res = await axios.get(`${API_URL}/proveedor`, authHeaders());
    return res.data;
};

export const getProveedor = async (id) => {
    const res = await axios.get(`${API_URL}/proveedor/${id}`, authHeaders());
    return res.data;
};

export const eliminarProveedor = async (id) => {
    await axios.delete(`${API_URL}/proveedor/${id}`, authHeaders());
};