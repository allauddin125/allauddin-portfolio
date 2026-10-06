// Single source of truth for portfolio content.
// All content below is taken from the latest resume — do not add unverified claims.

import intercareImg from '../assets/projects/intercare.webp'
import musandamImg from '../assets/projects/musandam.webp'
import arpnaImg from '../assets/projects/arpna.webp'

export const profile = {
  name: 'Allauddin Ali',
  firstName: 'Allauddin',
  title: 'Software Developer | Frontend & React.js',
  role: 'Software Developer',
  heroHeadline: 'Frontend & React.js Developer',
  heroIntro:
    'I build responsive, production-ready web interfaces with React.js and JavaScript — reusable UI components, REST API integration and dynamic WordPress/ACF websites for live client projects.',
  currentRole: 'Software Developer at MSG – Ethical Webtech Services Pvt. Ltd.',
  focusAreas: ['React.js', 'JavaScript', 'Responsive UI', 'REST APIs', 'WordPress / ACF'],
  summary:
    'Software Developer with 1+ year of professional experience in React.js, JavaScript and frontend development, along with hands-on work in HTML5, CSS3, WordPress and REST API integration. Experienced in building responsive web interfaces and dynamic WordPress solutions. Familiar with PHP, Node.js and MySQL, with a focus on developing practical and scalable web solutions.',
  // Latest resume PDF served from public/. Replace the file (same name) to update it.
  resumeUrl: '/Allauddin-Ali.pdf',
  resumeFileName: 'Allauddin-Ali.pdf',
}

export const contact = {
  email: 'allauddinmfp1999@gmail.com',
  phoneDisplay: '+91 7463866125',
  whatsappUrl: 'https://wa.me/917463866125',
  linkedinUrl: 'https://www.linkedin.com/in/allauddin-ali',
  linkedinHandle: 'allauddin-ali',
  githubUrl: 'https://github.com/allauddin125',
  githubHandle: 'allauddin125',
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export const stats = [
  { value: '1+', label: 'Year Experience' },
  { value: 'React.js', label: 'Frontend' },
  { value: '15+', label: 'Live Projects' },
  { value: 'WordPress', label: 'CMS Experience' },
]

export const qualities = [
  {
    icon: 'code',
    title: 'Clean Code',
    text: 'Maintainable & scalable — readable, reusable UI components.',
  },
  {
    icon: 'responsive',
    title: 'Responsive Design',
    text: 'Mobile-first layouts that hold up across screen sizes.',
  },
  {
    icon: 'debug',
    title: 'Problem Solving',
    text: 'Debugging, bug fixes and frontend optimization.',
  },
  {
    icon: 'team',
    title: 'Team Collaboration',
    text: 'Working with design & product teams on client projects.',
  },
]

export const experience = [
  {
    role: 'Software Developer',
    company: 'MSG – Ethical Webtech Services Pvt. Ltd.',
    period: 'Aug 2025 – Present',
    current: true,
    points: [
      'Develop responsive web interfaces using HTML5, CSS3 and JavaScript, with practical experience building React.js pages and reusable UI components.',
      'Work on React.js frontend pages and components for an e-commerce project, integrating REST APIs to fetch and display dynamic data.',
      'Build and customize WordPress websites using custom themes and ACF, converting static layouts into dynamic, client-editable pages.',
      'Customize Elementor-based websites, handling frontend layouts, responsive improvements, feature updates and bug fixes.',
    ],
    tags: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'REST APIs', 'WordPress', 'ACF', 'Elementor'],
  },
]

export const skillGroups = [
  {
    icon: 'frontend',
    title: 'Frontend Development',
    featured: true,
    summary: 'Building responsive interfaces and reusable UI components for live client projects.',
    items: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'React.js',
      'Responsive Web Design',
      'Bootstrap',
      'Tailwind CSS',
    ],
  },
  {
    icon: 'api',
    title: 'API & Data',
    items: ['REST APIs', 'Fetch API', 'Axios', 'JSON'],
  },
  {
    icon: 'cms',
    title: 'CMS',
    items: ['WordPress', 'ACF', 'Elementor', 'WordPress Theme Customization'],
  },
  {
    icon: 'backend',
    title: 'Backend (Familiar)',
    items: ['PHP', 'Node.js', 'MySQL'],
  },
]

// Featured projects — keep exactly these three.
export const projects = [
  {
    id: 'intercare',
    title: 'Intercare Home Delivery',
    category: 'E-commerce Platform',
    image: intercareImg,
    url: 'https://intercare-homedelivery.ae/',
    tech: ['React.js', 'REST APIs', 'Axios / Fetch API'],
    contribution: [
      'React.js frontend',
      'Responsive UI',
      'Reusable components',
      'REST API integration',
      'Admin frontend',
    ],
    description:
      'Contributed to the React.js-based admin frontend, developing responsive pages and reusable UI components for an e-commerce platform. Integrated existing REST APIs with React components to fetch, manage and display dynamic data.',
    highlights: [
      'Contributed to the React.js-based admin frontend of an e-commerce platform.',
      'Developed responsive pages and reusable UI components.',
      'Integrated existing REST APIs with React components to fetch, manage and display dynamic data.',
    ],
  },
  {
    id: 'musandam',
    title: 'Musandam Tours',
    category: 'Travel & Tour Website',
    image: musandamImg,
    url: 'https://musandamtours.com/',
    tech: ['WordPress', 'PHP', 'ACF', 'Elementor', 'Bootstrap', 'Contact Form 7'],
    contribution: ['WordPress', 'ACF', 'Elementor', 'Responsive frontend', 'Dynamic tour content'],
    description:
      'Developed and customized a responsive WordPress website with dynamic tour package content using ACF. Integrated Contact Form 7 with package selection for tour bookings and enquiries, and customized responsive layouts using Bootstrap and Elementor.',
    highlights: [
      'Developed and customized a responsive WordPress website.',
      'Built dynamic tour package content using ACF.',
      'Integrated Contact Form 7 with package selection for tour bookings and enquiries.',
      'Customized responsive layouts using Bootstrap and Elementor.',
    ],
  },
  {
    id: 'arpna',
    title: 'Arpna Photography',
    category: 'Photography Website',
    image: arpnaImg,
    url: 'https://arpna.photography/',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'WordPress', 'ACF'],
    contribution: [
      'HTML5 / CSS3 / JavaScript',
      'WordPress',
      'ACF',
      'Static-to-dynamic WordPress implementation',
    ],
    description:
      'Converted static HTML, CSS and JavaScript pages into a responsive WordPress website. Implemented dynamic, client-editable content using Advanced Custom Fields (ACF) and customized responsive frontend sections according to design and content requirements.',
    highlights: [
      'Converted static HTML, CSS and JavaScript pages into a responsive WordPress website.',
      'Implemented dynamic, client-editable content using Advanced Custom Fields (ACF).',
      'Customized responsive frontend sections according to design and content requirements.',
    ],
  },
]

export const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Lovely Professional University',
    period: '2021 – 2023',
    score: 'CGPA: 7.86',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'L.N. Mishra College Of Business Management',
    period: '2018 – 2021',
    score: '72%',
  },
]

export const certifications = [
  { title: 'Responsive Web Design', issuer: 'freeCodeCamp' },
  { title: 'JavaScript', issuer: 'freeCodeCamp' },
]
