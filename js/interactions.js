// =============================================================================
// ARBIBLIO - REALTÀ AUMENTATA BIBLIOTECA PARMA
// Sistema camera-relative: oggetti ancorati allo spazio dell'utente
// =============================================================================

console.log('🚀 ARbiblio inizializzato');

// Stato applicazione
let experienceStarted = false;
let markerFound = false;

// Elementi DOM
let loadingMessage, startExperienceBtn, debugToggle, debugPanel;
let marker, markerNote, camera, worldAnchor;
let bibliotecaSx, bibliotecaCentro, pianiDx;
let scene;

// =============================================================================
// INIZIALIZZAZIONE
// =============================================================================
window.addEventListener('load', () => {
  console.log('📱 DOM caricato, inizializzo componenti...');

  // Elementi HTML
  loadingMessage = document.getElementById('loadingMessage');
  startExperienceBtn = document.getElementById('startExperienceBtn');
  debugToggle = document.getElementById('debugToggle');
  debugPanel = document.getElementById('debugPanel');

  // Elementi A-Frame
  scene = document.querySelector('a-scene');
  marker = document.querySelector('#marker');
  markerNote = document.querySelector('#markerNote');
  camera = document.querySelector('#camera');
  worldAnchor = document.querySelector('#worldAnchor');
  bibliotecaSx = document.querySelector('#biblioteca-sx');
  bibliotecaCentro = document.querySelector('#biblioteca-centro');
  pianiDx = document.querySelector('#piani-dx');

  // Verifica elementi critici
  if (!marker) {
    console.error('❌ Marker non trovato nel DOM');
    return;
  }
  if (!camera) {
    console.error('❌ Camera non trovata nel DOM');
    return;
  }

  console.log('✅ Elementi caricati correttamente');

  // Event listeners
  setupMarkerListeners();
  setupButtonListeners();
  setupDebugPanel();
  checkDebugMode();
});

// =============================================================================
// GESTIONE MARKER FOUND/LOST
// =============================================================================
function setupMarkerListeners() {
  marker.addEventListener('markerFound', () => {
    console.log('✅ Marker rilevato!');
    markerFound = true;

    // Se esperienza già avviata, ignora il marker
    if (experienceStarted) {
      console.log('ℹ️ Marker ignorato - esperienza già avviata');
      return;
    }

    // Aggiorna UI
    if (loadingMessage) {
      loadingMessage.textContent = 'Marker trovato!';
      loadingMessage.classList.add('found');
      setTimeout(() => {
        loadingMessage.style.display = 'none';
      }, 2000);
    }

    // Mostra PNG Markernote1 sul marker
    if (markerNote) {
      markerNote.setAttribute('visible', true);
      markerNote.object3D.visible = true;
      console.log('📄 PNG Markernote1 visualizzato');
    }

    // Mostra bottone "Avvia esperienza"
    if (startExperienceBtn) {
      startExperienceBtn.style.display = 'block';
      console.log('🔴 Bottone "Avvia esperienza" attivo');
    }
  });

  marker.addEventListener('markerLost', () => {
    console.log('⚠️ Marker perso');
    markerFound = false;

    if (!experienceStarted) {
      // Se esperienza non ancora avviata, nascondi tutto
      if (loadingMessage) {
        loadingMessage.textContent = 'Inquadra nuovamente il marker';
        loadingMessage.classList.remove('found');
        loadingMessage.style.display = 'block';
      }

      if (markerNote) {
        markerNote.setAttribute('visible', false);
        markerNote.object3D.visible = false;
      }

      if (startExperienceBtn) {
        startExperienceBtn.style.display = 'none';
      }
    }
    // Se esperienza già avviata, il marker non serve più
  });
}

// =============================================================================
// GESTIONE BOTTONE "AVVIA ESPERIENZA"
// =============================================================================
function setupButtonListeners() {
  if (startExperienceBtn) {
    startExperienceBtn.addEventListener('click', startExperience);
  }

  if (debugToggle) {
    debugToggle.addEventListener('click', () => {
      debugPanel.classList.toggle('active');
    });
  }
}

function startExperience() {
  if (experienceStarted) return;

  console.log('🎬 Avvio esperienza AR...');
  experienceStarted = true;

  // Nascondi PNG e bottone
  if (markerNote) {
    markerNote.setAttribute('visible', false);
    markerNote.object3D.visible = false;
  }
  if (startExperienceBtn) {
    startExperienceBtn.style.display = 'none';
  }

  // ==========================================================================
  // POSIZIONAMENTO OGGETTI DAVANTI ALL'UTENTE (CAMERA-RELATIVE)
  // ==========================================================================
  // Il marker ha servito solo come "chiave" per attivare l'esperienza
  // Ora posizioniamo gli oggetti DAVANTI alla camera dell'utente
  // Gli oggetti saranno fissi nello spazio 3D della scena

  // In AR.js la camera è a (0,0,0) e guarda verso -Z
  // Posizioniamo gli oggetti davanti alla camera

  // Reset worldAnchor a posizione fissa davanti alla camera
  worldAnchor.object3D.position.set(0, 0, 0);
  worldAnchor.object3D.rotation.set(0, 0, 0);
  worldAnchor.object3D.scale.set(1, 1, 1);

  // Carica posizioni salvate (se esistono)
  loadSavedPositions();

  // Mostra oggetti 3D
  worldAnchor.object3D.visible = true;
  worldAnchor.setAttribute('visible', true);

  console.log('✅ Esperienza AR avviata');
  console.log('📍 Oggetti posizionati davanti alla camera');
  console.log('🔒 Gli oggetti sono ora indipendenti dal marker');

  // Mostra toggle debug subito
  if (debugToggle) {
    debugToggle.style.display = 'block';
  }
}

// =============================================================================
// SISTEMA DEBUG XYZ
// =============================================================================
function setupDebugPanel() {
  // Slider per Biblioteca SX
  setupSlider('obj1-x', 'obj1-x-val', (val) => {
    bibliotecaSx.setAttribute('position', {
      x: val,
      y: parseFloat(document.getElementById('obj1-y').value),
      z: parseFloat(document.getElementById('obj1-z').value)
    });
  });

  setupSlider('obj1-y', 'obj1-y-val', (val) => {
    bibliotecaSx.setAttribute('position', {
      x: parseFloat(document.getElementById('obj1-x').value),
      y: val,
      z: parseFloat(document.getElementById('obj1-z').value)
    });
  });

  setupSlider('obj1-z', 'obj1-z-val', (val) => {
    bibliotecaSx.setAttribute('position', {
      x: parseFloat(document.getElementById('obj1-x').value),
      y: parseFloat(document.getElementById('obj1-y').value),
      z: val
    });
  });

  setupSlider('obj1-scale', 'obj1-scale-val', (val) => {
    bibliotecaSx.setAttribute('scale', { x: val, y: val, z: val });
  });

  // Slider per Biblioteca Centro
  setupSlider('obj2-x', 'obj2-x-val', (val) => {
    bibliotecaCentro.setAttribute('position', {
      x: val,
      y: parseFloat(document.getElementById('obj2-y').value),
      z: parseFloat(document.getElementById('obj2-z').value)
    });
  });

  setupSlider('obj2-y', 'obj2-y-val', (val) => {
    bibliotecaCentro.setAttribute('position', {
      x: parseFloat(document.getElementById('obj2-x').value),
      y: val,
      z: parseFloat(document.getElementById('obj2-z').value)
    });
  });

  setupSlider('obj2-z', 'obj2-z-val', (val) => {
    bibliotecaCentro.setAttribute('position', {
      x: parseFloat(document.getElementById('obj2-x').value),
      y: parseFloat(document.getElementById('obj2-y').value),
      z: val
    });
  });

  setupSlider('obj2-scale', 'obj2-scale-val', (val) => {
    bibliotecaCentro.setAttribute('scale', { x: val, y: val, z: val });
  });

  // Slider per Piani DX
  setupSlider('obj3-x', 'obj3-x-val', (val) => {
    pianiDx.setAttribute('position', {
      x: val,
      y: parseFloat(document.getElementById('obj3-y').value),
      z: parseFloat(document.getElementById('obj3-z').value)
    });
  });

  setupSlider('obj3-y', 'obj3-y-val', (val) => {
    pianiDx.setAttribute('position', {
      x: parseFloat(document.getElementById('obj3-x').value),
      y: val,
      z: parseFloat(document.getElementById('obj3-z').value)
    });
  });

  setupSlider('obj3-z', 'obj3-z-val', (val) => {
    pianiDx.setAttribute('position', {
      x: parseFloat(document.getElementById('obj3-x').value),
      y: parseFloat(document.getElementById('obj3-y').value),
      z: val
    });
  });

  setupSlider('obj3-scale', 'obj3-scale-val', (val) => {
    pianiDx.setAttribute('scale', { x: val, y: val, z: val });
  });
}

function setupSlider(sliderId, valueId, callback) {
  const slider = document.getElementById(sliderId);
  const valueDisplay = document.getElementById(valueId);

  if (!slider || !valueDisplay) return;

  slider.addEventListener('input', (e) => {
    const value = parseFloat(e.target.value);
    valueDisplay.textContent = value.toFixed(2);
    callback(value);
  });
}

// =============================================================================
// SALVATAGGIO/CARICAMENTO POSIZIONI
// =============================================================================
function saveDebugPositions() {
  const positions = {
    bibliotecaSx: {
      x: parseFloat(document.getElementById('obj1-x').value),
      y: parseFloat(document.getElementById('obj1-y').value),
      z: parseFloat(document.getElementById('obj1-z').value),
      scale: parseFloat(document.getElementById('obj1-scale').value)
    },
    bibliotecaCentro: {
      x: parseFloat(document.getElementById('obj2-x').value),
      y: parseFloat(document.getElementById('obj2-y').value),
      z: parseFloat(document.getElementById('obj2-z').value),
      scale: parseFloat(document.getElementById('obj2-scale').value)
    },
    pianiDx: {
      x: parseFloat(document.getElementById('obj3-x').value),
      y: parseFloat(document.getElementById('obj3-y').value),
      z: parseFloat(document.getElementById('obj3-z').value),
      scale: parseFloat(document.getElementById('obj3-scale').value)
    }
  };

  localStorage.setItem('arbiblio_positions', JSON.stringify(positions));
  console.log('💾 Posizioni salvate:', positions);
  alert('✅ Posizioni salvate in localStorage!');
}

// Funzione globale per bottone HTML
window.saveDebugPositions = saveDebugPositions;

function loadSavedPositions() {
  const saved = localStorage.getItem('arbiblio_positions');
  if (!saved) {
    console.log('ℹ️ Nessuna posizione salvata, uso default');
    return;
  }

  try {
    const positions = JSON.parse(saved);
    console.log('📂 Carico posizioni salvate:', positions);

    // Applica biblioteca SX
    if (positions.bibliotecaSx) {
      bibliotecaSx.setAttribute('position', positions.bibliotecaSx);
      bibliotecaSx.setAttribute('scale', {
        x: positions.bibliotecaSx.scale,
        y: positions.bibliotecaSx.scale,
        z: positions.bibliotecaSx.scale
      });

      // Aggiorna slider
      document.getElementById('obj1-x').value = positions.bibliotecaSx.x;
      document.getElementById('obj1-y').value = positions.bibliotecaSx.y;
      document.getElementById('obj1-z').value = positions.bibliotecaSx.z;
      document.getElementById('obj1-scale').value = positions.bibliotecaSx.scale;
      document.getElementById('obj1-x-val').textContent = positions.bibliotecaSx.x.toFixed(2);
      document.getElementById('obj1-y-val').textContent = positions.bibliotecaSx.y.toFixed(2);
      document.getElementById('obj1-z-val').textContent = positions.bibliotecaSx.z.toFixed(2);
      document.getElementById('obj1-scale-val').textContent = positions.bibliotecaSx.scale.toFixed(2);
    }

    // Applica biblioteca Centro
    if (positions.bibliotecaCentro) {
      bibliotecaCentro.setAttribute('position', positions.bibliotecaCentro);
      bibliotecaCentro.setAttribute('scale', {
        x: positions.bibliotecaCentro.scale,
        y: positions.bibliotecaCentro.scale,
        z: positions.bibliotecaCentro.scale
      });

      document.getElementById('obj2-x').value = positions.bibliotecaCentro.x;
      document.getElementById('obj2-y').value = positions.bibliotecaCentro.y;
      document.getElementById('obj2-z').value = positions.bibliotecaCentro.z;
      document.getElementById('obj2-scale').value = positions.bibliotecaCentro.scale;
      document.getElementById('obj2-x-val').textContent = positions.bibliotecaCentro.x.toFixed(2);
      document.getElementById('obj2-y-val').textContent = positions.bibliotecaCentro.y.toFixed(2);
      document.getElementById('obj2-z-val').textContent = positions.bibliotecaCentro.z.toFixed(2);
      document.getElementById('obj2-scale-val').textContent = positions.bibliotecaCentro.scale.toFixed(2);
    }

    // Applica piani DX
    if (positions.pianiDx) {
      pianiDx.setAttribute('position', positions.pianiDx);
      pianiDx.setAttribute('scale', {
        x: positions.pianiDx.scale,
        y: positions.pianiDx.scale,
        z: positions.pianiDx.scale
      });

      document.getElementById('obj3-x').value = positions.pianiDx.x;
      document.getElementById('obj3-y').value = positions.pianiDx.y;
      document.getElementById('obj3-z').value = positions.pianiDx.z;
      document.getElementById('obj3-scale').value = positions.pianiDx.scale;
      document.getElementById('obj3-x-val').textContent = positions.pianiDx.x.toFixed(2);
      document.getElementById('obj3-y-val').textContent = positions.pianiDx.y.toFixed(2);
      document.getElementById('obj3-z-val').textContent = positions.pianiDx.z.toFixed(2);
      document.getElementById('obj3-scale-val').textContent = positions.pianiDx.scale.toFixed(2);
    }

    console.log('✅ Posizioni caricate da localStorage');
  } catch (err) {
    console.error('❌ Errore caricamento posizioni:', err);
  }
}

// =============================================================================
// MODALITÀ DEBUG (attiva con ?debug=true nell'URL)
// =============================================================================
function checkDebugMode() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('debug') === 'true') {
    console.log('🛠️ Modalità debug attivata');
    if (debugToggle) {
      debugToggle.style.display = 'block';
      debugPanel.classList.add('active');
    }
  }
}

// =============================================================================
// ERROR HANDLING & LOGGING
// =============================================================================
window.addEventListener('error', (e) => {
  console.error('❌ Errore JavaScript:', e.error);
});

// Log info sistema
console.log('📱 User Agent:', navigator.userAgent);
console.log('🎥 Media Devices:', 'mediaDevices' in navigator);
console.log('📍 Geolocation:', 'geolocation' in navigator);
