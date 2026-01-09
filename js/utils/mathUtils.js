/**
 * Utilidades matemáticas
 * Funciones puras para cálculos
 */

/**
 * Obtiene la configuración de decimales
 */
function getDecimales() {
    return (window.APP_CONFIG && window.APP_CONFIG.DECIMALES && window.APP_CONFIG.DECIMALES.TEMPERATURA) || 1;
}

/**
 * Redondea un número a la cantidad de decimales especificada
 * @param {number} numero - Número a redondear
 * @param {number} decimales - Cantidad de decimales (default: 1)
 * @returns {number} Número redondeado
 */
function redondear(numero, decimales = getDecimales()) {
    if (typeof numero !== 'number' || isNaN(numero)) {
        throw new TypeError('El parámetro debe ser un número válido');
    }

    const factor = Math.pow(10, decimales);
    return Math.round(numero * factor) / factor;
}

/**
 * Calcula el promedio de un array de números
 * @param {number[]} numeros - Array de números
 * @returns {number} Promedio redondeado
 */
function calcularPromedio(numeros) {
    if (!Array.isArray(numeros) || numeros.length === 0) {
        throw new Error('Se requiere un array no vacío de números');
    }

    const suma = numeros.reduce((acc, num) => {
        if (typeof num !== 'number' || isNaN(num)) {
            throw new TypeError('Todos los elementos deben ser números válidos');
        }
        return acc + num;
    }, 0);

    return redondear(suma / numeros.length);
}

/**
 * Encuentra el valor mínimo en un array
 * @param {number[]} numeros - Array de números
 * @returns {number} Valor mínimo
 */
function encontrarMinimo(numeros) {
    if (!Array.isArray(numeros) || numeros.length === 0) {
        throw new Error('Se requiere un array no vacío de números');
    }

    return Math.min(...numeros);
}

/**
 * Encuentra el valor máximo en un array
 * @param {number[]} numeros - Array de números
 * @returns {number} Valor máximo
 */
function encontrarMaximo(numeros) {
    if (!Array.isArray(numeros) || numeros.length === 0) {
        throw new Error('Se requiere un array no vacío de números');
    }

    return Math.max(...numeros);
}

// Exportar para uso global (compatibilidad sin módulos ES6)
if (typeof window !== 'undefined') {
    window.MathUtils = {
        redondear,
        calcularPromedio,
        encontrarMinimo,
        encontrarMaximo
    };
}

