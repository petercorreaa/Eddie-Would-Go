<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Eddie Would Go</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Playfair+Display:ital,wght@0,700;1,400&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --black: #000000;
      --white: #ffffff;
      --gray-100: #f5f5f5;
      --gray-200: #e0e0e0;
      --gray-400: #999;
      --transition: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--white);
      color: var(--black);
      font-family: 'DM Sans', sans-serif;
      font-weight: 300;
      overflow-x: hidden;
    }

    /* Scroll reveal */
    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ─── NAVBAR ─── */
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 48px;
      height: 64px;
      background: var(--white);
      border-bottom: 1px solid var(--black);
      transition: background var(--transition);
    }

    .nav-logo {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.6rem;
      letter-spacing: 0.12em;
      color: var(--black);
      text-decoration: none;
      position: relative;
    }
    .nav-logo::after {
      content: '';
      position: absolute;
      bottom: -2px; left: 0;
      width: 0; height: 2px;
      background: var(--black);
      transition: width var(--transition);
    }
    .nav-logo:hover::after { width: 100%; }

    .nav-links {
      display: flex;
      gap: 36px;
      list-style: none;
    }
    .nav-links a {
      font-size: 0.75rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--black);
      text-decoration: none;
      position: relative;
      padding-bottom: 2px;
    }
    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0;
      width: 0; height: 1px;
      background: var(--black);
      transition: width var(--transition);
    }
    .nav-links a:hover::after { width: 100%; }

    /* subscribe button removed */

    /* ─── HERO HEADER ─── */
    .hero-banner {
      margin-top: 64px;
      border-bottom: 1px solid var(--black);
      padding: 48px 48px 32px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
    }
    .hero-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(4rem, 10vw, 9rem);
      line-height: 0.9;
      letter-spacing: -0.01em;
    }
    .hero-meta {
      text-align: right;
    }
    .hero-date {
      font-size: 0.72rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--gray-400);
    }
    .hero-tagline {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 1rem;
      margin-top: 8px;
      max-width: 260px;
      line-height: 1.5;
    }

    /* ─── TICKER ─── */
    .ticker-wrap {
      overflow: hidden;
      border-bottom: 1px solid var(--black);
      background: var(--black);
      color: var(--white);
      padding: 10px 0;
      white-space: nowrap;
    }
    .ticker-inner {
      display: inline-flex;
      animation: ticker 30s linear infinite;
    }
    .ticker-inner span {
      font-size: 0.72rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      padding: 0 48px;
    }
    .ticker-inner span::before {
      content: '◆';
      margin-right: 48px;
      opacity: 0.5;
    }
    @keyframes ticker {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }

    /* ─── MAIN LAYOUT ─── */
    .page-grid {
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
      min-height: calc(100vh - 200px);
    }

    /* ─── SIDEBAR ─── */
    .sidebar {
      border-right: 1px solid var(--black);
      padding: 40px 32px;
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .sidebar-right {
      border-right: none;
      border-left: 1px solid var(--black);
    }

    .sidebar-label {
      font-size: 0.62rem;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: var(--gray-400);
      padding-bottom: 16px;
      border-bottom: 1px solid var(--gray-200);
      margin-bottom: 24px;
    }

    /* Article Card — sidebar */
    .article-card {
      padding: 24px 0;
      border-bottom: 1px solid var(--gray-200);
      cursor: pointer;
      transition: background var(--transition);
      position: relative;
      overflow: hidden;
    }
    .article-card:last-child { border-bottom: none; }
    .article-card::before {
      content: '';
      position: absolute;
      left: 0; top: 0;
      width: 0; height: 100%;
      background: var(--gray-100);
      transition: width var(--transition);
      z-index: -1;
    }
    .article-card:hover::before { width: 100%; }

    .article-img {
      width: 100%;
      aspect-ratio: 16/9;
      background: var(--gray-200);
      margin-bottom: 14px;
      overflow: hidden;
      position: relative;
    }
    .article-img img {
      width: 100%; height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
      filter: grayscale(100%);
    }
    .article-card:hover .article-img img {
      transform: scale(1.05);
    }
    .article-img-placeholder {
      width: 100%; height: 100%;
      background: var(--gray-200);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .img-pattern {
      width: 100%; height: 100%;
      background-image: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 4px,
        var(--gray-100) 4px,
        var(--gray-100) 5px
      );
    }

    .article-category {
      font-size: 0.6rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--gray-400);
      margin-bottom: 8px;
    }
    .article-title {
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      font-size: 0.95rem;
      line-height: 1.35;
      margin-bottom: 10px;
      transition: opacity var(--transition);
    }
    .article-card:hover .article-title { opacity: 0.6; }
    .article-byline {
      font-size: 0.65rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--gray-400);
    }
    .article-byline strong {
      color: var(--black);
      font-weight: 500;
    }

    /* ─── FEATURED / CENTER ─── */
    .featured-col {
      padding: 40px 48px;
    }

    .featured-article {
      cursor: none;
    }

    .featured-label {
      font-size: 0.6rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--gray-400);
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .featured-label::before {
      content: '';
      display: inline-block;
      width: 24px; height: 1px;
      background: var(--gray-400);
    }

    .featured-img {
      width: 100%;
      aspect-ratio: 3/2;
      background: var(--gray-200);
      margin-bottom: 28px;
      overflow: hidden;
      position: relative;
    }
    .featured-img img {
      width: 100%; height: 100%;
      object-fit: cover;
      filter: grayscale(100%);
      transition: transform 0.8s ease, filter 0.8s ease;
    }
    .featured-article:hover .featured-img img {
      transform: scale(1.03);
      filter: grayscale(40%);
    }
    .featured-img-placeholder {
      width: 100%; height: 100%;
      background: var(--gray-200);
      display: grid;
      place-items: center;
    }
    .featured-img-pattern {
      width: 100%; height: 100%;
      background-image:
        repeating-linear-gradient(
          0deg, transparent, transparent 28px,
          var(--gray-100) 28px, var(--gray-100) 29px
        ),
        repeating-linear-gradient(
          90deg, transparent, transparent 28px,
          var(--gray-100) 28px, var(--gray-100) 29px
        );
    }

    .featured-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(2.4rem, 4vw, 3.6rem);
      line-height: 0.95;
      letter-spacing: 0.01em;
      margin-bottom: 18px;
      transition: opacity var(--transition);
    }
    .featured-article:hover .featured-title { opacity: 0.7; }

    .featured-excerpt {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 1rem;
      line-height: 1.65;
      color: #333;
      margin-bottom: 20px;
      max-width: 520px;
    }

    .featured-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid var(--gray-200);
      padding-top: 16px;
    }
    .featured-author {
      font-size: 0.72rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }
    .featured-author strong { font-weight: 500; }
    .featured-date {
      font-size: 0.65rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--gray-400);
    }
    .featured-reads {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .featured-read-more {
      font-size: 0.65rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--black);
      text-decoration: none;
      border-bottom: 1px solid var(--black);
      padding-bottom: 2px;
      transition: opacity var(--transition);
    }
    .featured-read-more:hover { opacity: 0.4; }

    /* ─── DIVIDER STRIP ─── */
    .divider-strip {
      border-top: 1px solid var(--black);
      border-bottom: 1px solid var(--black);
      padding: 12px 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--black);
      color: var(--white);
    }
    .divider-text {
      font-size: 0.65rem;
      letter-spacing: 0.25em;
      text-transform: uppercase;
    }
    .divider-line {
      flex: 1;
      height: 1px;
      background: #333;
      margin: 0 24px;
    }

    /* ─── BOTTOM GRID ─── */
    .bottom-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      border-top: 1px solid var(--black);
    }

    .bottom-card {
      padding: 32px 28px;
      border-right: 1px solid var(--black);
      cursor: none;
      transition: background var(--transition);
      position: relative;
      overflow: hidden;
    }
    .bottom-card:last-child { border-right: none; }
    .bottom-card::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0;
      width: 100%; height: 0;
      background: var(--black);
      transition: height 0.4s ease;
      z-index: 0;
    }
    .bottom-card:hover::after { height: 4px; }

    .bottom-card-inner { position: relative; z-index: 1; }

    .bottom-img {
      width: 100%;
      aspect-ratio: 4/3;
      margin-bottom: 16px;
      overflow: hidden;
    }
    .bottom-img-ph {
      width: 100%; height: 100%;
      background: var(--gray-200);
    }
    .bottom-img-ph-2 { background: #ccc; }
    .bottom-img-ph-3 { background: #ddd; }
    .bottom-img-ph-4 { background: #bbb; }

    .bottom-card .article-title {
      font-size: 0.88rem;
    }

    /* ─── FOOTER ─── */
    footer {
      border-top: 1px solid var(--black);
      background: var(--black);
      color: var(--white);
      padding: 60px 48px 32px;
    }
    .footer-top {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 48px;
      margin-bottom: 48px;
      padding-bottom: 48px;
      border-bottom: 1px solid #333;
    }
    .footer-brand {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 3rem;
      letter-spacing: 0.05em;
      line-height: 1;
      margin-bottom: 16px;
    }
    .footer-brand-sub {
      font-size: 0.75rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #666;
      line-height: 1.6;
    }
    .footer-col-title {
      font-size: 0.62rem;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: #666;
      margin-bottom: 20px;
    }
    .footer-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .footer-links a {
      color: var(--white);
      text-decoration: none;
      font-size: 0.85rem;
      transition: color var(--transition);
    }
    .footer-links a:hover { color: #666; }
    .footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .footer-copy {
      font-size: 0.65rem;
      color: #555;
      letter-spacing: 0.1em;
    }
    .footer-social {
      display: flex;
      gap: 20px;
    }
    .footer-social a {
      font-size: 0.65rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #555;
      text-decoration: none;
      transition: color var(--transition);
    }
    .footer-social a:hover { color: var(--white); }

    /* ─── FOLLOW SECTION ─── */
    .follow-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      border-top: 1px solid var(--black);
    }

    /* ── Instagram half — white bg ── */
    .follow-instagram {
      background: var(--white);
      border-right: 1px solid var(--black);
      padding: 64px 56px;
      text-decoration: none;
      color: var(--black);
      display: flex;
      flex-direction: column;
      gap: 40px;
      position: relative;
      overflow: hidden;
      transition: background var(--transition);
    }
    .follow-instagram:hover { background: var(--gray-100); }

    .follow-platform-tag {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.6rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--gray-400);
    }
    .follow-platform-tag svg { width: 13px; height: 13px; flex-shrink: 0; }

    .follow-heading {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(2.8rem, 4vw, 4.5rem);
      line-height: 0.92;
      letter-spacing: 0.01em;
    }

    .insta-reels-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
    }
    .insta-reel-thumb {
      aspect-ratio: 9/16;
      background: var(--gray-200);
      position: relative;
      overflow: hidden;
    }
    .insta-reel-thumb:nth-child(1) { background: #cacaca; }
    .insta-reel-thumb:nth-child(2) { background: #d8d8d8; }
    .insta-reel-thumb:nth-child(3) { background: #c0c0c0; }
    .insta-reel-thumb:nth-child(4) { background: #e2e2e2; }
    .insta-reel-thumb::after {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        -45deg,
        transparent, transparent 6px,
        rgba(0,0,0,0.03) 6px, rgba(0,0,0,0.03) 7px
      );
    }
    .reel-play {
      position: absolute;
      bottom: 8px; left: 8px;
      width: 20px; height: 20px;
      background: rgba(0,0,0,0.5);
      display: grid;
      place-items: center;
      z-index: 1;
    }
    .reel-play svg { width: 10px; height: 10px; fill: white; }

    .follow-meta {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .follow-handle {
      font-weight: 500;
      font-size: 1rem;
      letter-spacing: -0.01em;
    }
    .follow-desc {
      font-size: 0.78rem;
      color: var(--gray-400);
      line-height: 1.5;
    }
    .follow-cta {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-size: 0.65rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      border-bottom: 1px solid var(--black);
      padding-bottom: 3px;
      align-self: flex-start;
      transition: opacity var(--transition);
    }
    .follow-instagram:hover .follow-cta { opacity: 0.45; }

    /* ── Spotify half — black bg ── */
    .follow-spotify {
      background: var(--black);
      padding: 64px 56px;
      text-decoration: none;
      color: var(--white);
      display: flex;
      flex-direction: column;
      gap: 40px;
      position: relative;
      overflow: hidden;
      transition: background var(--transition);
    }
    .follow-spotify:hover { background: #111; }
    .follow-spotify .follow-platform-tag { color: #555; }
    .follow-spotify .follow-platform-tag svg { fill: #555; }
    .follow-spotify .follow-cta {
      border-bottom-color: #555;
      color: #999;
    }
    .follow-spotify:hover .follow-cta { opacity: 0.5; }

    /* Podcast episode stack */
    .podcast-stack {
      display: flex;
      flex-direction: column;
      gap: 0;
      border: 1px solid #222;
    }
    .podcast-ep {
      display: grid;
      grid-template-columns: 56px 1fr auto;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      border-bottom: 1px solid #222;
      transition: background var(--transition);
    }
    .podcast-ep:last-child { border-bottom: none; }
    .follow-spotify:hover .podcast-ep:first-child { background: #1a1a1a; }
    .ep-num {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.8rem;
      color: #333;
      line-height: 1;
    }
    .ep-info {}
    .ep-title {
      font-size: 0.82rem;
      font-weight: 500;
      color: var(--white);
      line-height: 1.3;
      margin-bottom: 3px;
    }
    .ep-date {
      font-size: 0.6rem;
      color: #555;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    .ep-duration {
      font-size: 0.62rem;
      color: #444;
      letter-spacing: 0.08em;
      white-space: nowrap;
    }

    .spotify-bar-large {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .spotify-now-label {
      font-size: 0.6rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #1DB954;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .spotify-now-label::before {
      content: '';
      display: inline-block;
      width: 6px; height: 6px;
      background: #1DB954;
      border-radius: 50%;
      animation: pulse 1.5s ease infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.8); }
    }
    .spotify-waveform {
      display: flex;
      align-items: flex-end;
      gap: 3px;
      height: 28px;
    }
    .waveform-bar {
      width: 3px;
      background: #333;
      border-radius: 1px;
      animation: wave 1.2s ease infinite;
    }
    .waveform-bar.active { background: #1DB954; }
    .waveform-bar:nth-child(1)  { height: 40%; animation-delay: 0s; }
    .waveform-bar:nth-child(2)  { height: 70%; animation-delay: 0.1s; }
    .waveform-bar:nth-child(3)  { height: 55%; animation-delay: 0.2s; }
    .waveform-bar:nth-child(4)  { height: 90%; animation-delay: 0.05s; }
    .waveform-bar:nth-child(5)  { height: 60%; animation-delay: 0.15s; }
    .waveform-bar:nth-child(6)  { height: 75%; animation-delay: 0.25s; }
    .waveform-bar:nth-child(7)  { height: 45%; animation-delay: 0.08s; }
    .waveform-bar:nth-child(8)  { height: 85%; animation-delay: 0.18s; }
    .waveform-bar:nth-child(9)  { height: 50%; animation-delay: 0.12s; }
    .waveform-bar:nth-child(10) { height: 65%; animation-delay: 0.22s; }
    .waveform-bar:nth-child(11) { height: 35%; animation-delay: 0.03s; }
    .waveform-bar:nth-child(12) { height: 80%; animation-delay: 0.17s; }
    @keyframes wave {
      0%, 100% { transform: scaleY(1); }
      50% { transform: scaleY(0.5); }
    }

    .nav-menu {
      display: flex;
      flex-direction: column;
      gap: 5px;
      cursor: none;
      padding: 4px;
    }
    .nav-menu span {
      display: block;
      width: 22px; height: 1px;
      background: var(--black);
      transition: transform var(--transition), opacity var(--transition);
    }
    .nav-menu:hover span:nth-child(1) { transform: translateY(3px); }
    .nav-menu:hover span:nth-child(3) { transform: translateY(-3px); }
  </style>
</head>
<body>


  <!-- NAVBAR -->
  <nav>
    <div class="nav-menu" aria-label="Menu">
      <span></span><span></span><span></span>
    </div>
    <a href="#" class="nav-logo">Eddie Would Go</a>
    <ul class="nav-links">
      <li><a href="#">Politics</a></li>
      <li><a href="#">Culture</a></li>
      <li><a href="#">About</a></li>
    </ul>
    <div style="width:80px"></div><!-- spacer for symmetry -->
  </nav>

  <!-- HERO HEADER -->
  <header class="hero-banner reveal">
    <div class="hero-title">Eddie<br>Would<br>Go</div>
    <div class="hero-meta">
      <div class="hero-date">Friday, March 20, 2026</div>
      <p class="hero-tagline">Independent journalism. No agenda but the truth.</p>
    </div>
  </header>

  <!-- TICKER -->
  <div class="ticker-wrap">
    <div class="ticker-inner">
      <span>Latest</span>
      <span>Politics & Power</span>
      <span>Culture Wars</span>
      <span>Long Reads</span>
      <span>Opinion</span>
      <span>Investigations</span>
      <span>Latest</span>
      <span>Politics & Power</span>
      <span>Culture Wars</span>
      <span>Long Reads</span>
      <span>Opinion</span>
      <span>Investigations</span>
    </div>
  </div>

  <!-- MAIN THREE-COLUMN GRID -->
  <main>
    <div class="page-grid">

      <!-- LEFT SIDEBAR -->
      <aside class="sidebar reveal">
        <div class="sidebar-label">Recent</div>

        <div class="article-card">
          <div class="article-img"><div class="img-pattern"></div></div>
          <div class="article-category">Politics</div>
          <h3 class="article-title">The Senate Votes and Nobody's Watching</h3>
          <div class="article-byline"><strong>Eddie M.</strong> — 03.19.26</div>
        </div>

        <div class="article-card">
          <div class="article-img"><div class="img-pattern"></div></div>
          <div class="article-category">Culture</div>
          <h3 class="article-title">What the Algorithm Doesn't Want You to Read</h3>
          <div class="article-byline"><strong>Eddie M.</strong> — 03.18.26</div>
        </div>

        <div class="article-card">
          <div class="article-img"><div class="img-pattern"></div></div>
          <div class="article-category">Essay</div>
          <h3 class="article-title">On the Slow Death of Civic Trust</h3>
          <div class="article-byline"><strong>Eddie M.</strong> — 03.15.26</div>
        </div>

        <div class="article-card">
          <div class="article-img"><div class="img-pattern"></div></div>
          <div class="article-category">Investigation</div>
          <h3 class="article-title">Inside the Lobbying Machine Nobody Talks About</h3>
          <div class="article-byline"><strong>Eddie M.</strong> — 03.12.26</div>
        </div>
      </aside>

      <!-- FEATURED CENTER -->
      <section class="featured-col">
        <div class="featured-article reveal" style="transition-delay: 0.15s">
          <div class="featured-label">Featured Story — Today</div>
          <div class="featured-img"><div class="featured-img-pattern"></div></div>
          <h2 class="featured-title">The Last Honest Conversation We Had About Power</h2>
          <p class="featured-excerpt">
            Something shifted in the room the moment he admitted it. Decades of careful omission, and here it was—the thing everyone had agreed never to say out loud. I was there. This is what actually happened.
          </p>
          <div class="featured-meta">
            <div>
              <div class="featured-author"><strong>Eddie M.</strong></div>
              <div class="featured-date">March 20, 2026 &nbsp;·&nbsp; 12 min read</div>
            </div>
            <div class="featured-reads">
              <a href="#" class="featured-read-more">Read Full Story →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- RIGHT SIDEBAR -->
      <aside class="sidebar sidebar-right reveal" style="transition-delay: 0.1s">
        <div class="sidebar-label">Also Reading</div>

        <div class="article-card">
          <div class="article-img"><div class="img-pattern"></div></div>
          <div class="article-category">Opinion</div>
          <h3 class="article-title">Why Journalists Keep Getting the Middle Class Wrong</h3>
          <div class="article-byline"><strong>Eddie M.</strong> — 03.17.26</div>
        </div>

        <div class="article-card">
          <div class="article-img"><div class="img-pattern"></div></div>
          <div class="article-category">Technology</div>
          <h3 class="article-title">The Attention Economy Has No Exit</h3>
          <div class="article-byline"><strong>Eddie M.</strong> — 03.14.26</div>
        </div>

        <div class="article-card">
          <div class="article-img"><div class="img-pattern"></div></div>
          <div class="article-category">Culture</div>
          <h3 class="article-title">Books That Made Me Change My Mind</h3>
          <div class="article-byline"><strong>Eddie M.</strong> — 03.10.26</div>
        </div>

        <div class="article-card">
          <div class="article-img"><div class="img-pattern"></div></div>
          <div class="article-category">Politics</div>
          <h3 class="article-title">The Bureaucracy Absorbs Everything</h3>
          <div class="article-byline"><strong>Eddie M.</strong> — 03.07.26</div>
        </div>
      </aside>

    </div>

    <!-- DIVIDER STRIP -->
    <div class="divider-strip">
      <span class="divider-text">More Stories</span>
      <div class="divider-line"></div>
      <span class="divider-text">March 2026</span>
    </div>

    <!-- BOTTOM FOUR-CARD GRID -->
    <div class="bottom-grid">

      <div class="bottom-card reveal">
        <div class="bottom-card-inner">
          <div class="bottom-img"><div class="bottom-img-ph"></div></div>
          <div class="article-category">Investigation</div>
          <h3 class="article-title">The Data They Don't Want You to See</h3>
          <div class="article-byline"><strong>Eddie M.</strong> — 03.16.26</div>
        </div>
      </div>

      <div class="bottom-card reveal" style="transition-delay:0.1s">
        <div class="bottom-card-inner">
          <div class="bottom-img"><div class="bottom-img-ph bottom-img-ph-2"></div></div>
          <div class="article-category">Culture</div>
          <h3 class="article-title">We Are All Performing Now. Every Single One of Us.</h3>
          <div class="article-byline"><strong>Eddie M.</strong> — 03.13.26</div>
        </div>
      </div>

      <div class="bottom-card reveal" style="transition-delay:0.2s">
        <div class="bottom-card-inner">
          <div class="bottom-img"><div class="bottom-img-ph bottom-img-ph-3"></div></div>
          <div class="article-category">Essay</div>
          <h3 class="article-title">A Letter to the City I Used to Know</h3>
          <div class="article-byline"><strong>Eddie M.</strong> — 03.09.26</div>
        </div>
      </div>

      <div class="bottom-card reveal" style="transition-delay:0.3s">
        <div class="bottom-card-inner">
          <div class="bottom-img"><div class="bottom-img-ph bottom-img-ph-4"></div></div>
          <div class="article-category">Opinion</div>
          <h3 class="article-title">Nothing About This Crisis Was Inevitable</h3>
          <div class="article-byline"><strong>Eddie M.</strong> — 03.05.26</div>
        </div>
      </div>

    </div>

  </main>

  <!-- FOLLOW SECTION -->
  <section class="follow-section">

    <!-- Instagram — white side -->
    <a href="https://instagram.com/eddiewouldgo" target="_blank" class="follow-instagram reveal">
      <div class="follow-platform-tag">
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
        Instagram
      </div>
      <h2 class="follow-heading">Field<br>Reports.<br>Reels.</h2>
      <div class="insta-reels-grid">
        <div class="insta-reel-thumb"><div class="reel-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div></div>
        <div class="insta-reel-thumb"><div class="reel-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div></div>
        <div class="insta-reel-thumb"><div class="reel-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div></div>
        <div class="insta-reel-thumb"><div class="reel-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div></div>
      </div>
      <div class="follow-meta">
        <div class="follow-handle">@eddiewouldgo</div>
        <div class="follow-desc">Short-form dispatches, on-the-ground footage,<br>and the stories that don't fit the article.</div>
      </div>
      <span class="follow-cta">Watch on Instagram →</span>
    </a>

    <!-- Spotify — black side -->
    <a href="https://open.spotify.com" target="_blank" class="follow-spotify reveal" style="transition-delay:0.1s">
      <div class="follow-platform-tag">
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
        Podcast
      </div>
      <h2 class="follow-heading" style="color:var(--white)">The<br>Podcast.<br>Listen.</h2>

      <div class="spotify-bar-large">
        <div class="spotify-now-label">Now Playing — Ep. 47</div>
        <div class="spotify-waveform">
          <div class="waveform-bar active"></div><div class="waveform-bar active"></div>
          <div class="waveform-bar active"></div><div class="waveform-bar active"></div>
          <div class="waveform-bar active"></div><div class="waveform-bar active"></div>
          <div class="waveform-bar"></div><div class="waveform-bar"></div>
          <div class="waveform-bar"></div><div class="waveform-bar"></div>
          <div class="waveform-bar"></div><div class="waveform-bar"></div>
        </div>
      </div>

      <div class="podcast-stack">
        <div class="podcast-ep">
          <div class="ep-num">47</div>
          <div class="ep-info">
            <div class="ep-title">The War Nobody Covered</div>
            <div class="ep-date">Mar 18, 2026</div>
          </div>
          <div class="ep-duration">42 min</div>
        </div>
        <div class="podcast-ep">
          <div class="ep-num">46</div>
          <div class="ep-info">
            <div class="ep-title">Inside the Intelligence Leak</div>
            <div class="ep-date">Mar 11, 2026</div>
          </div>
          <div class="ep-duration">38 min</div>
        </div>
        <div class="podcast-ep">
          <div class="ep-num">45</div>
          <div class="ep-info">
            <div class="ep-title">Who Controls the Narrative?</div>
            <div class="ep-date">Mar 04, 2026</div>
          </div>
          <div class="ep-duration">51 min</div>
        </div>
      </div>

      <span class="follow-cta">Listen on Spotify →</span>
    </a>

  </section>

  <!-- FOOTER -->
  <footer>
    <div class="footer-top">
      <div>
        <div class="footer-brand">Eddie<br>Would<br>Go</div>
        <p class="footer-brand-sub">Independent journalism.<br>No agenda but the truth.<br>Since 2021.</p>
      </div>
      <div>
        <div class="footer-col-title">Navigate</div>
        <ul class="footer-links">
          <li><a href="#">Politics</a></li>
          <li><a href="#">Culture</a></li>
          <li><a href="#">Investigations</a></li>
          <li><a href="#">Archive</a></li>
          <li><a href="#">About Eddie</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Get Involved</div>
        <ul class="footer-links">
          <li><a href="#">Subscribe to Newsletter</a></li>
          <li><a href="#">Support Independent Journalism</a></li>
          <li><a href="#">Tip Line</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Press & Media</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span class="footer-copy">© 2026 Eddie Would Go. All rights reserved.</span>
      <div class="footer-social">
        <a href="#">Twitter</a>
        <a href="#">Substack</a>
        <a href="#">Instagram</a>
        <a href="#">RSS</a>
      </div>
    </div>
  </footer>

  <script>
    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
  </script>
</body>
</html>
