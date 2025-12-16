# American Guardian Home Health - Landing Page

A modern, animation-rich landing page built with React, Vite, Framer Motion, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
  app/
    AmericanGuardianLanding.jsx  # Main landing page component
    index.js                     # Export entry point
  components/
    ag/                          # American Guardian components
      Nav.jsx
      Hero.jsx
      Services.jsx
      HowItWorks.jsx
      Coverage.jsx
      Team.jsx
      Contact.jsx
      ui/                        # Reusable UI components
        Badge.jsx
        CountUp.jsx
        GlassCard.jsx
        GlowBlob.jsx
        MagneticButton.jsx
        ParticleField.jsx
        ScrollHint.jsx
        SectionTitle.jsx
  config/
    brand.js                     # Brand colors and logo path
  utils/
    cn.js                        # Utility for className merging
public/
  american-guardian-logo.png     # Logo file (add your logo here)
```

## 🌐 Deployment

### Option 1: Vercel (Recommended - Most Cutting-Edge)

**Why Vercel?**
- ⚡ Edge Network (global CDN)
- 🔄 Automatic deployments from Git
- 📊 Built-in analytics
- 🚀 Zero-config deployment
- 💰 Free tier with generous limits

**Deploy Steps:**

1. **Push to GitHub/GitLab/Bitbucket:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Vite and configure everything
   - Click "Deploy"

   **Or use CLI:**
   ```bash
   npm i -g vercel
   vercel
   ```

### Option 2: Netlify

**Why Netlify?**
- 🎯 Similar to Vercel with great DX
- 🔧 Netlify Functions for serverless
- 📈 Built-in form handling

**Deploy Steps:**

1. Create `netlify.toml`:
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. Deploy:
   - Go to [netlify.com](https://netlify.com)
   - Drag & drop the `dist` folder, OR
   - Connect your Git repo for continuous deployment

### Option 3: Cloudflare Pages

**Why Cloudflare?**
- 🌍 Global edge network
- ⚡ Fastest CDN
- 🔒 Built-in security
- 💰 Generous free tier

**Deploy Steps:**

1. Push to Git (GitHub/GitLab)
2. Go to [Cloudflare Pages](https://pages.cloudflare.com)
3. Connect repository
4. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Deploy!

### Option 4: Traditional Hosting (VPS/Shared)

For traditional hosting (cPanel, AWS S3, etc.):

```bash
npm run build
# Upload the 'dist' folder contents to your web server
```

## 🎨 Customization

### Update Logo
1. Place your logo at `public/american-guardian-logo.png`
2. Or update the path in `src/config/brand.js`

### Update Brand Colors
Edit `src/config/brand.js` to change the color palette.

### Update Content
Edit the component files in `src/components/ag/` to update text, images, and content.

## 📦 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool (fastest bundler)
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Icon library

## 🔧 Development

The app runs on `http://localhost:3000` by default.

Hot Module Replacement (HMR) is enabled for instant updates during development.

## 📝 License

All rights reserved © American Guardian Home Health

