import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Site Title', type: 'string'}),
    defineField({name: 'address', title: 'Address', type: 'text'}),
    defineField({name: 'telephone', title: 'Telephone', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'facebookLink', title: 'Facebook URL', type: 'url'}),
    defineField({name: 'twitterLink', title: 'Twitter / X URL', type: 'url'}),
    defineField({name: 'instagramLink', title: 'Instagram URL', type: 'url'}),
    defineField({name: 'copyrightText', title: 'Copyright Text', type: 'string'}),
    defineField({
      name: 'primaryNavigation',
      title: 'Primary Navigation',
      description: 'Pages shown in the top navigation menu, in order.',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'page'}, {type: 'homePage'}, {type: 'priceList'}, {type: 'articleIndex'}]}],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
