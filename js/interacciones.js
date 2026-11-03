/* ============================================================
   INTERACCIONES DE LAS PARADAS
   ------------------------------------------------------------
   Reúne las interacciones de las paradas 1 y 3:
   - Nota desplegable "El territorio como relación"
   - Hotspots de la Parada 1 (agua, plaza, historias, ruta)
   - Ventana de historias (Rosa y Marcela) con foco accesible
   - Explicación del "tejido" (overlay en el inicio)
   - Actores y preguntas a la comunidad (Parada 3)
   - Conexiones del ejercicio guiado (Parada 3)
   ============================================================ */

/* ---------- Overlay "¿Por qué hablamos de un tejido?" ---------- */
const tejidoOverlay = document.getElementById('weaveOverlay');
const tejidoAbrir = document.getElementById('weaveOpen');
const tejidoCerrar = document.getElementById('weaveClose');
let tejidoFocoPrevio = null;

function abrirTejido() {
  tejidoFocoPrevio = document.activeElement;
  tejidoOverlay.classList.remove('hidden');
  tejidoOverlay.setAttribute('aria-hidden', 'false');
  document.getElementById('weaveDialog').focus();
}
function cerrarTejido() {
  tejidoOverlay.classList.add('hidden');
  tejidoOverlay.setAttribute('aria-hidden', 'true');
  if (tejidoFocoPrevio) tejidoFocoPrevio.focus();
}

tejidoAbrir.addEventListener('click', abrirTejido);
tejidoCerrar.addEventListener('click', cerrarTejido);
tejidoOverlay.addEventListener('click', evento => {
  if (evento.target === tejidoOverlay) cerrarTejido();
});
// Atrapar el foco dentro del diálogo mientras está abierto (accesibilidad)
tejidoOverlay.addEventListener('keydown', evento => {
  if (evento.key === 'Escape') { evento.preventDefault(); cerrarTejido(); }
  if (evento.key === 'Tab') {
    const enfocables = [...tejidoOverlay.querySelectorAll(
      'button:not([disabled]),[href],input:not([disabled]),[tabindex]:not([tabindex="-1"])'
    )].filter(el => el.offsetParent !== null);
    if (!enfocables.length) return;
    const primero = enfocables[0];
    const ultimo = enfocables[enfocables.length - 1];
    if (evento.shiftKey && document.activeElement === primero) { evento.preventDefault(); ultimo.focus(); }
    else if (!evento.shiftKey && document.activeElement === ultimo) { evento.preventDefault(); primero.focus(); }
  }
});

/* ---------- Hotspots de la Parada 1 ---------- */
const fotosHotspot = {
  water: 'https://images.pexels.com/photos/35017681/pexels-photo-35017681.jpeg?auto=compress&cs=tinysrgb&w=1280',
  market: 'img/Marcela.jpg',
  stories: 'img/Rosa.jpg'
};

document.querySelectorAll('.hotspot').forEach(boton => {
  boton.addEventListener('click', () => {
    const escena = document.querySelector('#stop1 .scene');
    const yaEstabaActivo = boton.classList.contains('selected');

    // Reiniciar estado de todos los hotspots y paneles de detalle
    document.querySelectorAll('.hotspot').forEach(item => item.classList.remove('selected'));
    document.querySelectorAll('#stop1 .detail').forEach(item => item.classList.add('hidden'));
    escena.classList.remove('has-photo', 'water-photo', 'market-photo', 'stories-photo');
    escena.style.removeProperty('--scene-photo');
    escena.style.removeProperty('background-image');
    escena.style.removeProperty('background-size');
    escena.style.removeProperty('background-position');
    escena.style.removeProperty('background-repeat');

    // Si estaba activo, solo lo cerramos
    if (yaEstabaActivo) return;

    // Activar el hotspot y mostrar su detalle
    boton.classList.add('selected');
    document.getElementById('detail-' + boton.dataset.detail).classList.remove('hidden');

    // Cambiar la foto de fondo de la escena según el hotspot
    const foto = fotosHotspot[boton.dataset.detail] || null;
    if (foto) {
      escena.classList.add('has-photo');
      if (boton.dataset.detail === 'market' || boton.dataset.detail === 'stories') {
        const opacidad = '.62';
        escena.style.backgroundImage =
          `linear-gradient(rgba(255, 253, 247, ${opacidad}), rgba(255, 253, 247, ${opacidad})), url("${foto}")`;
        escena.style.backgroundSize = '100% 100%, cover';
        escena.style.backgroundPosition = 'center';
        escena.style.backgroundRepeat = 'no-repeat';
      } else {
        escena.style.setProperty('--scene-photo', `url("${foto}")`);
      }
      if (boton.dataset.detail === 'water') escena.classList.add('water-photo');
      if (boton.dataset.detail === 'market') escena.classList.add('market-photo');
      if (boton.dataset.detail === 'stories') escena.classList.add('stories-photo');
    }
  });
});

/* ---------- Ventana de historias (Rosa y Marcela) ---------- */
const historiasVista = document.getElementById('detail-stories');
const historiasCerrar = document.getElementById('storiesClose');
let historiasFocoPrevio = null;

function cerrarHistorias() {
  historiasVista.classList.add('hidden');
  historiasVista.removeAttribute('role');
  historiasVista.removeAttribute('aria-modal');
  if (historiasFocoPrevio) historiasFocoPrevio.focus();
}

historiasCerrar.addEventListener('click', cerrarHistorias);
historiasVista.addEventListener('keydown', evento => {
  if (evento.key === 'Escape') { evento.preventDefault(); cerrarHistorias(); }
  if (evento.key === 'Tab' && evento.shiftKey && document.activeElement === historiasCerrar) {
    evento.preventDefault();
    historiasCerrar.focus();
  }
});

/* ---------- Actores y preguntas a la comunidad (Parada 3) ---------- */
document.querySelectorAll('.actor').forEach(boton => {
  boton.addEventListener('click', () => boton.classList.toggle('chosen'));
});
document.querySelectorAll('.community-q').forEach(boton => {
  boton.addEventListener('click', () => boton.classList.toggle('active'));
});

/* ---------- Definiciones de herramientas territoriales (Parada 2) ---------- */
const herramientasTerritoriales = {
  context: {
    name: 'Lectura de contexto',
    definition: 'Proceso de reunir, contrastar e interpretar información sobre la historia, la población, las condiciones de vida, la salud, el ambiente, los actores y los recursos de un territorio. Al poner en diálogo datos y saberes de quienes lo habitan, ayuda a comprender cómo se configuran las situaciones, reconocer necesidades y capacidades, y orientar respuestas pertinentes.',
    source: 'Ministerio de Salud y Protección Social de Colombia · Análisis de Situación de Salud (ASIS)',
    url: 'https://www.minsalud.gov.co/salud/epidemiologia-demografia/Paginas/analisis-de-situacion-de-salud.aspx'
  },
  mapping: {
    name: 'Cartografía social y participativa',
    definition: 'Metodología colectiva en la que las personas representan y conversan sobre su territorio mediante mapas, símbolos y relatos. Permite reconocer lugares significativos, usos y ocupaciones, relaciones, recursos, saberes y situaciones desde la experiencia de la comunidad; el mapa expresa una lectura situada, no solo límites geográficos.',
    source: 'Cartografía social participativa como metodología de investigación territorial · Perspectiva Geográfica (2023)',
    url: 'https://www.redalyc.org/journal/7718/771882251005/html/'
  },
  walks: {
    name: 'Recorridos territoriales',
    definition: 'Caminatas realizadas junto con habitantes para observar el territorio en sus espacios cotidianos. Durante el recorrido se reconocen usos, condiciones, recursos, barreras y relaciones del lugar; las observaciones, conversaciones y registros se ponen en común para construir una comprensión contextualizada.',
    source: 'Cartografía social participativa como metodología de investigación territorial · Perspectiva Geográfica (2023)',
    url: 'https://www.redalyc.org/journal/7718/771882251005/html/'
  },
  'body-map': {
    name: 'Cuerpo-mapa',
    definition: 'Ejercicio participativo de cartografía corporal en el que se dibuja y representa el cuerpo como un territorio vivido. A través de imágenes, símbolos y relatos, las personas pueden expresar memorias, experiencias, cuidados y relaciones entre cuerpo y entorno. Su realización debe ser voluntaria y respetar la intimidad y los tiempos de cada participante.',
    source: 'Colectivo Miradas Críticas del Territorio desde el Feminismo · Mapeando el cuerpo-territorio: guía metodológica (2017)',
    url: 'https://www.accionecologica.org/mapeando-el-cuerpo-territorio-guia-metodologica-para-mujeres-que-defienden-sus-territorios/'
  }
};
const overlayHerramienta = document.getElementById('toolOverlay');
const dialogoHerramienta = document.getElementById('toolDialog');
let focoPrevioHerramienta = null;

function cerrarHerramienta() {
  overlayHerramienta.classList.add('hidden');
  if (focoPrevioHerramienta) focoPrevioHerramienta.focus();
}

document.querySelectorAll('[data-territory-tool]').forEach(boton => {
  boton.addEventListener('click', () => {
    const herramienta = herramientasTerritoriales[boton.dataset.territoryTool];
    if (!herramienta) return;
    focoPrevioHerramienta = boton;
    document.getElementById('toolTitle').textContent = herramienta.name;
    document.getElementById('toolDefinition').textContent = herramienta.definition;
    const fuente = document.getElementById('toolSource');
    fuente.textContent = herramienta.source;
    fuente.href = herramienta.url;
    overlayHerramienta.classList.remove('hidden');
    dialogoHerramienta.focus();
  });
});

document.getElementById('toolClose').addEventListener('click', cerrarHerramienta);
overlayHerramienta.addEventListener('click', evento => {
  if (evento.target === overlayHerramienta) cerrarHerramienta();
});
overlayHerramienta.addEventListener('keydown', evento => {
  if (evento.key === 'Escape') {
    evento.preventDefault();
    cerrarHerramienta();
    return;
  }
  if (evento.key !== 'Tab') return;
  const enfocables = [...overlayHerramienta.querySelectorAll('button:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])')]
    .filter(elemento => elemento.offsetParent !== null);
  if (!enfocables.length) return;
  const primero = enfocables[0];
  const ultimo = enfocables[enfocables.length - 1];
  if (evento.shiftKey && document.activeElement === primero) {
    evento.preventDefault();
    ultimo.focus();
  } else if (!evento.shiftKey && document.activeElement === ultimo) {
    evento.preventDefault();
    primero.focus();
  }
});

/* ---------- Conexiones del ejercicio guiado (Parada 3) ---------- */
const textosConexion = {
  'c-cb': 'Alrededor de saberes comunitarios, participación, prácticas de cuidado, organización y acciones colectivas relacionadas con la situación.',
  'c-aps': 'Frente a situaciones de salud identificadas en personas y familias relacionadas con esa realidad.',
  'c-inst': 'Cuando la situación requiere una respuesta que corresponde a sus competencias.',
  'aps-cb': 'Cuando, frente a la misma realidad, existen aportes diferentes que pueden relacionarse sin que una estrategia sustituya las funciones de la otra.',
  'cb-others': 'Cuando la lectura de la realidad muestra condiciones que requieren acciones colectivas o la participación de otros sectores.'
};
const overlayConexion = document.getElementById('connectionOverlay');
const dialogoConexion = document.getElementById('connectionDialog');
let focoPrevioConexion = null;

function cerrarConexion() {
  overlayConexion.classList.add('hidden');
  if (focoPrevioConexion) focoPrevioConexion.focus();
}

document.querySelectorAll('.connect-btn').forEach(boton => {
  boton.addEventListener('click', () => {
    boton.classList.toggle('active');
    boton.setAttribute('aria-pressed', String(boton.classList.contains('active')));
    focoPrevioConexion = boton;
    document.getElementById('connectionTitle').textContent = boton.textContent.trim();
    document.getElementById('connectionDefinition').textContent = textosConexion[boton.dataset.connection];
    overlayConexion.classList.remove('hidden');
    dialogoConexion.focus();
  });
});

document.getElementById('connectionClose').addEventListener('click', cerrarConexion);
overlayConexion.addEventListener('click', evento => {
  if (evento.target === overlayConexion) cerrarConexion();
});
overlayConexion.addEventListener('keydown', evento => {
  if (evento.key === 'Escape') {
    evento.preventDefault();
    cerrarConexion();
    return;
  }
  if (evento.key !== 'Tab') return;
  const enfocables = [...overlayConexion.querySelectorAll('button:not([disabled]),[href],input:not([disabled]),[tabindex]:not([tabindex="-1"])')]
    .filter(elemento => elemento.offsetParent !== null);
  if (!enfocables.length) return;
  const primero = enfocables[0];
  const ultimo = enfocables[enfocables.length - 1];
  if (evento.shiftKey && document.activeElement === primero) {
    evento.preventDefault();
    ultimo.focus();
  } else if (!evento.shiftKey && document.activeElement === ultimo) {
    evento.preventDefault();
    primero.focus();
  }
});
