# Hotel QR Digital Menu

A fast, mobile-first digital menu. Plain HTML, CSS and JavaScript — no backend,
no database, no build step. Customers scan a QR code on the table and the menu
opens in their phone browser.

```
hotel-qr-menu/
├── index.html        page structure + SEO tags
├── style.css         all styling (colours and fonts at the top)
├── script.js         the logic (search, filters, rendering) — no need to edit
├── menu-data.js      ★ YOUR hotel details + every dish and price — edit this
├── vercel.json       settings for Vercel
├── netlify.toml      settings for Netlify
├── robots.txt
└── assets/
    ├── logo.png          replace with your logo (square, 512 × 512 px)
    ├── og-image.png      picture shown when the link is shared on WhatsApp (1200 × 630 px)
    ├── favicon.svg       browser tab icon
    └── food-images/      put dish photos here
```

## 1. Run it on your computer

**Easiest:** double-click `index.html`. It opens in your browser and works.
(Fonts need internet; without it a normal system font is used.)

**Better (behaves like the real website):**
1. Install Python (https://www.python.org) — or Node.js.
2. Open a terminal/command prompt **inside the `hotel-qr-menu` folder**.
3. Run `python -m http.server 8000`  (or `npx serve`).
4. Open http://localhost:8000 in your browser.
5. To test on your phone: connect it to the same Wi-Fi and open
   `http://YOUR-COMPUTER-IP:8000`.

## 2. Replace the placeholders

Open `menu-data.js` in any text editor (Notepad, VS Code).

1. **Hotel details** — at the top, `HOTEL_INFO`: name, tagline, phone, WhatsApp
   number (country code + number, e.g. `919876543210`), address, opening hours.
   Leave `phone` or `whatsapp` as `""` to hide those buttons.
2. **Logo** — replace `assets/logo.png` with your own (square PNG).
3. **Share image** — replace `assets/og-image.png` (1200 × 630 px).
4. **Menu** — your spreadsheet items are already loaded (222 dishes, prices
   exactly as printed). To change a price, edit the number. To add a dish,
   copy one line and change the values. To remove one, delete its line.
5. **Photos** — save images in `assets/food-images/` and set the dish's
   `image` field, e.g. `image: "assets/food-images/masala-dosa.jpg"`.
   Dishes without a photo display as clean text rows.
   Tip: ~400 × 400 px, JPG/WebP, under 40 KB each.

Notes about the spreadsheet import:
- Spellings are kept as printed (e.g. "Lamen Juice", "Panneer Friedrice").
  Fix them directly in `menu-data.js` when you like.
- Every dish is marked vegetarian because the menu lists only vegetarian
  dishes. Set `veg: false` for any non-veg dish; a Veg / Non-veg filter then
  appears automatically.
- Original menu sections were grouped into 15 tabs (for example "Gravy" +
  "Special Greavy" → **Gravies**). Vada Pav and Pav Bhaji, printed under
  "Rice Noodles", were placed in **Light Snacks**. Change `category` on any
  item to move it.

## 3. Put it online (free)

### Option A — Netlify (easiest, no account tools needed)
1. Go to https://app.netlify.com/drop and sign up.
2. Drag the whole `hotel-qr-menu` folder onto the page.
3. You get an address like `https://random-name.netlify.app`.
   Site settings → Change site name to something short, e.g. `grand-menu`.

### Option B — Vercel
1. Create a free account at https://vercel.com.
2. Upload the folder to a GitHub repository (github.com → New → upload files).
3. In Vercel: Add New → Project → import that repository.
4. Framework Preset: **Other**. Leave Build Command and Output Directory empty. Deploy.

Either way, to update the menu later: change `menu-data.js`, then upload/push
again. Prices refresh straight away because those files are not cached.

**Optional:** connect your own domain (e.g. `menu.yourhotel.com`) in the
Domains section of Netlify/Vercel. After that, uncomment the `canonical` line
in `index.html` and use your real address.

## 4. Make the QR code

1. Copy your final website address (use your own domain if possible).
2. Make a **static** QR code (it never expires) with a free generator such as
   https://www.qrcode-monkey.com or Canva's QR tool. Avoid "dynamic" QR codes
   that stop working after a free trial.
3. Optional — one QR per table so staff know where the customer is: add
   `?table=5` to the address (`https://your-site.com/?table=5`). The header
   then shows a "Table 5" tag.
4. Download as PNG/SVG at high resolution and **test it with two or three
   different phones** before printing.
5. Print at least 3 × 3 cm (4–5 cm is better) in dark ink on a light background,
   on matte material (glossy tent cards can glare), and add a line such as
   "Scan to see our menu".

## Troubleshooting
- **Blank menu:** a typo in `menu-data.js` (missing comma, quote or bracket).
  Press F12 → Console to see the exact line.
- **A photo doesn't show:** check the file name and capitals in `image`.
- **WhatsApp button missing:** `whatsapp` is empty in `HOTEL_INFO`.
- **Change colours:** edit the `:root { … }` block at the top of `style.css`.
