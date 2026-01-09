# ClimaTorre - Torres del Paine Weather App

**Módulo 4 - Portafolio de Desarrollo Frontend**

Aplicación web de pronóstico meteorológico para Torres del Paine y áreas circundantes de la Patagonia chilena y argentina.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![SASS](https://img.shields.io/badge/SASS-CC6699?style=flat&logo=sass&logoColor=white)](https://sass-lang.com/)

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

## 🎯 Objetivos de Aprendizaje

### Módulo 2
- ✅ HTML5 semántico y estructura limpia
- ✅ Bootstrap para diseño responsive
- ✅ JavaScript básico con DOM manipulation
- ✅ Uso de `addEventListener` para navegación (sin `onclick` inline)
- ✅ Modificación dinámica de clases CSS según ubicación

### Módulo 3
1. ✅ **Metodología de organización de estilos (BEM)**
2. ✅ **Preprocesamiento con SASS** (variables, mixins, parciales, anidamiento)
3. ✅ **Modelo de cajas y conceptos de layout** (posicionamiento, flexbox, grid)
4. ✅ **Bootstrap 4** para sistema de grid y componentes
5. ✅ **Gestión Git/GitHub** con commits descriptivos
6. ✅ **Consumo de APIs REST** y manejo de asincronía (Async/Await)
7. ✅ **Visualización de Datos** con librerías de terceros (Chart.js)

### Módulo 4
1. ✅ **Modelado de datos**: Arreglo de lugares con estructura completa
2. ✅ **Variables y constantes**: Uso para cálculos intermedios
3. ✅ **Ciclos (for/while)**: Recorrido de pronóstico semanal
4. ✅ **Condicionales (if/else)**: Evaluación de estados y generación de resúmenes
5. ✅ **Funciones**: `buscarLugar()` y `calcularEstadisticas()`
6. ✅ **Cálculos estadísticos**: Mínimo, máximo, promedio de temperaturas
7. ✅ **Conteo de días**: Por tipo de clima (Soleado, Nublado, Lluvioso)
8. ✅ **Resumen textual**: Generación automática basada en condiciones

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
modulo4_portafolio/
├── index.html              # Página principal (HTML5 semántico)
├── package.json            # Configuración npm
├── README.md               # Este archivo
├── CHANGELOG.md            # Historial de cambios
├── scss/                   # Código fuente SASS
│   ├── base/
│   │   ├── _variables.scss    # Variables de diseño
│   │   ├── _mixins.scss        # Mixins reutilizables
│   │   └── _reset.scss         # Reset CSS
│   ├── layout/
│   │   └── _layout.scss        # Estructura principal
│   ├── components/
│   │   ├── _navbar.scss        # Barra de navegación
│   │   ├── _place-card.scss    # Tarjetas de ubicaciones
│   │   ├── _buttons.scss       # Botones
│   │   ├── _footer.scss        # Pie de página
│   │   ├── _theme.scss         # Estilos de tema claro/oscuro
│   │   └── _inline-styles.scss # Estilos movidos desde HTML
│   └── main.scss               # Archivo principal
├── css/
│   └── main.css            # CSS compilado (generado)
├── js/
│   ├── app.js              # Lógica principal
│   ├── navigation.js       # Event listeners de navegación
│   ├── theme.js            # Gestor de tema claro/oscuro
│   ├── weatherService.js   # Servicio de datos (API + Caché)
│   ├── lugares.js          # Datos estáticos Módulo 4
│   └── utils/
│       └── excursionista.js # Utilidades para excursionistas
└── assets/                 # Recursos adicionales
```

---

## 🔮 Próximas Mejoras (Roadmap)

- [x] Integración con **Open-Meteo API** para datos en tiempo real
- [x] Gráficos de tendencia de temperatura (Chart.js)
- [x] Sistema de Alertas Meteorológicas
- [x] Modo oscuro/claro
- [x] Variables meteorológicas para excursionistas
- [x] Reestructuración de código (scripts externos)
- [ ] Búsqueda de ubicaciones personalizadas
- [ ] PWA (Progressive Web App)
- [ ] Notificaciones push para alertas críticas

---

## 📝 Git & GitHub

### Commits Realizados

✅ **Commits descriptivos siguiendo Conventional Commits:**

#### Módulo 3
1. `chore: setup sass structure and npm configuration`
2. `style: apply BEM methodology to weather cards and layout`
3. `feat: integrate Bootstrap 4 grid and responsive design`
4. `docs: add comprehensive README with methodology explanation`
5. `feat: implement real-time data fetching from Open-Meteo API`
6. `feat: add statistics dashboard and weather alerts`

#### Módulo 4
7. `feat: add dark/light theme toggle with persistence`
8. `refactor: move all scripts to external files (separation of concerns)`
9. `feat: add excursionist-focused weather variables to Torres cards`
10. `fix: ensure uniform card heights in grid layout`
11. `feat: implement Module 4 requirements (data modeling, statistics)`
12. `docs: update README and add CHANGELOG`

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
**Curso**: Desarrollo Frontend - Módulo 4  
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
