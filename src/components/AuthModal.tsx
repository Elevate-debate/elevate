'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleGoogleSSO = async () => {
    const supabase = createClient();
    if (supabase) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
        },
      });
      if (error) setMessage(error.message);
    } else {
      handleDemoLogin();
    }
  };

  const handleGitHubSSO = async () => {
    const supabase = createClient();
    if (supabase) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
        },
      });
      if (error) setMessage(error.message);
    } else {
      handleDemoLogin();
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const supabase = createClient();
    if (supabase) {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
        },
      });
      if (error) {
        setMessage(error.message);
      } else {
        setMessage(`Verification magic link dispatched to ${email}!`);
      }
    } else {
      handleDemoLogin();
    }
    setLoading(false);
  };

  const handleDemoLogin = () => {
    const mockUser = {
      id: 'demo-' + Math.random().toString(36).substring(2, 8),
      email: email || 'student.founder@school.edu',
      user_metadata: {
        full_name: 'Alex Rivera (Chapter Founder)',
        role: 'chapter_lead',
        avatar_url: '',
      },
    };
    localStorage.setItem('etc_demo_user_v2', JSON.stringify(mockUser));
    onClose();
    if (onSuccess) onSuccess();
    window.location.reload();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white border border-rule shadow-editorial w-full max-w-md p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ink-soft hover:text-ink p-1 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="eyebrow">Circuit Portal Authentication</span>
          <h3 className="font-serif text-2xl font-normal text-ink mt-2 mb-1.5">
            Sign in to Elevate the Circuit
          </h3>
          <p className="text-xs text-ink-soft leading-relaxed">
            Manage your school chapter roster, access coaching briefs, and view curriculum dispatches.
          </p>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-paper border border-rule text-ink text-xs font-mono">
            {message}
          </div>
        )}

        {/* SSO Providers */}
        <div className="space-y-2.5">
          <button
            onClick={handleGoogleSSO}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-rule bg-paper hover:bg-paper-deep hover:border-ink font-mono text-xs font-medium text-ink transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google SSO</span>
          </button>

          <button
            onClick={handleGitHubSSO}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-ink text-paper hover:bg-accent-dark font-mono text-xs font-medium transition-all border border-ink"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>Continue with GitHub</span>
          </button>
        </div>

        <div className="relative my-5 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-rule" />
          </div>
          <span className="relative bg-white px-3 font-mono text-[10px] uppercase tracking-wider text-ink-soft">
            or passwordless link
          </span>
        </div>

        {/* Magic Link Form */}
        <form onSubmit={handleMagicLink} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your school or team email..."
            required
            className="w-full bg-paper border border-rule px-3.5 py-2.5 text-xs font-mono text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-accent text-paper font-mono text-xs uppercase tracking-wider font-semibold hover:bg-accent-dark transition-colors border border-accent disabled:opacity-50"
          >
            {loading ? 'Sending link...' : 'Send Magic Link →'}
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-rule text-center">
          <button
            onClick={handleDemoLogin}
            className="text-xs font-mono text-ink-soft hover:text-ink underline decoration-rule hover:decoration-ink transition-colors"
          >
            ⚡ Instant Sandbox Login (Chapter Founder Demo)
          </button>
        </div>
      </div>
    </div>
  );
}
