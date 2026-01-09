/**
 * Constantes de configuración de la aplicación
 * Centraliza todos los valores configurables
 */

const APP_CONFIG = {
    // Estados climáticos válidos
    ESTADOS_CLIMA: {
        SOLEADO: 'Soleado',
        NUBLADO: 'Nublado',
        LLUVIOSO: 'Lluvioso'
    },

    // Circuitos válidos
    CIRCUITOS: {
        W: 'W',
        O: 'O'
    },

    // Días de la semana
    DIAS_SEMANA: [
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
        'Domingo'
    ],

    // Configuración de redondeo
    DECIMALES: {
        TEMPERATURA: 1
    },

    // Umbrales para resúmenes
    UMBRALES: {
        DIAS_LLUVIA_FRIA: 3,
        DIAS_LLUVIA_MINIMA: 2,
        TEMP_MINIMA_FRIA: 3,
        DIAS_BUEN_TIEMPO: 3
    },

    // Mensajes de resumen
    MENSAJES: {
        MAYORMENTE_SOLEADA: 'Semana mayormente soleada.',
        VARIAS_LLUVIAS: 'Semana con varias lluvias.',
        MAYORMENTE_NUBLADA: 'Semana mayormente nublada.',
        FRIA_LLUVIAS: 'Semana fría con varias lluvias.',
        FRIA_PRECIPITACIONES: 'Semana fría con precipitaciones.',
        BUEN_TIEMPO: 'Semana con buen tiempo.',
        CONDICIONES_VARIABLES: 'Semana con condiciones variables.'
    }
};

// Exportar para uso global (compatibilidad sin módulos ES6)
if (typeof window !== 'undefined') {
    window.APP_CONFIG = APP_CONFIG;
}

