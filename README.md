# El territorio como escenario de articulación

Recorrido interactivo educativo: *Tejiendo el territorio como espacio de vida y encuentro*.

Material de apoyo para comprender el territorio como una construcción social,
dinámica y relacional, y su relación con los procesos de vida, salud, enfermedad
y cuidado, así como con la articulación entre comunidades, APS, Ciudad
Bienestar–PSPIC y otros actores territoriales.

## Cómo abrirlo

Abre el archivo **`index.html`** en cualquier navegador (Chrome, Edge, Firefox).
No necesita instalación ni servidor; solo requiere conexión a internet para
cargar las tipografías, los íconos y las imágenes.

## Estructura del proyecto

```
Terreno APS/
├── index.html          → Página principal (solo el contenido / estructura)
├── css/
│   └── estilos.css      → Todos los estilos, organizados por secciones
├── js/
│   ├── navegacion.js    → Paso entre pantallas, desbloqueo y barra de progreso
│   ├── interacciones.js → Hotspots, nota desplegable, actores, conexiones, tejido
│   ├── dimensiones.js   → Las 5 dimensiones + preguntas + resumen final
│   └── narracion.js     → Narración por voz de GEA y Mapetto
├── img/                 → Imágenes locales de Mapetto y GEA
├── contenido/           → Documento base de referencia
└── README.md            → Este archivo
```

Se separó cada responsabilidad en su propio archivo para que el proyecto sea
más fácil de leer, mantener y modificar (misma lógica que la página de cursos
virtuales).

## Recorrido

1. **Inicio** – Propósito, personajes guía (Mapetto y GEA) y explicación del
   "tejido" territorial.
2. **Parada 1 · Reconocer** – Hotspots: fuente de agua, plaza de mercado,
   historias de Rosa y Marcela, ruta rural–urbana.
3. **Parada 2 · Comprender y leer** – Las cinco dimensiones del territorio con
   guía y dos preguntas por dimensión; progreso y resumen final.
4. **Parada 3 · Articular** – Mapa de actores y ejercicio guiado de conexiones
   frente a una realidad del territorio.
5. **Cierre** – Síntesis del recorrido y mensaje de continuidad.

## Cómo editar

- **Textos y estructura:** `index.html`.
- **Colores, tamaños, espaciado:** `css/estilos.css` (las variables de color
  están al inicio, en `:root`).
- **Preguntas de las dimensiones:** arreglo `datosDimensiones` en
  `js/dimensiones.js`.
- **Mensajes de las conexiones (Parada 3):** objeto `textosConexion` en
  `js/interacciones.js`.
- **Imágenes de personajes:** están en `img/` y se usan en la bienvenida y en
  momentos clave de cada parada. Para cambiar una ilustración, actualiza su
  ruta `img/...` y su texto alternativo en `index.html`.
- **Imágenes de contexto:** algunas escenas y fotografías todavía se cargan
  desde Pexels; requieren conexión a internet.
