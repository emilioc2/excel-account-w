import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'emails', title: 'Email Addresses', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'offices',
      title: 'Offices',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Office Name', type: 'string' }),
            defineField({ name: 'address', title: 'Address', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),
    defineField({ name: 'hours', title: 'Office Hours', type: 'text', rows: 2 }),
  ],
})
