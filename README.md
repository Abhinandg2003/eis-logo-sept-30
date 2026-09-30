# EIS web

    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

- `app/` routes: `/`, `/about`, `/insights`, `/insights/[slug]`, `/api/insights`
- `components/` layout, ui (shadcn-style), home, insights, sections, reactbits
- `lib/cms/` CMS skeleton: swap `staticProvider` in `lib/cms/index.ts` for a real source later
- `content/insights.ts` placeholder articles
- Search the code for `PLACEHOLDER` to find everything to replace
