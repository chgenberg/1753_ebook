# 1753 E-book Reader

En modern, interaktiv e-bokläsare skapad för 1753 Skincare's "Weed Your Skin" e-bok. Applikationen erbjuder en smidig och visuellt tilltalande läsupplevelse med avancerade funktioner för navigation och visning.

## ✨ Funktioner

- **Interaktiv Navigation**: Klicka på höger sida för nästa sida, vänster sida för föregående
- **Dubbel-sidor Visning**: Visa två sidor samtidigt (desktop) eller en sida (mobil)
- **Smooth Animationer**: Sidvändningsanimationer för en naturlig känsla
- **Responsiv Design**: Fungerar perfekt på alla enheter
- **Zoom-funktionalitet**: Zooma in/ut för bättre läsbarhet
- **Fullskärmsläge**: Fördjupa dig i läsningen
- **Tangentbordsnavigation**: Använd piltangenter för snabb navigation
- **Touch-gester**: Svep för att byta sida på mobila enheter
- **Progressindikator**: Se hur långt du har kommit i boken
- **Offline-stöd**: Läs även utan internetanslutning
- **Snabb laddning**: Optimerad för prestanda

## 🚀 Installation

### Lokalt (Development)

1. **Klona projektet:**
```bash
git clone <repository-url>
cd 1753ebook_reader
```

2. **Installera dependencies:**
```bash
npm install
```

3. **Starta utvecklingsservern:**
```bash
npm run dev
```

4. **Öppna i webbläsaren:**
```
http://localhost:3000
```

### Produktion

1. **Starta produktionsservern:**
```bash
npm start
```

## 🚂 Deployment på Railway

### Steg 1: Förbereda projektet

1. Se till att alla filer är i projektet
2. Verifiera att `railway.json` finns i rotkatalogen
3. Kontrollera att PDF-filen finns i projektet

### Steg 2: Deploya till Railway

1. **Logga in på Railway:**
   - Gå till [railway.app](https://railway.app)
   - Skapa konto eller logga in

2. **Skapa nytt projekt:**
   - Klicka på "New Project"
   - Välj "Deploy from GitHub repo"
   - Välj ditt repository

3. **Konfigurera deployment:**
   - Railway kommer automatiskt att använda `railway.json`
   - Kontrollera att build-kommandot är korrekt
   - Vänta på att bygget slutförs

4. **Få din URL:**
   - När deployment är klar får du en URL
   - Testa att allt fungerar

### Steg 3: Anpassa domän (Valfritt)

1. **Anpassad domän:**
   - Gå till projektinställningar
   - Lägg till din egen domän
   - Konfigurera DNS-inställningar

## 🛒 Shopify Integration

### Embed som iframe

Lägg till följande kod i din Shopify-tema:

```html
<iframe 
  src="https://your-railway-app.railway.app" 
  width="100%" 
  height="800px" 
  frameborder="0"
  style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
</iframe>
```

### Som popup/modal

```javascript
// Lägg till i theme.liquid
function openEbook() {
  const modal = document.createElement('div');
  modal.innerHTML = `
    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center;">
      <div style="width: 90%; height: 90%; background: white; border-radius: 8px; position: relative;">
        <button onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: 10px; right: 10px; background: #dc3545; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer;">Stäng</button>
        <iframe src="https://your-railway-app.railway.app" width="100%" height="100%" frameborder="0" style="border-radius: 8px;"></iframe>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}
```

### Som separat sida

Skapa en ny sida i Shopify och bädda in e-bokläsaren:

```html
<div style="width: 100%; height: 80vh;">
  <iframe 
    src="https://your-railway-app.railway.app" 
    width="100%" 
    height="100%" 
    frameborder="0"
    style="border-radius: 8px;">
  </iframe>
</div>
```

## 📱 Användning

### Navigation

- **Klicka**: Höger sida = nästa, vänster sida = föregående
- **Tangentbord**: Piltangenter, mellanslag, Home/End
- **Touch**: Svep höger/vänster på mobila enheter
- **Knappar**: Använd kontrollpanelen längst ner

### Genvägar

| Tangent | Funktion |
|---------|----------|
| `→` eller `↓` | Nästa sida |
| `←` eller `↑` | Föregående sida |
| `Home` | Första sidan |
| `End` | Sista sidan |
| `F11` | Fullskärm |
| `+` | Zooma in |
| `-` | Zooma ut |
| `Escape` | Stäng fullskärm |

## 🔧 Teknisk Information

### Teknisk Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **PDF Rendering**: PDF.js
- **Styling**: CSS Custom Properties, Flexbox, Grid
- **Deployment**: Railway
- **Offline Support**: Service Worker

### Projektstruktur

```
1753ebook_reader/
├── package.json              # npm dependencies
├── server.js                 # Express server
├── railway.json             # Railway config
├── README.md                # Denna fil
├── e-book_weedyourskin.pdf  # PDF-filen
└── public/                  # Statiska filer
    ├── index.html           # Huvudsida
    ├── styles.css           # Stilar
    ├── app.js               # Huvudlogik
    └── sw.js                # Service Worker
```

### Systemkrav

- **Node.js**: 18.0.0 eller senare
- **Webbläsare**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobil**: iOS 12+, Android 8+

## 🎨 Anpassning

### Färger

Ändra färger i `public/styles.css`:

```css
:root {
  --primary-color: #1a365d;    /* Huvudfärg */
  --secondary-color: #2d5a87;  /* Sekundärfärg */
  --accent-color: #4a90e2;     /* Accentfärg */
}
```

### Branding

Uppdatera varumärkesinformation i `public/index.html`:

```html
<div class="logo">
    <h1>Ditt Företag</h1>
    <span class="book-title">Din E-bok</span>
</div>
```

## 🔄 Uppdateringar

### Uppdatera PDF

1. Byt ut `e-book_weedyourskin.pdf` mot din nya PDF
2. Uppdatera filnamnet i `public/app.js` om nödvändigt:
```javascript
const loadingTask = pdfjsLib.getDocument('/pdf/din-nya-fil.pdf');
```

### Uppdatera styling

Redigera `public/styles.css` för att anpassa design och layout.

## 📊 Prestanda

### Optimering

- **Compression**: Gzip-komprimering aktiverad
- **Caching**: Aggressive caching för statiska filer
- **Lazy Loading**: PDF-sidor laddas vid behov
- **Service Worker**: Offline-stöd och caching

### Laddningstider

- **Första besök**: ~3-5 sekunder (beroende på PDF-storlek)
- **Efterföljande besök**: ~1-2 sekunder (tack vare caching)
- **Offline**: Omedelbar laddning

## 🐛 Felsökning

### Vanliga problem

1. **PDF laddar inte:**
   - Kontrollera att PDF-filen finns i rätt mapp
   - Verifiera filnamnet i koden
   - Kontrollera serverloggar

2. **Styling fungerar inte:**
   - Kontrollera att CSS-filen laddas korrekt
   - Kontrollera webbläsarens utvecklarverktyg

3. **Deployment-problem:**
   - Kontrollera Railway-loggar
   - Verifiera att alla filer är inkluderade
   - Kontrollera Node.js-version

### Loggar

Kontrollera loggar i Railway dashboard eller lokalt:

```bash
# Lokalt
npm run dev

# Railway
# Gå till Railway dashboard > ditt projekt > Deployments
```

## 📝 Licens

MIT License - Se LICENSE-filen för detaljer.

## 🤝 Support

För support och frågor:
- Skapa ett issue i GitHub repository
- Kontakta utvecklingsteamet

---

**Skapad med ❤️ för 1753 Skincare** 