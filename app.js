/* ==========================================================================
   YA COMPRÉ - Core Application Engine & Interactivity
   ========================================================================== */

// --- Products Database ---
const PRODUCTS_DATA = [
  {
    id: "almohada-cervical",
    title: "Almohada Cervical Ergonómica de Espuma Viscoelástica",
    vendor: "YA COMPRÉ",
    category: "bienestar",
    isBestseller: true,
    price: 149.00,
    originalPrice: 209.00,
    discountPercent: 28,
    rating: 4.9,
    reviewCount: 284,
    image: "assets/images/almohada_cervical.png",
    thumbnails: [
      "assets/images/almohada_cervical.png",
      "assets/images/hero_bg.png"
    ],
    description: "Diseñada con contour ergonómico alineado para la columna. Elimina el dolor de cuello y hombros durante el descanso, garantizando un sueño profundo sin vueltas.",
    stock: 7,
    features: [
      "Núcleo de viscoelástica inteligente de alta densidad",
      "Funda transpirable, lavable y antiácaros",
      "Soporte multinivel para dormir de lado o boca arriba",
      "Garantía de postura correcta por 5 años"
    ],
    usage: "Colocar el lado de curva más alta debajo del cuello. La almohada se adaptará a la anatomía de tu cabeza en menos de 60 segundos."
  },
  {
    id: "cleannova-scrubber",
    title: "CleanNova™ | Limpiador Eléctrico Multiuso Recargable",
    vendor: "YA COMPRÉ",
    category: "hogar",
    isBestseller: true,
    price: 99.00,
    originalPrice: 149.00,
    discountPercent: 33,
    rating: 4.8,
    reviewCount: 192,
    image: "assets/images/cleannova_scrubber.png",
    thumbnails: [
      "assets/images/cleannova_scrubber.png"
    ],
    description: "Limpieza profunda de azulejos, baños, cocinas y vidrios sin esfuerzo físico ni dolor de espalda. Cabezal giratorio de alta potencia.",
    stock: 12,
    features: [
      "Motor super potente de 350 RPM",
      "Batería recargable USB de larga duración",
      "Incluye 4 cabezales intercambiables",
      "Diseño impermeable IPX7"
    ],
    usage: "Selecciona el cepillo adecuado, aplica tu detergente favorito y deja que el motor eléctrico haga el trabajo pesado."
  },
  {
    id: "glowbrush",
    title: "GlowBrush™ Cepillo Alisador Eléctrico Anti-Frizz",
    vendor: "YA COMPRÉ",
    category: "belleza",
    isBestseller: false,
    price: 109.00,
    originalPrice: 159.00,
    discountPercent: 31,
    rating: 4.9,
    reviewCount: 145,
    image: "assets/images/glowbrush.png",
    thumbnails: [
      "assets/images/glowbrush.png"
    ],
    description: "Alisado rápido en minutos sin dañar la fibra capilar. Tecnología iónica que sella la cutícula y elimina el encrespamiento.",
    stock: 9,
    features: [
      "Calentamiento ultra rápido MCH en 30 segundos",
      "Protección térmica de cerámica con queratina",
      "5 niveles de temperatura ajustables (130°C - 200°C)",
      "Apagado automático de seguridad"
    ],
    usage: "Usar sobre el cabello seco. Desliza suavemente desde la raíz hasta las puntas como un cepillo habitual."
  },
  {
    id: "retinol-kit",
    title: "Kit Skincare Retinol 5 PZS Bioaqua | Tratamiento Anti-Edad",
    vendor: "YA COMPRÉ",
    category: "belleza",
    isBestseller: true,
    price: 89.00,
    originalPrice: 129.00,
    discountPercent: 31,
    rating: 4.8,
    reviewCount: 310,
    image: "assets/images/retinol_kit.png",
    thumbnails: [
      "assets/images/retinol_kit.png"
    ],
    description: "Rutina completa de rejuvenecimiento facial. Combate arrugas, manchas y falta de firmeza con el poder del Retinol concentrado.",
    stock: 5,
    features: [
      "Incluye: Limpiador, Tónico, Sérum, Crema de Ojos y Crema Facial",
      "Estimula la producción natural de colágeno",
      "Hidratación intensa por 24 horas",
      "Fórmula suave apta para todo tipo de piel"
    ],
    usage: "Aplicar en orden de rutina diurna y nocturna sobre el rostro limpio con suaves toques ascendentes."
  },
  {
    id: "cortisol-calm",
    title: "Megneta™ Cortisol Calm (60 Cápsulas) | Anti-Estrés",
    vendor: "YA COMPRÉ",
    category: "bienestar",
    isBestseller: true,
    price: 89.00,
    originalPrice: 149.00,
    discountPercent: 40,
    rating: 4.9,
    reviewCount: 420,
    image: "assets/images/cortisol_calm.png",
    thumbnails: [
      "assets/images/cortisol_calm.png"
    ],
    description: "Suplemento botánico avanzado diseñado para reducir los niveles de estrés, ansiedad nocturna y grasa abdominal por cortisol.",
    stock: 14,
    features: [
      "Ashwagandha KSM-66 + Magnesio + L-Teanina",
      "Favorece un descanso reparador profundo",
      "100% Natural, sin somnolencia diurna",
      "Certificación de pureza en laboratorio"
    ],
    usage: "Tomar 2 cápsulas por la noche con un vaso de agua 30 minutos antes de acostarse."
  },
  {
    id: "serum-vitamina-c",
    title: "Serum Vitamina C Iluminador y Antioxidante 30ml",
    vendor: "YA COMPRÉ",
    category: "belleza",
    isBestseller: true,
    price: 59.00,
    originalPrice: 79.00,
    discountPercent: 25,
    rating: 4.7,
    reviewCount: 188,
    image: "assets/images/serum_vitamina_c.png",
    thumbnails: [
      "assets/images/serum_vitamina_c.png"
    ],
    description: "Sérum concentrado con Vitamina C pura y Ácido Hialurónico. Aporta luminosidad instantánea y unifica el tono facial.",
    stock: 18,
    features: [
      "Disminuye manchas oscuras e hiperpigmentación",
      "Protección antioxidante contra radicales libres",
      "Textura ligera de rápida absorción sin sensación grasa"
    ],
    usage: "Aplicar 3 a 4 gotas cada mañana antes de la crema hidratante y el protector solar."
  },
  {
    id: "centella-ampoule",
    title: "SKIN1004 Madagascar Centella Ampoule 55ml | Sérum Calmante",
    vendor: "YA COMPRÉ",
    category: "belleza",
    isBestseller: false,
    price: 89.00,
    originalPrice: 109.00,
    discountPercent: 18,
    rating: 5.0,
    reviewCount: 512,
    image: "assets/images/centella_ampoule.png",
    thumbnails: [
      "assets/images/centella_ampoule.png"
    ],
    description: "Sérum 100% extracto de Centella Asiática pura de Madagascar. Calma rojeces, repara la barrera cutánea y restaura la hidratación.",
    stock: 8,
    features: [
      "100% Extracto purificado de Centella Asiática",
      "Ideal para pieles sensibles, con acné o irritación",
      "Fórmula vegana no comedogénica"
    ],
    usage: "Usar mañana y noche tras la limpieza. Aplicar en rostro y cuello dando suaves palmaditas."
  },
  {
    id: "skinova-massager",
    title: "Skinova™ | Masajeador Facial Lifting LED & Terapia de Calor",
    vendor: "YA COMPRÉ",
    category: "belleza",
    isBestseller: true,
    price: 79.00,
    originalPrice: 129.00,
    discountPercent: 38,
    rating: 4.8,
    reviewCount: 230,
    image: "assets/images/skinova_massager.png",
    thumbnails: [
      "assets/images/skinova_massager.png"
    ],
    description: "Dispositivo de belleza para contorno facial y cuello. Combina microcorriente, fototerapia LED y masaje térmico para un efecto lifting inmediato.",
    stock: 6,
    features: [
      "3 Modos de fototerapia LED (Roja, Azul, Verde)",
      "Reduce papada y perfila la línea de la mandíbula",
      "Aumenta la absorción de cremas y sueros",
      "Diseño ergonómico y portátil"
    ],
    usage: "Usar 5 a 10 minutos al día con tu suero o crema preferida realizando deslizamientos ascendentes."
  },
  {
    id: "magnesio-complex",
    title: "TriPack Magnesio Complex 8 en 1 (Citrato + Bisglicinato)",
    vendor: "YA COMPRÉ",
    category: "bienestar",
    isBestseller: false,
    price: 99.00,
    originalPrice: 129.00,
    discountPercent: 23,
    rating: 4.9,
    reviewCount: 380,
    image: "assets/images/magnesio_complex.png",
    thumbnails: [
      "assets/images/magnesio_complex.png"
    ],
    description: "Fórmula completa de 8 formas de magnesio de alta biodisponibilidad. Mejora la energía diurna, el rendimiento muscular y el descanso de noche.",
    stock: 11,
    features: [
      "Combinación de Citrato, Bisglicinato, Malato y Treonato",
      "Elimina calambres musculares y fatiga crónica",
      "Promueve la salud ósea y el equilibrio nervioso"
    ],
    usage: "Tomar 2 cápsulas al día con los alimentos principales."
  }
];

// --- Initial Customer Reviews ---
const CUSTOMER_REVIEWS = [
  {
    id: 1,
    name: "María G.",
    location: "La Molina, Lima",
    rating: 5,
    text: "Llegó en perfectas condiciones y mucho más rápido de lo esperado. El pago contra entrega me dio mucha confianza para comprar.",
    avatar: "MG"
  },
  {
    id: 2,
    name: "Carlos R.",
    location: "Surco, Lima",
    rating: 5,
    text: "Producto de muy buena calidad. Lo ordené el lunes y llegó el miércoles. Definitivamente volvería a comprar.",
    avatar: "CR"
  },
  {
    id: 3,
    name: "Lucía M.",
    location: "Miraflores, Lima",
    rating: 5,
    text: "Excelente atención al cliente. Cuando tuve una duda me respondieron por WhatsApp al instante. ¡10/10!",
    avatar: "LM"
  },
  {
    id: 4,
    name: "Renato V.",
    location: "Arequipa",
    rating: 5,
    text: "La almohada cervical me cambió las mañanas. Despierto sin dolor de cuello por primera vez en años.",
    avatar: "RV"
  }
];

// --- App State ---
const state = {
  cart: JSON.parse(localStorage.getItem('yacompre_cart') || '[]'),
  activeCategory: 'todos',
  selectedProductForModal: null,
  selectedProductQty: 1
};

// --- DOM Loaded Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initDynamicSlogan();
  initAnnouncementBar();
  initCatalog();
  initCart();
  initComparisonSlider();
  initCountdownTimers();
  initModals();
  initReviewForm();
  initAccordions();
  initMobileMenu();
  updateCartUI();
});

// --- Dynamic Slogan Rotator ---
function initDynamicSlogan() {
  const sloganEl = document.getElementById('hero-slogan-dynamic');
  if (!sloganEl) return;

  const phrases = [
    "vida sin complicaciones",
    "vida tranquila",
    "vida moderna",
    "rutina ideal"
  ];
  let index = 0;

  setInterval(() => {
    index = (index + 1) % phrases.length;
    sloganEl.style.opacity = '0';
    sloganEl.style.transform = 'translateY(8px)';
    
    setTimeout(() => {
      sloganEl.textContent = phrases[index];
      sloganEl.style.opacity = '1';
      sloganEl.style.transform = 'translateY(0)';
    }, 300);
  }, 3200);
}

// --- Announcement Ticker ---
function initAnnouncementBar() {
  const textEl = document.getElementById('announcement-text');
  if (!textEl) return;

  const announcements = [
    'Envío gratis a todo el Perú 🇵🇪 en pedidos seleccionados',
    'Nuevos lanzamientos | Todo a un solo KLICK <a href="#productos">Ver ahora →</a>',
    'Pago contra entrega disponible en Lima y principales ciudades'
  ];
  let idx = 0;

  setInterval(() => {
    idx = (idx + 1) % announcements.length;
    textEl.style.opacity = '0';
    setTimeout(() => {
      textEl.innerHTML = announcements[idx];
      textEl.style.opacity = '1';
    }, 250);
  }, 4500);

  const closeBtn = document.getElementById('close-announcement');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      document.querySelector('.announcement-bar').style.display = 'none';
    });
  }
}

// --- Catalog & Product Rendering ---
function initCatalog() {
  const container = document.getElementById('products-grid');
  if (!container) return;

  renderProducts(state.activeCategory);

  // Filter Buttons Event Listeners
  const filterBtns = document.querySelectorAll('.filter-tab');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const cat = e.target.getAttribute('data-category');
      state.activeCategory = cat;
      renderProducts(cat);
    });
  });
}

function renderProducts(category) {
  const container = document.getElementById('products-grid');
  if (!container) return;

  let list = PRODUCTS_DATA;
  if (category === 'bestsellers') {
    list = PRODUCTS_DATA.filter(p => p.isBestseller);
  } else if (category !== 'todos') {
    list = PRODUCTS_DATA.filter(p => p.category === category);
  }

  container.innerHTML = list.map(p => `
    <article class="product-card" data-id="${p.id}">
      <div class="product-image-container">
        <span class="discount-badge">-${p.discountPercent}%</span>
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <button class="quick-view-btn" onclick="openProductModal('${p.id}')">Vista Rápida</button>
      </div>
      <div class="product-info">
        <span class="product-vendor">${p.vendor}</span>
        <h3 class="product-title" onclick="openProductModal('${p.id}')">${p.title}</h3>
        <div class="product-rating">
          <span class="stars">★★★★★</span>
          <span>${p.rating} (${p.reviewCount})</span>
        </div>
        <div class="product-price-row">
          <span class="price-current">S/. ${p.price.toFixed(2)}</span>
          <span class="price-original">S/. ${p.originalPrice.toFixed(2)}</span>
        </div>
        <div class="product-actions">
          <button class="btn-add-cart" onclick="addToCart('${p.id}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Añadir al carrito
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// --- Cart Logic ---
function initCart() {
  const cartIcon = document.getElementById('cart-icon-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  const closeCart = document.getElementById('close-cart-drawer');

  if (cartIcon) {
    cartIcon.addEventListener('click', () => toggleCart(true));
  }
  if (closeCart) {
    closeCart.addEventListener('click', () => toggleCart(false));
  }
  if (overlay) {
    overlay.addEventListener('click', () => toggleCart(false));
  }

  const checkoutBtn = document.getElementById('cart-checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      toggleCart(false);
      openCODModal();
    });
  }
}

function toggleCart(open) {
  const cartDrawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  if (open) {
    cartDrawer.classList.add('active');
    overlay.classList.add('active');
  } else {
    cartDrawer.classList.remove('active');
    overlay.classList.remove('active');
  }
}

function addToCart(productId, qty = 1) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    state.cart.push({ ...product, qty });
  }

  saveCart();
  updateCartUI();
  toggleCart(true);
}

function updateCartQty(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter(i => i.id !== productId);
  }
  saveCart();
  updateCartUI();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(i => i.id !== productId);
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('yacompre_cart', JSON.stringify(state.cart));
}

function updateCartUI() {
  const countBadge = document.getElementById('cart-count-badge');
  const cartContainer = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal-val');
  const progressFill = document.getElementById('free-shipping-fill');
  const progressText = document.getElementById('free-shipping-text-val');

  const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
  if (countBadge) countBadge.textContent = totalCount;

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  if (subtotalEl) subtotalEl.textContent = `S/. ${subtotal.toFixed(2)}`;

  // Free shipping threshold at S/. 150
  const freeShippingThreshold = 150;
  if (progressFill && progressText) {
    if (subtotal >= freeShippingThreshold) {
      progressFill.style.width = '100%';
      progressText.innerHTML = '🎉 ¡Felicidades! Tienes <strong>ENVÍO GRATIS</strong>';
    } else {
      const needed = freeShippingThreshold - subtotal;
      const pct = Math.min(100, (subtotal / freeShippingThreshold) * 100);
      progressFill.style.width = `${pct}%`;
      progressText.innerHTML = `Agrega <strong>S/. ${needed.toFixed(2)}</strong> más para Envío Gratis`;
    }
  }

  if (!cartContainer) return;

  if (state.cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="cart-empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <p>Tu carrito está vacío</p>
        <button class="btn btn-outline-dark" style="margin-top: 1rem;" onclick="toggleCart(false)">Explorar Productos</button>
      </div>
    `;
  } else {
    cartContainer.innerHTML = state.cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-price">S/. ${(item.price * item.qty).toFixed(2)}</div>
          <div class="cart-item-controls">
            <div class="qty-selector">
              <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
            </div>
            <button class="btn-remove-item" onclick="removeFromCart('${item.id}')">Eliminar</button>
          </div>
        </div>
      </div>
    `).join('');
  }
}

// --- Product Modal System ---
function openProductModal(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  state.selectedProductForModal = product;
  state.selectedProductQty = 1;

  const backdrop = document.getElementById('product-modal-backdrop');
  const modalContent = document.getElementById('product-modal-content');

  modalContent.innerHTML = `
    <div class="product-detail-grid">
      <div class="product-gallery">
        <img id="modal-main-img" src="${product.image}" alt="${product.title}" class="main-product-img">
        <div class="gallery-thumbs">
          ${product.thumbnails.map((t, idx) => `
            <img src="${t}" class="thumb-item ${idx === 0 ? 'active' : ''}" onclick="switchModalThumb(this, '${t}')">
          `).join('')}
        </div>
      </div>
      <div class="product-detail-info">
        <div class="stock-warning-badge">🔥 Solo quedan ${product.stock} unidades disponibles en almacén</div>
        <h2>${product.title}</h2>
        <div class="product-rating" style="margin-bottom: 1rem;">
          <span class="stars">★★★★★</span>
          <span>${product.rating} (Basado en ${product.reviewCount} valoraciones de clientes)</span>
        </div>
        <div class="product-price-row" style="margin-bottom: 1.5rem;">
          <span class="price-current" style="font-size: 1.8rem;">S/. ${product.price.toFixed(2)}</span>
          <span class="price-original" style="font-size: 1.2rem;">S/. ${product.originalPrice.toFixed(2)}</span>
          <span class="discount-badge" style="position:static;">Ahorras S/. ${(product.originalPrice - product.price).toFixed(2)}</span>
        </div>
        
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${product.description}</p>

        <div style="display:flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem;">
          <div class="qty-selector" style="height: 48px;">
            <button class="qty-btn" style="width: 38px; height: 100%; font-size: 1.1rem;" onclick="adjustModalQty(-1)">-</button>
            <span id="modal-qty-val" class="qty-val" style="padding: 0 1rem; font-size: 1.1rem;">1</span>
            <button class="qty-btn" style="width: 38px; height: 100%; font-size: 1.1rem;" onclick="adjustModalQty(1)">+</button>
          </div>
          <button class="btn btn-primary" style="flex-grow: 1; height: 48px; background-color: var(--bg-dark); color: #FFF;" onclick="addModalItemToCart()">
            Añadir al carrito
          </button>
        </div>

        <button class="btn btn-whatsapp" style="width: 100%; height: 50px; margin-bottom: 1.5rem; font-size: 1rem;" onclick="buyNowCOD('${product.id}')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.85 9.85 0 0 0 12.04 2zm5.77 14.15c-.24.68-1.2 1.25-1.95 1.41-.51.11-1.18.2-3.44-.73-2.89-1.19-4.75-4.13-4.89-4.32-.14-.19-1.18-1.57-1.18-3 0-1.43.75-2.13 1.02-2.42.27-.29.59-.36.79-.36.2 0 .4 0 .57.01.18.01.43-.07.67.51.24.58.82 2 .89 2.15.07.15.12.33.02.53-.1.19-.15.31-.3.49-.15.18-.31.4-.44.54-.15.15-.3.31-.13.6.17.29.77 1.27 1.66 2.06 1.14 1.01 2.1 1.33 2.4 1.48.29.15.46.13.63-.07.17-.2.74-.86.94-1.15.2-.29.4-.24.67-.14.27.1.1.71 1.7 2.44.82.16.89.27.94.43.05.16.05.93-.19 1.61z"/></path></svg>
          Lo quiero — Pago contra entrega
        </button>

        <div style="background-color: var(--bg-subtle); padding: 1rem; border-radius: var(--radius-sm); font-size: 0.85rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.5rem;">
          <div>✅ <strong>Garantía Total:</strong> 30 días de satisfacción asegurada</div>
          <div>🚚 <strong>Envío Rápido:</strong> Despacho prioritario en 24 a 48 horas</div>
          <div>🛡️ <strong>Pago Seguro:</strong> Cancelas al repartidor en la puerta de tu casa</div>
        </div>
      </div>
    </div>
  `;

  backdrop.classList.add('active');
}

function switchModalThumb(el, src) {
  document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const mainImg = document.getElementById('modal-main-img');
  if (mainImg) mainImg.src = src;
}

function adjustModalQty(delta) {
  state.selectedProductQty = Math.max(1, state.selectedProductQty + delta);
  const qtyVal = document.getElementById('modal-qty-val');
  if (qtyVal) qtyVal.textContent = state.selectedProductQty;
}

function addModalItemToCart() {
  if (state.selectedProductForModal) {
    addToCart(state.selectedProductForModal.id, state.selectedProductQty);
    closeModals();
  }
}

function buyNowCOD(productId) {
  closeModals();
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (product) {
    // Replace cart with just this item or add it
    addToCart(productId, 1);
    openCODModal();
  }
}

// --- Cash on Delivery Modal ---
function openCODModal() {
  const backdrop = document.getElementById('cod-modal-backdrop');
  if (backdrop) backdrop.classList.add('active');

  const codSummary = document.getElementById('cod-order-summary');
  if (codSummary) {
    const total = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const itemsList = state.cart.map(i => `${i.qty}x ${i.title}`).join(', ');
    codSummary.innerHTML = `
      <div style="background-color: var(--bg-subtle); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem;">
        <div style="font-size: 0.85rem; color: var(--text-secondary);">Productos en tu pedido:</div>
        <div style="font-weight: 600; font-size: 0.95rem; margin: 0.25rem 0;">${itemsList || 'Ninguno'}</div>
        <div style="font-size: 1.1rem; font-weight: 700; margin-top: 0.5rem; color: var(--text-primary);">Total a pagar: S/. ${total.toFixed(2)}</div>
      </div>
    `;
  }
}

function submitCODOrder(event) {
  event.preventDefault();
  const name = document.getElementById('cod-name').value.trim();
  const phone = document.getElementById('cod-phone').value.trim();
  const address = document.getElementById('cod-address').value.trim();
  const district = document.getElementById('cod-district').value.trim();
  const paymentMethod = document.getElementById('cod-payment').value;

  if (!name || !phone || !address || !district) {
    alert('Por favor completa todos los campos requeridos.');
    return;
  }

  const total = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const itemsText = state.cart.map(i => `• ${i.qty}x ${i.title} (S/. ${(i.price * i.qty).toFixed(2)})`).join('\n');

  const message = `¡Hola *YA COMPRÉ*! 🛍️ Quisiera confirmar mi pedido contra entrega:\n\n*Cliente:* ${name}\n*Teléfono:* ${phone}\n*Dirección:* ${address}, ${district}\n*Método de Pago:* ${paymentMethod}\n\n*Pedido:* \n${itemsText}\n\n*TOTAL:* S/. ${total.toFixed(2)}\n\n¡Quedo a la espera de la confirmación de envío!`;

  const encoded = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/51900000000?text=${encoded}`;

  // Clear cart
  state.cart = [];
  saveCart();
  updateCartUI();
  closeModals();

  window.open(whatsappUrl, '_blank');
}

function initModals() {
  const closeBtns = document.querySelectorAll('.modal-close-btn');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeModals);
  });

  const backdrops = document.querySelectorAll('.modal-backdrop');
  backdrops.forEach(b => {
    b.addEventListener('click', (e) => {
      if (e.target === b) closeModals();
    });
  });

  const codForm = document.getElementById('cod-checkout-form');
  if (codForm) {
    codForm.addEventListener('submit', submitCODOrder);
  }
}

function closeModals() {
  document.querySelectorAll('.modal-backdrop').forEach(b => b.classList.remove('active'));
}

// --- Comparison Slider ---
function initComparisonSlider() {
  const container = document.getElementById('comparison-container');
  const handle = document.getElementById('comparison-handle');
  const beforeWrapper = document.getElementById('before-wrapper');

  if (!container || !handle || !beforeWrapper) return;

  let isDragging = false;

  const setPosition = (x) => {
    const rect = container.getBoundingClientRect();
    let offsetX = x - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percentage = (offsetX / rect.width) * 100;
    beforeWrapper.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  };

  handle.addEventListener('mousedown', () => isDragging = true);
  window.addEventListener('mouseup', () => isDragging = false);
  window.addEventListener('mousemove', (e) => {
    if (isDragging) setPosition(e.clientX);
  });

  // Touch support for smartphones
  handle.addEventListener('touchstart', () => isDragging = true);
  window.addEventListener('touchend', () => isDragging = false);
  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches[0]) setPosition(e.touches[0].clientX);
  });
}

// --- Live Countdown Timers ---
function initCountdownTimers() {
  const hoursEl = document.getElementById('timer-hrs');
  const minsEl = document.getElementById('timer-min');
  const secsEl = document.getElementById('timer-sec');

  if (!hoursEl || !minsEl || !secsEl) return;

  // 1 hora, 58 mins, 4 segs timer
  let totalSeconds = (1 * 3600) + (58 * 60) + 4;

  setInterval(() => {
    if (totalSeconds > 0) totalSeconds--;
    
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

// --- Customer Review Submission ---
function initReviewForm() {
  const container = document.getElementById('testimonials-grid');
  if (!container) return;

  renderReviews();

  const form = document.getElementById('new-review-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('review-name').value.trim();
      const city = document.getElementById('review-city').value.trim();
      const text = document.getElementById('review-text').value.trim();
      const rating = parseInt(document.getElementById('review-rating').value);

      if (!name || !city || !text) return;

      const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

      CUSTOMER_REVIEWS.unshift({
        id: Date.now(),
        name,
        location: city,
        rating,
        text,
        avatar: initials
      });

      renderReviews();
      closeModals();
      form.reset();
      alert('¡Gracias por compartir tu opinión en YA COMPRÉ!');
    });
  }
}

function renderReviews() {
  const container = document.getElementById('testimonials-grid');
  if (!container) return;

  container.innerHTML = CUSTOMER_REVIEWS.map(r => `
    <div class="testimonial-card">
      <div class="quote-mark">“</div>
      <p class="testimonial-text">"${r.text}"</p>
      <div class="testimonial-author">
        <div class="author-avatar">${r.avatar}</div>
        <div class="author-info">
          <h5>${r.name}</h5>
          <p>${r.location} • <span style="color: var(--accent-star);">★ ${r.rating}.0</span></p>
        </div>
      </div>
    </div>
  `).join('');
}

// --- Accordions ---
function initAccordions() {
  const items = document.querySelectorAll('.accordion-header');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const parent = item.parentElement;
      parent.classList.toggle('active');
    });
  });
}

// --- Mobile Menu Toggle ---
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
  }
}

function openTikTokModal(title, videoSrc) {
  alert(`Reproduciendo testimonio en video: "${title}"`);
}
