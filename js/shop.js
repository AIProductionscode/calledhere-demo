/**
 * Called Here Apparel — Shop & Catalog Filtering
 * Handles filtering by Category, Size, Color, Price, Message,
 * sorting, grid density toggling, pagination ("Load More"), and active filter chips.
 */

const SHOP_PRODUCTS = [
  {
    id: 'ch-01',
    title: 'Called Here Embroidered: Grow in Grace Cuffed Beanie',
    price: 27.75,
    category: 'accessories',
    subcat: 'beanies',
    message: 'grace',
    colors: ['#0A0A0A', '#1E3A8A', '#172554'],
    colorNames: ['Black', 'Royal', 'Navy'],
    sizes: ['One Size'],
    badge: 'NEW',
    imageLabel: 'GROW IN GRACE BEANIE'
  },
  {
    id: 'ch-02',
    title: 'Called Here Faith Over Fear Crewneck Sweatshirt: Mountain Pullover',
    price: 47.13,
    category: 'men',
    subcat: 'crewnecks',
    message: 'faith',
    colors: ['#0A0A0A', '#1E3A8A', '#4A5568'],
    colorNames: ['Black', 'Navy', 'Sport Grey'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    badge: 'BESTSELLER',
    imageLabel: 'FAITH OVER FEAR CREWNECK'
  },
  {
    id: 'ch-03',
    title: 'Called Here Toddler Hoodie: Brave Enough to Begin – Joshua 1:9',
    price: 44.11,
    category: 'kids',
    subcat: 'hoodies',
    message: 'courage',
    colors: ['#0A0A0A', '#D4AF37', '#78350F'],
    colorNames: ['Black', 'Sand', 'Maroon'],
    sizes: ['2T', '3T', '4T', '5T'],
    badge: 'NEW',
    imageLabel: 'TODDLER HOODIE — BRAVE'
  },
  {
    id: 'ch-04',
    title: 'Called Here Christian Hooded Sweatshirt: Known, Loved and Chosen',
    price: 47.77,
    priceMax: 54.62,
    category: 'women',
    subcat: 'hoodies',
    message: 'purpose',
    colors: ['#0A0A0A', '#FFFFFF', '#D4AF37'],
    colorNames: ['Black', 'White', 'Sand'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    badge: '',
    imageLabel: 'KNOWN LOVED CHOSEN HOODIE'
  },
  {
    id: 'ch-05',
    title: 'Called Here Seasons of Grace Hoodie: Held Through the Seasons – Psalm 121:4',
    price: 47.77,
    priceMax: 54.62,
    category: 'women',
    subcat: 'hoodies',
    message: 'seasons',
    colors: ['#0A0A0A', '#4A5568', '#172554'],
    colorNames: ['Black', 'Sport Grey', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    badge: 'SAVE $10',
    originalPrice: 57.77,
    imageLabel: 'SEASONS OF GRACE HOODIE'
  },
  {
    id: 'ch-06',
    title: 'Called Here Kids Tee: Beautifully Redeemed Cross Shirt',
    price: 19.82,
    category: 'kids',
    subcat: 'tees',
    message: 'grace',
    colors: ['#FFFFFF', '#0A0A0A', '#1E3A8A'],
    colorNames: ['White', 'Black', 'Royal'],
    sizes: ['2T', '3T', '4T', '5T'],
    badge: '',
    imageLabel: 'KIDS REDEEMED CROSS TEE'
  },
  {
    id: 'ch-07',
    title: 'Called Here Beautifully Redeemed T-Shirt: Floral Cross Tee',
    price: 27.58,
    priceMax: 39.49,
    category: 'women',
    subcat: 'tees',
    message: 'grace',
    colors: ['#FFFFFF', '#0A0A0A', '#D4AF37'],
    colorNames: ['White', 'Black', 'Sand'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    badge: 'BESTSELLER',
    imageLabel: 'FLORAL CROSS TEE'
  },
  {
    id: 'ch-08',
    title: 'Called Here Faith & Flourish T-Shirt: Christian Tee with Laurel Wreath',
    price: 27.03,
    priceMax: 39.78,
    category: 'women',
    subcat: 'tees',
    message: 'faith',
    colors: ['#0A0A0A', '#FFFFFF', '#4A5568'],
    colorNames: ['Black', 'White', 'Sport Grey'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    badge: '',
    imageLabel: 'FAITH & FLOURISH TEE'
  },
  {
    id: 'ch-09',
    title: 'Called Here Way Is Made Hoodie: Cross and Scenic Back',
    price: 47.77,
    priceMax: 54.62,
    category: 'men',
    subcat: 'hoodies',
    message: 'purpose',
    colors: ['#0A0A0A', '#172554', '#78350F'],
    colorNames: ['Black', 'Navy', 'Maroon'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    badge: 'NEW',
    imageLabel: 'WAY IS MADE HOODIE'
  },
  {
    id: 'ch-10',
    title: 'Called Here Kids T-Shirt: No Turning Back Compass Tee',
    price: 20.61,
    priceMax: 24.74,
    category: 'kids',
    subcat: 'tees',
    message: 'courage',
    colors: ['#172554', '#FFFFFF', '#4A5568'],
    colorNames: ['Navy', 'White', 'Sport Grey'],
    sizes: ['2T', '3T', '4T', '5T'],
    badge: '',
    imageLabel: 'KIDS COMPASS TEE'
  },
  {
    id: 'ch-11',
    title: 'Light Within Tee: Christian Sunrise Faith T-Shirt',
    price: 29.70,
    priceMax: 42.53,
    category: 'women',
    subcat: 'tees',
    message: 'faith',
    colors: ['#FFFFFF', '#D4AF37', '#0A0A0A'],
    colorNames: ['White', 'Sand', 'Black'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    badge: 'NEW',
    imageLabel: 'SUNRISE FAITH TEE'
  },
  {
    id: 'ch-12',
    title: 'Chosen & Covered Tee: Christian Faith Shirt with Shield Cross',
    price: 29.78,
    priceMax: 39.59,
    category: 'women',
    subcat: 'tees',
    message: 'purpose',
    colors: ['#0A0A0A', '#FFFFFF', '#172554'],
    colorNames: ['Black', 'White', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    badge: '',
    imageLabel: 'SHIELD CROSS TEE'
  },
  {
    id: 'ch-13',
    title: 'Be Still Wave Graphic Tee: Calm & Inspirational Shirt',
    price: 30.89,
    priceMax: 45.46,
    category: 'women',
    subcat: 'tees',
    message: 'peace',
    colors: ['#172554', '#4A5568', '#FFFFFF'],
    colorNames: ['Navy', 'Sport Grey', 'White'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    badge: 'BESTSELLER',
    imageLabel: 'BE STILL WAVE TEE'
  },
  {
    id: 'ch-14',
    title: 'Grace Wins T-Shirt: Grace Tee',
    price: 28.83,
    priceMax: 38.32,
    category: 'women',
    subcat: 'tees',
    message: 'grace',
    colors: ['#0A0A0A', '#FFFFFF', '#78350F'],
    colorNames: ['Black', 'White', 'Maroon'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    badge: 'SAVE $8',
    originalPrice: 36.83,
    imageLabel: 'GRACE WINS TEE'
  },
  {
    id: 'ch-15',
    title: 'Rooted in Grace T-Shirt',
    price: 29.94,
    priceMax: 44.07,
    category: 'men',
    subcat: 'tees',
    message: 'rooted',
    colors: ['#0A0A0A', '#4A5568', '#D4AF37'],
    colorNames: ['Black', 'Sport Grey', 'Sand'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    badge: 'NEW',
    imageLabel: 'ROOTED IN GRACE TEE'
  },
  {
    id: 'ch-16',
    title: 'Walk By Faith T-Shirt',
    price: 30.03,
    priceMax: 44.19,
    category: 'men',
    subcat: 'tees',
    message: 'faith',
    colors: ['#172554', '#0A0A0A', '#FFFFFF'],
    colorNames: ['Navy', 'Black', 'White'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    badge: 'BESTSELLER',
    imageLabel: 'WALK BY FAITH TEE'
  },
  {
    id: 'ch-17',
    title: 'Made For More T-Shirt: Motivational Crown Graphic Tee',
    price: 29.22,
    priceMax: 43.00,
    category: 'men',
    subcat: 'tees',
    message: 'purpose',
    colors: ['#0A0A0A', '#FFFFFF', '#D4AF37'],
    colorNames: ['Black', 'White', 'Sand'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    badge: '',
    imageLabel: 'MADE FOR MORE TEE'
  },
  {
    id: 'ch-18',
    title: 'Stand Firm T-Shirt: Mountain Tee',
    price: 29.06,
    priceMax: 42.77,
    category: 'men',
    subcat: 'tees',
    message: 'courage',
    colors: ['#4A5568', '#0A0A0A', '#172554'],
    colorNames: ['Sport Grey', 'Black', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    badge: '',
    imageLabel: 'STAND FIRM MOUNTAIN TEE'
  },
  {
    id: 'ch-19',
    title: 'Toddler Hoodie: Every Season Has a Purpose – ECC 3:1',
    price: 44.11,
    category: 'kids',
    subcat: 'hoodies',
    message: 'seasons',
    colors: ['#D4AF37', '#0A0A0A'],
    colorNames: ['Sand', 'Black'],
    sizes: ['2T', '3T', '4T', '5T'],
    badge: 'NEW',
    imageLabel: 'TODDLER HOODIE — SEASONS'
  },
  {
    id: 'ch-20',
    title: 'Toddler Sweatshirt: Mercy Meets Me Here – Psalm 103:8',
    price: 43.23,
    category: 'kids',
    subcat: 'crewnecks',
    message: 'grace',
    colors: ['#4A5568', '#FFFFFF'],
    colorNames: ['Sport Grey', 'White'],
    sizes: ['2T', '3T', '4T', '5T'],
    badge: '',
    imageLabel: 'TODDLER SWEATSHIRT — MERCY'
  },
  {
    id: 'ch-21',
    title: 'Kids T-Shirt: A Gentle Spirit Dove Graphic Tee',
    price: 19.82,
    priceMax: 23.80,
    category: 'kids',
    subcat: 'tees',
    message: 'grace',
    colors: ['#FFFFFF', '#172554'],
    colorNames: ['White', 'Navy'],
    sizes: ['2T', '3T', '4T', '5T'],
    badge: '',
    imageLabel: 'KIDS GENTLE SPIRIT DOVE'
  },
  {
    id: 'ch-22',
    title: 'Armor On T-Shirt: Shield & Sword Tee',
    price: 28.83,
    priceMax: 42.43,
    category: 'men',
    subcat: 'tees',
    message: 'courage',
    colors: ['#0A0A0A', '#4A5568', '#172554'],
    colorNames: ['Black', 'Sport Grey', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    badge: 'NEW',
    imageLabel: 'ARMOR ON SHIELD TEE'
  },
  {
    id: 'ch-23',
    title: 'Built on the Rock T-Shirt',
    price: 27.58,
    priceMax: 39.49,
    category: 'men',
    subcat: 'tees',
    message: 'rooted',
    colors: ['#0A0A0A', '#FFFFFF', '#D4AF37'],
    colorNames: ['Black', 'White', 'Sand'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    badge: '',
    imageLabel: 'BUILT ON THE ROCK TEE'
  },
  {
    id: 'ch-24',
    title: 'Kingdom Mindset T-Shirt',
    price: 29.62,
    priceMax: 43.59,
    category: 'men',
    subcat: 'tees',
    message: 'purpose',
    colors: ['#0A0A0A', '#172554', '#78350F'],
    colorNames: ['Black', 'Navy', 'Maroon'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    badge: 'BESTSELLER',
    imageLabel: 'KINGDOM MINDSET TEE'
  },
  {
    id: 'ch-25',
    title: 'Anchor Your Soul Crewneck – Hebrews 6:19',
    price: 41.53,
    priceMax: 48.50,
    category: 'women',
    subcat: 'crewnecks',
    message: 'faith',
    colors: ['#172554', '#4A5568', '#FFFFFF'],
    colorNames: ['Navy', 'Sport Grey', 'White'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    badge: '',
    imageLabel: 'ANCHOR YOUR SOUL CREW'
  },
  {
    id: 'ch-26',
    title: 'Called to the Ordinary Crewneck',
    price: 41.53,
    priceMax: 53.48,
    category: 'men',
    subcat: 'crewnecks',
    message: 'purpose',
    colors: ['#0A0A0A', '#4A5568'],
    colorNames: ['Black', 'Sport Grey'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    badge: 'NEW',
    imageLabel: 'CALLED ORDINARY CREW'
  },
  {
    id: 'ch-27',
    title: 'Grace in the Gaps Crewneck – Ephesians 3:20',
    price: 55.38,
    priceMax: 71.31,
    category: 'women',
    subcat: 'crewnecks',
    message: 'grace',
    colors: ['#D4AF37', '#0A0A0A', '#FFFFFF'],
    colorNames: ['Sand', 'Black', 'White'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    badge: 'SAVE $15',
    originalPrice: 70.38,
    imageLabel: 'GRACE IN GAPS CREW'
  },
  {
    id: 'ch-28',
    title: 'Here With Purpose Hoodie – JER 29:11',
    price: 47.77,
    priceMax: 54.62,
    category: 'men',
    subcat: 'hoodies',
    message: 'purpose',
    colors: ['#0A0A0A', '#172554', '#D4AF37'],
    colorNames: ['Black', 'Navy', 'Sand'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    badge: 'BESTSELLER',
    imageLabel: 'HERE WITH PURPOSE HOODIE'
  },
  {
    id: 'ch-29',
    title: 'Still Becoming Hoodie – PHIL 3:14',
    price: 47.77,
    priceMax: 54.62,
    category: 'women',
    subcat: 'hoodies',
    message: 'courage',
    colors: ['#4A5568', '#0A0A0A', '#78350F'],
    colorNames: ['Sport Grey', 'Black', 'Maroon'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    badge: '',
    imageLabel: 'STILL BECOMING HOODIE'
  },
  {
    id: 'ch-30',
    title: 'Planted for this Season Crewneck – Psalms 1:3',
    price: 45.31,
    priceMax: 58.35,
    category: 'women',
    subcat: 'crewnecks',
    message: 'seasons',
    colors: ['#0A0A0A', '#D4AF37', '#4A5568'],
    colorNames: ['Black', 'Sand', 'Sport Grey'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    badge: 'NEW',
    imageLabel: 'PLANTED THIS SEASON CREW'
  },
  {
    id: 'ch-31',
    title: 'Faith Cross and Quiet Courage Crewneck',
    price: 40.28,
    priceMax: 47.25,
    category: 'men',
    subcat: 'crewnecks',
    message: 'courage',
    colors: ['#172554', '#0A0A0A', '#4A5568'],
    colorNames: ['Navy', 'Black', 'Sport Grey'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    badge: '',
    imageLabel: 'QUIET COURAGE CREW'
  },
  {
    id: 'ch-32',
    title: 'Called Here Signature Trucker Cap: Wear Your Purpose',
    price: 29.50,
    category: 'accessories',
    subcat: 'accessories',
    message: 'purpose',
    colors: ['#0A0A0A', '#172554'],
    colorNames: ['Black', 'Navy'],
    sizes: ['One Size'],
    badge: 'NEW',
    imageLabel: 'SIGNATURE TRUCKER CAP'
  },
  {
    id: 'ch-33',
    title: 'Courage Over Comfort Heavyweight Hoodie',
    price: 48.95,
    priceMax: 56.50,
    category: 'men',
    subcat: 'hoodies',
    message: 'courage',
    colors: ['#0A0A0A', '#4A5568'],
    colorNames: ['Black', 'Sport Grey'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    badge: 'BESTSELLER',
    imageLabel: 'COURAGE OVER COMFORT HOODIE'
  },
  {
    id: 'ch-34',
    title: 'Seasons & Grace Canvas Tote Bag',
    price: 24.00,
    category: 'accessories',
    subcat: 'accessories',
    message: 'seasons',
    colors: ['#D4AF37', '#0A0A0A'],
    colorNames: ['Sand', 'Black'],
    sizes: ['One Size'],
    badge: '',
    imageLabel: 'CANVAS TOTE BAG'
  },
  {
    id: 'ch-35',
    title: 'Known By Him Relaxed Fit Tee',
    price: 28.50,
    priceMax: 38.00,
    category: 'women',
    subcat: 'tees',
    message: 'purpose',
    colors: ['#FFFFFF', '#0A0A0A', '#4A5568'],
    colorNames: ['White', 'Black', 'Sport Grey'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    badge: 'SAVE $5',
    originalPrice: 33.50,
    imageLabel: 'KNOWN BY HIM RELAXED TEE'
  },
  {
    id: 'ch-36',
    title: 'Joshua 1:9 Strong & Courageous Heavyweight Tee',
    price: 32.00,
    priceMax: 44.00,
    category: 'men',
    subcat: 'tees',
    message: 'courage',
    colors: ['#0A0A0A', '#172554', '#78350F'],
    colorNames: ['Black', 'Navy', 'Maroon'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    badge: 'NEW',
    imageLabel: 'JOSHUA 1:9 STRONG TEE'
  },
  {
    id: 'ch-37',
    title: 'Toddler Daily Grace Pullover – Matthew 6:34',
    price: 42.50,
    category: 'kids',
    subcat: 'crewnecks',
    message: 'grace',
    colors: ['#FFFFFF', '#D4AF37'],
    colorNames: ['White', 'Sand'],
    sizes: ['2T', '3T', '4T', '5T'],
    badge: '',
    imageLabel: 'TODDLER DAILY GRACE PULLOVER'
  },
  {
    id: 'ch-38',
    title: 'Grace Upon Grace Embroidered Beanie',
    price: 27.75,
    category: 'accessories',
    subcat: 'beanies',
    message: 'grace',
    colors: ['#0A0A0A', '#D4AF37', '#172554'],
    colorNames: ['Black', 'Sand', 'Navy'],
    sizes: ['One Size'],
    badge: '',
    imageLabel: 'GRACE UPON GRACE BEANIE'
  },
  {
    id: 'ch-39',
    title: 'Steadfast Heart Boxy Fit Tee',
    price: 30.00,
    priceMax: 42.00,
    category: 'women',
    subcat: 'tees',
    message: 'rooted',
    colors: ['#FFFFFF', '#0A0A0A', '#4A5568'],
    colorNames: ['White', 'Black', 'Sport Grey'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    badge: 'BESTSELLER',
    imageLabel: 'STEADFAST HEART BOXY TEE'
  },
  {
    id: 'ch-40',
    title: 'Iron Sharpens Iron Athletic Tee',
    price: 31.50,
    priceMax: 43.50,
    category: 'men',
    subcat: 'tees',
    message: 'courage',
    colors: ['#0A0A0A', '#4A5568', '#1E3A8A'],
    colorNames: ['Black', 'Sport Grey', 'Royal'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    badge: '',
    imageLabel: 'IRON SHARPENS IRON TEE'
  },
  {
    id: 'ch-41',
    title: 'Kids Seed of Faith Minimal Cross Tee',
    price: 21.00,
    category: 'kids',
    subcat: 'tees',
    message: 'faith',
    colors: ['#FFFFFF', '#0A0A0A'],
    colorNames: ['White', 'Black'],
    sizes: ['2T', '3T', '4T', '5T'],
    badge: 'NEW',
    imageLabel: 'KIDS SEED OF FAITH TEE'
  },
  {
    id: 'ch-42',
    title: 'Faith in the Waiting Premium Heavy Hoodie',
    price: 49.00,
    priceMax: 56.00,
    category: 'women',
    subcat: 'hoodies',
    message: 'seasons',
    colors: ['#0A0A0A', '#D4AF37'],
    colorNames: ['Black', 'Sand'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    badge: 'NEW',
    imageLabel: 'FAITH IN WAITING HOODIE'
  }
];

let currentFilters = {
  category: 'all',
  subcat: [],
  sizes: [],
  colors: [],
  messages: [],
  priceMax: 75,
  inStockOnly: false,
  sort: 'featured',
  displayLimit: 30
};

document.addEventListener('DOMContentLoaded', () => {
  const shopGrid = document.getElementById('shopProductGrid');
  if (!shopGrid) return; // Not on shop page

  // Check URL category if on category-*.html
  const pageCategory = document.body.getAttribute('data-page-category');
  if (pageCategory && pageCategory !== 'all') {
    currentFilters.category = pageCategory;
  }

  initFilterControls();
  initSortControls();
  initDensityControls();
  initLoadMore();
  initSidebarDrawerMobile();
  renderFilteredProducts();
});

function initFilterControls() {
  // Subcategory pills
  document.querySelectorAll('.js-chip-filter').forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.js-chip-filter').forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const val = chip.getAttribute('data-subcat');
      currentFilters.subcat = val === 'all' ? [] : [val];
      currentFilters.displayLimit = 30;
      renderFilteredProducts();
    });
  });

  // Checkbox groups (Category, Size, Message)
  document.querySelectorAll('.js-filter-checkbox').forEach(box => {
    box.addEventListener('change', () => {
      const group = box.getAttribute('data-filter-group');
      const val = box.value;
      if (box.checked) {
        if (!currentFilters[group].includes(val)) currentFilters[group].push(val);
      } else {
        currentFilters[group] = currentFilters[group].filter(item => item !== val);
      }
      currentFilters.displayLimit = 30;
      renderFilteredProducts();
    });
  });

  // Color Swatches
  document.querySelectorAll('.color-filter-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatch.classList.toggle('is-active');
      const color = swatch.getAttribute('data-color');
      if (swatch.classList.contains('is-active')) {
        currentFilters.colors.push(color);
      } else {
        currentFilters.colors = currentFilters.colors.filter(c => c !== color);
      }
      currentFilters.displayLimit = 30;
      renderFilteredProducts();
    });
  });

  // Price slider
  const priceSlider = document.getElementById('priceRangeSlider');
  const priceDisplay = document.getElementById('priceRangeDisplay');
  if (priceSlider && priceDisplay) {
    priceSlider.addEventListener('input', () => {
      currentFilters.priceMax = Number(priceSlider.value);
      priceDisplay.textContent = `$${currentFilters.priceMax}`;
      currentFilters.displayLimit = 30;
      renderFilteredProducts();
    });
  }

  // Clear filters triggers
  document.querySelectorAll('.js-clear-filters').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      resetAllFilters();
    });
  });
}

function resetAllFilters() {
  currentFilters.subcat = [];
  currentFilters.sizes = [];
  currentFilters.colors = [];
  currentFilters.messages = [];
  currentFilters.priceMax = 75;

  document.querySelectorAll('.js-filter-checkbox').forEach(b => b.checked = false);
  document.querySelectorAll('.color-filter-swatch').forEach(s => s.classList.remove('is-active'));
  document.querySelectorAll('.js-chip-filter').forEach(c => {
    c.classList.toggle('is-active', c.getAttribute('data-subcat') === 'all');
  });

  const priceSlider = document.getElementById('priceRangeSlider');
  const priceDisplay = document.getElementById('priceRangeDisplay');
  if (priceSlider && priceDisplay) {
    priceSlider.value = 75;
    priceDisplay.textContent = '$75';
  }

  renderFilteredProducts();
}

function initSortControls() {
  const sortSelect = document.getElementById('shopSortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentFilters.sort = sortSelect.value;
      renderFilteredProducts();
    });
  }
}

function initDensityControls() {
  const densityBtns = document.querySelectorAll('.density-btn');
  const grid = document.getElementById('shopProductGrid');
  if (!grid) return;

  densityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      densityBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const cols = btn.getAttribute('data-cols');
      grid.className = 'product-grid';
      if (cols === '3') grid.classList.add('product-grid--cols-3');
      if (cols === '2') grid.classList.add('product-grid--cols-2');
    });
  });
}

function initLoadMore() {
  const loadMoreBtn = document.getElementById('shopLoadMoreBtn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      currentFilters.displayLimit += 15;
      renderFilteredProducts();
    });
  }
}

function initSidebarDrawerMobile() {
  const toggleBtn = document.getElementById('filterDrawerMobileToggle');
  const drawer = document.getElementById('filterDrawerMobile');
  const closeBtn = document.getElementById('filterDrawerMobileClose');
  const backdrop = document.getElementById('drawerBackdrop');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.add('is-active');
      if (backdrop) backdrop.classList.add('is-active');
      document.body.classList.add('no-scroll');
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('is-active');
      if (backdrop) backdrop.classList.remove('is-active');
      document.body.classList.remove('no-scroll');
    });
  }
}

function renderFilteredProducts() {
  const grid = document.getElementById('shopProductGrid');
  const countDisplay = document.getElementById('shopProductCount');
  const activeChipsBar = document.getElementById('activeFilterChips');
  const emptyState = document.getElementById('shopEmptyState');
  const loadMoreBtn = document.getElementById('shopLoadMoreBtn');
  const loadMoreText = document.getElementById('shopLoadMoreText');

  if (!grid) return;

  // Filter calculation
  let results = SHOP_PRODUCTS.filter(item => {
    // Top-level Category match
    if (currentFilters.category !== 'all' && item.category !== currentFilters.category) {
      return false;
    }
    // Sub-category match
    if (currentFilters.subcat.length > 0 && !currentFilters.subcat.includes(item.subcat)) {
      return false;
    }
    // Sizes match
    if (currentFilters.sizes.length > 0) {
      const hasSize = currentFilters.sizes.some(s => item.sizes.includes(s));
      if (!hasSize) return false;
    }
    // Colors match
    if (currentFilters.colors.length > 0) {
      const hasColor = currentFilters.colors.some(c => item.colorNames.includes(c));
      if (!hasColor) return false;
    }
    // Message match
    if (currentFilters.messages.length > 0 && !currentFilters.messages.includes(item.message)) {
      return false;
    }
    // Price match
    if (item.price > currentFilters.priceMax) {
      return false;
    }

    return true;
  });

  // Sort results
  if (currentFilters.sort === 'price-asc') {
    results.sort((a, b) => a.price - b.price);
  } else if (currentFilters.sort === 'price-desc') {
    results.sort((a, b) => b.price - a.price);
  } else if (currentFilters.sort === 'newest') {
    results.sort((a, b) => (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0));
  } else if (currentFilters.sort === 'best-selling') {
    results.sort((a, b) => (b.badge === 'BESTSELLER' ? 1 : 0) - (a.badge === 'BESTSELLER' ? 1 : 0));
  }

  // Update counts
  if (countDisplay) {
    countDisplay.textContent = `${results.length} Products`;
  }

  // Active filter chips UI
  if (activeChipsBar) {
    let chipsHtml = '';
    currentFilters.subcat.forEach(sc => {
      chipsHtml += `<button class="chip is-active js-remove-chip" data-type="subcat" data-val="${sc}">${sc} ✕</button>`;
    });
    currentFilters.sizes.forEach(sz => {
      chipsHtml += `<button class="chip is-active js-remove-chip" data-type="sizes" data-val="${sz}">Size: ${sz} ✕</button>`;
    });
    currentFilters.colors.forEach(col => {
      chipsHtml += `<button class="chip is-active js-remove-chip" data-type="colors" data-val="${col}">Color: ${col} ✕</button>`;
    });
    currentFilters.messages.forEach(msg => {
      chipsHtml += `<button class="chip is-active js-remove-chip" data-type="messages" data-val="${msg}">Message: ${msg} ✕</button>`;
    });

    if (chipsHtml) {
      chipsHtml += `<button class="link-cta js-clear-filters" style="margin-left:8px;">Clear all</button>`;
      activeChipsBar.innerHTML = chipsHtml;
      activeChipsBar.style.display = 'flex';

      // Attach chip remove handlers
      activeChipsBar.querySelectorAll('.js-remove-chip').forEach(cBtn => {
        cBtn.addEventListener('click', () => {
          const type = cBtn.getAttribute('data-type');
          const val = cBtn.getAttribute('data-val');
          currentFilters[type] = currentFilters[type].filter(x => x !== val);
          // Uncheck corresponding checkbox
          document.querySelectorAll(`.js-filter-checkbox[value="${val}"]`).forEach(b => b.checked = false);
          renderFilteredProducts();
        });
      });
      activeChipsBar.querySelectorAll('.js-clear-filters').forEach(b => b.addEventListener('click', resetAllFilters));
    } else {
      activeChipsBar.style.display = 'none';
      activeChipsBar.innerHTML = '';
    }
  }

  // Empty state handling
  if (results.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.classList.add('is-active');
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.classList.remove('is-active');

  // Display pagination batch
  const displayed = results.slice(0, currentFilters.displayLimit);

  if (loadMoreBtn && loadMoreText) {
    if (results.length > currentFilters.displayLimit) {
      loadMoreBtn.style.display = 'inline-flex';
      loadMoreText.textContent = `Showing ${displayed.length} of ${results.length}`;
    } else {
      loadMoreBtn.style.display = 'none';
    }
  }

  // Render cards HTML
  grid.innerHTML = displayed.map(item => createProductCardHtml(item)).join('');
}

function createProductCardHtml(item) {
  const isWishlisted = window.CalledHere && window.CalledHere.wishlist.includes(item.id);

  let badgeHtml = '';
  if (item.badge) {
    const isAccentBadge = item.badge.startsWith('SAVE');
    badgeHtml = `<span class="badge-pill ${isAccentBadge ? 'badge-pill--accent' : ''}">${item.badge}</span>`;
  }

  let priceHtml = '';
  if (item.priceMax) {
    priceHtml = `<span class="product-card__price">$${item.price.toFixed(2)} – $${item.priceMax.toFixed(2)}</span>`;
  } else if (item.originalPrice) {
    priceHtml = `
      <span class="product-card__price product-card__price--sale">$${item.price.toFixed(2)}</span>
      <span class="product-card__price--original">$${item.originalPrice.toFixed(2)}</span>
    `;
  } else {
    priceHtml = `<span class="product-card__price">$${item.price.toFixed(2)}</span>`;
  }

  const swatchesHtml = item.colors.slice(0, 3).map((col, idx) => `
    <span class="swatch-dot ${idx === 0 ? 'is-active' : ''}" style="background-color: ${col};" title="${item.colorNames[idx]}"></span>
  `).join('') + (item.colors.length > 3 ? `<span class="swatch-more">+${item.colors.length - 3}</span>` : '');

  const quickSizesHtml = item.sizes.slice(0, 5).map(sz => `
    <button class="quick-size-btn" onclick="addToBag({id:'${item.id}', title:'${item.title.replace(/'/g, "\\'")}', price:${item.price}, variant:'${item.colorNames[0]} / ${sz}', imageLabel:'${item.imageLabel}'})">${sz}</button>
  `).join('');

  return `
    <article class="product-card" data-id="${item.id}">
      <div class="product-card__media-wrap">
        <a href="product.html" aria-label="${item.title}">
          <div class="ph ph--product product-card__media" data-label="${item.imageLabel} — FRONT"></div>
          <div class="ph ph--product product-card__media--back ph--dark" data-label="${item.imageLabel} — BACK"></div>
        </a>
        <div class="product-card__badges">
          ${badgeHtml}
        </div>
        <button class="product-card__wishlist js-wishlist-toggle ${isWishlisted ? 'is-active' : ''}" aria-label="Save to Wishlist" data-product-id="${item.id}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        </button>
        <div class="product-card__quick-add">
          <span style="font-size:11px; font-weight:700; text-transform:uppercase; margin-right:4px;">Quick Add:</span>
          ${quickSizesHtml}
        </div>
      </div>
      <div class="product-card__info">
        <h3 class="product-card__title">
          <a href="product.html">${item.title}</a>
        </h3>
        <div class="product-card__price-row">
          ${priceHtml}
        </div>
        <div class="product-card__swatches">
          ${swatchesHtml}
        </div>
      </div>
    </article>
  `;
}

