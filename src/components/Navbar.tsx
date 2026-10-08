'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Profile } from '@/types/database';

interface NavbarProps {
  onOpenAuth?: () => void;
  onOpenBackend?: () => void;
}

export default function Navbar({ onOpenAuth, onOpenBackend }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    if (supabase) {
      setIsConnected(true);
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user || null);
        if (session?.user) {
          supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
            .then(({ data }) => setProfile(data as Profile));
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
        setUser(session?.user || null);
      });
      return () => subscription.unsubscribe();
    } else {
      setIsConnected(false);
      const demoUser = localStorage.getItem('etc_demo_user_v2');
      if (demoUser) {
        try {
          const parsed = JSON.parse(demoUser);
          setUser(parsed);
          setProfile({
            id: parsed.id,
            email: parsed.email,
            full_name: parsed.user_metadata?.full_name || 'Circuit Debater',
            role: 'chapter_lead',
            avatar_url: parsed.user_metadata?.avatar_url || null,
          });
        } catch (e) {}
      }
    }
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('etc_demo_user_v2');
    setUser(null);
    setProfile(null);
    setUserDropdownOpen(false);
  };

  const navLinks = [
    { title: 'Overview', href: '/' },
    { title: 'Chapter Tracker', href: '/chapter-tracker' },
    { title: 'Resources', href: '/resources' },
    { title: 'Get Involved', href: '/get-involved' },
    { title: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#E6E1F9] border-b border-rule">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#0a1128] border border-[#b91c1c] text-[#b91c1c] flex items-center justify-center shadow-md">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m4 6 8-4 8 4" /><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
              <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" /><path d="M18 5v17" /><path d="M6 5v17" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xl leading-none text-[#0a1128] tracking-tight">
              Elevate the Circuit
            </span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#b91c1c] font-bold mt-1">
              National Forensics Network
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  isActive
                    ? 'text-[#b91c1c] font-bold border-b-2 border-[#b91c1c] pb-1'
                    : 'text-[#4b5563] hover:text-[#0a1128]'
                }`}
              >
                {link.title}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Supabase Status & SSO Profile */}
        <div className="flex items-center gap-3">
          {/* Supabase Status Pill */}
          <button
            onClick={() => onOpenBackend?.()}
            className="hidden sm:inline-flex items-center gap-2 bg-white border border-rule px-3 py-1.5 rounded-full font-mono text-xs font-semibold text-[#0a1128] hover:border-[#0a1128] transition-all shadow-xs"
            title="Configure Supabase Database"
          >
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <span>{isConnected ? 'Supabase: Live' : 'Supabase: Sandbox'}</span>
          </button>

          {/* User Auth Dock */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 bg-white border border-rule rounded-full pl-1.5 pr-3 py-1 hover:border-[#b91c1c] transition-all shadow-sm"
              >
                <div className="w-7 h-7 rounded-full bg-[#0a1128] text-white flex items-center justify-center text-xs font-bold overflow-hidden">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="User Avatar" className="w-full h-full object-cover" />
                  ) : (
                    (profile?.full_name || user.email || 'U').charAt(0).toUpperCase()
                  )}
                </div>
                <span className="text-xs font-bold text-[#0a1128] max-w-[100px] truncate">
                  {profile?.full_name || user.email?.split('@')[0]}
                </span>
                <span className="font-mono text-[9px] bg-[#fef2f2] text-[#b91c1c] font-bold px-1.5 py-0.5 rounded uppercase">
                  {profile?.role?.replace('_', ' ') || 'Member'}
                </span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-rule rounded-xl shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-rule">
                    <p className="font-bold text-sm text-[#0a1128]">{profile?.full_name || 'Member'}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/chapter-tracker"
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-paper"
                  >
                    Directory & Chapters
                  </Link>
                  <Link
                    href="/get-involved#start-chapter"
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-paper"
                  >
                    Start a Chapter
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-[#b91c1c] font-semibold hover:bg-[#fef2f2] border-t border-rule"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

          <Link
            href="/get-involved#start-chapter"
            className="hidden lg:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-b from-[#b91c1c] to-[#991b1b] text-white font-bold text-sm shadow-md hover:from-[#991b1b] hover:to-[#7f1d1d] transition-all"
          >
            Start a Chapter
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-black"
            aria-label="Toggle Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-rule bg-[#E6E1F9] px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold text-gray-700 hover:text-[#b91c1c]"
            >
              {link.title}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBackend?.(); }}
              className="text-left font-mono text-xs text-gray-600"
            >
              Database: {isConnected ? 'Supabase Live' : 'Supabase Sandbox'}
            </button>
            <Link
              href="/get-involved#start-chapter"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 bg-[#b91c1c] text-white font-bold rounded-lg text-sm"
            >
              Start a Chapter
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
