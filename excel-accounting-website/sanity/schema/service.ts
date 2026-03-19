import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'icon', title: 'Icon', type: 'string' }),
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({ name: 'offerings', title: 'Offerings', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 3 }),
  ],
})
