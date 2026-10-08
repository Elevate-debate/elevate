/**
 * ====================================================================
 * ETC DEBATE - LIVE VISUAL CUSTOMIZER (js/customizer.js)
 * ====================================================================
 * Allows non-technical organization members to visually test colors,
 * organization names, slogans, and banners in real-time, and export
 * an updated js/config.js with one click.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Only inject if explicitly requested via ?admin=true or ?customize=true for internal dev
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('admin') === 'true' || urlParams.get('customize') === 'true') {
    injectCustomizerDrawer();
  }
});

const PRESET_THEMES = [
  { name: 'Dark Navy & Varsity Red (Brand)', primary: '#0a1128', primaryHover: '#152248', accent: '#b91c1c', accentHover: '#991b1b' },
  { name: 'Crimson & Slate', primary: '#991b1b', primaryHover: '#7f1d1d', accent: '#0a1128', accentHover: '#152248' },
  { name: 'Debate Navy & Amber', primary: '#1e3a8a', primaryHover: '#172554', accent: '#d97706', accentHover: '#b45309' },
  { name: 'Midnight Charcoal & Crimson', primary: '#0f172a', primaryHover: '#1e293b', accent: '#dc2626', accentHover: '#b91c1c' }
];

function injectCustomizerDrawer() {
  const customizerHtml = `
    <!-- Floating Trigger Button -->
    <button id="customizer-trigger" class="customizer-toggle-btn" aria-label="Open Visual Customizer">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
      <span>Customize Site</span>
    </button>

    <!-- Overlay -->
    <div id="customizer-overlay" class="customizer-overlay"></div>

    <!-- Drawer Panel -->
    <aside id="customizer-drawer" class="customizer-drawer" aria-labelledby="customizer-heading">
      <div class="customizer-header">
        <div>
          <h3 id="customizer-heading" style="font-size: 1.1rem; margin-bottom: 0.2rem;">Visual Customizer</h3>
          <p style="font-size: 0.78rem; color: var(--text-muted);">Adjust colors and text live in your browser</p>
        </div>
        <button id="customizer-close" class="btn btn-secondary btn-sm" aria-label="Close Customizer" style="padding: 0.35rem 0.6rem;">✕</button>
      </div>

      <div class="customizer-body">
        <!-- 1. Color Palettes -->
        <div class="customizer-group">
          <label class="form-label">Color Presets</label>
          <div class="color-swatches" id="theme-presets-container"></div>
        </div>

        <!-- 2. Custom Color Pickers -->
        <div class="customizer-group">
          <label class="form-label">Custom Theme Colors</label>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
            <div>
              <span style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Primary Color</span>
              <input type="color" id="custom-primary-color" style="width: 100%; height: 38px; border: 1px solid var(--surface-border); border-radius: 6px; cursor: pointer;">
            </div>
            <div>
              <span style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Accent Color</span>
              <input type="color" id="custom-accent-color" style="width: 100%; height: 38px; border: 1px solid var(--surface-border); border-radius: 6px; cursor: pointer;">
            </div>
          </div>
        </div>

        <hr style="border: 0; border-top: 1px solid var(--surface-border);">

        <!-- 3. Text & Branding Customization -->
        <div class="customizer-group">
          <label class="form-label" for="custom-org-name">Organization Name</label>
          <input type="text" id="custom-org-name" class="form-input" placeholder="e.g. Elevate the Circuit">
        </div>

        <div class="customizer-group">
          <label class="form-label" for="custom-org-short">Short Name / Initials</label>
          <input type="text" id="custom-org-short" class="form-input" placeholder="e.g. Elevate the Circuit">
        </div>

        <div class="customizer-group">
          <label class="form-label" for="custom-tagline">Tagline / Mission Pitch</label>
          <textarea id="custom-tagline" class="form-textarea" style="min-height: 80px;" placeholder="Empowering youth through speech and debate..."></textarea>
        </div>

        <div class="customizer-group">
          <label class="form-label" for="custom-email">Public Email</label>
          <input type="email" id="custom-email" class="form-input" placeholder="elevatethecircuitusa@gmail.com">
        </div>

        <!-- 4. Announcement Toggle -->
        <div class="customizer-group">
          <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; font-weight: 600; cursor: pointer;">
            <input type="checkbox" id="custom-announcement-toggle" style="width: 16px; height: 16px;">
            <span>Show Top Announcement Bar</span>
          </label>
        </div>
      </div>

      <div class="customizer-footer">
        <button id="customizer-export-btn" class="btn btn-primary btn-sm" style="flex: 1;">
          Copy Config Code
        </button>
        <button id="customizer-reset-btn" class="btn btn-secondary btn-sm">
          Reset
        </button>
      </div>
    </aside>
  `;

  document.body.insertAdjacentHTML('beforeend', customizerHtml);
  attachCustomizerEvents();
}

function attachCustomizerEvents() {
  const trigger = document.getElementById('customizer-trigger');
  const drawer = document.getElementById('customizer-drawer');
  const overlay = document.getElementById('customizer-overlay');
  const closeBtn = document.getElementById('customizer-close');

  const primaryPicker = document.getElementById('custom-primary-color');
  const accentPicker = document.getElementById('custom-accent-color');
  const orgNameInput = document.getElementById('custom-org-name');
  const orgShortInput = document.getElementById('custom-org-short');
  const taglineInput = document.getElementById('custom-tagline');
  const emailInput = document.getElementById('custom-email');
  const annToggle = document.getElementById('custom-announcement-toggle');

  const exportBtn = document.getElementById('customizer-export-btn');
  const resetBtn = document.getElementById('customizer-reset-btn');
  const presetsContainer = document.getElementById('theme-presets-container');

  const config = window.SITE_CONFIG || {};

  // Populate initial values
  if (config.org) {
    orgNameInput.value = config.org.name || '';
    orgShortInput.value = config.org.shortName || '';
    taglineInput.value = config.org.tagline || '';
    emailInput.value = config.org.contactEmail || '';
  }

  if (config.announcement) {
    annToggle.checked = config.announcement.show;
  }

  // Render Preset Swatches
  presetsContainer.innerHTML = PRESET_THEMES.map((theme, i) => `
    <button class="swatch-btn ${i === 0 ? 'active' : ''}" 
            title="${theme.name}" 
            style="background: linear-gradient(135deg, ${theme.primary} 50%, ${theme.accent} 50%);"
            data-index="${i}">
    </button>
  `).join('');

  presetsContainer.querySelectorAll('.swatch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      presetsContainer.querySelectorAll('.swatch-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const idx = parseInt(btn.dataset.index, 10);
      applyTheme(PRESET_THEMES[idx]);
    });
  });

  // Open / Close Drawer
  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('active');
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
  }

  trigger.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  // Live Color Pickers
  primaryPicker.value = config.theme?.primaryColor || '#1e3a8a';
  accentPicker.value = config.theme?.accentColor || '#d97706';

  primaryPicker.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--primary', e.target.value);
    document.documentElement.style.setProperty('--primary-hover', e.target.value);
    saveCustomTheme();
  });

  accentPicker.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--accent', e.target.value);
    document.documentElement.style.setProperty('--accent-hover', e.target.value);
    saveCustomTheme();
  });

  // Live Text Inputs
  orgNameInput.addEventListener('input', (e) => {
    const val = e.target.value.trim() || 'Elevate the Circuit';
    document.querySelectorAll('[data-bind="org-name"]').forEach(el => el.textContent = val);
    config.org.name = val;
  });

  orgShortInput.addEventListener('input', (e) => {
    const val = e.target.value.trim() || 'Elevate the Circuit';
    document.querySelectorAll('[data-bind="org-short"]').forEach(el => el.textContent = val);
    config.org.shortName = val;
  });

  taglineInput.addEventListener('input', (e) => {
    const val = e.target.value.trim() || config.org.tagline;
    document.querySelectorAll('[data-bind="org-tagline"]').forEach(el => el.textContent = val);
    config.org.tagline = val;
  });

  emailInput.addEventListener('input', (e) => {
    const val = e.target.value.trim() || config.org.contactEmail;
    document.querySelectorAll('[data-bind="org-email"]').forEach(el => {
      el.textContent = val;
      if (el.tagName === 'A') el.href = `mailto:${val}`;
    });
    config.org.contactEmail = val;
  });

  annToggle.addEventListener('change', (e) => {
    const annEl = document.getElementById('announcement-banner');
    if (annEl) {
      annEl.style.display = e.target.checked ? 'flex' : 'none';
    }
    if (config.announcement) config.announcement.show = e.target.checked;
  });

  function applyTheme(theme) {
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--primary-hover', theme.primaryHover);
    document.documentElement.style.setProperty('--accent', theme.accent);
    document.documentElement.style.setProperty('--accent-hover', theme.accentHover);

    primaryPicker.value = theme.primary;
    accentPicker.value = theme.accent;

    if (config.theme) {
      config.theme.primaryColor = theme.primary;
      config.theme.primaryHover = theme.primaryHover;
      config.theme.accentColor = theme.accent;
      config.theme.accentHover = theme.accentHover;
    }
    saveCustomTheme();
  }

  function saveCustomTheme() {
    const customTheme = {
      primaryColor: document.documentElement.style.getPropertyValue('--primary'),
      primaryHover: document.documentElement.style.getPropertyValue('--primary-hover'),
      accentColor: document.documentElement.style.getPropertyValue('--accent'),
      accentHover: document.documentElement.style.getPropertyValue('--accent-hover')
    };
    localStorage.setItem('etc_custom_theme', JSON.stringify(customTheme));
  }

  // Export updated config
  exportBtn.addEventListener('click', () => {
    const generatedJs = `// Generated via Live Customizer\nwindow.SITE_CONFIG = ` + JSON.stringify(window.SITE_CONFIG, null, 2) + `;\n`;
    navigator.clipboard.writeText(generatedJs).then(() => {
      window.showToast("✓ Config copied to clipboard! You can paste this right into js/config.js.");
    }).catch(() => {
      window.showToast("Configuration ready in console.");
      console.log(generatedJs);
    });
  });

  // Reset to default
  resetBtn.addEventListener('click', () => {
    localStorage.removeItem('etc_custom_theme');
    window.location.reload();
  });
}
