// ============================================================
//  js/auth.js  –  Wonder Games Authentication (PocketBase)
//  Wrapped in IIFE so local `const pb` doesn't pollute the
//  global scope and clash with script.js's var pb.
// ============================================================

(function () {
  'use strict';

  const PB_URL = 'https://db.wonderdev.nl/';
  const DEVICE_KEY_STORAGE = 'wonder-games-device-key';

  // ── PocketBase instance (local, also set on window) ────────
  const pb = new PocketBase(PB_URL);
  window.pb = pb;

  // ── Device fingerprint ────────────────────────────────────
  function markKnownDevice() {
    // No-op now that OTP is removed
  }

  // ── Auth state helpers ────────────────────────────────────
  function isUserLoggedIn() {
    return pb.authStore.isValid;
  }

  function getCurrentUser() {
    return pb.authStore.model || null;
  }

  function getDisplayName() {
    const model = pb.authStore.model;
    if (!model) return 'Gast';
    return model.username || model.name || model.email?.split('@')[0] || 'Gast';
  }

  function logoutUser() {
    pb.authStore.clear();
    window.location.href = 'index.html';
  }

  // Sync display name on auth state change
  pb.authStore.onChange((_token, model) => {
    if (model) {
      localStorage.setItem('displayName', getDisplayName());
    } else {
      localStorage.removeItem('displayName');
    }
  }, true);

  // ── Core login (password-first, then OTP if new device) ───
  /**
   * Returns: { ok: true, record } | { otp: true, otpId, email } | { error: string }
   */
  async function attemptLogin(email, password) {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      if (!authData.record.verified) {
        pb.authStore.clear();
        return { error: 'Verifieer eerst je e-mailadres.' };
      }
      return { ok: true, record: authData.record };
    } catch (err) {
      console.error('attemptLogin error:', err);
      return { error: 'Ongeldig e-mailadres of wachtwoord.' };
    }
  }

  // OTP functionality removed

  // ── Expose to global scope ────────────────────────────────
  window.isUserLoggedIn = isUserLoggedIn;
  window.getCurrentUser = getCurrentUser;
  window.getDisplayName = getDisplayName;
  window.logoutUser = logoutUser;
  window.attemptLogin = attemptLogin;
  window.markKnownDevice = markKnownDevice;
  window.markKnownDevice = markKnownDevice;

})();
