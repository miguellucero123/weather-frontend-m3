# Changelog - ClimaTorre

## [Módulo 4] - 2025

### ✨ Nuevas Funcionalidades

#### 🌙 Modo Claro/Oscuro
- Implementación completa de sistema de tema claro/oscuro
- Botón toggle en el navbar con iconos dinámicos (luna/sol)
- Persistencia de preferencia del usuario en localStorage
- Detección automática de preferencia del sistema
- Estilos completos para todos los componentes en modo oscuro

#### 🧭 Reestructuración de Código
- **Separación de concerns**: Todos los scripts movidos a archivos externos
- **Nuevo archivo `js/navigation.js`**: Manejo centralizado de event listeners
- **Eliminación de `onclick` inline**: Uso exclusivo de `addEventListener` (cumple Módulo 2)
- **Estilos inline movidos a CSS**: Mejor organización y mantenibilidad
- **HTML5 semántico mejorado**: Estructura limpia sin scripts inline

#### 🏔️ Variables Meteorológicas para Excursionistas
- **Sensación térmica (Wind Chill)**: Cálculo basado en temperatura y viento
- **Viento detallado**: Velocidad, dirección y evaluación de condiciones
- **Visibilidad**: Estimación basada en estado del tiempo y humedad
- **Índice UV**: Cálculo y recomendaciones de protección solar
- **Humedad relativa**: Porcentaje de humedad en el aire
- **Probabilidad de precipitación**: Estimación para planificación
- Nuevo archivo `js/utils/excursionista.js` con funciones de cálculo

#### 🎨 Mejoras de UI/UX
- **Tarjetas con altura uniforme**: Grid responsive mejorado
- **Prevención de desbordes**: Textos con word-wrap y overflow controlado
- **Mejor organización visual**: Variables meteorológicas organizadas en filas
- **Iconos contextuales**: Colores según nivel de riesgo/condiciones

### 🔧 Mejoras Técnicas

#### Estructura de Archivos
```
js/
├── app.js              # Lógica principal
├── navigation.js        # Event listeners de navegación (NUEVO)
├── theme.js            # Gestor de tema claro/oscuro (NUEVO)
├── weatherService.js   # Servicio de datos meteorológicos
├── lugares.js          # Datos estáticos Módulo 4
└── utils/
    └── excursionista.js # Utilidades para excursionistas (NUEVO)
```

#### CSS/SCSS
- Nuevo archivo `scss/components/_theme.scss` para estilos de tema
- Nuevo archivo `scss/components/_inline-styles.scss` para estilos movidos desde HTML
- Mejoras en `scss/components/_place-card.scss` para tarjetas uniformes

### 📝 Cumplimiento de Requisitos

#### Módulo 2
- ✅ Uso de `addEventListener` para navegación (sin `onclick` inline)
- ✅ Modificación dinámica de clases CSS según ubicación
- ✅ HTML5 semántico y estructura limpia
- ✅ Bootstrap responsive
- ✅ JavaScript/DOM manipulation

#### Módulo 4
- ✅ Arreglo de lugares con datos estructurados
- ✅ Funciones `buscarLugar()` y `calcularEstadisticas()`
- ✅ Uso de variables, condicionales, ciclos y funciones
- ✅ Cálculo de estadísticas (mín, máx, promedio)
- ✅ Conteo de días por tipo de clima
- ✅ Resumen textual generado con condicionales

### 🐛 Correcciones
- Altura uniforme de tarjetas en grid principal
- Altura uniforme de tarjetas de Torres del Paine
- Prevención de desbordes de contenido
- Corrección de estilos inline movidos a CSS

---

## [Módulo 3] - 2025

### Funcionalidades Iniciales
- Integración con Open-Meteo API
- Dashboard de estadísticas con Chart.js
- Sistema de alertas meteorológicas
- Mapas interactivos con Leaflet
- Diseño responsive con Bootstrap 4
- Metodología BEM y SASS

