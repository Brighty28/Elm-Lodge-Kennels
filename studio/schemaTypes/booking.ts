export default {
  name: 'booking',
  title: 'Bookings',
  type: 'document',
  fields: [
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'pending',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Declined', value: 'declined' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'submittedAt',
      title: 'Submitted',
      type: 'datetime',
      readOnly: true,
    },
    {
      name: 'ownerName',
      title: 'Owner Name',
      type: 'string',
    },
    {
      name: 'ownerEmail',
      title: 'Owner Email',
      type: 'string',
    },
    {
      name: 'ownerPhone',
      title: 'Owner Phone',
      type: 'string',
    },
    {
      name: 'dogName',
      title: 'Dog Name(s)',
      type: 'string',
    },
    {
      name: 'dogBreed',
      title: 'Breed',
      type: 'string',
    },
    {
      name: 'dogSize',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'Daycare', value: 'Daycare' },
          { title: 'Small', value: 'Small' },
          { title: 'Medium', value: 'Medium' },
          { title: 'Large', value: 'Large' },
          { title: 'Extra Large', value: 'Extra Large' },
        ],
      },
    },
    {
      name: 'numberOfDogs',
      title: 'Number of Dogs',
      type: 'number',
      initialValue: 1,
    },
    {
      name: 'checkIn',
      title: 'Check-in Date',
      type: 'date',
    },
    {
      name: 'checkOut',
      title: 'Check-out Date',
      type: 'date',
    },
    {
      name: 'specialRequirements',
      title: 'Special Requirements / Medication',
      type: 'text',
      rows: 3,
    },
  ],
  preview: {
    select: {
      title: 'ownerName',
      checkIn: 'checkIn',
      dog: 'dogName',
      status: 'status',
    },
    prepare({ title, checkIn, dog, status }: { title?: string; checkIn?: string; dog?: string; status?: string }) {
      return {
        title: title ?? 'Unknown owner',
        subtitle: [dog, checkIn ? `Check-in ${checkIn}` : null, status].filter(Boolean).join(' · '),
      }
    },
  },
}
