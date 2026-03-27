/**
 * Quest Mode — Gamified progression through Krishna's journey
 */

var QuestMode = (function () {
  'use strict';

  var STORAGE_KEY = 'krishna_quest';
  var active = false;
  var state = null;

  var defaults = {
    unlocked: [1],
    completed: [],
    storyRead: [],
    battleWatched: [],
    xp: 0,
    currentId: 1
  };

  function init() {
    bindUI();
    loadState();
    renderQuestUI();
  }

  function loadState() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        state = JSON.parse(saved);
        if (state.active) {
          active = true;
        }
      }
    } catch (e) { /* ignore */ }
    if (!state) {
      state = JSON.parse(JSON.stringify(defaults));
    }
  }

  function saveState() {
    state.active = active;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* ignore */ }
  }

  function isActive() { return active; }
  function getState() { return state; }

  function isUnlocked(id) {
    return !active || state.unlocked.indexOf(id) !== -1;
  }

  function isCompleted(id) {
    return state.completed.indexOf(id) !== -1;
  }

  function beginQuest() {
    active = true;
    state = JSON.parse(JSON.stringify(defaults));
    saveState();
    renderQuestUI();
    updateMapAndTimeline();

    if (typeof KrishnaApp !== 'undefined') {
      KrishnaApp.flyToLocation(1);
    }
  }

  function exitQuest() {
    active = false;
    saveState();
    renderQuestUI();
    updateMapAndTimeline();
  }

  function resetQuest() {
    active = false;
    state = JSON.parse(JSON.stringify(defaults));
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    renderQuestUI();
    updateMapAndTimeline();
  }

  function markStoryRead(locationId) {
    if (!active) return;
    if (state.storyRead.indexOf(locationId) === -1) {
      state.storyRead.push(locationId);
      saveState();
      checkCompletion(locationId);
    }
  }

  function markBattleWatched(locationId) {
    if (!active) return;
    if (state.battleWatched.indexOf(locationId) === -1) {
      state.battleWatched.push(locationId);
      saveState();
      checkCompletion(locationId);
    }
  }

  function checkCompletion(locationId) {
    if (state.storyRead.indexOf(locationId) !== -1 &&
        state.battleWatched.indexOf(locationId) !== -1 &&
        state.completed.indexOf(locationId) === -1) {
      completeLocation(locationId);
    }
  }

  function completeLocation(locationId) {
    state.completed.push(locationId);
    var loc = KRISHNA_LOCATIONS.find(function (l) { return l.id === locationId; });
    if (loc) {
      state.xp += (loc.xp || 100);
    }

    var idx = KRISHNA_LOCATIONS.findIndex(function (l) { return l.id === locationId; });
    if (idx < KRISHNA_LOCATIONS.length - 1) {
      var nextId = KRISHNA_LOCATIONS[idx + 1].id;
      if (state.unlocked.indexOf(nextId) === -1) {
        state.unlocked.push(nextId);
        state.currentId = nextId;
      }
    }

    saveState();
    renderQuestUI();
    updateMapAndTimeline();
    showUnlockAnimation(locationId);

    if (state.completed.length >= KRISHNA_LOCATIONS.length) {
      setTimeout(showVictoryScreen, 1500);
    }
  }

  /* ---- UI ---- */

  function bindUI() {
    var beginBtn = document.getElementById('btnBeginQuest');
    var exitBtn = document.getElementById('btnExitQuest');
    if (beginBtn) beginBtn.addEventListener('click', beginQuest);
    if (exitBtn) exitBtn.addEventListener('click', exitQuest);

    var victoryClose = document.getElementById('victoryClose');
    var victoryContinue = document.getElementById('victoryContinue');
    if (victoryClose) victoryClose.addEventListener('click', closeVictory);
    if (victoryContinue) victoryContinue.addEventListener('click', function () {
      closeVictory();
      exitQuest();
    });
  }

  function renderQuestUI() {
    var questPanel = document.getElementById('questPanel');
    var freePanel = document.getElementById('freePanel');
    var beginBtn = document.getElementById('btnBeginQuest');
    var exitBtn = document.getElementById('btnExitQuest');

    if (active) {
      if (questPanel) questPanel.style.display = 'block';
      if (freePanel) freePanel.style.display = 'none';
      if (beginBtn) beginBtn.style.display = 'none';
      if (exitBtn) exitBtn.style.display = 'block';
    } else {
      if (questPanel) questPanel.style.display = 'none';
      if (freePanel) freePanel.style.display = 'block';
      if (beginBtn) beginBtn.style.display = 'block';
      if (exitBtn) exitBtn.style.display = 'none';
    }

    updateXPBar();
    updateDemonCounter();
  }

  function updateXPBar() {
    var bar = document.getElementById('questXPFill');
    var label = document.getElementById('questXPLabel');
    if (!bar || !label) return;
    var maxXP = 0;
    KRISHNA_LOCATIONS.forEach(function (l) { maxXP += (l.xp || 100); });
    var pct = maxXP > 0 ? Math.min((state.xp / maxXP) * 100, 100) : 0;
    bar.style.width = pct + '%';
    label.textContent = I18n.t('xpLabel', { xp: state.xp, max: maxXP });
  }

  function updateDemonCounter() {
    var counter = document.getElementById('questDemonCount');
    if (!counter) return;
    counter.textContent = I18n.t('demonsVanquished', { n: state.completed.length, total: KRISHNA_LOCATIONS.length });
  }

  function updateMapAndTimeline() {
    if (typeof KrishnaApp !== 'undefined') {
      KrishnaApp.refreshMarkersAndTimeline();
    }
  }

  function showUnlockAnimation(completedId) {
    var item = document.querySelector('.timeline-item[data-id="' + completedId + '"]');
    if (item) {
      item.classList.add('quest-complete-flash');
      setTimeout(function () { item.classList.remove('quest-complete-flash'); }, 1500);
    }
  }

  function showVictoryScreen() {
    var v = document.getElementById('victoryOverlay');
    if (v) {
      document.getElementById('victoryXP').textContent = I18n.t('xpEarned', { xp: state.xp });
      v.classList.add('visible');
    }
  }

  function closeVictory() {
    var v = document.getElementById('victoryOverlay');
    if (v) v.classList.remove('visible');
  }

  return {
    init: init,
    isActive: isActive,
    getState: getState,
    isUnlocked: isUnlocked,
    isCompleted: isCompleted,
    beginQuest: beginQuest,
    exitQuest: exitQuest,
    resetQuest: resetQuest,
    markStoryRead: markStoryRead,
    markBattleWatched: markBattleWatched
  };
})();
