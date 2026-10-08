/**
 * ====================================================================
 * ELEVATE THE CIRCUIT - CORE CLIENT & FORENSICS SUITE (js/main.js)
 * ====================================================================
 * Manages Google/GitHub SSO sessions and national chapter records,
 * renders high-density Chapter Registry (Dossier & Table views),
 * and handles chapter applications & real-time analytics.
 */

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize Site Theme & Common Navigation / Brand Elements
  initSiteTheme();
  renderCommonElements();

  // 2. Initialize Backend & SSO Listeners
  setupBackendAndAuth();

  // 3. Page-Specific Initializations
  const page = detectCurrentPage();
  if (page === 'index' || page === '') {
    renderHomePage();
  } else if (page === 'chapter-tracker') {
    renderChapterTrackerPage();
  } else if (page === 'resources') {
    renderResourcesPage();
  } else if (page === 'get-involved') {
    renderGetInvolvedPage();
  } else if (page === 'contact') {
    renderContactPage();
  }

  // 4. Global Interactivity Handlers
  setupMobileNav();
  setupFormSubmissions();
  setupScrollReveal();
  setupKeyboardShortcuts();
});

/**
 * Detect current page from URL
 */
function detectCurrentPage() {
  const path = window.location.pathname;
  if (path.includes('chapter-tracker')) return 'chapter-tracker';
  if (path.includes('resources')) return 'resources';
  if (path.includes('get-involved')) return 'get-involved';
  if (path.includes('contact')) return 'contact';
  return 'index';
}

/**
 * Clean SVG Icons Helper
 */
const ICONS = {
  brain: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z"/></svg>`,
  mic: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>`,
  books: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>`,
  users: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  trophy: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
  network: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>`,
  school: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m4 6 8-4 8 4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/><path d="M18 5v17"/><path d="M6 5v17"/></svg>`,
  mapPin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  check: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
  download: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  default: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`
};

function getIcon(name) {
  return ICONS[name] || ICONS.default;
}

/**
 * Initialize theme colors
 */
function initSiteTheme() {
  const config = window.SITE_CONFIG;
  if (!config) return;

  const root = document.documentElement;
  const theme = config.theme || {};
  if (theme.primaryColor) {
    root.style.setProperty('--primary', theme.primaryColor);
    root.style.setProperty('--primary-hover', theme.primaryHover || theme.primaryColor);
  }
  if (theme.accentColor) {
    root.style.setProperty('--accent', theme.accentColor);
    root.style.setProperty('--accent-hover', theme.accentHover || theme.accentColor);
  }
}

/**
 * Render common elements (Announcement, Brand texts, Navigation, Footer, Modals)
 */
function renderCommonElements() {
  const config = window.SITE_CONFIG;
  if (!config) return;

  // 1. Top Announcement
  const annEl = document.getElementById('announcement-banner');
  if (annEl && config.announcement) {
    if (config.announcement.show) {
      annEl.innerHTML = `
        <div class="announcement-content">
          <span class="badge" style="background: var(--accent); color: #fff; font-family: var(--font-mono); font-size: 0.72rem;">${config.announcement.badge}</span>
          <span>${config.announcement.text}</span>
          <a href="${config.announcement.buttonLink}" class="announcement-link" style="color: var(--accent-light); font-weight: 700;">${config.announcement.buttonText} &rarr;</a>
        </div>
      `;
      annEl.style.display = 'flex';
    } else {
      annEl.style.display = 'none';
    }
  }

  // 2. Brand elements
  document.querySelectorAll('[data-bind="org-name"]').forEach(el => el.textContent = config.org.name);
  document.querySelectorAll('[data-bind="org-short"]').forEach(el => el.textContent = config.org.shortName);
  document.querySelectorAll('[data-bind="org-tagline"]').forEach(el => el.textContent = config.org.tagline);
  document.querySelectorAll('[data-bind="org-mission"]').forEach(el => el.textContent = config.org.mission);
  document.querySelectorAll('[data-bind="org-email"]').forEach(el => {
    el.textContent = config.org.contactEmail;
    if (el.tagName === 'A') el.href = `mailto:${config.org.contactEmail}`;
  });
  document.querySelectorAll('[data-bind="org-phone"]').forEach(el => el.textContent = config.org.phone);
  document.querySelectorAll('[data-bind="org-location"]').forEach(el => el.textContent = config.org.location);

  // 3. Navigation Links
  const navContainer = document.getElementById('site-nav-links');
  if (navContainer && config.navigation) {
    const currentPath = window.location.pathname;
    navContainer.innerHTML = config.navigation.map(item => {
      const isActive = currentPath.endsWith(item.link) || 
                       (item.link === 'index.html' && (currentPath.endsWith('/') || currentPath === ''));
      return `<li><a href="${item.link}" class="nav-link ${isActive ? 'active' : ''}">${item.title}</a></li>`;
    }).join('');
  }

  // 4. Footer Quick Links
  const footerLinks = document.getElementById('footer-quick-links');
  if (footerLinks && config.footer?.quickLinks) {
    footerLinks.innerHTML = config.footer.quickLinks.map(l => `
      <li><a href="${l.url}" class="footer-link">${l.name}</a></li>
    `).join('');
  }

  // 5. Injects Modals into Document Body
  injectModals();
}

/**
 * Injects SSO Auth Modal, Chapter Registration Modal, and Toast
 */
function injectModals() {
  if (document.getElementById('auth-modal')) return;

  const modalMarkup = `
    <!-- SSO AUTHENTICATION MODAL -->
    <div id="auth-modal" class="auth-modal" onclick="if(event.target===this) window.closeAuthModal()">
      <div class="auth-modal-dialog">
        <button class="auth-modal-close" onclick="window.closeAuthModal()" aria-label="Close modal">&times;</button>
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <span class="badge-varsity" style="margin-bottom: 0.5rem;">MEMBERS &amp; FOUNDERS</span>
          <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--navy-dark); margin: 0 0 0.4rem;">
            Sign in to Elevate the Circuit
          </h3>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin: 0;">
            Access your chapter portal, register new schools, and access circuit resources.
          </p>
        </div>

        <button class="sso-btn sso-google" onclick="window.handleSSOGoogle()">
          <svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
          Continue with Google SSO
        </button>

        <button class="sso-btn sso-github" onclick="window.handleSSOGitHub()">
          <svg viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          Continue with GitHub
        </button>

        <div class="sso-divider">or magic link</div>

        <form onsubmit="window.handleSSOMagicLink(event)">
          <div style="margin-bottom: 0.75rem;">
            <input type="email" id="sso-email-input" class="search-input" placeholder="Enter student or school email..." required style="padding-left: 1rem; width: 100%;">
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Send Magic Link</button>
        </form>
      </div>
    </div>

    <!-- REGISTER SCHOOL CHAPTER MODAL -->
    <div id="chapter-modal" class="auth-modal" onclick="if(event.target===this) window.closeRegisterChapterModal()">
      <div class="auth-modal-dialog" style="max-width: 580px;">
        <button class="auth-modal-close" onclick="window.closeRegisterChapterModal()">&times;</button>
        <div style="margin-bottom: 1.25rem;">
          <span class="badge-varsity" style="margin-bottom: 0.35rem;">CIRCUIT REGISTRATION</span>
          <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--navy-dark); margin: 0 0 0.35rem;">
            Register a Speech &amp; Debate Chapter
          </h3>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin: 0;">
            Registers your school chapter into the national circuit and activates free starter kit delivery.
          </p>
        </div>

        <form id="new-chapter-form" onsubmit="window.submitNewChapterFromModal(event)">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; margin-bottom: 0.85rem;">
            <div>
              <label style="font-size: 0.8rem; font-weight: 700; display: block; margin-bottom: 0.25rem;">Chapter Name *</label>
              <input type="text" name="chapter_name" required placeholder="e.g. Westview Speech & Debate" class="search-input" style="padding-left: 0.75rem; width: 100%;">
            </div>
            <div>
              <label style="font-size: 0.8rem; font-weight: 700; display: block; margin-bottom: 0.25rem;">School / Consortium *</label>
              <input type="text" name="school_name" required placeholder="e.g. Westview High School" class="search-input" style="padding-left: 0.75rem; width: 100%;">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.85rem; margin-bottom: 0.85rem;">
            <div>
              <label style="font-size: 0.8rem; font-weight: 700; display: block; margin-bottom: 0.25rem;">City *</label>
              <input type="text" name="city" required placeholder="Charlotte" class="search-input" style="padding-left: 0.75rem; width: 100%;">
            </div>
            <div>
              <label style="font-size: 0.8rem; font-weight: 700; display: block; margin-bottom: 0.25rem;">State (2 letters) *</label>
              <input type="text" name="state" required maxlength="2" placeholder="NC" class="search-input" style="padding-left: 0.75rem; width: 100%; text-transform: uppercase;">
            </div>
            <div>
              <label style="font-size: 0.8rem; font-weight: 700; display: block; margin-bottom: 0.25rem;">School Level</label>
              <select name="school_type" class="search-input" style="padding-left: 0.5rem; width: 100%;">
                <option value="High School">High School</option>
                <option value="Middle School">Middle School</option>
                <option value="Combined">Combined</option>
              </select>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; margin-bottom: 0.85rem;">
            <div>
              <label style="font-size: 0.8rem; font-weight: 700; display: block; margin-bottom: 0.25rem;">Estimated Students</label>
              <input type="number" name="students_count" min="1" value="15" class="search-input" style="padding-left: 0.75rem; width: 100%;">
            </div>
            <div>
              <label style="font-size: 0.8rem; font-weight: 700; display: block; margin-bottom: 0.25rem;">Status</label>
              <select name="status" class="search-input" style="padding-left: 0.5rem; width: 100%;">
                <option value="Active">Active</option>
                <option value="Launching Soon">Launching Soon</option>
                <option value="In Formation">In Formation</option>
              </select>
            </div>
          </div>

          <div style="margin-bottom: 0.85rem;">
            <label style="font-size: 0.8rem; font-weight: 700; display: block; margin-bottom: 0.25rem;">Events Offered</label>
            <input type="text" name="events_offered" placeholder="Public Forum, Lincoln Douglas, Original Oratory" class="search-input" style="padding-left: 0.75rem; width: 100%;">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; margin-bottom: 1.25rem;">
            <div>
              <label style="font-size: 0.8rem; font-weight: 700; display: block; margin-bottom: 0.25rem;">Student Lead Name</label>
              <input type="text" name="student_lead_name" placeholder="e.g. Jordan Lee" class="search-input" style="padding-left: 0.75rem; width: 100%;">
            </div>
            <div>
              <label style="font-size: 0.8rem; font-weight: 700; display: block; margin-bottom: 0.25rem;">Contact Email *</label>
              <input type="email" name="contact_email" required placeholder="lead@school.edu" class="search-input" style="padding-left: 0.75rem; width: 100%;">
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.closeRegisterChapterModal()">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm">Save Chapter to Database</button>
          </div>
        </form>
      </div>
    </div>

    <!-- FLOATING TOAST FEEDBACK -->
    <div id="toast-notice" class="toast-notice" role="alert"></div>
  `;

  const div = document.createElement('div');
  div.innerHTML = modalMarkup;
  document.body.appendChild(div);
}

/**
 * Setup backend credentials, auth listeners, and navigation dock
 */
function setupBackendAndAuth() {
  const checkBackend = () => {
    if (window.ETC_BACKEND) {
      window.ETC_BACKEND.onAuth(({ user, profile, isConnected }) => {
        renderNavAuthDock(user, profile, isConnected);
      });
    } else {
      setTimeout(checkBackend, 100);
    }
  };
  checkBackend();
}

/**
 * Renders the top-right SSO user dock
 */
function renderNavAuthDock(user, profile, isConnected) {
  const container = document.getElementById('nav-user-dock');
  if (!container) return;

  if (!user) {
    container.innerHTML = '';
  } else {
    const displayName = profile?.full_name || user.email?.split('@')[0] || 'Member';
    const role = profile?.role || 'chapter_lead';
    const avatarImg = profile?.avatar_url 
      ? `<img src="${profile.avatar_url}" alt="${displayName}">`
      : displayName.charAt(0).toUpperCase();

    container.innerHTML = `
      <div style="position: relative;">
        <button class="user-profile-btn" onclick="window.toggleUserMenu(event)">
          <div class="user-avatar-circle">${avatarImg}</div>
          <span class="user-name-label">${displayName}</span>
          <span class="user-role-badge">${role.replace('_', ' ')}</span>
        </button>
        <div id="user-nav-dropdown" class="user-dropdown-menu">
          <div class="user-dropdown-header">
            <p style="font-weight: 700; font-size: 0.9rem; margin: 0; color: var(--navy-dark);">${displayName}</p>
            <p style="font-size: 0.75rem; color: var(--text-muted); margin: 0;">${user.email || ''}</p>
          </div>
          <a href="chapter-tracker.html" class="user-dropdown-item" onclick="window.showRegisterChapterModal()">
            <span>+</span> Register New School
          </a>
          <a href="get-involved.html" class="user-dropdown-item">
            <span>ðŸ“‹</span> View Applications
          </a>
          <a href="#" class="user-dropdown-item" onclick="window.handleSignOut(event)" style="color: var(--accent); border-top: 1px solid var(--surface-border-subtle);">
            <span>ðŸšª</span> Sign Out
          </a>
        </div>
      </div>
    `;
  }
}

/**
 * Global Window Modal Functions
 */
window.toggleUserMenu = function(e) {
  e.stopPropagation();
  const menu = document.getElementById('user-nav-dropdown');
  if (menu) menu.classList.toggle('active');
};

document.addEventListener('click', () => {
  const menu = document.getElementById('user-nav-dropdown');
  if (menu) menu.classList.remove('active');
});

window.showAuthModal = function() {
  const m = document.getElementById('auth-modal');
  if (m) m.classList.add('active');
};

window.closeAuthModal = function() {
  const m = document.getElementById('auth-modal');
  if (m) m.classList.remove('active');
};

window.showBackendModal = function() {};
window.closeBackendModal = function() {};

window.showRegisterChapterModal = function() {
  const m = document.getElementById('chapter-modal');
  if (m) m.classList.add('active');
};

window.closeRegisterChapterModal = function() {
  const m = document.getElementById('chapter-modal');
  if (m) m.classList.remove('active');
};

window.handleSSOGoogle = async function() {
  try {
    window.showToast('Connecting to Google SSO...', 'info');
    await window.ETC_BACKEND.signInWithGoogle();
    window.closeAuthModal();
    window.showToast('Signed in successfully!', 'success');
  } catch (err) {
    window.showToast('Google SSO notice: ' + (err.message || 'Please try again later'), 'warning');
  }
};

window.handleSSOGitHub = async function() {
  try {
    window.showToast('Connecting to GitHub SSO...', 'info');
    await window.ETC_BACKEND.signInWithGitHub();
    window.closeAuthModal();
    window.showToast('Signed in successfully!', 'success');
  } catch (err) {
    window.showToast('GitHub SSO notice: ' + (err.message || 'Please try again later'), 'warning');
  }
};

window.handleSSOMagicLink = async function(e) {
  e.preventDefault();
  const email = document.getElementById('sso-email-input').value.trim();
  if (!email) return;
  try {
    await window.ETC_BACKEND.signInWithMagicLink(email);
    window.closeAuthModal();
    window.showToast(`Magic link sent to ${email}!`, 'success');
  } catch (err) {
    window.showToast(err.message || 'Could not send magic link', 'error');
  }
};

window.handleDemoLogin = function() {};

window.handleSignOut = async function(e) {
  if (e) e.preventDefault();
  await window.ETC_BACKEND.signOut();
  window.showToast('Signed out successfully', 'info');
};

window.saveBackendCredentials = function() {};
window.resetToLocalSandbox = function() {};

window.submitNewChapterFromModal = async function(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  const rawEvents = formData.get('events_offered') || 'Public Forum, Lincoln Douglas';
  const eventsArray = rawEvents.split(',').map(s => s.trim()).filter(Boolean);

  const payload = {
    chapter_name: formData.get('chapter_name'),
    school_name: formData.get('school_name'),
    city: formData.get('city'),
    state: (formData.get('state') || 'US').toUpperCase(),
    school_type: formData.get('school_type') || 'High School',
    status: formData.get('status') || 'Active',
    students_count: parseInt(formData.get('students_count'), 10) || 15,
    events_offered: eventsArray,
    student_lead_name: formData.get('student_lead_name') || '',
    contact_email: formData.get('contact_email') || 'elevatethecircuitusa@gmail.com',
    year_founded: new Date().getFullYear()
  };

  try {
    window.showToast('Registering chapter to national circuit...', 'info');
    await window.ETC_BACKEND.createChapter(payload);
    window.showToast('Chapter registered successfully!', 'success');
    window.closeRegisterChapterModal();
    form.reset();

    // If currently on chapter tracker page, re-render immediately
    if (detectCurrentPage() === 'chapter-tracker') {
      renderChapterTrackerPage();
    }
  } catch (err) {
    window.showToast('Error registering chapter: ' + (err.message || 'Please try again'), 'error');
  }
};

let toastTimeout = null;
window.showToast = function(message, type = 'info', duration = 4500) {
  const toast = document.getElementById('toast-notice');
  if (!toast) return;
  if (toastTimeout) clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.className = `toast-notice show ${type}`;
  toastTimeout = setTimeout(() => {
    toast.className = 'toast-notice';
  }, duration);
};

/**
 * ====================================================================
 * SHARED DATA LAYER: LIVE CHAPTERS & STATE NORMALIZATION
 * ====================================================================
 */
const US_STATE_NAMES = {
  'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California',
  'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware', 'FL': 'Florida', 'GA': 'Georgia',
  'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa',
  'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
  'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi', 'MO': 'Missouri',
  'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey',
  'NM': 'New Mexico', 'NY': 'New York', 'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio',
  'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
  'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont',
  'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming', 'DC': 'District of Columbia'
};

function normalizeState(state) {
  if (!state) return '';
  const trimmed = state.trim();
  const upper = trimmed.toUpperCase();
  if (US_STATE_NAMES[upper]) return US_STATE_NAMES[upper];
  for (const [abbr, full] of Object.entries(US_STATE_NAMES)) {
    if (full.toLowerCase() === trimmed.toLowerCase()) return full;
  }
  return trimmed;
}

function getStateAbbr(state) {
  if (!state) return '';
  const trimmed = state.trim();
  const upper = trimmed.toUpperCase();
  if (US_STATE_NAMES[upper]) return upper;
  for (const [abbr, full] of Object.entries(US_STATE_NAMES)) {
    if (full.toLowerCase() === trimmed.toLowerCase()) return abbr;
  }
  return trimmed.substring(0, 2).toUpperCase();
}

/**
 * In-memory cache for live chapter records
 */
let cachedChapters = null;

/**
 * Generic robust CSV parser handling quoted multiline cells
 */
function parseCsv(csvText) {
  if (!csvText) return [];
  const rows = [];
  let currentRow = [''];
  let inQuotes = false;
  for (let i = 0; i < csvText.length; i++) {
    const c = csvText[i];
    const next = csvText[i + 1];
    if (c === '"') {
      if (inQuotes && next === '"') {
        currentRow[currentRow.length - 1] += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      currentRow.push('');
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && next === '\n') i++;
      rows.push(currentRow);
      currentRow = [''];
    } else {
      currentRow[currentRow.length - 1] += c;
    }
  }
  if (currentRow.length > 1 || currentRow[0] !== '') rows.push(currentRow);
  return rows;
}

/**
 * Fetches and parses live Google Sheet chapter records
 */
async function fetchGoogleSheetChapters() {
  const config = window.SITE_CONFIG?.googleSheet;
  if (!config || !config.sheetId) return null;
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${config.sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(config.tabName || 'Chapters')}`;
  try {
    const res = await fetch(sheetUrl);
    if (!res.ok) throw new Error('Sheet HTTP ' + res.status);
    const csvText = await res.text();
    const rows = parseCsv(csvText);
    if (!rows || rows.length < 2) return null;

    const headers = rows[0].map(h => (h || '').trim().toLowerCase());
    const getIdx = (keywords) => headers.findIndex(h => keywords.some(k => h.includes(k)));

    const nameIdx = getIdx(['chapter', 'name']);
    const cityIdx = getIdx(['city']);
    const stateIdx = getIdx(['state']);
    const schoolsIdx = getIdx(['schools', 'partner']);
    const statusIdx = getIdx(['status']);
    const yearIdx = getIdx(['year', 'founded']);
    const debatersIdx = getIdx(['debater', 'students', 'count']);
    const leadersIdx = getIdx(['leader', 'coordinator', 'lead']);
    const eventsIdx = getIdx(['event']);
    const contactIdx = getIdx(['contact', 'email']);
    const socialIdx = getIdx(['social', 'instagram', 'media']);

    const list = [];
    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      const name = (row[nameIdx >= 0 ? nameIdx : 0] || '').trim();
      if (!name) continue;

      const rawContact = (contactIdx >= 0 && row[contactIdx]) ? row[contactIdx].trim() : 'elevatedebateusa@gmail.com';
      const emailMatch = rawContact.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      const email = emailMatch ? emailMatch[0] : rawContact;

      let rawSocial = (socialIdx >= 0 && row[socialIdx]) ? row[socialIdx].trim() : '';
      let instagram = rawSocial;
      if (instagram && !instagram.startsWith('@') && !instagram.startsWith('http')) {
        instagram = '@' + instagram;
      }

      list.push({
        id: `sheet-${r}`,
        chapter_name: name,
        chapterName: name,
        city: (cityIdx >= 0 && row[cityIdx]) ? row[cityIdx].trim() : 'Charlotte',
        state: (stateIdx >= 0 && row[stateIdx]) ? row[stateIdx].trim() : 'NC',
        schools_worked_with: parseInt(schoolsIdx >= 0 ? row[schoolsIdx] : '5', 10) || 5,
        schoolsWorkedWith: (schoolsIdx >= 0 && row[schoolsIdx]) ? `${row[schoolsIdx]} Partner Schools` : '5 Partner Schools',
        school_name: (schoolsIdx >= 0 && row[schoolsIdx]) ? `${row[schoolsIdx]} Partner Schools` : 'Charlotte Partner Schools',
        status: (statusIdx >= 0 && row[statusIdx]) ? row[statusIdx].trim() : 'Active',
        year_founded: parseInt(yearIdx >= 0 ? row[yearIdx] : '2025', 10) || 2025,
        yearFounded: (yearIdx >= 0 && row[yearIdx]) ? row[yearIdx].trim() : '2025',
        students_count: parseInt(String(debatersIdx >= 0 ? row[debatersIdx] : '130').replace(/\D/g, ''), 10) || 130,
        studentsCount: (debatersIdx >= 0 && row[debatersIdx]) ? row[debatersIdx].trim() : '130+',
        studentsImpacted: (debatersIdx >= 0 && row[debatersIdx]) ? row[debatersIdx].trim() : '130+',
        student_lead_name: (leadersIdx >= 0 && row[leadersIdx]) ? row[leadersIdx].trim() : 'Derin Gulkanat and Ishan Saha',
        advisor_name: (leadersIdx >= 0 && row[leadersIdx]) ? row[leadersIdx].trim() : 'Derin Gulkanat and Ishan Saha',
        events_offered: (eventsIdx >= 0 && row[eventsIdx]) ? row[eventsIdx].split(',').map(s => s.trim()).filter(Boolean) : ['Original Oratory', 'Congressional Debate', 'Public Forum'],
        eventsOffered: (eventsIdx >= 0 && row[eventsIdx]) ? row[eventsIdx].trim() : 'Original Oratory, Congressional Debate, Public Forum',
        contact_email: email,
        contact: email,
        contactInfo: `${(leadersIdx >= 0 && row[leadersIdx]) ? row[leadersIdx].trim() : ''} • ${email}`,
        instagram_handle: instagram,
        instagram: instagram,
        socialMedia: instagram
      });
    }
    if (list.length > 0) return list;
  } catch (err) {
    console.warn('[ETC Sheet] Google Sheet fetch failed, falling back:', err);
  }
  return null;
}

/**
 * Loads all chapters uniformly across both Overview and Chapter Tracker:
 * 1. Live Google Sheet
 * 2. Supabase Backend
 * 3. Static SITE_CONFIG chapters fallback
 */
async function loadAllChapters(forceRefresh = false) {
  if (!forceRefresh && cachedChapters && cachedChapters.length > 0) {
    return cachedChapters;
  }

  let chapters = [];
  try {
    const sheetData = await fetchGoogleSheetChapters();
    if (sheetData && sheetData.length > 0) {
      cachedChapters = sheetData;
      return sheetData;
    }
  } catch (e) {
    console.warn('[ETC Sheet] Fetch error:', e);
  }

  if (!chapters || chapters.length === 0) {
    try {
      if (window.ETC_BACKEND) {
        chapters = await window.ETC_BACKEND.getChapters();
      }
    } catch (err) {
      console.warn('[ETC Backend] Query error:', err);
    }
  }

  if (!chapters || chapters.length === 0) {
    chapters = window.SITE_CONFIG?.chapters || [];
  }

  cachedChapters = chapters;
  return chapters;
}

/**
 * Normalizes categories from human-entered sheet values to slug identifiers
 */
function slugifyResourceCategory(raw) {
  if (!raw) return 'curriculum';
  const c = String(raw).trim().toLowerCase();
  if (c.includes('start') || c.includes('kit') || c.includes('found') || c.includes('launch')) return 'starter-kits';
  if (c.includes('curr') || c.includes('lesson') || c.includes('module') || c.includes('plan')) return 'curriculum';
  if (c.includes('middle') || c.includes('ms') || c.includes('spar') || c.includes('mini')) return 'middle-school';
  if (c.includes('format') || c.includes('pf') || c.includes('ld') || c.includes('policy') || c.includes('congress')) return 'formats';
  if (c.includes('topic') || c.includes('motion') || c.includes('resolut') || c.includes('prompt')) return 'topics';
  if (c.includes('tourn') || c.includes('comp') || c.includes('scrimm') || c.includes('check')) return 'tournaments';
  return c.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'curriculum';
}

/**
 * Normalizes links to ensure external/cloud URLs open seamlessly
 */
function formatResourceUrl(url) {
  if (!url || url === '#' || url.trim() === '') return '#';
  return url.trim();
}

/**
 * Converts links (Google Drive files, Google Docs, Slides, Sheets, Dropbox) into direct download links where applicable
 */
function getDirectDownloadUrl(url) {
  if (!url || url === '#' || url.trim() === '') return '#';
  const clean = url.trim();

  // Google Drive single file link (e.g. /file/d/{id}/view) -> direct download stream
  const driveFileMatch = clean.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveFileMatch && !clean.includes('/folders/')) {
    return `https://drive.google.com/uc?export=download&id=${driveFileMatch[1]}`;
  }

  // Google Docs document -> direct PDF export
  const docMatch = clean.match(/docs\.google\.com\/document\/d\/([a-zA-Z0-9_-]+)/);
  if (docMatch) {
    return `https://docs.google.com/document/d/${docMatch[1]}/export?format=pdf`;
  }

  // Google Slides presentation -> direct PDF export
  const presMatch = clean.match(/docs\.google\.com\/presentation\/d\/([a-zA-Z0-9_-]+)/);
  if (presMatch) {
    return `https://docs.google.com/presentation/d/${presMatch[1]}/export/pdf`;
  }

  // Google Spreadsheets -> direct PDF export
  const sheetMatch = clean.match(/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (sheetMatch && !clean.includes('tq?') && !clean.includes('gviz')) {
    return `https://docs.google.com/spreadsheets/d/${sheetMatch[1]}/export?format=pdf`;
  }

  // Dropbox share link -> force download with dl=1
  if (clean.includes('dropbox.com') && clean.includes('dl=0')) {
    return clean.replace('dl=0', 'dl=1');
  }

  return clean;
}

/**
 * Fetches and parses live Google Sheet curriculum & document records
 */
async function fetchGoogleSheetResources() {
  const config = window.SITE_CONFIG?.googleSheet;
  if (!config || !config.sheetId) return null;
  const tabName = config.resourcesTab || 'Resources';
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${config.sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;

  try {
    const res = await fetch(sheetUrl);
    if (!res.ok) throw new Error('Sheet HTTP ' + res.status);
    const csvText = await res.text();
    const rows = parseCsv(csvText);
    if (!rows || rows.length < 2) return null;

    // Search for header row (prioritize exact column header matches to bypass top summary/banner cells)
    let headerRowIdx = -1;
    for (let i = 0; i < Math.min(rows.length, 10); i++) {
      const rowLower = rows[i].map(c => (c || '').trim().toLowerCase());
      const hasExactTitle = rowLower.some(c => c === 'title' || c === 'document title' || c === 'name');
      const hasSecondary = rowLower.some(c => c === 'category' || c === 'format' || c === 'link' || c === 'url' || c === 'download' || c === 'status' || c === 'skill level');
      if (hasExactTitle && hasSecondary) {
        headerRowIdx = i;
        break;
      }
    }

    if (headerRowIdx === -1) {
      for (let i = 0; i < Math.min(rows.length, 10); i++) {
        const rowLower = rows[i].map(c => (c || '').trim().toLowerCase());
        const isDecorative = rowLower.some(c => c.length > 50);
        if (!isDecorative &&
            rowLower.some(c => c.includes('title') || c.includes('name')) &&
            rowLower.some(c => c.includes('cat') || c.includes('format') || c.includes('link') || c.includes('url') || c.includes('download'))) {
          headerRowIdx = i;
          break;
        }
      }
    }

    if (headerRowIdx === -1) return null;

    const headers = rows[headerRowIdx].map(h => (h || '').trim().toLowerCase());
    const getIdx = (keywords) => headers.findIndex(h => keywords.some(k => h === k || h.includes(k)));
    const titleIdx = getIdx(['title', 'name', 'document', 'resource', 'material']);
    const categoryIdx = getIdx(['category', 'type', 'track', 'pillar', 'section']);
    const formatIdx = getIdx(['format', 'file']);
    const descIdx = getIdx(['description', 'desc', 'summary', 'about']);
    const linkIdx = getIdx(['link', 'url', 'download', 'drive', 'file', 'href']);
    const badgeIdx = getIdx(['skill level', 'badge', 'tag', 'level', 'status']);
    const detailsIdx = getIdx(['detail', 'module', 'time', 'page', 'read', 'size', 'length']);

    const list = [];
    for (let r = headerRowIdx + 1; r < rows.length; r++) {
      const row = rows[r];
      const title = (row[titleIdx >= 0 ? titleIdx : 0] || '').trim();
      if (!title) continue;
      // Skip repeated headers or decorative banner words
      if (title.toLowerCase() === 'title' || title.toLowerCase().includes('total resources') || title.toLowerCase().includes('elevate debate')) continue;

      const rawCat = (categoryIdx >= 0 && row[categoryIdx]) ? row[categoryIdx].trim() : 'Curriculum';
      const catSlug = slugifyResourceCategory(rawCat);
      const rawLink = (linkIdx >= 0 && row[linkIdx]) ? row[linkIdx].trim() : '#';
      const cleanLink = formatResourceUrl(rawLink);

      list.push({
        id: `sheet-res-${r}`,
        title,
        category: catSlug,
        categoryName: rawCat,
        format: (formatIdx >= 0 && row[formatIdx]) ? row[formatIdx].trim() : 'Resource Guide',
        description: (descIdx >= 0 && row[descIdx]) ? row[descIdx].trim() : '',
        link: cleanLink,
        downloadLink: cleanLink,
        badge: (badgeIdx >= 0 && row[badgeIdx]) ? row[badgeIdx].trim() : '',
        readTime: (detailsIdx >= 0 && row[detailsIdx]) ? row[detailsIdx].trim() : '',
        source: 'sheet'
      });
    }
    return list.length > 0 ? list : null;
  } catch (err) {
    console.warn('[ETC Resources] Google Sheet query unavailable:', err);
    return null;
  }
}

/**
 * Loads all resources from Google Sheets, local JSON, or config with local storage merges
 */
let cachedResources = null;
async function loadAllResources(forceRefresh = false) {
  if (!forceRefresh && cachedResources !== null) {
    return cachedResources;
  }

  // 1. Core resource library across all categories/sections
  let resources = [...(window.SITE_CONFIG?.resources || [])];

  // 2. Fallback to /data/resources.json if config is empty
  if (resources.length === 0) {
    try {
      const res = await fetch('data/resources.json');
      if (res.ok) {
        resources = await res.json();
      }
    } catch (e) {}
  }

  let source = 'config';

  // 3. Merge live Google Sheet resources without removing other sections
  try {
    const sheetData = await fetchGoogleSheetResources();
    if (sheetData && sheetData.length > 0) {
      const sheetTitles = new Set(sheetData.map(s => (s.title || '').toLowerCase().trim()));
      const nonOverridden = resources.filter(r => !sheetTitles.has((r.title || '').toLowerCase().trim()));
      resources = [...sheetData, ...nonOverridden];
      source = 'sheet';
    }
  } catch (e) {
    console.warn('[ETC Resources] Sheet error:', e);
  }

  // 4. Merge any browser-local custom resources from localStorage (prepend so new additions show first)
  try {
    const localSaved = JSON.parse(localStorage.getItem('etc_custom_resources') || '[]');
    if (Array.isArray(localSaved) && localSaved.length > 0) {
      resources = [...localSaved, ...resources];
    }
  } catch (e) {}

  cachedResources = resources;
  window.__ETC_RESOURCES_SOURCE = source;
  return resources;
}

/**
 * ====================================================================
 * HOMEPAGE RENDERING & LIVE IMPACT STATS
 * ====================================================================
 */
async function renderHomePage() {
  const config = window.SITE_CONFIG;
  if (!config) return;

  // Fetch live chapters synchronized with Google Sheet / Chapter Tracker
  const chapters = await loadAllChapters();

  // 1. Render Live Impact Metrics Grid & Hero Text
  renderHomeStatsGrid(chapters);

  // 1b. Render Interactive 50-State US Expansion Map (Live synced to Google Sheet)
  renderInteractiveUSMap(chapters);

  // 2. Pillars / What We Do Grid
  const pillarsContainer = document.getElementById('pillars-grid');
  if (pillarsContainer && config.pillars) {
    pillarsContainer.innerHTML = config.pillars.map((pillar, i) => `
      <div class="pillar-card reveal-on-scroll stagger-${(i % 3) + 1}">
        <div class="pillar-icon-box" style="background: var(--navy-wash); color: var(--navy-dark); border: 1px solid rgba(10, 17, 40, 0.1);">
          ${getIcon(pillar.icon)}
        </div>
        <div style="flex: 1;">
          <h3 class="pillar-title" style="font-family: var(--font-serif); font-size: 1.3rem; color: var(--navy-dark); margin: 0 0 0.3rem;">${pillar.title}</h3>
          <p class="pillar-desc" style="color: var(--slate-600); font-size: 0.92rem; line-height: 1.6; margin: 0;">${pillar.description}</p>
        </div>
      </div>
    `).join('');
  }

  // 3. Testimonials (if present)
  const testContainer = document.getElementById('testimonials-grid');
  if (testContainer && config.testimonials) {
    testContainer.innerHTML = config.testimonials.map((item, i) => `
      <div class="testimonial-card reveal-on-scroll stagger-${(i % 3) + 1}">
        <p class="testimonial-quote" style="font-family: var(--font-serif); font-size: 1.05rem; font-style: italic; color: var(--navy-dark);">${item.quote}</p>
        <div class="testimonial-author">
          <div class="author-info">
            <h4 style="font-weight: 800; color: var(--navy-dark);">${item.name}</h4>
            <p>${item.role} • <strong>${item.school}</strong></p>
          </div>
        </div>
      </div>
    `).join('');
  }

  setupScrollReveal();
}

/**
 * Computes and animates 4 key impact cards on homepage
 * Fully synced to the Google Sheet and Chapter Tracker roster
 */
function renderHomeStatsGrid(chapters) {
  const statsContainer = document.getElementById('stats-grid');
  if (!statsContainer) return;

  const totalChapters = chapters.length;
  const statesSet = new Set(chapters.map(c => normalizeState(c.state)).filter(Boolean));
  const statesCount = statesSet.size || 1;

  const totalStudents = chapters.reduce((sum, c) => {
    const rawCount = c.students_count || c.studentsCount || c.studentsImpacted || 0;
    const match = String(rawCount).match(/\d+/);
    return sum + (match ? parseInt(match[0], 10) : 0);
  }, 0) || 140;

  const schoolsCount = chapters.reduce((sum, c) => {
    const raw = c.schools_worked_with !== undefined ? c.schools_worked_with : (c.schoolsWorkedWith || 1);
    const match = String(raw).match(/\d+/);
    return sum + (match ? parseInt(match[0], 10) : 1);
  }, 0) || 6;

  const stateNamesList = Array.from(statesSet);
  let stateDetail = "North Carolina & California Circuits";
  if (statesCount > 1) {
    if (statesCount <= 3) {
      stateDetail = stateNamesList.join(" & ") + " Circuits";
    } else {
      stateDetail = `National Network Across ${statesCount} States`;
    }
  } else if (statesCount === 1) {
    stateDetail = (stateNamesList[0] || 'North Carolina') + " Circuit";
  }

  const homeStats = [
    { 
      id: "stat-home-chapters", 
      value: String(totalChapters || 2), 
      label: totalChapters === 1 ? "Active Chapter" : "Active Chapters", 
      detail: totalChapters === 1 ? "Elevate Debate NC (Expanding)" : "North Carolina & California Circuits" 
    },
    { 
      id: "stat-home-students", 
      value: `${totalStudents}+`, 
      label: "Students Impacted", 
      detail: "Active debaters in weekly training" 
    },
    { 
      id: "stat-home-schools", 
      value: `${schoolsCount}+`, 
      label: "Partner Schools", 
      detail: "Consortium member programs" 
    },
    { 
      id: "stat-home-states", 
      value: String(statesCount), 
      label: statesCount === 1 ? "State Represented" : "States Represented", 
      detail: stateDetail 
    }
  ];

  statsContainer.innerHTML = homeStats.map((stat, i) => `
    <div class="stat-card reveal-on-scroll stagger-${(i % 4) + 1}">
      <div class="stat-value" id="${stat.id}" style="color: var(--navy-dark); font-family: var(--font-mono);">${stat.value}</div>
      <div class="stat-label" style="font-weight: 700; color: var(--accent); font-family: var(--font-mono); text-transform: uppercase; font-size: 0.78rem;">${stat.label}</div>
      <div class="stat-detail">${stat.detail}</div>
    </div>
  `).join('');

  homeStats.forEach(stat => {
    const el = document.getElementById(stat.id);
    if (el) {
      el.classList.add('counter-animated');
      animateCounter(el, stat.value);
    }
  });

  const heroSocialText = document.getElementById('hero-social-proof-text');
  if (heroSocialText) {
    const statesText = statesCount === 1 ? (stateNamesList[0] || 'North Carolina') : `${statesCount} states`;
    heroSocialText.innerHTML = `Empowering <strong>${schoolsCount}+ partner schools</strong> and over <strong>${totalStudents}+ student debaters</strong> across ${statesText}.`;
  }
}

/**
 * ====================================================================
 * INTERACTIVE 50-STATE US EXPANSION MAP
 * ====================================================================
 * Fully synced with the live Google Sheet / Circuit roster.
 * Highlights states with chapters in varsity crimson.
 * Displays interactive hover tooltip and mobile docked details with chapter lists.
 */
function renderInteractiveUSMap(chapters) {
  const mapSvgContainer = document.getElementById('us-map-svg-container');
  if (!mapSvgContainer) return;
  if (!window.US_MAP_DATA || !window.US_MAP_DATA.locations) {
    console.warn('[ETC Map] US_MAP_DATA not yet loaded.');
    return;
  }

  // 1. Group chapters by state abbreviation (2-letter uppercase)
  const chaptersByState = {};
  chapters.forEach(ch => {
    const rawState = ch.state || '';
    const abbr = getStateAbbr(rawState).toUpperCase();
    if (abbr) {
      if (!chaptersByState[abbr]) chaptersByState[abbr] = [];
      chaptersByState[abbr].push(ch);
    }
  });

  // 2. Generate SVG Map Paths
  const { viewBox, locations } = window.US_MAP_DATA;
  const pathsHtml = locations.map(loc => {
    const stateCode = loc.id.toUpperCase();
    const stateName = loc.name;
    const stateChapters = chaptersByState[stateCode] || [];
    const hasChapters = stateChapters.length > 0;
    const stateClass = hasChapters ? 'us-state us-state-active' : 'us-state us-state-inactive';

    return `
      <path 
        d="${loc.path}"
        id="us-state-${loc.id.toLowerCase()}"
        class="${stateClass}"
        data-state-code="${stateCode}"
        data-state-name="${stateName}"
        data-has-chapters="${hasChapters ? 'true' : 'false'}"
        tabindex="0"
        role="button"
        aria-label="${stateName}: ${stateChapters.length} ${stateChapters.length === 1 ? 'Chapter' : 'Chapters'}"
      >
        <title>${stateName}: ${stateChapters.length} ${stateChapters.length === 1 ? 'Chapter' : 'Chapters'}</title>
      </path>
    `;
  }).join('');

  mapSvgContainer.innerHTML = `
    <svg viewBox="${viewBox}" class="us-map-svg" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <filter id="active-state-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#b91c1c" flood-opacity="0.4"/>
      </filter>
      <g class="us-map-states-group">
        ${pathsHtml}
      </g>
    </svg>
  `;

  // 5. Setup Hover Tooltip and Touch Interaction
  setupMapInteractivity(chaptersByState);
}

/**
 * Setup tooltip and interaction handlers for the US map
 */
function setupMapInteractivity(chaptersByState) {
  const tooltip = document.getElementById('us-map-tooltip');
  const drawer = document.getElementById('us-map-selected-drawer');
  const mapSvgContainer = document.getElementById('us-map-svg-container');
  if (!tooltip || !mapSvgContainer) return;

  const statePaths = mapSvgContainer.querySelectorAll('.us-state');

  function getTooltipContent(stateCode, stateName) {
    const stateChapters = chaptersByState[stateCode] || [];
    const hasChapters = stateChapters.length > 0;

    if (hasChapters) {
      return `
        <div class="map-tooltip-inner">
          <div class="map-tooltip-header">
            <div class="map-tooltip-title-row">
              <h4 class="map-tooltip-state-name">${stateName}</h4>
              <span class="map-tooltip-abbr-badge">${stateCode}</span>
            </div>
            <span class="map-tooltip-status active">Active Circuit • ${stateChapters.length} ${stateChapters.length === 1 ? 'Chapter' : 'Chapters'}</span>
          </div>
          <div class="map-tooltip-chapters-list">
            ${stateChapters.map(ch => {
              const name = ch.chapter_name || ch.chapterName || 'Elevate Chapter';
              const city = ch.city || 'Regional';
              const schools = ch.schools_worked_with !== undefined ? `${ch.schools_worked_with} Partner Schools` : (ch.schoolsWorkedWith || '1 Partner School');
              const debaters = ch.students_count || ch.debaters_count || ch.studentsCount || '15+ Debaters';
              const leads = ch.student_lead_name || ch.leaders || ch.leader_name;
              const events = Array.isArray(ch.events_offered) ? ch.events_offered.join(', ') : (ch.events_offered || '');

              return `
                <div class="map-tooltip-chapter-item">
                  <div class="map-tooltip-chapter-title">${name}</div>
                  <div class="map-tooltip-chapter-meta">
                    <span>📍 ${city}, ${stateCode}</span>
                    <span>🏫 ${schools}</span>
                    <span>👥 ${debaters}</span>
                  </div>
                  ${leads ? `<div class="map-tooltip-lead"><strong>Lead:</strong> ${leads}</div>` : ''}
                  ${events ? `<div style="font-size: 0.72rem; color: rgba(255,255,255,0.6); margin-top: 0.25rem;"><strong>Formats:</strong> ${events}</div>` : ''}
                </div>
              `;
            }).join('')}
          </div>
          <div class="map-tooltip-footer">
            <a href="chapter-tracker.html?search=${encodeURIComponent(stateCode)}" class="map-tooltip-btn">View in Chapter Tracker &rarr;</a>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="map-tooltip-inner">
          <div class="map-tooltip-header">
            <div class="map-tooltip-title-row">
              <h4 class="map-tooltip-state-name">${stateName}</h4>
              <span class="map-tooltip-abbr-badge">${stateCode}</span>
            </div>
            <span class="map-tooltip-status inactive">Expansion Candidate</span>
          </div>
          <p class="map-tooltip-empty-desc">
            No official Elevate the Circuit chapters are registered in ${stateName} yet. We provide 100% free curriculum kits, tournament blueprints, and coaching support.
          </p>
          <div class="map-tooltip-footer">
            <a href="get-involved.html#start-chapter" class="map-tooltip-btn primary">Start a Chapter in ${stateName} &rarr;</a>
          </div>
        </div>
      `;
    }
  }

  function showTooltipAt(e, stateCode, stateName) {
    tooltip.innerHTML = getTooltipContent(stateCode, stateName);
    tooltip.style.display = 'block';

    const tooltipWidth = tooltip.offsetWidth || 300;
    const tooltipHeight = tooltip.offsetHeight || 190;
    let left = e.clientX + 16;
    let top = e.clientY + 16;

    if (left + tooltipWidth > window.innerWidth - 12) {
      left = e.clientX - tooltipWidth - 16;
    }
    if (top + tooltipHeight > window.innerHeight - 12) {
      top = e.clientY - tooltipHeight - 16;
    }

    tooltip.style.left = `${Math.max(10, left)}px`;
    tooltip.style.top = `${Math.max(10, top)}px`;
  }

  function selectState(stateCode, stateName) {
    statePaths.forEach(p => p.classList.remove('is-selected'));
    const targetPath = document.getElementById(`us-state-${stateCode.toLowerCase()}`);
    if (targetPath) targetPath.classList.add('is-selected');

    if (drawer) {
      drawer.style.display = 'block';
      drawer.innerHTML = getTooltipContent(stateCode, stateName);
    }
  }

  statePaths.forEach(path => {
    const stateCode = path.getAttribute('data-state-code');
    const stateName = path.getAttribute('data-state-name');

    path.addEventListener('mouseenter', (e) => {
      path.classList.add('is-hovered');
      showTooltipAt(e, stateCode, stateName);
    });

    path.addEventListener('mousemove', (e) => {
      showTooltipAt(e, stateCode, stateName);
    });

    path.addEventListener('mouseleave', () => {
      path.classList.remove('is-hovered');
      tooltip.style.display = 'none';
    });

    path.addEventListener('click', () => {
      selectState(stateCode, stateName);
    });

    path.addEventListener('focus', (e) => {
      const rect = path.getBoundingClientRect();
      showTooltipAt({ clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 }, stateCode, stateName);
      selectState(stateCode, stateName);
    });

  });
}

/**
 * ====================================================================
 * CHAPTER TRACKER: DOSSIER CARDS & NATIONAL REGISTRY TABLE
 * ====================================================================
 */
let currentDirectoryView = 'cards'; // 'cards' or 'table'

window.switchTrackerView = function(view) {
  currentDirectoryView = view;
  const cardsContainer = document.getElementById('chapters-grid');
  const tableContainer = document.getElementById('chapters-table-container');
  const cardsBtn = document.getElementById('view-cards-btn');
  const tableBtn = document.getElementById('view-table-btn');

  if (view === 'table') {
    if (cardsContainer) cardsContainer.style.display = 'none';
    if (tableContainer) tableContainer.style.display = 'block';
    if (cardsBtn) cardsBtn.classList.remove('active');
    if (tableBtn) tableBtn.classList.add('active');
  } else {
    if (cardsContainer) cardsContainer.style.display = 'grid';
    if (tableContainer) tableContainer.style.display = 'none';
    if (cardsBtn) cardsBtn.classList.add('active');
    if (tableBtn) tableBtn.classList.remove('active');
  }
};

async function renderChapterTrackerPage() {
  const countDisplay = document.getElementById('chapter-filter-count');
  if (countDisplay) countDisplay.textContent = 'Loading verified chapter roster...';

  const chapters = await loadAllChapters();

  // Summary Counters
  const totalChaptersEl = document.getElementById('total-chapters-count');
  const statesEl = document.getElementById('states-count');
  const debatersEl = document.getElementById('debaters-count');
  const schoolsEl = document.getElementById('schools-count');

  if (totalChaptersEl) animateCounter(totalChaptersEl, String(chapters.length));
  if (statesEl) {
    const statesSet = new Set(chapters.map(c => normalizeState(c.state)).filter(Boolean));
    animateCounter(statesEl, String(statesSet.size || 1));
  }
  if (debatersEl) {
    const totalStudents = chapters.reduce((sum, c) => {
      const match = String(c.students_count || c.studentsCount || c.studentsImpacted || 0).match(/\d+/);
      return sum + (match ? parseInt(match[0], 10) : 0);
    }, 0) || 140;
    animateCounter(debatersEl, `${totalStudents}+`);
  }
  if (schoolsEl) {
    const schoolsCount = chapters.reduce((sum, c) => {
      const raw = c.schools_worked_with !== undefined ? c.schools_worked_with : (c.schoolsWorkedWith || 1);
      const match = String(raw).match(/\d+/);
      return sum + (match ? parseInt(match[0], 10) : 1);
    }, 0) || 6;
    animateCounter(schoolsEl, `${schoolsCount}+`);
  }

  const cardsContainer = document.getElementById('chapters-grid');
  const tableBody = document.getElementById('chapters-table-body');
  const searchInput = document.getElementById('chapter-search');
  const filterBtns = document.querySelectorAll('[data-filter]');

  let currentFilter = 'active';
  let searchQuery = '';

  function filterAndDisplay() {
    const filtered = chapters.filter(ch => {
      const q = searchQuery.toLowerCase();
      const chName = (ch.chapter_name || ch.chapterName || '').toLowerCase();
      const school = (ch.school_name || ch.schoolsWorkedWith || '').toLowerCase();
      const city = (ch.city || '').toLowerCase();
      const state = (ch.state || '').toLowerCase();
      const status = (ch.status || 'Active').toLowerCase();
      const schoolType = (ch.school_type || ch.schoolType || '').toLowerCase();
      const events = Array.isArray(ch.events_offered) 
        ? ch.events_offered.join(' ').toLowerCase() 
        : (ch.eventsOffered || '').toLowerCase();
      const normState = normalizeState(ch.state).toLowerCase();
      const abbrState = getStateAbbr(ch.state).toLowerCase();

      let matchesFilter = true;
      if (currentFilter !== 'all') {
        if (currentFilter === 'active') {
          matchesFilter = status.includes('active');
        } else if (currentFilter === 'launching') {
          matchesFilter = status.includes('launch') || status.includes('form');
        } else if (currentFilter === 'high-school') {
          matchesFilter = schoolType.includes('high') || school.includes('high');
        } else if (currentFilter === 'middle-school') {
          matchesFilter = schoolType.includes('middle') || school.includes('middle');
        } else {
          const filterLower = currentFilter.toLowerCase();
          matchesFilter = state.includes(filterLower) || 
                          normState.includes(filterLower) || 
                          abbrState === filterLower || 
                          chName.includes(filterLower);
        }
      }

      const matchesSearch = !q ||
        chName.includes(q) ||
        school.includes(q) ||
        city.includes(q) ||
        state.includes(q) ||
        normState.includes(q) ||
        abbrState === q ||
        events.includes(q);

      return matchesFilter && matchesSearch;
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} of ${chapters.length} chapters`;
    }

    // 1. Render Dossier Cards
    if (cardsContainer) {
      if (filtered.length === 0) {
        cardsContainer.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--surface); border-radius: var(--radius-xl); border: 2px dashed var(--surface-border);">
            <h3 style="font-family: var(--font-serif); margin-bottom: 0.5rem; font-size: 1.4rem; color: var(--navy-dark);">No chapters found matching "${searchQuery}"</h3>
            <p style="color: var(--text-muted); max-width: 480px; margin: 0 auto 1.5rem;">Try another search term or reset your active filters.</p>
            <button class="btn btn-secondary btn-sm" onclick="window.resetChapterTrackerFilters && window.resetChapterTrackerFilters();">Reset Filters</button>
          </div>
        `;
      } else {
        cardsContainer.innerHTML = filtered.map(ch => {
          const chName = ch.chapter_name || ch.chapterName || 'ETC Chapter';
          const school = ch.school_name || ch.schoolsWorkedWith || 'Partner School Network';
          const city = ch.city || 'Regional';
          const state = ch.state || 'NC';
          const year = ch.year_founded || ch.yearFounded || 2025;
          const students = ch.students_count || ch.studentsCount || ch.studentsImpacted || '15+';
          const isLaunching = (ch.status || '').toLowerCase().includes('launch') || (ch.status || '').toLowerCase().includes('form');
          const statusLabel = isLaunching ? 'Launching Soon' : 'Active Chapter';
          const beaconStyle = isLaunching ? 'background-color: var(--warning);' : 'background-color: var(--success);';
          const statusBadgeStyle = isLaunching 
            ? 'background: rgba(217, 119, 6, 0.1); color: var(--warning); border-color: rgba(217, 119, 6, 0.25);' 
            : 'background: rgba(5, 150, 105, 0.1); color: var(--success); border-color: rgba(5, 150, 105, 0.2);';

          const eventsRaw = ch.events_offered || ch.eventsOffered || ['Public Forum', 'Original Oratory'];
          const eventsArr = Array.isArray(eventsRaw) ? eventsRaw : eventsRaw.split(',').map(s => s.trim());
          const email = ch.contact_email || ch.contact || (ch.contactInfo && ch.contactInfo.includes('@') ? (ch.contactInfo.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/) || [])[0] : '') || 'elevatedebateusa@gmail.com';
          const leads = ch.student_lead_name || ch.advisor_name || 'Regional Coordinator';

          const rawInsta = ch.instagram_handle || ch.instagram || ch.socialMedia || '';
          let instaHandle = (rawInsta || '').trim();
          if (instaHandle && !instaHandle.startsWith('@') && !instaHandle.startsWith('http')) {
            instaHandle = '@' + instaHandle;
          }
          const instaUrl = instaHandle 
            ? (instaHandle.startsWith('http') ? instaHandle : `https://www.instagram.com/${instaHandle.replace('@', '')}/`) 
            : '';

          return `
            <div class="chapter-card-item">
              <div class="chapter-card-top-badges">
                <span class="chapter-status-pill" style="${statusBadgeStyle}">
                  <span class="status-beacon" style="${beaconStyle}"></span>
                  ${statusLabel}
                </span>
                <span class="chapter-year-badge">Est. ${year}</span>
              </div>

              <div class="chapter-identity-wrap">
                <h3 class="chapter-card-title" style="font-family: var(--font-serif); font-size: 1.45rem; color: var(--navy-dark);">${chName}</h3>
                <p style="font-size: 0.88rem; color: var(--text-muted); font-weight: 600;">
                  ${school} • ${city}, ${state}
                </p>
              </div>

              <div class="docket-events-grid" style="margin: 0.5rem 0;">
                ${eventsArr.map(e => `<span class="event-chip">${e}</span>`).join('')}
              </div>

              <div style="background: var(--surface-alt); border-radius: var(--radius-md); padding: 0.85rem 1rem; border: 1px solid var(--surface-border-subtle); font-size: 0.82rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
                  <span style="color: var(--text-muted); font-weight: 600;">Active Debaters:</span>
                  <strong style="color: var(--navy-dark);">${students} students</strong>
                </div>
                <div style="display: flex; justify-content: space-between; ${instaHandle ? 'margin-bottom: 0.35rem;' : ''}">
                  <span style="color: var(--text-muted); font-weight: 600;">Coordinator / Lead:</span>
                  <strong style="color: var(--navy-dark);">${leads}</strong>
                </div>
                ${instaHandle ? `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: var(--text-muted); font-weight: 600;">Instagram:</span>
                  <a href="${instaUrl}" target="_blank" rel="noopener noreferrer" style="color: #E1306C; font-weight: 700; display: inline-flex; align-items: center; gap: 0.3rem; text-decoration: none;">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    ${instaHandle}
                  </a>
                </div>
                ` : ''}
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.85rem; border-top: 1px solid var(--surface-border-subtle); flex-wrap: wrap; gap: 0.6rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                  <a href="mailto:${email}" style="font-size: 0.82rem; font-weight: 700; color: var(--accent); display: inline-flex; align-items: center; gap: 0.35rem; text-decoration: none; padding: 0.3rem 0.65rem; background: rgba(185, 28, 28, 0.08); border-radius: 4px; border: 1px solid rgba(185, 28, 28, 0.2);">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    Contact Lead
                  </a>
                  <a href="mailto:${email}" style="font-size: 0.82rem; font-weight: 600; color: var(--navy-dark); text-decoration: underline; word-break: break-all;">
                    ${email}
                  </a>
                </div>
                ${instaHandle ? `
                <a href="${instaUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 0.8rem; font-weight: 700; color: #E1306C; display: inline-flex; align-items: center; gap: 0.25rem; text-decoration: none;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  ${instaHandle}
                </a>
                ` : `
                <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-light); text-transform: uppercase;">
                  Verified Chapter
                </span>
                `}
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // 2. Render Registry Table
    if (tableBody) {
      tableBody.innerHTML = filtered.map(ch => {
        const chName = ch.chapter_name || ch.chapterName || 'ETC Chapter';
        const school = ch.school_name || ch.schoolsWorkedWith || '-';
        const city = ch.city || 'Regional';
        const state = ch.state || 'NC';
        const year = ch.year_founded || ch.yearFounded || 2025;
        const students = ch.students_count || ch.studentsCount || ch.studentsImpacted || '15+';
        const level = ch.school_type || ch.schoolType || 'High School';
        const leads = ch.student_lead_name || ch.advisor_name || 'Regional Coordinator';
        const isLaunching = (ch.status || '').toLowerCase().includes('launch') || (ch.status || '').toLowerCase().includes('form');
        const statusLabel = isLaunching ? 'Launching' : 'Active';
        const statusColor = isLaunching ? 'var(--warning)' : 'var(--success)';

        const eventsRaw = ch.events_offered || ch.eventsOffered || ['Public Forum'];
        const eventsArr = Array.isArray(eventsRaw) ? eventsRaw : eventsRaw.split(',').map(s => s.trim());
        const email = ch.contact_email || ch.contact || (ch.contactInfo && ch.contactInfo.includes('@') ? (ch.contactInfo.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/) || [])[0] : '') || 'elevatedebateusa@gmail.com';
        const rawInsta = ch.instagram_handle || ch.instagram || ch.socialMedia || '';
        let instaHandle = (rawInsta || '').trim();
        if (instaHandle && !instaHandle.startsWith('@') && !instaHandle.startsWith('http')) {
          instaHandle = '@' + instaHandle;
        }
        const instaUrl = instaHandle 
          ? (instaHandle.startsWith('http') ? instaHandle : `https://www.instagram.com/${instaHandle.replace('@', '')}/`) 
          : '';

        return `
          <tr>
            <td>
              <strong style="color: var(--navy-dark); font-size: 0.95rem;">${chName}</strong>
              <div style="font-size: 0.8rem; color: var(--text-muted);">${school}</div>
            </td>
            <td><strong>${city}</strong>, ${state}</td>
            <td><span style="font-family: var(--font-mono); font-size: 0.75rem; background: var(--surface-alt); padding: 0.2rem 0.5rem; border-radius: var(--radius-sm); border: 1px solid var(--surface-border);">${level}</span></td>
            <td style="font-family: var(--font-mono); font-weight: 700;">${year}</td>
            <td><strong style="color: var(--accent);">${students} debaters</strong></td>
            <td>
              <div style="display: flex; gap: 0.3rem; flex-wrap: wrap;">
                ${eventsArr.slice(0, 3).map(e => `<span class="event-chip" style="font-size: 0.68rem; padding: 0.15rem 0.4rem;">${e}</span>`).join('')}
              </div>
            </td>
            <td>
              <span style="font-size: 0.85rem; font-weight: 600; color: var(--navy-dark);">${leads}</span>
              <div style="font-size: 0.78rem; margin-top: 0.25rem; display: flex; flex-direction: column; gap: 0.15rem;">
                <a href="mailto:${email}" style="color: var(--accent); text-decoration: underline;">${email}</a>
                ${instaHandle ? `<a href="${instaUrl}" target="_blank" rel="noopener noreferrer" style="color: #E1306C; font-weight: 600; display: inline-flex; align-items: center; gap: 0.25rem;"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>${instaHandle}</a>` : ''}
              </div>
            </td>
            <td>
              <span style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.8rem; font-weight: 700; color: ${statusColor};">
                <span class="status-beacon" style="background-color: ${statusColor};"></span>
                ${statusLabel}
              </span>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // Bind Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      filterAndDisplay();
    });
  }

  // Helper to reset tracker filters
  window.resetChapterTrackerFilters = function() {
    if (searchInput) searchInput.value = '';
    searchQuery = '';
    filterBtns.forEach(b => {
      if (b.getAttribute('data-filter') === 'active') {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
    currentFilter = 'active';
    filterAndDisplay();
  };

  // Bind Filter Pills (toggle active state)
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        currentFilter = 'all';
      } else {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter') || 'active';
      }
      filterAndDisplay();
    });
  });

  // Initial Filter & Render
  filterAndDisplay();
}

/**
 * ====================================================================
 * RESOURCES & CURRICULUM PAGE
 * ====================================================================
 */
function getResourceActionLabel(res) {
  const fmt = (res.format || '').toLowerCase();
  if (fmt.includes('pdf')) return 'Download PDF';
  if (fmt.includes('slide') || fmt.includes('presentation') || fmt.includes('deck')) return 'Download Slides';
  if (fmt.includes('doc')) return 'Download Document';
  if (fmt.includes('checklist')) return 'Download Checklist';
  if (fmt.includes('template')) return 'Download Template';
  if (fmt.includes('starter kit') || fmt.includes('kit')) return 'Download Starter Kit';
  return 'Download Guide';
}

async function renderResourcesPage() {
  const container = document.getElementById('resources-grid');
  const searchInput = document.getElementById('resource-search');
  const filterBtns = document.querySelectorAll('[data-category]');
  const countDisplay = document.getElementById('resource-count');

  if (countDisplay) {
    countDisplay.textContent = 'Loading verified curriculum archive...';
  }

  const resources = await loadAllResources();
  let currentCategory = 'all';
  let searchQuery = '';

  function filterAndDisplay() {
    if (!container) return;

    if (resources.length === 0) {
      if (countDisplay) {
        const isSheet = window.__ETC_RESOURCES_SOURCE === 'sheet';
        countDisplay.innerHTML = isSheet 
          ? '0 resources • <span style="color: var(--success); font-weight: 700;">● Live Synced</span>' 
          : '0 resources • <span style="color: var(--accent); font-weight: 600;">Google Sheet syncing...</span>';
      }
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4.5rem 1.5rem; background: var(--surface); border-radius: var(--radius-xl); border: 2px dashed var(--surface-border);">
          <div style="width: 52px; height: 52px; border-radius: 50%; background: var(--navy-wash); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
          <h3 style="font-family: var(--font-serif); margin-bottom: 0.6rem; font-size: 1.5rem; color: var(--navy-dark);">Curriculum Library Syncing with Google Sheets</h3>
          <p style="color: var(--text-muted); max-width: 520px; margin: 0 auto 1.75rem; line-height: 1.6; font-size: 0.95rem;">
            All previous placeholder documents have been removed. Add your curriculum materials, lesson slide decks, or starter kits directly to the <strong>Resources</strong> tab in your Google Sheet, and they will appear here automatically in real time!
          </p>
          <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
            <a href="https://docs.google.com/spreadsheets/d/1sJbN7keR-Fdi6pFJKnzG569WwNFXtfNgns4yiGOZNPY/edit" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="text-decoration: none;">
              Open Google Sheet to Add Rows &rarr;
            </a>
            <button class="btn btn-secondary btn-sm" onclick="window.openResourceManagerModal()">
              Add Document via Form
            </button>
          </div>
        </div>
      `;
      return;
    }

    const filtered = resources.filter(res => {
      const q = searchQuery.toLowerCase();
      const title = (res.title || '').toLowerCase();
      const desc = (res.description || '').toLowerCase();
      const format = (res.format || '').toLowerCase();
      const badge = (res.badge || '').toLowerCase();
      const cat = (res.category || '').toLowerCase();

      const matchesCategory = currentCategory === 'all' || cat === currentCategory;
      const matchesSearch = !q || title.includes(q) || desc.includes(q) || format.includes(q) || badge.includes(q);
      return matchesCategory && matchesSearch;
    });

    if (countDisplay) {
      const isSheet = window.__ETC_RESOURCES_SOURCE === 'sheet';
      const sourceTag = isSheet ? ' • <span style="color: var(--success); font-weight: 700;">● Live Synced</span>' : '';
      countDisplay.innerHTML = `Showing ${filtered.length} of ${resources.length} resources${sourceTag}`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--surface); border-radius: var(--radius-xl); border: 2px dashed var(--surface-border);">
          <h3 style="font-family: var(--font-serif); margin-bottom: 0.5rem; font-size: 1.4rem; color: var(--navy-dark);">No resources found matching "${searchQuery}"</h3>
          <p style="color: var(--text-muted); max-width: 480px; margin: 0 auto 1.5rem;">Try another keyword or view all curriculum modules.</p>
          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('resource-search').value=''; document.querySelector('[data-category=\\'all\\']').click();">Reset Filters</button>
        </div>
      `;
    } else {
      container.innerHTML = filtered.map((res, i) => {
        const catLabel = (res.categoryName || res.category || 'General').replace('-', ' ').toUpperCase();
        const badgeHtml = res.badge ? `<span class="badge" style="background: rgba(185, 28, 28, 0.08); color: var(--accent-crimson); font-family: var(--font-mono); font-size: 0.7rem; border: 1px solid rgba(185, 28, 28, 0.2);">${res.badge}</span>` : '';
        const detailsText = res.readTime || res.details || '';
        const rawUrl = res.downloadLink || res.link || '#';
        const downloadUrl = getDirectDownloadUrl(rawUrl);
        const isExternal = downloadUrl.startsWith('http');
        const actionLabel = getResourceActionLabel(res);

        return `
          <div class="resource-card reveal-on-scroll stagger-${(i % 3) + 1}">
            <div>
              <div class="resource-meta">
                <span class="badge" style="background: var(--surface-subtle); color: var(--navy-900); font-family: var(--font-mono); font-size: 0.72rem; border: 1px solid var(--surface-border);">${catLabel}</span>
                <div style="display: flex; align-items: center; gap: 0.4rem;">
                  ${badgeHtml}
                  <span class="resource-format" style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-crimson); font-weight: 700;">${res.format || 'Resource'}</span>
                </div>
              </div>
              <h3 class="resource-title" style="font-family: var(--font-serif); font-size: 1.25rem; line-height: 1.35; color: var(--navy-900); margin-bottom: 0.5rem;">${res.title}</h3>
              <p class="resource-desc" style="font-size: 0.88rem; line-height: 1.55; color: var(--slate-600); margin-bottom: 1.25rem;">${res.description || 'Turnkey forensics materials prepared for chapter mentors and debaters.'}</p>
            </div>

            <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--surface-border);">
              ${detailsText ? `
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.78rem; color: var(--slate-500); margin-bottom: 0.75rem; font-family: var(--font-mono);">
                  <span>Scope / Details</span>
                  <strong style="color: var(--navy-900);">${detailsText}</strong>
                </div>
              ` : ''}
              <a href="${downloadUrl}" 
                 class="btn btn-secondary btn-sm" 
                 style="width: 100%; justify-content: center; gap: 0.5rem; text-decoration: none; font-weight: 600;" 
                 ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}
                 ${!isExternal && downloadUrl === '#' ? 'onclick="window.handleEmptyResourceLink(event)"' : ''}
                 download>
                ${getIcon('download')} ${actionLabel} &rarr;
              </a>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      filterAndDisplay();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category') || 'all';
      filterAndDisplay();
    });
  });

  filterAndDisplay();
  setupScrollReveal();

  // Initialize Resource Manager Modal handlers
  setupResourceManagerModal(resources, () => {
    cachedResources = null;
    renderResourcesPage();
  });
}

/**
 * Resource Manager modal logic: Google Sheets sync, Quick Add form, export JSON
 */
function setupResourceManagerModal(allResources, refreshFn) {
  const modal = document.getElementById('resource-manager-modal');
  if (!modal) return;

  const indicator = document.getElementById('resource-sync-indicator');
  if (indicator) {
    if (window.__ETC_RESOURCES_SOURCE === 'sheet') {
      indicator.textContent = '● Google Sheets Active';
      indicator.style.color = 'var(--success)';
      indicator.style.background = 'rgba(5,150,105,0.1)';
    } else {
      indicator.textContent = '● Awaiting Sheet Rows';
      indicator.style.color = 'var(--slate-500)';
      indicator.style.background = 'var(--surface-alt)';
    }
  }

  window.openResourceManagerModal = function() {
    modal.classList.add('active');
    renderLocalResourcesList();
  };

  window.closeResourceManagerModal = function() {
    modal.classList.remove('active');
  };

  modal.addEventListener('click', (e) => {
    if (e.target === modal) window.closeResourceManagerModal();
  });

  window.handleEmptyResourceLink = function(e) {
    e.preventDefault();
    if (window.showToast) {
      window.showToast('Starter kit materials are sent directly upon chapter founding. Check Get Involved!', 'info', 5000);
    }
  };

  window.copySheetHeaders = function() {
    const headers = 'Title\tCategory\tFormat\tDescription\tLink\tBadge\tDetails';
    navigator.clipboard.writeText(headers).then(() => {
      if (window.showToast) window.showToast('Copied Google Sheet headers to clipboard!', 'success');
    }).catch(() => {
      if (window.showToast) window.showToast('Headers: Title | Category | Format | Description | Link | Badge | Details', 'info');
    });
  };

  window.copyCurrentResourceRow = function() {
    const title = (document.getElementById('res-input-title')?.value || '').trim();
    if (!title) {
      if (window.showToast) window.showToast('Please enter a Document Title first', 'warning');
      return;
    }
    const cat = document.getElementById('res-input-category')?.value || 'curriculum';
    const fmt = document.getElementById('res-input-format')?.value || 'PDF Guide';
    const link = document.getElementById('res-input-link')?.value || '';
    const desc = document.getElementById('res-input-desc')?.value || '';
    const badge = document.getElementById('res-input-badge')?.value || '';
    const details = document.getElementById('res-input-details')?.value || '';

    const tsv = `${title}\t${cat}\t${fmt}\t${desc}\t${link}\t${badge}\t${details}`;
    navigator.clipboard.writeText(tsv).then(() => {
      if (window.showToast) window.showToast('Row copied! Paste directly into your Google Sheet (Ctrl+V)', 'success');
    }).catch(() => {
      if (window.showToast) window.showToast('Copied row to clipboard!', 'info');
    });
  };

  window.handleAddNewResource = function(e) {
    e.preventDefault();
    const title = (document.getElementById('res-input-title')?.value || '').trim();
    const cat = document.getElementById('res-input-category')?.value || 'curriculum';
    const fmt = (document.getElementById('res-input-format')?.value || 'PDF Guide').trim();
    const link = (document.getElementById('res-input-link')?.value || '#').trim();
    const desc = (document.getElementById('res-input-desc')?.value || '').trim();
    const badge = (document.getElementById('res-input-badge')?.value || '').trim();
    const details = (document.getElementById('res-input-details')?.value || '').trim();

    if (!title || !link) {
      if (window.showToast) window.showToast('Title and Document Link are required', 'warning');
      return;
    }

    const newRes = {
      id: `local-res-${Date.now()}`,
      title,
      category: cat,
      categoryName: cat.replace('-', ' ').toUpperCase(),
      format: fmt,
      description: desc,
      link,
      downloadLink: link,
      badge,
      readTime: details,
      source: 'local'
    };

    try {
      const existing = JSON.parse(localStorage.getItem('etc_custom_resources') || '[]');
      existing.unshift(newRes);
      localStorage.setItem('etc_custom_resources', JSON.stringify(existing));
    } catch (err) {
      console.warn('Storage error:', err);
    }

    if (window.showToast) {
      window.showToast(`"${title}" published to website!`, 'success');
    }

    document.getElementById('add-resource-form')?.reset();
    renderLocalResourcesList();
    if (refreshFn) refreshFn();
  };

  window.clearCustomResources = function() {
    if (!confirm('Clear all locally added documents?')) return;
    localStorage.removeItem('etc_custom_resources');
    if (window.showToast) window.showToast('Cleared custom documents', 'info');
    renderLocalResourcesList();
    if (refreshFn) refreshFn();
  };

  window.deleteCustomResource = function(id) {
    try {
      let existing = JSON.parse(localStorage.getItem('etc_custom_resources') || '[]');
      existing = existing.filter(r => r.id !== id);
      localStorage.setItem('etc_custom_resources', JSON.stringify(existing));
      if (window.showToast) window.showToast('Document removed', 'info');
      renderLocalResourcesList();
      if (refreshFn) refreshFn();
    } catch (err) {}
  };

  window.exportResourcesJson = function() {
    loadAllResources().then(currList => {
      const blob = new Blob([JSON.stringify(currList, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resources.json';
      a.click();
      URL.revokeObjectURL(url);
      if (window.showToast) window.showToast('Downloaded resources.json!', 'success');
    });
  };

  function renderLocalResourcesList() {
    const tray = document.getElementById('local-resources-tray');
    const list = document.getElementById('local-resources-list');
    const countEl = document.getElementById('local-resources-count');
    if (!tray || !list) return;

    try {
      const localItems = JSON.parse(localStorage.getItem('etc_custom_resources') || '[]');
      if (localItems.length === 0) {
        tray.style.display = 'none';
        return;
      }
      tray.style.display = 'block';
      if (countEl) countEl.textContent = String(localItems.length);

      list.innerHTML = localItems.map(item => `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.35rem 0.6rem; background: var(--surface-subtle); border-radius: 4px; border: 1px solid var(--surface-border); font-size: 0.8rem;">
          <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 380px;">
            <strong>${item.title}</strong>
            <span style="color: var(--slate-400); font-size: 0.72rem; margin-left: 0.4rem;">${item.format}</span>
          </div>
          <button type="button" onclick="window.deleteCustomResource('${item.id}')" style="background: none; border: none; color: var(--accent); cursor: pointer; font-size: 0.75rem; padding: 0 0.25rem;">&times; Remove</button>
        </div>
      `).join('');
    } catch (e) {
      tray.style.display = 'none';
    }
  }
}

/**
 * ====================================================================
 * GET INVOLVED & APPLICATION PAGE
 * ====================================================================
 */
function renderGetInvolvedPage() {
  const config = window.SITE_CONFIG;
  if (!config) return;

  const tracksContainer = document.getElementById('tracks-grid');
  if (tracksContainer && config.involvementTracks) {
    tracksContainer.innerHTML = config.involvementTracks.map((track, i) => `
      <div class="track-card reveal-on-scroll stagger-${(i % 3) + 1}" id="${track.id}">
        <div class="track-icon-box" style="background: var(--navy-wash); color: var(--navy-dark);">
          ${getIcon(track.icon)}
        </div>
        <h3 class="track-title" style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--navy-dark);">${track.title}</h3>
        <p class="track-subtitle" style="font-weight: 600; color: var(--accent); font-size: 0.9rem;">${track.subtitle}</p>
        <p class="track-desc">${track.description}</p>
        <a href="${track.ctaLink}" class="btn btn-primary" style="margin-top: 1rem;">
          ${track.ctaText} &rarr;
        </a>
      </div>
    `).join('');
  }

  setupScrollReveal();
}

/**
 * ====================================================================
 * CONTACT & FAQS
 * ====================================================================
 */
function renderContactPage() {
  const config = window.SITE_CONFIG;
  if (!config) return;

  const faqContainer = document.getElementById('faq-accordion');
  if (faqContainer && config.faqs) {
    faqContainer.innerHTML = config.faqs.map((faq, i) => `
      <div class="faq-item reveal-on-scroll stagger-${(i % 2) + 1}">
        <button class="faq-question" aria-expanded="false" onclick="this.classList.toggle('active'); const ans = this.nextElementSibling; ans.style.display = ans.style.display === 'block' ? 'none' : 'block';">
          <span>${faq.question}</span>
          <span style="font-size: 1.25rem; font-weight: 300;">+</span>
        </button>
        <div class="faq-answer" style="display: none; padding: 1rem 1.25rem; color: var(--text-muted); line-height: 1.6;">
          <p>${faq.answer}</p>
        </div>
      </div>
    `).join('');
  }

  setupScrollReveal();
}

/**
 * Handle form submissions (Chapter Application & Contact Inquiry routing directly to email)
 */
function setupFormSubmissions() {
  document.querySelectorAll('form[data-interactive="true"]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formName = form.getAttribute('data-form-name') || 'Submission';
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : 'Submit';
      const destinationEmail = window.SITE_CONFIG?.org?.contactEmail || 'elevatethecircuitusa@gmail.com';
      const isChapterApp = formName.toLowerCase().includes('chapter');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending to ' + destinationEmail + '...';
      }

      const formData = new FormData(form);
      let emailPayload = {};
      let appPayload = null;

      if (isChapterApp) {
        const applicantName = (formData.get('applicant_name') || formData.get('name') || '').trim();
        const applicantEmail = (formData.get('applicant_email') || formData.get('email') || '').trim();
        const applicantRole = (formData.get('applicant_role') || 'High School Student Founder').trim();
        const schoolName = (formData.get('school_name') || '').trim();
        const city = (formData.get('city') || '').trim();
        const state = (formData.get('state') || '').trim().toUpperCase();
        const estStudents = formData.get('estimated_students') || '15';
        const debateFormat = formData.get('target_format') || 'Undecided / Please recommend for us';
        const notes = (formData.get('notes') || '').trim();

        appPayload = {
          applicant_name: applicantName,
          applicant_email: applicantEmail,
          applicant_role: applicantRole,
          school_name: schoolName,
          city: city,
          state: state,
          estimated_students: parseInt(estStudents, 10) || 15,
          notes: notes
        };

        emailPayload = {
          _subject: `New Chapter Application: ${schoolName} (${state}) - ${applicantName}`,
          _replyto: applicantEmail,
          _template: 'table',
          _captcha: 'false',
          'Applicant Name': applicantName,
          'Email Address': applicantEmail,
          'Applicant Role': applicantRole,
          'School / Organization': schoolName,
          'City': city,
          'State': state,
          'Estimated Students': estStudents,
          'Preferred Debate Format': debateFormat,
          'School Notes & Goals': notes || 'None provided',
          'Submitted At': new Date().toLocaleString()
        };
      } else {
        const name = (formData.get('name') || '').trim();
        const email = (formData.get('email') || '').trim();
        const role = (formData.get('role') || 'Student').trim();
        const subject = (formData.get('subject') || 'General Inquiry').trim();
        const message = (formData.get('message') || '').trim();

        emailPayload = {
          _subject: `New ETC Contact Message: ${subject} from ${name}`,
          _replyto: email,
          _template: 'table',
          _captcha: 'false',
          'Full Name': name,
          'Email Address': email,
          'Role': role,
          'Topic': subject,
          'Message': message,
          'Submitted At': new Date().toLocaleString()
        };
      }

      // 1. Keep a local offline copy in registry cache as safety backup
      try {
        if (isChapterApp && window.ETC_BACKEND && appPayload) {
          await window.ETC_BACKEND.submitChapterApplication(appPayload);
        }
      } catch (cacheErr) {
        console.warn('Local backup notice:', cacheErr);
      }

      // 2. Dispatch directly to elevatethecircuitusa@gmail.com
      try {
        const response = await fetch(`https://formsubmit.co/ajax/${destinationEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(emailPayload)
        });

        const result = await response.json().catch(() => ({}));

        if (response.ok && (result.success === 'true' || result.success === true)) {
          const successMsg = isChapterApp 
            ? `Chapter application submitted! It has been delivered directly to ${destinationEmail}.` 
            : `Message sent! It has been delivered directly to ${destinationEmail}.`;
          window.showToast(successMsg, 'success', 6000);
          form.reset();
        } else if (result.message && result.message.toLowerCase().includes('activation')) {
          window.showToast(`FormSubmit needs 1-time activation: Open elevatethecircuitusa@gmail.com (check Spam/Updates) and click "Activate Form"!`, 'warning', 9000);
          form.reset();
        } else if (result.message && result.message.toLowerCase().includes('web server')) {
          window.showToast(`Notice: Browsing directly as a local file (file://) is blocked by email security. Once deployed to the web (or run on localhost), emails deliver directly to ${destinationEmail}.`, 'warning', 8000);
        } else {
          throw new Error(result.message || 'Submission error');
        }
      } catch (err) {
        console.warn('Submission notice:', err);
        window.showToast(`Application saved to local registry. To deliver emails to ${destinationEmail}, ensure the site is running on a web server and FormSubmit is activated in Gmail.`, 'info', 7000);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }
    });
  });
}

/**
 * Mobile Navigation Toggle
 */
function setupMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const navHeader = document.querySelector('.site-header');
  if (!toggleBtn || !navHeader) return;

  toggleBtn.addEventListener('click', () => {
    navHeader.classList.toggle('mobile-nav-active');
  });
}

/**
 * Keyboard Shortcuts ('/' to focus search, Esc to close modals)
 */
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      const searchInput = document.getElementById('chapter-search') || document.getElementById('resource-search');
      if (searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    }
    if (e.key === 'Escape') {
      window.closeAuthModal();
      window.closeRegisterChapterModal();
    }
  });
}

/**
 * Smooth Number Counter Animation
 */
function animateCounter(el, targetStr, duration = 1000) {
  if (!el) return;
  const str = String(targetStr || '').trim();
  const match = str.match(/^([^\d]*)(\d+)(.*)$/);
  if (!match) {
    el.textContent = str;
    return;
  }

  const prefix = match[1] || '';
  const targetNum = parseInt(match[2], 10);
  const suffix = match[3] || '';

  if (targetNum === 0) {
    el.textContent = str;
    return;
  }

  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = Math.floor(ease * targetNum);
    el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = `${prefix}${targetNum.toLocaleString()}${suffix}`;
    }
  }
  requestAnimationFrame(update);
}

/**
 * Scroll Reveal Observer
 */
function setupScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}
