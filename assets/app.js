/* ==========================================================================
   YA COMPRÉ - Core Application Engine & Interactivity
   Carrito y checkout usan la API AJAX nativa de Shopify (/cart/*.js).
   ========================================================================== */

const FREE_SHIPPING_THRESHOLD = 150; // en soles

const state = {
  activeCategory: 'todos'
};

// --- DOM Loaded Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initDynamicSlogan();
  initAnnouncementBar();
  initCatalogFilter();
  initAddToCartButtons();
  initCart();
  initComparisonSlider();
  initCountdownTimers();
  initModals();
  initReviewForm();
  initAccordions();
  initMobileMenu();
  refreshCartUI();
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

// --- Catalog Category Filter (sobre las product-cards ya renderizadas por Liquid) ---
function initCatalogFilter() {
  const filterBtns = document.querySelectorAll('.filter-tab');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      state.activeCategory = cat;
      applyCatalogFilter(cat);
    });
  });
}

function applyCatalogFilter(category) {
  const cards = document.querySelectorAll('#products-grid .product-card');
  let anyVisible = false;

  cards.forEach(card => {
    let show = true;
    if (category === 'bestsellers') {
      show = card.getAttribute('data-bestseller') === 'true';
    } else if (category !== 'todos') {
      show = card.getAttribute('data-category') === category;
    }
    card.style.display = show ? '' : 'none';
    if (show) anyVisible = true;
  });

  const grid = document.getElementById('products-grid');
  let emptyMsg = document.getElementById('catalog-empty-msg');
  if (!anyVisible) {
    if (!emptyMsg) {
      emptyMsg = document.createElement('div');
      emptyMsg.id = 'catalog-empty-msg';
      emptyMsg.style.cssText = 'grid-column: 1/-1; text-align:center; padding: 3rem; color: var(--text-muted);';
      emptyMsg.textContent = 'No se encontraron productos en esta categoría.';
      grid.appendChild(emptyMsg);
    }
  } else if (emptyMsg) {
    emptyMsg.remove();
  }
}

function filterCategory(cat) {
  const filterTab = document.querySelector(`.filter-tab[data-category="${cat}"]`);
  if (filterTab) filterTab.click();
}

// --- Add to Cart buttons (grid + product page) via Shopify AJAX Cart API ---
function initAddToCartButtons() {
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-add-cart[data-variant-id]');
    if (!btn || btn.disabled) return;
    e.preventDefault();
    const variantId = btn.getAttribute('data-variant-id');
    const qtyInput = btn.getAttribute('data-qty-input');
    const qty = qtyInput ? parseInt(document.getElementById(qtyInput)?.value || '1', 10) : 1;
    addToCart(variantId, qty);
  });
}

async function addToCart(variantId, qty = 1) {
  try {
    await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ items: [{ id: variantId, quantity: qty }] })
    });
    await refreshCartUI();
    toggleCart(true);
  } catch (err) {
    console.error('No se pudo añadir al carrito', err);
    alert('Hubo un problema al añadir el producto al carrito. Intenta de nuevo.');
  }
}

async function updateCartLine(line, quantity) {
  try {
    await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ line, quantity })
    });
    await refreshCartUI();
  } catch (err) {
    console.error('No se pudo actualizar el carrito', err);
  }
}

async function fetchCart() {
  const res = await fetch('/cart.js', { headers: { 'Accept': 'application/json' } });
  return res.json();
}

function formatMoney(cents) {
  return `S/. ${(cents / 100).toFixed(2)}`;
}

async function refreshCartUI() {
  const cart = await fetchCart();
  renderCartDrawer(cart);
  return cart;
}

// --- Cart Drawer ---
function initCart() {
  const cartIcon = document.getElementById('cart-icon-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  const closeCart = document.getElementById('close-cart-drawer');

  if (cartIcon) cartIcon.addEventListener('click', () => toggleCart(true));
  if (closeCart) closeCart.addEventListener('click', () => toggleCart(false));
  if (overlay) overlay.addEventListener('click', () => toggleCart(false));

  const checkoutBtn = document.getElementById('cart-checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleCart(false);
      triggerCODOrderProcess(e);
    });
  }
}

function toggleCart(open) {
  const cartDrawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  if (!cartDrawer || !overlay) return;
  if (open) {
    cartDrawer.classList.add('active');
    overlay.classList.add('active');
  } else {
    cartDrawer.classList.remove('active');
    overlay.classList.remove('active');
  }
}

function renderCartDrawer(cart) {
  const countBadge = document.getElementById('cart-count-badge');
  const drawerCount = document.getElementById('cart-drawer-count');
  const cartContainer = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal-val');
  const progressFill = document.getElementById('free-shipping-fill');
  const progressText = document.getElementById('free-shipping-text-val');

  if (countBadge) countBadge.textContent = cart.item_count;
  if (drawerCount) drawerCount.textContent = cart.item_count;
  if (subtotalEl) subtotalEl.textContent = formatMoney(cart.total_price);

  if (!cartContainer) return;

  if (cart.item_count === 0) {
    cartContainer.innerHTML = `
      <div class="cart-empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <p>Tu carrito está vacío</p>
        <button class="btn btn-outline-dark" style="margin-top: 1rem;" onclick="navigateToCatalog(event)">Explorar Productos</button>
      </div>
    `;
  } else {
    cartContainer.innerHTML = cart.items.map((item, idx) => `
      <div class="cart-item">
        <img src="${item.image ? item.image.replace('{width}', '150') : ''}" alt="${item.product_title}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.product_title}${item.variant_title ? ' · ' + item.variant_title : ''}</div>
          <div class="cart-item-price">${formatMoney(item.final_line_price)}</div>
          <div class="cart-item-controls">
            <div class="qty-selector">
              <button class="qty-btn" onclick="updateCartLine(${idx + 1}, ${item.quantity - 1})">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" onclick="updateCartLine(${idx + 1}, ${item.quantity + 1})">+</button>
            </div>
            <button class="btn-remove-item" onclick="updateCartLine(${idx + 1}, 0)">Eliminar</button>
          </div>
        </div>
      </div>
    `).join('');
  }
}

function initModals() {
  const closeBtns = document.querySelectorAll('.modal-close-btn');
  closeBtns.forEach(btn => btn.addEventListener('click', closeModals));

  const backdrops = document.querySelectorAll('.modal-backdrop');
  backdrops.forEach(b => {
    b.addEventListener('click', (e) => {
      if (e.target === b) closeModals();
    });
  });

  const codForm = document.getElementById('cod-checkout-form');
  if (codForm) codForm.addEventListener('submit', submitCODOrder);
}

function closeModals() {
  document.querySelectorAll('.modal-backdrop').forEach(b => b.classList.remove('active'));
}

// --- Cash on Delivery Modal (Pago en Casa / Formulario Modal) ---
function openCODModal(productTitle, productPrice) {
  const backdrop = document.getElementById('cod-modal-backdrop');
  if (backdrop) backdrop.classList.add('active');

  const pTitle = productTitle || document.querySelector('h1')?.textContent.trim() || 'BIOTINA MAX + COLÁGENO - FÓRMULA PREMIUM';
  const pPrice = productPrice || document.getElementById('main-price-display')?.textContent.trim() || 'S/. 139.90';
  const pImg = document.getElementById('main-product-media-img')?.src || '';

  const summaryTitle = document.getElementById('cod-summary-title');
  const summaryPrice = document.getElementById('cod-summary-price');
  const summarySubtotal = document.getElementById('cod-summary-subtotal');
  const summaryTotal = document.getElementById('cod-summary-total');
  const summaryImg = document.getElementById('cod-summary-img');

  if (summaryTitle) summaryTitle.textContent = pTitle;
  if (summaryPrice) summaryPrice.textContent = pPrice;
  if (summarySubtotal) summarySubtotal.textContent = pPrice;
  if (summaryTotal) summaryTotal.textContent = pPrice;
  if (summaryImg && pImg) summaryImg.src = pImg;

  const form = document.getElementById('cod-checkout-form');
  if (form) {
    form.dataset.productTitle = pTitle;
    form.dataset.productPrice = pPrice;
  }
}

function submitCODOrder(event) {
  event.preventDefault();
  const fullName = document.getElementById('cod-name')?.value.trim() || '';
  const phone = document.getElementById('cod-phone')?.value.trim() || '';
  const province = document.getElementById('cod-province')?.value || '';
  const district = document.getElementById('cod-district')?.value.trim() || '';
  const address = document.getElementById('cod-address')?.value.trim() || '';

  if (!fullName || !phone || !province || !district || !address) {
    alert('Por favor completa todos los campos requeridos para coordinar tu envío.');
    return;
  }

  const nameParts = fullName.split(' ');
  const firstName = nameParts[0] || 'Cliente';
  const lastName = nameParts.slice(1).join(' ') || '';

  const productTitle = event.target.dataset.productTitle || 'BIOTINA MAX + COLÁGENO - FÓRMULA PREMIUM';
  const productPrice = event.target.dataset.productPrice || 'S/. 139.90';
  const randomOrderNum = Math.floor(1000 + Math.random() * 9000);

  closeModals();
  event.target.reset();

  // Redirect to Thank You Page with all customer parameters
  const redirectUrl = `/pages/gracias?first_name=${encodeURIComponent(firstName)}&last_name=${encodeURIComponent(lastName)}&phone=${encodeURIComponent(phone)}&province=${encodeURIComponent(province)}&city=${encodeURIComponent(district)}&address=${encodeURIComponent(address)}&order_number=${randomOrderNum}&order_total=${encodeURIComponent(productPrice)}&products_summary_with_quantity=1x%20${encodeURIComponent(productTitle)}`;
  
  window.location.href = redirectUrl;
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

// --- Customer Review Submission (contenido de muestra, no ligado a productos reales) ---
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
      alert('¡Gracias por compartir tu opinión!');
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

// --- Mobile Menu Toggle & Overlay ---
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      toggleBtn.classList.toggle('active');
    });

    const links = navLinks.querySelectorAll('a');
    links.forEach(l => {
      l.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        toggleBtn.classList.remove('active');
      });
    });
  }
}

function switchModalThumb(el, src) {
  document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const mainImg = document.getElementById('modal-main-img');
  if (mainImg) mainImg.src = src;
}

function openTikTokModal(title, videoSrc) {
  alert(`Reproduciendo testimonio en video: "${title}"`);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  const q = document.getElementById('search-input').value.trim();
  if (!q) return;
  window.location.href = `/search?q=${encodeURIComponent(q)}&type=product`;
}

/* ==========================================================================
   High-Converting Product Page (PDP) & Releasit COD Form Interactivity
   ========================================================================== */

// --- 1. Gallery Thumbnail Switcher ---
function switchProductGalleryThumb(thumbEl, mediaUrl) {
  const mainImg = document.getElementById('main-product-media-img');
  if (mainImg) {
    mainImg.style.opacity = '0.4';
    setTimeout(() => {
      mainImg.src = mediaUrl;
      mainImg.style.opacity = '1';
    }, 150);
  }

  const thumbs = document.querySelectorAll('.gallery-thumbs .thumb-item');
  thumbs.forEach(t => {
    t.style.borderColor = 'transparent';
    t.style.opacity = '0.7';
    t.classList.remove('active');
  });

  if (thumbEl) {
    thumbEl.style.borderColor = 'var(--color-button, #121212)';
    thumbEl.style.opacity = '1';
    thumbEl.classList.add('active');
  }
}

// --- 2. Bundle Option Selector (Multi-pack) ---
function selectBundleOption(cardEl, qty) {
  const cards = document.querySelectorAll('.bundle-option-card');
  cards.forEach(c => {
    c.style.border = '2px solid #cbd5e1';
    c.style.background = '#ffffff';
    c.classList.remove('active');
    const radio = c.querySelector('input[type="radio"]');
    if (radio) radio.checked = false;
  });

  if (cardEl) {
    cardEl.style.border = '2px solid #2563eb';
    cardEl.style.background = '#eff6ff';
    cardEl.classList.add('active');
    const radio = cardEl.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
  }

  const qtyInput = document.getElementById('selected-product-qty');
  if (qtyInput) qtyInput.value = qty;

  // Update total price display
  updatePdpTotalPrice(qty);
}

function updatePdpTotalPrice(qty) {
  const priceDisplay = document.getElementById('main-price-display');
  const stickyPriceDisplay = document.getElementById('sticky-bar-price');
  if (!priceDisplay) return;

  const activeCard = document.querySelector('.bundle-option-card.active');
  let multiplier = 1;
  if (activeCard && activeCard.dataset.priceMultiplier) {
    multiplier = parseFloat(activeCard.dataset.priceMultiplier);
  } else {
    multiplier = qty === 2 ? 1.75 : (qty === 3 ? 2.4 : 1);
  }

  const nativeSelect = document.getElementById('product-native-variant-select');
  let basePrice = 0;

  if (nativeSelect && nativeSelect.selectedOptions[0]) {
    basePrice = parseFloat(nativeSelect.selectedOptions[0].dataset.price) || 0;
  } else if (priceDisplay.dataset.basePrice) {
    basePrice = parseFloat(priceDisplay.dataset.basePrice);
  } else {
    // Extract numerical value from current display string
    const match = priceDisplay.textContent.replace(/[^0-9.,]/g, '').replace(',', '.');
    basePrice = parseFloat(match) || 0;
    priceDisplay.dataset.basePrice = basePrice;
  }

  if (basePrice > 0) {
    // Shopify Money formatting (S/ or currency format)
    const totalPrice = (basePrice * multiplier) / 100;
    const formatted = 'S/ ' + (totalPrice).toFixed(2);
    priceDisplay.textContent = formatted;
    if (stickyPriceDisplay) stickyPriceDisplay.textContent = formatted;
  }
}

// --- 3. Variant Pill Selector ---
function selectVariantOption(btnEl, optionPos, value) {
  const container = btnEl.parentElement;
  if (container) {
    container.querySelectorAll('.variant-pill-btn').forEach(btn => {
      btn.style.borderColor = '#cbd5e1';
      btn.style.background = '#ffffff';
      btn.style.color = '#334155';
      btn.classList.remove('selected');
    });
  }

  btnEl.style.borderColor = '#0f172a';
  btnEl.style.background = '#0f172a';
  btnEl.style.color = '#ffffff';
  btnEl.classList.add('selected');

  const labelSpan = document.getElementById(`option-val-label-${optionPos}`);
  if (labelSpan) labelSpan.textContent = value;
}

// --- 4. Releasit COD Form Trigger & Fallback ---
function triggerCODOrderProcess(event) {
  if (event) event.preventDefault();
  toggleCart(false);

  // 1. Check if Releasit COD Form JS API is available
  if (window.ReleasitCOD && typeof window.ReleasitCOD.open === 'function') {
    window.ReleasitCOD.open();
    return;
  }

  // 2. Check if Releasit embedded form container is present on current page
  const releasitFormContainer = document.getElementById('releasit-cod-form-container') || document.querySelector('.releasit-cod-form');
  if (releasitFormContainer) {
    releasitFormContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const firstInput = releasitFormContainer.querySelector('input, button, select');
    if (firstInput) firstInput.focus();
    return;
  }

  // 3. If on product page, click product form submit button
  const pdpForm = document.getElementById('product-form-pdp') || document.querySelector('form[action*="/cart/add"]');
  if (pdpForm) {
    const submitBtn = pdpForm.querySelector('[data-releasit-button], button[type="submit"]');
    if (submitBtn && submitBtn !== event?.target) {
      submitBtn.click();
      return;
    }
  }

  // 4. If on cart or homepage, navigate directly to product page Releasit form
  const pdpLink = document.querySelector('a[href*="/products/"]')?.getAttribute('href');
  if (pdpLink) {
    window.location.href = pdpLink + '#releasit-cod-form-container';
    return;
  }

  // Fallback modal for local preview if no product page link exists
  const productTitleEl = document.querySelector('h1');
  const title = productTitleEl ? productTitleEl.textContent.trim() : 'Producto Premium';
  const priceDisplay = document.getElementById('main-price-display');
  const price = priceDisplay ? priceDisplay.textContent.trim() : '';

  openCODModal(title, price);
}

// --- 5. PDP Countdown Timer & Sticky Bar Listener ---
document.addEventListener('DOMContentLoaded', () => {
  initPdpCountdown();
  initStickyBuyBar();
});

function initPdpCountdown() {
  const hoursEl = document.getElementById('pdp-countdown-hours');
  const minsEl = document.getElementById('pdp-countdown-mins');
  const secsEl = document.getElementById('pdp-countdown-secs');
  if (!minsEl || !secsEl) return;

  let totalSeconds = 14 * 60 + 59; // 14 mins 59 secs

  setInterval(() => {
    if (totalSeconds <= 0) {
      totalSeconds = 15 * 60; // reset
    } else {
      totalSeconds--;
    }

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

function initStickyBuyBar() {
  const stickyBar = document.getElementById('sticky-cod-buy-bar');
  const mainCta = document.getElementById('main-cod-submit-btn');
  if (!stickyBar || !mainCta) return;

  window.addEventListener('scroll', () => {
    const ctaRect = mainCta.getBoundingClientRect();
    if (ctaRect.bottom < 0) {
      stickyBar.style.transform = 'translateY(0)';
    } else {
      stickyBar.style.transform = 'translateY(100%)';
    }
  });
}

// --- 6. Shopify Theme Editor (Personalizador) Safe Interceptor ---
document.addEventListener('DOMContentLoaded', () => {
  initThemeEditorProtection();
});

function initThemeEditorProtection() {
  // Intercept all submit and checkout clicks in Shopify Theme Editor (designMode)
  document.addEventListener('submit', (e) => {
    if (window.Shopify && window.Shopify.designMode) {
      e.preventDefault();
      console.log('Envío de formulario interceptado en el Personalizador de Shopify para evitar error de URL no compatible.');
      return false;
    }
  }, true);

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-releasit-button], .cart-checkout-btn, button[name="add"], button[type="submit"]');
    if (btn && window.Shopify && window.Shopify.designMode) {
      e.preventDefault();
      console.log('Clic de botón interceptado en el Personalizador de Shopify.');
      return false;
    }
  }, true);
}

function navigateToCatalog(e) {
  if (e) e.preventDefault();
  toggleCart(false);
  const catalogEl = document.getElementById('productos') || document.getElementById('catalog') || document.querySelector('.catalog-section');
  if (catalogEl) {
    catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.location.href = '/collections/all';
  }
}

function onPDPAddToCartClick(e) {
  if (e) e.preventDefault();
  const variantId = document.getElementById('product-variant-id-input')?.value || document.getElementById('product-native-variant-select')?.value;
  const qtyInput = document.getElementById('selected-product-qty');
  const qty = qtyInput ? parseInt(qtyInput.value || '1', 10) : 1;
  if (variantId) {
    addToCart(variantId, qty);
  }
}



