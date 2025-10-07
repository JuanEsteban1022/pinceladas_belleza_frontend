import axios from 'axios';

const API_URL = 'http://localhost:8080';
const token = localStorage.getItem('token');

const authHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

export const getProductos = async () => {
    const res = await axios.get(`${API_URL}/productos`, authHeaders());
    return res.data;
};

export const crearProducto = async (producto) => {
    await axios.post(`${API_URL}/productos/create`, producto, authHeaders());
};

export const actualizarStock = async (id, nuevaCantidad) => {
    await axios.put(`${API_URL}/productos/${id}`, { cantidad_en_stock: nuevaCantidad });
};

export const getCategorias = async () => {
    const res = await axios.get(`${API_URL}/category`, authHeaders());
    return res.data;
};

export const getProveedor = async () => {
    const res = await axios.get(`${API_URL}/proveedor`, authHeaders());
    return res.data;
};

export const getProductoById = async (id) => {
    const res = await axios.get(`${API_URL}/productos/${id}`, authHeaders());
    return res.data;
};

export const actualizarProducto = async (producto) => {
    await axios.put(`${API_URL}/productos/update/${producto.id}`, producto, authHeaders());
};
