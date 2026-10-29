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
  desbloquearParada('stop1');
  mostrarPantalla('stop1');
});

// Botones "Continuar" de cada parada
document.querySelectorAll('.next-stop').forEach(boton => {
  boton.addEventListener('click', () => {
    const destino = boton.dataset.next;
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
  boton.addEventListener('click', () => irA(boton.dataset.target));
});

// Cierre del recorrido
document.getElementById('finishBtn').addEventListener('click', () => {
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
