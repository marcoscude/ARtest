#!/bin/bash

# Script per push su GitHub - ARtest
# Esegui questo script per caricare tutti i file su GitHub

echo "🚀 Push su GitHub repository: marcoscude/ARtest"
echo ""
echo "Sto per fare push di 12 file (42+ MB di assets inclusi)..."
echo ""

# Push su GitHub
git push -u origin main

# Verifica risultato
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Push completato con successo!"
    echo ""
    echo "📍 Repository: https://github.com/marcoscude/ARtest"
    echo ""
    echo "🔗 Prossimi passi:"
    echo "1. Vai su https://vercel.com/new"
    echo "2. Importa il repository 'ARtest'"
    echo "3. Click su 'Deploy'"
    echo "4. Copia l'URL Vercel e testalo da smartphone!"
    echo ""
else
    echo ""
    echo "❌ Errore durante il push."
    echo ""
    echo "Possibili soluzioni:"
    echo "1. Verifica di aver fatto login su GitHub:"
    echo "   git config --global credential.helper store"
    echo "   git push -u origin main"
    echo ""
    echo "2. Oppure configura un Personal Access Token:"
    echo "   - Vai su https://github.com/settings/tokens"
    echo "   - Genera token con scope 'repo'"
    echo "   - Usa il token come password quando richiesto"
    echo ""
    echo "3. Oppure usa SSH:"
    echo "   git remote set-url origin git@github.com:marcoscude/ARtest.git"
    echo "   git push -u origin main"
    echo ""
fi
