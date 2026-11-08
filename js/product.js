/**
 * Called Here Apparel — Product Detail Page Script
 * Handles Image Gallery, Lightbox, Color Swatches, Size Selection,
 * Add to Bag Loading Microinteraction, Mobile Sticky Add-to-Bag Bar,
 * Quantity Stepper, and Review Form Modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  const isProductPage = document.querySelector('.product-detail-layout');
  if (!isProductPage) return;

  initGalleryLightbox();
  initMobileGalleryCounter();
  initColorSelection();
  initSizeSelection();
  initProductQuantity();
  initAddToBagInteraction();
  initStickyMobileBar();
  initReviewModal();
});

/* --------------------------------------------------------------------------
   1. Gallery & Fullscreen Lightbox
   -------------------------------------------------------------------------- */
const GALLERY_LABELS = [
  'BEANIE — HERO CUFF DETAIL',
  'BEANIE — FRONT ANGLE',
  'BEANIE — ON MODEL LIFESTYLE',
  'BEANIE — EMBROIDERY CLOSEUP "GROW IN GRACE"',
  'BEANIE — BACK SEAM DETAIL',
  'BEANIE — FLAT LAY WITH SWEATSHIRT'
];

let activeLightboxIndex = 0;

function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.js-gallery-thumb');
  const lightbox = document.getElementById('productLightbox');
  const lightboxImg = document.getElementById('lightboxActiveImage');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      activeLightboxIndex = idx;
      openLightbox();
    });
  });

  function openLightbox() {
    if (!lightbox || !lightboxImg) return;
    updateLightboxImage();
    lightbox.classList.add('is-active');
    document.body.classList.add('no-scroll');
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-active');
    document.body.classList.remove('no-scroll');
  }

  function updateLightboxImage() {
    if (!lightboxImg) return;
    const label = GALLERY_LABELS[activeLightboxIndex] || 'PRODUCT DETAIL';
    lightboxImg.setAttribute('data-label', label);
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      activeLightboxIndex = (activeLightboxIndex - 1 + GALLERY_LABELS.length) % GALLERY_LABELS.length;
      updateLightboxImage();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      activeLightboxIndex = (activeLightboxIndex + 1) % GALLERY_LABELS.length;
      updateLightboxImage();
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
}

/* --------------------------------------------------------------------------
   2. Mobile Swipeable Gallery Counter
   -------------------------------------------------------------------------- */
function initMobileGalleryCounter() {
  const track = document.querySelector('.product-gallery-mobile .carousel__track');
  const counter = document.getElementById('mobileGalleryCounter');
  if (!track || !counter) return;

  track.addEventListener('scroll', () => {
    const slideWidth = track.clientWidth;
    const activeIndex = Math.round(track.scrollLeft / slideWidth);
    counter.textContent = `${activeIndex + 1} / ${GALLERY_LABELS.length}`;
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   3. Color Swatch Selection
   -------------------------------------------------------------------------- */
function initColorSelection() {
  const swatches = document.querySelectorAll('.js-pdp-color');
  const label = document.getElementById('selectedColorLabel');

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('is-active'));
      swatch.classList.add('is-active');
      const colorName = swatch.getAttribute('data-color-name');
      if (label) label.textContent = colorName;
    });
  });
}

/* --------------------------------------------------------------------------
   4. Size Button Selection
   -------------------------------------------------------------------------- */
function initSizeSelection() {
  const sizeBtns = document.querySelectorAll('.js-size-btn');
  const sizeLabel = document.getElementById('selectedSizeLabel');

  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.disabled || btn.classList.contains('is-soldout')) return;
      sizeBtns.forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      const sizeVal = btn.getAttribute('data-size');
      if (sizeLabel) sizeLabel.textContent = sizeVal;
    });
  });
}

/* --------------------------------------------------------------------------
   5. Product Quantity Stepper
   -------------------------------------------------------------------------- */
function initProductQuantity() {
  const minus = document.getElementById('pdpQtyMinus');
  const plus = document.getElementById('pdpQtyPlus');
  const input = document.getElementById('pdpQtyInput');

  if (minus && plus && input) {
    minus.addEventListener('click', () => {
      let val = parseInt(input.value, 10) || 1;
      if (val > 1) {
        input.value = val - 1;
      }
    });

    plus.addEventListener('click', () => {
      let val = parseInt(input.value, 10) || 1;
      input.value = val + 1;
    });
  }
}

/* --------------------------------------------------------------------------
   6. Add to Bag Microinteraction
   -------------------------------------------------------------------------- */
function initAddToBagInteraction() {
  const addBtn = document.getElementById('pdpAddToBagBtn');
  const buyNowBtn = document.getElementById('pdpBuyNowBtn');
  const stickyAddBtn = document.getElementById('stickyMobileAddBtn');

  function triggerAdd(btn) {
    if (!btn || btn.classList.contains('is-loading')) return;

    btn.classList.add('is-loading');
    const origText = btn.innerHTML;

    setTimeout(() => {
      btn.classList.remove('is-loading');
      btn.innerHTML = '✓ ADDED';
      btn.style.backgroundColor = 'var(--success)';
      btn.style.borderColor = 'var(--success)';
      btn.style.color = '#FFFFFF';

      const selectedColor = document.getElementById('selectedColorLabel')?.textContent.trim() || 'Black';
      const selectedSize = document.getElementById('selectedSizeLabel')?.textContent.trim() || 'One Size';
      const qty = parseInt(document.getElementById('pdpQtyInput')?.value, 10) || 1;

      // Add to global state
      if (window.addToBag) {
        window.addToBag({
          id: 'ch-01',
          title: 'Called Here Embroidered: Grow in Grace Cuffed Beanie',
          price: 27.75,
          variant: `${selectedColor} / ${selectedSize}`,
          quantity: qty,
          imageLabel: 'GROW IN GRACE BEANIE'
        });
      }

      // Revert button after 2 seconds
      setTimeout(() => {
        btn.innerHTML = origText;
        btn.style.backgroundColor = '';
        btn.style.borderColor = '';
        btn.style.color = '';
      }, 2000);
    }, 600);
  }

  if (addBtn) {
    addBtn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerAdd(addBtn);
    });
  }

  if (stickyAddBtn) {
    stickyAddBtn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerAdd(stickyAddBtn);
    });
  }

  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'checkout.html';
    });
  }
}

/* --------------------------------------------------------------------------
   7. Sticky Mobile Add-to-Bag Bar
   -------------------------------------------------------------------------- */
function initStickyMobileBar() {
  const bar = document.getElementById('stickyMobileBar');
  const triggerEl = document.getElementById('pdpAddToBagBtn');

  if (!bar || !triggerEl) return;

  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
      bar.classList.add('is-visible');
    } else {
      bar.classList.remove('is-visible');
    }
  }, { threshold: 0 });

  observer.observe(triggerEl);
}

/* --------------------------------------------------------------------------
   8. Write a Review Modal Form
   -------------------------------------------------------------------------- */
function initReviewModal() {
  const reviewForm = document.getElementById('writeReviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (window.showToast) {
        window.showToast('✓ Thank you! Your review has been submitted for approval.');
      }
      const modal = document.getElementById('reviewModal');
      if (modal) modal.classList.remove('is-active');
      document.body.classList.remove('no-scroll');
      reviewForm.reset();
    });
  }
}

