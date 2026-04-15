/**
 * pSEO Page Generator for inch-to-cm.online
 * Run with: node generate-pages.js
 * Generates: conversion pages, TV pages, aggregate pages, blog articles
 */

const fs = require('fs');
const path = require('path');

const SITE = 'https://inch-to-cm.online';
const BASE = __dirname;

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// ============================================================
// Shared HTML snippets
// ============================================================
const GA_TAG = `<link rel="preconnect" href="https://www.googletagmanager.com">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-C0BMSYZ6DH"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date);gtag("config","G-C0BMSYZ6DH")</script>`;

const NAV = `<nav class="site-nav"><div class="container">
<a href="/" class="logo-link">📏 Inch-to-CM</a>
<div class="nav-links">
<a href="/inch-to-cm-chart">Chart</a>
<a href="/tv-size-conversion">TV Sizes</a>
<a href="/height-conversion">Height</a>
<a href="/clothing-size-conversion">Clothing</a>
<a href="/guides/">Guides</a>
<a href="/blogs/">Blog</a>
</div>
</div></nav>`;

const FOOTER = `<footer><div class="container">
<div class="footer-links">
<a href="/about.html">About</a>
<a href="/contact.html">Contact</a>
<a href="/privacy.html">Privacy Policy</a>
<a href="/terms.html">Terms of Service</a>
<a href="/disclaimer.html">Disclaimer</a>
</div>
<p>&copy; 2026 inch-to-cm.online. All rights reserved.</p>
<p>Accurate inch to cm conversions &amp; size guides</p>
</div></footer>`;

const SHARED_JS = `<script>
function toggleFaq(el){var item=el.parentElement;var isOpen=item.classList.contains("open");document.querySelectorAll(".faq-item").forEach(function(i){i.classList.remove("open")});if(!isOpen)item.classList.add("open")}
function miniConvert(inputId,outputId,factor){var v=parseFloat(document.getElementById(inputId).value)||0;document.getElementById(outputId).textContent=(v*factor).toFixed(2)+" cm"}
</script>`;

// ============================================================
// TV sizes data
// ============================================================
const TV_SIZES = [24, 27, 32, 40, 43, 50, 55, 60, 65, 70, 75, 77, 85];

function getRoomRec(inch) {
  if (inch <= 32) return 'bedrooms, kitchens, and dorm rooms (1–2m viewing distance)';
  if (inch <= 43) return 'bedrooms and small living rooms (2–2.5m viewing distance)';
  if (inch <= 55) return 'medium living rooms (2.5–3m viewing distance)';
  if (inch <= 65) return 'large living rooms (3–4m viewing distance)';
  return 'large living rooms and home theaters (4m+ viewing distance)';
}

function getRoomLabel(inch) {
  if (inch <= 32) return 'Bedroom / Desk';
  if (inch <= 50) return 'Small Living Room';
  if (inch <= 65) return 'Living Room';
  return 'Home Theater';
}

function getSizeCategory(inch) {
  if (inch <= 6) return ['Smartphone screen sizes', 'Small rulers and tools', 'Jewelry and watch sizing'];
  if (inch <= 20) return ['Tablet and laptop screens', 'Paper sizes and notebooks', 'Kitchen utensils and cookware'];
  if (inch <= 40) return ['Computer monitors and small TVs', 'Waist measurements for clothing', 'Small furniture dimensions'];
  if (inch <= 80) return ['Television screens (popular TV size)', 'Desk and table dimensions', 'Height measurements'];
  return ['Large-screen TVs and projector screens', 'Furniture and room dimensions', 'Sports equipment'];
}

// ============================================================
// Generate: /N-inch-to-cm/index.html
// ============================================================
function generateConversionPage(inch) {
  const cm = (inch * 2.54).toFixed(2);
  const prev = inch - 1;
  const next = inch + 1;
  const feet = (inch / 12).toFixed(1);
  const meters = (inch * 0.0254).toFixed(4);
  const mm = (inch * 25.4).toFixed(1);
  const isTV = inch >= 24 && inch <= 85;

  const titleSuffix = isTV ? 'Converter + TV & Size Guide' : 'Converter + Size Guide';
  const categories = getSizeCategory(inch);

  // Nearby conversions table
  let nearbyRows = '';
  for (let offset = -5; offset <= 5; offset++) {
    const v = inch + offset;
    if (v < 1) continue;
    const vc = (v * 2.54).toFixed(2);
    const vm = (v * 0.0254).toFixed(4);
    if (offset === 0) {
      nearbyRows += `<tr style="background:#EBF5FF;font-weight:600"><td>${v} in</td><td>${vc} cm</td><td>${vm} m</td></tr>\n`;
    } else {
      nearbyRows += `<tr><td><a href="/${v}-inch-to-cm/">${v} in</a></td><td>${vc} cm</td><td>${vm} m</td></tr>\n`;
    }
  }

  // TV section if applicable
  let tvSection = '';
  if (TV_SIZES.includes(inch)) {
    const w = (inch * 2.21).toFixed(1);
    const h = (inch * 1.24).toFixed(1);
    tvSection = `
<div class="card">
<h2>📺 ${inch}-Inch TV &amp; Screen Dimensions</h2>
<p>A ${inch}-inch TV or monitor measures ${cm} cm diagonally. Based on a standard 16:9 aspect ratio:</p>
<table><thead><tr><th>Dimension</th><th>Metric</th><th>Imperial</th></tr></thead>
<tbody>
<tr><td>Width</td><td>~${w} cm</td><td>~${(w / 2.54).toFixed(1)}"</td></tr>
<tr><td>Height</td><td>~${h} cm</td><td>~${(h / 2.54).toFixed(1)}"</td></tr>
<tr><td>Diagonal</td><td>${cm} cm</td><td>${inch}"</td></tr>
</tbody></table>
<p>A ${inch}-inch screen is popular for ${getRoomRec(inch)}.</p>
</div>`;
  }

  // TV FAQ if applicable
  let tvFaq = '';
  if (isTV) {
    const tvRec = inch <= 32 ? 'ideal for bedrooms or desks up to 1.5m viewing distance' :
      (inch <= 55 ? 'great for medium living rooms with 2-3m viewing distance' : 'excellent for large living rooms and home theaters with 3m+ viewing distance');
    tvFaq = `<div class="faq-item"><div class="faq-q" onclick="toggleFaq(this)">Is a ${inch}-inch TV big enough?</div><div class="faq-a">A ${inch}-inch TV (${cm} cm diagonal) is ${tvRec}. Consider your room size and seating distance.</div></div>`;
  }

  // Related links
  let relLinks = '';
  if (prev > 0) relLinks += `<a href="/${prev}-inch-to-cm/">${prev} inch to cm</a>\n`;
  relLinks += `<a href="/${next}-inch-to-cm/">${next} inch to cm</a>\n`;
  if (inch + 5 <= 1000) relLinks += `<a href="/${inch + 5}-inch-to-cm/">${inch + 5} inch to cm</a>\n`;
  if (inch + 10 <= 1000) relLinks += `<a href="/${inch + 10}-inch-to-cm/">${inch + 10} inch to cm</a>\n`;
  relLinks += `<a href="/inch-to-cm-chart">Full Conversion Chart</a>\n`;
  if (isTV) relLinks += `<a href="/tv-size-conversion">TV Size Guide</a>\n`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
${GA_TAG}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${inch} Inch in CM (${titleSuffix})</title>
<meta name="description" content="${inch} inches equals ${cm} cm. Convert ${inch} inch to centimeters instantly. Includes size charts and practical examples for ${inch}-inch measurements.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${SITE}/${inch}-inch-to-cm/">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta name="theme-color" content="#007AFF">
<link rel="stylesheet" href="/shared-styles.css">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"What is ${inch} inches in cm?","acceptedAnswer":{"@type":"Answer","text":"${inch} inches is equal to ${cm} centimeters. The conversion formula is: ${inch} × 2.54 = ${cm} cm."}},
{"@type":"Question","name":"How wide is ${inch} inches?","acceptedAnswer":{"@type":"Answer","text":"${inch} inches is ${cm} centimeters or approximately ${meters} meters."}}
]}
<\/script>
</head>
<body>
${NAV}
<div class="container">
<div class="breadcrumb"><a href="/">Home</a> &rsaquo; <a href="/inch-to-cm-chart">Inch to CM Chart</a> &rsaquo; ${inch} Inch to CM</div>

<div class="hero-result">
<h1>${inch} Inch to CM</h1>
<div class="big-number">${inch} inches = ${cm} cm</div>
<p>Formula: ${inch} &times; 2.54 = ${cm} centimeters</p>
</div>

<div class="card">
<h2>🔧 Quick Converter</h2>
<div class="converter-mini">
<input type="number" id="conv-in" value="${inch}" oninput="miniConvert('conv-in','conv-out',2.54)" step="0.01">
<span>inches =</span>
<span class="result-out" id="conv-out">${cm}</span>
</div>
</div>

<div class="card">
<h2>📐 What Does ${inch} Inches Look Like?</h2>
<p>A measurement of ${inch} inches (${cm} cm) is commonly encountered in:</p>
<ul>
${categories.map(c => `<li>${c}</li>`).join('\n')}
</ul>
<p>For reference, ${inch} inches is roughly ${feet} feet or ${meters} meters.</p>
</div>

${tvSection}

<div class="card">
<h2>📊 Nearby Conversions</h2>
<table>
<thead><tr><th>Inches</th><th>Centimeters</th><th>Meters</th></tr></thead>
<tbody>
${nearbyRows}
</tbody>
</table>
</div>

<div class="card">
<h2>❓ FAQ</h2>
<div class="faq-item"><div class="faq-q" onclick="toggleFaq(this)">What is ${inch} inches in cm?</div><div class="faq-a">${inch} inches equals exactly ${cm} centimeters. Multiply ${inch} by 2.54 to get the result.</div></div>
<div class="faq-item"><div class="faq-q" onclick="toggleFaq(this)">How do I convert ${inch} inches to other units?</div><div class="faq-a">${inch} inches = ${cm} cm = ${mm} mm = ${meters} meters = ${feet} feet.</div></div>
${tvFaq}
</div>

<div class="card">
<h2>🔗 Related Conversions</h2>
<div class="internal-links">
${relLinks}
</div>
</div>

</div>
${FOOTER}
${SHARED_JS}
</body>
</html>`;

  const dir = path.join(BASE, `${inch}-inch-to-cm`);
  ensureDir(dir);
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`  ✅ /${inch}-inch-to-cm/`);
}

// ============================================================
// Generate: /N-inch-tv-in-cm/index.html
// ============================================================
function generateTVPage(inch) {
  const cm = (inch * 2.54).toFixed(2);
  const w = (inch * 2.21).toFixed(1);
  const h = (inch * 1.24).toFixed(1);
  const wIn = (w / 2.54).toFixed(1);
  const hIn = (h / 2.54).toFixed(1);
  const minDist4k = (inch * 2.54 * 1.5 / 100).toFixed(1);
  const maxDist4k = (inch * 2.54 * 2.0 / 100).toFixed(1);
  const minDist1080 = (inch * 2.54 * 2.0 / 100).toFixed(1);
  const maxDist1080 = (inch * 2.54 * 3.0 / 100).toFixed(1);
  const wallSpace = Math.round(parseFloat(w) + 10);
  const roomRec = getRoomRec(inch);

  // Compare table
  let compareRows = '';
  TV_SIZES.forEach(s => {
    const sc = (s * 2.54).toFixed(2);
    const sw = (s * 2.21).toFixed(1);
    const sh = (s * 1.24).toFixed(1);
    if (s === inch) {
      compareRows += `<tr style="background:#EBF5FF;font-weight:600"><td>${s}" ✓</td><td>${sc}</td><td>~${sw}</td><td>~${sh}</td></tr>\n`;
    } else {
      compareRows += `<tr><td><a href="/${s}-inch-tv-in-cm/">${s}"</a></td><td>${sc}</td><td>~${sw}</td><td>~${sh}</td></tr>\n`;
    }
  });

  // Related links
  let relatedTVs = TV_SIZES.filter(s => s !== inch).slice(0, 5).map(s => `<a href="/${s}-inch-tv-in-cm/">${s}" TV</a>`).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
${GA_TAG}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${inch} Inch TV Dimensions in CM – Width, Height &amp; Size Guide (2026)</title>
<meta name="description" content="${inch} inch TV is ${cm} cm diagonally, ~${w} cm wide and ~${h} cm tall. Complete ${inch}-inch TV size guide with dimensions, viewing distance, and room recommendations.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${SITE}/${inch}-inch-tv-in-cm/">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta name="theme-color" content="#007AFF">
<link rel="stylesheet" href="/shared-styles.css">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"What are the dimensions of a ${inch} inch TV in cm?","acceptedAnswer":{"@type":"Answer","text":"A ${inch}-inch TV measures approximately ${w} cm wide × ${h} cm tall, with a diagonal of ${cm} cm."}},
{"@type":"Question","name":"Is a ${inch} inch TV big enough for my room?","acceptedAnswer":{"@type":"Answer","text":"A ${inch}-inch TV is best for ${roomRec}."}}
]}
<\/script>
</head>
<body>
${NAV}
<div class="container">
<div class="breadcrumb"><a href="/">Home</a> &rsaquo; <a href="/tv-size-conversion">TV Size Guide</a> &rsaquo; ${inch}" TV</div>

<div class="hero-result">
<h1>${inch} Inch TV Dimensions in CM</h1>
<div class="big-number">${cm} cm diagonal</div>
<p>Width: ~${w} cm &nbsp;|&nbsp; Height: ~${h} cm &nbsp;|&nbsp; 16:9 aspect ratio</p>
</div>

<div class="card">
<h2>📐 ${inch}-Inch TV Full Dimensions</h2>
<table>
<thead><tr><th>Measurement</th><th>CM</th><th>Inches</th></tr></thead>
<tbody>
<tr><td>Diagonal</td><td>${cm} cm</td><td>${inch}"</td></tr>
<tr><td>Width</td><td>~${w} cm</td><td>~${wIn}"</td></tr>
<tr><td>Height</td><td>~${h} cm</td><td>~${hIn}"</td></tr>
</tbody>
</table>
<p><em>Dimensions are for the screen only. Add 2–5 cm on each side for the bezel/frame.</em></p>
</div>

<div class="card">
<h2>🛋️ Is a ${inch}-Inch TV Right for You?</h2>
<p>A ${inch}-inch TV is recommended for <strong>${roomRec}</strong>.</p>
<h3>Optimal Viewing Distance</h3>
<ul>
<li><strong>4K UHD:</strong> ${minDist4k}m – ${maxDist4k}m</li>
<li><strong>1080p HD:</strong> ${minDist1080}m – ${maxDist1080}m</li>
</ul>
<h3>Wall Mounting Tips</h3>
<p>You need at least <strong>${wallSpace} cm</strong> of horizontal wall space. Mount the center of the TV at eye level when seated (typically 100–120 cm from the floor).</p>
</div>

<div class="card">
<h2>📺 Compare All TV Sizes</h2>
<table>
<thead><tr><th>TV Size</th><th>Diagonal (cm)</th><th>Width (cm)</th><th>Height (cm)</th></tr></thead>
<tbody>
${compareRows}
</tbody>
</table>
</div>

<div class="card">
<h2>❓ FAQ</h2>
<div class="faq-item"><div class="faq-q" onclick="toggleFaq(this)">What is the width of a ${inch} inch TV?</div><div class="faq-a">A ${inch}-inch TV is approximately ${w} cm (${wIn} inches) wide based on a 16:9 aspect ratio.</div></div>
<div class="faq-item"><div class="faq-q" onclick="toggleFaq(this)">Is ${inch} inch TV big enough for a living room?</div><div class="faq-a">${inch <= 43 ? `A ${inch}-inch TV is better suited for smaller rooms. For a standard living room, consider 50–65 inches.` : `Yes, a ${inch}-inch TV is a great choice for most living rooms with adequate viewing distance.`}</div></div>
<div class="faq-item"><div class="faq-q" onclick="toggleFaq(this)">How far should I sit from a ${inch} inch TV?</div><div class="faq-a">For 4K content, sit ${minDist4k}–${maxDist4k} meters away. For 1080p, sit ${minDist1080}–${maxDist1080} meters away.</div></div>
</div>

<div class="card">
<h2>🔗 Related</h2>
<div class="internal-links">
<a href="/${inch}-inch-to-cm/">${inch} inch to cm</a>
<a href="/tv-size-conversion">All TV Sizes</a>
${relatedTVs}
</div>
</div>
</div>
${FOOTER}
${SHARED_JS}
</body>
</html>`;

  const dir = path.join(BASE, `${inch}-inch-tv-in-cm`);
  ensureDir(dir);
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`  ✅ /${inch}-inch-tv-in-cm/`);
}

// ============================================================
// Generate: /inch-to-cm-chart/
// ============================================================
function generateChartPage() {
  let tableRows = '';
  for (let row = 1; row <= 25; row++) {
    tableRows += '<tr>';
    for (const col of [row, row + 25, row + 50, row + 75]) {
      const cv = (col * 2.54).toFixed(2);
      tableRows += `<td><a href="/${col}-inch-to-cm/">${col}"</a></td><td>${cv}</td>`;
    }
    tableRows += '</tr>\n';
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
${GA_TAG}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Inch to CM Chart – Full Conversion Table (1-100 Inches)</title>
<meta name="description" content="Complete inch to cm conversion chart from 1 to 100 inches. Quick reference table with all values. Bookmark this page for instant conversions.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${SITE}/inch-to-cm-chart/">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta name="theme-color" content="#007AFF">
<link rel="stylesheet" href="/shared-styles.css">
</head>
<body>
${NAV}
<div class="container">
<div class="breadcrumb"><a href="/">Home</a> &rsaquo; Inch to CM Chart</div>
<div class="hero-result">
<h1>Inch to CM Conversion Chart</h1>
<p>Complete reference table — 1 to 100 inches with centimeter equivalents</p>
</div>
<div class="card">
<h2>📊 Full Conversion Table</h2>
<table>
<thead><tr><th>Inches</th><th>CM</th><th>Inches</th><th>CM</th><th>Inches</th><th>CM</th><th>Inches</th><th>CM</th></tr></thead>
<tbody>
${tableRows}
</tbody></table>
</div>
<div class="card">
<h2>🔗 Popular Conversions</h2>
<div class="internal-links">
<a href="/32-inch-to-cm/">32 inch to cm</a>
<a href="/55-inch-to-cm/">55 inch to cm</a>
<a href="/65-inch-to-cm/">65 inch to cm</a>
<a href="/72-inch-to-cm/">72 inch to cm</a>
<a href="/tv-size-conversion">TV Size Guide</a>
<a href="/height-conversion">Height Conversion</a>
</div>
</div>
</div>
${FOOTER}
${SHARED_JS}
</body>
</html>`;

  const dir = path.join(BASE, 'inch-to-cm-chart');
  ensureDir(dir);
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`  ✅ /inch-to-cm-chart/`);
}

// ============================================================
// Generate: /tv-size-conversion/
// ============================================================
function generateTVAggregate() {
  let tvRows = '';
  TV_SIZES.forEach(s => {
    const sc = (s * 2.54).toFixed(2);
    const sw = (s * 2.21).toFixed(1);
    const sh = (s * 1.24).toFixed(1);
    tvRows += `<tr><td><a href="/${s}-inch-tv-in-cm/">${s}"</a></td><td>${sc}</td><td>~${sw}</td><td>~${sh}</td><td>${getRoomLabel(s)}</td></tr>\n`;
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
${GA_TAG}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TV Size Conversion Chart – All TV Dimensions in CM (2026 Guide)</title>
<meta name="description" content="Complete TV size conversion chart. Find the exact dimensions of every TV size from 24 to 85 inches in centimeters.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${SITE}/tv-size-conversion/">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta name="theme-color" content="#007AFF">
<link rel="stylesheet" href="/shared-styles.css">
</head>
<body>
${NAV}
<div class="container">
<div class="breadcrumb"><a href="/">Home</a> &rsaquo; TV Size Conversion</div>
<div class="hero-result">
<h1>TV Size Conversion Guide (2026)</h1>
<p>Find the perfect TV size for your room — all dimensions in centimeters</p>
</div>
<div class="card">
<h2>📺 All TV Sizes Compared</h2>
<table>
<thead><tr><th>TV Size</th><th>Diagonal (cm)</th><th>Width (cm)</th><th>Height (cm)</th><th>Best For</th></tr></thead>
<tbody>
${tvRows}
</tbody>
</table>
</div>
<div class="card">
<h2>🛋️ Choosing the Right TV Size</h2>
<h3>By Room Size</h3>
<ul>
<li><strong>Small room (under 10 m²):</strong> 32–43 inch TV</li>
<li><strong>Medium room (10–20 m²):</strong> 50–55 inch TV</li>
<li><strong>Large room (20+ m²):</strong> 65–85 inch TV</li>
</ul>
<h3>By Viewing Distance</h3>
<ul>
<li><strong>1.5–2m:</strong> 32–43 inches</li>
<li><strong>2–3m:</strong> 50–55 inches</li>
<li><strong>3–4m:</strong> 65–75 inches</li>
<li><strong>4m+:</strong> 77–85 inches</li>
</ul>
</div>
<div class="card">
<h2>🔗 Quick Links</h2>
<div class="internal-links">
${TV_SIZES.filter(s => [32,40,43,50,55,65,75,85].includes(s)).map(s => `<a href="/${s}-inch-tv-in-cm/">${s}" TV dimensions</a>`).join('\n')}
<a href="/inch-to-cm-chart">Full Inch to CM Chart</a>
</div>
</div>
</div>
${FOOTER}
${SHARED_JS}
</body>
</html>`;

  const dir = path.join(BASE, 'tv-size-conversion');
  ensureDir(dir);
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`  ✅ /tv-size-conversion/`);
}

// ============================================================
// Generate: /height-conversion/
// ============================================================
function generateHeightPage() {
  let heightRows = '';
  for (let feet = 4; feet <= 7; feet++) {
    const maxInch = feet === 7 ? 0 : 11;
    for (let inch = 0; inch <= maxInch; inch++) {
      const total = feet * 12 + inch;
      const tc = (total * 2.54).toFixed(2);
      const tm = (total * 0.0254).toFixed(2);
      heightRows += `<tr><td>${feet}'${inch}"</td><td><a href="/${total}-inch-to-cm/">${total}"</a></td><td>${tc} cm</td><td>${tm} m</td></tr>\n`;
    }
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
${GA_TAG}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Height Conversion Chart – Feet &amp; Inches to CM (2026)</title>
<meta name="description" content="Convert height from feet and inches to centimeters. Complete height conversion chart from 4'0 to 7'0 with cm values.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${SITE}/height-conversion/">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta name="theme-color" content="#007AFF">
<link rel="stylesheet" href="/shared-styles.css">
</head>
<body>
${NAV}
<div class="container">
<div class="breadcrumb"><a href="/">Home</a> &rsaquo; Height Conversion</div>
<div class="hero-result">
<h1>Height Conversion: Feet &amp; Inches to CM</h1>
<p>Quick reference chart for converting human height between Imperial and Metric</p>
</div>
<div class="card">
<h2>📏 Height Conversion Chart</h2>
<table>
<thead><tr><th>Feet &amp; Inches</th><th>Inches Total</th><th>Centimeters</th><th>Meters</th></tr></thead>
<tbody>
${heightRows}
</tbody>
</table>
</div>
<div class="card">
<h2>🌍 Common Height References</h2>
<ul>
<li><strong>5'4" (163 cm)</strong> — Average female height (US)</li>
<li><strong>5'9" (175 cm)</strong> — Average male height (US)</li>
<li><strong>5'7" (170 cm)</strong> — Average male height (worldwide)</li>
<li><strong>6'0" (183 cm)</strong> — Considered tall in most countries</li>
</ul>
</div>
<div class="card">
<h2>🔗 Related</h2>
<div class="internal-links">
<a href="/60-inch-to-cm/">5 feet (60") in cm</a>
<a href="/66-inch-to-cm/">5'6" in cm</a>
<a href="/70-inch-to-cm/">5'10" in cm</a>
<a href="/72-inch-to-cm/">6 feet in cm</a>
<a href="/inch-to-cm-chart">Full Chart</a>
<a href="/clothing-size-conversion">Clothing Sizes</a>
</div>
</div>
</div>
${FOOTER}
${SHARED_JS}
</body>
</html>`;

  const dir = path.join(BASE, 'height-conversion');
  ensureDir(dir);
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`  ✅ /height-conversion/`);
}

// ============================================================
// Generate: /clothing-size-conversion/
// ============================================================
function generateClothingPage() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
${GA_TAG}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Clothing Size Conversion – Inches to CM for Waist, Chest &amp; More</title>
<meta name="description" content="Convert clothing measurements from inches to centimeters. Waist, chest, hip, and inseam conversion charts for US, UK, and EU sizing.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${SITE}/clothing-size-conversion/">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta name="theme-color" content="#007AFF">
<link rel="stylesheet" href="/shared-styles.css">
</head>
<body>
${NAV}
<div class="container">
<div class="breadcrumb"><a href="/">Home</a> &rsaquo; Clothing Size Conversion</div>
<div class="hero-result">
<h1>Clothing Size Conversion Guide</h1>
<p>Inches to CM for waist, chest, hip, and inseam measurements</p>
</div>
<div class="card">
<h2>👖 Waist Size: Inches to CM</h2>
<table>
<thead><tr><th>Waist (in)</th><th>Waist (cm)</th><th>US Size</th><th>EU Size</th></tr></thead>
<tbody>
<tr><td><a href="/26-inch-to-cm/">26"</a></td><td>66.04 cm</td><td>XS (2)</td><td>34</td></tr>
<tr><td><a href="/28-inch-to-cm/">28"</a></td><td>71.12 cm</td><td>S (4)</td><td>36</td></tr>
<tr><td><a href="/30-inch-to-cm/">30"</a></td><td>76.20 cm</td><td>M (6–8)</td><td>38–40</td></tr>
<tr><td><a href="/32-inch-to-cm/">32"</a></td><td>81.28 cm</td><td>M–L (10)</td><td>42</td></tr>
<tr><td><a href="/34-inch-to-cm/">34"</a></td><td>86.36 cm</td><td>L (12)</td><td>44</td></tr>
<tr><td><a href="/36-inch-to-cm/">36"</a></td><td>91.44 cm</td><td>XL (14)</td><td>46</td></tr>
<tr><td><a href="/38-inch-to-cm/">38"</a></td><td>96.52 cm</td><td>XXL (16)</td><td>48</td></tr>
<tr><td><a href="/40-inch-to-cm/">40"</a></td><td>101.60 cm</td><td>XXXL (18)</td><td>50</td></tr>
</tbody>
</table>
</div>
<div class="card">
<h2>👔 Chest Size: Inches to CM</h2>
<table>
<thead><tr><th>Chest (in)</th><th>Chest (cm)</th><th>Size</th></tr></thead>
<tbody>
<tr><td><a href="/34-inch-to-cm/">34"</a></td><td>86.36 cm</td><td>XS</td></tr>
<tr><td><a href="/36-inch-to-cm/">36"</a></td><td>91.44 cm</td><td>S</td></tr>
<tr><td><a href="/38-inch-to-cm/">38"</a></td><td>96.52 cm</td><td>M</td></tr>
<tr><td><a href="/40-inch-to-cm/">40"</a></td><td>101.60 cm</td><td>L</td></tr>
<tr><td><a href="/42-inch-to-cm/">42"</a></td><td>106.68 cm</td><td>XL</td></tr>
<tr><td><a href="/44-inch-to-cm/">44"</a></td><td>111.76 cm</td><td>XXL</td></tr>
</tbody>
</table>
</div>
<div class="card">
<h2>🔗 Related</h2>
<div class="internal-links">
<a href="/height-conversion">Height Conversion</a>
<a href="/inch-to-cm-chart">Inch to CM Chart</a>
<a href="/28-inch-to-cm/">28 inch to cm</a>
<a href="/30-inch-to-cm/">30 inch to cm</a>
<a href="/32-inch-to-cm/">32 inch to cm</a>
<a href="/34-inch-to-cm/">34 inch to cm</a>
<a href="/36-inch-to-cm/">36 inch to cm</a>
</div>
</div>
</div>
${FOOTER}
${SHARED_JS}
</body>
</html>`;

  const dir = path.join(BASE, 'clothing-size-conversion');
  ensureDir(dir);
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`  ✅ /clothing-size-conversion/`);
}

// ============================================================
// Generate sitemap.xml
// ============================================================
function generateSitemap(conversionPages) {
  const today = new Date().toISOString().split('T')[0];
  let urls = [];
  
  // Homepage
  urls.push({ loc: '/', priority: '1.0', changefreq: 'weekly' });
  
  // Aggregate pages
  urls.push({ loc: '/inch-to-cm-chart/', priority: '0.9', changefreq: 'monthly' });
  urls.push({ loc: '/tv-size-conversion/', priority: '0.9', changefreq: 'monthly' });
  urls.push({ loc: '/height-conversion/', priority: '0.9', changefreq: 'monthly' });
  urls.push({ loc: '/clothing-size-conversion/', priority: '0.9', changefreq: 'monthly' });
  
  // Conversion pages
  conversionPages.forEach(i => {
    urls.push({ loc: `/${i}-inch-to-cm/`, priority: '0.8', changefreq: 'monthly' });
  });
  
  // TV pages
  TV_SIZES.forEach(i => {
    urls.push({ loc: `/${i}-inch-tv-in-cm/`, priority: '0.8', changefreq: 'monthly' });
  });
  
  // Blog pages
  urls.push({ loc: '/blogs/', priority: '0.7', changefreq: 'weekly' });
  ['tv-size-guide-2026', '55-vs-65-inch-tv', '32-vs-40-inch-tv', 'how-to-measure-tv-size',
   'how-to-convert-inches-to-cm', 'how-to-use-inch-to-cm-converter', 'height-conversion-chart',
   'best-tv-size-bedroom', 'tv-size-vs-viewing-distance', '32-vs-43-vs-55-inch-tv',
   'average-height-by-country', 'is-180-cm-tall', 'us-vs-eu-size-conversion',
   'waist-size-chart-cm', 'history-of-measurement-systems', 'kids-height-growth-chart',
   'paper-sizes-a4-letter-in-cm', 'shoe-size-conversion-guide'
  ].forEach(slug => {
    urls.push({ loc: `/blogs/${slug}.html`, priority: '0.7', changefreq: 'monthly' });
  });

  // Legal / Info pages
  urls.push({ loc: '/about.html', priority: '0.5', changefreq: 'monthly' });
  urls.push({ loc: '/contact.html', priority: '0.5', changefreq: 'monthly' });
  urls.push({ loc: '/privacy.html', priority: '0.5', changefreq: 'monthly' });
  urls.push({ loc: '/terms.html', priority: '0.5', changefreq: 'monthly' });
  urls.push({ loc: '/disclaimer.html', priority: '0.5', changefreq: 'monthly' });

  // Guide pages
  urls.push({ loc: '/guides/', priority: '0.8', changefreq: 'monthly' });

  // Convert pages
  urls.push({ loc: '/convert/', priority: '0.8', changefreq: 'monthly' });

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  urls.forEach(u => {
    xml += `  <url>
    <loc>${SITE}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>
`;
  });
  xml += `</urlset>`;
  
  fs.writeFileSync(path.join(BASE, 'sitemap.xml'), xml);
  console.log(`  ✅ sitemap.xml (${urls.length} URLs)`);
}

// ============================================================
// MAIN
// ============================================================
console.log('');
console.log('🚀 inch-to-cm.online pSEO Page Generator');
console.log('==========================================');

// Step 1: Conversion pages
console.log('\n📄 Generating conversion pages...');
const priorityPages = [
  1,2,3,4,5,6,7,8,9,10,12,15,18,20,24,25,26,27,28,30,32,34,36,38,
  40,42,43,44,48,50,55,60,62,64,65,66,68,70,72,74,75,76,77,78,80,84,85,90,96,100
];
priorityPages.forEach(i => generateConversionPage(i));

// Step 2: TV pages
console.log('\n📺 Generating TV dimension pages...');
TV_SIZES.forEach(i => generateTVPage(i));

// Step 3: Aggregate pages
console.log('\n📊 Generating aggregate pages...');
generateChartPage();
generateTVAggregate();
generateHeightPage();
generateClothingPage();

// Step 4: Sitemap
console.log('\n🗺️ Generating sitemap...');
generateSitemap(priorityPages);

console.log('\n==========================================');
console.log('✅ Generation complete!');
console.log(`   📄 ${priorityPages.length} conversion pages`);
console.log(`   📺 ${TV_SIZES.length} TV pages`);
console.log('   📊 4 aggregate pages');
console.log('   🗺️ 1 sitemap.xml');
console.log('\nRun: node generate-pages.js');
console.log('Blog articles need to be created separately or add to this script.');
