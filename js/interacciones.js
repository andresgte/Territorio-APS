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

/* ---------- Conexiones del ejercicio guiado (Parada 3) ---------- */
const textosConexion = {
  'c-cb': 'Comunidad ↔ Ciudad Bienestar–PSPIC: saberes comunitarios, participación, prácticas de cuidado, organización y acciones colectivas.',
  'c-aps': 'Comunidad ↔ EBS–APS: situaciones de salud de personas y familias relacionadas con esta realidad.',
  'c-inst': 'Comunidad ↔ institución o sector: respuesta desde las competencias responsables cuando la situación lo requiere.',
  'aps-cb': 'EBS–APS ↔ Ciudad Bienestar–PSPIC: aportes diferentes que se complementan sin sustituirse.',
  'cb-others': 'Ciudad Bienestar–PSPIC ↔ otros actores: acciones colectivas o intersectoriales ante condiciones identificadas.'
};
const mensajeConexion = document.getElementById('connectionMessage');
const mensajeConexionInicial = 'Activa conexiones pertinentes según la realidad territorial que se está comprendiendo.';

document.querySelectorAll('.connect-btn').forEach(boton => {
  boton.addEventListener('click', () => {
    boton.classList.toggle('active');
    const activas = [...document.querySelectorAll('.connect-btn.active')];
    mensajeConexion.textContent = activas.length
      ? activas.map(b => textosConexion[b.dataset.connection]).join(' ')
      : mensajeConexionInicial;
  });
});
mensajeConexion.textContent = mensajeConexionInicial;
