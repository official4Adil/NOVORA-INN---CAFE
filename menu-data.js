/* =============================================================================
   menu-data.js  —  THE ONLY FILE YOU NEED TO EDIT FOR DAY-TO-DAY CHANGES
   -----------------------------------------------------------------------------
   1. HOTEL_INFO       → name, tagline, phone, WhatsApp, address, opening hours
   2. MENU_CATEGORIES  → the tabs shown under the header (order = display order)
   3. MENU_ITEMS       → every dish on the menu

   Items below come from your menu_items.xlsx, kept as printed (original
   spellings and prices). Everything marked  >>> PLACEHOLDER <<<  is NOT real
   hotel information — replace it before going live.
   ========================================================================== */


/* -----------------------------------------------------------------------------
   1. HOTEL INFORMATION      >>> PLACEHOLDER — replace every value below <<<
   ----------------------------------------------------------------------------- */
const HOTEL_INFO = {
  name: "VEG CAFE",                       // >>> PLACEHOLDER <<<
  tagline: "Pure Veg",             // >>> PLACEHOLDER <<<
  logo: "assets/logo.png",                       // replace the file in /assets (keep the name, or change it here)

  // Phone number shown on the "Call" button. Leave "" to hide the button.
  phone: "+9180236674",                      // >>> PLACEHOLDER <<<

  // WhatsApp number: country code + number, digits only (e.g. "919876543210").
  // Leave "" to hide the green WhatsApp button completely.
  whatsapp: "9180236674",                      // >>> PLACEHOLDER <<<
  whatsappMessage: "Hello! I have a question about the menu.",

  address: "Kanchinagara, Sringeri, Karnataka, 577139",     // >>> PLACEHOLDER <<<
  // Optional: paste the "Share" link from Google Maps. If left "", a map search
  // link is built from the address above.
  mapsUrl: "https://maps.app.goo.gl/TUomyzgX5JXJ4pJ38",

  // Opening hours — 24-hour "HH:MM". If you close after midnight, just enter the
  // later time (e.g. open "18:00", close "01:00") and it is handled correctly.
  hours: {
    open: "07:00",                               // >>> PLACEHOLDER <<<
    close: "22:30",                              // >>> PLACEHOLDER <<<
    closedDays: [],                              // days fully closed: 0 = Sunday … 6 = Saturday, e.g. [2]
    timezone: "Asia/Kolkata"                     // used for the "Open now" badge
  },

  // Optional note at the bottom of the page. Leave "" to hide it.
  footerNote: "Prices are in Indian Rupees (₹). Please tell our staff about any allergies or dietary needs.",

  // Optional, helps Google understand the page, e.g. ["South Indian", "North Indian"]
  cuisine: []
};


/* -----------------------------------------------------------------------------
   2. CATEGORIES
   Each item below refers to a category by its `id`. Add, rename or reorder
   freely — the navigation chips and sections are generated from this list.
   ----------------------------------------------------------------------------- */
const MENU_CATEGORIES = [
  { id: "breakfast", name: "Breakfast" },
  { id: "dosa", name: "Dosa" },
  { id: "starters", name: "Starters" },
  { id: "soups", name: "Soups" },
  { id: "main-course", name: "Main Course" },
  { id: "gravies", name: "Gravies" },
  { id: "breads-tandoori", name: "Tandoori & Breads" },
  { id: "rice-biryani", name: "Thali, Biryani & Rice" },
  { id: "chinese", name: "Chinese Rice & Noodles" },
  { id: "sides", name: "Raitha, Salad & Papad" },
  { id: "light-snacks", name: "Light Snacks" },
  { id: "hot-beverages", name: "Hot Beverages" },
  { id: "juices", name: "Fresh Juices" },
  { id: "milkshakes", name: "Milkshakes" },
  { id: "desserts", name: "Ice Cream & Fruit Salads" }
];


/* -----------------------------------------------------------------------------
   3. MENU ITEMS  (from menu_items.xlsx — prices in ₹)

   Fields
     id           unique, lowercase, no spaces (also handy as the photo file name)
     category     must match an id from MENU_CATEGORIES above
     group        optional sub-heading inside a category (items with the same
                  group are listed together; headings show only when a category
                  has more than one group)
     name         dish name
     price        number only — no ₹ sign
     veg          true = vegetarian (green mark), false = non-vegetarian (red mark)
     description  optional short text ("" to leave blank)
     image        optional photo path, e.g. "assets/food-images/masala-dosa.jpg"
                  ("" = text-only row)

   NOTE: your menu lists only vegetarian dishes, so every item is veg: true.
   If you add a non-veg dish, set veg: false — a Veg / Non-veg filter then
   appears automatically.

   Adding a photo: save it in assets/food-images/ and put its path in `image`.
   ----------------------------------------------------------------------------- */
const MENU_ITEMS = [

  // ---------- Breakfast ----------
  { id: "idli-2pc", category: "breakfast", group: "Breakfast", name: "Idli (2Pc)", price: 40, veg: true, description: "", image: "" },
  { id: "idli-1pc", category: "breakfast", group: "Breakfast", name: "Idli (1pc)", price: 30, veg: true, description: "", image: "" },
  { id: "idli-vada-2-1", category: "breakfast", group: "Breakfast", name: "Idli Vada (2+1)", price: 70, veg: true, description: "", image: "" },
  { id: "idli-vada-1-1", category: "breakfast", group: "Breakfast", name: "Idli Vada (1+1)", price: 50, veg: true, description: "", image: "" },
  { id: "rava-idli-2pc", category: "breakfast", group: "Breakfast", name: "Rava Idli (2Pc)", price: 60, veg: true, description: "", image: "" },
  { id: "rava-idli-1pc", category: "breakfast", group: "Breakfast", name: "Rava Idli (1Pc)", price: 35, veg: true, description: "", image: "" },
  { id: "vada-2pc", category: "breakfast", group: "Breakfast", name: "Vada (2Pc)", price: 60, veg: true, description: "", image: "" },
  { id: "vada-1pc", category: "breakfast", group: "Breakfast", name: "Vada (1Pc)", price: 30, veg: true, description: "", image: "" },
  { id: "chow-chow-bath", category: "breakfast", group: "Breakfast", name: "Chow Chow Bath", price: 60, veg: true, description: "", image: "" },
  { id: "rava-kesari", category: "breakfast", group: "Breakfast", name: "Rava Kesari", price: 50, veg: true, description: "", image: "" },
  { id: "puri-sagu", category: "breakfast", group: "Breakfast", name: "Puri Sagu", price: 70, veg: true, description: "", image: "" },
  { id: "buns-2pc", category: "breakfast", group: "Breakfast", name: "Buns(2Pc)", price: 60, veg: true, description: "", image: "" },
  { id: "buns-1pc", category: "breakfast", group: "Breakfast", name: "Buns (1Pc)", price: 30, veg: true, description: "", image: "" },

  // ---------- Dosa ----------
  { id: "plain-dosa", category: "dosa", group: "Dosa", name: "Plain Dosa", price: 50, veg: true, description: "", image: "" },
  { id: "masala-dosa", category: "dosa", group: "Dosa", name: "Masala Dosa", price: 70, veg: true, description: "", image: "" },
  { id: "ghee-plain-dosa", category: "dosa", group: "Dosa", name: "Ghee Plain Dosa", price: 80, veg: true, description: "", image: "" },
  { id: "ghee-masala-dosa", category: "dosa", group: "Dosa", name: "Ghee Masala Dosa", price: 80, veg: true, description: "", image: "" },
  { id: "butter-plian-dosa", category: "dosa", group: "Dosa", name: "Butter Plian Dosa", price: 70, veg: true, description: "", image: "" },
  { id: "butter-masala-dosa", category: "dosa", group: "Dosa", name: "Butter Masala Dosa", price: 80, veg: true, description: "", image: "" },
  { id: "sada-dosa", category: "dosa", group: "Dosa", name: "Sada Dosa", price: 60, veg: true, description: "", image: "" },
  { id: "sada-dosa-single", category: "dosa", group: "Dosa", name: "Sada Dosa Single", price: 35, veg: true, description: "", image: "" },
  { id: "set-dosa", category: "dosa", group: "Dosa", name: "Set Dosa", price: 70, veg: true, description: "", image: "" },
  { id: "neer-dosa", category: "dosa", group: "Dosa", name: "Neer Dosa", price: 50, veg: true, description: "", image: "" },
  { id: "onion-uttappam", category: "dosa", group: "Dosa", name: "Onion Uttappam", price: 80, veg: true, description: "", image: "" },
  { id: "open-butter-masala", category: "dosa", group: "Dosa", name: "Open Butter Masala", price: 100, veg: true, description: "", image: "" },
  { id: "mysore-masala", category: "dosa", group: "Dosa", name: "Mysore Masala", price: 100, veg: true, description: "", image: "" },
  { id: "ade-dosa", category: "dosa", group: "Dosa", name: "Ade Dosa", price: 90, veg: true, description: "", image: "" },
  { id: "pizza-dosa", category: "dosa", group: "Dosa", name: "Pizza Dosa", price: 100, veg: true, description: "", image: "" },
  { id: "veg-uttappam", category: "dosa", group: "Dosa", name: "Veg Uttappam", price: 100, veg: true, description: "", image: "" },
  { id: "sring-dosa", category: "dosa", group: "Dosa", name: "Sring Dosa", price: 130, veg: true, description: "", image: "" },
  { id: "raagi-roti", category: "dosa", group: "Dosa", name: "Raagi Roti", price: 70, veg: true, description: "", image: "" },
  { id: "akki-roti-2pc", category: "dosa", group: "Dosa", name: "Akki Roti (2pc)", price: 60, veg: true, description: "", image: "" },
  { id: "green-pease-dosa", category: "dosa", group: "Dosa", name: "Green Pease Dosa", price: 80, veg: true, description: "", image: "" },
  { id: "dosa-combo", category: "dosa", group: "Dosa", name: "Dosa Combo", price: 250, veg: true, description: "", image: "" },
  { id: "tiffin-cambo", category: "dosa", group: "Dosa", name: "Tiffin Cambo", price: 150, veg: true, description: "", image: "" },
  { id: "rava-masala-dosa", category: "dosa", group: "Dosa", name: "Rava Masala Dosa", price: 100, veg: true, description: "", image: "" },
  { id: "rava-onion-dosa", category: "dosa", group: "Dosa", name: "Rava Onion Dosa", price: 110, veg: true, description: "", image: "" },
  { id: "rava-onion-masala", category: "dosa", group: "Dosa", name: "Rava Onion Masala", price: 120, veg: true, description: "", image: "" },
  { id: "rava-mysore-dosa", category: "dosa", group: "Dosa", name: "Rava Mysore Dosa", price: 130, veg: true, description: "", image: "" },
  { id: "cafe-special-dosa", category: "dosa", group: "Dosa", name: "Cafe Special Dosa", price: 150, veg: true, description: "", image: "" },
  { id: "paneer-masala-dosa", category: "dosa", group: "Dosa", name: "Paneer Masala Dosa", price: 130, veg: true, description: "", image: "" },
  { id: "cheese-masala-dosa", category: "dosa", group: "Dosa", name: "Cheese Masala Dosa", price: 140, veg: true, description: "", image: "" },

  // ---------- Starters ----------
  { id: "paneer-dragon", category: "starters", group: "Starters", name: "Paneer Dragon", price: 150, veg: true, description: "", image: "" },
  { id: "veg-crispy", category: "starters", group: "Starters", name: "Veg Crispy", price: 100, veg: true, description: "", image: "" },
  { id: "pineapple-crispy", category: "starters", group: "Starters", name: "Pineapple Crispy", price: 120, veg: true, description: "", image: "" },
  { id: "paneer-burji", category: "starters", group: "Starters", name: "Paneer Burji", price: 200, veg: true, description: "", image: "" },
  { id: "paneer-pepper-semi-gravy", category: "starters", group: "Starters", name: "Paneer Pepper - Semi Gravy", price: 200, veg: true, description: "", image: "" },
  { id: "mushroom-pepper-semi-gravy", category: "starters", group: "Starters", name: "Mushroom Pepper Semi Gravy", price: 200, veg: true, description: "", image: "" },
  { id: "lemon-pepper-manchurian", category: "starters", group: "Starters", name: "Lemon Pepper Manchurian", price: 200, veg: true, description: "", image: "" },
  { id: "mushroom-paneer-manchurian", category: "starters", group: "Starters", name: "Mushroom Paneer Manchurian", price: 200, veg: true, description: "", image: "" },
  { id: "babycorn-paneer-manchurian", category: "starters", group: "Starters", name: "Babycorn Paneer Manchurian", price: 200, veg: true, description: "", image: "" },
  { id: "white-manchurian", category: "starters", group: "Starters", name: "White Manchurian", price: 120, veg: true, description: "", image: "" },
  { id: "potato-honey-chilly", category: "starters", group: "Starters", name: "Potato Honey Chilly", price: 150, veg: true, description: "", image: "" },
  { id: "veg-manchurian", category: "starters", group: "Starters", name: "Veg Manchurian", price: 100, veg: true, description: "", image: "" },
  { id: "musroom-kabab", category: "starters", group: "Starters", name: "Musroom Kabab", price: 200, veg: true, description: "", image: "" },
  { id: "paneer-kabab", category: "starters", group: "Starters", name: "Paneer Kabab", price: 200, veg: true, description: "", image: "" },
  { id: "paneer-65", category: "starters", group: "Snacks", name: "Paneer 65", price: 150, veg: true, description: "", image: "" },
  { id: "paneer-chilly", category: "starters", group: "Snacks", name: "Paneer Chilly", price: 160, veg: true, description: "", image: "" },
  { id: "paneer-manchurian", category: "starters", group: "Snacks", name: "Paneer Manchurian", price: 150, veg: true, description: "", image: "" },
  { id: "paneer-ghee-roast", category: "starters", group: "Snacks", name: "Paneer Ghee Roast", price: 180, veg: true, description: "", image: "" },
  { id: "paneer-pepper-dry", category: "starters", group: "Snacks", name: "Paneer Pepper Dry", price: 180, veg: true, description: "", image: "" },
  { id: "gobi-manchirian", category: "starters", group: "Snacks", name: "Gobi Manchirian", price: 100, veg: true, description: "", image: "" },
  { id: "gobi-chilly", category: "starters", group: "Snacks", name: "Gobi Chilly", price: 130, veg: true, description: "", image: "" },
  { id: "gobi-pepper-dry", category: "starters", group: "Snacks", name: "Gobi Pepper Dry", price: 130, veg: true, description: "", image: "" },
  { id: "mushroom-chilly", category: "starters", group: "Snacks", name: "Mushroom Chilly", price: 160, veg: true, description: "", image: "" },
  { id: "mushroom-manchurian", category: "starters", group: "Snacks", name: "Mushroom Manchurian", price: 160, veg: true, description: "", image: "" },
  { id: "mushroom-ghee-roast", category: "starters", group: "Snacks", name: "Mushroom Ghee Roast", price: 170, veg: true, description: "", image: "" },
  { id: "mushroom-pepper-dry", category: "starters", group: "Snacks", name: "Mushroom pepper Dry", price: 160, veg: true, description: "", image: "" },
  { id: "babycorn-chilly", category: "starters", group: "Snacks", name: "Babycorn Chilly", price: 160, veg: true, description: "", image: "" },
  { id: "babycorn-manchurian", category: "starters", group: "Snacks", name: "Babycorn Manchurian", price: 160, veg: true, description: "", image: "" },
  { id: "babycorn-pepper-dry", category: "starters", group: "Snacks", name: "Babycorn pepper Dry", price: 160, veg: true, description: "", image: "" },
  { id: "french-fries", category: "starters", group: "Snacks", name: "French Fries", price: 90, veg: true, description: "", image: "" },
  { id: "veg-ball", category: "starters", group: "Snacks", name: "Veg ball", price: 180, veg: true, description: "", image: "" },
  { id: "chesse-ball", category: "starters", group: "Snacks", name: "Chesse Ball", price: 180, veg: true, description: "", image: "" },
  { id: "veg-nuggets", category: "starters", group: "Snacks", name: "Veg Nuggets", price: 180, veg: true, description: "", image: "" },
  { id: "onion-rings", category: "starters", group: "Snacks", name: "Onion Rings", price: 120, veg: true, description: "", image: "" },

  // ---------- Soups ----------
  { id: "palak-soup", category: "soups", group: "Soups", name: "Palak Soup", price: 70, veg: true, description: "", image: "" },
  { id: "tomato-soup", category: "soups", group: "Soups", name: "Tomato Soup", price: 60, veg: true, description: "", image: "" },
  { id: "veg-clear-soup", category: "soups", group: "Soups", name: "Veg Clear Soup", price: 70, veg: true, description: "", image: "" },
  { id: "hot-n-sour-soup", category: "soups", group: "Soups", name: "Hot N Sour Soup", price: 80, veg: true, description: "", image: "" },
  { id: "veg-manchow-soup", category: "soups", group: "Soups", name: "Veg Manchow Soup", price: 90, veg: true, description: "", image: "" },
  { id: "babycorn-soup", category: "soups", group: "Soups", name: "Babycorn Soup", price: 80, veg: true, description: "", image: "" },
  { id: "mushroom-soup", category: "soups", group: "Soups", name: "Mushroom Soup", price: 90, veg: true, description: "", image: "" },
  { id: "lemon-coriander-soup", category: "soups", group: "Soups", name: "Lemon Coriander Soup", price: 80, veg: true, description: "", image: "" },
  { id: "mixed-veg-noodles-soup", category: "soups", group: "Soups", name: "Mixed Veg Noodles Soup", price: 90, veg: true, description: "", image: "" },
  { id: "sweet-corn-soup", category: "soups", group: "Soups", name: "Sweet Corn Soup", price: 120, veg: true, description: "", image: "" },

  // ---------- Main Course ----------
  { id: "dal-fry", category: "main-course", group: "Main Course", name: "Dal Fry", price: 130, veg: true, description: "", image: "" },
  { id: "dal-tadka", category: "main-course", group: "Main Course", name: "Dal Tadka", price: 160, veg: true, description: "", image: "" },
  { id: "veg-kurma", category: "main-course", group: "Main Course", name: "Veg Kurma", price: 150, veg: true, description: "", image: "" },
  { id: "gobi-masala", category: "main-course", group: "Main Course", name: "Gobi Masala", price: 160, veg: true, description: "", image: "" },
  { id: "aloo-mattar-masal", category: "main-course", group: "Main Course", name: "Aloo Mattar Masal", price: 170, veg: true, description: "", image: "" },
  { id: "plain-palak", category: "main-course", group: "Main Course", name: "Plain Palak", price: 140, veg: true, description: "", image: "" },
  { id: "palak-paneer", category: "main-course", group: "Main Course", name: "Palak Paneer", price: 190, veg: true, description: "", image: "" },
  { id: "aloo-palak", category: "main-course", group: "Main Course", name: "Aloo palak", price: 150, veg: true, description: "", image: "" },
  { id: "veg-kolhapuri", category: "main-course", group: "Main Course", name: "Veg kolhapuri", price: 180, veg: true, description: "", image: "" },
  { id: "babycorn-masal", category: "main-course", group: "Main Course", name: "Babycorn Masal", price: 190, veg: true, description: "", image: "" },
  { id: "kaju-masala-kaju-paneer", category: "main-course", group: "Main Course", name: "Kaju masala/ Kaju Paneer", price: 220, veg: true, description: "", image: "" },
  { id: "mix-veg-curry", category: "main-course", group: "Main Course", name: "Mix Veg Curry", price: 160, veg: true, description: "", image: "" },
  { id: "mashroom-masala", category: "main-course", group: "Main Course", name: "Mashroom Masala", price: 185, veg: true, description: "", image: "" },
  { id: "paneer-butter-masala", category: "main-course", group: "Main Course", name: "Paneer Butter Masala", price: 195, veg: true, description: "", image: "" },
  { id: "paneer-tikka-masala", category: "main-course", group: "Main Course", name: "Paneer Tikka Masala", price: 200, veg: true, description: "", image: "" },
  { id: "shahi-paneer", category: "main-course", group: "Main Course", name: "Shahi Paneer", price: 190, veg: true, description: "", image: "" },
  { id: "kadai-paneer", category: "main-course", group: "Main Course", name: "Kadai paneer", price: 190, veg: true, description: "", image: "" },
  { id: "kadai-kaju", category: "main-course", group: "Main Course", name: "Kadai kaju", price: 220, veg: true, description: "", image: "" },
  { id: "vegetable-dry", category: "main-course", group: "Main Course", name: "Vegetable Dry", price: 180, veg: true, description: "", image: "" },
  { id: "bendi-fry", category: "main-course", group: "Main Course", name: "Bendi Fry", price: 150, veg: true, description: "", image: "" },
  { id: "bendi-masala", category: "main-course", group: "Main Course", name: "Bendi Masala", price: 150, veg: true, description: "", image: "" },

  // ---------- Gravies ----------
  { id: "veg-hydrabadi", category: "gravies", group: "Gravy", name: "Veg hydrabadi", price: 200, veg: true, description: "", image: "" },
  { id: "veg-kofta", category: "gravies", group: "Gravy", name: "Veg kofta", price: 200, veg: true, description: "", image: "" },
  { id: "malai-kofta", category: "gravies", group: "Gravy", name: "Malai Kofta", price: 200, veg: true, description: "", image: "" },
  { id: "paneer-kolhapuri", category: "gravies", group: "Gravy", name: "Paneer Kolhapuri", price: 200, veg: true, description: "", image: "" },
  { id: "mushroom-kolhapuri", category: "gravies", group: "Gravy", name: "Mushroom kolhapuri", price: 200, veg: true, description: "", image: "" },
  { id: "babycorn-masala", category: "gravies", group: "Gravy", name: "Babycorn masala", price: 200, veg: true, description: "", image: "" },
  { id: "kolhapuri", category: "gravies", group: "Gravy", name: "Kolhapuri", price: 200, veg: true, description: "", image: "" },
  { id: "aloo-gobi-dry", category: "gravies", group: "Gravy", name: "Aloo Gobi Dry", price: 100, veg: true, description: "", image: "" },
  { id: "aloo-gobi-masala", category: "gravies", group: "Gravy", name: "Aloo Gobi Masala", price: 140, veg: true, description: "", image: "" },
  { id: "aloo-jeera-dry", category: "gravies", group: "Gravy", name: "Aloo jeera Dry", price: 140, veg: true, description: "", image: "" },
  { id: "capsicum-masala", category: "gravies", group: "Gravy", name: "Capsicum Masala", price: 180, veg: true, description: "", image: "" },
  { id: "palak-corn-masala", category: "gravies", group: "Gravy", name: "Palak Corn masala", price: 200, veg: true, description: "", image: "" },
  { id: "veg-patiala", category: "gravies", group: "Gravy", name: "Veg Patiala", price: 200, veg: true, description: "", image: "" },
  { id: "mushroom-kadai", category: "gravies", group: "Gravy", name: "Mushroom Kadai", price: 190, veg: true, description: "", image: "" },
  { id: "paneer-kadai", category: "gravies", group: "Gravy", name: "Paneer Kadai", price: 190, veg: true, description: "", image: "" },
  { id: "paneer-chilly-gravy", category: "gravies", group: "Special Gravy", name: "Paneer Chilly Gravy", price: 190, veg: true, description: "", image: "" },
  { id: "mushroom-chilly-gravy", category: "gravies", group: "Special Gravy", name: "Mushroom Chilly Gravy", price: 180, veg: true, description: "", image: "" },
  { id: "babycorn-chilly-gravy", category: "gravies", group: "Special Gravy", name: "Babycorn Chilly Gravy", price: 180, veg: true, description: "", image: "" },
  { id: "gobi-chilly-gravy", category: "gravies", group: "Special Gravy", name: "Gobi Chilly Gravy", price: 170, veg: true, description: "", image: "" },

  // ---------- Tandoori & Breads ----------
  { id: "roti", category: "breads-tandoori", group: "Breads", name: "Roti", price: 35, veg: true, description: "", image: "" },
  { id: "butter-roti", category: "breads-tandoori", group: "Breads", name: "Butter Roti", price: 45, veg: true, description: "", image: "" },
  { id: "naan", category: "breads-tandoori", group: "Breads", name: "Naan", price: 50, veg: true, description: "", image: "" },
  { id: "butter-nann", category: "breads-tandoori", group: "Breads", name: "Butter Nann", price: 60, veg: true, description: "", image: "" },
  { id: "garlic-naan", category: "breads-tandoori", group: "Breads", name: "Garlic Naan", price: 60, veg: true, description: "", image: "" },
  { id: "kulcha", category: "breads-tandoori", group: "Breads", name: "Kulcha", price: 50, veg: true, description: "", image: "" },
  { id: "butter-kulcha", category: "breads-tandoori", group: "Breads", name: "Butter Kulcha", price: 60, veg: true, description: "", image: "" },
  { id: "masala-kulcha", category: "breads-tandoori", group: "Breads", name: "Masala Kulcha", price: 85, veg: true, description: "", image: "" },
  { id: "aloo-kulcha", category: "breads-tandoori", group: "Breads", name: "Aloo Kulcha", price: 75, veg: true, description: "", image: "" },
  { id: "roti-curry", category: "breads-tandoori", group: "Breads", name: "Roti Curry", price: 110, veg: true, description: "", image: "" },
  { id: "masala-tikka", category: "breads-tandoori", group: "Tandoori", name: "Masala Tikka", price: 200, veg: true, description: "", image: "" },
  { id: "mushroom-tikka", category: "breads-tandoori", group: "Tandoori", name: "Mushroom Tikka", price: 200, veg: true, description: "", image: "" },

  // ---------- Thali, Biryani & Rice ----------
  { id: "north-indian-thali", category: "rice-biryani", group: "Thali", name: "North Indian Thali", price: 150, veg: true, description: "Soup, Dal, Paneer, Mix Veg Curry, Curd, Jeera Rice, Roti 2pcs, Papad and Pickle, Sweet", image: "" },
  { id: "veg-biryani", category: "rice-biryani", group: "Biryani, Palav & Rice", name: "Veg biryani", price: 150, veg: true, description: "", image: "" },
  { id: "handi-biryani", category: "rice-biryani", group: "Biryani, Palav & Rice", name: "Handi Biryani", price: 170, veg: true, description: "", image: "" },
  { id: "muglai-biryani", category: "rice-biryani", group: "Biryani, Palav & Rice", name: "Muglai Biryani", price: 170, veg: true, description: "", image: "" },
  { id: "mushroom-biryani", category: "rice-biryani", group: "Biryani, Palav & Rice", name: "Mushroom Biryani", price: 190, veg: true, description: "", image: "" },
  { id: "paneer-biryani", category: "rice-biryani", group: "Biryani, Palav & Rice", name: "Paneer Biryani", price: 190, veg: true, description: "", image: "" },
  { id: "veg-pulav", category: "rice-biryani", group: "Biryani, Palav & Rice", name: "Veg Pulav", price: 130, veg: true, description: "", image: "" },
  { id: "peas-pulav", category: "rice-biryani", group: "Biryani, Palav & Rice", name: "Peas Pulav", price: 130, veg: true, description: "", image: "" },
  { id: "steam-rice", category: "rice-biryani", group: "Biryani, Palav & Rice", name: "Steam Rice", price: 90, veg: true, description: "", image: "" },
  { id: "jeera-rice", category: "rice-biryani", group: "Biryani, Palav & Rice", name: "Jeera Rice", price: 120, veg: true, description: "", image: "" },
  { id: "curd-rice", category: "rice-biryani", group: "Biryani, Palav & Rice", name: "Curd Rice", price: 100, veg: true, description: "", image: "" },
  { id: "palak-kichdi", category: "rice-biryani", group: "Biryani, Palav & Rice", name: "Palak Kichdi", price: 180, veg: true, description: "", image: "" },
  { id: "dal-kichdi", category: "rice-biryani", group: "Biryani, Palav & Rice", name: "Dal Kichdi", price: 170, veg: true, description: "", image: "" },

  // ---------- Chinese Rice & Noodles ----------
  { id: "mixed-veg-fried-rice", category: "chinese", group: "Chinese Rice", name: "Mixed Veg Fried rice", price: 160, veg: true, description: "", image: "" },
  { id: "gobi-fried-rice", category: "chinese", group: "Chinese Rice", name: "Gobi Fried Rice", price: 170, veg: true, description: "", image: "" },
  { id: "paneer-pulav", category: "chinese", group: "Chinese Rice", name: "Paneer Pulav", price: 190, veg: true, description: "", image: "" },
  { id: "mushroom-noodles", category: "chinese", group: "Chinese Rice", name: "Mushroom Noodles", price: 160, veg: true, description: "", image: "" },
  { id: "veg-hakka-noodles", category: "chinese", group: "Chinese Rice", name: "Veg hakka Noodles", price: 160, veg: true, description: "", image: "" },
  { id: "veg-singapore-noodles", category: "chinese", group: "Chinese Rice", name: "Veg Singapore Noodles", price: 180, veg: true, description: "", image: "" },
  { id: "veg-singapore-rice", category: "chinese", group: "Chinese Rice", name: "Veg Singapore Rice", price: 160, veg: true, description: "", image: "" },
  { id: "ghee-rice", category: "chinese", group: "Chinese Rice", name: "Ghee Rice", price: 140, veg: true, description: "", image: "" },
  { id: "jeera-rice-2", category: "chinese", group: "Chinese Rice", name: "Jeera Rice", price: 130, veg: true, description: "", image: "" },
  { id: "mushroom-friedrice", category: "chinese", group: "Chinese Rice", name: "Mushroom Friedrice", price: 150, veg: true, description: "", image: "" },
  { id: "panneer-friedrice", category: "chinese", group: "Chinese Rice", name: "Panneer Friedrice", price: 160, veg: true, description: "", image: "" },
  { id: "lamen-rice", category: "chinese", group: "Chinese Rice", name: "Lamen Rice", price: 100, veg: true, description: "", image: "" },
  { id: "veg-fried-rice", category: "chinese", group: "Rice & Noodles", name: "Veg Fried Rice", price: 140, veg: true, description: "", image: "" },
  { id: "schezwan-fried-rice", category: "chinese", group: "Rice & Noodles", name: "Schezwan Fried rice", price: 150, veg: true, description: "", image: "" },
  { id: "garlic-fried-rice", category: "chinese", group: "Rice & Noodles", name: "Garlic Fried Rice", price: 160, veg: true, description: "", image: "" },
  { id: "veg-noodles", category: "chinese", group: "Rice & Noodles", name: "Veg Noodles", price: 140, veg: true, description: "", image: "" },
  { id: "veg-schezwan-noodles", category: "chinese", group: "Rice & Noodles", name: "Veg Schezwan noodles", price: 160, veg: true, description: "", image: "" },
  { id: "veg-hot-garlic-noodles", category: "chinese", group: "Rice & Noodles", name: "Veg Hot garlic Noodles", price: 160, veg: true, description: "", image: "" },

  // ---------- Raitha, Salad & Papad ----------
  { id: "mix-veg-raitha", category: "sides", group: "Raitha, Salad & Papad", name: "Mix Veg Raitha", price: 70, veg: true, description: "", image: "" },
  { id: "pinapple-raitha", category: "sides", group: "Raitha, Salad & Papad", name: "Pinapple Raitha", price: 80, veg: true, description: "", image: "" },
  { id: "masala-papad", category: "sides", group: "Raitha, Salad & Papad", name: "Masala Papad", price: 60, veg: true, description: "", image: "" },
  { id: "roasted-papad", category: "sides", group: "Raitha, Salad & Papad", name: "Roasted Papad", price: 50, veg: true, description: "", image: "" },
  { id: "green-salad", category: "sides", group: "Raitha, Salad & Papad", name: "Green salad", price: 90, veg: true, description: "", image: "" },
  { id: "cucumber-salad", category: "sides", group: "Raitha, Salad & Papad", name: "Cucumber Salad", price: 90, veg: true, description: "", image: "" },

  // ---------- Light Snacks ----------
  { id: "vada-pav", category: "light-snacks", group: "Snacks", name: "Vada Pav", price: 70, veg: true, description: "", image: "" },
  { id: "pav-bhaji", category: "light-snacks", group: "Snacks", name: "Pav Bhaji", price: 60, veg: true, description: "", image: "" },
  { id: "onion-pakoda", category: "light-snacks", group: "Snacks", name: "Onion pakoda", price: 70, veg: true, description: "", image: "" },
  { id: "capsicum-bajji", category: "light-snacks", group: "Snacks", name: "Capsicum bajji", price: 70, veg: true, description: "", image: "" },
  { id: "aloo-bajji", category: "light-snacks", group: "Snacks", name: "Aloo bajji", price: 70, veg: true, description: "", image: "" },
  { id: "shavige-bath", category: "light-snacks", group: "Snacks", name: "Shavige bath", price: 60, veg: true, description: "", image: "" },
  { id: "bonda-soup", category: "light-snacks", group: "Snacks", name: "Bonda Soup", price: 60, veg: true, description: "", image: "" },

  // ---------- Hot Beverages ----------
  { id: "coffee", category: "hot-beverages", group: "Hot Beverages", name: "Coffee", price: 30, veg: true, description: "", image: "" },
  { id: "tea", category: "hot-beverages", group: "Hot Beverages", name: "Tea", price: 25, veg: true, description: "", image: "" },
  { id: "masala-tea", category: "hot-beverages", group: "Hot Beverages", name: "Masala Tea", price: 30, veg: true, description: "", image: "" },
  { id: "lemon-tea", category: "hot-beverages", group: "Hot Beverages", name: "Lemon Tea", price: 30, veg: true, description: "", image: "" },
  { id: "milk", category: "hot-beverages", group: "Hot Beverages", name: "Milk", price: 30, veg: true, description: "", image: "" },
  { id: "boost", category: "hot-beverages", group: "Hot Beverages", name: "Boost", price: 35, veg: true, description: "", image: "" },
  { id: "bournvita", category: "hot-beverages", group: "Hot Beverages", name: "Bournvita", price: 35, veg: true, description: "", image: "" },
  { id: "kashaya", category: "hot-beverages", group: "Hot Beverages", name: "Kashaya", price: 35, veg: true, description: "", image: "" },
  { id: "horlicks", category: "hot-beverages", group: "Hot Beverages", name: "Horlicks", price: 35, veg: true, description: "", image: "" },

  // ---------- Fresh Juices ----------
  { id: "pineapple-juice", category: "juices", group: "Fresh Juices", name: "Pineapple Juice", price: 80, veg: true, description: "", image: "" },
  { id: "watermelon-juice", category: "juices", group: "Fresh Juices", name: "Watermelon Juice", price: 80, veg: true, description: "", image: "" },
  { id: "muskmelon-juice", category: "juices", group: "Fresh Juices", name: "Muskmelon Juice", price: 80, veg: true, description: "", image: "" },
  { id: "musumbe-juice", category: "juices", group: "Fresh Juices", name: "Musumbe Juice", price: 60, veg: true, description: "", image: "" },
  { id: "orange-juice", category: "juices", group: "Fresh Juices", name: "Orange Juice", price: 60, veg: true, description: "", image: "" },
  { id: "grapes-juice", category: "juices", group: "Fresh Juices", name: "Grapes Juice", price: 60, veg: true, description: "", image: "" },
  { id: "lamen-juice", category: "juices", group: "Fresh Juices", name: "Lamen Juice", price: 50, veg: true, description: "", image: "" },
  { id: "lamen-soda", category: "juices", group: "Fresh Juices", name: "Lamen Soda", price: 50, veg: true, description: "", image: "" },
  { id: "sweet-lasi", category: "juices", group: "Fresh Juices", name: "Sweet Lasi", price: 50, veg: true, description: "", image: "" },

  // ---------- Milkshakes ----------
  { id: "muskmelon-milkshake", category: "milkshakes", group: "Milkshakes", name: "Muskmelon Milkshake", price: 95, veg: true, description: "", image: "" },
  { id: "strawberry-milkshake", category: "milkshakes", group: "Milkshakes", name: "Strawberry Milkshake", price: 95, veg: true, description: "", image: "" },
  { id: "chocolate-milkshake", category: "milkshakes", group: "Milkshakes", name: "Chocolate Milkshake", price: 95, veg: true, description: "", image: "" },
  { id: "vanilla-milkshake", category: "milkshakes", group: "Milkshakes", name: "Vanilla Milkshake", price: 95, veg: true, description: "", image: "" },
  { id: "butterscotch-milkshake", category: "milkshakes", group: "Milkshakes", name: "Butterscotch Milkshake", price: 95, veg: true, description: "", image: "" },
  { id: "chikku-milkshake", category: "milkshakes", group: "Milkshakes", name: "Chikku Milkshake", price: 80, veg: true, description: "", image: "" },
  { id: "apple-milkshake", category: "milkshakes", group: "Milkshakes", name: "Apple Milkshake", price: 90, veg: true, description: "", image: "" },
  { id: "pomegranate-dalimbe-milkshake", category: "milkshakes", group: "Milkshakes", name: "Pomegranate (Dalimbe) Milkshake", price: 90, veg: true, description: "", image: "" },

  // ---------- Ice Cream & Fruit Salads ----------
  { id: "butterscotch", category: "desserts", group: "Cone & Kulfi", name: "Butterscotch", price: 50, veg: true, description: "", image: "" },
  { id: "chocolate", category: "desserts", group: "Cone & Kulfi", name: "Chocolate", price: 50, veg: true, description: "", image: "" },
  { id: "black-current", category: "desserts", group: "Cone & Kulfi", name: "Black current", price: 50, veg: true, description: "", image: "" },
  { id: "badami-kulfi", category: "desserts", group: "Cone & Kulfi", name: "Badami Kulfi", price: 50, veg: true, description: "", image: "" },
  { id: "pista-kulfi", category: "desserts", group: "Cone & Kulfi", name: "Pista Kulfi", price: 50, veg: true, description: "", image: "" },
  { id: "strawberry", category: "desserts", group: "Special Scoops", name: "Strawberry", price: 80, veg: true, description: "", image: "" },
  { id: "chocolate-2", category: "desserts", group: "Special Scoops", name: "Chocolate", price: 80, veg: true, description: "", image: "" },
  { id: "vanilla", category: "desserts", group: "Special Scoops", name: "Vanilla", price: 80, veg: true, description: "", image: "" },
  { id: "butterscotch-2", category: "desserts", group: "Special Scoops", name: "Butterscotch", price: 80, veg: true, description: "", image: "" },
  { id: "fruit-salad", category: "desserts", group: "Fruit Salad Specials", name: "Fruit salad", price: 90, veg: true, description: "", image: "" },
  { id: "mix-fruit-salad-with-ice-cream", category: "desserts", group: "Fruit Salad Specials", name: "Mix Fruit salad with Ice Cream", price: 110, veg: true, description: "", image: "" },
  { id: "pineapple-special-with-ice-cream", category: "desserts", group: "Fruit Salad Specials", name: "Pineapple special with Ice Cream", price: 120, veg: true, description: "", image: "" },
  { id: "ghadbhad", category: "desserts", group: "Fruit Salad Specials", name: "Ghadbhad", price: 150, veg: true, description: "", image: "" },
  { id: "miny-ghadbhad", category: "desserts", group: "Fruit Salad Specials", name: "Miny Ghadbhad", price: 100, veg: true, description: "", image: "" },
];
