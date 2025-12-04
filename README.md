# ClimaTorre - Torres del Paine Weather App

**Módulo 3 - Portafolio de Desarrollo Frontend**

Aplicación web de pronóstico meteorológico para Torres del Paine y áreas circundantes de la Patagonia chilena y argentina.

---

## 📋 Descripción del Proyecto

ClimaTorre es una aplicación meteorológica avanzada que muestra el pronóstico de 7 días para 10 ubicaciones estratégicas alrededor del Parque Nacional Torres del Paine.

**¡AHORA CON DATOS EN TIEMPO REAL!** 🚀
La aplicación se conecta directamente a la API de Open-Meteo para ofrecer datos precisos y actualizados al instante.

### Ubicaciones Cubiertas:
- **Torres del Paine - Glaciar Grey** (punto de referencia principal)
- Puerto Natales, Punta Arenas (Chile)
- El Calafate, El Chaltén, Glaciar Perito Moreno, Río Gallegos, Tres Lagos, Gobernador Gregores (Argentina)
- Villa O'Higgins (zona norte)

### Temática
La aplicación se centra en **condiciones climáticas de montaña y glaciares**, proporcionando información vital para excursionistas, montañistas y turistas que visitan la región patagónica.

---

## 🌟 Nuevas Funcionalidades (Actualización)

Esta versión incluye características avanzadas que llevan el proyecto al siguiente nivel:

### 1. 📡 Datos en Tiempo Real (API Integration)
- Conexión directa con **Open-Meteo API**.
- **Actualización Automática:** El sistema verifica y actualiza los datos automáticamente a las **08:00 AM** y **08:00 PM** (20:00 hrs) todos los días.
- **Caché Inteligente:** Los datos se guardan localmente para una carga instantánea y funcionamiento offline.

### 2. 📊 Dashboard de Estadísticas
- **Gráficos Interactivos:** Implementación de **Chart.js**.
- **Pestañas por Ciudad:** Navegación fluida entre las 10 estaciones.
- **Pronóstico Visual:** Gráfico de líneas comparativo de temperaturas Máximas y Mínimas para los próximos 7 días.

### 3. ⚠️ Sistema de Alertas Inteligentes
- **Detección de Riesgos:** Análisis automático de condiciones peligrosas.
- **Alertas de Viento:** Advertencias visuales para vientos >40 km/h y >60 km/h (crítico en la Patagonia).
- **Alertas de Nieve y Tormentas:** Notificaciones inmediatas sobre condiciones adversas.

---

## 🎯 Objetivos de Aprendizaje (Módulo 3)

Esta iteración del proyecto se enfoca en:

1. ✅ **Metodología de organización de estilos (BEM)**
2. ✅ **Preprocesamiento con SASS** (variables, mixins, parciales, anidamiento)
3. ✅ **Modelo de cajas y conceptos de layout** (posicionamiento, flexbox, grid)
4. ✅ **Bootstrap 4** para sistema de grid y componentes
5. ✅ **Gestión Git/GitHub** con commits descriptivos
6. ✅ **Consumo de APIs REST** y manejo de asincronía (Async/Await)
7. ✅ **Visualización de Datos** con librerías de terceros (Chart.js)

---

## 🏗️ Metodología de Estilos: BEM

### ¿Qué es BEM?

**BEM** (Block Element Modifier) es una convención de nomenclatura para clases CSS que facilita el mantenimiento y escalabilidad del código.

### Estructura BEM

```
.bloque__elemento--modificador
```

- **Bloque**: Componente independiente (ej: `place-card`)
- **Elemento**: Parte del bloque (ej: `place-card__header`)
- **Modificador**: Variante del bloque/elemento (ej: `place-card--sunny`)

### Ejemplos en ClimaTorre

#### Componente: Tarjeta de Lugar
```html
<article class="place-card place-card--sunny">
    <div class="place-card__header">
        <h2 class="place-card__name">El Calafate</h2>
        <span class="place-card__distance">290 km</span>
    </div>
    <div class="place-card__body">
        <div class="place-card__icon">...</div>
        <div class="place-card__temp">13°C</div>
        <div class="place-card__description">...</div>
        <span class="place-card__badge">Ver detalle</span>
    </div>
</article>
```

**Modificadores de clima:**
- `.place-card--sunny` (soleado)
- `.place-card--rainy` (lluvioso)
- `.place-card--snowy` (nevado)
- `.place-card--cloudy` (nublado)

---

## 📁 Estructura SASS

### Organización de Archivos

```
scss/
├── base/
│   ├── _variables.scss    # Variables de diseño (colores, fuentes, spacing)
│   ├── _mixins.scss        # Mixins reutilizables (media queries, flexbox)
│   └── _reset.scss         # Reset CSS y box-sizing
├── layout/
│   └── _layout.scss        # Estructura principal (header, main, footer)
├── components/
│   ├── _navbar.scss        # Barra de navegación
│   ├── _place-card.scss    # Tarjetas de ubicaciones
│   ├── _buttons.scss       # Botones
│   └── _footer.scss        # Pie de página
└── main.scss               # Archivo principal que importa todos los parciales
```

---

## 🚀 Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos compilados desde SASS
- **SASS** - Preprocesador CSS
- **Bootstrap 4.6.2** - Sistema de grid y componentes
- **JavaScript (ES6+)** - Lógica de aplicación
- **Leaflet.js** - Mapas interactivos
- **Chart.js** - Gráficos y visualización de datos
- **Font Awesome 6** - Iconografía
- **Open-Meteo API** - Fuente de datos meteorológicos

---

## 📦 Instalación y Uso

### Requisitos Previos
- Node.js (v14 o superior)
- npm (v6 o superior)

### Pasos de Instalación

1. **Clonar el repositorio**:
```bash
git clone https://github.com/usuario/weather-frontend-m3.git
cd weather-frontend-m3
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Compilar SASS**:
```bash
npm run build-css
```

4. **Modo desarrollo (watch)**:
```bash
npm run watch-css
```

5. **Abrir en el navegador**:
Abre `index.html` directamente o usa un servidor local:
```bash
# Con Python
python -m http.server 8000

# Con Node.js (http-server)
npx http-server
```

Luego navega a `http://localhost:8000`

---

## 🎨 Responsive Design

### Breakpoints

| Dispositivo | Ancho | Columnas Grid |
|-------------|-------|---------------|
| **Mobile** | ≤ 420px | 1 columna (`col-12`) |
| **Tablet** | ≥ 768px | 2 columnas (`col-md-6`) |
| **Desktop** | ≥ 1024px | 3-4 columnas (`col-lg-4 col-xl-3`) |

---

## 📊 Estructura del Proyecto

```
modulo3_portafolio/
├── index.html              # Página principal
├── package.json            # Configuración npm
├── README.md               # Este archivo
├── scss/                   # Código fuente SASS
│   ├── base/
│   ├── layout/
│   ├── components/
│   └── main.scss
├── css/
│   └── main.css            # CSS compilado (generado)
├── js/
│   ├── app.js              # Lógica principal
│   └── weatherService.js   # Servicio de datos (API + Caché)
└── assets/                 # Recursos adicionales
```

---

## 🔮 Próximas Mejoras (Roadmap)

- [x] Integración con **Open-Meteo API** para datos en tiempo real
- [x] Gráficos de tendencia de temperatura (Chart.js)
- [x] Sistema de Alertas Meteorológicas
- [ ] Búsqueda de ubicaciones personalizadas
- [ ] Modo oscuro/claro
- [ ] PWA (Progressive Web App)

---

## 📝 Git & GitHub

### Commits Realizados

✅ **Mínimo 3 commits descriptivos:**

1. `chore: setup sass structure and npm configuration`
2. `style: apply BEM methodology to weather cards and layout`
3. `feat: integrate Bootstrap 4 grid and responsive design`
4. `docs: add comprehensive README with methodology explanation`
5. `feat: implement real-time data fetching from Open-Meteo API`
6. `feat: add statistics dashboard and weather alerts`

### Convención de Commits

Siguiendo **Conventional Commits**:
- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bugs
- `style:` - Cambios de estilos (CSS/SASS)
- `refactor:` - Refactorización de código
- `docs:` - Documentación
- `chore:` - Tareas de mantenimiento

---

## 👤 Autor

**Nombre**: [Tu Nombre]  
**Curso**: Desarrollo Frontend - Módulo 3  
**Institución**: AIEP  
**Año**: 2025

---

## 📜 Licencia

ISC License - Este proyecto es de uso educativo.

---

## 🔗 Enlaces

- **Repositorio GitHub**: [https://github.com/miguellucero123/weather-frontend-m3](https://github.com/miguellucero123/weather-frontend-m3)
- **Open-Meteo API**: [https://open-meteo.com/](https://open-meteo.com/)
- **BEM Methodology**: [https://getbem.com/](https://getbem.com/)
- **SASS Documentation**: [https://sass-lang.com/](https://sass-lang.com/)
- **Bootstrap 4 Docs**: [https://getbootstrap.com/docs/4.6/](https://getbootstrap.com/docs/4.6/)
- **Chart.js**: [https://www.chartjs.org/](https://www.chartjs.org/)

---

## 🙏 Agradecimientos

- Datos meteorológicos de **Open-Meteo API**
- Mapas proporcionados por **OpenStreetMap** y **Leaflet.js**
- Iconos de **Font Awesome**
- Gráficos por **Chart.js**

---

**¡Gracias por revisar este proyecto!** 🌤️
