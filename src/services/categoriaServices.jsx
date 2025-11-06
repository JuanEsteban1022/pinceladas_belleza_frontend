import axios from 'axios';

const API_URL = 'https://pinceladas-belleza-backend.onrender.com';
const token = localStorage.getItem('token');

const authHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

export const crearCategoria = async (categoria) => {
    await axios.post(`${API_URL}/category/create`, categoria, authHeaders());
};

export const actualizarCategoria = async (categoria) => {
    await axios.put(`${API_URL}/category/update`, categoria, authHeaders());
};

export const getCategorias = async () => {
    const res = await axios.get(`${API_URL}/category`, authHeaders());
    return res.data;
};

export const getCategoria = async (id) => {
    const res = await axios.get(`${API_URL}/category/${id}`, authHeaders());
    return res.data;
};

export const eliminarCategoria = async (id) => {
    await axios.delete(`${API_URL}/category/${id}`, authHeaders());
};