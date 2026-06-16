import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'article',
  title: 'News Article',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),
    defineField({name: 'articleDate', title: 'Article Date', type: 'datetime', validation: (r) => r.required()}),
    defineField({name: 'articleSummary', title: 'Summary', type: 'text'}),
    defineField({name: 'body', title: 'Body', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
  ],
  orderings: [
    {
      title: 'Article Date, New',
      name: 'articleDateDesc',
      by: [{field: 'articleDate', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'articleDate', media: 'image'},
  },
})
