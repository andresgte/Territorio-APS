/* ============================================================
   NARRACIÓN POR VOZ (GEA y Mapetto)
   ------------------------------------------------------------
   Usa la API de síntesis de voz del navegador (SpeechSynthesis)
   para leer en voz alta los textos marcados con [data-speech].
   - GEA: voz más pausada y cálida.
   - Mapetto: voz más ágil.
   Añade controles de reinicio y volumen junto a cada botón.
   ============================================================ */

let narracionActual = null;
let volumenNarracion = 1;

/**
 * Lee en voz alta el texto del elemento indicado por su template-id.
 * @param {string} templateId
 */
function narrar(templateId) {
  const objetivo = document.querySelector('[data-template-id="' + templateId + '"]');
  if (!objetivo || !('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();
  const locucion = new SpeechSynthesisUtterance(objetivo.textContent.trim());

  // GEA habla en los textos de "gea-" y en las preguntas de las paradas
  const esGea = templateId.startsWith('gea-') || templateId.startsWith('stop');
  locucion.lang = 'es-CO';
  locucion.rate = esGea ? 0.84 : 1.04;
  locucion.pitch = esGea ? 1.08 : 0.94;
  locucion.volume = volumenNarracion;

  // Elegir una voz colombiana adecuada si está disponible
  const elegirVoz = () => {
    const voces = window.speechSynthesis.getVoices();
    const vocesCO = voces.filter(voz => /^es-CO$/i.test(voz.lang));
    const vozPreferida = esGea
      ? vocesCO.find(voz => /female|mujer|paulina|sofia|monica|helena/i.test(voz.name))
      : vocesCO.find(voz => /male|hombre|jorge|carlos|andres|miguel/i.test(voz.name));
    if (vozPreferida || vocesCO[0]) locucion.voice = vozPreferida || vocesCO[0];
  };
  elegirVoz();

  narracionActual = locucion;
  window.speechSynthesis.speak(locucion);
}

/* ---------- Botones de audio ---------- */
document.querySelectorAll('[data-speech]').forEach(boton => {
  // Reproducir / pausar / reanudar
  boton.addEventListener('click', () => {
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    else if (window.speechSynthesis.speaking) window.speechSynthesis.pause();
    else narrar(boton.dataset.speech);
  });

  // Controles adicionales: reiniciar y volumen
  const controles = document.createElement('span');
  controles.className = 'ml-2 inline-flex items-center gap-2';
  controles.innerHTML =
    '<button type="button" class="audio-btn" aria-label="Reiniciar narración">↻</button>' +
    '<label class="text-sm font-bold">Volumen <input type="range" min="0" max="1" step="0.1" value="1" aria-label="Volumen de narración"></label>';

  controles.querySelector('button').addEventListener('click', () => narrar(boton.dataset.speech));
  controles.querySelector('input').addEventListener('input', evento => {
    volumenNarracion = Number(evento.target.value);
    if (narracionActual && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      narrar(boton.dataset.speech);
    }
  });

  boton.after(controles);
  const quienHabla = (boton.dataset.speech.startsWith('gea') || boton.dataset.speech.startsWith('stop')) ? 'GEA' : 'Mapetto';
  boton.setAttribute('aria-label', 'Reproducir o pausar narración de ' + quienHabla);
});

/* ---------- Detener la narración ---------- */
document.getElementById('stopAudioBtn').addEventListener('click', () => {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
});

/* ---------- Inicializar iconos de Lucide al cargar ---------- */
window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
});
