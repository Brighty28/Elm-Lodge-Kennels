import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'feature',
  title: 'Feature',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'description', title: 'Description', type: 'array', of: [{type: 'block'}]}),
  ],
  preview: {
    select: {title: 'title', media: 'image'},
  },
})
