/**
 * Called Here Apparel — Main JavaScript
 * Handles Header, Navigation Drawers, Mini-Cart, Search Overlay,
 * Modals, Toasts, Carousels, Tabs, and Microinteractions.
 */

// Global State
window.CalledHere = {
  cart: [
    {
      id: 'prod-beanie-1',
      title: 'Called Here Embroidered: Grow in Grace Cuffed Beanie',
      variant: 'Black / One Size',
      price: 27.75,
      quantity: 1,
      imageLabel: 'BEANIE — BLACK'
    },
    {
      id: 'prod-hoodie-1',
      title: 'Faith Over Fear Crewneck Sweatshirt',
      variant: 'Black / L',
      price: 47.13,
      quantity: 1,
      imageLabel: 'HOODIE — BLACK'
    }
  ],
  wishlist: ['prod-beanie-1', 'prod-kids-1'],
  freeShippingThreshold: 75.00
};

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initDrawers();
  initSearchOverlay();
  initMiniCart();
  initWishlist();
  initCarousels();
  initTabs();
  initAccordions();
  initModals();
  initNewsletters();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
   1. Header Scroll Behavior
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  const navRow = document.querySelector('.header-row-nav');
  if (!header) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    // Collapse row 2 on scroll down, expand on scroll up (with hysteresis delta)
    if (navRow) {
      const delta = currentScrollY - lastScrollY;
      if (currentScrollY > 140 && delta > 8) {
        navRow.classList.add('is-collapsed');
        lastScrollY = currentScrollY;
      } else if (currentScrollY <= 60 || delta < -8) {
        navRow.classList.remove('is-collapsed');
        lastScrollY = currentScrollY;
      }
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   2. Drawers (Mobile Navigation & Mini-Cart)
   -------------------------------------------------------------------------- */
function initDrawers() {
  const backdrop = document.getElementById('drawerBackdrop');
  const navDrawer = document.getElementById('mobileNavDrawer');
  const navOpenBtn = document.getElementById('mobileNavToggle');
  const navCloseBtn = document.getElementById('mobileNavClose');

  function openNav() {
    if (navDrawer && backdrop) {
      navDrawer.classList.add('is-active');
      backdrop.classList.add('is-active');
      document.body.classList.add('no-scroll');
    }
  }

  function closeAllDrawers() {
    document.querySelectorAll('.drawer').forEach(d => d.classList.remove('is-active'));
    if (backdrop) backdrop.classList.remove('is-active');
    document.body.classList.remove('no-scroll');
  }

  if (navOpenBtn) navOpenBtn.addEventListener('click', openNav);
  if (navCloseBtn) navCloseBtn.addEventListener('click', closeAllDrawers);
  if (backdrop) backdrop.addEventListener('click', closeAllDrawers);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllDrawers();
      closeSearchOverlay();
      closeActiveModal();
    }
  });

  // Mobile Nav Gender Switcher
  const genderTabs = document.querySelectorAll('.mobile-nav__tab');
  const genderPanels = document.querySelectorAll('.mobile-nav__panel');

  genderTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetGender = tab.getAttribute('data-gender');
      genderTabs.forEach(t => t.classList.remove('is-active'));
      genderPanels.forEach(p => p.classList.remove('is-active'));

      tab.classList.add('is-active');
      const activePanel = document.querySelector(`.mobile-nav__panel[data-gender="${targetGender}"]`);
      if (activePanel) activePanel.classList.add('is-active');
    });
  });
}

/* --------------------------------------------------------------------------
   3. Search Overlay
   -------------------------------------------------------------------------- */
let searchOverlayEl = null;

function initSearchOverlay() {
  searchOverlayEl = document.getElementById('searchOverlay');
  const openButtons = document.querySelectorAll('.js-open-search');
  const closeBtn = document.getElementById('searchCloseBtn');
  const searchInput = document.getElementById('searchOverlayInput');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openSearchOverlay();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeSearchOverlay);

  // Popular search chips quick click
  const chips = document.querySelectorAll('.search-chips-row .chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = chip.textContent.trim();
        searchInput.focus();
      }
    });
  });
}

function openSearchOverlay() {
  if (searchOverlayEl) {
    searchOverlayEl.classList.add('is-active');
    document.body.classList.add('no-scroll');
    const input = document.getElementById('searchOverlayInput');
    if (input) setTimeout(() => input.focus(), 150);
  }
}

function closeSearchOverlay() {
  if (searchOverlayEl) {
    searchOverlayEl.classList.remove('is-active');
    document.body.classList.remove('no-scroll');
  }
}

/* --------------------------------------------------------------------------
   4. Mini-Cart Drawer & Global Cart Sync
   -------------------------------------------------------------------------- */
function initMiniCart() {
  const cartDrawer = document.getElementById('miniCartDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const cartToggles = document.querySelectorAll('.js-cart-toggle');
  const cartCloseBtn = document.getElementById('miniCartClose');

  cartToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openMiniCart();
    });
  });

  if (cartCloseBtn) {
    cartCloseBtn.addEventListener('click', () => {
      if (cartDrawer) cartDrawer.classList.remove('is-active');
      if (backdrop) backdrop.classList.remove('is-active');
      document.body.classList.remove('no-scroll');
    });
  }

  renderCart();
}

function openMiniCart() {
  const cartDrawer = document.getElementById('miniCartDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  if (cartDrawer && backdrop) {
    cartDrawer.classList.add('is-active');
    backdrop.classList.add('is-active');
    document.body.classList.add('no-scroll');
  }
  renderCart();
}

function renderCart() {
  const cartContainer = document.getElementById('miniCartItems');
  const subtotalEls = document.querySelectorAll('.js-cart-subtotal');
  const countBadges = document.querySelectorAll('.js-cart-count');
  const progressText = document.getElementById('freeShippingText');
  const progressBar = document.getElementById('freeShippingBar');
  const emptyState = document.getElementById('miniCartEmpty');
  const cartFooter = document.getElementById('miniCartFooter');

  const cart = window.CalledHere.cart;
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Update header count bubbles
  countBadges.forEach(badge => {
    badge.textContent = count;
    const isBadge = badge.classList.contains('cart-badge');
    badge.style.display = count > 0 ? (isBadge ? 'flex' : 'inline') : (isBadge ? 'none' : 'inline');
  });

  // Update Subtotals
  subtotalEls.forEach(el => {
    el.textContent = `$${subtotal.toFixed(2)}`;
  });

  // Free shipping progress calculation
  const remaining = window.CalledHere.freeShippingThreshold - subtotal;
  if (progressText && progressBar) {
    if (remaining <= 0) {
      progressText.innerHTML = `<strong>Congratulations!</strong> You unlocked FREE shipping!`;
      progressBar.style.width = '100%';
    } else {
      const pct = Math.min(100, Math.max(5, (subtotal / window.CalledHere.freeShippingThreshold) * 100));
      progressText.innerHTML = `You're <strong>$${remaining.toFixed(2)}</strong> away from FREE shipping`;
      progressBar.style.width = `${pct}%`;
    }
  }

  // Handle empty state
  if (cart.length === 0) {
    if (cartContainer) cartContainer.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    if (cartFooter) cartFooter.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (cartFooter) cartFooter.style.display = 'block';

  if (!cartContainer) return;

  // Render items
  cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item__img">
        <div class="ph ph--thumb" data-label="${item.imageLabel || 'ITEM'}"></div>
      </div>
      <div>
        <h4 class="cart-item__title">${item.title}</h4>
        <div class="cart-item__variant">${item.variant}</div>
        <div class="qty-stepper">
          <button class="qty-btn js-cart-minus" aria-label="Decrease quantity" data-id="${item.id}">−</button>
          <input type="text" class="qty-input" value="${item.quantity}" readonly>
          <button class="qty-btn js-cart-plus" aria-label="Increase quantity" data-id="${item.id}">+</button>
        </div>
      </div>
      <div class="t-right" style="display:flex; flex-direction:column; justify-content:space-between; align-items:flex-end;">
        <button class="cart-item__remove js-cart-remove" aria-label="Remove item" data-id="${item.id}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <span class="cart-item__price">$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    </div>
  `).join('');

  // Attach item listeners
  cartContainer.querySelectorAll('.js-cart-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const item = window.CalledHere.cart.find(i => i.id === id);
      if (item) {
        item.quantity++;
        renderCart();
      }
    });
  });

  cartContainer.querySelectorAll('.js-cart-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const item = window.CalledHere.cart.find(i => i.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          window.CalledHere.cart = window.CalledHere.cart.filter(i => i.id !== id);
          showToast('Item removed from bag');
        }
        renderCart();
      }
    });
  });

  cartContainer.querySelectorAll('.js-cart-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      window.CalledHere.cart = window.CalledHere.cart.filter(i => i.id !== id);
      showToast('Item removed from bag');
      renderCart();
    });
  });
}

// Add item to cart helper
window.addToBag = function(product) {
  const existing = window.CalledHere.cart.find(item => item.id === product.id && item.variant === product.variant);
  if (existing) {
    existing.quantity += (product.quantity || 1);
  } else {
    window.CalledHere.cart.push({
      id: product.id || 'prod-' + Date.now(),
      title: product.title,
      variant: product.variant || 'Standard',
      price: product.price,
      quantity: product.quantity || 1,
      imageLabel: product.imageLabel || 'PRODUCT'
    });
  }
  showToast('✓ Added to your bag');
  openMiniCart();
};

/* --------------------------------------------------------------------------
   5. Wishlist Toggling
   -------------------------------------------------------------------------- */
function initWishlist() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.js-wishlist-toggle');
    if (!btn) return;
    e.preventDefault();

    const productId = btn.getAttribute('data-product-id') || 'item';
    const idx = window.CalledHere.wishlist.indexOf(productId);

    if (idx > -1) {
      window.CalledHere.wishlist.splice(idx, 1);
      btn.classList.remove('is-active');
      showToast('Removed from Wishlist');
    } else {
      window.CalledHere.wishlist.push(productId);
      btn.classList.add('is-active');
      showToast('Saved to Wishlist');
    }

    const countEls = document.querySelectorAll('.js-wishlist-count');
    countEls.forEach(el => el.textContent = window.CalledHere.wishlist.length);
  });
}

/* --------------------------------------------------------------------------
   6. Toast Notifications
   -------------------------------------------------------------------------- */
window.showToast = function(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('is-hiding');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

/* --------------------------------------------------------------------------
   7. Carousels (Scroll-Snap Native with Prev/Next Controls)
   -------------------------------------------------------------------------- */
function initCarousels() {
  const carousels = document.querySelectorAll('.js-carousel');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel__track');
    const prevBtn = carousel.querySelector('.js-carousel-prev');
    const nextBtn = carousel.querySelector('.js-carousel-next');
    const progressBar = carousel.querySelector('.carousel__progress-bar');

    if (!track) return;

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const itemWidth = track.firstElementChild ? track.firstElementChild.getBoundingClientRect().width : 300;
        track.scrollBy({ left: -(itemWidth * 1.5), behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const itemWidth = track.firstElementChild ? track.firstElementChild.getBoundingClientRect().width : 300;
        track.scrollBy({ left: (itemWidth * 1.5), behavior: 'smooth' });
      });
    }

    if (progressBar) {
      track.addEventListener('scroll', () => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (maxScroll > 0) {
          const progress = track.scrollLeft / maxScroll;
          progressBar.style.transform = `translateX(${progress * 300}%)`;
        }
      }, { passive: true });
    }
  });
}

/* --------------------------------------------------------------------------
   8. Tabs Component
   -------------------------------------------------------------------------- */
function initTabs() {
  document.querySelectorAll('.js-tabs').forEach(container => {
    const tabs = container.querySelectorAll('.tab-btn');
    const panels = container.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-target');

        tabs.forEach(t => t.classList.remove('is-active'));
        panels.forEach(p => p.classList.remove('is-active'));

        tab.classList.add('is-active');
        const targetPanel = container.querySelector(target);
        if (targetPanel) targetPanel.classList.add('is-active');
      });
    });
  });
}

/* --------------------------------------------------------------------------
   9. Accordions Component
   -------------------------------------------------------------------------- */
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      if (item) {
        item.classList.toggle('is-open');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   10. Modals (Size Guide, Review Modal)
   -------------------------------------------------------------------------- */
function initModals() {
  document.querySelectorAll('.js-modal-open').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-modal');
      const modal = document.getElementById(targetId);
      if (modal) {
        modal.classList.add('is-active');
        document.body.classList.add('no-scroll');
      }
    });
  });

  document.querySelectorAll('.js-modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      closeActiveModal();
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeActiveModal();
      }
    });
  });
}

function closeActiveModal() {
  document.querySelectorAll('.modal-backdrop.is-active').forEach(m => m.classList.remove('is-active'));
  document.body.classList.remove('no-scroll');
}

/* --------------------------------------------------------------------------
   11. Newsletter Form Submissions (UI-only)
   -------------------------------------------------------------------------- */
function initNewsletters() {
  document.querySelectorAll('.js-newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const successBanner = form.parentElement.querySelector('.form-success-banner');
      if (input && input.value) {
        if (successBanner) {
          successBanner.classList.add('is-active');
          form.style.display = 'none';
        }
        showToast('✓ Thank you for subscribing to Called Here.');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   12. IntersectionObserver Fade-ins
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}
