# Elevate the Circuit (ETC) - National Forensics Network

An institutional, high-performance website and chapter management platform for **Elevate the Circuit**, an educational initiative empowering middle and high school students to found thriving speech & debate chapters nationwide.

---

## 🏛️ What Changed: Eliminating "AI Slop" & Adding a Full Backend

### 1. Why Was This Previously a Static Website?
The original template was purely client-side static HTML with hardcoded mock arrays in a JavaScript file and an unauthenticated Google Sheets CSV hack. There was **no user authentication**, **no Single Sign-On (SSO)**, **no secure database**, **no row-level security (RLS)**, and **no member portal**.

### 2. Full Supabase PostgreSQL Backend & SSO
The platform is now powered by **Supabase**:
- **Single Sign-On (SSO)**: One-click sign-in via **Google OAuth**, **GitHub OAuth**, or **Email Magic Links**.
- **PostgreSQL Database**: Direct real-time schema for `chapters`, `chapter_applications`, `profiles`, and `resources`.
- **Row-Level Security (RLS)**: Public read-only access for directory browsing, with authenticated write access for verified student founders and administrators.
- **Auto User Profiles**: Postgres trigger automatically provisions member profiles with role assignments upon first Google/GitHub login.
- **Offline & Sandbox Mode**: Works immediately out of the box with an instant local database sandbox, allowing full testing of registration and search before entering API credentials.

### 3. Bespoke Collegiate Design (Red & Dark Navy)
Replaced the generic AI aesthetic (purple glowing gradient orbs, identical 3-card white boxes, and robotic copy) with an authentic, prestigious forensics institution visual identity:
- **Collegiate Forensics Palette**: Commanding **Dark Navy** (`#0a1128`) paired with **Varsity Forensics Red** (`#b91c1c`) and warm archival paper surfaces (`#fcfbf9`).
- **Editorial Typography**: High-contrast classic serif headings (*Newsreader*) with italicized rhetorical accents paired with sharp, disciplined grotesque typography (*Plus Jakarta Sans*) and monospaced docket metadata (*Space Grotesk*).
- **Authentic Debate Artifacts**: Live circuit ticker ribbon, national resolution dockets (Public Forum, Lincoln-Douglas, Congress), and official verified chapter dossiers.
- **Dual Chapter Tracker Views**: Switch between an executive **National Registry Table** and **Bespoke Chapter Dossier Cards**.

---

## 📁 Project Architecture

```text
ETC Website/
│
├── index.html            # Homepage (Live Ticker, Editorial Hero, Forensics Docket, Impact Stats)
├── chapter-tracker.html  # National Chapter Tracker (Table & Card View, Live Supabase sync)
├── resources.html        # Open Curriculum Hub & Downloadable Starter Kits
├── get-involved.html     # Chapter Starter Application & Mentorship Portal
├── contact.html          # Inquiries & Interactive Forensics FAQs
│
├── css/
│   └── styles.css        # Bespoke design system (Dark Navy & Varsity Red tokens, tables, modals)
│
├── js/
│   ├── supabase-client.js # ⭐ Supabase JS SDK, Google/GitHub SSO, and PostgreSQL query engine
│   ├── config.js         # Fallback data, organization info, and branding config
│   └── main.js           # Core application runtime, modal management, view switching & state
│
├── supabase-schema.sql   # ⭐ Full PostgreSQL DDL script with RLS policies and seed data
└── README.md             # Documentation
```

---

## ⚡ Connecting Your Supabase Project (2 Minutes)

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in your Supabase dashboard.
3. Open [`supabase-schema.sql`](file:///c:/Users/Ishan/OneDrive/Desktop/ETC%20Website/supabase-schema.sql), copy its contents, paste into the SQL Editor, and click **Run**. This creates:
   - `profiles` table + automatic trigger on auth
   - `chapters` table with RLS
   - `chapter_applications` table
   - Initial verified seed chapters (Elevate Debate NC, Triangle Forensics, etc.)
4. Go to **Project Settings** → **API** to copy your:
   - **Project URL** (e.g. `https://xyzcompany.supabase.co`)
   - **Project Anon Key** (e.g. `eyJhbGci...`)
5. Open the website, click the **`○ Supabase: Sandbox`** badge in the top navigation, paste your URL and Anon Key, and click **"Save & Connect Live DB"**.
6. That's it! Your site is now live with real PostgreSQL queries and cloud sync.

### Enabling Google SSO in Supabase
1. In your Supabase Dashboard, go to **Authentication** → **Providers** → **Google**.
2. Toggle **Enable Google provider**.
3. Add your Google Cloud OAuth Client ID and Secret (or follow the 3-step prompt in Supabase).
4. Users can now sign in with one click on the website!

---

## 🚀 How to Run Locally

You do not need any build tool or package manager:
1. In VS Code, right-click **`index.html`** → **"Reveal in File Explorer"** (or use VS Code **Live Preview** extension).
2. Open in your browser.
3. All ES Modules and Supabase client libraries load seamlessly via secure CDN.

---

## 📞 Support & Inquiries

Official contact: **`elevatethecircuitusa@gmail.com`**
