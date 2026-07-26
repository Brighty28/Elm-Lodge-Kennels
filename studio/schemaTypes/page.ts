import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),
    defineField({name: 'bodyText', title: 'Body', type: 'array', of: [{type: 'block'}]}),
    defineField({
      name: 'contentPanels',
      title: 'Sidebar Content Panels',
      type: 'array',
      of: [{type: 'contentPanel'}],
    }),
    defineField({
      name: 'featuresList',
      title: 'Features List',
      description: 'Individual single-photo items, e.g. named kennels (Rio, Tiddles).',
      type: 'array',
      of: [{type: 'feature'}],
    }),
    defineField({
      name: 'facilities',
      title: 'Facilities',
      description: 'Amenities with their own photo galleries, e.g. "Exercise Paddock" with several photos.',
      type: 'array',
      of: [{type: 'facilitySection'}],
    }),
    defineField({
      name: 'showMap',
      title: 'Show Map',
      description: 'Show an OpenStreetMap embed of the business address (set under Site Settings) on this page.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isMembersOnly',
      title: 'Members Only (Client Area)',
      description: 'If enabled, this page requires login to view — matches the legacy "Client Areas" section.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isContactPage',
      title: 'Is Contact Page',
      description: 'Enable to show the contact form on this page.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'recipientEmailAddress',
      title: 'Contact Form Recipient Email',
      type: 'string',
      hidden: ({document}) => !document?.isContactPage,
    }),
    defineField({
      name: 'emailSubject',
      title: 'Contact Form Email Subject',
      type: 'string',
      hidden: ({document}) => !document?.isContactPage,
    }),
    defineField({
      name: 'thankYouPage',
      title: 'Thank You Page',
      type: 'reference',
      to: [{type: 'page'}],
      hidden: ({document}) => !document?.isContactPage,
    }),
  ],
  preview: {
    select: {title: 'title'},
  },
})
