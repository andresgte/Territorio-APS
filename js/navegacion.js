/* ============================================================
   NAVEGACIÓN DEL RECORRIDO
   ------------------------------------------------------------
   Controla el paso entre pantallas (inicio, paradas y cierre),
   el desbloqueo progresivo de las paradas y la barra de progreso.
   ============================================================ */

// Paradas que el usuario ya desbloqueó
const paradasVisitadas = new Set();

const pantallas = document.querySelectorAll('.screen');
const barraProgreso = document.getElementById('progressFill');

/**
 * Muestra la pantalla indicada y actualiza el estado de la navegación.
 * @param {string} id - id de la sección a mostrar.
 */
function mostrarPantalla(id) {
  pantallas.forEach(pantalla => pantalla.classList.toggle('active', pantalla.id === id));
  document.querySelectorAll('.route-btn').forEach(boton => {
    boton.classList.toggle('active', boton.dataset.target === id);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cantidadRevisada(selector) {
  return document.querySelectorAll(`${selector}[data-reviewed="true"]`).length;
}

function validarRequisito(pantalla) {
  const progresoPreguntas = window.recorrido && window.recorrido.obtenerProgresoPreguntas
    ? window.recorrido.obtenerProgresoPreguntas()
    : { respondidas: 0, total: 0 };
  const requisitos = {
    home: {
      valido: cantidadRevisada('[data-dimension-concept]') === 5,
      mensaje: `Antes de comenzar, revisa las cinco dimensiones del inicio. Revisadas: ${cantidadRevisada('[data-dimension-concept]')} de 5.`,
      feedback: 'homeValidation'
    },
    stop1: {
      valido: cantidadRevisada('.hotspot') === 4,
      mensaje: `Antes de continuar, explora los cuatro lugares del territorio. Explorados: ${cantidadRevisada('.hotspot')} de 4.`,
      feedback: 'stop1Validation'
    },
    stop2: {
      valido: progresoPreguntas.total > 0 && progresoPreguntas.respondidas === progresoPreguntas.total
        || cantidadRevisada('[data-territory-tool]') === 4,
      mensaje: `Para continuar, responde las ${progresoPreguntas.total} preguntas de las tarjetas o revisa los cuatro modales de herramientas. Respondidas: ${progresoPreguntas.respondidas} de ${progresoPreguntas.total}; herramientas revisadas: ${cantidadRevisada('[data-territory-tool]')} de 4.`,
      feedback: 'stop2Validation'
    },
    stop3: {
      valido: cantidadRevisada('.connect-btn') === 5,
      mensaje: `Antes de cerrar el recorrido, revisa las cinco conexiones entre actores. Revisadas: ${cantidadRevisada('.connect-btn')} de 5.`,
      feedback: 'stop3Validation'
    }
  };
  const requisito = requisitos[pantalla];
  if (!requisito || requisito.valido) {
    if (requisito) {
      const feedback = document.getElementById(requisito.feedback);
      feedback.hidden = true;
      feedback.textContent = '';
    }
    return true;
  }
  const feedback = document.getElementById(requisito.feedback);
  feedback.textContent = requisito.mensaje;
  feedback.hidden = false;
  feedback.focus();
  return false;
}

function validarDestino(destino) {
  const requisitosPrevios = {
    stop1: ['home'],
    stop2: ['home', 'stop1'],
    stop3: ['home', 'stop1', 'stop2']
  };
  const requisitos = requisitosPrevios[destino] || [];
  for (const pantalla of requisitos) {
    if (!validarRequisito(pantalla)) {
      mostrarPantalla(pantalla);
      document.getElementById({
        home: 'homeValidation',
        stop1: 'stop1Validation',
        stop2: 'stop2Validation'
      }[pantalla]).focus();
      return false;
    }
  }
  return true;
}

/**
 * Desbloquea una parada, actualiza la barra de progreso y el menú.
 * @param {string} parada - 'stop1', 'stop2' o 'stop3'.
 */
function desbloquearParada(parada) {
  paradasVisitadas.add(parada);
  const orden = { stop1: 1, stop2: 2, stop3: 3 };
  const numero = orden[parada] || 0;
  barraProgreso.style.width = (numero * 33.33) + '%';
  const botonMenu = document.getElementById('nav-' + numero);
  if (botonMenu) botonMenu.classList.remove('locked');
}

/**
 * Navega a una parada solo si está desbloqueada (o es el inicio).
 * @param {string} parada
 */
function irA(parada) {
  if (parada === 'home' || paradasVisitadas.has(parada)) mostrarPantalla(parada);
}

/* ---------- Conexión de botones ---------- */

// Botón "Comenzar recorrido"
document.getElementById('startBtn').addEventListener('click', () => {
  if (!validarDestino('stop1')) return;
  desbloquearParada('stop1');
  mostrarPantalla('stop1');
});

// Botones "Continuar" de cada parada
document.querySelectorAll('.next-stop').forEach(boton => {
  boton.addEventListener('click', () => {
    const destino = boton.dataset.next;
    if (!validarDestino(destino)) return;
    desbloquearParada(destino);
    mostrarPantalla(destino);
  });
});

// Botones "Volver a..." (regresan sin desbloquear nada nuevo)
document.querySelectorAll('.route-return').forEach(boton => {
  boton.addEventListener('click', () => mostrarPantalla(boton.dataset.return));
});

// Botones "Volver al inicio"
document.querySelectorAll('.back-home').forEach(boton => {
  boton.addEventListener('click', () => mostrarPantalla('home'));
});

// Menú superior de paradas
document.querySelectorAll('.route-btn').forEach(boton => {
  boton.addEventListener('click', () => {
    const destino = boton.dataset.target;
    if (destino !== 'home' && paradasVisitadas.has(destino) && !validarDestino(destino)) return;
    irA(destino);
  });
});

// Cierre del recorrido
document.getElementById('finishBtn').addEventListener('click', () => {
  if (!validarRequisito('stop3')) return;
  barraProgreso.style.width = '100%';
  mostrarPantalla('finish');
});

// Reiniciar y revisar desde el cierre
document.getElementById('restartBtn').addEventListener('click', () => mostrarPantalla('home'));
document.getElementById('reviewBtn').addEventListener('click', () => {
  desbloquearParada('stop1');
  desbloquearParada('stop2');
  desbloquearParada('stop3');
  mostrarPantalla('stop1');
});

// Se exponen funciones para que otros scripts puedan usarlas
window.recorrido = { mostrarPantalla, desbloquearParada };
