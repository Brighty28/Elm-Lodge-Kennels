import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contentPanel',
  title: 'Content Panel',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'content', title: 'Content', type: 'array', of: [{type: 'block'}]}),
  ],
  preview: {
    select: {title: 'heading'},
  },
})
