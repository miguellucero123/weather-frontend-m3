/**
 * Sistema de Tema Claro/Oscuro
 * Maneja el cambio entre modo claro y oscuro en toda la aplicación
 */

class ThemeManager {
    constructor() {
        this.theme = this.getStoredTheme() || 'light';
        this.init();
    }

    /**
     * Inicializar el tema
     */
    init() {
        // Aplicar tema guardado
        this.applyTheme(this.theme);
        
        // Configurar evento del botón
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleTheme());
        }

        // Detectar preferencia del sistema
        if (!this.getStoredTheme()) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                this.theme = 'dark';
                this.applyTheme('dark');
            }
        }
    }

    /**
     * Obtener tema guardado en localStorage
     */
    getStoredTheme() {
        try {
            return localStorage.getItem('theme');
        } catch (e) {
            return null;
        }
    }

    /**
     * Guardar tema en localStorage
     */
    saveTheme(theme) {
        try {
            localStorage.setItem('theme', theme);
        } catch (e) {
            console.warn('No se pudo guardar el tema:', e);
        }
    }

    /**
     * Cambiar entre tema claro y oscuro
     */
    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.theme);
        this.saveTheme(this.theme);
    }

    /**
     * Aplicar tema a la página
     */
    applyTheme(theme) {
        const html = document.documentElement;
        const icon = document.getElementById('themeIcon');
        
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
            if (icon) {
                icon.className = 'fas fa-sun';
            }
        } else {
            html.setAttribute('data-theme', 'light');
            if (icon) {
                icon.className = 'fas fa-moon';
            }
        }

        // Actualizar clase en body para compatibilidad
        document.body.classList.toggle('dark-mode', theme === 'dark');
    }

    /**
     * Obtener tema actual
     */
    getCurrentTheme() {
        return this.theme;
    }
}

// Inicializar ThemeManager
let themeManager;

// Función de inicialización
function initTheme() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            themeManager = new ThemeManager();
            if (typeof window !== 'undefined') {
                window.themeManager = themeManager;
            }
        });
    } else {
        // DOM ya está listo
        themeManager = new ThemeManager();
        if (typeof window !== 'undefined') {
            window.themeManager = themeManager;
        }
    }
}

// Inicializar inmediatamente
initTheme();

