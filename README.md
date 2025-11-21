# 📱 ARbiblio - Demo Realtà Aumentata Marker-Based

Prototipo di realtà aumentata per Pubblica Amministrazione / Ente Culturale.
Usa **A-Frame 1.7.0** + **AR.js** per mostrare contenuti digitali (immagini, video, modelli 3D) quando la fotocamera inquadra un marker.

---

## 🎯 Funzionalità

✅ **Marker-based AR**: Riconosce un pattern stampato e mostra contenuti 3D
✅ **Multi-contenuto**: Supporta immagini, video e modelli 3D `.glb`
✅ **Interattivo**: Tocca un elemento per vedere la descrizione
✅ **Mobile-first**: Funziona su smartphone (Chrome Android, Safari iOS)
✅ **Zero installazioni**: Basta aprire un link da browser

---

## 📂 Struttura Progetto

```
ARbiblio/
├── index.html              # Pagina principale AR
├── js/
│   └── interactions.js     # Logica interazioni (click, marker found/lost)
├── assets/
│   ├── marker.patt         # File marker AR.js
│   ├── img1.jpg            # ⚠️ Da aggiungere: immagine
│   ├── video1.mp4          # ⚠️ Da aggiungere: video
│   ├── model1.glb          # → Symlink a 2.3_Biblioteca.glb
│   ├── 2.3_Biblioteca.glb  # Modello 3D biblioteca (6.6 MB)
│   └── ASSETS_README.md    # Guida per ottimizzare assets
└── README.md               # Questo file
```

---

## 🚀 Quick Start

### 1. Completa gli Assets Mancanti

Attualmente mancano:
- `assets/img1.jpg` (immagine informativa)
- `assets/video1.mp4` (video di approfondimento)

**Opzioni:**
- Aggiungi i tuoi file nella cartella `assets/`
- Oppure segui le istruzioni in [`assets/ASSETS_README.md`](./assets/ASSETS_README.md)

### 2. Test Locale (Richiede HTTPS)

AR.js richiede **HTTPS** per accedere alla fotocamera. Usa uno di questi metodi:

#### Opzione A: Python (Semplice)
```bash
# Python 3
python -m http.server 8000

# Poi apri: http://localhost:8000
```

#### Opzione B: Node.js con http-server
```bash
npm install -g http-server
http-server -p 8080

# Poi apri: http://localhost:8080
```

#### Opzione C: VS Code Live Server (Raccomandato)
1. Installa estensione **Live Server**
2. Tasto destro su `index.html` → "Open with Live Server"
3. Apre automaticamente su `http://127.0.0.1:5500`

### 3. Stampa il Marker

Serve il marker fisico stampato per testare l'AR:

1. **Genera immagine marker da `.patt`**:
   - Vai su [AR.js Marker Generator](https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html)
   - Carica `assets/marker.patt`
   - Scarica il PDF e stampalo (dimensione minima 10×10 cm)

2. **Oppure usa marker di test AR.js**:
   - [Hiro marker](https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png) (default)
   - ⚠️ Se usi Hiro, modifica `index.html` riga 65: `type="pattern"` → `preset="hiro"`

### 4. Testa su Smartphone

#### Android (Chrome):
```
1. Collega PC e smartphone alla stessa rete Wi-Fi
2. Trova l'IP del PC: ipconfig (Windows) o ifconfig (Mac/Linux)
3. Sullo smartphone apri Chrome e vai a: http://192.168.X.X:8000
4. Consenti accesso alla fotocamera
5. Inquadra il marker stampato
```

#### iOS (Safari):
```
⚠️ Safari richiede HTTPS anche in locale. Opzioni:

A) Usa ngrok per tunnel HTTPS:
   - Installa: https://ngrok.com/download
   - Lancia server locale (porta 8000)
   - Esegui: ngrok http 8000
   - Usa l'URL https fornito (es. https://abc123.ngrok.io)

B) Self-signed certificate (avanzato)
```

---

## 🌐 Deploy Online (Consigliato per iOS)

### GitHub Pages (Gratuito, HTTPS automatico)

```bash
# 1. Crea repo su GitHub
git init
git add .
git commit -m "Initial commit: AR demo"
git remote add origin https://github.com/TUO_USERNAME/arbiblio.git
git push -u origin main

# 2. Abilita GitHub Pages
# Settings → Pages → Source: main branch → Save

# 3. Accedi da smartphone
# https://TUO_USERNAME.github.io/arbiblio/
```

### Alternative:
- **Netlify**: Drag & drop cartella su [netlify.com/drop](https://app.netlify.com/drop)
- **Vercel**: `vercel --prod` (richiede account)
- **Cloudflare Pages**: Deploy da dashboard

---

## 🎮 Come Funziona

1. **Apri link da smartphone** → Consenti fotocamera
2. **Inquadra marker stampato** → Appaiono 3 elementi AR:
   - 🖼️ Immagine (sinistra)
   - 🎬 Video (centro)
   - 🎨 Modello 3D (destra)
3. **Tocca un elemento** → Compare pannello informativo
4. **Tocca "CHIUDI"** → Nasconde pannello

---

## ⚙️ Personalizzazione

### Cambiare Posizioni Elementi AR

Modifica `index.html` righe 70-99:

```html
<!-- Sintassi: position="X Y Z" (in metri dal marker) -->
<a-plane position="-1 0 0" ...>  <!-- X: sinistra/destra -->
<a-video position="0 0 0" ...>   <!-- Y: su/giù -->
<a-entity position="1 0 0" ...>  <!-- Z: avanti/indietro -->
```

### Cambiare Testi Informativi

Modifica attributo `show-info-on-click` in `index.html`:

```html
<a-plane
  show-info-on-click="text: Il tuo testo qui; color: #FFFFFF;"
  ...
></a-plane>
```

### Usare i Tuoi Modelli 3D

Sostituisci `assets/model1.glb` con il tuo file (max 2 MB consigliato).

Oppure modifica `index.html` riga 59:
```html
<a-asset-item id="model1" src="./assets/TUO_MODELLO.glb"></a-asset-item>
```

### Creare Marker Personalizzato

1. Disegna pattern bianco/nero ad alto contrasto
2. Vai su [AR.js Marker Training](https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html)
3. Carica immagine → Scarica `.patt` + PDF
4. Sostituisci `assets/marker.patt`
5. Stampa nuovo PDF

---

## 🐛 Troubleshooting

### ❌ "Fotocamera non disponibile"
- Verifica di usare **HTTPS** o `localhost`
- Controlla permessi browser per fotocamera
- Su iOS: Safari **non** funziona in modalità privata

### ❌ "Marker non rilevato"
- Stampa marker più grande (minimo 10×10 cm)
- Illumina bene il marker (evita ombre)
- Tieni smartphone a 30-50 cm dal marker
- Verifica che il file `.patt` corrisponda al marker stampato

### ❌ "Modello 3D non appare"
- Controlla console browser (F12) per errori
- Verifica che `model1.glb` esista in `assets/`
- File troppo grande? Ottimizza con [glTF Pipeline](https://github.com/CesiumGS/gltf-pipeline)

### ❌ "Elementi AR troppo grandi/piccoli"
Modifica attributo `scale` in `index.html`:
```html
<a-entity scale="0.5 0.5 0.5" ...>  <!-- Scala al 50% -->
```

### ❌ Performance lente su smartphone
- Riduci dimensioni immagini (max 1024×1024 px)
- Comprimi video (max 720p, 5 MB)
- Ottimizza modelli 3D (< 2 MB, < 10k poligoni)
- Disabilita temporaneamente elementi non necessari

---

## 📊 Compatibilità Browser

| Browser | Android | iOS | Desktop |
|---------|---------|-----|---------|
| Chrome  | ✅ | ❌ | ⚠️¹ |
| Safari  | ❌ | ✅ | ⚠️¹ |
| Firefox | ⚠️² | ❌ | ⚠️¹ |
| Edge    | ✅ | ❌ | ⚠️¹ |

¹ Desktop non supporta AR mobile (usa webcam per test marker)
² Firefox Android: supporto parziale, preferisci Chrome

---

## 📚 Risorse Utili

- [Documentazione A-Frame](https://aframe.io/docs/)
- [Documentazione AR.js](https://ar-js-org.github.io/AR.js-Docs/)
- [Esempi AR.js](https://ar-js-org.github.io/AR.js/)
- [Ottimizzare modelli 3D](https://github.com/CesiumGS/gltf-pipeline)
- [Generator marker custom](https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html)

---

## 📝 Note per Produzione

### Sicurezza
- ✅ Nessun dato personale raccolto
- ✅ Fotocamera usata solo localmente (no upload)
- ⚠️ Assets pubblici: non caricare contenuti sensibili

### Performance
- Target: 30 FPS su smartphone medio-gamma
- Ottimizza assets prima del deploy
- Considera progressive loading per modelli grandi

### Accessibilità
- Aggiungi testi alternativi per contenuti visivi
- Considera utenti con disabilità motorie (bottoni grandi)
- Fornisci versione non-AR come fallback

---

## 🤝 Supporto

Per bug o domande:
1. Controlla [Troubleshooting](#-troubleshooting)
2. Leggi [`assets/ASSETS_README.md`](./assets/ASSETS_README.md)
3. Consulta documentazione AR.js

---

## 📄 Licenza

Progetto open source per demo Pubblica Amministrazione.
Librerie usate: A-Frame (MIT), AR.js (MIT).

---

**Versione:** 1.0
**Ultimo aggiornamento:** Novembre 2025
**Testato su:** Chrome Android 119, Safari iOS 17
