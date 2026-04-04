#!/usr/bin/env python3
"""
pSEO Page Generator for inch-to-cm.online
Run: python3 generate-pages.py
Generates: conversion pages, TV pages, aggregate pages, blog articles, sitemap
"""

import os
import datetime

SITE = 'https://inch-to-cm.online'
BASE = os.path.dirname(os.path.abspath(__file__))

def ensure_dir(d):
    os.makedirs(d, exist_ok=True)

def write_file(filepath, content):
    ensure_dir(os.path.dirname(filepath))
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# ============================================================
# Shared HTML
# ============================================================
NAV = '''<nav class="site-nav"><div class="container">
<a href="/" class="logo-link">📏 Inch-to-CM</a>
<div class="nav-links">
<a href="/inch-to-cm-chart">Chart</a>
<a href="/tv-size-conversion">TV Sizes</a>
<a href="/height-conversion">Height</a>
<a href="/clothing-size-conversion">Clothing</a>
<a href="/blogs/">Blog</a>
</div>
</div></nav>'''

FOOTER = '''<footer><div class="container">
<p>&copy; 2026 inch-to-cm.online. All rights reserved.</p>
<p>Accurate inch to cm conversions &amp; size guides</p>
</div></footer>'''

SHARED_JS = '''<script>
function toggleFaq(el){var item=el.parentElement;var isOpen=item.classList.contains("open");document.querySelectorAll(".faq-item").forEach(function(i){i.classList.remove("open")});if(!isOpen)item.classList.add("open")}
function miniConvert(inputId,outputId,factor){var v=parseFloat(document.getElementById(inputId).value)||0;document.getElementById(outputId).textContent=(v*factor).toFixed(2)+" cm"}
</script>'''

TV_SIZES = [24, 27, 32, 40, 43, 50, 55, 60, 65, 70, 75, 77, 85]

def get_room_rec(inch):
    if inch <= 32: return 'bedrooms, kitchens, and dorm rooms (1–2m viewing distance)'
    if inch <= 43: return 'bedrooms and small living rooms (2–2.5m viewing distance)'
    if inch <= 55: return 'medium living rooms (2.5–3m viewing distance)'
    if inch <= 65: return 'large living rooms (3–4m viewing distance)'
    return 'large living rooms and home theaters (4m+ viewing distance)'

def get_room_label(inch):
    if inch <= 32: return 'Bedroom / Desk'
    if inch <= 50: return 'Small Living Room'
    if inch <= 65: return 'Living Room'
    return 'Home Theater'

def get_categories(inch):
    if inch <= 6: return ['Smartphone screen sizes', 'Small rulers and tools', 'Jewelry and watch sizing']
    if inch <= 20: return ['Tablet and laptop screens', 'Paper sizes and notebooks', 'Kitchen utensils and cookware']
    if inch <= 40: return ['Computer monitors and small TVs', 'Waist measurements for clothing', 'Small furniture dimensions']
    if inch <= 80: return ['Television screens (popular TV size)', 'Desk and table dimensions', 'Height measurements']
    return ['Large-screen TVs and projector screens', 'Furniture and room dimensions', 'Sports equipment']

# ============================================================
# Conversion page: /N-inch-to-cm/
# ============================================================
def gen_conversion_page(inch):
    cm = inch * 2.54
    prev, nxt = inch - 1, inch + 1
    feet = inch / 12
    meters = inch * 0.0254
    mm = inch * 25.4
    is_tv = 24 <= inch <= 85
    title_suffix = 'Converter + TV & Size Guide' if is_tv else 'Converter + Size Guide'
    cats = get_categories(inch)

    # Nearby rows
    nearby = ''
    for off in range(-5, 6):
        v = inch + off
        if v < 1: continue
        vc = v * 2.54
        vm = v * 0.0254
        if off == 0:
            nearby += f'<tr style="background:#EBF5FF;font-weight:600"><td>{v} in</td><td>{vc:.2f} cm</td><td>{vm:.4f} m</td></tr>\n'
        else:
            nearby += f'<tr><td><a href="/{v}-inch-to-cm/">{v} in</a></td><td>{vc:.2f} cm</td><td>{vm:.4f} m</td></tr>\n'

    # TV section
    tv_section = ''
    if inch in TV_SIZES:
        w = inch * 2.21
        h = inch * 1.24
        tv_section = f'''
<div class="card">
<h2>📺 {inch}-Inch TV &amp; Screen Dimensions</h2>
<p>A {inch}-inch TV or monitor measures {cm:.2f} cm diagonally. Based on a standard 16:9 aspect ratio:</p>
<table><thead><tr><th>Dimension</th><th>Metric</th><th>Imperial</th></tr></thead>
<tbody>
<tr><td>Width</td><td>~{w:.1f} cm</td><td>~{w/2.54:.1f}"</td></tr>
<tr><td>Height</td><td>~{h:.1f} cm</td><td>~{h/2.54:.1f}"</td></tr>
<tr><td>Diagonal</td><td>{cm:.2f} cm</td><td>{inch}"</td></tr>
</tbody></table>
<p>A {inch}-inch screen is popular for {get_room_rec(inch)}.</p>
</div>'''

    tv_faq = ''
    if is_tv:
        if inch <= 32: tv_rec = 'ideal for bedrooms or desks up to 1.5m viewing distance'
        elif inch <= 55: tv_rec = 'great for medium living rooms with 2-3m viewing distance'
        else: tv_rec = 'excellent for large living rooms and home theaters with 3m+ viewing distance'
        tv_faq = f'<div class="faq-item"><div class="faq-q" onclick="toggleFaq(this)">Is a {inch}-inch TV big enough?</div><div class="faq-a">A {inch}-inch TV ({cm:.2f} cm diagonal) is {tv_rec}. Consider your room size and seating distance.</div></div>'

    rel = ''
    if prev > 0: rel += f'<a href="/{prev}-inch-to-cm/">{prev} inch to cm</a>\n'
    rel += f'<a href="/{nxt}-inch-to-cm/">{nxt} inch to cm</a>\n'
    if inch + 5 <= 1000: rel += f'<a href="/{inch+5}-inch-to-cm/">{inch+5} inch to cm</a>\n'
    if inch + 10 <= 1000: rel += f'<a href="/{inch+10}-inch-to-cm/">{inch+10} inch to cm</a>\n'
    rel += '<a href="/inch-to-cm-chart">Full Conversion Chart</a>\n'
    if is_tv: rel += '<a href="/tv-size-conversion">TV Size Guide</a>\n'

    cat_items = '\n'.join(f'<li>{c}</li>' for c in cats)

    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{inch} Inch in CM ({title_suffix})</title>
<meta name="description" content="{inch} inches equals {cm:.2f} cm. Convert {inch} inch to centimeters instantly. Includes size charts and practical examples for {inch}-inch measurements.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="{SITE}/{inch}-inch-to-cm/">
<link rel="stylesheet" href="/shared-styles.css">
<script type="application/ld+json">
{{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
{{"@type":"Question","name":"What is {inch} inches in cm?","acceptedAnswer":{{"@type":"Answer","text":"{inch} inches is equal to {cm:.2f} centimeters. The conversion formula is: {inch} × 2.54 = {cm:.2f} cm."}}}},
{{"@type":"Question","name":"How wide is {inch} inches?","acceptedAnswer":{{"@type":"Answer","text":"{inch} inches is {cm:.2f} centimeters or approximately {meters:.4f} meters."}}}}
]}}
</script>
</head>
<body>
{NAV}
<div class="container">
<div class="breadcrumb"><a href="/">Home</a> &rsaquo; <a href="/inch-to-cm-chart">Inch to CM Chart</a> &rsaquo; {inch} Inch to CM</div>
<div class="hero-result">
<h1>{inch} Inch to CM</h1>
<div class="big-number">{inch} inches = {cm:.2f} cm</div>
<p>Formula: {inch} &times; 2.54 = {cm:.2f} centimeters</p>
</div>
<div class="card">
<h2>🔧 Quick Converter</h2>
<div class="converter-mini">
<input type="number" id="conv-in" value="{inch}" oninput="miniConvert('conv-in','conv-out',2.54)" step="0.01">
<span>inches =</span>
<span class="result-out" id="conv-out">{cm:.2f}</span>
</div>
</div>
<div class="card">
<h2>📐 What Does {inch} Inches Look Like?</h2>
<p>A measurement of {inch} inches ({cm:.2f} cm) is commonly encountered in:</p>
<ul>{cat_items}</ul>
<p>For reference, {inch} inches is roughly {feet:.1f} feet or {meters:.4f} meters.</p>
</div>
{tv_section}
<div class="card">
<h2>📊 Nearby Conversions</h2>
<table><thead><tr><th>Inches</th><th>Centimeters</th><th>Meters</th></tr></thead>
<tbody>{nearby}</tbody></table>
</div>
<div class="card">
<h2>❓ FAQ</h2>
<div class="faq-item"><div class="faq-q" onclick="toggleFaq(this)">What is {inch} inches in cm?</div><div class="faq-a">{inch} inches equals exactly {cm:.2f} centimeters. Multiply {inch} by 2.54 to get the result.</div></div>
<div class="faq-item"><div class="faq-q" onclick="toggleFaq(this)">How do I convert {inch} inches to other units?</div><div class="faq-a">{inch} inches = {cm:.2f} cm = {mm:.1f} mm = {meters:.4f} meters = {feet:.1f} feet.</div></div>
{tv_faq}
</div>
<div class="card">
<h2>🔗 Related Conversions</h2>
<div class="internal-links">{rel}</div>
</div>
</div>
{FOOTER}
{SHARED_JS}
</body>
</html>'''

    write_file(os.path.join(BASE, f'{inch}-inch-to-cm', 'index.html'), html)
    print(f'  ✅ /{inch}-inch-to-cm/')

# ============================================================
# TV page: /N-inch-tv-in-cm/
# ============================================================
def gen_tv_page(inch):
    cm = inch * 2.54
    w, h = inch * 2.21, inch * 1.24
    room_rec = get_room_rec(inch)
    min4k = inch * 2.54 * 1.5 / 100
    max4k = inch * 2.54 * 2.0 / 100
    min1080 = inch * 2.54 * 2.0 / 100
    max1080 = inch * 2.54 * 3.0 / 100
    wall = int(w + 10)

    compare = ''
    for s in TV_SIZES:
        sc, sw, sh = s*2.54, s*2.21, s*1.24
        if s == inch:
            compare += f'<tr style="background:#EBF5FF;font-weight:600"><td>{s}" ✓</td><td>{sc:.2f}</td><td>~{sw:.1f}</td><td>~{sh:.1f}</td></tr>\n'
        else:
            compare += f'<tr><td><a href="/{s}-inch-tv-in-cm/">{s}"</a></td><td>{sc:.2f}</td><td>~{sw:.1f}</td><td>~{sh:.1f}</td></tr>\n'

    rels = '\n'.join(f'<a href="/{s}-inch-tv-in-cm/">{s}" TV</a>' for s in TV_SIZES if s != inch)
    lr_text = 'A {}-inch TV is better suited for smaller rooms. For a standard living room, consider 50–65 inches.'.format(inch) if inch <= 43 else 'Yes, a {}-inch TV is a great choice for most living rooms with adequate viewing distance.'.format(inch)

    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{inch} Inch TV Dimensions in CM – Width, Height &amp; Size Guide (2026)</title>
<meta name="description" content="{inch} inch TV is {cm:.2f} cm diagonally, ~{w:.1f} cm wide and ~{h:.1f} cm tall. Complete {inch}-inch TV size guide.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="{SITE}/{inch}-inch-tv-in-cm/">
<link rel="stylesheet" href="/shared-styles.css">
<script type="application/ld+json">
{{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
{{"@type":"Question","name":"What are the dimensions of a {inch} inch TV?","acceptedAnswer":{{"@type":"Answer","text":"A {inch}-inch TV measures approximately {w:.1f} cm wide × {h:.1f} cm tall, with a diagonal of {cm:.2f} cm."}}}},
{{"@type":"Question","name":"Is a {inch} inch TV big enough?","acceptedAnswer":{{"@type":"Answer","text":"A {inch}-inch TV is best for {room_rec}."}}}}
]}}
</script>
</head>
<body>
{NAV}
<div class="container">
<div class="breadcrumb"><a href="/">Home</a> &rsaquo; <a href="/tv-size-conversion">TV Size Guide</a> &rsaquo; {inch}" TV</div>
<div class="hero-result">
<h1>{inch} Inch TV Dimensions in CM</h1>
<div class="big-number">{cm:.2f} cm diagonal</div>
<p>Width: ~{w:.1f} cm &nbsp;|&nbsp; Height: ~{h:.1f} cm &nbsp;|&nbsp; 16:9 aspect ratio</p>
</div>
<div class="card">
<h2>📐 {inch}-Inch TV Full Dimensions</h2>
<table><thead><tr><th>Measurement</th><th>CM</th><th>Inches</th></tr></thead>
<tbody>
<tr><td>Diagonal</td><td>{cm:.2f} cm</td><td>{inch}"</td></tr>
<tr><td>Width</td><td>~{w:.1f} cm</td><td>~{w/2.54:.1f}"</td></tr>
<tr><td>Height</td><td>~{h:.1f} cm</td><td>~{h/2.54:.1f}"</td></tr>
</tbody></table>
<p><em>Dimensions are for the screen only. Add 2–5 cm on each side for the bezel/frame.</em></p>
</div>
<div class="card">
<h2>🛋️ Is a {inch}-Inch TV Right for You?</h2>
<p>Recommended for <strong>{room_rec}</strong>.</p>
<h3>Optimal Viewing Distance</h3>
<ul><li><strong>4K UHD:</strong> {min4k:.1f}m – {max4k:.1f}m</li><li><strong>1080p HD:</strong> {min1080:.1f}m – {max1080:.1f}m</li></ul>
<h3>Wall Mounting Tips</h3>
<p>You need at least <strong>{wall} cm</strong> of horizontal wall space. Mount the center at eye level when seated (100–120 cm from the floor).</p>
</div>
<div class="card">
<h2>📺 Compare All TV Sizes</h2>
<table><thead><tr><th>TV Size</th><th>Diagonal (cm)</th><th>Width (cm)</th><th>Height (cm)</th></tr></thead>
<tbody>{compare}</tbody></table>
</div>
<div class="card">
<h2>❓ FAQ</h2>
<div class="faq-item"><div class="faq-q" onclick="toggleFaq(this)">What is the width of a {inch} inch TV?</div><div class="faq-a">~{w:.1f} cm ({w/2.54:.1f} inches) wide based on 16:9.</div></div>
<div class="faq-item"><div class="faq-q" onclick="toggleFaq(this)">Is {inch} inch TV big enough for a living room?</div><div class="faq-a">{lr_text}</div></div>
<div class="faq-item"><div class="faq-q" onclick="toggleFaq(this)">How far should I sit from a {inch} inch TV?</div><div class="faq-a">For 4K: {min4k:.1f}–{max4k:.1f}m. For 1080p: {min1080:.1f}–{max1080:.1f}m.</div></div>
</div>
<div class="card">
<h2>🔗 Related</h2>
<div class="internal-links">
<a href="/{inch}-inch-to-cm/">{inch} inch to cm</a>
<a href="/tv-size-conversion">All TV Sizes</a>
{rels}
</div>
</div>
</div>
{FOOTER}
{SHARED_JS}
</body>
</html>'''

    write_file(os.path.join(BASE, f'{inch}-inch-tv-in-cm', 'index.html'), html)
    print(f'  ✅ /{inch}-inch-tv-in-cm/')

# ============================================================
# Aggregate: /inch-to-cm-chart/
# ============================================================
def gen_chart_page():
    rows = ''
    for r in range(1, 26):
        rows += '<tr>'
        for col in [r, r+25, r+50, r+75]:
            rows += f'<td><a href="/{col}-inch-to-cm/">{col}"</a></td><td>{col*2.54:.2f}</td>'
        rows += '</tr>\n'

    html = f'''<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Inch to CM Chart – Full Conversion Table (1-100 Inches)</title>
<meta name="description" content="Complete inch to cm conversion chart from 1 to 100 inches. Quick reference table with all values.">
<link rel="canonical" href="{SITE}/inch-to-cm-chart/">
<link rel="stylesheet" href="/shared-styles.css">
</head><body>
{NAV}
<div class="container">
<div class="breadcrumb"><a href="/">Home</a> &rsaquo; Inch to CM Chart</div>
<div class="hero-result"><h1>Inch to CM Conversion Chart</h1><p>Complete reference — 1 to 100 inches</p></div>
<div class="card"><h2>📊 Full Conversion Table</h2>
<table><thead><tr><th>Inches</th><th>CM</th><th>Inches</th><th>CM</th><th>Inches</th><th>CM</th><th>Inches</th><th>CM</th></tr></thead>
<tbody>{rows}</tbody></table></div>
<div class="card"><h2>🔗 Popular Conversions</h2>
<div class="internal-links">
<a href="/32-inch-to-cm/">32 inch to cm</a><a href="/55-inch-to-cm/">55 inch to cm</a><a href="/65-inch-to-cm/">65 inch to cm</a>
<a href="/72-inch-to-cm/">72 inch to cm</a><a href="/tv-size-conversion">TV Size Guide</a><a href="/height-conversion">Height Conversion</a>
</div></div></div>
{FOOTER}{SHARED_JS}</body></html>'''
    write_file(os.path.join(BASE, 'inch-to-cm-chart', 'index.html'), html)
    print('  ✅ /inch-to-cm-chart/')

# ============================================================
# Aggregate: /tv-size-conversion/
# ============================================================
def gen_tv_aggregate():
    rows = ''
    for s in TV_SIZES:
        rows += f'<tr><td><a href="/{s}-inch-tv-in-cm/">{s}"</a></td><td>{s*2.54:.2f}</td><td>~{s*2.21:.1f}</td><td>~{s*1.24:.1f}</td><td>{get_room_label(s)}</td></tr>\n'

    html = f'''<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TV Size Conversion Chart – All TV Dimensions in CM (2026)</title>
<meta name="description" content="Complete TV size conversion chart. Every TV size from 24 to 85 inches with dimensions in centimeters.">
<link rel="canonical" href="{SITE}/tv-size-conversion/">
<link rel="stylesheet" href="/shared-styles.css">
</head><body>
{NAV}
<div class="container">
<div class="breadcrumb"><a href="/">Home</a> &rsaquo; TV Size Conversion</div>
<div class="hero-result"><h1>TV Size Conversion Guide (2026)</h1><p>All TV dimensions in centimeters</p></div>
<div class="card"><h2>📺 All TV Sizes Compared</h2>
<table><thead><tr><th>TV Size</th><th>Diagonal (cm)</th><th>Width (cm)</th><th>Height (cm)</th><th>Best For</th></tr></thead>
<tbody>{rows}</tbody></table></div>
<div class="card"><h2>🛋️ Choosing the Right TV Size</h2>
<h3>By Room Size</h3><ul><li><strong>Small (under 10 m²):</strong> 32–43"</li><li><strong>Medium (10–20 m²):</strong> 50–55"</li><li><strong>Large (20+ m²):</strong> 65–85"</li></ul>
<h3>By Viewing Distance</h3><ul><li><strong>1.5–2m:</strong> 32–43"</li><li><strong>2–3m:</strong> 50–55"</li><li><strong>3–4m:</strong> 65–75"</li><li><strong>4m+:</strong> 77–85"</li></ul></div>
<div class="card"><h2>🔗 Quick Links</h2><div class="internal-links">
{"".join(f'<a href="/{s}-inch-tv-in-cm/">{s}" TV</a>' for s in [32,40,43,50,55,65,75,85])}
<a href="/inch-to-cm-chart">Full Chart</a></div></div></div>
{FOOTER}{SHARED_JS}</body></html>'''
    write_file(os.path.join(BASE, 'tv-size-conversion', 'index.html'), html)
    print('  ✅ /tv-size-conversion/')

# ============================================================
# Aggregate: /height-conversion/
# ============================================================
def gen_height_page():
    rows = ''
    for feet in range(4, 8):
        max_in = 0 if feet == 7 else 11
        for inch in range(0, max_in + 1):
            total = feet * 12 + inch
            rows += f'<tr><td>{feet}\'{inch}"</td><td><a href="/{total}-inch-to-cm/">{total}"</a></td><td>{total*2.54:.2f} cm</td><td>{total*0.0254:.2f} m</td></tr>\n'

    html = f'''<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Height Conversion Chart – Feet &amp; Inches to CM (2026)</title>
<meta name="description" content="Convert height from feet and inches to centimeters. Complete chart from 4'0 to 7'0.">
<link rel="canonical" href="{SITE}/height-conversion/">
<link rel="stylesheet" href="/shared-styles.css">
</head><body>
{NAV}
<div class="container">
<div class="breadcrumb"><a href="/">Home</a> &rsaquo; Height Conversion</div>
<div class="hero-result"><h1>Height Conversion: Feet &amp; Inches to CM</h1><p>Quick reference for human height conversion</p></div>
<div class="card"><h2>📏 Height Conversion Chart</h2>
<table><thead><tr><th>Feet &amp; Inches</th><th>Total Inches</th><th>Centimeters</th><th>Meters</th></tr></thead>
<tbody>{rows}</tbody></table></div>
<div class="card"><h2>🌍 Common Height References</h2><ul>
<li><strong>5'4" (163 cm)</strong> — Average female height (US)</li>
<li><strong>5'9" (175 cm)</strong> — Average male height (US)</li>
<li><strong>5'7" (170 cm)</strong> — Average male height (worldwide)</li>
<li><strong>6'0" (183 cm)</strong> — Considered tall in most countries</li></ul></div>
<div class="card"><h2>🔗 Related</h2><div class="internal-links">
<a href="/60-inch-to-cm/">5 feet in cm</a><a href="/66-inch-to-cm/">5'6" in cm</a>
<a href="/70-inch-to-cm/">5'10" in cm</a><a href="/72-inch-to-cm/">6 feet in cm</a>
<a href="/inch-to-cm-chart">Full Chart</a><a href="/clothing-size-conversion">Clothing Sizes</a>
</div></div></div>
{FOOTER}{SHARED_JS}</body></html>'''
    write_file(os.path.join(BASE, 'height-conversion', 'index.html'), html)
    print('  ✅ /height-conversion/')

# ============================================================
# Aggregate: /clothing-size-conversion/
# ============================================================
def gen_clothing_page():
    html = f'''<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Clothing Size Conversion – Inches to CM for Waist, Chest &amp; More</title>
<meta name="description" content="Convert clothing measurements from inches to centimeters. Waist, chest, hip conversion charts for US, UK, EU sizing.">
<link rel="canonical" href="{SITE}/clothing-size-conversion/">
<link rel="stylesheet" href="/shared-styles.css">
</head><body>
{NAV}
<div class="container">
<div class="breadcrumb"><a href="/">Home</a> &rsaquo; Clothing Size Conversion</div>
<div class="hero-result"><h1>Clothing Size Conversion Guide</h1><p>Inches to CM for waist, chest, hip, and inseam</p></div>
<div class="card"><h2>👖 Waist Size: Inches to CM</h2>
<table><thead><tr><th>Waist (in)</th><th>Waist (cm)</th><th>US Size</th><th>EU Size</th></tr></thead><tbody>
<tr><td><a href="/26-inch-to-cm/">26"</a></td><td>66.04</td><td>XS (2)</td><td>34</td></tr>
<tr><td><a href="/28-inch-to-cm/">28"</a></td><td>71.12</td><td>S (4)</td><td>36</td></tr>
<tr><td><a href="/30-inch-to-cm/">30"</a></td><td>76.20</td><td>M (6–8)</td><td>38–40</td></tr>
<tr><td><a href="/32-inch-to-cm/">32"</a></td><td>81.28</td><td>M–L (10)</td><td>42</td></tr>
<tr><td><a href="/34-inch-to-cm/">34"</a></td><td>86.36</td><td>L (12)</td><td>44</td></tr>
<tr><td><a href="/36-inch-to-cm/">36"</a></td><td>91.44</td><td>XL (14)</td><td>46</td></tr>
<tr><td><a href="/38-inch-to-cm/">38"</a></td><td>96.52</td><td>XXL (16)</td><td>48</td></tr>
<tr><td><a href="/40-inch-to-cm/">40"</a></td><td>101.60</td><td>XXXL (18)</td><td>50</td></tr>
</tbody></table></div>
<div class="card"><h2>👔 Chest Size: Inches to CM</h2>
<table><thead><tr><th>Chest (in)</th><th>Chest (cm)</th><th>Size</th></tr></thead><tbody>
<tr><td><a href="/34-inch-to-cm/">34"</a></td><td>86.36</td><td>XS</td></tr>
<tr><td><a href="/36-inch-to-cm/">36"</a></td><td>91.44</td><td>S</td></tr>
<tr><td><a href="/38-inch-to-cm/">38"</a></td><td>96.52</td><td>M</td></tr>
<tr><td><a href="/40-inch-to-cm/">40"</a></td><td>101.60</td><td>L</td></tr>
<tr><td><a href="/42-inch-to-cm/">42"</a></td><td>106.68</td><td>XL</td></tr>
<tr><td><a href="/44-inch-to-cm/">44"</a></td><td>111.76</td><td>XXL</td></tr>
</tbody></table></div>
<div class="card"><h2>🔗 Related</h2><div class="internal-links">
<a href="/height-conversion">Height Conversion</a><a href="/inch-to-cm-chart">Inch to CM Chart</a>
<a href="/28-inch-to-cm/">28" to cm</a><a href="/30-inch-to-cm/">30" to cm</a>
<a href="/32-inch-to-cm/">32" to cm</a><a href="/34-inch-to-cm/">34" to cm</a>
</div></div></div>
{FOOTER}{SHARED_JS}</body></html>'''
    write_file(os.path.join(BASE, 'clothing-size-conversion', 'index.html'), html)
    print('  ✅ /clothing-size-conversion/')

# ============================================================
# Blog index
# ============================================================
def gen_blog_index():
    html = f'''<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Blog – Inch to CM Guides, Tips &amp; Size Charts</title>
<meta name="description" content="Expert guides on TV sizes, height conversion, clothing measurements, and more.">
<link rel="canonical" href="{SITE}/blogs/">
<link rel="stylesheet" href="/shared-styles.css">
</head><body>
{NAV}
<div class="container">
<div class="breadcrumb"><a href="/">Home</a> &rsaquo; Blog</div>
<div class="hero-result"><h1>Size Guides &amp; Conversion Blog</h1><p>Expert articles on measurements, TV sizes, height, and clothing</p></div>
<div class="grid-cards">
<a href="/blogs/tv-size-guide-2026.html" class="grid-item" style="text-decoration:none;color:inherit"><h3>📺 TV Size Guide (2026)</h3><p>Complete guide to choosing the right TV size.</p></a>
<a href="/blogs/height-conversion-chart.html" class="grid-item" style="text-decoration:none;color:inherit"><h3>📏 Height Conversion Chart</h3><p>Feet &amp; inches to cm with average heights.</p></a>
<a href="/blogs/how-to-measure-tv-size.html" class="grid-item" style="text-decoration:none;color:inherit"><h3>🔍 How to Measure TV Size</h3><p>Learn the correct way to measure your TV.</p></a>
<a href="/blogs/32-vs-40-inch-tv.html" class="grid-item" style="text-decoration:none;color:inherit"><h3>⚖️ 32 vs 40 Inch TV</h3><p>Which size for your space?</p></a>
<a href="/blogs/55-vs-65-inch-tv.html" class="grid-item" style="text-decoration:none;color:inherit"><h3>⚖️ 55 vs 65 Inch TV</h3><p>The two most popular living room sizes compared.</p></a>
<a href="/blogs/how-to-convert-inches-to-cm.html" class="grid-item" style="text-decoration:none;color:inherit"><h3>📐 How to Convert Inches to CM</h3><p>Simple formula with examples.</p></a>
</div></div>
{FOOTER}{SHARED_JS}</body></html>'''
    write_file(os.path.join(BASE, 'blogs', 'index.html'), html)
    print('  ✅ /blogs/')

# ============================================================
# Sitemap
# ============================================================
def gen_sitemap(pages):
    today = datetime.date.today().isoformat()
    urls = []
    urls.append(('/', '1.0', 'weekly'))
    for p in ['inch-to-cm-chart', 'tv-size-conversion', 'height-conversion', 'clothing-size-conversion']:
        urls.append((f'/{p}/', '0.9', 'monthly'))
    for i in pages:
        urls.append((f'/{i}-inch-to-cm/', '0.8', 'monthly'))
    for i in TV_SIZES:
        urls.append((f'/{i}-inch-tv-in-cm/', '0.8', 'monthly'))
    urls.append(('/blogs/', '0.7', 'weekly'))
    for slug in ['tv-size-guide-2026', '55-vs-65-inch-tv', '32-vs-40-inch-tv', 'how-to-measure-tv-size', 'how-to-convert-inches-to-cm', 'height-conversion-chart']:
        urls.append((f'/blogs/{slug}.html', '0.7', 'monthly'))

    xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    for loc, pri, freq in urls:
        xml += f'  <url><loc>{SITE}{loc}</loc><lastmod>{today}</lastmod><changefreq>{freq}</changefreq><priority>{pri}</priority></url>\n'
    xml += '</urlset>'
    write_file(os.path.join(BASE, 'sitemap.xml'), xml)
    print(f'  ✅ sitemap.xml ({len(urls)} URLs)')

# ============================================================
# MAIN
# ============================================================
if __name__ == '__main__':
    print('\n🚀 inch-to-cm.online pSEO Page Generator')
    print('=' * 42)

    priority = [1,2,3,4,5,6,7,8,9,10,12,15,18,20,24,25,26,27,28,30,32,34,36,38,
                40,42,43,44,48,50,55,60,62,64,65,66,68,70,72,74,75,76,77,78,80,84,85,90,96,100]

    print('\n📄 Generating conversion pages...')
    for i in priority:
        gen_conversion_page(i)

    print('\n📺 Generating TV pages...')
    for i in TV_SIZES:
        gen_tv_page(i)

    print('\n📊 Generating aggregate pages...')
    gen_chart_page()
    gen_tv_aggregate()
    gen_height_page()
    gen_clothing_page()

    print('\n📝 Generating blog index...')
    gen_blog_index()

    print('\n🗺️ Generating sitemap...')
    gen_sitemap(priority)

    print('\n' + '=' * 42)
    print('✅ Generation complete!')
    print(f'   📄 {len(priority)} conversion pages')
    print(f'   📺 {len(TV_SIZES)} TV pages')
    print('   📊 4 aggregate pages')
    print('   📝 1 blog index')
    print('   🗺️ 1 sitemap.xml')
    print(f'\n   Total: {len(priority) + len(TV_SIZES) + 4 + 1 + 1} pages generated')
