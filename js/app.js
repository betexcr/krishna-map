/* ===================================================================
   Krishna Travels Map — Main Application
   =================================================================== */

var KrishnaApp = (function () {
  'use strict';

  var MAP_CENTER = [24.5, 79.0];
  var MAP_ZOOM = 5;
  var FLY_ZOOM = 9;
  var FLY_DURATION = 1.5;

  var map;
  var markers = [];
  var journeyLine = null;
  var journeyVisible = false;
  var currentEncLocationId = null;

  function escapeHtmlAttr(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ---------------------------------------------------------------
     Localized data helpers — overlay I18n content on top of JS data
     --------------------------------------------------------------- */

  function locLoc(loc) {
    var c = I18n.content();
    var over = c.locations && c.locations[loc.id];
    if (!over) return loc;
    return {
      id: loc.id, lat: loc.lat, lng: loc.lng, phase: loc.phase,
      xp: loc.xp, demonType: loc.demonType, battleScenes: loc.battleScenes,
      name: over.name || loc.name,
      subtitle: over.subtitle || loc.subtitle,
      demon: over.demon || loc.demon,
      demonSanskrit: over.demonSanskrit || loc.demonSanskrit,
      summary: over.summary || loc.summary,
      fullStory: over.fullStory || loc.fullStory,
      battleNarrations: over.battleNarrations || null
    };
  }

  function locForm(form, section) {
    var c = I18n.content();
    var map = c[section] && c[section][form.id];
    if (!map) return form;
    return {
      id: form.id, sanskrit: form.sanskrit, locationIds: form.locationIds,
      icon: form.icon, color: form.color,
      name: map.name || form.name,
      subtitle: map.subtitle || form.subtitle,
      description: map.description || form.description
    };
  }

  function locCaption(imageMap, id) {
    var c = I18n.content();
    var section;
    if (imageMap === LOCATION_IMAGES) section = 'locationImages';
    else if (imageMap === FORMS_IMAGES) section = 'formsImages';
    else if (imageMap === AVATARS_IMAGES) section = 'avatarsImages';
    else if (imageMap === DEITIES_IMAGES) section = 'deitiesImages';
    if (section && c[section] && c[section][id]) return c[section][id];
    return imageMap[id] ? imageMap[id].caption : '';
  }

  /* ---------------------------------------------------------------
     Image Lightbox
     --------------------------------------------------------------- */

  function openImageLightbox(src, caption) {
    var box = document.getElementById('imageLightbox');
    var imgEl = document.getElementById('imageLightboxImg');
    var capEl = document.getElementById('imageLightboxCaption');
    if (!box || !imgEl || !capEl) return;
    imgEl.src = src;
    imgEl.alt = caption || '';
    capEl.textContent = caption || '';
    box.classList.add('visible');
    box.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeImageLightbox() {
    var box = document.getElementById('imageLightbox');
    if (!box || !box.classList.contains('visible')) return;
    box.classList.remove('visible');
    box.setAttribute('aria-hidden', 'true');
    var imgEl = document.getElementById('imageLightboxImg');
    if (imgEl) {
      imgEl.removeAttribute('src');
      imgEl.alt = '';
    }
    var capEl = document.getElementById('imageLightboxCaption');
    if (capEl) capEl.textContent = '';
    var encOpen = document.getElementById('encyclopediaOverlay').classList.contains('visible');
    var battleOpen = document.getElementById('battleTheater').classList.contains('visible');
    if (!encOpen && !battleOpen) {
      document.body.style.overflow = '';
    }
  }

  function bindImageLightbox() {
    document.addEventListener('click', function (e) {
      var t = e.target;
      if (!t || t.tagName !== 'IMG') return;
      if (!t.classList.contains('js-lightbox-img')) return;
      var cap = t.getAttribute('data-caption') || t.getAttribute('alt') || '';
      var src = t.currentSrc || t.getAttribute('src') || '';
      if (!src) return;
      e.preventDefault();
      e.stopPropagation();
      openImageLightbox(src, cap);
    });

    var box = document.getElementById('imageLightbox');
    if (box) {
      box.addEventListener('click', function (e) {
        if (e.target === box) closeImageLightbox();
      });
    }
    var closeBtn = document.getElementById('imageLightboxClose');
    if (closeBtn) closeBtn.addEventListener('click', closeImageLightbox);
  }

  /* ---------------------------------------------------------------
     SVG Marker Icons
     --------------------------------------------------------------- */

  function createChakraIcon(phase, locked) {
    var colors = {
      childhood: { outer: '#FF9933', inner: '#DAA520' },
      youth:     { outer: '#DAA520', inner: '#FF9933' },
      king:      { outer: '#E8820A', inner: '#FFD700' }
    };
    var c = colors[phase] || colors.youth;

    var svg =
      '<div class="chakra-marker marker-' + phase + '">' +
        '<div class="marker-pulse"></div>' +
        '<svg width="32" height="32" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">' +
          '<defs>' +
            '<filter id="glow-' + phase + '" x="-50%" y="-50%" width="200%" height="200%">' +
              '<feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>' +
              '<feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>' +
            '</filter>' +
          '</defs>' +
          '<g filter="url(#glow-' + phase + ')">';

    svg += '<circle cx="32" cy="32" r="26" fill="none" stroke="' + c.outer + '" stroke-width="2.5" opacity="0.9"/>';
    svg += '<circle cx="32" cy="32" r="20" fill="none" stroke="' + c.outer + '" stroke-width="1.5" opacity="0.6"/>';

    for (var i = 0; i < 12; i++) {
      var a = (i * 30) * Math.PI / 180;
      svg += '<line x1="' + (32 + 20*Math.cos(a)) + '" y1="' + (32 + 20*Math.sin(a)) + '" x2="' + (32 + 26*Math.cos(a)) + '" y2="' + (32 + 26*Math.sin(a)) + '" stroke="' + c.outer + '" stroke-width="1.5" opacity="0.7"/>';
    }

    for (var j = 0; j < 12; j++) {
      var b = (j * 30 + 15) * Math.PI / 180;
      var tX = 32 + 30*Math.cos(b), tY = 32 + 30*Math.sin(b);
      var lA = b - 0.15, rA = b + 0.15;
      svg += '<polygon points="' + tX + ',' + tY + ' ' + (32+24*Math.cos(lA)) + ',' + (32+24*Math.sin(lA)) + ' ' + (32+24*Math.cos(rA)) + ',' + (32+24*Math.sin(rA)) + '" fill="' + c.outer + '" opacity="0.8"/>';
    }

    svg += '<circle cx="32" cy="32" r="8" fill="' + c.inner + '" opacity="0.9"/>';
    svg += '<circle cx="32" cy="32" r="4" fill="#FFF8E7" opacity="0.8"/>';
    svg += '</g></svg></div>';

    return L.divIcon({
      html: svg,
      className: 'chakra-div-icon' + (locked ? ' marker-locked' : ''),
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -22]
    });
  }

  /* ---------------------------------------------------------------
     Initialize Map
     --------------------------------------------------------------- */

  function initMap() {
    map = L.map('map', {
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      minZoom: 4,
      maxZoom: 14,
      zoomControl: true,
      scrollWheelZoom: true
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    addMarkers();
    bindPopupEvents();
    buildTimeline();
    bindEvents();
    BattleTheater.init();
    QuestMode.init();
    buildAllGalleries();
    updateHeaderQuestBtn();
  }

  /* ---------------------------------------------------------------
     Add Markers to Map
     --------------------------------------------------------------- */

  function addMarkers() {
    markers.forEach(function (m) { map.removeLayer(m); });
    markers = [];

    KRISHNA_LOCATIONS.forEach(function (rawLoc) {
      var loc = locLoc(rawLoc);
      var locked = !QuestMode.isUnlocked(loc.id);
      var icon = createChakraIcon(rawLoc.phase, locked);
      var marker = L.marker([rawLoc.lat, rawLoc.lng], { icon: icon }).addTo(map);

      if (!locked) {
        var imgTag = '';
        if (typeof LOCATION_IMAGES !== 'undefined' && LOCATION_IMAGES[loc.id]) {
          var lim = LOCATION_IMAGES[loc.id];
          var cap = locCaption(LOCATION_IMAGES, loc.id);
          imgTag = '<img class="popup-img js-lightbox-img" src="' + lim.url + '" alt="' + escapeHtmlAttr(loc.name) + '" data-caption="' + escapeHtmlAttr(cap) + '" loading="lazy" onerror="this.style.display=\'none\'">';
        }
        var popupContent =
          '<div class="popup-content">' +
            imgTag +
            '<div class="popup-location">' + loc.name + '</div>' +
            '<div class="popup-demon">' + loc.demon + '</div>' +
            '<p class="popup-summary">' + loc.summary + '</p>' +
            '<button class="popup-read-more" data-id="' + loc.id + '">' + I18n.t('readFullStory') + ' &#10140;</button>' +
          '</div>';
        marker.bindPopup(popupContent, {
          maxWidth: 360,
          minWidth: 260,
          closeButton: true,
          autoPanPaddingTopLeft: L.point(40, 200),
          autoPanPaddingBottomRight: L.point(40, 40)
        });
      }

      marker.locationId = rawLoc.id;
      marker._isLocked = locked;
      markers.push(marker);
    });
  }

  function bindPopupEvents() {
    map.on('popupopen', function (e) {
      var container = e.popup.getElement();
      if (!container) return;
      var btn = container.querySelector('.popup-read-more');
      if (btn) {
        btn.addEventListener('click', function () {
          var id = parseInt(this.getAttribute('data-id'), 10);
          openEncyclopedia(id);
          map.closePopup();
        });
      }
    });
  }

  /* ---------------------------------------------------------------
     Encyclopedia Overlay
     --------------------------------------------------------------- */

  function openEncyclopedia(locationId) {
    var rawLoc = KRISHNA_LOCATIONS.find(function (l) { return l.id === locationId; });
    if (!rawLoc) return;
    var loc = locLoc(rawLoc);
    currentEncLocationId = locationId;

    document.getElementById('encTitle').textContent = loc.name + ' \u2014 ' + loc.subtitle;
    document.getElementById('encDemon').innerHTML = loc.demonSanskrit + ' &mdash; ' + loc.demon;

    var artHTML = '';
    if (typeof LOCATION_IMAGES !== 'undefined' && LOCATION_IMAGES[locationId]) {
      var img = LOCATION_IMAGES[locationId];
      var cap = locCaption(LOCATION_IMAGES, locationId);
      artHTML = '<figure class="enc-painting">' +
        '<img class="js-lightbox-img" src="' + img.url + '" alt="' + escapeHtmlAttr(loc.name) + '" data-caption="' + escapeHtmlAttr(cap) + '" loading="lazy">' +
        '<figcaption>' + cap + '</figcaption>' +
        '</figure>';
    } else if (typeof KrishnaArt !== 'undefined') {
      artHTML = '<div class="enc-art">' + KrishnaArt.locationArt(rawLoc) + '</div>';
    }
    document.getElementById('encBody').innerHTML = artHTML + loc.fullStory;

    var overlay = document.getElementById('encyclopediaOverlay');
    var card = overlay.querySelector('.encyclopedia-card');
    if (card) card.scrollTop = 0;
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';

    if (QuestMode.isActive()) {
      QuestMode.markStoryRead(locationId);
    }
  }

  function closeEncyclopedia() {
    document.getElementById('encyclopediaOverlay').classList.remove('visible');
    currentEncLocationId = null;
    var lb = document.getElementById('imageLightbox');
    var battle = document.getElementById('battleTheater');
    if ((!lb || !lb.classList.contains('visible')) &&
        (!battle || !battle.classList.contains('visible'))) {
      document.body.style.overflow = '';
    }
  }

  /* ---------------------------------------------------------------
     Sidebar Timeline
     --------------------------------------------------------------- */

  function buildTimeline() {
    var list = document.getElementById('timelineList');
    list.innerHTML = '';

    KRISHNA_LOCATIONS.forEach(function (rawLoc, index) {
      var loc = locLoc(rawLoc);
      var li = document.createElement('li');
      var classes = 'timeline-item shimmer-hover';

      if (QuestMode.isActive()) {
        if (QuestMode.isCompleted(rawLoc.id)) {
          classes += ' quest-completed';
        } else if (!QuestMode.isUnlocked(rawLoc.id)) {
          classes += ' quest-locked';
        } else {
          var st = QuestMode.getState();
          if (st.currentId === rawLoc.id) {
            classes += ' quest-current';
          }
        }
      }

      li.className = classes;
      li.setAttribute('data-id', rawLoc.id);
      li.innerHTML =
        '<span class="timeline-item-number">' + String(index + 1).padStart(2, '0') + '</span>' +
        '<span class="timeline-item-name">' + loc.name + '</span>' +
        '<span class="timeline-item-demon">' + loc.demon + '</span>';

      li.addEventListener('click', function () {
        if (QuestMode.isActive() && !QuestMode.isUnlocked(rawLoc.id)) return;
        flyToLocation(rawLoc.id);
      });

      list.appendChild(li);
    });
  }

  function setActiveTimeline(locationId) {
    document.querySelectorAll('.timeline-item').forEach(function (el) {
      el.classList.remove('active');
    });
    var target = document.querySelector('.timeline-item[data-id="' + locationId + '"]');
    if (target) {
      target.classList.add('active');
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  /* ---------------------------------------------------------------
     Fly-to Animation
     --------------------------------------------------------------- */

  function flyToLocation(locationId) {
    var loc = KRISHNA_LOCATIONS.find(function (l) { return l.id === locationId; });
    if (!loc) return;

    map.flyTo([loc.lat, loc.lng], FLY_ZOOM, { duration: FLY_DURATION });
    setActiveTimeline(locationId);

    var marker = markers.find(function (m) { return m.locationId === locationId; });
    if (marker && !marker._isLocked) {
      setTimeout(function () { marker.openPopup(); }, FLY_DURATION * 1000 + 200);
    }
  }

  /* ---------------------------------------------------------------
     Animated Journey Path
     --------------------------------------------------------------- */

  function toggleJourneyPath() {
    var btn = document.getElementById('btnShowJourney');
    if (journeyVisible) {
      if (journeyLine) { map.removeLayer(journeyLine); journeyLine = null; }
      journeyVisible = false;
      btn.innerHTML = '<span class="btn-icon">&#10043;</span> ' + I18n.t('showJourneyPath');
      btn.classList.remove('active');
      return;
    }

    var coords = KRISHNA_LOCATIONS.map(function (loc) { return [loc.lat, loc.lng]; });
    journeyLine = L.polyline(coords, {
      color: '#DAA520', weight: 2.5, opacity: 0.8,
      lineCap: 'round', lineJoin: 'round', className: 'journey-polyline'
    }).addTo(map);

    map.fitBounds(journeyLine.getBounds(), { padding: [40, 40] });
    setTimeout(function () { animatePolyline(journeyLine); }, 100);
    journeyVisible = true;
    btn.innerHTML = '<span class="btn-icon">&#10043;</span> ' + I18n.t('hideJourneyPath');
    btn.classList.add('active');
  }

  function animatePolyline(polyline) {
    var el = polyline.getElement();
    if (!el) return;
    var pathEl = el.tagName === 'path' ? el : el.querySelector('path');
    if (!pathEl || !pathEl.getTotalLength) return;
    var length = pathEl.getTotalLength();
    pathEl.style.transition = 'none';
    pathEl.style.strokeDasharray = length + '';
    pathEl.style.strokeDashoffset = length + '';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        pathEl.style.transition = 'stroke-dashoffset 3.5s ease-in-out';
        pathEl.style.strokeDashoffset = '0';
      });
    });
  }

  /* ---------------------------------------------------------------
     Refresh markers and timeline (called by QuestMode)
     --------------------------------------------------------------- */

  function refreshMarkersAndTimeline() {
    addMarkers();
    buildTimeline();
    updateHeaderQuestBtn();
  }

  /* ---------------------------------------------------------------
     Sacred Galleries (Krishna forms, avatars, deities)
     --------------------------------------------------------------- */

  function buildCardGrid(gridEl, items, imagesMap, contentSection) {
    if (!gridEl) return;
    if (!items || !items.length) {
      gridEl.innerHTML = '';
      return;
    }
    gridEl.innerHTML = '';

    items.forEach(function (rawForm, idx) {
      var form = locForm(rawForm, contentSection);
      var card = document.createElement('div');
      card.className = 'form-card';
      card.style.animationDelay = (idx * 0.1) + 's';

      var artHTML = '';
      if (imagesMap && imagesMap[rawForm.id]) {
        var fi = imagesMap[rawForm.id];
        var cap = locCaption(imagesMap, rawForm.id);
        artHTML = '<div class="form-card-art"><img class="form-card-img js-lightbox-img" src="' + fi.url + '" alt="' + escapeHtmlAttr(form.name) + '" data-caption="' + escapeHtmlAttr(cap) + '" loading="lazy"></div>';
      } else if (typeof KrishnaArt !== 'undefined') {
        artHTML = '<div class="form-card-art">' + KrishnaArt.formArt(rawForm.icon, rawForm.color) + '</div>';
      }

      var hasLocations = rawForm.locationIds && rawForm.locationIds.length > 0;
      var linkHTML = '';
      if (hasLocations) {
        var rawLinkLoc = KRISHNA_LOCATIONS.find(function (l) { return l.id === rawForm.locationIds[0]; });
        if (rawLinkLoc) {
          var linkLoc = locLoc(rawLinkLoc);
          linkHTML = '<button type="button" class="form-card-link" data-loc-id="' + rawLinkLoc.id + '">' + I18n.t('goTo', { name: linkLoc.name }) + ' \u2192</button>';
        }
      }

      card.innerHTML =
        artHTML +
        '<div class="form-card-name">' + form.name + '</div>' +
        '<div class="form-card-sanskrit">' + form.sanskrit + '</div>' +
        '<div class="form-card-subtitle">' + form.subtitle + '</div>' +
        '<div class="form-card-desc">' + form.description + '</div>' +
        linkHTML;

      gridEl.appendChild(card);
    });
  }

  function buildAllGalleries() {
    buildCardGrid(
      document.getElementById('formsGridKrishna'),
      typeof KRISHNA_FORMS !== 'undefined' ? KRISHNA_FORMS : [],
      typeof FORMS_IMAGES !== 'undefined' ? FORMS_IMAGES : null,
      'krishnaForms'
    );
    buildCardGrid(
      document.getElementById('formsGridAvatars'),
      typeof DIVINE_AVATARS !== 'undefined' ? DIVINE_AVATARS : [],
      typeof AVATARS_IMAGES !== 'undefined' ? AVATARS_IMAGES : null,
      'avatars'
    );
    buildCardGrid(
      document.getElementById('formsGridDeities'),
      typeof HINDU_DEITIES !== 'undefined' ? HINDU_DEITIES : [],
      typeof DEITIES_IMAGES !== 'undefined' ? DEITIES_IMAGES : null,
      'deities'
    );
  }

  function switchGalleryTab(tabKey) {
    document.querySelectorAll('.gallery-tab').forEach(function (t) {
      var on = t.getAttribute('data-tab') === tabKey;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    document.querySelectorAll('.gallery-panel').forEach(function (p) {
      var on = p.getAttribute('data-tab') === tabKey;
      p.classList.toggle('is-active', on);
      p.setAttribute('aria-hidden', on ? 'false' : 'true');
    });
    var titleEl = document.getElementById('galleryMainTitle');
    var subEl = document.getElementById('galleryMainSubtitle');
    var activeBtn = document.querySelector('.gallery-tab[data-tab="' + tabKey + '"]');
    if (activeBtn && titleEl && subEl) {
      var titleKey = activeBtn.getAttribute('data-i18n-title');
      var subKey = activeBtn.getAttribute('data-i18n-subtitle');
      titleEl.textContent = titleKey ? I18n.t(titleKey) : (activeBtn.getAttribute('data-title') || '');
      subEl.textContent = subKey ? I18n.t(subKey) : (activeBtn.getAttribute('data-subtitle') || '');
    }
    document.querySelectorAll('.gallery-panel.is-active .form-card').forEach(function (c) {
      c.style.animation = 'none';
      void c.offsetWidth;
      c.style.animation = '';
    });
  }

  function bindGalleryNav() {
    var overlay = document.getElementById('formsGallery');
    if (!overlay || overlay.dataset.galleryNavBound === '1') return;
    overlay.dataset.galleryNavBound = '1';
    overlay.addEventListener('click', function (e) {
      var btn = e.target.closest('.form-card-link');
      if (!btn) return;
      e.preventDefault();
      var locId = parseInt(btn.getAttribute('data-loc-id'), 10);
      if (isNaN(locId)) return;
      closeFormsGallery();
      setTimeout(function () { flyToLocation(locId); }, 300);
    });
    document.querySelectorAll('.gallery-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        switchGalleryTab(tab.getAttribute('data-tab'));
      });
    });
  }

  function openFormsGallery() {
    switchGalleryTab('krishna');
    document.getElementById('formsGallery').classList.add('visible');
  }

  function closeFormsGallery() {
    document.getElementById('formsGallery').classList.remove('visible');
  }

  /* ---------------------------------------------------------------
     Language Switcher
     --------------------------------------------------------------- */

  function bindLangSwitcher() {
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = btn.getAttribute('data-lang');
        if (lang) I18n.setLocale(lang);
      });
    });

    I18n.onLocaleChange(function () {
      refreshMarkersAndTimeline();
      buildAllGalleries();
      var activeTab = document.querySelector('.gallery-tab.is-active');
      if (activeTab) switchGalleryTab(activeTab.getAttribute('data-tab'));
      updateJourneyBtnLabel();
    });
  }

  function updateJourneyBtnLabel() {
    var btn = document.getElementById('btnShowJourney');
    if (!btn) return;
    var label = journeyVisible ? I18n.t('hideJourneyPath') : I18n.t('showJourneyPath');
    btn.innerHTML = '<span class="btn-icon">&#10043;</span> ' + label;
  }

  /* ---------------------------------------------------------------
     Event Bindings
     --------------------------------------------------------------- */

  function bindEvents() {
    document.getElementById('encyclopediaClose').addEventListener('click', closeEncyclopedia);
    document.getElementById('encyclopediaOverlay').addEventListener('click', function (e) {
      if (e.target === this) closeEncyclopedia();
    });

    document.getElementById('btnWatchBattle').addEventListener('click', function () {
      if (currentEncLocationId) {
        var battleLocId = currentEncLocationId;
        closeEncyclopedia();
        setTimeout(function () { BattleTheater.open(battleLocId); }, 300);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var lb = document.getElementById('imageLightbox');
      if (lb && lb.classList.contains('visible')) {
        closeImageLightbox();
        return;
      }
      closeEncyclopedia();
      BattleTheater.close();
      closeFormsGallery();
    });

    document.getElementById('btnShowJourney').addEventListener('click', toggleJourneyPath);

    var sidebarToggle = document.getElementById('sidebarToggle');
    var sidebar = document.getElementById('sidebar');
    sidebarToggle.addEventListener('click', function () { sidebar.classList.toggle('collapsed'); });
    if (window.innerWidth <= 900) { sidebar.classList.add('collapsed'); }

    var mobileMenuToggle = document.getElementById('mobileMenuToggle');
    var headerActions = document.getElementById('headerActions');
    if (mobileMenuToggle && headerActions) {
      mobileMenuToggle.addEventListener('click', function () {
        headerActions.classList.toggle('is-open');
        var isOpen = headerActions.classList.contains('is-open');
        mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        mobileMenuToggle.querySelector('.mobile-menu-icon').innerHTML = isOpen ? '&#10005;' : '&#9776;';
      });
      headerActions.addEventListener('click', function (e) {
        if (e.target.closest('.lang-btn') || e.target.closest('.header-btn')) {
          headerActions.classList.remove('is-open');
          mobileMenuToggle.setAttribute('aria-label', 'Open menu');
          mobileMenuToggle.querySelector('.mobile-menu-icon').innerHTML = '&#9776;';
        }
      });
    }

    document.getElementById('btnOpenForms').addEventListener('click', openFormsGallery);
    document.getElementById('formsClose').addEventListener('click', closeFormsGallery);
    document.getElementById('formsGallery').addEventListener('click', function (e) {
      if (e.target === this) closeFormsGallery();
    });

    bindImageLightbox();
    bindGalleryNav();
    bindLangSwitcher();

    var headerQuest = document.getElementById('btnHeaderQuest');
    if (headerQuest) {
      headerQuest.addEventListener('click', function () {
        if (QuestMode.isActive()) {
          QuestMode.exitQuest();
        } else {
          QuestMode.beginQuest();
          var sb = document.getElementById('sidebar');
          if (sb && sb.classList.contains('collapsed')) sb.classList.remove('collapsed');
        }
        updateHeaderQuestBtn();
      });
    }
  }

  function updateHeaderQuestBtn() {
    var btn = document.getElementById('btnHeaderQuest');
    if (!btn) return;
    btn.textContent = QuestMode.isActive() ? I18n.t('exitQuest') : I18n.t('questMode');
  }

  /* ---------------------------------------------------------------
     Boot
     --------------------------------------------------------------- */

  function boot() {
    I18n.init(function () {
      document.documentElement.setAttribute('lang', I18n.locale());
      document.querySelectorAll('.lang-btn').forEach(function (btn) {
        btn.classList.toggle('is-active', btn.getAttribute('data-lang') === I18n.locale());
      });
      initMap();
      updateJourneyBtnLabel();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  return {
    flyToLocation: flyToLocation,
    refreshMarkersAndTimeline: refreshMarkersAndTimeline
  };

})();
