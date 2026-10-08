/**
 * ====================================================================
 * WEBSITE CONFIGURATION (js/config.js)
 * ====================================================================
 * National initiative configuration and roster data.
 */

window.SITE_CONFIG = {
  // --- ORGANIZATION INFO ---
  org: {
    name: "Elevate the Circuit",
    shortName: "Elevate the Circuit",
    acronym: "ETC",
    badge: "Empowering Next-Gen Debaters",
    tagline: "Empowering Students to Find Their Voice & Lead",
    mission: "We partner with local middle and high schools to found thriving speech and debate chapters. From free curriculum kits and coaching workshops to practice scrimmage pairings, we ensure every student has the platform to be heard.",
    establishedYear: 2024,
    contactEmail: "elevatethecircuitusa@gmail.com",
    phone: "(555) 234-DEBATE",
    location: "National Initiative • Local Chapters Nationwide",
    logoText: "ELEVATE THE CIRCUIT",
    logoSubtext: "Youth Forensics League",
    logoUrl: "LOGO.png"
  },

  // --- THEME & APPEARANCE (Red & Dark Navy Forensics Brand) ---
  theme: {
    primaryColor: "#0a1128",      // Commanding Dark Navy
    primaryHover: "#152248",
    accentColor: "#b91c1c",       // Varsity Forensics Crimson Red
    accentHover: "#991b1b",
    bgColor: "#fcfbf9",           // Warm Archival Ivory Paper
    darkBgColor: "#070d1e",       // Midnight Slate Navy
    fontHeading: "'Newsreader', Georgia, 'Times New Roman', serif",
    fontBody: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
  },

  // --- SUPABASE POSTGRESQL & SSO BACKEND ---
  // Leave empty for local sandbox mode, or paste your Supabase Project URL & Anon Key
  supabase: {
    url: "",
    anonKey: "",
    mode: "sandbox"
  },

  // --- TOP ANNOUNCEMENT BANNER ---
  announcement: {
    show: true,
    badge: "New Chapter Cycle",
    text: "Applications for the upcoming semester are now open! Receive free starter kits and chapter workshop resources.",
    buttonText: "Start a Chapter",
    buttonLink: "get-involved.html#start-chapter"
  },

  // --- NAVIGATION LINKS ---
  navigation: [
    { title: "Overview", link: "index.html" },
    { title: "Chapter Tracker", link: "chapter-tracker.html" },
    { title: "Resources", link: "resources.html" },
    { title: "Get Involved", link: "get-involved.html" },
    { title: "Contact & FAQ", link: "contact.html" }
  ],

  // --- KEY IMPACT METRICS (Home Overview) ---
  stats: [
    { id: "stat-chapters", value: "2", label: "Active Chapters", detail: "North Carolina & Regional Member Hubs" },
    { id: "stat-students", value: "140+", label: "Students Impacted", detail: "Active debaters in weekly training" },
    { id: "stat-schools", value: "6+", label: "Partner Schools", detail: "Middle & high schools worked with" },
    { id: "stat-states", value: "2", label: "States Represented", detail: "North Carolina & California Circuits" }
  ],

  // --- LIVE GOOGLE SHEETS DATABASE ---
  // When enabled, the Chapter Tracker fetches live rows directly from your Google Sheet!
  googleSheet: {
    enabled: true,
    sheetId: "1sJbN7keR-Fdi6pFJKnzG569WwNFXtfNgns4yiGOZNPY",
    tabName: "Chapters" // Name of the sheet tab at the bottom (e.g. "Chapters" or "Sheet1")
  },

  // --- CHAPTER TRACKER DIRECTORY (FALLBACK & DEFAULT LIST) ---
  // Each chapter includes: Chapter Name, City, State, Year Founded, Students Impacted, Schools Worked With, Events Offered, Contact Info, Instagram (optional)
  chapters: [
    {
      id: "ch-01",
      chapterName: "Elevate Debate NC",
      city: "Charlotte",
      state: "North Carolina",
      yearFounded: "2025",
      studentsImpacted: "130+",
      students_count: 130,
      schoolsWorkedWith: "5 Partner Schools",
      schools_worked_with: 5,
      eventsOffered: "Original Oratory, Impromptu, Congressional Debate, Public Forum, Lincoln Douglas",
      contactInfo: "Derin Gulkanat and Ishan Saha • elevatedebateusa@gmail.com",
      contact_email: "elevatedebateusa@gmail.com",
      socialMedia: "@elevatethecircuit_charlotte",
      instagram: "@elevatethecircuit_charlotte",
      instagram_handle: "@elevatethecircuit_charlotte"
    },
    {
      id: "ch-02",
      chapterName: "Elevate Debate Sacramento",
      city: "Sacramento",
      state: "California",
      yearFounded: "2026",
      studentsImpacted: "10+",
      students_count: 10,
      schoolsWorkedWith: "1 Partner Schools",
      schools_worked_with: 1,
      eventsOffered: "Original Oratory, Congressional Debate, Public Forum",
      contactInfo: "Saanvi Nanda • elevatedebateusa@gmail.com",
      contact_email: "elevatedebateusa@gmail.com",
      socialMedia: "",
      instagram: "",
      instagram_handle: ""
    }
  ],

  // --- WHAT WE DO / CORE PILLARS ---
  pillars: [
    {
      icon: "books",
      title: "We Provide Resources",
      description: "Equipping students and educators with 100% free turnkey curriculum kits, topic briefs, judge rubrics, and starter materials."
    },
    {
      icon: "users",
      title: "Provide Coaching",
      description: "Connecting chapters with experienced varsity mentors and alumni coaches to train debaters in argument construction and public speaking."
    },
    {
      icon: "trophy",
      title: "Organize Tournaments",
      description: "Hosting accessible local and regional forensics competitions with certified judge pools, constructive feedback, and fee grants."
    },
    {
      icon: "school",
      title: "Start Chapters",
      description: "Providing turnkey guides and direct coordinator support to help students and faculty advisors found active speech and debate clubs."
    },
    {
      icon: "network",
      title: "Coordinate Multi-State Meetings",
      description: "Facilitating cross-regional assemblies and collaborative leadership sessions connecting debaters from across multiple states."
    },
    {
      icon: "mic",
      title: "Organize Practice Opportunities",
      description: "Structuring weekly practice debates, inter-school scrimmage pairings, and low-stakes sparring rounds to build real-time confidence."
    }
  ],


  // --- TESTIMONIALS / SPOTLIGHTS ---
  testimonials: [
    {
      quote: "Launching Elevate Debate in Charlotte allowed us to reach over 130 students across 5 partner schools. Elevate the Circuit gave us the curriculum structure, tournament frameworks, and national network to turn our vision into an active, thriving forensics community.",
      name: "Derin Gulkanat & Ishan Saha",
      role: "Chapter Founders & Directors",
      school: "Elevate Debate NC (Charlotte, NC)"
    },
    {
      quote: "Starting our middle school debate club felt daunting, but the starter kit broke every debate topic down into engaging, 45-minute club workshops. The kids are now articulate speakers and love our Friday practice scrimmages.",
      name: "Sarah Jenkins",
      role: "Faculty Advisor & Humanities Educator",
      school: "Partner Middle School, Charlotte, NC"
    },
    {
      quote: "Supporting younger debaters through Elevate the Circuit has been an incredible experience. Watching middle and high school students grow from timid speakers into fierce, analytical thinkers is truly inspiring.",
      name: "Marcus Chen",
      role: "Tournament Judge & Alumni Coach",
      school: "Alumni Forensics Coach"
    }
  ],

  // --- RESOURCES DIRECTORY (resources.html) ---
  // Comprehensive resource library across all categories, live-augmented by Google Sheets "Resources" tab
  resources: [
    {
      id: "res-1",
      title: "Official Chapter Starter Kit 2026",
      category: "starter-kits",
      categoryName: "Starter Kits",
      format: "PDF & Notion Template",
      badge: "Essential",
      description: "Everything you need to launch: Sample club constitution, school board approval letter template, first 4 meeting agendas, and recruitment flyers.",
      link: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      downloadLink: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      readTime: "Complete Package (ZIP / Docs)"
    },
    {
      id: "res-2",
      title: "12-Week Novice Debate Curriculum",
      category: "curriculum",
      categoryName: "Curriculum",
      format: "Slide Decks & Handouts",
      badge: "Popular",
      description: "Structured lesson plans covering argument construction (Claim-Warrant-Impact), rebuttal strategies, cross-examination, and flowing round notes.",
      link: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      downloadLink: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      readTime: "12 Modules"
    },
    {
      id: "res-3",
      title: "Middle School Debate Playbook: Spar & Mini-Debates",
      category: "middle-school",
      categoryName: "Middle School",
      format: "Guidebook (PDF)",
      badge: "Beginner-Friendly",
      description: "Fast-paced, high-energy debate games designed specifically for 6th-8th graders to build confidence without intimidating terminology.",
      link: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      downloadLink: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      readTime: "24 Pages"
    },
    {
      id: "res-4",
      title: "Public Forum (PF) Master Guide",
      category: "formats",
      categoryName: "Debate Formats",
      format: "Comprehensive Guide (PDF)",
      badge: "High School",
      description: "Complete breakdown of Public Forum timing, speaker responsibilities, evidence citation standards, and grand crossfire tactics.",
      link: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      downloadLink: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      readTime: "Comprehensive Guide"
    },
    {
      id: "res-5",
      title: "Lincoln-Douglas (LD) Value & Criterion Primer",
      category: "formats",
      categoryName: "Debate Formats",
      format: "Guidebook (PDF)",
      badge: "Philosophy & Ethics",
      description: "A beginner's guide to 1-on-1 philosophical debate: understanding ethical frameworks, utilitarianism, deontology, and resolution analysis.",
      link: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      downloadLink: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      readTime: "18 Pages"
    },
    {
      id: "res-6",
      title: "2026 Practice Motions & Topic Compendium",
      category: "topics",
      categoryName: "Topics & Motions",
      format: "Database / PDF",
      badge: "Updated Monthly",
      description: "100+ curated debate motions categorized by difficulty and theme (Technology, AI Ethics, Climate Policy, Education, Economics, Pop Culture).",
      link: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      downloadLink: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      readTime: "100+ Motions"
    },
    {
      id: "res-7",
      title: "Tournament Survival & Logistics Checklist",
      category: "tournaments",
      categoryName: "Tournaments",
      format: "Printable Checklist",
      badge: "Preparation",
      description: "Packing lists, Tabroom.com registration guide, tournament etiquette, timer apps, and how to read judge ballots constructively.",
      link: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      downloadLink: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      readTime: "Printable Checklist"
    },
    {
      id: "res-8",
      title: "Faculty Advisor & Parent Guide",
      category: "starter-kits",
      categoryName: "Starter Kits",
      format: "Doc / PDF",
      badge: "For Teachers",
      description: "A clear overview for teachers with zero debate experience. Explains time commitment, school insurance, chaperone requirements, and student leadership roles.",
      link: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      downloadLink: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      readTime: "10 Pages"
    }
  ],

  // --- GET INVOLVED TRACKS (get-involved.html) ---
  involvementTracks: [
    {
      id: "student",
      icon: "graduation-cap",
      title: "Students & Chapter Founders",
      targetAudience: "Middle & High School Students",
      description: "Ready to launch a club at your school? We equip you with everything: constitution drafts, curriculum, practice drills, and tournament prep guides.",
      benefits: [
        "Free physical and digital starter kit",
        "Comprehensive workshop guides and coaching kits",
        "Novice scrimmage pairings & practice rounds",
        "Leadership accreditation & chapter certificates"
      ],
      ctaText: "Start a Chapter at Your School",
      ctaAnchor: "#start-chapter"
    },
    {
      id: "volunteer",
      icon: "award",
      title: "Judges & Volunteer Coaches",
      targetAudience: "Experienced Debaters, Alumni & Tournament Judges",
      description: "Give back to the forensics community. Guide eager young debaters, run practice feedback rounds, and judge weekend tournaments.",
      benefits: [
        "Flexible 1-2 hours/week or tournament-by-tournament commitment",
        "Official volunteer service hours certification",
        "Judging rubrics and workshop training library access",
        "Shape the next generation of civic thinkers"
      ],
      ctaText: "Volunteer as a Judge or Coach",
      ctaAnchor: "#volunteer-signup"
    },
    {
      id: "educator",
      icon: "school",
      title: "Schools & Educators",
      targetAudience: "Teachers, Counselors & Administrators",
      description: "Empower your student body with extracurricular debate. We handle the curriculum, workshop training, and logistical support so your workload stays light.",
      benefits: [
        "Aligned with National ELA & Social Studies Standards",
        "Requires zero existing debate coaching experience",
        "Boosts school academic reputation and civic visibility",
        "Ongoing support from our regional coordinators"
      ],
      ctaText: "Partner Your School",
      ctaAnchor: "#educator-contact"
    }
  ],

  // --- FREQUENTLY ASKED QUESTIONS (contact.html & home) ---
  faqs: [
    {
      question: "Does our school or faculty advisor need prior debate experience?",
      answer: "Absolutely not! Over 70% of our chapters are founded by students or teachers who had zero prior debate experience. Our step-by-step curriculum, video tutorials, and dedicated coaching materials guide you through every single rule, format, and practice routine."
    },
    {
      question: "Are your kits, curriculum, and coaching resources truly 100% free?",
      answer: "Yes, 100% free for all public, charter, and non-profit middle and high schools. Our educational mission ensures that every school receives curriculum, starter materials, and scrimmage materials at zero cost."
    },
    {
      question: "What is the difference between middle school and high school chapters?",
      answer: "Middle school chapters focus on introductory SPAR debates, short speech games, and basic argument structure (emphasizing fun and public speaking confidence). High school chapters can choose between Public Forum (PF), Lincoln-Douglas (LD), or Congressional debate, and prepare for local and regional circuit tournaments."
    },
    {
      question: "How much time does running a chapter require each week?",
      answer: "Most chapters meet once a week for 60 to 75 minutes. In addition, student officers typically spend 30-45 minutes organizing weekly topics or reviewing workshop plans."
    },
    {
      question: "How do chapters receive onboarding and coaching support?",
      answer: "Once you submit our 'Start a Chapter' application, our coordinators reach out within 3 business days to provide onboarding materials, practice outlines, and schedule orientation workshops for your school club."
    },
    {
      question: "Can homeschool groups or community centers start a chapter?",
      answer: "Yes! While our primary focus is local middle and high schools, we also support regional homeschool co-ops, libraries, and youth community organizations."
    },
    {
      question: "How do practice scrimmages work?",
      answer: "Active chapters can request scrimmage pairings with nearby schools or participate in online practice sessions to test arguments in a supportive setting."
    }
  ],

  // --- RESOURCES DIRECTORY (resources.html) ---
  resources: [
    {
      id: "res-1",
      title: "Official Chapter Starter Kit 2026",
      category: "starter-kits",
      categoryName: "Starter Kits",
      format: "PDF & Notion Template",
      badge: "Essential",
      description: "Everything you need to launch: Sample club constitution, school board approval letter template, first 4 meeting agendas, and recruitment flyers.",
      downloadLink: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      readTime: "Complete Package (ZIP / Docs)"
    },
    {
      id: "res-2",
      title: "12-Week Novice Debate Curriculum",
      category: "curriculum",
      categoryName: "Curriculum",
      format: "Slide Decks & Handouts",
      badge: "Popular",
      description: "Structured lesson plans covering argument construction (Claim-Warrant-Impact), rebuttal strategies, cross-examination, and flowing round notes.",
      downloadLink: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      readTime: "12 Modules"
    },
    {
      id: "res-3",
      title: "Middle School Debate Playbook: Spar & Mini-Debates",
      category: "middle-school",
      categoryName: "Middle School",
      format: "Guidebook (PDF)",
      badge: "Beginner-Friendly",
      description: "Fast-paced, high-energy debate games designed specifically for 6th-8th graders to build confidence without intimidating terminology.",
      downloadLink: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      readTime: "24 Pages"
    },
    {
      id: "res-4",
      title: "Public Forum (PF) Master Guide",
      category: "formats",
      categoryName: "Debate Formats",
      format: "Comprehensive Guide (PDF)",
      badge: "High School",
      description: "Complete breakdown of Public Forum timing, speaker responsibilities, evidence citation standards, and grand crossfire tactics.",
      downloadLink: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      readTime: "Comprehensive Guide"
    },
    {
      id: "res-5",
      title: "Lincoln-Douglas (LD) Value & Criterion Primer",
      category: "formats",
      categoryName: "Debate Formats",
      format: "Guidebook (PDF)",
      badge: "Philosophy & Ethics",
      description: "A beginner's guide to 1-on-1 philosophical debate: understanding ethical frameworks, utilitarianism, deontology, and resolution analysis.",
      downloadLink: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      readTime: "18 Pages"
    },
    {
      id: "res-6",
      title: "2026 Practice Motions & Topic Compendium",
      category: "topics",
      categoryName: "Topics & Motions",
      format: "Database / PDF",
      badge: "Updated Monthly",
      description: "100+ curated debate motions categorized by difficulty and theme (Technology, AI Ethics, Climate Policy, Education, Economics, Pop Culture).",
      downloadLink: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      readTime: "100+ Motions"
    },
    {
      id: "res-7",
      title: "Tournament Survival & Logistics Checklist",
      category: "tournaments",
      categoryName: "Tournaments",
      format: "Printable Checklist",
      badge: "Preparation",
      description: "Packing lists, Tabroom.com registration guide, tournament etiquette, timer apps, and how to read judge ballots constructively.",
      downloadLink: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      readTime: "Printable Checklist"
    },
    {
      id: "res-8",
      title: "Faculty Advisor & Parent Guide",
      category: "starter-kits",
      categoryName: "Starter Kits",
      format: "Doc / PDF",
      badge: "For Teachers",
      description: "A clear overview for teachers with zero debate experience. Explains time commitment, school insurance, chaperone requirements, and student leadership roles.",
      downloadLink: "https://drive.google.com/drive/u/3/folders/1cZPMLz2QSXD0vFvD6qlgTShHg0rGPBM_",
      readTime: "10 Pages"
    }
  ],

  // --- FOOTER LINKS & DETAILS ---
  footer: {
    description: "Elevate the Circuit is an educational initiative dedicated to democratizing speech and debate across middle and high schools nationwide.",
    copyrightYear: 2026,
    socials: [
      { name: "Instagram", url: "https://instagram.com", icon: "instagram" },
      { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
      { name: "YouTube", url: "https://youtube.com", icon: "youtube" },
      { name: "GitHub", url: "https://github.com", icon: "github" }
    ],
    quickLinks: [
      { name: "About & Mission", url: "index.html" },
      { name: "Chapter Tracker", url: "chapter-tracker.html" },
      { name: "Free Resource Library", url: "resources.html" },
      { name: "Start a Chapter", url: "get-involved.html#start-chapter" },
      { name: "Volunteer & Judge", url: "get-involved.html#volunteer-signup" },
      { name: "Contact & FAQ", url: "contact.html" }
    ]
  }
};
