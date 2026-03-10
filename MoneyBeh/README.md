# MoneyBeh Website

> Financial wellness without the stress. Clear decisions. Less stress. More freedom.

A modern, mobile-first companion website for the MoneyBeh app, featuring articles and podcast episodes about financial wellness and the path to financial freedom.

---

## 🚀 Current Features

### Pages
- **Home** - Hero, features overview, and CTA to download the app
- **Articles** - Browse all written content with category filters
- **Podcast** - Listen to podcast episodes with integrated audio player
- **About** - Founding story, manifesto, and mission
- **Individual Content Pages** - Read articles or listen to episodes

### Components
- **Global Audio Player** - Persistent player that works across page navigation
- **Responsive Navigation** - Mobile-first with hamburger menu
- **Feature Mockups** - Visual representations of Joy Fund, Safety Net, and Freedom Plan
- **Footer** - Links and branding

### Technical Highlights
- ✅ **SEO Optimized** - Meta tags, Open Graph, structured data, sitemap
- ✅ **Mobile-First Design** - Responsive across all devices
- ✅ **Accessibility** - Semantic HTML, proper heading hierarchy
- ✅ **Performance** - Fast loading, optimized assets
- ✅ **Brand Design System** - Custom color palette (seafoam, teal, sand, warm grays)

---

## 🛠 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS v4** - Styling
- **Lucide React** - Icons

---

## 💻 Local Development

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The site will be available at `http://localhost:5173`

---

## 🌐 Deployment

### Recommended: Vercel (Easiest)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Vite and deploy
   - Your site will be live at `your-project.vercel.app`

3. **Add Custom Domain**
   - In Vercel dashboard, go to Settings → Domains
   - Add `moneybeh.com`
   - Update your DNS records as instructed
   - Vercel handles SSL certificates automatically

### Alternative: Netlify

```bash
# Build the site
pnpm build

# Deploy to Netlify (one command)
npx netlify-cli deploy --prod
```

### After Deployment

**Update URLs in these files:**
1. `/src/app/utils/seo.ts` - Replace `https://moneybeh.com` with your actual domain
2. `/public/sitemap.xml` - Update all URLs
3. `/public/robots.txt` - Update sitemap URL

---

## 📝 Content Management System Integration

### Why Add a CMS?

Right now, all content (articles and podcast episodes) lives in `/src/app/data/content.ts`. This works, but:
- ❌ Requires coding to add/edit content
- ❌ No way to upload audio files
- ❌ Hard for non-technical team members to manage

A CMS solves this!

---

## 🎯 Recommended: Sanity CMS

### Why Sanity?

- **Free tier** - 3 users, unlimited API requests, 10GB bandwidth
- **Excellent media handling** - Upload and serve audio files
- **Studio in the cloud** - Edit content from anywhere
- **Real-time** - Changes appear instantly
- **Great React integration** - Purpose-built for modern web apps
- **Flexible** - Define your content structure exactly as you need it

### Setup Guide (30 minutes)

#### 1. Install Sanity CLI

```bash
npm install -g @sanity/cli
```

#### 2. Initialize Sanity Project

```bash
# In a new directory (or subdirectory of your project)
sanity init

# Choose:
# - Create new project
# - Default dataset configuration
# - Clean project with no predefined schemas
```

#### 3. Define Your Content Schema

Create `/sanity/schemas/article.ts`:

```typescript
export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Getting Started', value: 'getting-started' },
          { title: 'Growth', value: 'growth' },
          { title: 'Safety', value: 'safety' },
          { title: 'Spending', value: 'spending' }
        ]
      }
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime'
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ]
}
```

Create `/sanity/schemas/podcast.ts`:

```typescript
export default {
  name: 'podcast',
  title: 'Podcast Episode',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'episodeNumber',
      title: 'Episode Number',
      type: 'number'
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3
    },
    {
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      options: {
        accept: 'audio/*'
      }
    },
    {
      name: 'duration',
      title: 'Duration (in minutes)',
      type: 'number'
    },
    {
      name: 'showNotes',
      title: 'Show Notes',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Getting Started', value: 'getting-started' },
          { title: 'Growth', value: 'growth' },
          { title: 'Safety', value: 'safety' },
          { title: 'Spending', value: 'spending' }
        ]
      }
    }
  ]
}
```

#### 4. Deploy Sanity Studio

```bash
cd sanity
sanity deploy

# Choose a studio hostname, e.g., moneybeh
# Your studio will be available at: https://moneybeh.sanity.studio
```

#### 5. Install Sanity Client in Your Website

```bash
# In your main project directory
pnpm add @sanity/client @sanity/image-url
```

#### 6. Create Sanity Client

Create `/src/lib/sanity.ts`:

```typescript
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: 'YOUR_PROJECT_ID', // Find this in sanity.json
  dataset: 'production',
  useCdn: true, // Enable for faster, cached responses
  apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
```

#### 7. Fetch Content from Sanity

Update `/src/app/data/content.ts` to fetch from Sanity:

```typescript
import { sanityClient } from '../../lib/sanity';

export interface ContentItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  type: 'article' | 'podcast';
  publishedAt: string;
  audioFile?: {
    asset: {
      url: string;
    };
  };
  duration?: number;
  content?: any[]; // Rich text from Sanity
}

// Fetch all articles
export async function getArticles(): Promise<ContentItem[]> {
  const query = `*[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    publishedAt,
    content
  }`;
  
  return sanityClient.fetch(query);
}

// Fetch all podcast episodes
export async function getPodcasts(): Promise<ContentItem[]> {
  const query = `*[_type == "podcast"] | order(episodeNumber desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    episodeNumber,
    publishedAt,
    "audioFile": audioFile.asset->url,
    duration,
    showNotes
  }`;
  
  return sanityClient.fetch(query);
}

// Fetch single content item by slug
export async function getContentBySlug(slug: string): Promise<ContentItem | null> {
  const query = `*[slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    publishedAt,
    content,
    "audioFile": audioFile.asset->url,
    duration,
    showNotes
  }`;
  
  return sanityClient.fetch(query, { slug });
}
```

#### 8. Update Your React Components

Use React Query for data fetching:

```bash
pnpm add @tanstack/react-query
```

Update components to use the async functions above.

---

## 🎨 Brand Colors

```css
/* Your custom palette is in /src/styles/theme.css */

--seafoam-500: #10B981;      /* "Do This" - primary actions */
--teal-600: #0891B2;          /* "Learn This" - educational */
--sand-400: #FCD34D;          /* "You Did It!" - celebrations */
--warm-gray-*: /* Foundation colors */
```

---

## 📁 Project Structure

```
/
├── public/
│   ├── robots.txt          # SEO: Search engine instructions
│   └── sitemap.xml         # SEO: Site structure for crawlers
├── src/
│   ├── app/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (Audio player)
│   │   ├── data/           # Static content (will move to CMS)
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions (SEO helpers)
│   │   ├── App.tsx         # App entry point
│   │   └── routes.ts       # Route configuration
│   └── styles/
│       ├── fonts.css       # Font imports
│       ├── theme.css       # Brand colors & design tokens
│       └── tailwind.css    # Tailwind directives
├── SEO-GUIDE.md           # SEO best practices
└── README.md              # This file
```

---

## 🔑 Environment Variables (When Using CMS)

Create `.env.local`:

```bash
# Sanity
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production

# Optional: Analytics
VITE_PLAUSIBLE_DOMAIN=moneybeh.com
```

Access in code:
```typescript
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
```

---

## 📋 Pre-Launch Checklist

### Content
- [ ] Add real podcast audio files
- [ ] Write all 29 articles/episodes
- [ ] Add author bios
- [ ] Create category descriptions

### SEO
- [ ] Update all URLs from `moneybeh.com` to your actual domain
- [ ] Add `og-image.png` to `/public/` (1200x630px)
- [ ] Add `logo.png` to `/public/`
- [ ] Generate complete sitemap with all content
- [ ] Test meta tags with [OpenGraph.xyz](https://www.opengraph.xyz/)
- [ ] Submit sitemap to Google Search Console

### Design
- [ ] Add favicon (`.ico`, `.svg`, and Apple touch icons)
- [ ] Test on real mobile devices
- [ ] Verify color contrast for accessibility
- [ ] Check all images have alt text

### Technical
- [ ] Set up error tracking (Sentry, LogRocket)
- [ ] Add analytics (Plausible, Fathom, Umami)
- [ ] Configure CDN/caching
- [ ] Test site speed with [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Set up monitoring/uptime checks

### Legal
- [ ] Add Privacy Policy page
- [ ] Add Terms of Service page
- [ ] Cookie consent banner (if using analytics)
- [ ] Update footer with legal links

---

## 🐛 Common Issues

### Audio Player Not Working
- Ensure audio files are in a supported format (MP3, OGG, WAV)
- Check browser console for CORS errors
- Verify file URLs are correct

### Routing Issues After Deploy
- Ensure your hosting provider redirects all routes to `index.html`
- Vercel/Netlify handle this automatically
- For other hosts, add a `_redirects` file

### CSS Not Loading
- Clear browser cache
- Check that Tailwind v4 is properly configured in `vite.config.ts`
- Verify `/src/styles/tailwind.css` imports are correct

---

## 🚀 Roadmap

### Phase 1: Launch (Current)
- ✅ Website structure
- ✅ SEO optimization
- ⏳ Deploy to production
- ⏳ Add CMS

### Phase 2: Content (Post-CMS)
- [ ] Publish all 29 episodes
- [ ] Add search functionality
- [ ] Email newsletter signup
- [ ] Content recommendations

### Phase 3: Community
- [ ] Comments on articles
- [ ] User stories/testimonials
- [ ] Community forum
- [ ] Social features

### Phase 4: Tools
- [ ] Interactive calculators
- [ ] Financial wellness quiz
- [ ] Progress trackers
- [ ] Mini web apps

---

## 📞 Support

- **Questions?** Review the SEO-GUIDE.md for deployment details
- **Sanity Help:** [Sanity Documentation](https://www.sanity.io/docs)
- **Vercel Deploy:** [Vercel Documentation](https://vercel.com/docs)

---

## 📄 License

Proprietary - © 2026 MoneyBeh. All rights reserved.

---

**Built with ❤️ for financial wellness**

*Calm Over Flashy. Progress Over Perfection. Clarity Over Complexity.*
