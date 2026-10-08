/**
 * ====================================================================
 * ELEVATE THE CIRCUIT - SUPABASE CLIENT & SSO AUTH ENGINE
 * ====================================================================
 * Handles connection to Supabase PostgreSQL, Google SSO, GitHub SSO,
 * Email Magic Links, Row-Level Security, and Real-time Chapter sync.
 * 
 * Powered by official Supabase JS SDK (ESM CDN).
 */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Default / fallback seed chapters for instant offline & sandbox operation
export const DEFAULT_CHAPTERS = [
  {
    id: "ch-01",
    chapter_name: "Elevate Debate NC",
    school_name: "Charlotte Partner Schools Consortium",
    city: "Charlotte",
    state: "NC",
    region: "Southeast",
    school_type: "High School",
    status: "Active",
    year_founded: 2025,
    students_count: 130,
    schools_worked_with: 5,
    events_offered: ["Original Oratory", "Impromptu", "Congressional Debate", "Public Forum", "Lincoln Douglas"],
    advisor_name: "Regional Faculty Advisor",
    student_lead_name: "Derin Gulkanat & Ishan Saha",
    contact_email: "elevatedebateusa@gmail.com",
    instagram_handle: "@elevatedebatenc",
    notes: "Flagship founding chapter empowering 5 partner schools with weekly scrimmage rounds and coaching."
  }
];

class SupabaseBackendEngine {
  constructor() {
    this.client = null;
    this.user = null;
    this.profile = null;
    this.isConnected = false;
    this.authListeners = [];
    this.storageKey = 'etc_chapters_cache_v3';
    this.userKey = 'etc_demo_user_v2';
    
    this.init();
  }

  getCredentials() {
    const url = localStorage.getItem('etc_supabase_url') || (window.SITE_CONFIG?.supabase?.url ?? '');
    const key = localStorage.getItem('etc_supabase_anon_key') || (window.SITE_CONFIG?.supabase?.anonKey ?? '');
    return { url: url.trim(), key: key.trim() };
  }

  saveCredentials(url, key) {
    if (url && key) {
      localStorage.setItem('etc_supabase_url', url.trim());
      localStorage.setItem('etc_supabase_anon_key', key.trim());
      this.init();
      return true;
    } else {
      localStorage.removeItem('etc_supabase_url');
      localStorage.removeItem('etc_supabase_anon_key');
      this.client = null;
      this.isConnected = false;
      this.notifyAuthChange();
      return false;
    }
  }

  async init() {
    const { url, key } = this.getCredentials();
    if (url && key && url.startsWith('http')) {
      try {
        this.client = createClient(url, key, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        });

        // Check active session
        const { data: { session }, error } = await this.client.auth.getSession();
        if (session?.user) {
          this.user = session.user;
          await this.loadUserProfile(this.user.id);
        }

        // Setup live auth state listener
        this.client.auth.onAuthStateChange(async (event, session) => {
          this.user = session?.user || null;
          if (this.user) {
            await this.loadUserProfile(this.user.id);
          } else {
            this.profile = null;
          }
          this.notifyAuthChange();
        });

        this.isConnected = true;
      } catch (err) {
        console.warn('[ETC Backend] Supabase init error, falling back to local sandbox:', err);
        this.client = null;
        this.isConnected = false;
      }
    } else {
      // Local Sandbox / Offline Mode
      this.isConnected = false;
      const savedUser = localStorage.getItem(this.userKey);
      if (savedUser) {
        try {
          this.user = JSON.parse(savedUser);
          this.profile = {
            id: this.user.id,
            email: this.user.email,
            full_name: this.user.user_metadata?.full_name || 'Circuit Debater',
            role: this.user.user_metadata?.role || 'chapter_lead',
            avatar_url: this.user.user_metadata?.avatar_url || ''
          };
        } catch (e) {
          this.user = null;
        }
      }
    }

    this.notifyAuthChange();
  }

  async loadUserProfile(userId) {
    if (!this.client || !userId) return;
    try {
      const { data, error } = await this.client
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (data) {
        this.profile = data;
      } else {
        // Fallback profile if table record not created yet
        this.profile = {
          id: userId,
          email: this.user.email,
          full_name: this.user.user_metadata?.full_name || this.user.email.split('@')[0],
          avatar_url: this.user.user_metadata?.avatar_url || '',
          role: this.user.email === 'elevatethecircuitusa@gmail.com' ? 'admin' : 'chapter_lead'
        };
      }
    } catch (e) {
      console.warn('[ETC Backend] Profile fetch warning:', e);
    }
  }

  onAuth(cb) {
    this.authListeners.push(cb);
    cb({ user: this.user, profile: this.profile, isConnected: this.isConnected });
    return () => {
      this.authListeners = this.authListeners.filter(l => l !== cb);
    };
  }

  notifyAuthChange() {
    this.authListeners.forEach(cb => {
      try {
        cb({ user: this.user, profile: this.profile, isConnected: this.isConnected });
      } catch (e) {
        console.error(e);
      }
    });
  }

  // --- SSO & AUTHENTICATION METHODS ---

  async signInWithGoogle() {
    if (this.client) {
      const { data, error } = await this.client.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.href.split('#')[0]
        }
      });
      if (error) throw error;
      return data;
    } else {
      // Mock / Sandbox SSO login for immediate development testing
      const mockUser = {
        id: "demo-user-" + Math.random().toString(36).substring(2, 9),
        email: "student.founder@school.edu",
        user_metadata: {
          full_name: "Alex Rivera (Demo Lead)",
          avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
          role: "chapter_lead"
        }
      };
      this.user = mockUser;
      this.profile = {
        id: mockUser.id,
        email: mockUser.email,
        full_name: mockUser.user_metadata.full_name,
        role: "chapter_lead",
        avatar_url: mockUser.user_metadata.avatar_url
      };
      localStorage.setItem(this.userKey, JSON.stringify(mockUser));
      this.notifyAuthChange();
      return { user: mockUser };
    }
  }

  async signInWithGitHub() {
    if (this.client) {
      const { data, error } = await this.client.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: window.location.href.split('#')[0]
        }
      });
      if (error) throw error;
      return data;
    } else {
      return this.signInWithGoogle();
    }
  }

  async signInWithMagicLink(email) {
    if (this.client) {
      const { data, error } = await this.client.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.href.split('#')[0]
        }
      });
      if (error) throw error;
      return data;
    } else {
      const mockUser = {
        id: "demo-user-" + Math.random().toString(36).substring(2, 9),
        email: email,
        user_metadata: {
          full_name: email.split('@')[0].replace('.', ' '),
          role: "member"
        }
      };
      this.user = mockUser;
      this.profile = {
        id: mockUser.id,
        email: mockUser.email,
        full_name: mockUser.user_metadata.full_name,
        role: "member",
        avatar_url: ""
      };
      localStorage.setItem(this.userKey, JSON.stringify(mockUser));
      this.notifyAuthChange();
      return { user: mockUser };
    }
  }

  async signOut() {
    if (this.client) {
      await this.client.auth.signOut();
    }
    this.user = null;
    this.profile = null;
    localStorage.removeItem(this.userKey);
    this.notifyAuthChange();
  }

  // --- DATABASE & CHAPTER OPERATIONS ---

  async getChapters() {
    const DISALLOWED_CHAPTERS = [
      'Triangle Forensics Collective',
      'Piedmont Middle Speech League',
      'Metro Atlanta Forensics Initiative',
      'Chesapeake Debate Guild'
    ];

    if (this.client) {
      try {
        const { data, error } = await this.client
          .from('chapters')
          .select('*')
          .order('status', { ascending: true })
          .order('year_founded', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          const sanitized = data.filter(c => !DISALLOWED_CHAPTERS.includes(c.chapter_name));
          if (sanitized.length > 0) return sanitized;
        }
      } catch (err) {
        console.warn('[ETC Backend] Supabase chapters query failed, using cache:', err);
      }
    }

    // Clear legacy keys
    localStorage.removeItem('etc_chapters');
    localStorage.removeItem('etc_chapters_v2');
    localStorage.removeItem('etc_chapters_cache_v2');

    // Local / cached chapters fallback
    const cached = localStorage.getItem(this.storageKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          const sanitized = parsed.filter(c => !DISALLOWED_CHAPTERS.includes(c.chapter_name));
          if (sanitized.length > 0) return sanitized;
        }
      } catch (e) {}
    }

    // Default seed
    localStorage.setItem(this.storageKey, JSON.stringify(DEFAULT_CHAPTERS));
    return DEFAULT_CHAPTERS;
  }

  async createChapter(chapterPayload) {
    if (this.client && this.user) {
      const payload = {
        ...chapterPayload,
        created_by: this.user.id
      };
      const { data, error } = await this.client
        .from('chapters')
        .insert([payload])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }

    // Local sandbox save
    const current = await this.getChapters();
    const newChapter = {
      id: "ch-" + Date.now(),
      ...chapterPayload,
      year_founded: chapterPayload.year_founded || new Date().getFullYear(),
      created_at: new Date().toISOString()
    };
    current.unshift(newChapter);
    localStorage.setItem(this.storageKey, JSON.stringify(current));
    return newChapter;
  }

  async submitChapterApplication(appPayload) {
    if (this.client) {
      const payload = {
        ...appPayload,
        created_by: this.user?.id || null
      };
      const { data, error } = await this.client
        .from('chapter_applications')
        .insert([payload])
        .select()
        .single();
      if (error) throw error;
      return data;
    }

    // Local sandbox record
    const savedApps = JSON.parse(localStorage.getItem('etc_applications_cache') || '[]');
    const newApp = {
      id: "app-" + Date.now(),
      ...appPayload,
      submitted_at: new Date().toISOString(),
      status: 'pending'
    };
    savedApps.unshift(newApp);
    localStorage.setItem('etc_applications_cache', JSON.stringify(savedApps));
    return newApp;
  }
}

// Global Singleton Export
export const backend = new SupabaseBackendEngine();
window.ETC_BACKEND = backend;
