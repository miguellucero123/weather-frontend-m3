/**
 * ClimaTorre - Torres del Paine Weather App
 * Main Application Logic
 * Module 3 - Portfolio
 */

// Initialize Weather Service
const weatherService = new WeatherService();

// Map variables
let map = null;
let mapInitialized = false;
const TORRES_DEL_PAINE = [-51.0000, -73.2300];

/**
 * Initialize app on DOM ready
 */
document.addEventListener('DOMContentLoaded', function () {
    console.log('ClimaTorre App initialized');

    // Listen for weather updates
    window.addEventListener('weatherUpdated', (e) => {
        updateUI(e.detail.timestamp);
    });

    // Initial render (will use cache or wait for API)
    // If data is already there (sync cache), render immediately
    if (weatherService.getLastUpdate()) {
        updateUI(weatherService.getLastUpdate());
    }

    setupNavigation();
});

/**
 * Update all UI elements with fresh data
 */
function updateUI(timestamp) {
    renderWeatherCards();
    updateTorresWidget();
    updateLastUpdatedInfo(timestamp);

    // Update map if it's already initialized
    if (mapInitialized && map) {
        updateMapMarkers();
    }
}

/**
 * Render weather cards dynamically
 */
function renderWeatherCards() {
    const gridContainer = document.querySelector('.row.g-4');
    if (!gridContainer) return;

    gridContainer.innerHTML = ''; // Clear static content

    const cities = weatherService.getAllCities();

    cities.forEach(cityName => {
        const data = weatherService.getWeatherData(cityName);
        if (!data) return;

        const current = data.current;
        const weatherCode = current.weather_code;
        const temp = Math.round(current.temperature_2m);
        const desc = weatherService.getWeatherDescription(weatherCode);
        const iconClass = weatherService.getWeatherIcon(weatherCode);
        const modifier = weatherService.getWeatherModifier(weatherCode);

        const cardHtml = `
            <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
                <article class="place-card place-card--${modifier}" onclick="showDetail('${cityName}')">
                    <div class="place-card__header">
                        <h2 class="place-card__name">${cityName}</h2>
                        <span class="place-card__distance">${data.city.distance} km</span>
                    </div>
                    <div class="place-card__body">
                        <div class="place-card__icon">
                            <i class="fas ${iconClass}"></i>
                        </div>
                        <div class="place-card__temp">${temp}°C</div>
                        <div class="place-card__description">${desc}</div>
                        <span class="place-card__badge">Ver detalle →</span>
                    </div>
                </article>
            </div>
        `;

        gridContainer.insertAdjacentHTML('beforeend', cardHtml);
    });
}

/**
 * Update the specific Torres del Paine widget
 */
function updateTorresWidget() {
    const torresData = weatherService.getWeatherData('Torres del Paine - Glaciar Grey');
    if (torresData) {
        const temp = Math.round(torresData.current.temperature_2m);
        const tempWidget = document.getElementById('torres-temp-widget');
        if (tempWidget) {
            tempWidget.innerText = temp + '°C';
        }
    }
}

/**
 * Update the "Last Updated" banner
 */
function updateLastUpdatedInfo(date) {
    const infoElement = document.querySelector('.update-info');
    if (infoElement && date) {
        const formattedDate = new Date(date).toLocaleString('es-CL');
        infoElement.innerHTML = `<i class="fas fa-sync"></i> Actualizado: ${formattedDate}`;
    }
}

/**
 * Setup navigation events
 */
function setupNavigation() {
    // Add smooth scroll to all nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

/**
 * Scroll to map section
 */
function scrollToMap() {
    document.getElementById('mapa').scrollIntoView({ behavior: 'smooth' });
    const container = document.getElementById('mapContainer');
    if (!container.classList.contains('show')) {
        toggleMap();
    }
}

/**
 * Toggle map visibility
 */
function toggleMap() {
    const container = document.getElementById('mapContainer');
    const toggle = document.querySelector('.map-toggle');
    const isShown = container.classList.contains('show');

    if (isShown) {
        container.classList.remove('show');
        toggle.classList.remove('collapsed');
    } else {
        container.classList.add('show');
        toggle.classList.add('collapsed');
        if (!mapInitialized) {
            initializeMap();
            mapInitialized = true;
        }
    }
}

/**
 * Initialize Leaflet map
 */
function initializeMap() {
    map = L.map('mapContainer').setView(TORRES_DEL_PAINE, 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    updateMapMarkers();

    // Fix map display issues
    setTimeout(() => {
        map.invalidateSize();
    }, 100);
}

/**
 * Update Map Markers with current data
 */
function updateMapMarkers() {
    // Clear existing markers (optional, but good practice if updating)
    map.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
            map.removeLayer(layer);
        }
    });

    // Add Torres del Paine marker
    L.circleMarker(TORRES_DEL_PAINE, {
        radius: 12,
        fillColor: '#00bcd4',
        color: '#0d47a1',
        weight: 3,
        fillOpacity: 0.8
    }).addTo(map).bindPopup('🏔️ Torres del Paine (Glaciar Grey)');

    // Add markers for all cities
    const cities = weatherService.getAllCities();
    cities.forEach(cityName => {
        const data = weatherService.getWeatherData(cityName);
        if (data && data.city) {
            const lat = data.city.lat;
            const lon = data.city.lon;
            const temp = Math.round(data.current.temperature_2m);

            // Color based on temperature
            let color;
            if (temp < 5) color = '#0d47a1';
            else if (temp < 10) color = '#1976d2';
            else if (temp < 15) color = '#00bcd4';
            else if (temp < 20) color = '#4caf50';
            else color = '#ff9800';

            L.circleMarker([lat, lon], {
                radius: 10,
                fillColor: color,
                color: '#fff',
                weight: 2,
                fillOpacity: 0.8
            }).addTo(map).bindPopup(`${cityName} - ${temp}°C`);
        }
    });
}

/**
 * Go back to home view
 */
function goHome() {
    document.getElementById('home').style.display = 'block';
    document.getElementById('detail').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Show detail view for a city
 */
function showDetail(city) {
    const data = weatherService.getWeatherData(city);
    if (!data) {
        console.error('No data found for city:', city);
        return;
    }

    const current = data.current;
    const daily = data.daily;
    const desc = weatherService.getWeatherDescription(current.weather_code);

    // Build detail HTML
    let html = `
        <div class="detail-header">
            <h2><i class="fas fa-location-dot"></i> ${city}</h2>
            <p class="text-center text-muted">${desc}</p>
            <div class="weather-details">
                <div class="detail-item">
                    <div class="detail-item__label">Temperatura</div>
                    <div class="detail-item__value">${Math.round(current.temperature_2m)}°C</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item__label">Humedad</div>
                    <div class="detail-item__value">${current.relative_humidity_2m}%</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item__label">Viento</div>
                    <div class="detail-item__value">${Math.round(current.wind_speed_10m)} km/h</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item__label">Dirección</div>
                    <div class="detail-item__value">${Math.round(current.wind_direction_10m)}°</div>
                </div>
            </div>
        </div>
        
        <div class="forecast-section">
            <h3 class="forecast-title">
                <i class="fas fa-calendar-week"></i> Pronóstico Semanal (Click para detalles)
            </h3>
            <div class="row g-3">
    `;

    // Add forecast cards
    for (let i = 0; i < daily.time.length; i++) {
        const date = new Date(daily.time[i]);
        const dateStr = date.toLocaleDateString('es-CL', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
        const dayCode = daily.weather_code[i];
        const dayIcon = weatherService.getWeatherIcon(dayCode);

        html += `
            <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
                <div class="forecast-card" onclick="showDayDetail('${city}', ${i})">
                    <div class="forecast-card__day">${dateStr}</div>
                    <div style="font-size: 1.5rem; color: var(--secondary); margin: 0.5rem 0;">
                        <i class="fas ${dayIcon}"></i>
                    </div>
                    <div class="forecast-card__temps">
                        <strong>${Math.round(daily.temperature_2m_max[i])}°C</strong> / 
                        ${Math.round(daily.temperature_2m_min[i])}°C
                    </div>
                    <div class="forecast-card__info">
                        <div>
                            <small>Lluvia</small>
                            <div class="forecast-card__info-value">${daily.precipitation_sum[i].toFixed(1)}mm</div>
                        </div>
                        <div>
                            <small>Viento</small>
                            <div class="forecast-card__info-value">${Math.round(daily.wind_speed_10m_max[i])}km/h</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    html += `
            </div>
        </div>
        <div id="dayDetail"></div>
    `;

    // Update DOM
    document.getElementById('detailContent').innerHTML = html;
    document.getElementById('home').style.display = 'none';
    document.getElementById('detail').style.display = 'block';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Show detailed information for a specific day
 */
function showDayDetail(city, dayIndex) {
    const data = weatherService.getWeatherData(city);
    if (!data) return;

    const daily = data.daily;
    const max = Math.round(daily.temperature_2m_max[dayIndex]);
    const min = Math.round(daily.temperature_2m_min[dayIndex]);
    const rain = daily.precipitation_sum[dayIndex];
    const wind = Math.round(daily.wind_speed_10m_max[dayIndex]);
    const code = daily.weather_code[dayIndex];
    const desc = weatherService.getWeatherDescription(code);

    const date = new Date(daily.time[dayIndex]);
    const dayDate = date.toLocaleDateString('es-CL', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    const html = `
        <div class="day-detail show">
            <h3><i class="fas fa-calendar-day"></i> Detalle: ${dayDate}</h3>
            <p style="color: #666; font-size: 1.1rem; text-align: center; margin-bottom: 2rem;">${desc}</p>
            <div class="day-detail__grid">
                <div class="detail-item">
                    <div class="detail-item__label">Máxima</div>
                    <div class="detail-item__value">${max}°C</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item__label">Mínima</div>
                    <div class="detail-item__value">${min}°C</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item__label">Precipitación</div>
                    <div class="detail-item__value">${rain.toFixed(1)} mm</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item__label">Viento Máximo</div>
                    <div class="detail-item__value">${wind} km/h</div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('dayDetail').innerHTML = html;
    document.getElementById('dayDetail').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}
