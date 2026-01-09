/**
 * Servicio para cálculo de estadísticas climáticas
 * Encapsula la lógica de cálculo de estadísticas
 */

/**
 * Obtiene las funciones de utilidad
 */
function getUtils() {
    return {
        validators: window.Validators || {},
        math: window.MathUtils || {
            calcularPromedio: (nums) => nums.reduce((a, b) => a + b, 0) / nums.length,
            encontrarMinimo: (nums) => Math.min(...nums),
            encontrarMaximo: (nums) => Math.max(...nums),
            redondear: (num, dec = 1) => Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec)
        },
        config: window.APP_CONFIG || {
            ESTADOS_CLIMA: { SOLEADO: 'Soleado', NUBLADO: 'Nublado', LLUVIOSO: 'Lluvioso' },
            UMBRALES: { DIAS_LLUVIA_FRIA: 3, DIAS_LLUVIA_MINIMA: 2, TEMP_MINIMA_FRIA: 3, DIAS_BUEN_TIEMPO: 3 },
            MENSAJES: {
                MAYORMENTE_SOLEADA: 'Semana mayormente soleada.',
                VARIAS_LLUVIAS: 'Semana con varias lluvias.',
                MAYORMENTE_NUBLADA: 'Semana mayormente nublada.',
                FRIA_LLUVIAS: 'Semana fría con varias lluvias.',
                FRIA_PRECIPITACIONES: 'Semana fría con precipitaciones.',
                BUEN_TIEMPO: 'Semana con buen tiempo.',
                CONDICIONES_VARIABLES: 'Semana con condiciones variables.'
            }
        }
    };
}

/**
 * Clase de servicio para cálculos estadísticos
 */
class EstadisticasService {
    /**
     * Calcula estadísticas semanales de un lugar
     * @param {object} lugar - Objeto del lugar con pronosticoSemanal
     * @returns {object|null} Objeto con estadísticas calculadas o null si hay error
     * @throws {TypeError} Si el lugar no es válido
     */
    static calcularEstadisticas(lugar) {
        const utils = getUtils();
        if (!utils.validators.esLugarValido || !utils.validators.esLugarValido(lugar)) {
            throw new TypeError('El lugar proporcionado no es válido');
        }

        try {
            const pronostico = lugar.pronosticoSemanal;
            const { calcularPromedio, encontrarMinimo, encontrarMaximo, redondear } = utils.math;

            // Extraer arrays de temperaturas
            const temperaturasMinimas = pronostico.map(dia => dia.min);
            const temperaturasMaximas = pronostico.map(dia => dia.max);

            // Calcular estadísticas básicas
            const tempMinima = encontrarMinimo(temperaturasMinimas);
            const tempMaxima = encontrarMaximo(temperaturasMaximas);
            const promedioMin = calcularPromedio(temperaturasMinimas);
            const promedioMax = calcularPromedio(temperaturasMaximas);
            const tempPromedio = redondear((promedioMin + promedioMax) / 2);

            // Contar días por estado
            const diasPorEstado = this._contarDiasPorEstado(pronostico);

            // Generar resumen textual
            const resumen = this._generarResumen(diasPorEstado, tempMinima, utils.config);

            return {
                tempMinima,
                tempMaxima,
                tempPromedio,
                promedioMin,
                promedioMax,
                diasPorEstado,
                resumen
            };
        } catch (error) {
            console.error('Error al calcular estadísticas:', error);
            return null;
        }
    }

    /**
     * Cuenta los días por tipo de estado climático
     * @private
     * @param {Array<object>} pronostico - Array de días del pronóstico
     * @returns {object} Objeto con conteo de días por estado
     */
    static _contarDiasPorEstado(pronostico) {
        const contador = {};

        pronostico.forEach(dia => {
            const estado = dia.estado;
            contador[estado] = (contador[estado] || 0) + 1;
        });

        return contador;
    }

    /**
     * Genera un resumen textual basado en las estadísticas
     * @private
     * @param {object} diasPorEstado - Conteo de días por estado
     * @param {number} tempMinima - Temperatura mínima de la semana
     * @param {object} config - Configuración de la app
     * @returns {string} Resumen textual
     */
    static _generarResumen(diasPorEstado, tempMinima, config) {
        const diasSoleados = diasPorEstado[config.ESTADOS_CLIMA.SOLEADO] || 0;
        const diasNublados = diasPorEstado[config.ESTADOS_CLIMA.NUBLADO] || 0;
        const diasLluviosos = diasPorEstado[config.ESTADOS_CLIMA.LLUVIOSO] || 0;

        const { UMBRALES, MENSAJES } = config;

        // Estrategia: Evaluar condiciones de mayor a menor prioridad
        if (diasSoleados > diasNublados && diasSoleados > diasLluviosos) {
            return MENSAJES.MAYORMENTE_SOLEADA;
        }

        if (diasLluviosos > diasSoleados && diasLluviosos > diasNublados) {
            return MENSAJES.VARIAS_LLUVIAS;
        }

        if (diasNublados > diasSoleados && diasNublados > diasLluviosos) {
            return MENSAJES.MAYORMENTE_NUBLADA;
        }

        if (diasLluviosos >= UMBRALES.DIAS_LLUVIA_FRIA) {
            return MENSAJES.FRIA_LLUVIAS;
        }

        if (tempMinima < UMBRALES.TEMP_MINIMA_FRIA && diasLluviosos >= UMBRALES.DIAS_LLUVIA_MINIMA) {
            return MENSAJES.FRIA_PRECIPITACIONES;
        }

        if (diasSoleados >= UMBRALES.DIAS_BUEN_TIEMPO) {
            return MENSAJES.BUEN_TIEMPO;
        }

        return MENSAJES.CONDICIONES_VARIABLES;
    }
}

// Exportar para uso global (compatibilidad sin módulos ES6)
if (typeof window !== 'undefined') {
    window.EstadisticasService = EstadisticasService;
}

