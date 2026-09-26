const projectsData = [
  {
    id: 'kajal-naina-erp',
    title: 'Kajal Naina — Multi-Tenant Retail ERP',
    category: 'Enterprise',
    period: '2026 — Present',
    tags: ['React', '.NET 8', 'SQL Server'],
    preview: { gradientClass: 'bg-gradient-to-br from-indigo-600 via-violet-700 to-slate-900' },
    description:
      'Multi-outlet retail ERP with FIFO inventory, double-entry accounting, automated voucher workflows, and POS integration.',
    challenge:
      'Retail clients needed unified stock, purchasing, and sales tracking across outlets without duplicating data entry or losing auditability.',
    solution:
      'Implemented multi-tenant architecture on .NET and SQL Server with React dashboards for inventory, accounting, and point-of-sale flows.',
    result:
      'A single system supports multiple outlets with consistent inventory logic, financial controls, and operational visibility.',
    slug: 'kajal-naina-erp',
    liveUrl: null,
    githubUrl: null,
    hasCaseStudy: true,
  },
  {
    id: 'venue-booking-platform',
    title: 'Venue Booking Platform',
    category: 'Marketplace',
    period: '2025 — 2026',
    tags: ['React', '.NET', 'REST APIs'],
    preview: { gradientClass: 'bg-gradient-to-br from-sky-600 via-cyan-700 to-slate-900' },
    description:
      'Marketplace for venue discovery and booking with advanced filters, package customisation, and provider admin tooling.',
    challenge:
      'Venue providers needed discovery, flexible packages, and operational control while customers expected trustworthy booking flows.',
    solution:
      'Built search and booking UX on React with a .NET backend; admin portal covers inventory, bookings, payments, and analytics.',
    result:
      'Streamlined booking decisions and gave providers clearer visibility into revenue and utilisation.',
    slug: 'venue-booking-platform',
    liveUrl: null,
    githubUrl: null,
    hasCaseStudy: true,
  },
  {
    id: 'duty-chart-website',
    title: 'Duty Chart Management System',
    category: 'Internal Tool',
    period: '2025 — 2026',
    tags: ['React', 'Node.js', 'MySQL'],
    preview: { gradientClass: 'bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900' },
    description:
      'Employee duty management with role-based access, task assignment, and dashboard views for office operations.',
    challenge:
      'NTC Jawalakhel lacked a central system for duty allocation and status tracking across teams.',
    solution:
      'Delivered React dashboards with RBAC, task modules, and manager-friendly assignment workflows backed by Node.js and MySQL.',
    result:
      'Reduced coordination friction and improved transparency for duty planning.',
    slug: 'duty-chart-website',
    liveUrl: null,
    githubUrl: null,
    hasCaseStudy: true,
  },
  {
    id: 'sachcho-cms',
    title: 'Sachcho — CMS Web App',
    category: 'CMS',
    period: '2026',
    tags: ['React', 'Prismic', 'Headless CMS'],
    preview: { gradientClass: 'bg-gradient-to-br from-fuchsia-600 via-purple-700 to-slate-900' },
    description:
      'Content-managed web application for dynamic articles and site-wide content with editor-friendly Prismic integration.',
    challenge:
      'Non-technical staff needed to publish and update content without developer involvement.',
    solution:
      'React front end wired to Prismic for structured content, preview-friendly pages, and flexible editorial workflows.',
    result:
      'Faster publishing cycles with a maintainable, CMS-driven codebase.',
    slug: 'sachcho-cms',
    liveUrl: 'https://sachcho.com',
    githubUrl: null,
    hasCaseStudy: true,
  },
  {
    id: 'danfe-solutions-site',
    title: 'Danfe Solutions — Company Website',
    category: 'Marketing',
    period: '2026',
    tags: ['React', 'Tailwind CSS'],
    preview: { gradientClass: 'bg-gradient-to-br from-amber-500 via-orange-600 to-slate-900' },
    description:
      'Public marketing site for Danfe Solutions — responsive layout, service narrative, and performance-focused React implementation.',
    challenge:
      'The company needed a credible digital presence that reflects its product and services work.',
    solution:
      'Designed information architecture and component system in React with Tailwind for consistent responsive styling.',
    result:
      'A polished brand-facing site that supports client trust and lead generation.',
    slug: 'danfe-solutions-site',
    liveUrl: 'https://danfesolution.com',
    githubUrl: null,
    hasCaseStudy: true,
  },
  {
    id: 'himalayan-matrix',
    title: 'The Himalayan Matrix',
    category: 'CMS',
    period: '2026',
    tags: ['CMS', 'React', 'Content'],
    preview: { gradientClass: 'bg-gradient-to-br from-rose-500 via-red-700 to-slate-900' },
    description:
      'CMS-based web project developed and maintained at Danfe Solutions.',
    challenge:
      'Content-heavy delivery required reliable CMS workflows and maintainable front-end structure.',
    solution:
      'Built and maintained CMS-integrated pages with editorial flexibility and production deployment practices.',
    result:
      'Stable content operations with a structured, extensible front end.',
    slug: 'himalayan-matrix',
    liveUrl: null,
    githubUrl: null,
    hasCaseStudy: true,
  },
];

export default projectsData;
