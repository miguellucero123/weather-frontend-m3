/**
 * Weather Service with Open-Meteo API Integration
 * Fetches real weather data and updates every 12 hours (08:00 and 20:00)
 */

// City coordinates for weather fetching
const CITIES = {
    "Torres del Paine - Glaciar Grey": { lat: -51.0, lon: -73.23, distance: 0, zone: "Glaciar Grey" },
    "Puerto Natales": { lat: -51.7252, lon: -72.5149, distance: 105, zone: "Zona Sur - Chile" },
    "El Calafate": { lat: -50.3399, lon: -72.255, distance: 290, zone: "Zona Este - Argentina" },
    "Glaciar Perito Moreno": { lat: -50.47, lon: -73.03, distance: 350, zone: "Zona Glaciar Arg" },
    "El Chaltén": { lat: -49.3318, lon: -73.1641, distance: 490, zone: "Zona Sierras" },
    "Punta Arenas": { lat: -53.1638, lon: -70.9181, distance: 350, zone: "Zona Austral" },
    "Río Gallegos": { lat: -51.6298, lon: -69.2181, distance: 580, zone: "Zona Atlántica" },
    "Villa O'Higgins": { lat: -48.4667, lon: -72.5667, distance: 285, zone: "Zona Norte" },
    "Gobernador Gregores": { lat: -49.8, lon: -70.25, distance: 520, zone: "Zona Estepa" },
    "Tres Lagos": { lat: -50.2833, lon: -72.7, distance: 400, zone: "Zona Centro" }
};

class WeatherService {
    constructor() {
        this.apiBaseUrl = 'https://api.open-meteo.com/v1/forecast';
        this.weatherData = {};
        this.lastUpdate = null;
        this.updateInterval = null;

        // Initialize: load from cache or fetch new data
        this.initialize();
    }

    /**
     * Initialize the service
     */
    async initialize() {
        // Try to load from localStorage first
        const cached = this.loadFromCache();

        if (cached && this.isCacheValid(cached.timestamp)) {
            console.log('✅ Using cached weather data');
            this.weatherData = cached.data;
            this.lastUpdate = new Date(cached.timestamp);
        } else {
            console.log('🌐 Fetching fresh weather data from API...');
            await this.fetchAllWeatherData();
        }

        // Set up automatic updates at 08:00 and 20:00
        this.scheduleUpdates();
    }

    /**
     * Check if cache is still valid (within 12 hours)
     */
    isCacheValid(timestamp) {
        const now = new Date();
        const cacheTime = new Date(timestamp);
        const hoursDiff = (now - cacheTime) / (1000 * 60 * 60);
        return hoursDiff < 12;
    }

    /**
     * Load weather data from localStorage
     */
    loadFromCache() {
        try {
            const cached = localStorage.getItem('weatherData');
            return cached ? JSON.parse(cached) : null;
        } catch (error) {
            console.error('Error loading cache:', error);
            return null;
        }
    }

    /**
     * Save weather data to localStorage
     */
    saveToCache() {
        try {
            const cacheData = {
                data: this.weatherData,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('weatherData', JSON.stringify(cacheData));
            console.log('💾 Weather data saved to cache');
        } catch (error) {
            console.error('Error saving cache:', error);
        }
    }

    /**
     * Fetch weather data for all cities from Open-Meteo API
     */
    async fetchAllWeatherData() {
        const promises = Object.entries(CITIES).map(([cityName, coords]) =>
            this.fetchWeatherForCity(cityName, coords)
        );

        try {
            await Promise.all(promises);
            this.lastUpdate = new Date();
            this.saveToCache();
            console.log(`✅ Weather data updated at ${this.lastUpdate.toLocaleString('es-CL')}`);

            // Dispatch event to notify UI
            window.dispatchEvent(new CustomEvent('weatherUpdated', {
                detail: { timestamp: this.lastUpdate }
            }));
        } catch (error) {
            console.error('❌ Error fetching weather data:', error);
        }
    }

    /**
     * Fetch weather data for a single city
     */
    async fetchWeatherForCity(cityName, coords) {
        const { lat, lon, distance, zone } = coords;

        const params = new URLSearchParams({
            latitude: lat,
            longitude: lon,
            current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m',
            daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max',
            timezone: 'America/Santiago',
            forecast_days: 7
        });

        const url = `${this.apiBaseUrl}?${params}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Transform API response to our format
            this.weatherData[cityName] = {
                city: { name: cityName, lat, lon, distance, zone },
                current: {
                    time: data.current.time,
                    temperature_2m: data.current.temperature_2m,
                    weather_code: data.current.weather_code,
                    wind_speed_10m: data.current.wind_speed_10m,
                    wind_direction_10m: data.current.wind_direction_10m,
                    relative_humidity_2m: data.current.relative_humidity_2m
                },
                daily: {
                    time: data.daily.time,
                    weather_code: data.daily.weather_code,
                    temperature_2m_max: data.daily.temperature_2m_max,
                    temperature_2m_min: data.daily.temperature_2m_min,
                    precipitation_sum: data.daily.precipitation_sum,
                    wind_speed_10m_max: data.daily.wind_speed_10m_max
                },
                updated: new Date().toISOString()
            };

            console.log(`✓ Fetched data for ${cityName}`);
        } catch (error) {
            console.error(`✗ Error fetching ${cityName}:`, error);
        }
    }

    /**
     * Schedule automatic updates at 08:00 and 20:00
     */
    scheduleUpdates() {
        // Clear existing interval if any
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }

        // Check every minute if it's time to update
        this.updateInterval = setInterval(() => {
            const now = new Date();
            const hour = now.getHours();
            const minute = now.getMinutes();

            // Update at 08:00 or 20:00 (with 1-minute window)
            if ((hour === 8 || hour === 20) && minute === 0) {
                console.log(`⏰ Scheduled update triggered at ${now.toLocaleString('es-CL')}`);
                this.fetchAllWeatherData();
            }
        }, 60000); // Check every minute

        console.log('⏰ Automatic updates scheduled for 08:00 and 20:00');
    }

    /**
     * Get time until next update
     */
    getTimeUntilNextUpdate() {
        const now = new Date();
        const hour = now.getHours();

        let nextUpdateHour;
        if (hour < 8) {
            nextUpdateHour = 8;
        } else if (hour < 20) {
            nextUpdateHour = 20;
        } else {
            nextUpdateHour = 8; // Next day
        }

        const nextUpdate = new Date();
        nextUpdate.setHours(nextUpdateHour, 0, 0, 0);

        if (nextUpdateHour === 8 && hour >= 20) {
            nextUpdate.setDate(nextUpdate.getDate() + 1);
        }

        const diff = nextUpdate - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        return { hours, minutes, nextUpdate };
    }

    /**
     * Manual refresh (force update)
     */
    async refresh() {
        console.log('🔄 Manual refresh triggered');
        await this.fetchAllWeatherData();
    }

    /**
     * Get weather data for a specific city
     */
    getWeatherData(cityName) {
        return this.weatherData[cityName] || null;
    }

    /**
     * Get all available cities
     */
    getAllCities() {
        return Object.keys(CITIES);
    }

    /**
     * Get last update timestamp
     */
    getLastUpdate() {
        return this.lastUpdate;
    }

    /**
     * Get weather description from WMO code
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

    /**
     * Get weather icon class based on code
     */
    getWeatherIcon(code) {
        if (code === 0 || code === 1) return 'fa-sun';
        if (code === 2 || code === 3) return 'fa-cloud-sun';
        if (code >= 45 && code <= 48) return 'fa-smog';
        if (code >= 51 && code <= 67) return 'fa-cloud-rain';
        if (code >= 71 && code <= 77) return 'fa-snowflake';
        if (code >= 80 && code <= 82) return 'fa-cloud-showers-heavy';
        if (code >= 85 && code <= 86) return 'fa-snowflake';
        if (code >= 95) return 'fa-bolt';
        return 'fa-cloud';
    }

    /**
     * Get active weather alerts based on conditions
     * Criteria: Wind > 60km/h, Snow, Storms
     */
    getAlerts() {
        const alerts = [];
        const cities = this.getAllCities();

        cities.forEach(city => {
            const data = this.getWeatherData(city);
            if (!data) return;

            const wind = data.current.wind_speed_10m;
            const code = data.current.weather_code;

            // Wind Alert
            if (wind > 60) {
                alerts.push({
                    city: city,
                    type: 'wind',
                    level: 'warning',
                    message: `Vientos fuertes de ${Math.round(wind)} km/h`,
                    icon: 'fa-wind'
                });
            } else if (wind > 40) {
                alerts.push({
                    city: city,
                    type: 'wind',
                    level: 'info',
                    message: `Ráfagas de ${Math.round(wind)} km/h`,
                    icon: 'fa-wind'
                });
            }

            // Snow Alert
            if (code >= 71 && code <= 86) {
                alerts.push({
                    city: city,
                    type: 'snow',
                    level: 'warning',
                    message: 'Nevadas activas',
                    icon: 'fa-snowflake'
                });
            }

            // Storm Alert
            if (code >= 95) {
                alerts.push({
                    city: city,
                    type: 'storm',
                    level: 'danger',
                    message: 'Tormenta eléctrica',
                    icon: 'fa-bolt'
                });
            }
        });

        return alerts;
    }

    /**
     * Get weather modifier class for BEM
     */
    getWeatherModifier(code) {
        if (code === 0 || code === 1) return 'sunny';
        if (code === 2 || code === 3) return 'cloudy';
        if (code >= 51 && code <= 67) return 'rainy';
        if (code >= 71 && code <= 86) return 'snowy';
        return 'cloudy';
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WeatherService;
}
