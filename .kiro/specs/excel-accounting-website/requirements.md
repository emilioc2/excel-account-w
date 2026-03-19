# Requirements Document

## Introduction

A modern rebuild of the Excel Accounting Services website — a multi-page marketing site for a South African accounting firm based in the Western Cape. The rebuild retains all existing content while modernising the design, improving responsiveness, adding individual service subpages with SEO metadata, a floating WhatsApp button, scroll-triggered CTAs, and a functional contact form. The site consists of: Home, About, Services overview, 6 individual Service subpages, and Contact pages.

## Glossary

- **Site**: The Excel Accounting Services website as a whole
- **Visitor**: Any person browsing the website
- **Contact_Form**: The HTML form on the Contact page used to submit enquiries
- **Nav**: The top navigation bar present on all pages
- **Hero**: The full-width banner section at the top of the Home page
- **Service_Card**: A visual card component representing a single service category
- **Accordion**: A collapsible content component used for the FAQ/tax info section
- **CTA**: Call-to-action button or link element
- **Footer**: The bottom section present on all pages containing address, contact, and hours info
- **Service_Subpage**: A dedicated page for a single service at `/services/[slug]`, containing a hero, full offerings list, in-page enquiry form, and CTA section
- **WhatsApp_Button**: A fixed floating button visible on all pages that opens a WhatsApp conversation with the firm
- **SEO_Metadata**: Per-page `<title>`, `<meta description>`, Open Graph tags, and JSON-LD structured data generated via Next.js `generateMetadata()`

---

## Requirements

### Requirement 1: Site-Wide Navigation

**User Story:** As a visitor, I want a consistent navigation bar on every page, so that I can move between pages without confusion.

#### Acceptance Criteria

1. THE Nav SHALL display the company logo text "Excel Accounting Services" on all pages.
2. THE Nav SHALL display links to Home, About, Services, and Contact pages on all pages.
3. THE Nav SHALL display the phone number "021-782 8927" in a visible location on all pages.
4. WHEN a visitor views the site on a screen narrower than 768px, THE Nav SHALL collapse navigation links into a hamburger menu.
5. WHEN a visitor clicks the hamburger menu icon, THE Nav SHALL expand to show all navigation links as a full-screen slide-in drawer.
6. WHEN a visitor clicks a navigation link, THE Site SHALL navigate to the corresponding page.
7. THE Nav SHALL visually indicate the currently active page link.
8. THE Nav SHALL display a "Get in Touch" button on desktop viewports (≥ 768px) alongside the phone number CTA.

---

### Requirement 2: Home Page — Hero Section

**User Story:** As a visitor, I want a compelling hero section on the Home page, so that I immediately understand what the company offers.

#### Acceptance Criteria

1. THE Hero SHALL display the tagline: "You can trust us to offer you the best accounting services and financial advice based on more than 30 years of experience".
2. THE Hero SHALL display a CTA button labelled "Learn More" that links to the About page.
3. WHEN a visitor clicks the "Learn More" CTA, THE Site SHALL navigate to about.html.

---

### Requirement 3: Home Page — Introduction and Services Overview

**User Story:** As a visitor, I want a brief company introduction and service overview on the Home page, so that I can quickly assess whether the firm meets my needs.

#### Acceptance Criteria

1. THE Site SHALL display the company introduction text referencing offices in Fishhoek and the Helderberg.
2. THE Site SHALL display 3 Service_Cards on the Home page covering: Accounting and Tax Services, Legal Services, and Secretarial Services.
3. EACH Service_Card SHALL display a heading and a brief description of the service category.

---

### Requirement 4: Home Page — Three Pillars Section

**User Story:** As a visitor, I want to understand the firm's core values, so that I can decide whether to trust them with my business.

#### Acceptance Criteria

1. THE Site SHALL display 3 pillar items on the Home page: "We Are Professionals", "We Are Trusted", and "We Are Experts".
2. EACH pillar item SHALL display a heading and a supporting description.

---

### Requirement 5: Home Page — Full Services List

**User Story:** As a visitor, I want a full list of services on the Home page, so that I can see everything the firm offers at a glance.

#### Acceptance Criteria

1. THE Site SHALL display 6 service items on the Home page: Accounting, Tax Services, Secretarial Services, Payroll, Legal, and Bookkeeping.
2. EACH service item SHALL display an icon, a heading, and a short description.
3. THE Site SHALL display a CTA below the services list with the text "Contact Us" that links to the Contact page.

---

### Requirement 6: Home Page — Tax Information Accordion

**User Story:** As a visitor, I want to read key South African tax information, so that I can understand relevant thresholds and rates.

#### Acceptance Criteria

1. THE Site SHALL display a tax information section containing at least 6 accordion items covering: Capital Gains Tax, Corporate Tax Rates, Small Business Corporations, Value-Added Tax, Individual Tax Thresholds, and Small Business Corporation registration criteria.
2. WHEN a visitor clicks an accordion item heading, THE Accordion SHALL expand to reveal the item's content.
3. WHEN a visitor clicks an already-expanded accordion item heading, THE Accordion SHALL collapse that item.
4. THE Accordion SHALL allow only one item to be expanded at a time.

---

### Requirement 7: Home Page — Clients Section

**User Story:** As a visitor, I want to see a list of existing clients, so that I can gauge the firm's credibility.

#### Acceptance Criteria

1. THE Site SHALL display a clients section on the Home page with the heading "OUR CLIENTS".
2. THE Site SHALL display the following client names: WORLDFOCUS, BLACKMEDIA, BRAMMER PLUMBING, JUICE REVOLUTION, EARTH FIRE PIZZA, JENKOR, PROLINE ELECTRICAL, COMPOSITION, WILDSCHUTSBRAND FARM, OCEAN BREEZE HOTEL GROUP.

---

### Requirement 8: About Page

**User Story:** As a visitor, I want to read about the company's history and values, so that I can build confidence in the firm.

#### Acceptance Criteria

1. THE Site SHALL display an About page with the heading "ABOUT OUR COMPANY".
2. THE Site SHALL display the 3 pillars — Trust, Knowledge, and The Client — each with a heading and description.
3. THE Site SHALL display the full company body text describing the firm's competitive advantage and approach.
4. THE Site SHALL display a CTA linking to the Services page labelled "Our Services".
5. THE Site SHALL display a CTA linking to the Contact page labelled "Contact Us".

---

### Requirement 9: Services Overview Page

**User Story:** As a visitor, I want an overview of all services with links to individual service pages, so that I can quickly navigate to the service most relevant to me.

#### Acceptance Criteria

1. THE Site SHALL display a Services overview page at `/services` with the heading "OUR SERVICES".
2. THE Site SHALL display 6 Service_Cards on the overview page: Accounting Services, Tax Services, Secretarial Services, Payroll, Legal, and Bookkeeping.
3. EACH Service_Card SHALL display a heading, a short description, and a link to the corresponding Service_Subpage at `/services/[slug]`.
4. EACH Service_Card SHALL display a "Learn More" CTA that links to the corresponding `/services/[slug]` page.

---

### Requirement 15: Individual Service Subpages

**User Story:** As a visitor, I want a dedicated page for each service, so that I can read full details and enquire directly without navigating away.

#### Acceptance Criteria

1. THE Site SHALL generate a Service_Subpage for each of the 6 services at `/services/accounting`, `/services/tax`, `/services/secretarial`, `/services/payroll`, `/services/legal`, and `/services/bookkeeping`.
2. EACH Service_Subpage SHALL display a hero section with the service name as the heading.
3. EACH Service_Subpage SHALL display the full bulleted list of offerings for that service.
4. EACH Service_Subpage SHALL display an in-page enquiry form (ServiceEnquiryForm) with the service name pre-filled in a hidden or read-only field.
5. EACH Service_Subpage SHALL display a "Contact Us" CTA section at the bottom of the page.
6. EACH Service_Subpage SHALL export `generateMetadata()` returning a unique `title` in the format "[Service Name] | Excel Accounting Services" and a unique `description`.
7. EACH Service_Subpage SHALL include a JSON-LD Service schema block in the page `<head>`.

---

### Requirement 16: SEO and Structured Data

**User Story:** As a business owner, I want every page to be fully SEO-optimised, so that the site ranks well in search engines and attracts new clients.

#### Acceptance Criteria

1. EVERY page SHALL export `generateMetadata()` returning a unique `title`, `description`, and Open Graph tags (`og:title`, `og:description`, `og:url`).
2. THE Site SHALL include an Organization JSON-LD schema block on every page via the root layout.
3. THE Site SHALL generate a sitemap at `/sitemap.xml` via `app/sitemap.ts` that includes all static routes and all 6 service slug routes.
4. THE Site SHALL serve a `robots.txt` via `app/robots.ts` that allows all crawlers and references the sitemap URL.
5. THE Sanity `service` schema SHALL include `seoTitle` and `seoDescription` fields used to populate `generateMetadata()` on each Service_Subpage.
6. EACH page SHALL declare a canonical URL via the Next.js metadata `alternates.canonical` field.

---

### Requirement 17: Floating WhatsApp Button

**User Story:** As a visitor, I want a persistent WhatsApp button, so that I can contact the firm instantly from any page without searching for contact details.

#### Acceptance Criteria

1. THE Site SHALL display a WhatsApp_Button fixed to the bottom-right corner on all pages and all screen sizes.
2. THE WhatsApp_Button SHALL link to `https://wa.me/27217828927`.
3. THE WhatsApp_Button SHALL open the WhatsApp link in a new tab (`target="_blank"`).
4. THE WhatsApp_Button SHALL display the WhatsApp icon and be visually distinct from other page elements.
5. THE WhatsApp_Button SHALL have an accessible `aria-label` of "Chat with us on WhatsApp".

---

### Requirement 18: Scroll-Triggered CTA Animations

**User Story:** As a visitor, I want CTAs to animate into view as I scroll, so that they feel engaging and draw my attention at the right moment.

#### Acceptance Criteria

1. THE "Contact Us" CTA banner at the bottom of the Home page SHALL use an Intersection Observer to animate into view when scrolled into the viewport.
2. WHEN the CTA banner enters the viewport, THE Site SHALL apply a CSS transition that transitions the element from opacity 0 and a downward translate to fully visible.
3. THE animation SHALL only trigger once per page load (not re-trigger on scroll-out and scroll-in).
4. THE animation SHALL respect the visitor's `prefers-reduced-motion` media query — if set to `reduce`, no animation SHALL be applied.

---

### Requirement 10: Contact Page — Form

**User Story:** As a visitor, I want to submit an enquiry via a contact form, so that a consultant can get back to me.

#### Acceptance Criteria

1. THE Site SHALL display a Contact page with the heading "CONTACT US".
2. THE Contact_Form SHALL include the following fields: Name (required), Email (required), Message, Cell Phone, and Company.
3. WHEN a visitor submits the Contact_Form with Name and Email fields empty, THE Contact_Form SHALL display a validation error for each empty required field.
4. WHEN a visitor submits the Contact_Form with a malformed email address, THE Contact_Form SHALL display a validation error indicating the email format is invalid.
5. WHEN a visitor submits the Contact_Form with all required fields valid, THE Contact_Form SHALL display a confirmation message to the visitor.

---

### Requirement 11: Contact Page — Office Details

**User Story:** As a visitor, I want to see the firm's office locations and contact details, so that I can reach them directly.

#### Acceptance Criteria

1. THE Site SHALL display 2 office addresses: Windsor House, Main Road, Fishhoek, 7975 and Ocean Breeze Hotel, Beach Road, Strand, 7139.
2. THE Site SHALL display the phone number 021-782 8927 on the Contact page.
3. THE Site SHALL display the email addresses barry@excelaccounting.co.za, info@excelaccounting.co.za, and nina@excelaccounting.co.za on the Contact page.
4. THE Site SHALL display office hours: Monday–Thursday 07:30–16:00, Fridays 07:30–13:30.

---

### Requirement 12: Site-Wide Footer

**User Story:** As a visitor, I want consistent footer information on every page, so that I can always find contact and location details.

#### Acceptance Criteria

1. THE Footer SHALL display on all pages.
2. THE Footer SHALL display both office addresses.
3. THE Footer SHALL display the email addresses barry@excelaccounting.co.za and info@excelaccounting.co.za.
4. THE Footer SHALL display office hours: Monday–Thursday 07:30–16:00, Fridays 07:30–13:30.
5. THE Footer SHALL display a copyright notice.
6. THE Footer SHALL display the attribution text "Designed & Developed by Eternity" in the bottom bar.

---

### Requirement 13: Responsive Design

**User Story:** As a visitor using a mobile device, I want the site to display correctly on my screen, so that I can read and navigate without horizontal scrolling.

#### Acceptance Criteria

1. THE Site SHALL render without horizontal overflow on viewport widths from 320px to 1920px.
2. WHEN a visitor views the site on a screen narrower than 768px, THE Site SHALL stack multi-column layouts into a single column.
3. THE Site SHALL use relative or fluid units for font sizes so that text remains legible across viewport sizes, scaling from `text-base` on mobile to `text-lg` on desktop.
4. ALL Tailwind layout classes SHALL be written mobile-first (base styles target mobile; `md:` and `lg:` prefixes target larger screens).
5. ALL interactive tap targets (buttons, links) SHALL have a minimum touch target size of 44×44px on mobile viewports.
6. THE mobile navigation SHALL render as a full-screen slide-in drawer rather than a simple dropdown.
7. ALL images SHALL use `next/image` with a responsive `sizes` prop appropriate to their layout context.

---

### Requirement 14: Performance and Accessibility

**User Story:** As a visitor, I want the site to load quickly and be accessible, so that I can use it regardless of my device or ability.

#### Acceptance Criteria

1. THE Site SHALL provide descriptive alt text for all images and icons.
2. THE Site SHALL use semantic HTML elements (header, nav, main, section, footer) on all pages.
3. THE Site SHALL achieve a Lighthouse performance score of 80 or above on desktop.
4. THE Site SHALL ensure all interactive elements are keyboard-navigable.
5. THE Site SHALL maintain a colour contrast ratio of at least 4.5:1 for body text against its background.
