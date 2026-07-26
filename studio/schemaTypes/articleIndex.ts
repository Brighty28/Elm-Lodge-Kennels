import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'articleIndex',
  title: 'News / Articles Page',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', initialValue: 'News'}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),
    defineField({name: 'bodyText', title: 'Intro Text', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'pageSize', title: 'Articles Per Page', type: 'number', initialValue: 5}),
  ],
  preview: {
    select: {title: 'title'},
  },
})
