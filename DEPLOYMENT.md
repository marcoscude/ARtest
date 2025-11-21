# 🚀 Guida Deployment GitHub + Vercel

Istruzioni passo-passo per deployare l'app AR su Vercel con HTTPS automatico.

---

## 📋 Prerequisiti

Prima di iniziare, assicurati di avere:
- ✅ Account GitHub (gratuito): https://github.com/signup
- ✅ Account Vercel (gratuito): https://vercel.com/signup
- ✅ Git installato sul tuo PC

**Verifica Git:**
```bash
git --version
```
Se non installato: https://git-scm.com/downloads

---

## 🔧 Step 1: Inizializza Repository Git Locale

```bash
# 1. Vai nella cartella progetto (se non ci sei già)
cd /mnt/c/Users/Marko/Desktop/ARbiblio

# 2. Inizializza Git
git init

# 3. Aggiungi tutti i file
git add .

# 4. Verifica cosa verrà committato (opzionale)
git status

# 5. Crea il primo commit
git commit -m "Initial commit: AR demo marker-based con A-Frame e AR.js"
```

**Output atteso:**
```
Initialized empty Git repository in ...
[main (root-commit) abc1234] Initial commit: AR demo...
 8 files changed, 500 insertions(+)
```

---

## 🌐 Step 2: Crea Repository su GitHub

### Opzione A: Da Web (Raccomandato per principianti)

1. Vai su **https://github.com/new**
2. Compila:
   - **Repository name**: `arbiblio` (o il nome che preferisci)
   - **Description**: "Demo AR marker-based per Pubblica Amministrazione"
   - **Visibilità**: `Public` (o `Private` se preferisci)
   - ⚠️ **NON** spuntare "Add a README" (ce l'hai già)
3. Click su **"Create repository"**

4. **Copia l'URL HTTPS** che appare (es: `https://github.com/TUO_USERNAME/arbiblio.git`)

### Opzione B: Da CLI con GitHub CLI (se installato)

```bash
# Crea repo direttamente da terminale
gh repo create arbiblio --public --source=. --remote=origin --push
```

---

## 📤 Step 3: Push su GitHub

```bash
# 1. Collega repository locale a GitHub (sostituisci TUO_USERNAME)
git remote add origin https://github.com/TUO_USERNAME/arbiblio.git

# 2. Verifica remote (opzionale)
git remote -v

# 3. Push su GitHub
git push -u origin main
```

**Se ricevi errore "main vs master":**
```bash
# Rinomina branch in main
git branch -M main
git push -u origin main
```

**Output atteso:**
```
Enumerating objects: 15, done.
Counting objects: 100% (15/15), done.
...
To https://github.com/TUO_USERNAME/arbiblio.git
 * [new branch]      main -> main
```

✅ Ora il codice è su GitHub! Verifica andando su: `https://github.com/TUO_USERNAME/arbiblio`

---

## 🚀 Step 4: Deploy su Vercel

### 4.1 Collega Vercel a GitHub

1. Vai su **https://vercel.com/login**
2. Click su **"Continue with GitHub"**
3. Autorizza Vercel ad accedere ai tuoi repository

### 4.2 Importa Repository

1. Dalla dashboard Vercel, click su **"Add New"** → **"Project"**
2. Trova `arbiblio` nella lista dei repository
3. Click su **"Import"**

### 4.3 Configura Deploy

**Configurazione automatica (Vercel rileva tutto):**
- **Framework Preset**: Other / None (corretto)
- **Root Directory**: `./` (default)
- **Build Command**: (vuoto - non serve, è statico)
- **Output Directory**: (vuoto - serve direttamente root)

**NON modificare nulla**, Vercel rileva automaticamente che è un sito statico.

4. Click su **"Deploy"**

### 4.4 Attendi Deploy (30-60 secondi)

Vedrai:
```
Building...
▲ Vercel
└─ Deploying...
   └─ Building...
      └─ Completed!
✓ Deployment ready
```

---

## ✅ Step 5: Testa l'App

### 5.1 Copia URL Vercel

Alla fine del deploy vedrai:
```
🎉 https://arbiblio-abc123.vercel.app
```

**Copia questo URL** (sarà univoco per te).

### 5.2 Test da Smartphone

1. **Apri Chrome/Safari** sullo smartphone
2. **Vai all'URL Vercel** che hai copiato
3. **Consenti accesso alla fotocamera**
4. **Stampa il marker** (vedi sotto)
5. **Inquadra il marker** → Dovresti vedere gli elementi AR!

---

## 🖨️ Stampa Marker per Testing

### Opzione A: Usa marker di test AR.js (veloce)

1. Scarica e stampa **Hiro marker**: https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png
2. ⚠️ Modifica `index.html` riga 65:
   ```html
   <!-- Prima: -->
   <a-marker type="pattern" url="./assets/marker.patt" ...>

   <!-- Dopo: -->
   <a-marker preset="hiro" ...>
   ```
3. Committa e pusha:
   ```bash
   git add index.html
   git commit -m "Usa Hiro marker per test"
   git push
   ```
4. Vercel rebuilda automaticamente in 30 secondi

### Opzione B: Usa il tuo marker custom

1. Vai su https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
2. Click su **"Upload your pattern file"**
3. Carica `assets/marker.patt`
4. Scarica il **PDF generato**
5. **Stampa il PDF** (dimensione minima 10×10 cm)
6. Inquadralo con l'app!

---

## 🔄 Aggiornamenti Futuri

Ogni volta che modifichi il codice:

```bash
# 1. Aggiungi modifiche
git add .

# 2. Committa con messaggio descrittivo
git commit -m "Aggiunto video e immagine"

# 3. Push su GitHub
git push

# 4. Vercel rebuilda AUTOMATICAMENTE (30 sec)
```

**Non serve rifare nulla su Vercel** - rileva i push automaticamente! 🎉

---

## 🎯 URL Finali

Dopo il deploy avrai:

- **GitHub Repo**: `https://github.com/TUO_USERNAME/arbiblio`
- **Vercel App**: `https://arbiblio-abc123.vercel.app`
- **Domain Custom (opzionale)**: Configura da Vercel Settings

---

## 🐛 Troubleshooting Deploy

### ❌ "Build failed" su Vercel

**Causa**: File mancanti o percorsi errati

**Soluzione**:
```bash
# Verifica che tutti gli assets siano committati
git status

# Se vedi file "Untracked", aggiungili:
git add assets/img1.jpg assets/video1.mp4
git commit -m "Aggiunti assets mancanti"
git push
```

### ❌ "404 Not Found" all'apertura

**Causa**: `index.html` non nella root

**Soluzione**: Verifica che `index.html` sia nella root del progetto, non in sottocartelle.

### ❌ Marker non rilevato su iOS

**Causa**: Safari ha limitazioni

**Soluzioni**:
1. Assicurati di usare **Safari** (non Chrome iOS)
2. Verifica che l'URL sia **HTTPS** (Vercel lo fa automaticamente)
3. Stampa marker più grande (15×15 cm)
4. Illumina bene la scena

### ❌ Assets non caricano (immagini/video/3D)

**Causa**: Percorsi relativi errati

**Soluzione**: Verifica in `index.html` che i percorsi siano:
```html
<img src="./assets/img1.jpg" />   ✅ Corretto
<img src="/assets/img1.jpg" />    ✅ Corretto
<img src="assets/img1.jpg" />     ⚠️ Preferisci ./
```

---

## 📊 Monitoraggio

### Vercel Dashboard

Da https://vercel.com/dashboard puoi vedere:
- ✅ Deploy history
- 📊 Analytics (visite, performance)
- ⚠️ Error logs
- 🌍 Edge locations (CDN)

### GitHub Actions (opzionale)

Se vuoi CI/CD avanzato, puoi aggiungere GitHub Actions per:
- Validazione HTML
- Ottimizzazione immagini pre-deploy
- Test automatici

---

## 🎉 Complimenti!

Ora hai:
- ✅ Codice versionato su GitHub
- ✅ App live con HTTPS su Vercel
- ✅ Deploy automatico ad ogni push
- ✅ URL condivisibile per test mobile

**Testa da smartphone e buon lavoro! 🚀**

---

**Prossimi step suggeriti:**
1. Aggiungi `img1.jpg` e `video1.mp4` in `assets/`
2. Ottimizza `2.3_Biblioteca.glb` (< 2 MB)
3. Crea marker personalizzato con logo ente
4. Raccogli feedback utenti mobile
