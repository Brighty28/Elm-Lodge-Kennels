import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', initialValue: 'Home'}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      initialValue: {current: '/'},
    }),
    defineField({name: 'bodyText', title: 'Welcome Text', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'slideshow', title: 'Slideshow', type: 'array', of: [{type: 'slide'}]}),
    defineField({
      name: 'featuresList',
      title: 'Features List',
      type: 'array',
      of: [{type: 'feature'}],
    }),
  ],
  preview: {
    select: {title: 'title'},
  },
})
