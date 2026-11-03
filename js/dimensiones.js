/* ============================================================
   DIMENSIONES DEL TERRITORIO (Parada 2)
   ------------------------------------------------------------
   Contiene:
   - Los datos pedagógicos de las 5 dimensiones y sus preguntas.
   - La ventana (modal) para explorar cada dimensión.
   - El seguimiento del progreso (exploradas, respondidas, aciertos).
   - El resumen final "Tejiendo las dimensiones".
   ============================================================ */

/* ---------- Datos de las 5 dimensiones ---------- */
const datosDimensiones = [
  {
    name: 'SOCIAL',
    definition: 'Comprende a las personas, familias y comunidades, así como los vínculos, redes de apoyo, formas de organización y relaciones que construyen en su vida cotidiana.',
    examples: ['Familias y redes de apoyo', 'Relaciones y organización comunitaria', 'Acceso y vínculos con servicios'],
    questions: [
      {
        q: '¿Qué elementos sociales ayudan a comprender cómo transcurre la vida en un territorio?',
        multi: true,
        options: ['Familias y redes de apoyo', 'Relaciones y organización comunitaria', 'Únicamente la ubicación geográfica', 'Acceso y vínculos con servicios'],
        correct: [0, 1, 3],
        explain: 'Las relaciones, redes, familias y vínculos con servicios muestran cómo transcurre la vida social.'
      },
      {
        q: 'Compartir un territorio significa que todas las personas viven en las mismas condiciones.',
        options: ['Verdadero', 'Falso'],
        correct: [1],
        explain: 'Las personas pueden tener diferentes posibilidades de acceso, apoyos, responsabilidades y experiencias dentro de un mismo territorio.'
      }
    ]
  },
  {
    name: 'CULTURAL',
    definition: 'Reúne las identidades, historias, memorias, saberes, prácticas y costumbres mediante las cuales las comunidades significan el territorio y construyen formas propias de vivir y cuidar.',
    examples: ['Saberes y prácticas de cuidado', 'Memoria y significados del territorio', 'Diálogo entre generaciones'],
    questions: [
      {
        q: '¿Qué permite reconocer la dimensión cultural?',
        multi: true,
        options: ['Saberes y prácticas de cuidado', 'Memoria y significados del territorio', 'Solamente ingresos económicos', 'Diálogo entre generaciones'],
        correct: [0, 1, 3],
        explain: 'La dimensión cultural incluye saberes, prácticas, memoria y diálogo entre generaciones.'
      },
      {
        q: '¿Por qué es importante escuchar los saberes de la comunidad?',
        options: ['Porque ayudan a interpretar la realidad y reconocer prácticas, experiencias y capacidades presentes en el territorio', 'Porque reemplazan automáticamente todos los demás conocimientos'],
        correct: [0],
        explain: 'La lectura del territorio se construye poniendo en diálogo diferentes conocimientos y experiencias.'
      }
    ]
  },
  {
    name: 'ECONÓMICA',
    definition: 'Se relaciona con las formas de trabajo y producción, los ingresos, los intercambios, los mercados y los medios mediante los cuales las personas y familias sostienen su vida.',
    examples: ['Trabajo y producción', 'Ingresos y comercialización', 'Alimentación y acceso a bienes', 'Condiciones laborales y responsabilidades de cuidado'],
    questions: [
      {
        q: '¿Qué relaciones económicas pueden influir en las condiciones de vida y salud?',
        multi: true,
        options: ['Trabajo y producción', 'Ingresos y comercialización', 'Alimentación y acceso a bienes', 'Solamente las decisiones individuales'],
        correct: [0, 1, 2],
        explain: 'El trabajo, los ingresos, la comercialización y el acceso a bienes participan en las condiciones de vida.'
      },
      {
        q: 'Rosa y Marcela usan la misma plaza de mercado. ¿Qué ayuda a explicar que la vivan de manera diferente?',
        multi: true,
        options: ['Sus condiciones de trabajo, ingresos y responsabilidades de cuidado', 'Únicamente sus preferencias personales', 'Las redes y apoyos con los que cuentan'],
        correct: [0, 2],
        explain: 'Sus condiciones de trabajo, ingresos, cuidados y redes de apoyo configuran experiencias distintas.'
      }
    ]
  },
  {
    name: 'AMBIENTAL',
    definition: 'Comprende las relaciones con el agua, el suelo, la biodiversidad y otros elementos de la naturaleza, así como las condiciones ambientales que favorecen o afectan la vida en el territorio.',
    examples: ['Agua, suelo y biodiversidad', 'Entorno y vivienda', 'Disponibilidad y cuidado de recursos'],
    questions: [
      {
        q: '¿Qué elementos ambientales se relacionan con las condiciones de vida?',
        multi: true,
        options: ['Agua, suelo y biodiversidad', 'Entorno y vivienda', 'Únicamente el paisaje', 'Disponibilidad y cuidado de recursos'],
        correct: [0, 1, 3],
        explain: 'El ambiente comprende recursos, biodiversidad, entorno y condiciones de vivienda.'
      },
      {
        q: '¿Por qué una fuente de agua puede analizarse desde varias dimensiones?',
        options: ['Porque se relaciona con ambiente, producción, alimentación, organización comunitaria, prácticas culturales e instituciones', 'Porque solo pertenece a la dimensión ambiental'],
        correct: [0],
        explain: 'Una situación territorial puede conectar dimensiones diferentes que se transforman entre sí.'
      }
    ]
  },
  {
    name: 'POLÍTICO-INSTITUCIONAL',
    definition: 'Comprende las relaciones entre comunidades, organizaciones e instituciones; la presencia y actuación del Estado; los servicios y las políticas públicas; los liderazgos y los espacios de participación y toma de decisiones.',
    examples: ['Instituciones, servicios y decisiones públicas', 'Políticas y responsabilidades de los actores', 'Participación y articulación'],
    questions: [
      {
        q: '¿Qué incluye esta dimensión?',
        multi: true,
        options: ['Instituciones, servicios y decisiones públicas', 'Políticas y responsabilidades de los actores', 'Solamente edificios institucionales', 'Participación y articulación'],
        correct: [0, 1, 3],
        explain: 'Incluye instituciones y servicios, además de decisiones, responsabilidades y participación.'
      },
      {
        q: '¿Qué significa articular frente a una realidad territorial?',
        options: ['Que todos hagan lo mismo', 'Reconocer qué corresponde a cada actor y dónde pueden encontrarse sus aportes', 'Que una estrategia sustituya las funciones de otra'],
        correct: [1],
        explain: 'Articular es complementar responsabilidades, saberes y capacidades frente a una realidad compartida.'
      }
    ]
  }
];

const ordenDimensiones = ['AMBIENTAL', 'ECONÓMICA', 'SOCIAL', 'CULTURAL', 'POLÍTICO-INSTITUCIONAL'];
datosDimensiones.sort((a, b) => ordenDimensiones.indexOf(a.name) - ordenDimensiones.indexOf(b.name));

/* ---------- Estado del progreso ---------- */
const exploradas = new Set();     // dimensiones abiertas
const respondidas = new Set();    // preguntas respondidas (clave "dim-preg")
const aciertos = new Set();       // preguntas correctas
const respuestasSeleccionadas = new Map();
const totalPreguntas = datosDimensiones.reduce((total, dimension) => total + dimension.questions.length, 0);
let dimensionActiva = 0;
let focoPrevioDimension = null;

/* ---------- Referencias del DOM ---------- */
const overlayDimension = document.getElementById('dimensionOverlay');
const contenedorPreguntas = document.getElementById('dimensionQuestions');
const overlayConcepto = document.getElementById('conceptOverlay');
const dialogoConcepto = document.getElementById('conceptDialog');
let focoPrevioConcepto = null;

function cerrarConcepto() {
  overlayConcepto.classList.add('hidden');
  if (focoPrevioConcepto) focoPrevioConcepto.focus();
}

document.querySelectorAll('[data-dimension-concept]').forEach(boton => {
  boton.addEventListener('click', () => {
    const dimension = datosDimensiones.find(item => item.name === boton.dataset.dimensionConcept);
    if (!dimension) return;
    focoPrevioConcepto = boton;
    document.getElementById('conceptTitle').textContent = `Dimensión ${dimension.name.toLowerCase()}`;
    document.getElementById('conceptDefinition').textContent = dimension.definition;
    overlayConcepto.classList.remove('hidden');
    dialogoConcepto.focus();
  });
});

document.getElementById('conceptClose').addEventListener('click', cerrarConcepto);
overlayConcepto.addEventListener('click', evento => {
  if (evento.target === overlayConcepto) cerrarConcepto();
});
overlayConcepto.addEventListener('keydown', evento => {
  if (evento.key === 'Escape') {
    evento.preventDefault();
    cerrarConcepto();
  }
});

/* ---------- Progreso visible ---------- */
function pintarProgreso() {
  document.getElementById('dimensionProgress').textContent =
    `Dimensiones exploradas: ${exploradas.size} de ${datosDimensiones.length} · Preguntas respondidas: ${respondidas.size} de ${totalPreguntas} · Aciertos: ${aciertos.size}`;

  document.querySelectorAll('.dim').forEach((el, i) => {
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', `${datosDimensiones[i].name}${exploradas.has(i) ? ' · explorada' : ''}`);
    if (exploradas.has(i)) el.setAttribute('data-explored', 'true');
  });
}

/* ---------- Dibujar el contenido de una dimensión en el modal ---------- */
function renderizarDimension(i) {
  dimensionActiva = i;
  const d = datosDimensiones[i];

  document.getElementById('dimensionCount').textContent = `Dimensión ${i + 1} de ${datosDimensiones.length} · Mapetto te acompaña`;
  document.getElementById('dimensionTitle').textContent = d.name;
  document.getElementById('dimensionDefinition').textContent = d.definition;
  document.getElementById('dimensionExamples').innerHTML = d.examples.map(x => `<li>${x}</li>`).join('');

  // Construir las preguntas (radio para una sola respuesta, checkbox para varias)
  contenedorPreguntas.innerHTML = d.questions.map((q, j) => `
    <div class="question-box">
      <fieldset>
        <legend>${j + 1}. ${q.q}</legend>
        ${q.options.map((o, k) => `
          <label>
            <input type="${q.multi ? 'checkbox' : 'radio'}" name="dim${i}q${j}" value="${k}" ${respuestasSeleccionadas.get(`${i}-${j}`)?.includes(k) ? 'checked' : ''}> ${o}
          </label>`).join('')}
      </fieldset>
      <p id="fb${i}${j}" class="feedback" aria-live="polite"></p>
    </div>`).join('');

  d.questions.forEach((q, j) => {
    const clave = `${i}-${j}`;
    const feedback = document.getElementById(`fb${i}${j}`);
    if (respondidas.has(clave)) {
      const correcta = aciertos.has(clave);
      feedback.textContent = correcta
        ? `Correcta. ${q.explain}`
        : `Revisa tu respuesta. ${q.explain}`;
      feedback.style.color = correcta ? '#28613c' : '#873a2a';
    }
  });

  const preguntasRespondidasDimension = d.questions.filter((_, j) => respondidas.has(`${i}-${j}`)).length;
  document.getElementById('modalFeedback').textContent = preguntasRespondidasDimension
    ? `GEA: Has respondido ${preguntasRespondidasDimension} de ${d.questions.length} preguntas de esta dimensión.`
    : 'GEA: Observa cómo estas relaciones se entrelazan en la vida cotidiana.';
  document.getElementById('previousDimension').disabled = i === 0;
  document.getElementById('nextDimension').disabled = false;
  document.getElementById('nextDimension').textContent = i === datosDimensiones.length - 1 ? 'Cerrar dimensión' : 'Siguiente →';
  pintarProgreso();
}

/* ---------- Abrir / cerrar el modal de dimensión ---------- */
function abrirDimension(i, origen) {
  focoPrevioDimension = origen;
  renderizarDimension(i);
  overlayDimension.classList.remove('hidden');
  document.getElementById('dimensionModal').focus();
}

function mostrarResumenFinal() {
  document.getElementById('finalSummaries').innerHTML = datosDimensiones
    .map(d => `<div class="dimension-summary"><strong>${d.name}</strong> · ${d.definition}</div>`)
    .join('');
  document.getElementById('finalScore').textContent =
    `Completaste las ${totalPreguntas} preguntas y obtuviste ${aciertos.size} respuestas correctas.`;
  overlayDimension.classList.add('hidden');
  document.getElementById('finalOverlay').classList.remove('hidden');
  document.querySelector('#finalOverlay [role="dialog"]').focus();
}

function cerrarDimension() {
  overlayDimension.classList.add('hidden');
  exploradas.add(dimensionActiva);
  pintarProgreso();
  if (focoPrevioDimension) {
    focoPrevioDimension.focus();
  }
}

/* ---------- Conexión de eventos de las tarjetas de dimensión ---------- */
document.querySelectorAll('.dim').forEach((el, i) => {
  el.addEventListener('click', () => abrirDimension(i, el));
  el.addEventListener('keydown', evento => {
    if (evento.key === 'Enter' || evento.key === ' ') {
      evento.preventDefault();
      abrirDimension(i, el);
    }
  });
});

document.getElementById('modalClose').addEventListener('click', cerrarDimension);
overlayDimension.addEventListener('click', evento => {
  if (evento.target === overlayDimension) cerrarDimension();
});
document.addEventListener('keydown', evento => {
  if (evento.key !== 'Escape') return;
  if (!overlayDimension.classList.contains('hidden')) cerrarDimension();
  else if (!document.getElementById('finalOverlay').classList.contains('hidden')) {
    cerrarResumenFinal();
  }
});

/* ---------- Navegación entre dimensiones dentro del modal ---------- */
document.getElementById('previousDimension').addEventListener('click', () => {
  renderizarDimension(Math.max(0, dimensionActiva - 1));
});
document.getElementById('nextDimension').addEventListener('click', () => {
  if (dimensionActiva < datosDimensiones.length - 1) renderizarDimension(dimensionActiva + 1);
  else cerrarDimension();
});

/* ---------- Verificación de respuestas ---------- */
document.getElementById('checkAnswers').addEventListener('click', () => {
  const d = datosDimensiones[dimensionActiva];
  let todasCorrectas = true;
  let todasRespondidas = true;

  d.questions.forEach((q, j) => {
    const seleccionadas = [...contenedorPreguntas.querySelectorAll(`input[name="dim${dimensionActiva}q${j}"]:checked`)]
      .map(x => Number(x.value));
    const clave = `${dimensionActiva}-${j}`;
    const correcto = seleccionadas.length === q.correct.length && q.correct.every(x => seleccionadas.includes(x));
    const feedback = document.getElementById(`fb${dimensionActiva}${j}`);

    if (seleccionadas.length) {
      respuestasSeleccionadas.set(clave, seleccionadas);
      respondidas.add(clave);
      if (correcto) aciertos.add(clave);
      else aciertos.delete(clave);
    } else {
      respuestasSeleccionadas.delete(clave);
      respondidas.delete(clave);
      aciertos.delete(clave);
      todasRespondidas = false;
    }
    if (!correcto) todasCorrectas = false;

    feedback.textContent = correcto
      ? `Correcta. ${q.explain}`
      : seleccionadas.length
        ? `Revisa tu respuesta. ${q.explain}`
        : 'Puedes intentarlo nuevamente. Selecciona una respuesta.';
    feedback.style.color = correcto ? '#28613c' : '#873a2a';
  });

  document.getElementById('modalFeedback').textContent = todasCorrectas
    ? 'GEA: ¡Muy bien! Cada dimensión aporta una mirada que se relaciona con las demás.'
    : todasRespondidas
      ? 'GEA: Revisa las respuestas y vuelve a intentarlo; comprender también es relacionar.'
      : 'GEA: Responde todas las preguntas de esta dimensión para continuar.';

  pintarProgreso();
  if (respondidas.size === totalPreguntas) {
    exploradas.add(dimensionActiva);
    pintarProgreso();
    mostrarResumenFinal();
  }
});

contenedorPreguntas.addEventListener('change', evento => {
  if (!(evento.target instanceof HTMLInputElement)) return;
  const identificadores = evento.target.name.match(/^dim(\d+)q(\d+)$/);
  if (!identificadores) return;
  const [, indiceDimension, indicePregunta] = identificadores;
  const clave = `${indiceDimension}-${indicePregunta}`;
  const seleccionadas = [...contenedorPreguntas.querySelectorAll(`input[name="${evento.target.name}"]:checked`)]
    .map(input => Number(input.value));
  if (seleccionadas.length) respuestasSeleccionadas.set(clave, seleccionadas);
  else respuestasSeleccionadas.delete(clave);

  if (respondidas.delete(clave)) {
    aciertos.delete(clave);
    const feedback = document.getElementById(`fb${indiceDimension}${indicePregunta}`);
    if (feedback) feedback.textContent = '';
    document.getElementById('modalFeedback').textContent =
      'GEA: Tu respuesta cambió. Vuelve a verificarla para actualizar el progreso.';
    pintarProgreso();
  }
});

/* ---------- Acciones del resumen final ---------- */
function cerrarResumenFinal() {
  document.getElementById('finalOverlay').classList.add('hidden');
  document.getElementById('dimensionProgress').focus();
}

document.getElementById('finalClose').addEventListener('click', cerrarResumenFinal);
document.getElementById('returnJourney').addEventListener('click', () => {
  document.getElementById('finalOverlay').classList.add('hidden');
  window.recorrido.desbloquearParada('stop3');
  window.recorrido.mostrarPantalla('stop3');
});
document.getElementById('reviewDimensions').addEventListener('click', () => {
  document.getElementById('finalOverlay').classList.add('hidden');
  window.recorrido.mostrarPantalla('stop2');
  abrirDimension(0, document.getElementById('dimensionProgress'));
});

// Pintar el progreso inicial al cargar
pintarProgreso();
