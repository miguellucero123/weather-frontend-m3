# ClimaTorre - Torres del Paine Weather App

**Módulo 3 - Portafolio de Desarrollo Frontend**

Aplicación web de pronóstico meteorológico para Torres del Paine y áreas circundantes de la Patagonia chilena y argentina.

---

## 📋 Descripción del Proyecto

ClimaTorre es una aplicación meteorológica que muestra el pronóstico de 7 días para 10 ubicaciones estratégicas alrededor del Parque Nacional Torres del Paine, incluyendo:

- **Torres del Paine - Glaciar Grey** (punto de referencia principal)
- Puerto Natales, Punta Arenas (Chile)
- El Calafate, El Chaltén, Glaciar Perito Moreno, Río Gallegos, Tres Lagos, Gobernador Gregores (Argentina)
- Villa O'Higgins (zona norte)

### Temática
La aplicación se centra en **condiciones climáticas de montaña y glaciares**, proporcionando información vital para excursionistas, montañistas y turistas que visitan la región patagónica.

---

## 🎯 Objetivos de Aprendizaje (Módulo 3)

Esta iteración del proyecto se enfoca en:

1. ✅ **Metodología de organización de estilos (BEM)**
2. ✅ **Preprocesamiento con SASS** (variables, mixins, parciales, anidamiento)
3. ✅ **Modelo de cajas y conceptos de layout** (posicionamiento, flexbox, grid)
4. ✅ **Bootstrap 4** para sistema de grid y componentes
5. ✅ **Gestión Git/GitHub** con commits descriptivos

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

#### Componente: Navbar
```html
<nav class="navbar navbar-custom">
    <a class="navbar__brand">...</a>
    <a class="navbar__link">...</a>
</nav>
```

#### Componente: Footer
```html
<footer class="footer">
    <div class="footer__content">
        <p class="footer__title">...</p>
        <p class="footer__text">...</p>
        <a class="footer__link">...</a>
    </div>
</footer>
```

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

### Descripción de Parciales

#### `_variables.scss`
Define todos los **tokens de diseño**:
- **Colores**: Primario, secundario, acento, luz, oscuro
- **Tipografía**: Familias, tamaños, pesos
- **Espaciado**: Escala de márgenes y paddings
- **Breakpoints**: Mobile (420px), Tablet (768px), Desktop (1024px)
- **Sombras**: Niveles de elevación
- **Transiciones**: Duraciones

Ejemplo:
```scss
$color-primary: #0d47a1;
$color-secondary: #1976d2;
$color-accent: #00bcd4;
$spacing-md: 1rem;
$breakpoint-mobile: 420px;
```

#### `_mixins.scss`
**Funciones reutilizables** para evitar repetición:

1. **Media Queries**:
```scss
@mixin mobile {
    @media (max-width: 420px) { @content; }
}
@mixin desktop {
    @media (min-width: 1024px) { @content; }
}
```

2. **Flexbox Helpers**:
```scss
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

3. **Variantes de Botones**:
```scss
@mixin button-variant($bg-color, $text-color) {
    background: $bg-color;
    color: $text-color;
    // ... más estilos
}
```

#### `_reset.scss`
Normalización y **box-sizing reset**:
```scss
*, *::before, *::after {
    box-sizing: border-box;
}
```

#### `_layout.scss`
Estructura de **nivel de página**:
- `.weather-app` (contenedor principal)
- `.weather-app__header` (encabezado)
- `.weather-app__main` (contenido principal)
- `.weather-app__footer` (pie de página)

#### `_place-card.scss`
Componente de **tarjeta de clima** con BEM completo, incluyendo:
- Estados hover y transiciones
- Modificadores por tipo de clima
- Layout flexbox interno

#### `main.scss`
**Punto de entrada** que importa todos los parciales en orden:
```scss
@import 'base/variables';
@import 'base/mixins';
@import 'base/reset';
@import 'layout/layout';
@import 'components/navbar';
@import 'components/place-card';
@import 'components/buttons';
@import 'components/footer';
```

---

## 🚀 Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos compilados desde SASS
- **SASS** - Preprocesador CSS
- **Bootstrap 4.6.2** - Sistema de grid y componentes
- **JavaScript (ES6+)** - Lógica de aplicación
- **Leaflet.js** - Mapas interactivos
- **Font Awesome 6** - Iconografía

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

### Bootstrap Grid Implementado

```html
<div class="row g-4">
    <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
        <!-- Tarjeta de clima -->
    </div>
</div>
```

---

## 🧩 Componentes Bootstrap Utilizados

1. **Navbar** (`.navbar`, `.navbar-expand-lg`, `.navbar-brand`)
   - Responsive con colapso en móvil
   - Menú de navegación con enlaces

2. **Grid System** (`.container-lg`, `.row`, `.col-*`)
   - Layout responsivo de tarjetas
   - Espaciado consistente con `g-4`

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
│   └── weatherService.js   # Servicio de datos
└── assets/                 # Recursos adicionales
```

---

## 🔮 Próximas Mejoras (Roadmap)

- [ ] Integración con **Open-Meteo API** para datos en tiempo real
- [ ] Búsqueda de ubicaciones personalizadas
- [ ] Gráficos de tendencia de temperatura
- [ ] Modo oscuro/claro
- [ ] PWA (Progressive Web App)
- [ ] Notificaciones de alertas meteorológicas

---

## 📝 Git & GitHub

### Commits Realizados

✅ **Mínimo 3 commits descriptivos:**

1. `chore: setup sass structure and npm configuration`
2. `style: apply BEM methodology to weather cards and layout`
3. `feat: integrate Bootstrap 4 grid and responsive design`
4. `docs: add comprehensive README with methodology explanation`
5. `refactor: modularize JavaScript into separate files`

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

- **Repositorio GitHub**: [https://github.com/usuario/weather-frontend-m3](https://github.com/usuario/weather-frontend-m3)
- **Open-Meteo API**: [https://open-meteo.com/](https://open-meteo.com/)
- **BEM Methodology**: [https://getbem.com/](https://getbem.com/)
- **SASS Documentation**: [https://sass-lang.com/](https://sass-lang.com/)
- **Bootstrap 4 Docs**: [https://getbootstrap.com/docs/4.6/](https://getbootstrap.com/docs/4.6/)

---

## 📸 Capturas de Pantalla

*(Agregar capturas de pantalla aquí)*

- Vista Home con grid de tarjetas
- Vista de detalle de ubicación
- Mapa interactivo
- Responsive móvil

---

## 🙏 Agradecimientos

- Datos meteorológicos de **Open-Meteo API**
- Mapas proporcionados por **OpenStreetMap** y **Leaflet.js**
- Iconos de **Font Awesome**

---

**¡Gracias por revisar este proyecto!** 🌤️
