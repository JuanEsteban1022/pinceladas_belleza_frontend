import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '/public/apple-touch-icon1.png';

export default function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [showTip, setShowTip] = useState(() => localStorage.getItem('admin_tip_closed') === 'true' ? false : true);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        navigate('/login');
    };

    const colors = {
        sidebarBg: '#0f172a',        // slate-900
        sidebarItem: '#cbd5e1',      // slate-300
        sidebarActiveBg: '#1e293b',  // slate-800
        sidebarActiveText: '#e57d90',
        topbarBg: 'linear-gradient(90deg, #fde5e2 0%, #ffe9f1 100%)',
        border: '#e5e7eb',
        contentBg: '#fff0f3',
        btnText: '#111827',
        btnBg: '#ffffff',
        btnBorder: '#d1d5db',
        btnHoverBg: '#f9fafb',
        btnActiveBg: '#f3f4f6',
        dangerBg: '#ef4444',
        dangerHoverBg: '#dc2626',
        dangerText: '#ffffff',
    };

    const buttonBase = {
        border: `1px solid ${colors.btnBorder}`,
        background: colors.btnBg,
        color: colors.btnText,
        borderRadius: 8,
        padding: '8px 12px',
        cursor: 'pointer',
        fontSize: 14,
        transition: 'all .15s ease',
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: colors.contentBg }}>
            {/* Sidebar */}
            <aside
                style={{
                    width: isSidebarOpen ? 260 : 80,
                    transition: 'width .2s ease',
                    background: colors.sidebarBg,
                    color: '#fff',
                    padding: isSidebarOpen ? '16px 12px' : '16px 8px',
                }}
            >
                {/* Header del sidebar con icono toggle */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isSidebarOpen ? 'space-between' : 'center',
                        gap: 8,
                        marginBottom: 20,
                    }}
                >
                    <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: 0.3 }}>
                        {isSidebarOpen ? 'Administración' : 'AP'}
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen((v) => !v)}
                        aria-label={isSidebarOpen ? 'Ocultar menú' : 'Mostrar menú'}
                        title={isSidebarOpen ? 'Ocultar menú' : 'Mostrar menú'}
                        style={{
                            border: '1px solid #334155',
                            background: 'transparent',
                            color: '#cbd5e1',
                            width: 36,
                            height: 36,
                            minWidth: 36,
                            borderRadius: 10,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'background .15s ease, border-color .15s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#1e293b';
                            e.currentTarget.style.borderColor = '#475569';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = '#334155';
                        }}
                    >
                        {isSidebarOpen ? (
                            // Chevron-left
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        ) : (
                            // Chevron-right
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        )}
                    </button>
                </div>

                {/* Navegación */}
                <nav>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                        <li>
                            <Link
                                to="/admin/productos-admin"
                                style={{
                                    display: 'block',
                                    padding: '10px 12px',
                                    color: location.pathname.includes('/admin/productos-admin')
                                        ? colors.sidebarActiveText
                                        : colors.sidebarItem,
                                    textDecoration: 'none',
                                    borderRadius: 10,
                                    background: location.pathname.includes('/admin/productos-admin')
                                        ? colors.sidebarActiveBg
                                        : 'transparent',
                                    border: `1px solid ${location.pathname.includes('/admin/productos-admin') ? '#334155' : 'transparent'}`,
                                    textAlign: isSidebarOpen ? 'left' : 'center',
                                }}
                            >
                                {isSidebarOpen ? 'Productos' : 'PD'}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/categorias-admin"
                                style={{
                                    display: 'block',
                                    padding: '10px 12px',
                                    color: location.pathname.includes('/admin/categorias-admin') ? colors.sidebarActiveText : colors.sidebarItem,
                                    textDecoration: 'none',
                                    borderRadius: 10,
                                    background: location.pathname.includes('/admin/categorias-admin') ? colors.sidebarActiveBg : 'transparent',
                                    border: `1px solid ${location.pathname.includes('/admin/categorias-admin') ? '#334155' : 'transparent'}`,
                                    textAlign: isSidebarOpen ? 'left' : 'center',
                                }}
                            >
                                {isSidebarOpen ? 'Categorías' : 'CG'}
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/admin/proveedores-admin"
                                style={{
                                    display: 'block',
                                    padding: '10px 12px',
                                    color: location.pathname.includes('/admin/proveedores-admin') ? colors.sidebarActiveText : colors.sidebarItem,
                                    textDecoration: 'none',
                                    borderRadius: 10,
                                    background: location.pathname.includes('/admin/proveedores-admin') ? colors.sidebarActiveBg : 'transparent',
                                    border: `1px solid ${location.pathname.includes('/admin/proveedores-admin') ? '#334155' : 'transparent'}`,
                                    textAlign: isSidebarOpen ? 'left' : 'center',
                                }}
                            >
                                {isSidebarOpen ? 'Proveedores' : 'PV'}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Topbar */}
                <header
                    style={{
                        height: 64,
                        background: colors.topbarBg,
                        borderBottom: `1px solid ${colors.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 16px',
                        position: 'sticky',
                        top: 0,
                        zIndex: 10,
                        boxShadow: '0 2px 8px rgba(0,0,0,.06)'
                    }}
                >

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <img
                            src={logo} /* Reemplaza por tu ruta real del logo, por ejemplo: /assets/logo.png */
                            alt="Pinceladas de Belleza"
                            className="logo-redondo"
                            style={{ height: 28, width: 28, borderRadius: 6, objectFit: 'cover' }}
                        />
                        <span style={{ color: '#111827', fontWeight: 700, fontSize: 14 }}>Pinceladas de Belleza</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px' }}>
                        <span style={{ color: '#111827', fontWeight: 600 }}>Administrador</span>
                        <button
                            onClick={handleLogout}
                            style={{
                                ...buttonBase,
                                background: colors.dangerBg,
                                color: colors.dangerText,
                                borderColor: 'transparent',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = colors.dangerHoverBg)}
                            onMouseLeave={(e) => (e.currentTarget.style.background = colors.dangerBg)}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </header>

                {/* Content */}
                <main style={{ padding: 20 }}>

                    {showTip && (
                        <div
                            style={{
                                position: 'relative',
                                border: `1px solid ${colors.border}`,
                                background: '#fff',
                                borderRadius: 12,
                                padding: '12px 40px 12px 12px',
                                marginBottom: 16,
                                color: '#6b7280',
                                fontSize: 13,
                            }}
                        >
                            Consejo: usa el botón "Ocultar menú" para ampliar el espacio de trabajo.
                            <button
                                aria-label="Cerrar aviso"
                                title="Cerrar"
                                onClick={() => { setShowTip(false); localStorage.setItem('admin_tip_closed', 'true'); }}
                                style={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    width: 24,
                                    height: 24,
                                    borderRadius: 6,
                                    border: `1px solid ${colors.border}`,
                                    background: '#fff',
                                    color: '#6b7280',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                ×
                            </button>
                        </div>
                    )}
                    <Outlet />
                </main>
            </div>
        </div>
    );
}