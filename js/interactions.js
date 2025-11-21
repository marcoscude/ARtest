// =============================================================================
// COMPONENTE: show-info-on-click
// Mostra un pannello informativo quando l'utente tocca/clicca un elemento AR
// =============================================================================
AFRAME.registerComponent('show-info-on-click', {
  schema: {
    text: { type: 'string', default: '' },
    color: { type: 'string', default: '#FFFFFF' }
  },

  init: function () {
    const infoPanelContainer = document.querySelector('#infoPanelContainer');
    const infoText = document.querySelector('#infoText');
    const el = this.el;

    // Quando l'elemento viene cliccato/toccato
    el.addEventListener('click', () => {
      if (!infoPanelContainer || !infoText) return;

      // Mostra il pannello
      infoPanelContainer.setAttribute('visible', true);

      // Aggiorna il testo con i dati dell'elemento
      infoText.setAttribute('value', this.data.text);
      infoText.setAttribute('color', this.data.color);

      // Log per debug
      console.log('📱 Elemento cliccato:', this.data.text);
    });
  }
});

// =============================================================================
// GESTIONE MARKER: Found/Lost
// =============================================================================
window.addEventListener('load', () => {
  const loading = document.getElementById('loadingMessage');
  const instructions = document.getElementById('instructions');
  const marker = document.getElementById('marker');

  if (!marker) {
    console.error('❌ Marker non trovato nel DOM');
    return;
  }

  // Quando il marker viene rilevato dalla camera
  marker.addEventListener('markerFound', () => {
    console.log('✅ Marker trovato!');

    if (loading) {
      loading.textContent = 'Marker trovato!';
      loading.classList.add('found');
      // Nascondi dopo 2 secondi
      setTimeout(() => {
        loading.style.display = 'none';
      }, 2000);
    }

    // Mostra le istruzioni
    if (instructions) {
      instructions.style.display = 'block';
    }
  });

  // Quando il marker viene perso
  marker.addEventListener('markerLost', () => {
    console.log('⚠️ Marker perso');

    if (loading) {
      loading.textContent = 'Inquadra nuovamente il marker';
      loading.classList.remove('found');
      loading.style.display = 'block';
    }

    // Nascondi le istruzioni
    if (instructions) {
      instructions.style.display = 'none';
    }

    // Nascondi il pannello info se era visibile
    const infoPanelContainer = document.querySelector('#infoPanelContainer');
    if (infoPanelContainer) {
      infoPanelContainer.setAttribute('visible', false);
    }
  });
});

// =============================================================================
// BOTTONE CHIUDI PANNELLO
// =============================================================================
window.addEventListener('load', () => {
  const closeButton = document.querySelector('#closeButton');
  const infoPanelContainer = document.querySelector('#infoPanelContainer');

  if (!closeButton || !infoPanelContainer) {
    console.warn('⚠️ Bottone chiudi o pannello info non trovati');
    return;
  }

  // Chiude il pannello quando si clicca sul bottone rosso
  closeButton.addEventListener('click', () => {
    console.log('🔴 Chiusura pannello info');
    infoPanelContainer.setAttribute('visible', false);
  });
});

// =============================================================================
// ERROR HANDLING: Assets mancanti
// =============================================================================
window.addEventListener('load', () => {
  const assets = document.querySelector('a-assets');
  if (!assets) return;

  // Monitora errori di caricamento
  assets.addEventListener('error', (event) => {
    console.error('❌ Errore caricamento asset:', event.target.id || event.target.src);
  });

  // Log quando tutti gli assets sono caricati
  assets.addEventListener('loaded', () => {
    console.log('✅ Tutti gli assets caricati con successo');
  });
});

// =============================================================================
// DEBUG: Info sistema
// =============================================================================
console.log('🚀 AR Demo inizializzata');
console.log('📱 User Agent:', navigator.userAgent);
console.log('🎥 Media Devices supportati:', 'mediaDevices' in navigator);
