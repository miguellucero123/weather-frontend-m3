// Weather Data - Static for now, will be replaced with API calls
const WEATHER_DATA = {
    "Torres del Paine - Glaciar Grey": {
        "city": {"name": "Torres del Paine - Glaciar Grey", "lat": -51.0, "lon": -73.23, "distance": 0, "zone": "Glaciar Grey"},
        "current": {"time": "2025-11-21T11:15", "interval": 900, "temperature_2m": 2.2, "weather_code": 61, "wind_speed_10m": 41.1, "wind_direction_10m": 290, "relative_humidity_2m": 86},
        "daily": {"time": ["2025-11-21", "2025-11-22", "2025-11-23", "2025-11-24", "2025-11-25", "2025-11-26", "2025-11-27"], "weather_code": [61, 63, 71, 73, 75, 85, 71], "temperature_2m_max": [3.4, 4.8, 4.3, 3.7, 3.9, 0.9, 0.7], "temperature_2m_min": [1.4, 3.2, 0.9, 0.6, 1.5, -0.9, -2.2], "precipitation_sum": [22.6, 35.8, 24.6, 33.0, 46.2, 36.0, 1.5], "wind_speed_10m_max": [44.3, 69.6, 66.2, 47.3, 43.4, 56.2, 41.5]},
        "updated": "2025-11-21T11:17:47.687668"
    },
    "Puerto Natales": {
        "city": {"name": "Puerto Natales", "lat": -51.7252, "lon": -72.5149, "distance": 105, "zone": "Zona Sur - Chile"},
        "current": {"time": "2025-11-21T11:15", "interval": 900, "temperature_2m": 11.9, "weather_code": 3, "wind_speed_10m": 16.8, "wind_direction_10m": 279, "relative_humidity_2m": 62},
        "daily": {"time": ["2025-11-21", "2025-11-22", "2025-11-23", "2025-11-24", "2025-11-25", "2025-11-26", "2025-11-27"], "weather_code": [61, 61, 61, 61, 61, 3, 3], "temperature_2m_max": [13.2, 14.8, 11.3, 12.3, 13.8, 10.8, 11.2], "temperature_2m_min": [9.6, 10.8, 9.1, 7.5, 10.0, 8.3, 7.5], "precipitation_sum": [0.5, 1.0, 1.4, 1.8, 1.5, 0.3, 0.0], "wind_speed_10m_max": [22.1, 31.2, 36.7, 22.1, 24.7, 35.8, 30.7]},
        "updated": "2025-11-21T11:17:47.687668"
    },
    "El Calafate": {
        "city": {"name": "El Calafate", "lat": -50.3399, "lon": -72.255, "distance": 290, "zone": "Zona Este - Argentina"},
        "current": {"time": "2025-11-21T11:15", "interval": 900, "temperature_2m": 13.1, "weather_code": 2, "wind_speed_10m": 10.4, "wind_direction_10m": 250, "relative_humidity_2m": 53},
        "daily": {"time": ["2025-11-21", "2025-11-22", "2025-11-23", "2025-11-24", "2025-11-25", "2025-11-26", "2025-11-27"], "weather_code": [3, 3, 3, 3, 3, 3, 3], "temperature_2m_max": [15.4, 17.6, 16.1, 16.8, 17.6, 13.9, 12.2], "temperature_2m_min": [11.5, 11.2, 13.0, 10.9, 12.4, 11.4, 9.3], "precipitation_sum": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], "wind_speed_10m_max": [26.4, 20.6, 29.7, 20.6, 26.1, 31.0, 31.2]},
        "updated": "2025-11-21T11:17:47.687668"
    },
    "Glaciar Perito Moreno": {
        "city": {"name": "Glaciar Perito Moreno", "lat": -50.47, "lon": -73.03, "distance": 350, "zone": "Zona Glaciar Arg"},
        "current": {"time": "2025-11-21T11:15", "interval": 900, "temperature_2m": 10.5, "weather_code": 2, "wind_speed_10m": 10.1, "wind_direction_10m": 270, "relative_humidity_2m": 55},
        "daily": {"time": ["2025-11-21", "2025-11-22", "2025-11-23", "2025-11-24", "2025-11-25", "2025-11-26", "2025-11-27"], "weather_code": [61, 61, 61, 61, 61, 61, 3], "temperature_2m_max": [11.4, 13.8, 11.8, 12.8, 12.7, 9.3, 8.6], "temperature_2m_min": [7.1, 8.8, 8.0, 5.7, 8.3, 5.5, 3.7], "precipitation_sum": [0.2, 8.8, 1.1, 5.9, 6.0, 4.2, 0.0], "wind_speed_10m_max": [13.0, 18.4, 19.9, 16.9, 13.7, 23.4, 15.9]},
        "updated": "2025-11-21T11:17:47.687668"
    },
    "El Chaltén": {
        "city": {"name": "El Chaltén", "lat": -49.3318, "lon": -73.1641, "distance": 490, "zone": "Zona Sierras"},
        "current": {"time": "2025-11-21T11:15", "interval": 900, "temperature_2m": -1.0, "weather_code": 71, "wind_speed_10m": 30.5, "wind_direction_10m": 287, "relative_humidity_2m": 86},
        "daily": {"time": ["2025-11-21", "2025-11-22", "2025-11-23", "2025-11-24", "2025-11-25", "2025-11-26", "2025-11-27"], "weather_code": [71, 63, 61, 73, 63, 71, 71], "temperature_2m_max": [0.1, 2.0, 2.0, 1.9, 2.7, 2.4, -2.2], "temperature_2m_min": [-1.6, 0.0, 0.2, -0.4, 0.9, -2.9, -5.3], "precipitation_sum": [1.8, 14.2, 17.6, 22.7, 37.8, 25.5, 0.3], "wind_speed_10m_max": [31.2, 56.5, 52.7, 34.5, 36.2, 33.0, 21.7]},
        "updated": "2025-11-21T11:17:47.687668"
    },
    "Punta Arenas": {
        "city": {"name": "Punta Arenas", "lat": -53.1638, "lon": -70.9181, "distance": 350, "zone": "Zona Austral"},
        "current": {"time": "2025-11-21T11:15", "interval": 900, "temperature_2m": 13.5, "weather_code": 3, "wind_speed_10m": 30.2, "wind_direction_10m": 287, "relative_humidity_2m": 58},
        "daily": {"time": ["2025-11-21", "2025-11-22", "2025-11-23", "2025-11-24", "2025-11-25", "2025-11-26", "2025-11-27"], "weather_code": [61, 61, 3, 3, 61, 80, 3], "temperature_2m_max": [14.4, 13.9, 11.9, 13.1, 13.8, 11.8, 12.4], "temperature_2m_min": [8.0, 8.4, 6.8, 7.3, 7.0, 7.2, 5.9], "precipitation_sum": [0.7, 0.8, 0.2, 0.2, 1.5, 2.4, 0.3], "wind_speed_10m_max": [30.1, 40.9, 41.5, 33.7, 38.5, 40.4, 33.4]},
        "updated": "2025-11-21T11:17:47.687668"
    },
    "Río Gallegos": {
        "city": {"name": "Río Gallegos", "lat": -51.6298, "lon": -69.2181, "distance": 580, "zone": "Zona Atlántica"},
        "current": {"time": "2025-11-21T11:15", "interval": 900, "temperature_2m": 12.5, "weather_code": 3, "wind_speed_10m": 18.2, "wind_direction_10m": 304, "relative_humidity_2m": 62},
        "daily": {"time": ["2025-11-21", "2025-11-22", "2025-11-23", "2025-11-24", "2025-11-25", "2025-11-26", "2025-11-27"], "weather_code": [61, 61, 3, 61, 61, 61, 3], "temperature_2m_max": [16.3, 19.0, 15.1, 16.2, 18.2, 14.7, 14.0], "temperature_2m_min": [7.9, 8.5, 9.5, 7.3, 8.7, 7.5, 4.8], "precipitation_sum": [2.4, 0.7, 0.0, 1.9, 1.8, 0.6, 0.0], "wind_speed_10m_max": [35.9, 27.4, 45.5, 35.6, 16.3, 42.5, 35.8]},
        "updated": "2025-11-21T11:17:47.687668"
    },
    "Villa O'Higgins": {
        "city": {"name": "Villa O'Higgins", "lat": -48.4667, "lon": -72.5667, "distance": 285, "zone": "Zona Norte"},
        "current": {"time": "2025-11-21T11:15", "interval": 900, "temperature_2m": 5.3, "weather_code": 61, "wind_speed_10m": 11.4, "wind_direction_10m": 305, "relative_humidity_2m": 83},
        "daily": {"time": ["2025-11-21", "2025-11-22", "2025-11-23", "2025-11-24", "2025-11-25", "2025-11-26", "2025-11-27"], "weather_code": [61, 61, 61, 61, 61, 61, 3], "temperature_2m_max": [7.2, 8.3, 9.4, 10.3, 11.1, 10.4, 6.5], "temperature_2m_min": [4.9, 5.4, 8.1, 7.6, 8.3, 5.0, 3.4], "precipitation_sum": [1.2, 0.6, 3.1, 5.5, 4.2, 9.6, 0.0], "wind_speed_10m_max": [13.8, 18.8, 17.7, 16.7, 21.6, 27.3, 9.2]},
        "updated": "2025-11-21T11:17:47.687668"
    },
    "Gobernador Gregores": {
        "city": {"name": "Gobernador Gregores", "lat": -49.8, "lon": -70.25, "distance": 520, "zone": "Zona Estepa"},
        "current": {"time": "2025-11-21T11:15", "interval": 900, "temperature_2m": 13.0, "weather_code": 1, "wind_speed_10m": 14.9, "wind_direction_10m": 302, "relative_humidity_2m": 41},
        "daily": {"time": ["2025-11-21", "2025-11-22", "2025-11-23", "2025-11-24", "2025-11-25", "2025-11-26", "2025-11-27"], "weather_code": [3, 3, 3, 80, 3, 3, 3], "temperature_2m_max": [16.0, 18.0, 18.9, 15.7, 19.3, 14.7, 14.2], "temperature_2m_min": [6.1, 5.1, 8.8, 3.9, 8.2, 6.7, 2.1], "precipitation_sum": [0.0, 0.0, 0.0, 1.9, 0.0, 0.0, 0.0], "wind_speed_10m_max": [20.9, 30.7, 28.5, 25.6, 27.8, 29.4, 17.4]},
        "updated": "2025-11-21T11:17:47.687668"
    },
    "Tres Lagos": {
        "city": {"name": "Tres Lagos", "lat": -50.2833, "lon": -72.7, "distance": 400, "zone": "Zona Centro"},
        "current": {"time": "2025-11-21T11:15", "interval": 900, "temperature_2m": 11.1, "weather_code": 3, "wind_speed_10m": 13.7, "wind_direction_10m": 275, "relative_humidity_2m": 50},
        "daily": {"time": ["2025-11-21", "2025-11-22", "2025-11-23", "2025-11-24", "2025-11-25", "2025-11-26", "2025-11-27"], "weather_code": [3, 61, 61, 61, 61, 61, 2], "temperature_2m_max": [11.9, 15.0, 12.6, 13.5, 14.0, 9.9, 8.8], "temperature_2m_min": [6.9, 8.0, 8.3, 5.6, 8.1, 5.5, 3.1], "precipitation_sum": [0.0, 2.9, 0.2, 3.0, 2.1, 2.4, 0.0], "wind_speed_10m_max": [18.1, 20.2, 23.3, 19.5, 15.9, 24.5, 19.9]},
        "updated": "2025-11-21T11:17:47.687668"
    }
};

/**
 * Weather Service
 * Handles all weather data operations
 * Prepared for future OpenMeteo API integration
 */
class WeatherService {
    constructor() {
        this.data = WEATHER_DATA;
        this.apiBaseUrl = 'https://api.open-meteo.com/v1/forecast';
    }

    /**
     * Get weather data for a specific city
     * @param {string} cityName - Name of the city
     * @returns {Object|null} Weather data or null if not found
     */
    getWeatherData(cityName) {
        return this.data[cityName] || null;
    }

    /**
     * Get all available cities
     * @returns {Array} Array of city names
     */
    getAllCities() {
        return Object.keys(this.data);
    }

    /**
     * Placeholder for future API integration
     * Fetch weather from OpenMeteo API
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude
     * @returns {Promise} Weather data from API
     */
    async fetchWeatherFromAPI(lat, lon) {
        // TODO: Implement OpenMeteo API call
        // const url = `${this.apiBaseUrl}?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min`;
        // const response = await fetch(url);
        // return await response.json();
        console.log('API integration coming soon!');
        return null;
    }

    /**
     * Get weather description from WMO code
     * @param {number} code - WMO weather code
     * @returns {string} Weather description in Spanish
     */
    getWeatherDescription(code) {
        const descriptions = {
            0: 'Despejado',
            1: 'Mayormente despejado',
            2: 'Parcialmente nublado',
            3: 'Nublado',
            45: 'Niebla',
            48: 'Niebla con escarcha',
            51: 'Llovizna ligera',
            53: 'Llovizna moderada',
            55: 'Llovizna densa',
            61: 'Lluvia ligera',
            63: 'Lluvia moderada',
            65: 'Lluvia densa',
            71: 'Nieve ligera',
            73: 'Nieve moderada',
            75: 'Nieve densa',
            77: 'Granos de nieve',
            80: 'Chubascos ligeros',
            81: 'Chubascos moderados',
            82: 'Chubascos violentos',
            85: 'Chubascos de nieve ligeros',
            86: 'Chubascos de nieve fuertes',
            95: 'Tormenta',
            96: 'Tormenta con granizo ligero',
            99: 'Tormenta con granizo fuerte'
        };
        return descriptions[code] || 'Desconocido';
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WeatherService;
}
