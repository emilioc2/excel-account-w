import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { service } from './sanity/schema/service'
import { faqItem } from './sanity/schema/faqItem'
import { siteSettings } from './sanity/schema/siteSettings'

export default defineConfig({
  name: 'excel-accounting',
  title: 'Excel Accounting Services',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [structureTool()],
  schema: {
    types: [service, faqItem, siteSettings],
  },
})
