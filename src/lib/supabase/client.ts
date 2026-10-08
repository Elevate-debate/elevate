'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { Chapter, ChapterApplication, Profile } from '@/types/database';

export const DEFAULT_CHAPTERS: Chapter[] = [
  {
    id: 'ch-01',
    chapter_name: 'Elevate Debate NC',
    school_name: 'Charlotte Partner Schools Consortium',
    city: 'Charlotte',
    state: 'NC',
    region: 'Southeast',
    school_type: 'High School',
    status: 'Active',
    year_founded: 2025,
    students_count: 130,
    schools_worked_with: 5,
    events_offered: ['Original Oratory', 'Impromptu', 'Congressional Debate', 'Public Forum', 'Lincoln Douglas'],
    advisor_name: 'Regional Faculty Advisor',
    student_lead_name: 'Derin Gulkanat & Ishan Saha',
    contact_email: 'elevatedebateusa@gmail.com',
    instagram_handle: '@elevatedebatenc',
    notes: 'Flagship founding chapter empowering 5 partner schools with weekly training rounds and coaching.'
  }
];

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || (typeof window !== 'undefined' ? localStorage.getItem('etc_supabase_url') || '' : '');
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || (typeof window !== 'undefined' ? localStorage.getItem('etc_supabase_anon_key') || '' : '');

  if (!url || !key || !url.startsWith('http')) {
    return null;
  }

  return createBrowserClient(url, key);
}

const DISALLOWED_CHAPTERS = [
  'Triangle Forensics Collective',
  'Piedmont Middle Speech League',
  'Metro Atlanta Forensics Initiative',
  'Chesapeake Debate Guild'
];

export async function fetchGoogleSheetChapters(): Promise<Chapter[] | null> {
  const sheetId = '1sJbN7keR-Fdi6pFJKnzG569WwNFXtfNgns4yiGOZNPY';
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=Chapters`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const csvText = await res.text();
    const rows: string[][] = [];
    let currentRow: string[] = [''];
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
    if (rows.length < 2) return null;

    const headers = rows[0].map((h) => (h || '').trim().toLowerCase());
    const getIdx = (keywords: string[]) => headers.findIndex((h) => keywords.some((k) => h.includes(k)));

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

    const list: Chapter[] = [];
    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      const name = (row[nameIdx >= 0 ? nameIdx : 0] || '').trim();
      if (!name) continue;

      const rawContact = contactIdx >= 0 && row[contactIdx] ? row[contactIdx].trim() : 'elevatedebateusa@gmail.com';
      const emailMatch = rawContact.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      const email = emailMatch ? emailMatch[0] : rawContact;

      let rawSocial = socialIdx >= 0 && row[socialIdx] ? row[socialIdx].trim() : '';
      let instagram = rawSocial;
      if (instagram && !instagram.startsWith('@') && !instagram.startsWith('http')) {
        instagram = '@' + instagram;
      }

      list.push({
        id: `sheet-${r}`,
        chapter_name: name,
        school_name: schoolsIdx >= 0 && row[schoolsIdx] ? `${row[schoolsIdx]} Partner Schools` : 'Charlotte Partner Schools',
        city: cityIdx >= 0 && row[cityIdx] ? row[cityIdx].trim() : 'Charlotte',
        state: stateIdx >= 0 && row[stateIdx] ? row[stateIdx].trim() : 'NC',
        status: (statusIdx >= 0 && row[statusIdx] ? row[statusIdx].trim() : 'Active') as 'Active',
        year_founded: parseInt(yearIdx >= 0 ? row[yearIdx] : '2025', 10) || 2025,
        students_count: parseInt(String(debatersIdx >= 0 ? row[debatersIdx] : '130').replace(/\D/g, ''), 10) || 130,
        schools_worked_with: parseInt(schoolsIdx >= 0 ? row[schoolsIdx] : '5', 10) || 5,
        events_offered: eventsIdx >= 0 && row[eventsIdx] ? row[eventsIdx].split(',').map((s) => s.trim()).filter(Boolean) : ['Original Oratory', 'Congressional Debate', 'Public Forum'],
        student_lead_name: leadersIdx >= 0 && row[leadersIdx] ? row[leadersIdx].trim() : 'Derin Gulkanat and Ishan Saha',
        advisor_name: leadersIdx >= 0 && row[leadersIdx] ? row[leadersIdx].trim() : 'Derin Gulkanat and Ishan Saha',
        contact_email: email,
        instagram_handle: instagram,
      });
    }
    return list.length > 0 ? list : null;
  } catch {
    return null;
  }
}

export async function fetchChapters(): Promise<Chapter[]> {
  try {
    const sheetData = await fetchGoogleSheetChapters();
    if (sheetData && sheetData.length > 0) {
      return sheetData;
    }
  } catch (e) {}

  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('chapters')
        .select('*')
        .order('status', { ascending: true })
        .order('year_founded', { ascending: false });

      if (!error && data && data.length > 0) {
        const sanitized = (data as Chapter[]).filter(
          (c) => !DISALLOWED_CHAPTERS.includes(c.chapter_name)
        );
        if (sanitized.length > 0) return sanitized;
      }
    } catch (e) {
      console.warn('Supabase query error, fallback to cache:', e);
    }
  }

  if (typeof window !== 'undefined') {
    // Clear old legacy keys that contained mock data
    localStorage.removeItem('etc_chapters');
    localStorage.removeItem('etc_chapters_v2');
    localStorage.removeItem('etc_chapters_cache_v2');

    const cached = localStorage.getItem('etc_chapters_cache_v3');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          const sanitized = parsed.filter(
            (c: Chapter) => !DISALLOWED_CHAPTERS.includes(c.chapter_name)
          );
          if (sanitized.length > 0) return sanitized;
        }
      } catch (e) {}
    }
    localStorage.setItem('etc_chapters_cache_v3', JSON.stringify(DEFAULT_CHAPTERS));
  }

  return DEFAULT_CHAPTERS;
}

export async function createChapter(chapter: Partial<Chapter>): Promise<Chapter> {
  const supabase = createClient();
  if (supabase) {
    const { data, error } = await supabase
      .from('chapters')
      .insert([chapter])
      .select()
      .single();
    if (error) throw error;
    return data as Chapter;
  }

  // Local fallback
  const current = await fetchChapters();
  const newChapter: Chapter = {
    id: 'ch-' + Date.now(),
    chapter_name: chapter.chapter_name || 'New Chapter',
    school_name: chapter.school_name || 'School',
    city: chapter.city || 'City',
    state: chapter.state || 'NC',
    status: chapter.status || 'Active',
    year_founded: chapter.year_founded || new Date().getFullYear(),
    students_count: chapter.students_count || 15,
    events_offered: chapter.events_offered || ['Public Forum'],
    contact_email: chapter.contact_email || 'elevatethecircuitusa@gmail.com',
    student_lead_name: chapter.student_lead_name,
    notes: chapter.notes,
  };

  current.unshift(newChapter);
  if (typeof window !== 'undefined') {
    localStorage.setItem('etc_chapters_cache_v2', JSON.stringify(current));
  }
  return newChapter;
}

export async function submitChapterApplication(app: Partial<ChapterApplication>) {
  const supabase = createClient();
  if (supabase) {
    const { data, error } = await supabase
      .from('chapter_applications')
      .insert([app])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  // Local fallback
  if (typeof window !== 'undefined') {
    const saved = JSON.parse(localStorage.getItem('etc_applications_cache') || '[]');
    const newApp = { ...app, id: 'app-' + Date.now(), created_at: new Date().toISOString() };
    saved.unshift(newApp);
    localStorage.setItem('etc_applications_cache', JSON.stringify(saved));
    return newApp;
  }
}
