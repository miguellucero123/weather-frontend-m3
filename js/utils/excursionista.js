/**
 * Utilidades para cálculo de variables meteorológicas relevantes para excursionistas
 * Torres del Paine - Variables de impacto para trekking y montañismo
 */

/**
 * Calcular sensación térmica (wind chill) basado en temperatura y viento
 * @param {number} temp - Temperatura en °C
 * @param {number} viento - Velocidad del viento en km/h
 * @returns {number} Sensación térmica en °C
 */
function calcularSensacionTermica(temp, viento) {
    if (viento < 5) return temp; // Sin viento, sensación = temperatura
    
    // Fórmula de sensación térmica (simplificada para temperaturas sobre 0°C)
    const vientoMs = viento / 3.6; // Convertir km/h a m/s
    const sensacion = 13.12 + (0.6215 * temp) - (11.37 * Math.pow(vientoMs, 0.16)) + (0.3965 * temp * Math.pow(vientoMs, 0.16));
    
    return Math.round(sensacion * 10) / 10;
}

/**
 * Calcular índice UV estimado basado en condiciones
 * @param {string} estado - Estado del tiempo (Soleado, Nublado, Lluvioso)
 * @param {number} temp - Temperatura en °C
 * @returns {number} Índice UV (0-11+)
 */
function calcularIndiceUV(estado, temp) {
    const estadoLower = estado.toLowerCase();
    
    if (estadoLower.includes('lluvioso')) return 1; // Muy bajo con lluvia
    if (estadoLower.includes('nublado')) return 3; // Bajo con nubes
    if (estadoLower.includes('soleado')) {
        // En Torres del Paine, el UV puede ser alto incluso con temperatura baja
        // debido a la altitud y reflexión del hielo/nieve
        if (temp > 10) return 7; // Alto
        return 5; // Moderado
    }
    return 3; // Por defecto
}

/**
 * Obtener descripción del índice UV
 * @param {number} uv - Índice UV
 * @returns {object} Objeto con nivel, descripción y recomendación
 */
function obtenerDescripcionUV(uv) {
    if (uv <= 2) {
        return { nivel: 'Bajo', descripcion: 'Mínimo', color: '#4caf50', recomendacion: 'Protección no necesaria' };
    } else if (uv <= 5) {
        return { nivel: 'Moderado', descripcion: 'Bajo', color: '#ffc107', recomendacion: 'Usar protector solar' };
    } else if (uv <= 7) {
        return { nivel: 'Alto', descripcion: 'Moderado', color: '#ff9800', recomendacion: 'Protección necesaria' };
    } else if (uv <= 10) {
        return { nivel: 'Muy Alto', descripcion: 'Alto', color: '#f44336', recomendacion: 'Protección extra necesaria' };
    } else {
        return { nivel: 'Extremo', descripcion: 'Muy Alto', color: '#9c27b0', recomendacion: 'Evitar exposición prolongada' };
    }
}

/**
 * Evaluar condiciones de viento para excursionistas
 * @param {number} viento - Velocidad del viento en km/h
 * @returns {object} Objeto con evaluación y recomendación
 */
function evaluarViento(viento) {
    if (viento < 20) {
        return { nivel: 'Calma', icon: 'fa-wind', color: '#4caf50', recomendacion: 'Condiciones ideales' };
    } else if (viento < 40) {
        return { nivel: 'Moderado', icon: 'fa-wind', color: '#ffc107', recomendacion: 'Cuidado en zonas expuestas' };
    } else if (viento < 60) {
        return { nivel: 'Fuerte', icon: 'fa-wind', color: '#ff9800', recomendacion: 'Evitar zonas altas' };
    } else {
        return { nivel: 'Muy Fuerte', icon: 'fa-exclamation-triangle', color: '#f44336', recomendacion: 'No recomendado salir' };
    }
}

/**
 * Evaluar visibilidad estimada basada en condiciones
 * @param {string} estado - Estado del tiempo
 * @param {number} humedad - Humedad relativa (%)
 * @returns {object} Objeto con visibilidad y descripción
 */
function evaluarVisibilidad(estado, humedad) {
    const estadoLower = estado.toLowerCase();
    
    if (estadoLower.includes('lluvioso') || humedad > 90) {
        return { valor: 'Reducida', icon: 'fa-eye-slash', color: '#f44336', km: '< 5 km' };
    } else if (estadoLower.includes('nublado') || humedad > 70) {
        return { valor: 'Moderada', icon: 'fa-eye', color: '#ff9800', km: '5-15 km' };
    } else {
        return { valor: 'Buena', icon: 'fa-eye', color: '#4caf50', km: '> 15 km' };
    }
}

/**
 * Calcular probabilidad de precipitación basada en estado
 * @param {string} estado - Estado del tiempo
 * @returns {number} Probabilidad de precipitación (0-100%)
 */
function calcularProbabilidadPrecipitacion(estado) {
    const estadoLower = estado.toLowerCase();
    
    if (estadoLower.includes('lluvioso')) return 80;
    if (estadoLower.includes('nublado')) return 40;
    if (estadoLower.includes('soleado')) return 10;
    return 30; // Por defecto
}

/**
 * Obtener dirección del viento en texto
 * @param {number} direccion - Dirección en grados (0-360)
 * @returns {string} Dirección cardinal
 */
function obtenerDireccionViento(direccion) {
    const direcciones = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const indice = Math.round(direccion / 22.5) % 16;
    return direcciones[indice];
}

// Exportar funciones para uso global
if (typeof window !== 'undefined') {
    window.calcularSensacionTermica = calcularSensacionTermica;
    window.calcularIndiceUV = calcularIndiceUV;
    window.obtenerDescripcionUV = obtenerDescripcionUV;
    window.evaluarViento = evaluarViento;
    window.evaluarVisibilidad = evaluarVisibilidad;
    window.calcularProbabilidadPrecipitacion = calcularProbabilidadPrecipitacion;
    window.obtenerDireccionViento = obtenerDireccionViento;
}

