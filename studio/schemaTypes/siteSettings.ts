import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Site Title', type: 'string'}),
    defineField({name: 'address', title: 'Address', type: 'text'}),
    defineField({
      name: 'latitude',
      title: 'Map Latitude',
      description: 'Used to plot the location on the OpenStreetMap embed (e.g. on the About Us page).',
      type: 'number',
    }),
    defineField({
      name: 'longitude',
      title: 'Map Longitude',
      type: 'number',
    }),
    defineField({name: 'telephone', title: 'Telephone', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'facebookLink', title: 'Facebook URL', type: 'url'}),
    defineField({name: 'twitterLink', title: 'Twitter / X URL', type: 'url'}),
    defineField({name: 'instagramLink', title: 'Instagram URL', type: 'url'}),
    defineField({name: 'copyrightText', title: 'Copyright Text', type: 'string'}),
    defineField({
      name: 'licenseNumber',
      title: 'Animal Boarding License Number',
      description: 'Displayed in the footer, e.g. required for UK animal boarding businesses.',
      type: 'string',
    }),
    defineField({name: 'creditText', title: 'Site Credit Text', type: 'string'}),
    defineField({name: 'creditUrl', title: 'Site Credit URL', type: 'url'}),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      description: 'Rows displayed in the Opening Hours card on the Contact page.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'days', title: 'Days', type: 'string', description: 'e.g. Monday – Friday'}),
            defineField({name: 'hours', title: 'Hours', type: 'string', description: 'e.g. 9:00 AM – 5:00 PM'}),
          ],
          preview: {select: {title: 'days', subtitle: 'hours'}},
        },
      ],
    }),
    defineField({
      name: 'openingHoursNote',
      title: 'Opening Hours Note',
      description: 'Optional small-print note shown below opening hours.',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'contactSubjects',
      title: 'Contact Form Subjects',
      description: 'Options in the Subject dropdown on the Contact page.',
      type: 'array',
      of: [{type: 'string'}],
    }),
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
