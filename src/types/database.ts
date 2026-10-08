export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'admin' | 'chapter_lead' | 'educator' | 'debater' | 'member';
  school_name?: string;
  state?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Chapter {
  id: string;
  chapter_name: string;
  school_name: string;
  city: string;
  state: string;
  region?: string;
  school_type?: 'High School' | 'Middle School' | 'Combined';
  status: 'Active' | 'Launching Soon' | 'In Formation';
  year_founded: number;
  students_count: number;
  schools_worked_with?: number;
  events_offered: string[];
  advisor_name?: string;
  student_lead_name?: string;
  contact_email: string;
  instagram_handle?: string;
  website_url?: string;
  notes?: string;
  created_by?: string;
  created_at?: string;
}

export interface ChapterApplication {
  id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_role: 'student' | 'educator' | 'parent' | 'alumni';
  school_name: string;
  city: string;
  state: string;
  estimated_students: number;
  target_formats?: string[];
  status?: 'pending' | 'under_review' | 'approved' | 'declined';
  notes?: string;
  created_at?: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'starter-kits' | 'curriculum' | 'middle-school' | 'formats' | 'topics' | 'tournaments';
  format_badge: string;
  description: string;
  download_url?: string;
  tags?: string[];
  is_featured?: boolean;
}

export interface ResolutionItem {
  event: string;
  code: string;
  title: string;
  quote: string;
  description: string;
}
