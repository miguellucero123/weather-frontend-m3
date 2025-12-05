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

// Chart variables
let forecastChart = null;
let currentStatsCity = null;

// Torres del Paine detailed map variables
let torresMap = null;
let torresMapInitialized = false;
let torresWeatherData = [];

/**
 * Initialize app on DOM ready
 */
document.addEventListener('DOMContentLoaded', function () {
    console.log('ClimaTorre App initialized');

    // Listen for weather updates
    window.addEventListener('weatherUpdated', (e) => {
        updateUI(e.detail.timestamp);
    });

    // Initial render
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

    // Update map if initialized
    if (mapInitialized && map) {
        updateMapMarkers();
    }

    // Update charts if stats view is active
    const statsSection = document.getElementById('stats');
    if (statsSection.style.display === 'block') {
        renderAlerts();
        if (currentStatsCity) {
            renderForecastChart(currentStatsCity);
        } else {
            renderCityTabs(); // Initialize tabs if not already done
        }
    }
}

/**
 * Render weather cards dynamically
 */
function renderWeatherCards() {
    const gridContainer = document.querySelector('.row.g-4');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';

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
    goHome();
    setTimeout(() => {
        document.getElementById('mapa').scrollIntoView({ behavior: 'smooth' });
        const container = document.getElementById('mapContainer');
        if (!container.classList.contains('show')) {
            toggleMap();
        }
    }, 100);
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

    setTimeout(() => {
        map.invalidateSize();
    }, 100);
}

/**
 * Update Map Markers with current data
 */
function updateMapMarkers() {
    map.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) {
            map.removeLayer(layer);
        }
    });

    L.circleMarker(TORRES_DEL_PAINE, {
        radius: 12,
        fillColor: '#00bcd4',
        color: '#0d47a1',
        weight: 3,
        fillOpacity: 0.8
    }).addTo(map).bindPopup('🏔️ Torres del Paine (Glaciar Grey)');

    const cities = weatherService.getAllCities();
    cities.forEach(cityName => {
        const data = weatherService.getWeatherData(cityName);
        if (data && data.city) {
            const lat = data.city.lat;
            const lon = data.city.lon;
            const temp = Math.round(data.current.temperature_2m);

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
    document.getElementById('stats').style.display = 'none';
    document.getElementById('torres-paine').style.display = 'none';

    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector('a[onclick="goHome()"]').classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Show Statistics View
 */
function showStats() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('detail').style.display = 'none';
    document.getElementById('stats').style.display = 'block';
    document.getElementById('torres-paine').style.display = 'none';

    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector('a[onclick="showStats()"]').classList.add('active');

    renderAlerts();
    renderCityTabs();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Render City Tabs for Statistics
 */
function renderCityTabs() {
    const cities = weatherService.getAllCities();
    const tabsContainer = document.getElementById('cityTabs');

    if (!tabsContainer) return;

    let html = '';
    cities.forEach((city, index) => {
        const isActive = index === 0 ? 'active' : '';
        // Shorten name for tab if too long
        const shortName = city.replace('Torres del Paine - ', '').replace('Glaciar ', '');

        html += `
            <li class="nav-item">
                <a class="nav-link ${isActive}" href="#" onclick="selectCityStats('${city}', this); return false;">
                    ${shortName}
                </a>
            </li>
        `;
    });

    tabsContainer.innerHTML = html;

    // Select first city by default
    if (cities.length > 0) {
        selectCityStats(cities[0]);
    }
}

/**
 * Select a city to show stats for
 */
function selectCityStats(city, element) {
    currentStatsCity = city;

    // Update active tab styling
    if (element) {
        document.querySelectorAll('#cityTabs .nav-link').forEach(link => link.classList.remove('active'));
        element.classList.add('active');
    }

    // Update Chart Title
    document.getElementById('chartTitle').innerText = `${city}: Pronóstico 7 Días`;

    renderForecastChart(city);
}

/**
 * Render Forecast Chart (Max/Min) for a specific city
 */
function renderForecastChart(city) {
    const data = weatherService.getWeatherData(city);
    if (!data) return;

    const daily = data.daily;
    const labels = daily.time.map(t => {
        const date = new Date(t);
        return date.toLocaleDateString('es-CL', { weekday: 'short', day: 'numeric' });
    });

    const ctx = document.getElementById('forecastChart').getContext('2d');

    if (forecastChart) {
        forecastChart.destroy();
    }

    forecastChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Máxima (°C)',
                    data: daily.temperature_2m_max,
                    borderColor: '#ff9800', // Orange
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#ff9800',
                    fill: false
                },
                {
                    label: 'Mínima (°C)',
                    data: daily.temperature_2m_min,
                    borderColor: '#03a9f4', // Light Blue
                    backgroundColor: 'rgba(3, 169, 244, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#03a9f4',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 20,
                    bottom: 30, // Increased bottom padding for X-axis labels
                    left: 10,
                    right: 10
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: { size: 12, family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif" }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleFont: { size: 14 },
                    bodyFont: { size: 13 },
                    padding: 10,
                    cornerRadius: 8,
                    displayColors: true
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: '#e0e0e0',
                        drawBorder: false
                    },
                    ticks: {
                        font: { size: 12 },
                        padding: 10,
                        callback: function (value) { return value + '°C'; }
                    },
                    border: { display: false }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        font: { size: 12 },
                        maxRotation: 0,
                        padding: 10 // Padding for X-axis labels
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

/**
 * Render Active Alerts
 */
function renderAlerts() {
    const alerts = weatherService.getAlerts();
    const container = document.getElementById('alertsContainer');

    if (alerts.length === 0) {
        container.innerHTML = `
            <div class="alert alert-success text-center">
                <i class="fas fa-check-circle"></i> No hay alertas meteorológicas activas en la región.
            </div>
        `;
        return;
    }

    let html = '<h4 class="mb-3">⚠️ Alertas Activas</h4><div class="list-group">';

    alerts.forEach(alert => {
        let colorClass = 'list-group-item-warning';
        if (alert.level === 'danger') colorClass = 'list-group-item-danger';
        if (alert.level === 'info') colorClass = 'list-group-item-info';

        html += `
            <div class="list-group-item ${colorClass} d-flex justify-content-between align-items-center">
                <div>
                    <i class="fas ${alert.icon} mr-2"></i>
                    <strong>${alert.city}:</strong> ${alert.message}
                </div>
                <span class="badge badge-dark">ACTIVO</span>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

/**
 * Show detail view for a city
 */
function showDetail(city) {
    const data = weatherService.getWeatherData(city);
    if (!data) return;

    const current = data.current;
    const daily = data.daily;
    const desc = weatherService.getWeatherDescription(current.weather_code);

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
                <i class="fas fa-calendar-week"></i> Pronóstico Semanal
            </h3>
            <div class="row g-3">
    `;

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

    document.getElementById('detailContent').innerHTML = html;
    document.getElementById('home').style.display = 'none';
    document.getElementById('stats').style.display = 'none';
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

/**
 * Show Torres del Paine Detailed View
 */
async function showTorresDetail() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('detail').style.display = 'none';
    document.getElementById('stats').style.display = 'none';
    document.getElementById('torres-paine').style.display = 'block';

    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector('a[onclick="showTorresDetail()"]').classList.add('active');

    // Initialize map if not already done
    if (!torresMapInitialized) {
        initializeTorresMap();
        torresMapInitialized = true;
    }

    // Fetch and render weather data for Torres points
    await renderTorresWeatherPoints();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Initialize Torres del Paine detailed map
 */
function initializeTorresMap() {
    torresMap = L.map('torresMapContainer').setView([-50.95, -73.05], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(torresMap);

    setTimeout(() => {
        torresMap.invalidateSize();
    }, 100);
}

/**
 * Render weather points for Torres del Paine
 */
async function renderTorresWeatherPoints() {
    const container = document.getElementById('torresWeatherPoints');
    container.innerHTML = '<div class="col-12 text-center"><i class="fas fa-spinner fa-spin fa-2x"></i><p>Cargando datos meteorológicos...</p></div>';

    try {
        torresWeatherData = await weatherService.fetchAllTorresPoints();

        if (torresWeatherData.length === 0) {
            container.innerHTML = '<div class="col-12"><div class="alert alert-warning">No se pudieron cargar los datos meteorológicos.</div></div>';
            return;
        }

        // Clear loading message
        container.innerHTML = '';

        // Clear existing markers
        if (torresMap) {
            torresMap.eachLayer((layer) => {
                if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
                    torresMap.removeLayer(layer);
                }
            });
        }

        // Render each point
        torresWeatherData.forEach(pointData => {
            renderTorresWeatherCard(pointData, container);
            addTorresMapMarker(pointData);
        });

    } catch (error) {
        console.error('Error rendering Torres weather points:', error);
        container.innerHTML = '<div class="col-12"><div class="alert alert-danger">Error al cargar los datos.</div></div>';
    }
}

/**
 * Render a weather card for a Torres point
 */
function renderTorresWeatherCard(pointData, container) {
    const current = pointData.current;
    const temp = Math.round(current.temperature_2m);
    const feelsLike = Math.round(current.apparent_temperature);
    const humidity = current.relative_humidity_2m;
    const windSpeed = Math.round(current.wind_speed_10m);
    const windDir = weatherService.getWindDirection(current.wind_direction_10m);
    const precipitation = current.precipitation;
    const weatherDesc = weatherService.getWeatherDescription(current.weather_code);
    const weatherIcon = weatherService.getWeatherIcon(current.weather_code);

    const cardHtml = `
        <div class="col-12 col-md-6 col-lg-4 mb-4">
            <div class="card h-100" style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                <div class="card-body">
                    <h5 class="card-title" style="border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 10px; margin-bottom: 15px;">
                        <i class="fas ${pointData.icon}"></i> ${pointData.point}
                    </h5>
                    <p class="text-muted" style="font-size: 0.85rem; color: rgba(255,255,255,0.7) !important;">
                        ${pointData.description}
                    </p>
                    <div class="text-center my-3">
                        <i class="fas ${weatherIcon}" style="font-size: 3rem; color: #ffd700;"></i>
                        <div style="font-size: 2.5rem; font-weight: bold; margin-top: 10px;">${temp}°C</div>
                        <div style="font-size: 0.9rem; opacity: 0.8;">${weatherDesc}</div>
                    </div>
                    <div class="row text-center" style="border-top: 1px solid rgba(255,255,255,0.2); padding-top: 15px; margin-top: 15px;">
                        <div class="col-6 mb-2">
                            <small style="opacity: 0.8;">Sensación</small>
                            <div style="font-weight: bold;">${feelsLike}°C</div>
                        </div>
                        <div class="col-6 mb-2">
                            <small style="opacity: 0.8;">Humedad</small>
                            <div style="font-weight: bold;">${humidity}%</div>
                        </div>
                        <div class="col-6">
                            <small style="opacity: 0.8;">Viento</small>
                            <div style="font-weight: bold;">${windSpeed} km/h ${windDir}</div>
                        </div>
                        <div class="col-6">
                            <small style="opacity: 0.8;">Precipitación</small>
                            <div style="font-weight: bold;">${precipitation} mm</div>
                        </div>
                    </div>
                    <div class="mt-3" style="background: rgba(0,0,0,0.2); padding: 8px; border-radius: 8px; text-align: center;">
                        <small><i class="fas fa-route"></i> Circuito ${pointData.circuit}</small>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', cardHtml);
}

/**
 * Add marker to Torres map
 */
function addTorresMapMarker(pointData) {
    if (!torresMap) return;

    const temp = Math.round(pointData.current.temperature_2m);
    const lat = pointData.coords.lat;
    const lon = pointData.coords.lon;

    // Color based on temperature
    let color;
    if (temp < 0) color = '#0d47a1';
    else if (temp < 5) color = '#1976d2';
    else if (temp < 10) color = '#00bcd4';
    else if (temp < 15) color = '#4caf50';
    else color = '#ff9800';

    const marker = L.circleMarker([lat, lon], {
        radius: 8,
        fillColor: color,
        color: '#fff',
        weight: 2,
        fillOpacity: 0.9
    }).addTo(torresMap);

    marker.bindPopup(`
        <div style="text-align: center;">
            <strong><i class="fas ${pointData.icon}"></i> ${pointData.point}</strong><br>
            <span style="font-size: 1.2rem; font-weight: bold;">${temp}°C</span><br>
            <small>${pointData.description}</small>
        </div>
    `);
}
