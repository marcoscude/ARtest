# Assets per la Demo AR

Questa cartella contiene tutti gli assets necessari per l'applicazione AR.

## File richiesti

### ✅ Già presenti:
- `marker.patt` - File marker per AR.js (riconoscimento pattern)
- `model1.glb` → symlink a `2.3_Biblioteca.glb` (modello 3D, 6.6 MB)

### ⚠️ Da aggiungere:

#### 1. `img1.jpg` - Immagine informativa
- **Formato:** JPEG
- **Dimensioni consigliate:** 1024×1024 px o 512×512 px
- **Peso max:** 500 KB (ottimizzata per mobile)
- **Cosa mostrare:** Foto, disegno o grafica relativa al contenuto culturale

**Come ottimizzare:**
```bash
# Con ImageMagick
convert originale.jpg -resize 1024x1024 -quality 85 img1.jpg
```

#### 2. `video1.mp4` - Video di approfondimento
- **Formato:** MP4 (H.264 codec)
- **Risoluzione consigliata:** 720p (1280×720) o 480p (854×480)
- **Durata:** 10-30 secondi (massimo 1 minuto)
- **Peso max:** 5 MB
- **Audio:** opzionale (il video parte muted di default)

**Come ottimizzare con ffmpeg:**
```bash
# Converti in MP4 ottimizzato per web mobile
ffmpeg -i originale.mov \
  -vf scale=854:480 \
  -c:v libx264 -preset slow -crf 28 \
  -c:a aac -b:a 96k \
  -movflags +faststart \
  video1.mp4
```

## Alternative se non hai assets

### Opzione 1: Usare placeholder online
Puoi modificare `index.html` per usare assets da URL esterni:

```html
<!-- Immagine -->
<img id="img1" src="https://via.placeholder.com/512x512.jpg?text=Contenuto+Culturale" />

<!-- Video (esempio da Wikimedia Commons) -->
<video id="video1" src="https://upload.wikimedia.org/wikipedia/commons/transcoded/2/22/Biblioteca_esempio.webm/Biblioteca_esempio.webm.480p.vp9.webm" ...></video>
```

### Opzione 2: Disabilitare temporaneamente
Commenta nel file `index.html` le righe degli assets mancanti:

```html
<!-- <img id="img1" src="./assets/img1.jpg" /> -->
<!-- <video id="video1" src="./assets/video1.mp4" ... ></video> -->
```

E commenta anche gli elementi corrispondenti nel marker:
```html
<!-- <a-plane ... src="#img1" ... ></a-plane> -->
<!-- <a-video ... src="#video1" ... ></a-video> -->
```

## Ottimizzazione modelli 3D

I tuoi modelli `.glb` esistenti sono pesanti:
- `2.3_Biblioteca.glb` → 6.6 MB ⚠️
- `2.4_BibliotecaParma_2.glb` → 13 MB ❌
- `2.5_PianiParma.glb` → 21 MB ❌

**Peso ideale per AR mobile: < 2 MB**

### Come ottimizzare con gltf-pipeline:
```bash
# Installa tool
npm install -g gltf-pipeline

# Ottimizza
gltf-pipeline -i 2.3_Biblioteca.glb -o model1_ottimizzato.glb -d
```

### Alternative online:
- [glTF Viewer + Export](https://gltf-viewer.donmccurdy.com/)
- [Blender](https://www.blender.org/): Importa GLB → Riduci poligoni → Esporta con compressione Draco

## Generare il tuo marker custom

Il file `marker.patt` attuale funziona, ma puoi crearne uno personalizzato:

1. Vai su **[AR.js Marker Training](https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html)**
2. Carica un'immagine con forme contrastanti (bianco/nero)
3. Scarica il file `.patt`
4. Sostituisci `marker.patt` con il tuo
5. Stampa il marker PDF da inquadrare

**Consigli per marker efficaci:**
- Alto contrasto (bianco e nero)
- Forme geometriche distintive
- Evita simmetrie perfette
- Dimensione stampa: almeno 10×10 cm
