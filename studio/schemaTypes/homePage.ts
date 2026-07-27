import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    {name: 'hero', title: '1 · Hero'},
    {name: 'architecture', title: '2 · Architecture of Calm'},
    {name: 'features', title: '3 · Country-Luxe Features'},
    {name: 'whatsapp', title: '4 · WhatsApp Updates'},
    {name: 'cta', title: '5 · Call to Action'},
  ],
  fields: [
    /* ── Hero ──────────────────────────────────────────────── */
    defineField({
      name: 'heroHeadline',
      title: 'Headline',
      type: 'string',
      group: 'hero',
      initialValue: 'A Holiday Destination for Your Pet.',
      description: 'Large heading displayed over the hero photo.',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Subtext',
      type: 'text',
      rows: 2,
      group: 'hero',
      initialValue:
        'Premium 5-star boarding in the heart of Nottinghamshire. Where luxury meets the countryside, providing a stress-free haven for your furry companions.',
    }),

    /* ── Architecture of Calm ───────────────────────────────── */
    defineField({
      name: 'architectureEyebrow',
      title: 'Eyebrow Label',
      type: 'string',
      group: 'architecture',
      initialValue: 'Thoughtful Design',
      description: 'Small gold label above the heading (e.g. "Thoughtful Design").',
    }),
    defineField({
      name: 'architectureHeading',
      title: 'Heading',
      type: 'string',
      group: 'architecture',
      initialValue: 'The Architecture of Calm',
    }),
    defineField({
      name: 'architectureBody',
      title: 'Body Text',
      type: 'text',
      rows: 4,
      group: 'architecture',
      initialValue:
        "Our facility isn't just a kennel; it's a meticulously designed sanctuary. The angled layout ensures pets don't experience direct eye contact with others, significantly reducing territorial stress and noise levels. Large vistas of the Nottinghamshire landscape provide constant visual enrichment.",
    }),
    defineField({
      name: 'architectureImage',
      title: 'Panel Image',
      type: 'image',
      group: 'architecture',
      description: 'Photo shown in the right panel of the Architecture of Calm section.',
      options: {hotspot: true},
    }),

    /* ── Country-Luxe Features ──────────────────────────────── */
    defineField({
      name: 'countryLuxeHeading',
      title: 'Section Heading',
      type: 'string',
      group: 'features',
      initialValue: 'Country-Luxe Experience',
    }),
    defineField({
      name: 'countryLuxeSubtext',
      title: 'Section Subtext',
      type: 'string',
      group: 'features',
      initialValue:
        'Uncompromising comfort in a rustic setting, utilising modern technology to maintain a perfect climate year-round.',
    }),
    defineField({
      name: 'featuresList',
      title: 'Feature Cards',
      type: 'array',
      of: [{type: 'feature'}],
      group: 'features',
      description: 'Up to 3 cards shown in the features grid (Climate Control, Heated Runs, etc.).',
    }),

    /* ── WhatsApp Updates ───────────────────────────────────── */
    defineField({
      name: 'whatsappHeading',
      title: 'Heading',
      type: 'string',
      group: 'whatsapp',
      initialValue: 'WhatsApp Pet Updates',
    }),
    defineField({
      name: 'whatsappSubtext',
      title: 'Subtext',
      type: 'text',
      rows: 3,
      group: 'whatsapp',
      initialValue:
        "Distance shouldn't mean disconnect. We provide daily high-definition photo and video updates directly to your WhatsApp, so you can enjoy your holiday knowing your pet is enjoying theirs.",
    }),
    defineField({
      name: 'whatsappChecklist',
      title: 'Checklist Items',
      type: 'array',
      of: [{type: 'string'}],
      group: 'whatsapp',
      initialValue: ['Real-time status reports', 'Video clips of play sessions', 'Direct line to our caregivers'],
    }),

    /* ── Call to Action ─────────────────────────────────────── */
    defineField({
      name: 'ctaHeading',
      title: 'Heading',
      type: 'string',
      group: 'cta',
      initialValue: 'Ready to Book a 5-Star Stay?',
    }),
    defineField({
      name: 'ctaSubtext',
      title: 'Subtext',
      type: 'string',
      group: 'cta',
      initialValue: 'Limited suites available for seasonal holidays. Secure your pet\'s luxury retreat today.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Home Page'}
    },
  },
})
