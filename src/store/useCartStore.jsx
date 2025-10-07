import { create } from 'zustand';
import { getProductos } from '../services/productosServices';

export const useCartStore = create((set) => ({
  carrito: [],
  isAdmin: false,
  rol: '',
  productoEnEdicion: null, // ← Nuevo estado para editar producto

  // Listado de productos para vista de cliente
  productos: [],
  loading: false,
  error: null,

  setProductoEnEdicion: (producto) => set({ productoEnEdicion: producto }),

  setRol: () => {
    const rol = localStorage.getItem('rol') || '';
    set({ rol, isAdmin: rol === 'ADMIN' });
  },

  addToCart: (product, cantidad) =>
    set((state) => {
      const existingProduct = state.carrito.find((item) => item.id === product.id);
      if (existingProduct) {
        return {
          carrito: state.carrito.map((item) =>
            item.id === product.id
              ? { ...item, cantidad: item.cantidad + cantidad }
              : item
          ),
        };
      } else {
        return { carrito: [...state.carrito, { ...product, cantidad }] };
      }
    }),

  // Acción para cargar productos desde la API
  fetchProductos: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getProductos();
      set({ productos: Array.isArray(data) ? data : [], loading: false });
    } catch (e) {
      set({ error: e?.message || 'Error cargando productos', loading: false });
    }
  },
}));
