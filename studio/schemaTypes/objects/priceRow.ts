import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'priceRow',
  title: 'Price Row',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string'}),
    defineField({name: 'price', title: 'Price', type: 'string'}),
    defineField({name: 'notes', title: 'Notes', type: 'string'}),
  ],
  preview: {
    select: {title: 'label', subtitle: 'price'},
  },
})
