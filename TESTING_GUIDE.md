# 🧪 Guida Test Nuova Esperienza AR

## ✅ Implementazione Completata

Ho implementato la nuova logica AR con sequenza marker → PNG → bottone → oggetti fissi.

---

## 📋 Cosa È Stato Modificato

### **index.html**
- ✅ Aggiunto PNG `Markernote1.png` ancorato al marker
- ✅ Bottone rosso "AVVIA L'ESPERIENZA" in basso schermo
- ✅ 3 modelli GLB configurati: 2.3, 2.4, 2.5
- ✅ Pannello debug XYZ con slider per posizionamento
- ✅ Container `worldAnchor` per oggetti fissi nello spazio

### **js/interactions.js**
- ✅ Gestione sequenza: marker found → PNG + bottone → esperienza
- ✅ Sistema camera-relative per posizionamento oggetti
- ✅ Oggetti fissi nello spazio (non seguono fotocamera)
- ✅ Debug panel con slider XYZ + salvataggio localStorage
- ✅ Modalità debug (`?debug=true` nell'URL)

---

## 🎬 Sequenza Esperienza (Come Funziona)

### **Fase 1: Inquadra Marker**
1. Apri app da smartphone
2. Consenti fotocamera
3. Inquadra marker stampato
4. ✅ **Compare PNG "Markernote1"** sul marker
5. ✅ **Compare bottone rosso** "AVVIA L'ESPERIENZA" in basso

### **Fase 2: Avvia Esperienza**
1. Click su **"AVVIA L'ESPERIENZA"**
2. ✅ PNG sparisce
3. ✅ Bottone sparisce
4. ✅ **3 modelli 3D appaiono** intorno a te:
   - **2.3_Biblioteca** → SINISTRA (-1.5m)
   - **2.4_BibliotecaParma_2** → CENTRO/DAVANTI (-1.5m avanti)
   - **2.5_PianiParma** → DESTRA (+1.5m)

### **Fase 3: Esplora Liberamente**
- ✅ Oggetti **fissi nello spazio** (non seguono fotocamera)
- ✅ Puoi **muoverti** intorno agli oggetti
- ✅ Puoi **avvicinarti** e guardarli da vicino
- ✅ Marker non serve più (ma se lo perdi inizialmente, torna alla Fase 1)

---

## 🎛️ Sistema Debug XYZ

### **Attivazione**
Due modi per attivare il debug panel:

1. **URL parameter**: Apri app con `?debug=true`
   ```
   https://tuourl.vercel.app/?debug=true
   ```

2. **Bottone toggle**: Dopo aver avviato esperienza, appare bottone "⚙️ Debug" in alto a destra

### **Uso Slider**
Per ogni oggetto (Biblioteca SX, Centro, Piani DX):
- **X**: sinistra ↔ destra (-5 a +5 metri)
- **Y**: su ↕ giù (-2 a +2 metri)
- **Z**: avanti ↔ indietro (-5 a +5 metri)
- **Scala**: dimensione oggetto (0.1x a 2x)

### **Salvataggio Posizioni**
1. Muovi slider fino a trovare posizione perfetta
2. Click su **"💾 Salva Posizioni"**
3. Posizioni salvate in localStorage del browser
4. Prossima volta che avvii esperienza, carica automaticamente posizioni salvate

---

## 📱 Come Testare

### **Test Locale**
```bash
# Avvia server locale
cd /mnt/c/Users/Marko/Desktop/ARbiblio
python -m http.server 8000

# Da smartphone Android (stessa rete Wi-Fi)
# Apri Chrome e vai a: http://IP_TUO_PC:8000
```

### **Test su Vercel (Consigliato)**
1. Push modifiche su GitHub (vedi sotto)
2. Vercel rebuilda automaticamente in 30 secondi
3. Apri URL Vercel da smartphone
4. Testa sequenza completa

---

## 🔄 Push Modifiche su GitHub

Ho creato commit localmente. Per pushare su GitHub:

```bash
# Verifica commit
git log --oneline -1

# Push (richiede autenticazione)
git push origin main
```

**Se richiede credenziali:**
- Username: `marcoscude`
- Password: [Tuo Personal Access Token]

**⚠️ Token precedente invalidato** per sicurezza. Se serve nuovo token:
1. https://github.com/settings/tokens
2. Generate new token (classic)
3. Scope: ☑️ repo
4. Copia token e usa come password

---

## 🧪 Checklist Test

### **Test Sequenza Base**
- [ ] Marker rilevato → PNG appare
- [ ] PNG ancorato correttamente al marker (no lag)
- [ ] Bottone rosso visibile in basso
- [ ] Click bottone → PNG sparisce
- [ ] Click bottone → Bottone sparisce
- [ ] 3 oggetti 3D appaiono intorno all'utente

### **Test Posizionamento Oggetti**
- [ ] Biblioteca SX a sinistra (circa 1.5m)
- [ ] Biblioteca Centro davanti (circa 1.5m avanti)
- [ ] Piani DX a destra (circa 1.5m)
- [ ] Oggetti proporzionati (scala 0.5)

### **Test Movimento Utente**
- [ ] Muovi smartphone → oggetti restano fissi
- [ ] Avvicinati a oggetto → puoi guardarlo da vicino
- [ ] Gira intorno a oggetto → puoi vederlo da tutti i lati
- [ ] Allontanati → oggetti restano visibili

### **Test Debug Panel**
- [ ] Apri con `?debug=true` → panel visibile
- [ ] Slider X → oggetto si muove sinistra/destra
- [ ] Slider Y → oggetto si muove su/giù
- [ ] Slider Z → oggetto si muove avanti/indietro
- [ ] Slider Scala → oggetto cambia dimensione
- [ ] Salva posizioni → alert conferma
- [ ] Ricarica pagina → posizioni salvate applicate

### **Test Casi Limite**
- [ ] Marker perso prima di click bottone → tutto scompare
- [ ] Marker perso dopo click bottone → oggetti restano
- [ ] Marker ritrovato dopo perdita → può riattivare sequenza
- [ ] Modelli 3D pesanti → caricamento completo (6+13+21 MB)

---

## 📊 Posizioni Default Oggetti

Coordinate relative alla posizione utente quando clicca "Avvia esperienza":

| Oggetto | X | Y | Z | Scala |
|---------|---|---|---|-------|
| 2.3_Biblioteca (SX) | -1.5 | 0 | -1 | 0.5 |
| 2.4_Biblioteca (Centro) | 0 | 0 | -1.5 | 0.5 |
| 2.5_PianiParma (DX) | 1.5 | 0 | -1 | 0.5 |

**Coordinate XYZ:**
- **X**: negativo = sinistra, positivo = destra
- **Y**: negativo = sotto, positivo = sopra
- **Z**: negativo = avanti, positivo = dietro (relativo a camera)

---

## ⚠️ Limitazioni Note (AR.js Camera-Relative)

### ✅ **Pro**
- Funziona su tutti i browser Android
- No permessi speciali richiesti
- Oggetti sembrano fissi per movimenti limitati (1-1.5m)

### ⚠️ **Contro**
- **Drift nel tempo**: Dopo 2-3 minuti di movimento continuo, oggetti possono "slittare" leggermente
- **Tracking limitato**: Se ti muovi oltre 2 metri, precisione diminuisce
- **No persistenza marker-less**: Se perdi marker prima di avviare, devi ricominciare

### 💡 **Ottimizzazione Futura (se necessario)**
Per esperienza più stabile:
1. **WebXR Hit-Test**: Tracking world-space vero (richiede riscrittura)
2. **8th Wall**: Soluzione commerciale con tracking robusto (~$99/mese)
3. **Marker sempre visibile**: Alternativa più semplice (oggetti ancorati a marker)

---

## 🐛 Troubleshooting

### **PNG non appare sul marker**
- Verifica che `assets/Markernote1.png` esista
- Controlla console: errori caricamento asset?
- Marker correttamente rilevato? (vedi console log)

### **Bottone non appare**
- Controlla console: errore `startExperienceBtn`?
- Z-index bottone (100) più alto di altri elementi?

### **Oggetti 3D non appaiono**
- Attendere caricamento modelli (42 MB totali, circa 10-20 sec su 4G)
- Controlla console: errori caricamento GLB?
- Verifica che `worldAnchor` sia visibile dopo click

### **Oggetti troppo grandi/piccoli**
- Usa debug panel per regolare scala
- Default: 0.5 (50% dimensione originale)
- Range consigliato: 0.3 - 0.8

### **Oggetti si muovono con fotocamera**
- ⚠️ Bug: `worldAnchor` non correttamente posizionato
- Verifica console log posizione camera al click
- Possibile problema: camera non inizializzata

---

## 📝 Note per Test in Biblioteca

### **Illuminazione**
- ✅ Ambiente biblioteca ideale (luce diffusa)
- ⚠️ Evita luce diretta su marker (riduce contrasto)

### **Spazio**
- ✅ 1-1.5m di movimento: perfetto
- ⚠️ Oltre 2m: possibile drift

### **Marker**
- Stampa dimensione: **almeno 15×15 cm** per facilità rilevamento
- Posizione: Tavolo, parete, leggio (stabile, ben illuminato)

### **Utenti Test**
- Prima volta: Segui sequenza completa
- Nota dove oggetti appaiono in relazione a spazio fisico
- Usa debug per aggiustare posizioni se necessario

---

## ✅ Pronto per Test!

Quando hai fatto push su GitHub:
1. Vercel rebuilda automaticamente
2. Apri URL da smartphone Android
3. Segui sequenza test
4. Annotami feedback su:
   - Posizionamento oggetti (ok o da modificare?)
   - Stabilità oggetti nello spazio
   - Dimensione oggetti (troppo grandi/piccoli?)
   - Performance caricamento modelli

Buon test! 🚀
