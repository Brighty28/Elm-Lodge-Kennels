import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'facilitySection',
  title: 'Facility Section',
  type: 'object',
  description: 'A facility/amenity with an optional description and a photo gallery (e.g. "Exercise Paddock" with 2-3 photos).',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'description', title: 'Description', type: 'array', of: [{type: 'block'}]}),
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
  ],
  preview: {
    select: {title: 'title', media: 'images.0'},
  },
})
