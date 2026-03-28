/**
 * Battle Theater — Animated SVG battle scene engine
 * Uses JS-driven SVG transforms (no CSS px/viewBox mismatch)
 */

var BattleTheater = (function () {
  'use strict';

  var overlay, stage, narrationEl, stepIndicator, skipBtn, doneBtn, closeBtn, titleEl;
  var currentLoc = null;
  var currentStep = 0;
  var typewriterTimer = null;
  var sceneTimer = null;
  var animFrameId = null;
  var spinChakraFrameId = null;
  var isPlaying = false;

  var STEP_DURATION = 4200;
  var TYPEWRITER_SPEED = 25;

  function getLocalizedNarration(step) {
    if (!currentLoc) return null;
    var c = I18n.content();
    var locOver = c.locations && c.locations[currentLoc.id];
    if (locOver && locOver.battleNarrations && locOver.battleNarrations[step]) {
      return locOver.battleNarrations[step];
    }
    return null;
  }

  /* Krishna rests at x=120, demon at x=480, both centered at y=200 */
  var K_HOME = { x: 140, y: 175 };
  var D_HOME = { x: 510, y: 175 };

  function init() {
    overlay = document.getElementById('battleTheater');
    stage = document.getElementById('battleStage');
    narrationEl = document.getElementById('battleNarration');
    stepIndicator = document.getElementById('battleStepIndicator');
    skipBtn = document.getElementById('battleSkip');
    closeBtn = document.getElementById('battleClose');
    titleEl = document.getElementById('battleTitle');
    doneBtn = document.getElementById('battleDone');

    if (!overlay) return;
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (skipBtn) skipBtn.addEventListener('click', skipToEnd);
    if (doneBtn) doneBtn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
  }

  function open(locationId) {
    currentLoc = KRISHNA_LOCATIONS.find(function (l) { return l.id === locationId; });
    if (!currentLoc || !currentLoc.battleScenes) return;
    currentStep = 0;
    isPlaying = true;
    overlay.classList.add('visible');
    overlay.classList.remove('battle-at-end');
    document.body.style.overflow = 'hidden';
    var c = I18n.content();
    var locOver = c.locations && c.locations[locationId];
    var locName = (locOver && locOver.name) || currentLoc.name;
    var locDemon = (locOver && locOver.demon) || currentLoc.demon;
    if (titleEl) titleEl.textContent = locName + ' — ' + locDemon;
    renderScene();
    playStep();
  }

  function close() {
    isPlaying = false;
    clearTimeout(sceneTimer);
    clearTimeout(typewriterTimer);
    cancelAnimationFrame(animFrameId);
    cancelAnimationFrame(spinChakraFrameId);
    spinChakraFrameId = null;
    overlay.classList.remove('visible');
    overlay.classList.remove('battle-at-end');
    document.body.style.overflow = '';
    stage.innerHTML = '';
    narrationEl.textContent = '';
    if (titleEl) titleEl.textContent = '';

    if (currentLoc && typeof QuestMode !== 'undefined' && QuestMode.isActive()) {
      QuestMode.markBattleWatched(currentLoc.id);
    }
    currentLoc = null;
  }

  function skipToEnd() {
    if (!currentLoc) return;
    clearTimeout(sceneTimer);
    clearTimeout(typewriterTimer);
    cancelAnimationFrame(animFrameId);
    currentStep = currentLoc.battleScenes.length - 1;
    var scene = currentLoc.battleScenes[currentStep];
    narrationEl.textContent = getLocalizedNarration(currentStep) || scene.narration;
    updateStepIndicator();
    animateFigures(scene);
    sceneTimer = setTimeout(function () { showVictory(); }, 2500);
  }

  function playStep() {
    if (!isPlaying || !currentLoc) return;
    var scenes = currentLoc.battleScenes;
    if (currentStep >= scenes.length) {
      showVictory();
      return;
    }
    var scene = scenes[currentStep];
    updateStepIndicator();
    animateFigures(scene);
    var narText = getLocalizedNarration(currentStep) || scene.narration;
    typewriteText(narText, function () {
      if (scene.effect !== 'none') {
        setTimeout(function () { spawnEffect(scene.effect); }, 200);
      }
      sceneTimer = setTimeout(function () {
        currentStep++;
        playStep();
      }, STEP_DURATION);
    });
  }

  function updateStepIndicator() {
    if (!currentLoc) return;
    stepIndicator.textContent = (currentStep + 1) + ' / ' + currentLoc.battleScenes.length;
  }

  function typewriteText(text, cb) {
    narrationEl.textContent = '';
    var i = 0;
    function tick() {
      if (!isPlaying) return;
      if (i < text.length) {
        narrationEl.textContent += text[i];
        i++;
        typewriterTimer = setTimeout(tick, TYPEWRITER_SPEED);
      } else if (cb) {
        cb();
      }
    }
    tick();
  }

  /* ==============================================================
     SVG Scene Builder
     ============================================================== */

  function renderScene() {
    if (!currentLoc) return;
    stage.innerHTML = buildStageSVG();
  }

  function buildStageSVG() {
    return '<svg class="battle-svg" viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg">' +
      defs() +
      background() +
      '<g id="bfKrishna" transform="translate(' + K_HOME.x + ',' + K_HOME.y + ')">' +
        krishnaBody() +
      '</g>' +
      '<g id="bfDemon" transform="translate(' + D_HOME.x + ',' + D_HOME.y + ')">' +
        demonBody(currentLoc.demonType) +
      '</g>' +
      '<g id="bfParticles"></g>' +
      '<g id="bfChakra" transform="translate(350,200)" opacity="0">' +
        chakraSVG(60) +
      '</g>' +
    '</svg>';
  }

  function defs() {
    return '<defs>' +
      '<filter id="fGlow"><feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b"/>' +
        '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      '<filter id="fGlowStrong"><feGaussianBlur in="SourceGraphic" stdDeviation="8" result="b"/>' +
        '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      '<radialGradient id="auraK" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="#FFD700" stop-opacity="0.3"/>' +
        '<stop offset="100%" stop-color="#FFD700" stop-opacity="0"/>' +
      '</radialGradient>' +
      '<radialGradient id="auraD" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="#FF4444" stop-opacity="0.25"/>' +
        '<stop offset="100%" stop-color="#FF4444" stop-opacity="0"/>' +
      '</radialGradient>' +
    '</defs>';
  }

  function background() {
    return '' +
      '<rect width="700" height="420" fill="#0d0a18"/>' +
      '<rect y="330" width="700" height="90" fill="#15100a" opacity="0.7"/>' +
      '<line x1="0" y1="332" x2="700" y2="332" stroke="#DAA520" stroke-width="1" opacity="0.25"/>' +
      '<ellipse cx="350" cy="340" rx="280" ry="12" fill="rgba(218,165,32,0.06)"/>' +
      '<text x="350" y="398" text-anchor="middle" fill="#DAA520" font-family="Yatra One,cursive" font-size="13" opacity="0.3">\u2694 ' + I18n.t('battleTheater') + ' \u2694</text>';
  }

  /* ---- Krishna Figure (centered at 0,0, about 120 units tall) ---- */

  function krishnaBody() {
    return '' +
      '<ellipse cx="0" cy="0" rx="80" ry="80" fill="url(#auraK)" filter="url(#fGlow)"/>' +
      // crown
      '<polygon points="-18,-80 0,-100 18,-80" fill="#FFD700" opacity="0.8"/>' +
      '<circle cx="0" cy="-90" r="5" fill="#FF9933" opacity="0.7"/>' +
      // head
      '<circle cx="0" cy="-55" r="28" fill="#3949AB"/>' +
      '<circle cx="0" cy="-55" r="24" fill="#5C6BC0"/>' +
      // eyes
      '<ellipse cx="-8" cy="-58" rx="4" ry="3" fill="#FFF8E7"/>' +
      '<ellipse cx="8" cy="-58" rx="4" ry="3" fill="#FFF8E7"/>' +
      '<circle cx="-8" cy="-58" r="2" fill="#1A237E"/>' +
      '<circle cx="8" cy="-58" r="2" fill="#1A237E"/>' +
      // tilak
      '<path d="M0,-70 L-3,-62 L0,-64 L3,-62 Z" fill="#FF9933"/>' +
      // smile
      '<path d="M-6,-48 Q0,-43 6,-48" fill="none" stroke="#FFF8E7" stroke-width="1.5" opacity="0.8"/>' +
      // body
      '<rect x="-24" y="-25" width="48" height="70" rx="12" fill="#FFD700"/>' +
      '<rect x="-24" y="-25" width="48" height="70" rx="12" fill="url(#auraK)" opacity="0.3"/>' +
      // chest jewel
      '<circle cx="0" cy="-8" r="6" fill="#E040FB" opacity="0.6"/>' +
      '<circle cx="0" cy="-8" r="3" fill="#FFF" opacity="0.4"/>' +
      // sash
      '<path d="M-24,10 Q0,20 24,10" fill="none" stroke="#FF9933" stroke-width="3" opacity="0.7"/>' +
      // arms
      '<line x1="-24" y1="-10" x2="-55" y2="10" stroke="#5C6BC0" stroke-width="8" stroke-linecap="round"/>' +
      '<line x1="24" y1="-10" x2="55" y2="10" stroke="#5C6BC0" stroke-width="8" stroke-linecap="round"/>' +
      // flute in right hand
      '<line x1="50" y1="5" x2="70" y2="-15" stroke="#DAA520" stroke-width="4" stroke-linecap="round"/>' +
      // dhoti
      '<path d="M-24,45 L-20,90 L0,80 L20,90 L24,45 Z" fill="#FFD700" opacity="0.85"/>' +
      // feet
      '<ellipse cx="-14" cy="95" rx="10" ry="5" fill="#5C6BC0"/>' +
      '<ellipse cx="14" cy="95" rx="10" ry="5" fill="#5C6BC0"/>';
  }

  /* ---- Demon Figures (centered at 0,0) ---- */

  function demonBody(type) {
    var aura = '<ellipse cx="0" cy="0" rx="85" ry="85" fill="url(#auraD)"/>';
    switch (type) {
      case 'serpent':
        return aura +
          // coiled body
          '<path d="M0,-40 Q50,0 10,50 Q-40,90 0,130" fill="none" stroke="#8B0000" stroke-width="22" stroke-linecap="round"/>' +
          '<path d="M0,-40 Q50,0 10,50 Q-40,90 0,130" fill="none" stroke="#B71C1C" stroke-width="16" stroke-linecap="round" opacity="0.5"/>' +
          // hood
          '<ellipse cx="0" cy="-55" rx="35" ry="25" fill="#8B0000"/>' +
          '<ellipse cx="0" cy="-55" rx="28" ry="20" fill="#B71C1C" opacity="0.6"/>' +
          // eyes
          '<circle cx="-12" cy="-55" r="6" fill="#FF4444"/><circle cx="-12" cy="-55" r="3" fill="#FFD700"/>' +
          '<circle cx="12" cy="-55" r="6" fill="#FF4444"/><circle cx="12" cy="-55" r="3" fill="#FFD700"/>' +
          // fangs
          '<line x1="-8" y1="-38" x2="-6" y2="-28" stroke="#FFF" stroke-width="3" stroke-linecap="round"/>' +
          '<line x1="8" y1="-38" x2="6" y2="-28" stroke="#FFF" stroke-width="3" stroke-linecap="round"/>' +
          // tongue
          '<path d="M0,-35 Q-5,-20 -8,-15 M0,-35 Q5,-20 8,-15" fill="none" stroke="#FF4444" stroke-width="2"/>';

      case 'beast':
        return aura +
          // body
          '<ellipse cx="0" cy="10" rx="45" ry="55" fill="#8B4513"/>' +
          '<ellipse cx="0" cy="10" rx="38" ry="48" fill="#A0522D" opacity="0.5"/>' +
          // head
          '<circle cx="0" cy="-50" r="30" fill="#8B4513"/>' +
          '<circle cx="0" cy="-50" r="25" fill="#6D3A1A" opacity="0.5"/>' +
          // horns / ears
          '<polygon points="-22,-72 -28,-98 -15,-78" fill="#5D3A1A"/>' +
          '<polygon points="22,-72 28,-98 15,-78" fill="#5D3A1A"/>' +
          // eyes
          '<circle cx="-12" cy="-52" r="6" fill="#FF4444"/><circle cx="-12" cy="-52" r="3" fill="#FFD700"/>' +
          '<circle cx="12" cy="-52" r="6" fill="#FF4444"/><circle cx="12" cy="-52" r="3" fill="#FFD700"/>' +
          // snout
          '<ellipse cx="0" cy="-38" rx="14" ry="8" fill="#5D3A1A"/>' +
          '<circle cx="-5" cy="-40" r="2" fill="#333"/><circle cx="5" cy="-40" r="2" fill="#333"/>' +
          // legs
          '<rect x="-35" y="55" width="18" height="40" rx="6" fill="#5D3A1A"/>' +
          '<rect x="17" y="55" width="18" height="40" rx="6" fill="#5D3A1A"/>';

      case 'giant':
        return aura +
          // body
          '<rect x="-38" y="-20" width="76" height="90" rx="14" fill="#800000"/>' +
          '<rect x="-32" y="-15" width="64" height="80" rx="10" fill="#A01010" opacity="0.4"/>' +
          // head
          '<circle cx="0" cy="-50" r="32" fill="#800000"/>' +
          '<circle cx="0" cy="-50" r="27" fill="#6A0000" opacity="0.5"/>' +
          // eyes
          '<circle cx="-12" cy="-52" r="6" fill="#FF4444"/><circle cx="-12" cy="-52" r="3" fill="#FFD700"/>' +
          '<circle cx="12" cy="-52" r="6" fill="#FF4444"/><circle cx="12" cy="-52" r="3" fill="#FFD700"/>' +
          // mouth
          '<path d="M-15,-35 Q0,-28 15,-35" fill="none" stroke="#FF4444" stroke-width="3"/>' +
          // multiple arms (giant/Banasura style)
          '<line x1="-38" y1="0" x2="-75" y2="-20" stroke="#800000" stroke-width="10" stroke-linecap="round"/>' +
          '<line x1="38" y1="0" x2="75" y2="-20" stroke="#800000" stroke-width="10" stroke-linecap="round"/>' +
          '<line x1="-38" y1="15" x2="-70" y2="35" stroke="#800000" stroke-width="8" stroke-linecap="round" opacity="0.7"/>' +
          '<line x1="38" y1="15" x2="70" y2="35" stroke="#800000" stroke-width="8" stroke-linecap="round" opacity="0.7"/>' +
          // legs
          '<rect x="-28" y="70" width="20" height="35" rx="7" fill="#800000"/>' +
          '<rect x="8" y="70" width="20" height="35" rx="7" fill="#800000"/>';

      case 'celestial':
        return aura +
          // celestial glow ring
          '<circle cx="0" cy="-20" r="70" fill="none" stroke="#FFD700" stroke-width="1.5" opacity="0.2"/>' +
          // body
          '<rect x="-30" y="-15" width="60" height="80" rx="10" fill="#4A148C"/>' +
          '<rect x="-25" y="-10" width="50" height="70" rx="8" fill="#6A1B9A" opacity="0.4"/>' +
          // head
          '<circle cx="0" cy="-48" r="28" fill="#4A148C"/>' +
          '<circle cx="0" cy="-48" r="23" fill="#6A1B9A" opacity="0.5"/>' +
          // crown
          '<polygon points="-20,-68 0,-88 20,-68" fill="#FFD700" opacity="0.7"/>' +
          '<circle cx="0" cy="-78" r="4" fill="#E040FB" opacity="0.7"/>' +
          // eyes
          '<circle cx="-10" cy="-50" r="5" fill="#E040FB"/><circle cx="-10" cy="-50" r="2.5" fill="#FFF"/>' +
          '<circle cx="10" cy="-50" r="5" fill="#E040FB"/><circle cx="10" cy="-50" r="2.5" fill="#FFF"/>' +
          // arms with weapons
          '<line x1="-30" y1="5" x2="-60" y2="-15" stroke="#4A148C" stroke-width="8" stroke-linecap="round"/>' +
          '<line x1="30" y1="5" x2="60" y2="-15" stroke="#4A148C" stroke-width="8" stroke-linecap="round"/>' +
          // weapon (trident)
          '<line x1="55" y1="-10" x2="55" y2="-60" stroke="#FFD700" stroke-width="3"/>' +
          '<polygon points="45,-60 55,-75 65,-60" fill="#FFD700"/>' +
          // legs
          '<rect x="-22" y="65" width="16" height="35" rx="6" fill="#4A148C"/>' +
          '<rect x="6" y="65" width="16" height="35" rx="6" fill="#4A148C"/>';

      default: // humanoid
        return aura +
          // body
          '<rect x="-30" y="-15" width="60" height="80" rx="10" fill="#8B0000"/>' +
          '<rect x="-25" y="-10" width="50" height="70" rx="8" fill="#A01010" opacity="0.4"/>' +
          // head
          '<circle cx="0" cy="-48" r="28" fill="#8B0000"/>' +
          '<circle cx="0" cy="-48" r="23" fill="#6A0000" opacity="0.5"/>' +
          // helmet
          '<path d="M-25,-60 Q0,-80 25,-60" fill="#333" opacity="0.7"/>' +
          // eyes
          '<circle cx="-10" cy="-50" r="5" fill="#FF4444"/><circle cx="-10" cy="-50" r="2.5" fill="#FFD700"/>' +
          '<circle cx="10" cy="-50" r="5" fill="#FF4444"/><circle cx="10" cy="-50" r="2.5" fill="#FFD700"/>' +
          // mouth
          '<path d="M-10,-35 Q0,-30 10,-35" fill="none" stroke="#FF4444" stroke-width="2"/>' +
          // arms
          '<line x1="-30" y1="5" x2="-60" y2="-15" stroke="#8B0000" stroke-width="10" stroke-linecap="round"/>' +
          '<line x1="30" y1="5" x2="60" y2="-15" stroke="#8B0000" stroke-width="10" stroke-linecap="round"/>' +
          // mace in hand
          '<line x1="-55" y1="-10" x2="-55" y2="-55" stroke="#666" stroke-width="4"/>' +
          '<circle cx="-55" cy="-58" r="10" fill="#555"/>' +
          // legs
          '<rect x="-22" y="65" width="16" height="35" rx="6" fill="#8B0000"/>' +
          '<rect x="6" y="65" width="16" height="35" rx="6" fill="#8B0000"/>';
    }
  }

  function chakraSVG(r) {
    var s = '';
    for (var i = 0; i < 12; i++) {
      var a = (i * 30) * Math.PI / 180;
      var ir = r * 0.6, or = r;
      s += '<line x1="' + (ir*Math.cos(a)) + '" y1="' + (ir*Math.sin(a)) + '" x2="' + (or*Math.cos(a)) + '" y2="' + (or*Math.sin(a)) + '" stroke="#FFD700" stroke-width="3"/>';
    }
    for (var j = 0; j < 12; j++) {
      var b = (j * 30 + 15) * Math.PI / 180;
      var tip = r * 1.15;
      var base = r * 0.9;
      s += '<polygon points="' +
        (tip*Math.cos(b)) + ',' + (tip*Math.sin(b)) + ' ' +
        (base*Math.cos(b-0.12)) + ',' + (base*Math.sin(b-0.12)) + ' ' +
        (base*Math.cos(b+0.12)) + ',' + (base*Math.sin(b+0.12)) +
      '" fill="#FF9933" opacity="0.8"/>';
    }
    return '<circle cx="0" cy="0" r="' + r + '" fill="none" stroke="#FFD700" stroke-width="3" filter="url(#fGlow)"/>' +
      '<circle cx="0" cy="0" r="' + (r*0.6) + '" fill="none" stroke="#FF9933" stroke-width="2"/>' +
      s +
      '<circle cx="0" cy="0" r="' + (r*0.18) + '" fill="#FFD700"/>';
  }

  /* ==============================================================
     JS-Driven Animation (sets SVG transform attribute directly)
     ============================================================== */

  var figurePos = { kx: 0, ky: 0, dx: 0, dy: 0, kScale: 1, dScale: 1, dOpacity: 1 };

  function animateFigures(scene) {
    var kEl = stage.querySelector('#bfKrishna');
    var dEl = stage.querySelector('#bfDemon');
    if (!kEl || !dEl) return;

    var target = getTargets(scene);
    var start = { kx: figurePos.kx, ky: figurePos.ky, dx: figurePos.dx, dy: figurePos.dy, kScale: figurePos.kScale, dScale: figurePos.dScale, dOpacity: figurePos.dOpacity };
    var dur = 800;
    var t0 = performance.now();

    cancelAnimationFrame(animFrameId);

    function step(now) {
      var p = Math.min((now - t0) / dur, 1);
      var ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

      figurePos.kx = lerp(start.kx, target.kx, ease);
      figurePos.ky = lerp(start.ky, target.ky, ease);
      figurePos.dx = lerp(start.dx, target.dx, ease);
      figurePos.dy = lerp(start.dy, target.dy, ease);
      figurePos.kScale = lerp(start.kScale, target.kScale, ease);
      figurePos.dScale = lerp(start.dScale, target.dScale, ease);
      figurePos.dOpacity = lerp(start.dOpacity, target.dOpacity, ease);

      kEl.setAttribute('transform', 'translate(' + (K_HOME.x + figurePos.kx) + ',' + (K_HOME.y + figurePos.ky) + ') scale(' + figurePos.kScale + ')');
      dEl.setAttribute('transform', 'translate(' + (D_HOME.x + figurePos.dx) + ',' + (D_HOME.y + figurePos.dy) + ') scale(' + figurePos.dScale + ')');
      dEl.setAttribute('opacity', figurePos.dOpacity);

      if (p < 1) {
        animFrameId = requestAnimationFrame(step);
      }
    }
    animFrameId = requestAnimationFrame(step);
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  function getTargets(scene) {
    var kx = 0, ky = 0, dx = 0, dy = 0, ks = 1, ds = 1, dop = 1;

    switch (scene.krishnaAction) {
      case 'stand': break;
      case 'leap': kx = 80; ky = -60; ks = 1.1; break;
      case 'strike': kx = 120; ky = -10; ks = 1.08; break;
      case 'grab': kx = 100; break;
      case 'glow': ks = 1.15; break;
      case 'finish': kx = 140; ks = 1.12; break;
    }

    switch (scene.demonAction) {
      case 'taunt': ds = 1.06; dy = -8; break;
      case 'approach': dx = -60; break;
      case 'charge': dx = -120; ds = 1.08; break;
      case 'attack': dx = -80; ds = 1.05; break;
      case 'stagger': dx = 30; dy = 10; ds = 0.95; break;
      case 'fall': dx = 50; dy = 60; ds = 0.7; dop = 0.3; break;
      case 'flee': dx = 150; dop = 0.2; break;
      case 'collapse': dx = 20; dy = 80; ds = 0.6; dop = 0.25; break;
    }

    return { kx: kx, ky: ky, dx: dx, dy: dy, kScale: ks, dScale: ds, dOpacity: dop };
  }

  /* ---- Effects ---- */

  function spawnEffect(effect) {
    var pEl = stage.querySelector('#bfParticles');
    var cEl = stage.querySelector('#bfChakra');
    if (!pEl) return;
    pEl.innerHTML = '';
    if (cEl) cEl.setAttribute('opacity', '0');

    var cx = 350, cy = 200;

    if (effect === 'burst' || effect === 'shockwave') {
      var color = effect === 'burst' ? '#FFD700' : '#FF9933';
      for (var i = 0; i < 30; i++) {
        var a = Math.random() * Math.PI * 2;
        var d = 30 + Math.random() * 150;
        var px = cx + d * Math.cos(a);
        var py = cy + d * Math.sin(a);
        var pr = 3 + Math.random() * 7;
        pEl.innerHTML += '<circle cx="' + px + '" cy="' + py + '" r="' + pr + '" fill="' + color + '" opacity="0.9">' +
          '<animate attributeName="opacity" from="0.9" to="0" dur="1.5s" fill="freeze"/>' +
          '<animate attributeName="r" from="' + pr + '" to="0" dur="1.5s" fill="freeze"/>' +
        '</circle>';
      }
      // shockwave ring
      pEl.innerHTML += '<circle cx="' + cx + '" cy="' + cy + '" r="10" fill="none" stroke="' + color + '" stroke-width="3" opacity="0.8">' +
        '<animate attributeName="r" from="10" to="200" dur="1s" fill="freeze"/>' +
        '<animate attributeName="opacity" from="0.8" to="0" dur="1s" fill="freeze"/>' +
      '</circle>';
      if (effect === 'burst' && cEl) {
        cEl.setAttribute('opacity', '1');
        spinChakra(cEl, 2500);
      }
    } else if (effect === 'glow') {
      pEl.innerHTML = '<circle cx="' + (K_HOME.x) + '" cy="' + (K_HOME.y) + '" r="20" fill="#FFD700" opacity="0">' +
        '<animate attributeName="r" from="20" to="120" dur="1.5s" fill="freeze"/>' +
        '<animate attributeName="opacity" from="0.4" to="0" dur="1.5s" fill="freeze"/>' +
      '</circle>';
    } else if (effect === 'impact') {
      pEl.innerHTML = '<line x1="280" y1="160" x2="420" y2="240" stroke="#FF4444" stroke-width="5" opacity="1">' +
        '<animate attributeName="opacity" from="1" to="0" dur="0.5s" fill="freeze"/></line>' +
        '<line x1="300" y1="240" x2="400" y2="160" stroke="#FF4444" stroke-width="5" opacity="1">' +
        '<animate attributeName="opacity" from="1" to="0" dur="0.5s" fill="freeze"/></line>' +
        '<circle cx="350" cy="200" r="5" fill="#FFF" opacity="1">' +
        '<animate attributeName="r" from="5" to="60" dur="0.6s" fill="freeze"/>' +
        '<animate attributeName="opacity" from="0.8" to="0" dur="0.6s" fill="freeze"/></circle>';
    } else if (effect === 'drain') {
      for (var j = 0; j < 12; j++) {
        var sx = D_HOME.x + (Math.random() * 60 - 30);
        var sy = D_HOME.y + (Math.random() * 60 - 30);
        pEl.innerHTML += '<circle cx="' + sx + '" cy="' + sy + '" r="5" fill="#8B0000" opacity="0.8">' +
          '<animate attributeName="cx" from="' + sx + '" to="' + K_HOME.x + '" dur="1.5s" fill="freeze"/>' +
          '<animate attributeName="cy" from="' + sy + '" to="' + K_HOME.y + '" dur="1.5s" fill="freeze"/>' +
          '<animate attributeName="opacity" from="0.8" to="0" dur="1.5s" fill="freeze"/></circle>';
      }
    }
  }

  var chakraAngle = 0;
  function spinChakra(el, duration) {
    var t0 = performance.now();
    chakraAngle = 0;
    cancelAnimationFrame(spinChakraFrameId);
    function tick(now) {
      var elapsed = now - t0;
      if (elapsed > duration) {
        el.setAttribute('opacity', '0');
        spinChakraFrameId = null;
        return;
      }
      chakraAngle = (elapsed / 4) % 360;
      el.setAttribute('transform', 'translate(350,200) rotate(' + chakraAngle + ')');
      var fade = elapsed > duration - 500 ? (duration - elapsed) / 500 : 1;
      el.setAttribute('opacity', String(fade));
      spinChakraFrameId = requestAnimationFrame(tick);
    }
    spinChakraFrameId = requestAnimationFrame(tick);
  }

  /* ---- Victory ---- */

  function showVictory() {
    isPlaying = false;
    figurePos = { kx: 0, ky: 0, dx: 0, dy: 0, kScale: 1, dScale: 1, dOpacity: 1 };

    if (overlay) overlay.classList.add('battle-at-end');

    var c = I18n.content();
    var locOver = c.locations && c.locations[currentLoc.id];
    var locName = (locOver && locOver.name) || currentLoc.name;
    var locDemon = (locOver && locOver.demon) || currentLoc.demon;
    var locSanskrit = (locOver && locOver.demonSanskrit) || currentLoc.demonSanskrit;

    stage.innerHTML = '<svg class="battle-svg" viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg">' +
      defs() +
      '<rect width="700" height="420" fill="#0d0a18"/>' +
      '<rect width="700" height="420" fill="url(#auraK)" opacity="0.3"/>' +
      '<g id="vcChakra" transform="translate(350,170)">' +
        chakraSVG(80) +
      '</g>' +
      '<text x="350" y="310" text-anchor="middle" fill="#DAA520" font-family="Yatra One,cursive" font-size="36" filter="url(#fGlow)">' +
        I18n.t('demonVanquished') +
      '</text>' +
      '<text x="350" y="350" text-anchor="middle" fill="#FF9933" font-family="Tiro Devanagari Hindi,serif" font-size="22" opacity="0.85">' +
        locSanskrit + ' \u2014 ' + locDemon +
      '</text>' +
      '<text x="350" y="390" text-anchor="middle" fill="#FFD700" font-family="Yatra One,cursive" font-size="16" opacity="0.6">' +
        locName +
      '</text>' +
    '</svg>';

    narrationEl.textContent = '';
    stepIndicator.textContent = '';

    var vc = stage.querySelector('#vcChakra');
    if (vc) spinChakra(vc, 6000);

    isPlaying = true;
    typewriteText('\u2726  ' + locDemon + '  \u2726  ' + I18n.t('battleWon'), function () { isPlaying = false; });
  }

  return { init: init, open: open, close: close };
})();
