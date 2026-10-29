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
    icon: '👨‍👩‍👧‍👦 🤝',
    definition: 'Relaciones, familias, redes y organización que hacen parte de la vida cotidiana.',
    examples: ['Familias y redes de apoyo', 'Relaciones y organización comunitaria', 'Acceso y vínculos con servicios'],
    topic: 'Familias, redes de apoyo, cuidado y encuentro.',
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
    icon: '🧶 🗣️',
    definition: 'Saberes, prácticas, memoria y significados que las comunidades construyen y comparten.',
    examples: ['Saberes y prácticas de cuidado', 'Memoria y significados del territorio', 'Diálogo entre generaciones'],
    topic: 'Saberes locales, memoria y diálogo intergeneracional.',
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
    icon: '🌽 🧺',
    definition: 'Trabajo, producción, ingresos, comercialización y acceso a bienes que influyen en la vida cotidiana.',
    examples: ['Trabajo y producción', 'Ingresos y comercialización', 'Alimentación y acceso a bienes', 'Condiciones laborales y responsabilidades de cuidado'],
    topic: 'Trabajo, producción, alimentos e ingresos.',
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
    icon: '💧 🌱',
    definition: 'Relaciones con el agua, el suelo, la biodiversidad, la vivienda y el entorno.',
    examples: ['Agua, suelo y biodiversidad', 'Entorno y vivienda', 'Disponibilidad y cuidado de recursos'],
    topic: 'Agua, suelo, biodiversidad, cultivos y vivienda.',
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
    icon: '🏥 🏫',
    definition: 'Instituciones, servicios, decisiones públicas, responsabilidades y participación en el territorio.',
    examples: ['Instituciones, servicios y decisiones públicas', 'Políticas y responsabilidades de los actores', 'Participación y articulación'],
    topic: 'Servicios de salud y educación, instituciones y participación.',
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

/* ---------- Estado del progreso ---------- */
const exploradas = new Set();     // dimensiones abiertas
const respondidas = new Set();    // preguntas respondidas (clave "dim-preg")
const aciertos = new Set();       // preguntas correctas
let dimensionActiva = 0;
let videoPausado = false;
let focoPrevioDimension = null;

/* ---------- Referencias del DOM ---------- */
const overlayDimension = document.getElementById('dimensionOverlay');
const contenedorPreguntas = document.getElementById('dimensionQuestions');

/* ---------- Progreso visible ---------- */
function pintarProgreso() {
  document.getElementById('dimensionProgress').textContent =
    `Dimensiones exploradas: ${exploradas.size} de 5 · Preguntas respondidas: ${respondidas.size} de 10 · Aciertos: ${aciertos.size}`;

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

  document.getElementById('dimensionCount').textContent = `Dimensión ${i + 1} de 5 · Mapetto te acompaña`;
  document.getElementById('dimensionTitle').textContent = d.name;
  document.getElementById('dimensionIllustration').textContent = d.icon;
  document.getElementById('dimensionIllustration').setAttribute('aria-label', `Ilustración: ${d.name.toLowerCase()}, ${d.topic}`);
  document.getElementById('dimensionDefinition').textContent = d.definition;
  document.getElementById('dimensionExamples').innerHTML = d.examples.map(x => `<li>${x}</li>`).join('');
  document.getElementById('videoTopic').textContent = `Tema sugerido: ${d.topic}`;

  // Construir las preguntas (radio para una sola respuesta, checkbox para varias)
  contenedorPreguntas.innerHTML = d.questions.map((q, j) => `
    <div class="question-box">
      <fieldset>
        <legend>${j + 1}. ${q.q}</legend>
        ${q.options.map((o, k) => `
          <label>
            <input type="${q.multi ? 'checkbox' : 'radio'}" name="dim${i}q${j}" value="${k}"> ${o}
          </label>`).join('')}
      </fieldset>
      <p id="fb${i}${j}" class="feedback" aria-live="polite"></p>
    </div>`).join('');

  document.getElementById('modalFeedback').textContent = 'GEA: Observa cómo estas relaciones se entrelazan en la vida cotidiana.';
  document.getElementById('previousDimension').disabled = i === 0;
  document.getElementById('nextDimension').disabled = i === 4;
  document.getElementById('nextDimension').textContent = i === 4 ? 'Cerrar y finalizar' : 'Siguiente →';
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
  document.getElementById('finalOverlay').classList.remove('hidden');
  document.querySelector('#finalOverlay [role="dialog"]').focus();
}

function cerrarDimension() {
  overlayDimension.classList.add('hidden');
  exploradas.add(dimensionActiva);
  pintarProgreso();
  // Si ya se exploraron las 5 y se respondieron las 10, mostramos el resumen
  if (exploradas.size === 5 && respondidas.size === 10) {
    mostrarResumenFinal();
  } else if (focoPrevioDimension) {
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
  if (evento.key === 'Escape' && !overlayDimension.classList.contains('hidden')) cerrarDimension();
});

/* ---------- Navegación entre dimensiones dentro del modal ---------- */
document.getElementById('previousDimension').addEventListener('click', () => {
  renderizarDimension(Math.max(0, dimensionActiva - 1));
});
document.getElementById('nextDimension').addEventListener('click', () => {
  if (dimensionActiva < 4) renderizarDimension(dimensionActiva + 1);
  else cerrarDimension();
});

/* ---------- Verificación de respuestas ---------- */
document.getElementById('checkAnswers').addEventListener('click', () => {
  const d = datosDimensiones[dimensionActiva];
  let todasCorrectas = true;

  d.questions.forEach((q, j) => {
    const seleccionadas = [...contenedorPreguntas.querySelectorAll(`input[name="dim${dimensionActiva}q${j}"]:checked`)]
      .map(x => Number(x.value));
    const clave = `${dimensionActiva}-${j}`;
    const correcto = seleccionadas.length === q.correct.length && q.correct.every(x => seleccionadas.includes(x));
    const feedback = document.getElementById(`fb${dimensionActiva}${j}`);

    if (seleccionadas.length) {
      respondidas.add(clave);
      if (correcto) aciertos.add(clave);
      else aciertos.delete(clave);
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
    : 'GEA: Revisa las respuestas y vuelve a intentarlo; comprender también es relacionar.';

  pintarProgreso();
  if (respondidas.size === 10) mostrarResumenFinal();
});

/* ---------- Miniatura de video (pausar / reanudar simulado) ---------- */
document.getElementById('videoControl').addEventListener('click', evento => {
  videoPausado = !videoPausado;
  evento.currentTarget.setAttribute('aria-pressed', String(videoPausado));
  evento.currentTarget.querySelector('span').textContent = videoPausado ? '▶' : 'Ⅱ';
});

/* ---------- Acciones del resumen final ---------- */
document.getElementById('finalClose').addEventListener('click', () => {
  document.getElementById('finalOverlay').classList.add('hidden');
});
document.getElementById('returnJourney').addEventListener('click', () => {
  document.getElementById('finalOverlay').classList.add('hidden');
  window.recorrido.mostrarPantalla('stop2');
});
document.getElementById('reviewDimensions').addEventListener('click', () => {
  document.getElementById('finalOverlay').classList.add('hidden');
  window.recorrido.mostrarPantalla('stop2');
  abrirDimension(0, null);
});

// Pintar el progreso inicial al cargar
pintarProgreso();
