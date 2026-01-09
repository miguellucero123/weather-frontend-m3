/**
 * Servicio para gestión de lugares
 * Encapsula la lógica de negocio relacionada con lugares
 */

/**
 * Obtiene las funciones de validación
 */
function getValidators() {
    return window.Validators || {
        esLugarValido: (lugar) => lugar && typeof lugar === 'object',
        esIdentificadorValido: (id) => typeof id === 'number' || typeof id === 'string'
    };
}

/**
 * Obtiene los lugares (compatibilidad)
 */
function getLugares() {
    return typeof lugares !== 'undefined' ? lugares : [];
}

/**
 * Clase de servicio para operaciones con lugares
 */
class LugarService {
    /**
     * Busca un lugar por ID o nombre
     * @param {number|string} identificador - ID numérico o nombre del lugar
     * @returns {object|null} Objeto del lugar encontrado o null si no existe
     * @throws {TypeError} Si el identificador no es válido
     */
    static buscarLugar(identificador) {
        const { esIdentificadorValido } = getValidators();
        if (!esIdentificadorValido(identificador)) {
            throw new TypeError('El identificador debe ser un número positivo o una cadena no vacía');
        }

        try {
            const lugaresData = getLugares();
            if (typeof identificador === 'number') {
                return lugaresData.find(lugar => lugar.id === identificador) || null;
            }

            if (typeof identificador === 'string') {
                const nombreNormalizado = identificador.toLowerCase().trim();
                return lugaresData.find(lugar =>
                    lugar.nombre.toLowerCase().trim() === nombreNormalizado
                ) || null;
            }

            return null;
        } catch (error) {
            console.error('Error al buscar lugar:', error);
            return null;
        }
    }

    /**
     * Obtiene todos los lugares
     * @returns {Array<object>} Array de lugares (copia para evitar mutaciones)
     */
    static obtenerTodosLosLugares() {
        const lugaresData = getLugares();
        return [...lugaresData]; // Retorna copia para inmutabilidad
    }

    /**
     * Obtiene lugares por circuito
     * @param {string} circuito - Circuito ('W' o 'O')
     * @returns {Array<object>} Array de lugares del circuito
     */
    static obtenerLugaresPorCircuito(circuito) {
        if (typeof circuito !== 'string' || !['W', 'O'].includes(circuito)) {
            throw new TypeError('El circuito debe ser "W" o "O"');
        }

        const lugaresData = getLugares();
        return lugaresData.filter(lugar => lugar.circuito === circuito);
    }

    /**
     * Valida y sanitiza un lugar
     * @param {object} lugar - Objeto lugar a validar
     * @returns {object|null} Lugar validado o null si es inválido
     */
    static validarLugar(lugar) {
        const { esLugarValido } = getValidators();
        if (!esLugarValido(lugar)) {
            console.warn('Lugar inválido:', lugar);
            return null;
        }
        return lugar;
    }
}

// Exportar para uso global (compatibilidad sin módulos ES6)
if (typeof window !== 'undefined') {
    window.LugarService = LugarService;
}

