/**
 * Navigation Event Handlers
 * Maneja todos los eventos de navegación usando addEventListener
 * Cumple con los requisitos del Módulo 2: uso de addEventListener en lugar de onclick
 */

/**
 * Configurar todos los event listeners de navegación
 * Se ejecuta cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', function() {
    setupNavigationListeners();
});

/**
 * Configurar todos los listeners de navegación
 */
function setupNavigationListeners() {
    // Navegación principal - Links del navbar
    setupNavbarListeners();
    
    // Botones de navegación en las secciones
    setupSectionButtons();
    
    // Mapa interactivo
    setupMapToggle();
}

/**
 * Configurar listeners para los links del navbar
 * Usa data attributes para mejor separación de concerns
 */
function setupNavbarListeners() {
    // Link de Inicio
    const homeLink = document.querySelector('a[data-nav="home"]');
    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof goHome === 'function') {
                goHome();
            }
        });
    }

    // Link de Mapa
    const mapLink = document.querySelector('a[data-nav="map"]');
    if (mapLink) {
        mapLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof scrollToMap === 'function') {
                scrollToMap();
            }
        });
    }

    // Link de Estadísticas
    const statsLink = document.querySelector('a[data-nav="stats"]');
    if (statsLink) {
        statsLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof showStats === 'function') {
                showStats();
            }
        });
    }

    // Link de Torres del Paine
    const torresLink = document.querySelector('a[data-nav="torres"]');
    if (torresLink) {
        torresLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof showTorresDetail === 'function') {
                showTorresDetail();
            }
        });
    }
}

/**
 * Configurar listeners para botones en las secciones
 * Usa data attributes para mejor separación de concerns
 */
function setupSectionButtons() {
    // Botones "Volver al Inicio" en las secciones (usando data-action)
    const backButtons = document.querySelectorAll('button[data-action="go-home"], a[data-action="go-home"]');
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof goHome === 'function') {
                goHome();
            }
        });
    });
}

/**
 * Configurar listener para el toggle del mapa
 * Usa data attribute para mejor separación de concerns
 */
function setupMapToggle() {
    const mapHeader = document.querySelector('.map-header[data-toggle="map"]');
    if (mapHeader) {
        mapHeader.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof toggleMap === 'function') {
                toggleMap();
            }
        });
    }
}

