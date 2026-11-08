const puppeteer = require('puppeteer-core');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const viewports = [320, 375, 768, 1024, 1440];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  console.log('=== CHECK 1: MOBILE HORIZONTAL OVERFLOW ===');
  for (const w of viewports) {
    await page.setViewport({ width: w, height: 800 });
    await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + '/index.html', { waitUntil: 'load' });
    const data = await page.evaluate(() => {
      const sw = document.documentElement.scrollWidth;
      const cw = document.documentElement.clientWidth;
      const kidsBanner = document.querySelector('.kids-hero-banner');
      const kidsRect = kidsBanner ? kidsBanner.getBoundingClientRect() : null;
      const trustStrip = document.querySelector('.trust-strip');
      const trustRect = trustStrip ? trustStrip.getBoundingClientRect() : null;
      return {
        sw,
        cw,
        kidsRight: kidsRect ? Math.round(kidsRect.right) : null,
        kidsWidth: kidsRect ? Math.round(kidsRect.width) : null,
        trustRight: trustRect ? Math.round(trustRect.right) : null,
        trustWidth: trustRect ? Math.round(trustRect.width) : null
      };
    });
    const pass = data.sw === data.cw;
    console.log(`Viewport ${w}px: scrollWidth = ${data.sw}, clientWidth = ${data.cw} -> PASS: ${pass}`);
    console.log(`  .kids-hero-banner: width = ${data.kidsWidth}px, right = ${data.kidsRight}px`);
    console.log(`  .trust-strip: width = ${data.trustWidth}px, right = ${data.trustRight}px`);
  }

  console.log('\n=== CHECK 2: HEADER COLLAPSE LAYOUT SHIFT ===');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + '/index.html', { waitUntil: 'load' });

  const initialDocHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log('Initial document scrollHeight at scroll 0:', initialDocHeight);

  // Scroll to 400
  await page.evaluate(() => window.scrollTo(0, 400));
  // Wait a tick for scroll handler to fire
  await new Promise(r => setTimeout(r, 200));

  const afterScrollData = await page.evaluate(() => {
    const nav = document.querySelector('.header-row-nav');
    const isCollapsed = nav.classList.contains('is-collapsed');
    const navVisibility = window.getComputedStyle(nav).visibility;
    const navOpacity = window.getComputedStyle(nav).opacity;
    const navMaxHeight = window.getComputedStyle(nav).maxHeight;
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    return {
      isCollapsed,
      navVisibility,
      navOpacity,
      navMaxHeight,
      scrollY,
      docHeight
    };
  });
  console.log('After scrollTo(400):');
  console.log('  window.scrollY:', afterScrollData.scrollY, '(Target: 400)');
  console.log('  document.scrollHeight:', afterScrollData.docHeight, `(Initial: ${initialDocHeight}, Diff: ${afterScrollData.docHeight - initialDocHeight})`);
  console.log('  isCollapsed:', afterScrollData.isCollapsed);
  console.log('  visibility:', afterScrollData.navVisibility, '(Expected: hidden)');
  console.log('  opacity:', afterScrollData.navOpacity);
  console.log('  maxHeight:', afterScrollData.navMaxHeight);

  console.log('\n=== CHECK 3: PLACEHOLDER LABELS OVER TEXT ===');
  const phCheck = await page.evaluate(() => {
    const heroPh = document.querySelector('.hero-fullbleed .ph');
    const kidsPh = document.querySelector('.kids-hero-banner .ph');
    const cardPh = document.querySelector('.product-card .ph');

    const heroAfter = window.getComputedStyle(heroPh, '::after').content;
    const kidsAfter = window.getComputedStyle(kidsPh, '::after').content;
    const cardAfter = window.getComputedStyle(cardPh, '::after').content;

    return { heroAfter, kidsAfter, cardAfter };
  });
  console.log('Hero .ph::after content:', phCheck.heroAfter, '(Expected: none)');
  console.log('Kids .ph::after content:', phCheck.kidsAfter, '(Expected: none)');
  console.log('Product card .ph::after content:', phCheck.cardAfter, '(Expected: contains label)');

  console.log('\n=== CHECK 4: MINI CART TITLE ===');
  const cartTitleCheck = await page.evaluate(() => {
    const title = document.querySelector('#miniCartDrawer .drawer__header .drawer__title, #miniCartDrawer .drawer__header .t-h3');
    const titleRect = title.getBoundingClientRect();
    const style = window.getComputedStyle(title);
    return {
      text: title.innerText.replace(/\s+/g, ' ').trim(),
      whiteSpace: style.whiteSpace,
      height: Math.round(titleRect.height),
      lineHeight: style.lineHeight
    };
  });
  console.log('Cart Title text:', cartTitleCheck.text);
  console.log('Cart Title white-space:', cartTitleCheck.whiteSpace);
  console.log('Cart Title height:', cartTitleCheck.height, 'px');

  console.log('\n=== CHECK 5: ALIGNMENT AND LOGO ===');
  // Check alignment at 1142px
  await page.setViewport({ width: 1142, height: 800 });
  await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + '/index.html', { waitUntil: 'load' });
  const align1142 = await page.evaluate(() => {
    const logo = document.querySelector('.header-logo');
    const heroContent = document.querySelector('.hero-content');
    const heroHeadline = document.querySelector('.hero-headline');
    const logoRect = logo.getBoundingClientRect();
    const heroRect = heroContent.getBoundingClientRect();
    const headlineRect = heroHeadline.getBoundingClientRect();
    return {
      logoLeft: Math.round(logoRect.left),
      heroContentLeft: Math.round(heroRect.left),
      headlineLeft: Math.round(headlineRect.left)
    };
  });
  console.log('At 1142px viewport:');
  console.log('  Logo left:', align1142.logoLeft, 'px');
  console.log('  Hero content left:', align1142.heroContentLeft, 'px');
  console.log('  Hero headline left:', align1142.headlineLeft, 'px');
  console.log('  Aligned:', align1142.logoLeft === align1142.headlineLeft ? 'YES' : 'NO');

  // Check logo at 320px
  await page.setViewport({ width: 320, height: 600 });
  const logo320 = await page.evaluate(() => {
    const logo = document.querySelector('.header-logo');
    const style = window.getComputedStyle(logo);
    const rect = logo.getBoundingClientRect();
    return {
      fontSize: style.fontSize,
      whiteSpace: style.whiteSpace,
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      lineHeight: style.lineHeight
    };
  });
  console.log('\nLogo at 320px viewport:');
  console.log('  Font size:', logo320.fontSize);
  console.log('  White-space:', logo320.whiteSpace);
  console.log('  Dimensions: width =', logo320.width, 'px, height =', logo320.height, 'px');

  await browser.close();
})();

