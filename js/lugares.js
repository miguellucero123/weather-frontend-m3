/**
 * Módulo de lugares - API pública
 * Proporciona acceso a funciones de lugares y estadísticas
 * 
 * NOTA: Mantiene compatibilidad con código existente
 * Para versión modular mejorada, ver: js/services/
 */

// Datos inline para compatibilidad (sin módulos ES6)
const lugares = [
    {
        id: 1,
        nombre: "Base Torres",
        tempActual: 8,
        estadoActual: "Nublado",
        circuito: "W",
        viento: 25,
        direccionViento: 270,
        humedad: 75,
        altitud: 900,
        pronosticoSemanal: [
            { dia: "Lunes", min: 5, max: 12, estado: "Nublado" },
            { dia: "Martes", min: 4, max: 10, estado: "Lluvioso" },
            { dia: "Miércoles", min: 3, max: 9, estado: "Lluvioso" },
            { dia: "Jueves", min: 6, max: 13, estado: "Soleado" },
            { dia: "Viernes", min: 7, max: 14, estado: "Soleado" },
            { dia: "Sábado", min: 5, max: 11, estado: "Nublado" },
            { dia: "Domingo", min: 4, max: 10, estado: "Lluvioso" }
        ]
    },
    {
        id: 2,
        nombre: "Glaciar Grey",
        tempActual: 6,
        estadoActual: "Nublado",
        circuito: "W",
        viento: 35,
        direccionViento: 240,
        humedad: 85,
        altitud: 200,
        pronosticoSemanal: [
            { dia: "Lunes", min: 3, max: 9, estado: "Nublado" },
            { dia: "Martes", min: 2, max: 8, estado: "Lluvioso" },
            { dia: "Miércoles", min: 1, max: 7, estado: "Lluvioso" },
            { dia: "Jueves", min: 4, max: 10, estado: "Soleado" },
            { dia: "Viernes", min: 5, max: 11, estado: "Soleado" },
            { dia: "Sábado", min: 3, max: 9, estado: "Nublado" },
            { dia: "Domingo", min: 2, max: 8, estado: "Lluvioso" }
        ]
    },
    {
        id: 3,
        nombre: "Valle del Francés",
        tempActual: 9,
        estadoActual: "Soleado",
        circuito: "W",
        viento: 15,
        direccionViento: 180,
        humedad: 60,
        altitud: 500,
        pronosticoSemanal: [
            { dia: "Lunes", min: 6, max: 13, estado: "Soleado" },
            { dia: "Martes", min: 5, max: 11, estado: "Nublado" },
            { dia: "Miércoles", min: 4, max: 10, estado: "Lluvioso" },
            { dia: "Jueves", min: 7, max: 14, estado: "Soleado" },
            { dia: "Viernes", min: 8, max: 15, estado: "Soleado" },
            { dia: "Sábado", min: 6, max: 12, estado: "Nublado" },
            { dia: "Domingo", min: 5, max: 11, estado: "Nublado" }
        ]
    },
    {
        id: 4,
        nombre: "Refugio Paine Grande",
        tempActual: 10,
        estadoActual: "Soleado",
        circuito: "O",
        viento: 20,
        direccionViento: 200,
        humedad: 65,
        altitud: 50,
        pronosticoSemanal: [
            { dia: "Lunes", min: 7, max: 14, estado: "Soleado" },
            { dia: "Martes", min: 6, max: 12, estado: "Nublado" },
            { dia: "Miércoles", min: 5, max: 11, estado: "Lluvioso" },
            { dia: "Jueves", min: 8, max: 15, estado: "Soleado" },
            { dia: "Viernes", min: 9, max: 16, estado: "Soleado" },
            { dia: "Sábado", min: 7, max: 13, estado: "Nublado" },
            { dia: "Domingo", min: 6, max: 12, estado: "Nublado" }
        ]
    },
    {
        id: 5,
        nombre: "Campamento Italiano",
        tempActual: 7,
        estadoActual: "Nublado",
        circuito: "W",
        viento: 18,
        direccionViento: 220,
        humedad: 70,
        altitud: 300,
        pronosticoSemanal: [
            { dia: "Lunes", min: 4, max: 11, estado: "Nublado" },
            { dia: "Martes", min: 3, max: 9, estado: "Lluvioso" },
            { dia: "Miércoles", min: 2, max: 8, estado: "Lluvioso" },
            { dia: "Jueves", min: 5, max: 12, estado: "Soleado" },
            { dia: "Viernes", min: 6, max: 13, estado: "Soleado" },
            { dia: "Sábado", min: 4, max: 10, estado: "Nublado" },
            { dia: "Domingo", min: 3, max: 9, estado: "Lluvioso" }
        ]
    }
];

/**
 * Función para buscar un lugar por ID o nombre
 * @param {number|string} identificador - ID numérico o nombre del lugar
 * @returns {object|null} Objeto del lugar encontrado o null
 */
function buscarLugar(identificador) {
    if (typeof identificador === 'number') {
        // Buscar por ID
        return lugares.find(lugar => lugar.id === identificador) || null;
    } else if (typeof identificador === 'string') {
        // Buscar por nombre
        return lugares.find(lugar => lugar.nombre.toLowerCase() === identificador.toLowerCase()) || null;
    }
    return null;
}

/**
 * Función para calcular estadísticas semanales de un lugar
 * @param {object} lugar - Objeto del lugar con pronosticoSemanal
 * @returns {object} Objeto con estadísticas calculadas
 */
function calcularEstadisticas(lugar) {
    if (!lugar || !lugar.pronosticoSemanal || lugar.pronosticoSemanal.length === 0) {
        return null;
    }

    const pronostico = lugar.pronosticoSemanal;
    
    // Variables para cálculos
    let sumaMin = 0;
    let sumaMax = 0;
    let tempMinima = pronostico[0].min;
    let tempMaxima = pronostico[0].max;
    const contadorEstados = {};

    // Recorrer el pronóstico semanal con un ciclo
    for (let i = 0; i < pronostico.length; i++) {
        const dia = pronostico[i];
        
        // Sumar temperaturas para el promedio
        sumaMin += dia.min;
        sumaMax += dia.max;
        
        // Encontrar mínimo y máximo
        if (dia.min < tempMinima) {
            tempMinima = dia.min;
        }
        if (dia.max > tempMaxima) {
            tempMaxima = dia.max;
        }
        
        // Contar días por tipo de clima
        const estado = dia.estado;
        if (contadorEstados[estado]) {
            contadorEstados[estado]++;
        } else {
            contadorEstados[estado] = 1;
        }
    }

    // Calcular promedios
    const promedioMin = Math.round((sumaMin / pronostico.length) * 10) / 10;
    const promedioMax = Math.round((sumaMax / pronostico.length) * 10) / 10;
    const promedio = Math.round(((promedioMin + promedioMax) / 2) * 10) / 10;

    // Generar resumen textual usando condicionales
    let resumen = "";
    const diasSoleados = contadorEstados["Soleado"] || 0;
    const diasNublados = contadorEstados["Nublado"] || 0;
    const diasLluviosos = contadorEstados["Lluvioso"] || 0;

    if (diasSoleados > diasNublados && diasSoleados > diasLluviosos) {
        resumen = "Semana mayormente soleada.";
    } else if (diasLluviosos > diasSoleados && diasLluviosos > diasNublados) {
        resumen = "Semana con varias lluvias.";
    } else if (diasNublados > diasSoleados && diasNublados > diasLluviosos) {
        resumen = "Semana mayormente nublada.";
    } else if (diasLluviosos >= 3) {
        resumen = "Semana fría con varias lluvias.";
    } else if (tempMinima < 3 && diasLluviosos >= 2) {
        resumen = "Semana fría con precipitaciones.";
    } else if (diasSoleados >= 3) {
        resumen = "Semana con buen tiempo.";
    } else {
        resumen = "Semana con condiciones variables.";
    }

    return {
        tempMinima: tempMinima,
        tempMaxima: tempMaxima,
        tempPromedio: promedio,
        promedioMin: promedioMin,
        promedioMax: promedioMax,
        diasPorEstado: contadorEstados,
        resumen: resumen
    };
}

