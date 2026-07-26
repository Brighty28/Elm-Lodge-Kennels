import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'slide',
  title: 'Slide',
  type: 'object',
  fields: [
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'caption', title: 'Caption', type: 'array', of: [{type: 'block'}]}),
  ],
  preview: {
    select: {media: 'image'},
    prepare({media}) {
      return {title: 'Slide', media}
    },
  },
})
