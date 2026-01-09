/**
 * Datos estáticos de lugares de Torres del Paine
 * Módulo 4 - Portafolio
 * Circuitos W y O
 * 
 * Este archivo contiene únicamente los datos, sin lógica de negocio
 */

export const lugares = [
    {
        id: 1,
        nombre: "Base Torres",
        tempActual: 8,
        estadoActual: "Nublado",
        circuito: "W",
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

