/**
 * Utilidades de validación
 * Funciones puras para validar datos
 */

/**
 * Obtiene la configuración de la app (compatibilidad sin módulos)
 */
function getAppConfig() {
    return window.APP_CONFIG || {
        ESTADOS_CLIMA: {
            SOLEADO: 'Soleado',
            NUBLADO: 'Nublado',
            LLUVIOSO: 'Lluvioso'
        }
    };
}

/**
 * Valida si un objeto es un lugar válido
 * @param {any} lugar - Objeto a validar
 * @returns {boolean} true si es válido
 */
function esLugarValido(lugar) {
    if (!lugar || typeof lugar !== 'object') {
        return false;
    }

    const camposRequeridos = ['id', 'nombre', 'tempActual', 'estadoActual', 'pronosticoSemanal'];
    const tieneCamposRequeridos = camposRequeridos.every(campo => campo in lugar);

    if (!tieneCamposRequeridos) {
        return false;
    }

    // Validar tipos
    if (typeof lugar.id !== 'number' || lugar.id <= 0) {
        return false;
    }

    if (typeof lugar.nombre !== 'string' || lugar.nombre.trim() === '') {
        return false;
    }

    if (typeof lugar.tempActual !== 'number') {
        return false;
    }

    const APP_CONFIG = getAppConfig();
    if (!Object.values(APP_CONFIG.ESTADOS_CLIMA).includes(lugar.estadoActual)) {
        return false;
    }

    if (!Array.isArray(lugar.pronosticoSemanal) || lugar.pronosticoSemanal.length === 0) {
        return false;
    }

    // Validar pronóstico semanal
    return lugar.pronosticoSemanal.every(dia => esDiaPronosticoValido(dia));
}

/**
 * Valida si un objeto es un día de pronóstico válido
 * @param {any} dia - Objeto a validar
 * @returns {boolean} true si es válido
 */
export function esDiaPronosticoValido(dia) {
    if (!dia || typeof dia !== 'object') {
        return false;
    }

    const camposRequeridos = ['dia', 'min', 'max', 'estado'];
    const tieneCamposRequeridos = camposRequeridos.every(campo => campo in dia);

    if (!tieneCamposRequeridos) {
        return false;
    }

    // Validar tipos y valores
    if (typeof dia.dia !== 'string' || dia.dia.trim() === '') {
        return false;
    }

    if (typeof dia.min !== 'number' || typeof dia.max !== 'number') {
        return false;
    }

    if (dia.min > dia.max) {
        return false; // Mínima no puede ser mayor que máxima
    }

    const APP_CONFIG = getAppConfig();
    if (!Object.values(APP_CONFIG.ESTADOS_CLIMA).includes(dia.estado)) {
        return false;
    }

    return true;
}

/**
 * Valida si un identificador es válido para búsqueda
 * @param {any} identificador - ID o nombre a validar
 * @returns {boolean} true si es válido
 */
function esIdentificadorValido(identificador) {
    return (
        (typeof identificador === 'number' && identificador > 0) ||
        (typeof identificador === 'string' && identificador.trim() !== '')
    );
}

// Exportar para uso global (compatibilidad sin módulos ES6)
if (typeof window !== 'undefined') {
    window.Validators = {
        esLugarValido,
        esDiaPronosticoValido,
        esIdentificadorValido
    };
}

