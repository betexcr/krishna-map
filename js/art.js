/**
 * SVG Art — Illustrated scenes for Divine Forms cards and encyclopedia headers
 */

var KrishnaArt = (function () {
  'use strict';

  var W = 240, H = 180;

  function formArt(icon, color) {
    var hdr = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" class="form-art-svg">';
    var bg = '<defs>' +
      '<radialGradient id="fa' + icon + '" cx="50%" cy="60%" r="50%">' +
        '<stop offset="0%" stop-color="' + color + '" stop-opacity="0.2"/>' +
        '<stop offset="100%" stop-color="' + color + '" stop-opacity="0"/>' +
      '</radialGradient></defs>' +
      '<rect width="' + W + '" height="' + H + '" fill="url(#fa' + icon + ')"/>' +
      '<line x1="0" y1="' + (H-1) + '" x2="' + W + '" y2="' + (H-1) + '" stroke="' + color + '" stroke-width="1" opacity="0.3"/>';
    var art = '';

    switch (icon) {
      case 'baby':
        art = baby(color);
        break;
      case 'pot':
        art = butterThief(color);
        break;
      case 'cow':
        art = govinda(color);
        break;
      case 'flute':
        art = flutePlyr(color);
        break;
      case 'mountain':
        art = giridhari(color);
        break;
      case 'shield':
        art = ranchhodrai(color);
        break;
      case 'crown':
        art = dwarakadhish(color);
        break;
      case 'chariot':
        art = parthasarathi(color);
        break;
      case 'cosmic':
        art = vishvarupa(color);
        break;
      case 'lotus':
        art = yogeshwara(color);
        break;
      case 'fish':
        art = motifFish(color);
        break;
      case 'turtle':
        art = motifTurtle(color);
        break;
      case 'boar':
        art = motifBoar(color);
        break;
      case 'lion':
        art = motifLion(color);
        break;
      case 'dwarf':
        art = motifDwarf(color);
        break;
      case 'axe':
        art = motifAxe(color);
        break;
      case 'bow':
        art = motifBow(color);
        break;
      case 'avatar-krishna':
        art = baby(color);
        break;
      case 'buddha':
        art = motifBuddha(color);
        break;
      case 'kalki':
        art = motifKalki(color);
        break;
      case 'discus':
        art = motifDiscus(color);
        break;
      case 'trident':
        art = motifTrident(color);
        break;
      case 'shakti':
        art = motifShakti(color);
        break;
      case 'swan':
        art = motifSwan(color);
        break;
      case 'lotus-gold':
        art = motifLotusGold(color);
        break;
      case 'veena':
        art = motifVeena(color);
        break;
      case 'elephant':
        art = motifElephant(color);
        break;
      case 'spear':
        art = motifSpear(color);
        break;
      case 'mace':
        art = motifMace(color);
        break;
      case 'sun':
        art = motifSun(color);
        break;
      default:
        art = genericKrishna(color);
    }
    return hdr + bg + art + '</svg>';
  }

  /* ---- Helper: figure body centered at (cx, cy) ---- */
  function figHead(cx, cy, r, skinColor) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + skinColor + '"/>' +
      '<circle cx="' + (cx-r*0.25) + '" cy="' + (cy-r*0.1) + '" r="' + (r*0.12) + '" fill="#FFF8E7"/>' +
      '<circle cx="' + (cx+r*0.25) + '" cy="' + (cy-r*0.1) + '" r="' + (r*0.12) + '" fill="#FFF8E7"/>' +
      '<path d="M' + (cx-r*0.15) + ',' + (cy+r*0.25) + ' Q' + cx + ',' + (cy+r*0.4) + ' ' + (cx+r*0.15) + ',' + (cy+r*0.25) + '" fill="none" stroke="#FFF8E7" stroke-width="1" opacity="0.7"/>';
  }

  function tilak(cx, cy, s) {
    return '<path d="M' + cx + ',' + (cy-s*1.2) + ' L' + (cx-s*0.4) + ',' + (cy) + ' L' + cx + ',' + (cy-s*0.3) + ' L' + (cx+s*0.4) + ',' + cy + ' Z" fill="#FF9933" opacity="0.8"/>';
  }

  function peacockFeather(cx, cy, s) {
    return '<line x1="' + cx + '" y1="' + cy + '" x2="' + cx + '" y2="' + (cy-s*2.5) + '" stroke="#2E7D32" stroke-width="1.5"/>' +
      '<ellipse cx="' + cx + '" cy="' + (cy-s*2) + '" rx="' + (s*0.6) + '" ry="' + (s*1.2) + '" fill="#1B5E20" opacity="0.7"/>' +
      '<ellipse cx="' + cx + '" cy="' + (cy-s*2) + '" rx="' + (s*0.3) + '" ry="' + (s*0.6) + '" fill="#1A237E"/>' +
      '<circle cx="' + cx + '" cy="' + (cy-s*2) + '" r="' + (s*0.15) + '" fill="#FFD700"/>';
  }

  function lotusDecor(cx, cy, s, col) {
    var p = '';
    for (var i = 0; i < 6; i++) {
      var a = (i * 60 - 90) * Math.PI / 180;
      var px = cx + s * 0.7 * Math.cos(a);
      var py = cy + s * 0.7 * Math.sin(a);
      p += '<ellipse cx="' + px + '" cy="' + py + '" rx="' + (s*0.25) + '" ry="' + (s*0.5) + '" fill="' + col + '" opacity="0.6" transform="rotate(' + (i*60) + ',' + px + ',' + py + ')"/>';
    }
    return p + '<circle cx="' + cx + '" cy="' + cy + '" r="' + (s*0.2) + '" fill="#DAA520"/>';
  }

  /* ---- Individual Form Art ---- */

  function baby(c) {
    var cx = 120, cy = 110;
    return '' +
      lotusDecor(40, 150, 18, c) + lotusDecor(200, 150, 18, c) +
      // baby body crawling
      '<ellipse cx="' + cx + '" cy="' + (cy+15) + '" rx="28" ry="18" fill="#5C6BC0"/>' +
      figHead(cx+20, cy-5, 18, '#7986CB') +
      tilak(cx+20, cy-15, 6) +
      // crawling limbs
      '<line x1="' + (cx-15) + '" y1="' + (cy+25) + '" x2="' + (cx-28) + '" y2="' + (cy+40) + '" stroke="#7986CB" stroke-width="6" stroke-linecap="round"/>' +
      '<line x1="' + (cx+10) + '" y1="' + (cy+25) + '" x2="' + (cx+5) + '" y2="' + (cy+42) + '" stroke="#7986CB" stroke-width="6" stroke-linecap="round"/>' +
      // butter ball
      '<circle cx="' + (cx-20) + '" cy="' + (cy-10) + '" r="12" fill="#FFD700" opacity="0.8"/>' +
      '<circle cx="' + (cx-22) + '" cy="' + (cy-13) + '" r="4" fill="#FFF" opacity="0.3"/>' +
      // divine glow
      '<circle cx="' + cx + '" cy="' + cy + '" r="50" fill="none" stroke="' + c + '" stroke-width="1" opacity="0.2"/>';
  }

  function butterThief(c) {
    var cx = 120, cy = 85;
    return '' +
      // hanging pot
      '<line x1="80" y1="10" x2="80" y2="50" stroke="#8D6E63" stroke-width="2"/>' +
      '<ellipse cx="80" cy="55" rx="18" ry="14" fill="#8D6E63"/>' +
      '<ellipse cx="80" cy="52" rx="14" ry="5" fill="#FFD700" opacity="0.5"/>' +
      // child Krishna reaching up
      figHead(cx, cy-20, 16, '#7986CB') +
      tilak(cx, cy-30, 5) +
      peacockFeather(cx+10, cy-35, 6) +
      '<rect x="' + (cx-14) + '" y="' + (cy-2) + '" width="28" height="35" rx="6" fill="#FFD700"/>' +
      // reaching arm
      '<line x1="' + (cx-14) + '" y1="' + (cy+8) + '" x2="' + (cx-35) + '" y2="' + (cy-20) + '" stroke="#7986CB" stroke-width="5" stroke-linecap="round"/>' +
      // other arm
      '<line x1="' + (cx+14) + '" y1="' + (cy+8) + '" x2="' + (cx+28) + '" y2="' + (cy+20) + '" stroke="#7986CB" stroke-width="5" stroke-linecap="round"/>' +
      // legs
      '<line x1="' + (cx-6) + '" y1="' + (cy+33) + '" x2="' + (cx-10) + '" y2="' + (cy+55) + '" stroke="#7986CB" stroke-width="5" stroke-linecap="round"/>' +
      '<line x1="' + (cx+6) + '" y1="' + (cy+33) + '" x2="' + (cx+10) + '" y2="' + (cy+55) + '" stroke="#7986CB" stroke-width="5" stroke-linecap="round"/>' +
      lotusDecor(195, 155, 15, c);
  }

  function govinda(c) {
    var cx = 130, cy = 75;
    return '' +
      // cow
      '<ellipse cx="65" cy="120" rx="32" ry="22" fill="#F5F5DC" opacity="0.8"/>' +
      '<circle cx="45" cy="105" r="14" fill="#F5F5DC" opacity="0.8"/>' +
      '<polygon points="35,95 30,82 38,90" fill="#F5F5DC" opacity="0.7"/>' +
      '<polygon points="55,95 60,82 52,90" fill="#F5F5DC" opacity="0.7"/>' +
      '<circle cx="40" cy="103" r="2" fill="#333"/>' +
      '<rect x="42" y="138" width="6" height="18" rx="2" fill="#D2C8A0"/>' +
      '<rect x="55" y="138" width="6" height="18" rx="2" fill="#D2C8A0"/>' +
      '<rect x="72" y="138" width="6" height="18" rx="2" fill="#D2C8A0"/>' +
      '<rect x="84" y="138" width="6" height="18" rx="2" fill="#D2C8A0"/>' +
      // Krishna standing
      figHead(cx, cy-15, 16, '#7986CB') +
      tilak(cx, cy-25, 5) +
      peacockFeather(cx+8, cy-30, 6) +
      '<rect x="' + (cx-14) + '" y="' + (cy+3) + '" width="28" height="40" rx="6" fill="#FFD700"/>' +
      '<path d="M' + (cx-14) + ',' + (cy+43) + ' L' + (cx-10) + ',' + (cy+80) + ' L' + cx + ',' + (cy+72) + ' L' + (cx+10) + ',' + (cy+80) + ' L' + (cx+14) + ',' + (cy+43) + ' Z" fill="#FFD700" opacity="0.85"/>' +
      // staff
      '<line x1="' + (cx+22) + '" y1="' + (cy-20) + '" x2="' + (cx+22) + '" y2="' + (cy+80) + '" stroke="#8D6E63" stroke-width="3"/>' +
      // hand on cow
      '<line x1="' + (cx-14) + '" y1="' + (cy+15) + '" x2="' + (cx-40) + '" y2="' + (cy+30) + '" stroke="#7986CB" stroke-width="5" stroke-linecap="round"/>' +
      // trees
      '<circle cx="210" cy="60" r="25" fill="#2E7D32" opacity="0.3"/>' +
      '<rect x="207" y="80" width="6" height="30" rx="2" fill="#5D4037" opacity="0.3"/>';
  }

  function flutePlyr(c) {
    var cx = 120, cy = 60;
    return '' +
      // moon
      '<circle cx="40" cy="30" r="15" fill="#FFF8E7" opacity="0.15"/>' +
      // tree
      '<rect x="185" y="40" width="8" height="120" rx="3" fill="#5D4037" opacity="0.4"/>' +
      '<circle cx="190" cy="35" r="28" fill="#2E7D32" opacity="0.25"/>' +
      '<circle cx="175" cy="50" r="22" fill="#1B5E20" opacity="0.2"/>' +
      // divine glow
      '<circle cx="' + cx + '" cy="' + (cy+20) + '" r="65" fill="none" stroke="' + c + '" stroke-width="1.5" opacity="0.15"/>' +
      // Krishna
      figHead(cx, cy-10, 18, '#5C6BC0') +
      tilak(cx, cy-22, 6) +
      peacockFeather(cx+12, cy-28, 7) +
      '<rect x="' + (cx-16) + '" y="' + (cy+10) + '" width="32" height="45" rx="7" fill="#FFD700"/>' +
      '<path d="M' + (cx-16) + ',' + (cy+55) + ' L' + (cx-12) + ',' + (cy+100) + ' L' + cx + ',' + (cy+90) + ' L' + (cx+12) + ',' + (cy+100) + ' L' + (cx+16) + ',' + (cy+55) + ' Z" fill="#FFD700" opacity="0.85"/>' +
      // flute held to lips
      '<line x1="' + (cx+15) + '" y1="' + (cy-5) + '" x2="' + (cx+55) + '" y2="' + (cy-5) + '" stroke="#DAA520" stroke-width="5" stroke-linecap="round"/>' +
      '<circle cx="' + (cx+25) + '" cy="' + (cy-5) + '" r="1.5" fill="#8D6E63"/>' +
      '<circle cx="' + (cx+33) + '" cy="' + (cy-5) + '" r="1.5" fill="#8D6E63"/>' +
      '<circle cx="' + (cx+41) + '" cy="' + (cy-5) + '" r="1.5" fill="#8D6E63"/>' +
      // music notes
      '<text x="' + (cx+58) + '" y="' + (cy-20) + '" fill="' + c + '" font-size="14" opacity="0.5">♪</text>' +
      '<text x="' + (cx+48) + '" y="' + (cy-30) + '" fill="' + c + '" font-size="10" opacity="0.4">♫</text>' +
      // arms
      '<line x1="' + (cx+16) + '" y1="' + (cy+20) + '" x2="' + (cx+32) + '" y2="' + (cy) + '" stroke="#5C6BC0" stroke-width="5" stroke-linecap="round"/>' +
      '<line x1="' + (cx-16) + '" y1="' + (cy+20) + '" x2="' + (cx-5) + '" y2="' + (cy) + '" stroke="#5C6BC0" stroke-width="5" stroke-linecap="round"/>' +
      lotusDecor(35, 160, 14, '#FF9933');
  }

  function giridhari(c) {
    var cx = 120, cy = 95;
    return '' +
      // mountain (Govardhana)
      '<polygon points="30,80 120,15 210,80" fill="#5D4037" opacity="0.5"/>' +
      '<polygon points="50,80 120,28 190,80" fill="#795548" opacity="0.4"/>' +
      // grass
      '<rect x="20" y="148" width="200" height="32" rx="4" fill="#2E7D32" opacity="0.15"/>' +
      // people sheltering (small figures)
      '<circle cx="60" cy="140" r="5" fill="#FFB74D" opacity="0.4"/><rect x="56" y="145" width="8" height="12" rx="2" fill="#FF9933" opacity="0.3"/>' +
      '<circle cx="80" cy="142" r="4" fill="#FFB74D" opacity="0.4"/><rect x="77" y="146" width="6" height="10" rx="2" fill="#DAA520" opacity="0.3"/>' +
      '<circle cx="165" cy="140" r="5" fill="#FFB74D" opacity="0.4"/><rect x="161" y="145" width="8" height="12" rx="2" fill="#FF9933" opacity="0.3"/>' +
      // cow
      '<ellipse cx="180" cy="148" rx="14" ry="10" fill="#F5F5DC" opacity="0.3"/>' +
      // Krishna in center, one arm raised
      figHead(cx, cy, 16, '#5C6BC0') +
      tilak(cx, cy-10, 5) +
      '<rect x="' + (cx-14) + '" y="' + (cy+18) + '" width="28" height="35" rx="6" fill="#FFD700"/>' +
      // raised left pinky finger holding mountain
      '<line x1="' + (cx-5) + '" y1="' + (cy+18) + '" x2="' + (cx-5) + '" y2="' + (cy-15) + '" stroke="#5C6BC0" stroke-width="5" stroke-linecap="round"/>' +
      '<circle cx="' + (cx-5) + '" cy="' + (cy-18) + '" r="3" fill="#5C6BC0"/>' +
      // right arm down
      '<line x1="' + (cx+14) + '" y1="' + (cy+28) + '" x2="' + (cx+30) + '" y2="' + (cy+45) + '" stroke="#5C6BC0" stroke-width="5" stroke-linecap="round"/>' +
      // rain above
      '<line x1="40" y1="5" x2="38" y2="15" stroke="#90CAF9" stroke-width="1.5" opacity="0.3"/>' +
      '<line x1="100" y1="2" x2="98" y2="12" stroke="#90CAF9" stroke-width="1.5" opacity="0.3"/>' +
      '<line x1="160" y1="5" x2="158" y2="15" stroke="#90CAF9" stroke-width="1.5" opacity="0.3"/>' +
      '<line x1="200" y1="3" x2="198" y2="13" stroke="#90CAF9" stroke-width="1.5" opacity="0.3"/>';
  }

  function ranchhodrai(c) {
    var cx = 140, cy = 80;
    return '' +
      // city (Mathura) in distance
      '<rect x="15" y="95" width="25" height="50" rx="3" fill="#5D4037" opacity="0.2"/>' +
      '<polygon points="15,95 27,75 40,95" fill="#5D4037" opacity="0.25"/>' +
      '<rect x="45" y="105" width="18" height="40" rx="2" fill="#5D4037" opacity="0.15"/>' +
      // dust trail
      '<ellipse cx="100" cy="155" rx="40" ry="8" fill="#8D6E63" opacity="0.15"/>' +
      // Krishna running (dynamic pose)
      figHead(cx, cy-15, 16, '#5C6BC0') +
      '<rect x="' + (cx-14) + '" y="' + (cy+3) + '" width="28" height="35" rx="6" fill="#FFD700"/>' +
      // running legs
      '<line x1="' + (cx-6) + '" y1="' + (cy+38) + '" x2="' + (cx-25) + '" y2="' + (cy+60) + '" stroke="#5C6BC0" stroke-width="5" stroke-linecap="round"/>' +
      '<line x1="' + (cx+6) + '" y1="' + (cy+38) + '" x2="' + (cx+25) + '" y2="' + (cy+55) + '" stroke="#5C6BC0" stroke-width="5" stroke-linecap="round"/>' +
      // running arms
      '<line x1="' + (cx-14) + '" y1="' + (cy+12) + '" x2="' + (cx-35) + '" y2="' + (cy+25) + '" stroke="#5C6BC0" stroke-width="5" stroke-linecap="round"/>' +
      '<line x1="' + (cx+14) + '" y1="' + (cy+12) + '" x2="' + (cx+35) + '" y2="' + cy + '" stroke="#5C6BC0" stroke-width="5" stroke-linecap="round"/>' +
      // flowing cloth behind
      '<path d="M' + (cx-14) + ',' + (cy+10) + ' Q' + (cx-45) + ',' + (cy+5) + ' ' + (cx-55) + ',' + (cy+20) + '" fill="none" stroke="#FF9933" stroke-width="3" opacity="0.6"/>' +
      // sea in distance (to Dwaraka)
      '<path d="M170,160 Q190,155 210,160 Q225,165 240,160" fill="none" stroke="#1565C0" stroke-width="2" opacity="0.3"/>' +
      '<path d="M175,168 Q195,163 215,168" fill="none" stroke="#1565C0" stroke-width="1.5" opacity="0.2"/>';
  }

  function dwarakadhish(c) {
    var cx = 120, cy = 65;
    return '' +
      // throne
      '<rect x="' + (cx-30) + '" y="' + (cy+40) + '" width="60" height="60" rx="4" fill="#8B0000" opacity="0.4"/>' +
      '<path d="M' + (cx-35) + ',' + (cy+40) + ' Q' + cx + ',' + (cy+20) + ' ' + (cx+35) + ',' + (cy+40) + '" fill="#8B0000" opacity="0.3"/>' +
      // pillars
      '<rect x="25" y="30" width="12" height="140" rx="3" fill="#DAA520" opacity="0.2"/>' +
      '<rect x="203" y="30" width="12" height="140" rx="3" fill="#DAA520" opacity="0.2"/>' +
      // canopy
      '<path d="M20,35 Q120,10 220,35" fill="none" stroke="#DAA520" stroke-width="2" opacity="0.25"/>' +
      // Krishna seated royally
      figHead(cx, cy-15, 18, '#5C6BC0') +
      tilak(cx, cy-27, 6) +
      // elaborate crown
      '<polygon points="' + (cx-15) + ',' + (cy-32) + ' ' + cx + ',' + (cy-52) + ' ' + (cx+15) + ',' + (cy-32) + '" fill="#FFD700"/>' +
      '<circle cx="' + cx + '" cy="' + (cy-42) + '" r="4" fill="#E040FB" opacity="0.7"/>' +
      '<circle cx="' + (cx-8) + '" cy="' + (cy-36) + '" r="2.5" fill="#FF4444" opacity="0.6"/>' +
      '<circle cx="' + (cx+8) + '" cy="' + (cy-36) + '" r="2.5" fill="#FF4444" opacity="0.6"/>' +
      // body
      '<rect x="' + (cx-18) + '" y="' + (cy+5) + '" width="36" height="40" rx="7" fill="#FFD700"/>' +
      // kaustubha gem
      '<circle cx="' + cx + '" cy="' + (cy+15) + '" r="6" fill="#E040FB" opacity="0.6"/>' +
      '<circle cx="' + cx + '" cy="' + (cy+15) + '" r="3" fill="#FFF" opacity="0.3"/>' +
      // garland
      '<path d="M' + (cx-16) + ',' + (cy+10) + ' Q' + cx + ',' + (cy+30) + ' ' + (cx+16) + ',' + (cy+10) + '" fill="none" stroke="#FF9933" stroke-width="2.5" opacity="0.6"/>' +
      // royal arms resting
      '<line x1="' + (cx-18) + '" y1="' + (cy+20) + '" x2="' + (cx-35) + '" y2="' + (cy+35) + '" stroke="#5C6BC0" stroke-width="5" stroke-linecap="round"/>' +
      '<line x1="' + (cx+18) + '" y1="' + (cy+20) + '" x2="' + (cx+35) + '" y2="' + (cy+35) + '" stroke="#5C6BC0" stroke-width="5" stroke-linecap="round"/>';
  }

  function parthasarathi(c) {
    var cx = 120, cy = 80;
    return '' +
      // battlefield
      '<rect x="0" y="145" width="240" height="35" fill="#5D4037" opacity="0.1"/>' +
      // chariot body
      '<rect x="60" y="105" width="120" height="40" rx="6" fill="#8B0000" opacity="0.5"/>' +
      '<rect x="65" y="108" width="110" height="34" rx="4" fill="#A01010" opacity="0.3"/>' +
      // chariot wheel
      '<circle cx="80" cy="148" r="16" fill="none" stroke="#DAA520" stroke-width="2.5" opacity="0.6"/>' +
      '<circle cx="80" cy="148" r="3" fill="#DAA520" opacity="0.5"/>' +
      '<circle cx="160" cy="148" r="16" fill="none" stroke="#DAA520" stroke-width="2.5" opacity="0.6"/>' +
      '<circle cx="160" cy="148" r="3" fill="#DAA520" opacity="0.5"/>' +
      // spokes
      '<line x1="80" y1="135" x2="80" y2="161" stroke="#DAA520" stroke-width="1" opacity="0.4"/>' +
      '<line x1="67" y1="148" x2="93" y2="148" stroke="#DAA520" stroke-width="1" opacity="0.4"/>' +
      '<line x1="160" y1="135" x2="160" y2="161" stroke="#DAA520" stroke-width="1" opacity="0.4"/>' +
      '<line x1="147" y1="148" x2="173" y2="148" stroke="#DAA520" stroke-width="1" opacity="0.4"/>' +
      // flag
      '<line x1="170" y1="105" x2="170" y2="35" stroke="#8D6E63" stroke-width="2"/>' +
      '<polygon points="170,35 200,45 170,55" fill="#FF9933" opacity="0.5"/>' +
      // Arjuna (back figure, with bow)
      '<circle cx="145" cy="82" r="12" fill="#FFB74D" opacity="0.6"/>' +
      '<rect x="138" y="95" width="14" height="20" rx="3" fill="#4CAF50" opacity="0.5"/>' +
      '<path d="M155,85 Q170,70 165,95" fill="none" stroke="#8D6E63" stroke-width="2" opacity="0.5"/>' +
      // Krishna (front, driving)
      figHead(cx-20, cy-5, 14, '#5C6BC0') +
      tilak(cx-20, cy-14, 4) +
      '<rect x="' + (cx-32) + '" y="' + (cy+10) + '" width="24" height="25" rx="5" fill="#FFD700" opacity="0.9"/>' +
      // reins
      '<line x1="' + (cx-32) + '" y1="' + (cy+18) + '" x2="40" y2="' + (cy+5) + '" stroke="#DAA520" stroke-width="1.5" opacity="0.5"/>' +
      '<line x1="' + (cx-32) + '" y1="' + (cy+20) + '" x2="30" y2="' + (cy+10) + '" stroke="#DAA520" stroke-width="1.5" opacity="0.5"/>' +
      // horses (simple)
      '<ellipse cx="35" cy="120" rx="20" ry="14" fill="#8D6E63" opacity="0.35"/>' +
      '<circle cx="20" cy="110" r="8" fill="#8D6E63" opacity="0.35"/>';
  }

  function vishvarupa(c) {
    var cx = 120, cy = 85;
    return '' +
      // cosmic rays
      '<line x1="' + cx + '" y1="0" x2="' + cx + '" y2="180" stroke="#FFD700" stroke-width="1" opacity="0.1"/>' +
      '<line x1="0" y1="' + cy + '" x2="240" y2="' + cy + '" stroke="#FFD700" stroke-width="1" opacity="0.1"/>' +
      '<line x1="20" y1="10" x2="220" y2="170" stroke="#9C27B0" stroke-width="1" opacity="0.08"/>' +
      '<line x1="220" y1="10" x2="20" y2="170" stroke="#9C27B0" stroke-width="1" opacity="0.08"/>' +
      // cosmic rings
      '<circle cx="' + cx + '" cy="' + cy + '" r="75" fill="none" stroke="#9C27B0" stroke-width="1" opacity="0.15"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="55" fill="none" stroke="#FFD700" stroke-width="1" opacity="0.12"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="35" fill="none" stroke="#FF9933" stroke-width="1.5" opacity="0.2"/>' +
      // multiple heads
      '<circle cx="' + (cx-20) + '" cy="' + (cy-40) + '" r="10" fill="#5C6BC0" opacity="0.4"/>' +
      '<circle cx="' + (cx+20) + '" cy="' + (cy-40) + '" r="10" fill="#5C6BC0" opacity="0.4"/>' +
      figHead(cx, cy-35, 16, '#5C6BC0') +
      '<circle cx="' + (cx-35) + '" cy="' + (cy-25) + '" r="8" fill="#5C6BC0" opacity="0.3"/>' +
      '<circle cx="' + (cx+35) + '" cy="' + (cy-25) + '" r="8" fill="#5C6BC0" opacity="0.3"/>' +
      // body with cosmic glow
      '<rect x="' + (cx-20) + '" y="' + (cy-15) + '" width="40" height="50" rx="8" fill="#FFD700" opacity="0.7"/>' +
      '<circle cx="' + cx + '" cy="' + (cy) + '" r="8" fill="#9C27B0" opacity="0.5"/>' +
      // many arms
      '<line x1="' + (cx-20) + '" y1="' + cy + '" x2="' + (cx-55) + '" y2="' + (cy-20) + '" stroke="#5C6BC0" stroke-width="4" stroke-linecap="round" opacity="0.6"/>' +
      '<line x1="' + (cx+20) + '" y1="' + cy + '" x2="' + (cx+55) + '" y2="' + (cy-20) + '" stroke="#5C6BC0" stroke-width="4" stroke-linecap="round" opacity="0.6"/>' +
      '<line x1="' + (cx-20) + '" y1="' + (cy+10) + '" x2="' + (cx-60) + '" y2="' + (cy+5) + '" stroke="#5C6BC0" stroke-width="3" stroke-linecap="round" opacity="0.4"/>' +
      '<line x1="' + (cx+20) + '" y1="' + (cy+10) + '" x2="' + (cx+60) + '" y2="' + (cy+5) + '" stroke="#5C6BC0" stroke-width="3" stroke-linecap="round" opacity="0.4"/>' +
      '<line x1="' + (cx-20) + '" y1="' + (cy+20) + '" x2="' + (cx-50) + '" y2="' + (cy+30) + '" stroke="#5C6BC0" stroke-width="3" stroke-linecap="round" opacity="0.3"/>' +
      '<line x1="' + (cx+20) + '" y1="' + (cy+20) + '" x2="' + (cx+50) + '" y2="' + (cy+30) + '" stroke="#5C6BC0" stroke-width="3" stroke-linecap="round" opacity="0.3"/>' +
      // stars
      '<circle cx="30" cy="25" r="2" fill="#FFF" opacity="0.3"/>' +
      '<circle cx="200" cy="40" r="1.5" fill="#FFF" opacity="0.25"/>' +
      '<circle cx="50" cy="150" r="2" fill="#FFF" opacity="0.2"/>' +
      '<circle cx="190" cy="130" r="1.5" fill="#FFF" opacity="0.2"/>';
  }

  function yogeshwara(c) {
    var cx = 120, cy = 80;
    return '' +
      // lotus seat
      lotusDecor(cx, cy+65, 25, '#FF9933') +
      // meditation glow
      '<circle cx="' + cx + '" cy="' + cy + '" r="60" fill="none" stroke="#FF9933" stroke-width="1" opacity="0.12"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="45" fill="none" stroke="#FFD700" stroke-width="1.5" opacity="0.15"/>' +
      // third eye glow
      '<circle cx="' + cx + '" cy="' + (cy-30) + '" r="3" fill="#E040FB" opacity="0.6"/>' +
      // seated Krishna
      figHead(cx, cy-20, 17, '#5C6BC0') +
      tilak(cx, cy-31, 5) +
      '<rect x="' + (cx-16) + '" y="' + (cy) + '" width="32" height="30" rx="6" fill="#FFD700"/>' +
      // crossed legs
      '<path d="M' + (cx-16) + ',' + (cy+30) + ' Q' + (cx-30) + ',' + (cy+50) + ' ' + (cx-10) + ',' + (cy+50) + '" fill="#5C6BC0" opacity="0.7"/>' +
      '<path d="M' + (cx+16) + ',' + (cy+30) + ' Q' + (cx+30) + ',' + (cy+50) + ' ' + (cx+10) + ',' + (cy+50) + '" fill="#5C6BC0" opacity="0.7"/>' +
      // hands in mudra (resting on knees)
      '<circle cx="' + (cx-22) + '" cy="' + (cy+45) + '" r="5" fill="#7986CB" opacity="0.7"/>' +
      '<circle cx="' + (cx+22) + '" cy="' + (cy+45) + '" r="5" fill="#7986CB" opacity="0.7"/>' +
      // aura lines
      '<path d="M' + (cx-50) + ',' + (cy-10) + ' Q' + (cx-40) + ',' + (cy-50) + ' ' + cx + ',' + (cy-55) + ' Q' + (cx+40) + ',' + (cy-50) + ' ' + (cx+50) + ',' + (cy-10) + '" fill="none" stroke="#FFD700" stroke-width="1" opacity="0.2"/>';
  }

  /* ---- Avatar & deity card motifs (compact, centered) ---- */

  function motifFish(c) {
    var cx = 120, cy = 88;
    return '' +
      '<ellipse cx="' + cx + '" cy="' + cy + '" rx="58" ry="30" fill="' + c + '" opacity="0.28" stroke="' + c + '" stroke-width="2"/>' +
      '<polygon points="' + (cx - 75) + ',' + cy + ' ' + (cx - 100) + ',' + (cy - 22) + ' ' + (cx - 100) + ',' + (cy + 22) + '" fill="' + c + '" opacity="0.45"/>' +
      '<circle cx="' + (cx + 35) + '" cy="' + (cy - 8) + '" r="6" fill="#1a0f0a" opacity="0.55"/>' +
      '<path d="M' + (cx - 20) + ',' + (cy + 12) + ' Q' + cx + ',' + (cy + 22) + ' ' + (cx + 40) + ',' + (cy + 8) + '" fill="none" stroke="' + c + '" stroke-width="1.5" opacity="0.4"/>' +
      lotusDecor(cx, cy + 72, 14, c);
  }

  function motifTurtle(c) {
    var cx = 120, cy = 85;
    return '' +
      '<ellipse cx="' + cx + '" cy="' + cy + '" rx="52" ry="38" fill="' + c + '" opacity="0.32" stroke="' + c + '" stroke-width="2"/>' +
      '<circle cx="' + (cx - 8) + '" cy="' + (cy - 10) + '" r="4" fill="' + c + '" opacity="0.5"/>' +
      '<circle cx="' + (cx + 18) + '" cy="' + (cy - 8) + '" r="4" fill="' + c + '" opacity="0.5"/>' +
      '<ellipse cx="' + (cx - 65) + '" cy="' + (cy + 25) + '" rx="12" ry="8" fill="' + c + '" opacity="0.35"/>' +
      '<ellipse cx="' + (cx + 65) + '" cy="' + (cy + 25) + '" rx="12" ry="8" fill="' + c + '" opacity="0.35"/>' +
      lotusDecor(cx, cy + 78, 14, c);
  }

  function motifBoar(c) {
    var cx = 120, cy = 82;
    return '' +
      '<ellipse cx="' + cx + '" cy="' + cy + '" rx="48" ry="32" fill="' + c + '" opacity="0.35" stroke="' + c + '" stroke-width="2"/>' +
      '<polygon points="' + (cx + 50) + ',' + (cy - 5) + ' ' + (cx + 95) + ',' + (cy - 18) + ' ' + (cx + 88) + ',' + (cy + 15) + '" fill="' + c + '" opacity="0.5"/>' +
      '<circle cx="' + (cx - 25) + '" cy="' + (cy - 8) + '" r="5" fill="#1a0f0a" opacity="0.5"/>' +
      lotusDecor(cx, cy + 75, 14, c);
  }

  function motifLion(c) {
    var cx = 120, cy = 78;
    return '' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="38" fill="' + c + '" opacity="0.25" stroke="' + c + '" stroke-width="2"/>' +
      '<circle cx="' + (cx - 18) + '" cy="' + (cy - 22) + '" r="14" fill="' + c + '" opacity="0.45"/>' +
      '<circle cx="' + (cx + 18) + '" cy="' + (cy - 22) + '" r="14" fill="' + c + '" opacity="0.45"/>' +
      figHead(cx, cy + 5, 15, '#5C6BC0') +
      '<rect x="' + (cx - 14) + '" y="' + (cy + 22) + '" width="28" height="36" rx="6" fill="#FFD700" opacity="0.85"/>' +
      lotusDecor(cx, cy + 90, 14, c);
  }

  function motifDwarf(c) {
    var cx = 120, cy = 72;
    return '' +
      figHead(cx, cy, 18, '#5C6BC0') +
      tilak(cx, cy - 12, 5) +
      '<rect x="' + (cx - 22) + '" y="' + (cy + 20) + '" width="44" height="28" rx="6" fill="' + c + '" opacity="0.65"/>' +
      '<rect x="' + (cx - 8) + '" y="' + (cy + 48) + '" width="16" height="20" rx="3" fill="#5C6BC0" opacity="0.7"/>' +
      '<path d="M' + (cx - 35) + ',' + (cy + 35) + ' L' + (cx - 60) + ',' + (cy + 25) + '" stroke="' + c + '" stroke-width="3" stroke-linecap="round" opacity="0.7"/>' +
      '<path d="M' + (cx + 35) + ',' + (cy + 35) + ' L' + (cx + 60) + ',' + (cy + 25) + '" stroke="' + c + '" stroke-width="3" stroke-linecap="round" opacity="0.7"/>' +
      lotusDecor(cx, cy + 92, 14, c);
  }

  function motifAxe(c) {
    var cx = 120, cy = 85;
    return '' +
      '<line x1="' + (cx + 40) + '" y1="' + (cy - 40) + '" x2="' + (cx - 50) + '" y2="' + (cy + 50) + '" stroke="#8D6E63" stroke-width="6" stroke-linecap="round"/>' +
      '<rect x="' + (cx - 75) + '" y="' + (cy - 15) + '" width="38" height="22" rx="4" fill="' + c + '" opacity="0.75" transform="rotate(-35 ' + cx + ' ' + cy + ')"/>' +
      figHead(cx, cy - 10, 15, '#5C6BC0') +
      '<rect x="' + (cx - 12) + '" y="' + (cy + 8) + '" width="24" height="40" rx="5" fill="#FFD700" opacity="0.8"/>' +
      lotusDecor(cx, cy + 82, 14, c);
  }

  function motifBow(c) {
    var cx = 120, cy = 80;
    return '' +
      '<path d="M' + (cx - 50) + ',' + (cy - 30) + ' Q' + cx + ',' + (cy + 45) + ' ' + (cx + 50) + ',' + (cy - 30) + '" fill="none" stroke="' + c + '" stroke-width="3" opacity="0.7"/>' +
      '<line x1="' + cx + '" y1="' + (cy - 28) + '" x2="' + (cx + 65) + '" y2="' + cy + '" stroke="#C62828" stroke-width="2" opacity="0.8"/>' +
      figHead(cx, cy - 35, 16, '#5C6BC0') +
      tilak(cx, cy - 47, 5) +
      '<rect x="' + (cx - 14) + '" y="' + (cy - 15) + '" width="28" height="45" rx="6" fill="#1565C0" opacity="0.85"/>' +
      lotusDecor(cx, cy + 88, 14, c);
  }

  function motifBuddha(c) {
    var cx = 120, cy = 75;
    return '' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="55" fill="none" stroke="' + c + '" stroke-width="1.5" opacity="0.2"/>' +
      '<circle cx="' + cx + '" cy="' + (cy - 25) + '" r="20" fill="#E8D4C4" opacity="0.9"/>' +
      '<ellipse cx="' + cx + '" cy="' + (cy + 35) + '" rx="36" ry="42" fill="' + c + '" opacity="0.35"/>' +
      '<circle cx="' + (cx - 8) + '" cy="' + (cy - 28) + '" r="2" fill="#1a0f0a" opacity="0.4"/>' +
      '<circle cx="' + (cx + 8) + '" cy="' + (cy - 28) + '" r="2" fill="#1a0f0a" opacity="0.4"/>' +
      '<path d="M' + (cx - 6) + ',' + (cy - 15) + '   Q' + cx + ',' + (cy - 8) + ' ' + (cx + 6) + ',' + (cy - 15) + '" fill="none" stroke="#1a0f0a" stroke-width="1" opacity="0.3"/>' +
      lotusDecor(cx, cy + 92, 14, c);
  }

  function motifKalki(c) {
    var cx = 118, cy = 78;
    return '' +
      '<ellipse cx="' + (cx + 35) + '" cy="' + (cy + 12) + '" rx="45" ry="22" fill="#ECEFF1" opacity="0.35" stroke="' + c + '" stroke-width="1.5"/>' +
      '<rect x="' + (cx - 50) + '" y="' + (cy - 5) + '" width="70" height="8" rx="2" fill="' + c + '" opacity="0.5" transform="rotate(-8 ' + cx + ' ' + cy + ')"/>' +
      figHead(cx - 35, cy - 15, 14, '#5C6BC0') +
      '<rect x="' + (cx - 50) + '" y="' + cy + '" width="22" height="35" rx="4" fill="' + c + '" opacity="0.7"/>' +
      '<line x1="' + (cx - 20) + '" y1="' + (cy + 25) + '" x2="' + (cx + 40) + '" y2="' + (cy + 50) + '" stroke="#B0BEC5" stroke-width="4" stroke-linecap="round" opacity="0.9"/>' +
      lotusDecor(cx + 10, cy + 88, 14, c);
  }

  function motifDiscus(c) {
    var cx = 120, cy = 82;
    return '' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="42" fill="none" stroke="' + c + '" stroke-width="3" opacity="0.6"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="28" fill="none" stroke="#FF9933" stroke-width="2" opacity="0.5"/>' +
      '<polygon points="' + cx + ',' + (cy - 8) + ' ' + (cx + 7) + ',' + (cy + 6) + ' ' + (cx - 7) + ',' + (cy + 6) + '" fill="#DAA520" opacity="0.8"/>' +
      figHead(cx, cy - 45, 13, '#5C6BC0') +
      '<rect x="' + (cx - 10) + '" y="' + (cy - 28) + '" width="20" height="28" rx="4" fill="#1A237E" opacity="0.85"/>' +
      lotusDecor(cx, cy + 88, 14, c);
  }

  function motifTrident(c) {
    var cx = 120, cy = 78;
    return '' +
      '<line x1="' + cx + '" y1="' + (cy - 55) + '" x2="' + cx + '" y2="' + (cy + 65) + '" stroke="' + c + '" stroke-width="4" stroke-linecap="round" opacity="0.85"/>' +
      '<line x1="' + (cx - 18) + '" y1="' + (cy - 50) + '" x2="' + (cx - 6) + '" y2="' + (cy - 58) + '" stroke="' + c + '" stroke-width="3" stroke-linecap="round"/>' +
      '<line x1="' + (cx + 18) + '" y1="' + (cy - 50) + '" x2="' + (cx + 6) + '" y2="' + (cy - 58) + '" stroke="' + c + '" stroke-width="3" stroke-linecap="round"/>' +
      '<circle cx="' + cx + '" cy="' + (cy + 70) + '" r="8" fill="' + c + '" opacity="0.5"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="22" fill="none" stroke="#C62828" stroke-width="2" opacity="0.4"/>' +
      lotusDecor(cx, cy + 92, 14, c);
  }

  function motifShakti(c) {
    var cx = 120, cy = 75;
    return '' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="45" fill="none" stroke="' + c + '" stroke-width="2" opacity="0.25"/>' +
      '<path d="M' + cx + ',' + (cy - 50) + ' L' + (cx + 35) + ',' + (cy + 40) + ' L' + (cx - 35) + ',' + (cy + 40) + ' Z" fill="' + c + '" opacity="0.4"/>' +
      '<circle cx="' + cx + '" cy="' + (cy - 18) + '" r="14" fill="#E8D4C4" opacity="0.85"/>' +
      '<circle cx="' + (cx - 30) + '" cy="' + (cy + 15) + '" r="16" fill="none" stroke="' + c + '" stroke-width="2" opacity="0.5"/>' +
      '<circle cx="' + (cx + 30) + '" cy="' + (cy + 15) + '" r="16" fill="none" stroke="' + c + '" stroke-width="2" opacity="0.5"/>' +
      lotusDecor(cx, cy + 88, 14, c);
  }

  function motifSwan(c) {
    var cx = 120, cy = 78;
    return '' +
      '<ellipse cx="' + (cx + 15) + '" cy="' + cy + '" rx="38" ry="24" fill="#ECEFF1" opacity="0.85" stroke="' + c + '" stroke-width="1.5"/>' +
      '<path d="M' + (cx + 48) + ',' + (cy - 8) + ' Q' + (cx + 70) + ',' + (cy + 5) + ' ' + (cx + 55) + ',' + (cy + 20) + '" fill="#ECEFF1" stroke="' + c + '" stroke-width="1"/>' +
      '<circle cx="' + (cx - 8) + '" cy="' + (cy - 18) + '" r="3" fill="#1a0f0a" opacity="0.5"/>' +
      '<ellipse cx="' + cx + '" cy="' + (cy + 40) + '" rx="8" ry="5" fill="#FF9800" opacity="0.7"/>' +
      lotusDecor(cx, cy + 82, 14, c);
  }

  function motifLotusGold(c) {
    var cx = 120, cy = 80;
    return '' +
      lotusDecor(cx, cy + 55, 28, c) +
      figHead(cx, cy - 25, 15, '#E8D4C4') +
      '<rect x="' + (cx - 18) + '" y="' + (cy - 5) + '" width="36" height="42" rx="8" fill="' + c + '" opacity="0.45"/>' +
      '<circle cx="' + (cx - 25) + '" cy="' + cy + '" r="10" fill="none" stroke="' + c + '" stroke-width="2" opacity="0.6"/>' +
      '<circle cx="' + (cx + 25) + '" cy="' + cy + '" r="10" fill="none" stroke="' + c + '" stroke-width="2" opacity="0.6"/>' +
      '<circle cx="' + cx + '" cy="' + (cy - 35) + '" r="6" fill="' + c + '" opacity="0.7"/>';
  }

  function motifVeena(c) {
    var cx = 120, cy = 80;
    return '' +
      '<rect x="' + (cx - 45) + '" y="' + (cy - 8) + '" width="90" height="22" rx="10" fill="#5D4037" opacity="0.75"/>' +
      '<circle cx="' + (cx - 25) + '" cy="' + cy + '" r="14" fill="#1a0f0a" opacity="0.5"/>' +
      '<line x1="' + (cx - 25) + '" y1="' + cy + '" x2="' + (cx + 35) + '" y2="' + (cy - 25) + '" stroke="#DAA520" stroke-width="2"/>' +
      figHead(cx + 15, cy - 45, 13, '#E8D4C4') +
      '<path d="M' + (cx - 5) + ',' + (cy - 28) + ' Q' + (cx + 20) + ',' + (cy - 55) + ' ' + (cx + 45) + ',' + (cy - 35) + '" fill="none" stroke="#E1F5FE" stroke-width="14" opacity="0.35"/>' +
      lotusDecor(cx - 30, cy + 82, 12, c);
  }

  function motifElephant(c) {
    var cx = 120, cy = 78;
    return '' +
      '<ellipse cx="' + cx + '" cy="' + cy + '" rx="40" ry="36" fill="' + c + '" opacity="0.55"/>' +
      '<ellipse cx="' + (cx + 38) + '" cy="' + (cy + 8) + '" rx="22" ry="18" fill="' + c + '" opacity="0.55"/>' +
      '<path d="M' + (cx + 58) + ',' + (cy + 5) + ' Q' + (cx + 72) + ',' + cy + ' ' + (cx + 65) + ',' + (cy + 22) + '" fill="none" stroke="' + c + '" stroke-width="6" stroke-linecap="round"/>' +
      '<circle cx="' + (cx + 32) + '" cy="' + (cy - 8) + '" r="4" fill="#1a0f0a" opacity="0.5"/>' +
      '<path d="M' + (cx - 35) + ',' + (cy + 28) + ' L' + (cx - 45) + ',' + (cy + 55) + ' M' + (cx + 25) + ',' + (cy + 32) + ' L' + (cx + 30) + ',' + (cy + 58) + '" stroke="' + c + '" stroke-width="5" stroke-linecap="round" opacity="0.7"/>' +
      lotusDecor(cx, cy + 90, 14, c);
  }

  function motifSpear(c) {
    var cx = 120, cy = 78;
    return '' +
      '<line x1="' + cx + '" y1="' + (cy - 50) + '" x2="' + cx + '" y2="' + (cy + 60) + '" stroke="' + c + '" stroke-width="3" stroke-linecap="round"/>' +
      '<polygon points="' + cx + ',' + (cy - 55) + ' ' + (cx - 10) + ',' + (cy - 38) + ' ' + (cx + 10) + ',' + (cy - 38) + '" fill="#ECEFF1" stroke="' + c + '" stroke-width="1"/>' +
      '<circle cx="' + (cx + 35) + '" cy="' + cy + '" r="24" fill="none" stroke="#00897B" stroke-width="2" opacity="0.5"/>' +
      '<circle cx="' + (cx + 35) + '" cy="' + (cy + 8) + '" r="6" fill="#00897B" opacity="0.7"/>' +
      lotusDecor(cx - 25, cy + 88, 12, c);
  }

  function motifMace(c) {
    var cx = 120, cy = 80;
    return '' +
      '<line x1="' + (cx - 35) + '" y1="' + (cy + 40) + '" x2="' + (cx + 55) + '" y2="' + (cy - 35) + '" stroke="#8D6E63" stroke-width="5" stroke-linecap="round"/>' +
      '<circle cx="' + (cx + 60) + '" cy="' + (cy - 40) + '" r="14" fill="#E65100" opacity="0.7"/>' +
      figHead(cx - 30, cy - 15, 13, '#5C6BC0') +
      '<rect x="' + (cx - 42) + '" y="' + cy + '" width="26" height="36" rx="5" fill="#E65100" opacity="0.55"/>' +
      lotusDecor(cx - 10, cy + 88, 14, c);
  }

  function motifSun(c) {
    var cx = 120, cy = 82;
    var rays = '';
    for (var i = 0; i < 12; i++) {
      var a = (i * 30 - 90) * Math.PI / 180;
      rays += '<line x1="' + (cx + 46 * Math.cos(a)) + '" y1="' + (cy + 46 * Math.sin(a)) + '" x2="' + (cx + 58 * Math.cos(a)) + '" y2="' + (cy + 58 * Math.sin(a)) + '" stroke="' + c + '" stroke-width="3" stroke-linecap="round" opacity="0.65"/>';
    }
    return rays +
      '<circle cx="' + cx + '" cy="' + cy + '" r="38" fill="#FDD835" opacity="0.55" stroke="' + c + '" stroke-width="2"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="22" fill="#FFF9C4" opacity="0.9"/>' +
      lotusDecor(cx, cy + 88, 12, c);
  }

  function genericKrishna(c) {
    var cx = 120, cy = 80;
    return '' +
      figHead(cx, cy-10, 16, '#5C6BC0') +
      tilak(cx, cy-20, 5) +
      peacockFeather(cx+10, cy-26, 6) +
      '<rect x="' + (cx-14) + '" y="' + (cy+8) + '" width="28" height="38" rx="6" fill="#FFD700"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="50" fill="none" stroke="' + c + '" stroke-width="1" opacity="0.15"/>' +
      lotusDecor(cx, cy+80, 16, c);
  }

  /* ================================================================
     Location Scene Art (for encyclopedia headers)
     ================================================================ */

  function locationArt(loc) {
    if (!loc) return '';
    var W2 = 600, H2 = 120;
    var svg = '<svg viewBox="0 0 ' + W2 + ' ' + H2 + '" xmlns="http://www.w3.org/2000/svg" class="enc-art-svg">';
    var phase = loc.phase;
    var phaseColor = phase === 'childhood' ? '#FF9933' : phase === 'youth' ? '#DAA520' : '#E8820A';

    svg += '<defs><linearGradient id="encGrad" x1="0" y1="0" x2="1" y2="0">' +
      '<stop offset="0%" stop-color="' + phaseColor + '" stop-opacity="0.15"/>' +
      '<stop offset="50%" stop-color="' + phaseColor + '" stop-opacity="0.05"/>' +
      '<stop offset="100%" stop-color="' + phaseColor + '" stop-opacity="0.15"/>' +
    '</linearGradient></defs>';
    svg += '<rect width="' + W2 + '" height="' + H2 + '" fill="url(#encGrad)"/>';
    svg += '<line x1="0" y1="' + (H2-1) + '" x2="' + W2 + '" y2="' + (H2-1) + '" stroke="' + phaseColor + '" stroke-width="1" opacity="0.3"/>';

    // decorative lotus at each end
    svg += lotusDecor(40, H2/2, 16, phaseColor);
    svg += lotusDecor(W2-40, H2/2, 16, phaseColor);

    // phase label
    var phaseLabel = phase === 'childhood' ? 'Childhood' : phase === 'youth' ? 'Youth' : 'King';
    svg += '<text x="' + (W2/2) + '" y="35" text-anchor="middle" fill="' + phaseColor + '" font-family="Yatra One,cursive" font-size="14" opacity="0.5">' + phaseLabel + ' Pastimes</text>';

    // small Krishna silhouette in center
    var cx2 = W2/2;
    svg += '<circle cx="' + cx2 + '" cy="72" r="12" fill="#5C6BC0" opacity="0.5"/>';
    svg += '<rect x="' + (cx2-8) + '" y="85" width="16" height="22" rx="4" fill="#FFD700" opacity="0.4"/>';

    // ornamental line
    svg += '<line x1="120" y1="60" x2="' + (cx2-30) + '" y2="60" stroke="' + phaseColor + '" stroke-width="0.5" opacity="0.3"/>';
    svg += '<line x1="' + (cx2+30) + '" y1="60" x2="' + (W2-120) + '" y2="60" stroke="' + phaseColor + '" stroke-width="0.5" opacity="0.3"/>';

    svg += '</svg>';
    return svg;
  }

  return {
    formArt: formArt,
    locationArt: locationArt
  };

})();
