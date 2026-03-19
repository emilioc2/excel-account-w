# Deployment Plan: Excel Accounting Services Website

## Phase 1: Sanity CMS Setup

### 1.1 Create a Sanity project

```bash
npx sanity@latest init --project excel-accounting --dataset production
```

Note the `projectId` and `dataset` values — you'll need them for env vars.

### 1.2 Deploy the Sanity Studio

```bash
cd excel-accounting-website
npx sanity deploy
```

Choose a studio hostname (e.g. `excel-accounting.sanity.studio`).

### 1.3 Populate content in the Studio

Create these documents:

**6 `service` documents** with the following slugs:

| Slug | Title |
|------|-------|
| `accounting` | Accounting Services |
| `tax` | Tax Services |
| `secretarial` | Secretarial Services |
| `payroll` | Payroll |
| `legal` | Legal |
| `bookkeeping` | Bookkeeping |

Each service document requires: `title`, `icon`, `shortDescription`, `offerings` (array), `seoTitle`, `seoDescription`.

**At least 6 `faqItem` documents** covering:
- Capital Gains Tax
- Corporate Tax Rates
- Small Business Corporations
- Value-Added Tax
- Individual Tax Thresholds
- Small Business Corporation registration criteria

**1 `siteSettings` document** with:
- Phone: `021-782 8927`
- Emails: `barry@excelaccounting.co.za`, `info@excelaccounting.co.za`, `nina@excelaccounting.co.za`
- Offices: Fish Hoek and Strand
- Hours: Mon–Thu 07:30–16:00, Fri 07:30–13:30

---

## Phase 2: Resend Setup

1. Create a Resend account at [resend.com](https://resend.com)
2. Add and verify your domain (`excelaccounting.co.za`) — add the DNS records Resend provides to your domain registrar
3. Create an API key in the Resend dashboard — keep it for the env vars step

---

## Phase 3: Environment Variables

Create `.env.local` in `excel-accounting-website/` for local testing:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
RESEND_API_KEY=re_xxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://excelaccounting.co.za
```

Verify the build passes locally before deploying:

```bash
cd excel-accounting-website
npm run build
```

---

## Phase 4: Vercel Deployment

### 4.1 Push to GitHub

```bash
git add .
git commit -m "feat: initial production build"
git push origin main
```

### 4.2 Import project in Vercel

- Go to [vercel.com/new](https://vercel.com/new)
- Import the GitHub repo
- Set the root directory to `excel-accounting-website`
- Framework preset: Next.js (auto-detected)

### 4.3 Add environment variables in Vercel

In the Vercel project settings → Environment Variables, add all four vars from Phase 3.

### 4.4 Deploy

Vercel will build and deploy automatically. Confirm the preview URL works end-to-end — check the contact form, service subpages, and sitemap at `/sitemap.xml`.

---

## Phase 5: Custom Domain

### 5.1 Add domain in Vercel

Project Settings → Domains → add both:
- `excelaccounting.co.za`
- `www.excelaccounting.co.za`

### 5.2 Update DNS at your registrar

| Record | Name | Value |
|--------|------|-------|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

### 5.3 SSL

SSL is provisioned automatically by Vercel once DNS propagates (usually within minutes).

---

## Phase 6: Post-Deployment Checklist

### Pages
- [ ] `/` — Home page loads with hero, services, accordion, clients
- [ ] `/about` — About page loads with pillars and CTAs
- [ ] `/services` — Services overview shows 6 service cards
- [ ] `/services/accounting` — Service subpage loads with offerings and enquiry form
- [ ] `/services/tax` — Service subpage loads
- [ ] `/services/secretarial` — Service subpage loads
- [ ] `/services/payroll` — Service subpage loads
- [ ] `/services/legal` — Service subpage loads
- [ ] `/services/bookkeeping` — Service subpage loads
- [ ] `/contact` — Contact page loads with form and office details

### Functionality
- [ ] Contact form sends email to `info@excelaccounting.co.za`
- [ ] Service enquiry forms pre-fill the service name and send successfully
- [ ] WhatsApp button opens `https://wa.me/27217828927` in a new tab
- [ ] Mobile nav drawer opens and closes correctly
- [ ] Scroll-triggered CTA animates into view on the home page

### SEO & Infrastructure
- [ ] `/sitemap.xml` lists all 10 routes (4 static + 6 service slugs)
- [ ] `/robots.txt` references the sitemap URL
- [ ] Open Graph tags verified at [opengraph.xyz](https://www.opengraph.xyz)
- [ ] Sitemap submitted to Google Search Console

### Performance
- [ ] Lighthouse desktop performance score ≥ 80
- [ ] No horizontal overflow on mobile (320px viewport)
- [ ] All images load with correct `alt` text
