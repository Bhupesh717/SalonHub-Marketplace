# School for Schools (SFS) Website

A modern, professional website for School for Schools - an educational technology platform offering ERP solutions and TinkerTek Labs programs.

## Features

- **Multi-page responsive design** with Next.js 14 and React 18
- **SEO optimized** with meta tags, Open Graph, and semantic HTML
- **Modern UI** built with Tailwind CSS and shadcn/ui components
- **Smooth animations** for enhanced user experience
- **Contact forms** with validation and feedback
- **Static export** for easy deployment
- **TypeScript** for type safety
- **Node.js 18.19.1** compatible

## Tech Stack

- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS 3
- **Components**: shadcn/ui
- **Language**: TypeScript
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 18.19.1 or higher
- npm 9.0.0 or higher

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd sfs-website
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   ├── about/             # About Us page
│   ├── erp/               # ERP product page
│   ├── tinkertek/         # TinkerTek Labs page
│   ├── contact/           # Contact Us page
│   ├── privacy/           # Privacy Policy page
│   ├── terms/             # Terms of Service page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── header.tsx         # Navigation header
│   ├── footer.tsx         # Footer component
│   ├── testimonials.tsx   # Testimonials section
│   └── ui/                # shadcn/ui components
├── public/                # Static assets
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
└── styles/                # Additional stylesheets
\`\`\`

## Pages

### Home (`/`)
Landing page with hero section, key features, offerings, testimonials, and CTA.

### About Us (`/about`)
Company story, mission & vision, core values, team profiles, and achievements.

### ERP App (`/erp`)
Product features, core modules, benefits, and pricing tiers.

### TinkerTek Labs (`/tinkertek`)
Program overview, learning paths, resource kits, and student success stories.

### Contact Us (`/contact`)
Contact information, contact form, and FAQ section.

### Privacy Policy (`/privacy`)
Complete privacy policy covering data collection and user rights.

### Terms of Service (`/terms`)
Comprehensive terms covering usage and user responsibilities.

## SEO

All pages include:
- Unique meta titles and descriptions
- Keywords for search optimization
- Open Graph tags for social sharing
- Twitter card metadata
- Canonical URLs
- Semantic HTML structure

## Deployment

### Static Export (Recommended)

The project is configured for static export. Build and deploy:

\`\`\`bash
npm run build
\`\`\`

This generates an `out` folder with static files ready for deployment to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel automatically detects Next.js and deploys

## Environment Variables

Currently, no environment variables are required. The site is fully static.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized images with Unsplash placeholders
- Minified CSS and JavaScript
- Static export for fast loading
- No server-side rendering overhead

## License

Proprietary - School for Schools

## Support

For issues or questions, please contact support@schoolforschools.com

## Contributing

This is a proprietary project. Contact the development team for contribution guidelines.
