---
inclusion: fileMatch
fileMatchPattern: ['sanity/**/*.ts', 'lib/sanity.ts', 'sanity.config.ts']
---

# Sanity Schema Standards

## Schema Location & Registration

- All content type schemas live in `sanity/schema/` — one file per type.
- Register every schema in `sanity.config.ts` via the `schema.types` array.
- The Sanity client instance is in `sanity/lib/client.ts`; import it from there, never instantiate a second client.

## Content Types

Three content types are defined for this project:

| Type | File | Purpose |
|------|------|---------|
| `service` | `sanity/schema/service.ts` | The 6 service pages (accounting, tax, secretarial, payroll, legal, bookkeeping) |
| `faqItem` | `sanity/schema/faqItem.ts` | FAQ / tax accordion items |
| `siteSettings` | `sanity/schema/siteSettings.ts` | Phone, emails, office addresses, business hours |

Do not add new content types without updating `lib/sanity.ts` with matching TypeScript interfaces and typed fetch helpers.

## Field Conventions

- Use `type: 'slug'` with `options: { source: 'title' }` for URL-safe identifiers.
- Every `service` document must include `seoTitle` (string) and `seoDescription` (text) fields — these feed `generateMetadata()` on service subpages.
- Field names use camelCase (e.g. `shortDescription`, `seoTitle`).
- Prefer `type: 'text'` over `type: 'string'` for multi-line content; use `type: 'string'` for single-line values.
- Use `type: 'array'` with `of: [{ type: 'string' }]` for simple lists (e.g. `offerings`).

## `service` Schema Reference

```ts
{
  name: 'service',
  fields: [
    { name: 'title',            type: 'string' },
    { name: 'slug',             type: 'slug', options: { source: 'title' } },
    { name: 'icon',             type: 'string' },
    { name: 'shortDescription', type: 'text' },
    { name: 'offerings',        type: 'array', of: [{ type: 'string' }] },
    { name: 'seoTitle',         type: 'string' },
    { name: 'seoDescription',   type: 'text' },
  ]
}
```

## Typed Fetch Helpers (`lib/sanity.ts`)

- All GROQ queries go through typed helpers in `lib/sanity.ts` — never write raw `client.fetch()` calls in page components.
- Use `cache: 'force-cache'` on all SSG page fetches.
- Wrap every fetch in try/catch; return empty arrays or `null` on error so the build does not fail.
- Export a TypeScript interface alongside each helper:

```ts
export interface Service {
  title: string
  slug: string
  icon: string
  shortDescription: string
  offerings: string[]
  seoTitle: string
  seoDescription: string
}

export async function getServices(): Promise<Service[]> { ... }
export async function getServiceBySlug(slug: string): Promise<Service | null> { ... }
```

## GROQ Query Patterns

- Project only the fields you need — avoid `*` projections.
- Filter service documents by `_type == 'service'` and order by `title asc` for consistent ordering.
- For `generateStaticParams`, fetch slugs only: `*[_type == 'service']{ "slug": slug.current }`.

## `generateStaticParams` Integration

`app/services/[slug]/page.tsx` calls `getServices()` and maps slugs to params. If Sanity returns an empty array (e.g. during a cold build), the page falls back gracefully via `notFound()` inside the page component.
