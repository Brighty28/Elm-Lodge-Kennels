import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'priceList',
  title: 'Prices Page',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', initialValue: 'Prices'}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),
    defineField({name: 'mainContent', title: 'Intro Text', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'tableTitle', title: 'Table Title', type: 'string'}),
    defineField({name: 'rows', title: 'Price Rows', type: 'array', of: [{type: 'priceRow'}]}),
  ],
  preview: {
    select: {title: 'title'},
  },
})
