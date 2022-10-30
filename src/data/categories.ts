const categories: IOptions[] = [
  {
    label: 'Clothes',
    value: 'clothes'
  },
  {
    label: 'Furniture',
    value: 'furniture'
  },
  {
    label: 'Outdoors',
    value: 'outdoors'
  },
  {
    label: 'Electronics',
    value: 'electronics'
  },
  {
    label: 'Educational',
    value: 'educational'
  },
  {
    label: 'Health',
    value: 'health'
  },
  {
    label: 'Tools',
    value: 'tools'
  },
  {
    label: 'Other',
    value: 'other'
  }
];

interface IOptions {
  label: string;
  value: string;
}

export default categories;
