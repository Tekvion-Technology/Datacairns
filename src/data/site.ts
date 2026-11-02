export const contact = {
  email: 'info@datacairns.com',
  sales: 'sales@datacairns.com',
  partnerships: 'partnerships@datacairns.com',
  phone: '+971 55 330 8802',
  phoneHref: 'tel:+971553308802',
  addressLines: ['7th Floor, Sapphire Tower', 'Dubai, United Arab Emirates'],
};

export interface NavLink {
  label: string;
  href: string;
}

// Menus are links for now; pages behind '#' are not built yet.
export const mainNav: NavLink[] = [
  { label: 'Product', href: '/#platform' },
  { label: 'Solutions', href: '/use-cases/' },
  { label: 'Why Datacairns', href: '/#how-it-works' },
  { label: 'Resources', href: '/#ecosystem' },
];

export const footerColumns: { h: string; links: NavLink[] }[] = [
  {
    h: 'Product',
    links: [
      { label: 'Platform', href: '/#platform' },
      { label: 'AI Assistant', href: '/#assistant' },
      { label: 'Agents', href: '/#agents' },
      { label: 'Governance', href: '/#how-it-works' },
    ],
  },
  {
    h: 'Solutions',
    links: [
      { label: 'Public sector', href: '/use-cases/public-sector/' },
      { label: 'Finance', href: '/use-cases/finance/' },
      { label: 'Healthcare', href: '/use-cases/healthcare/' },
    ],
  },
  {
    h: 'Resources',
    links: [
      { label: 'Docs', href: '#' },
      { label: 'Use cases', href: '/use-cases/' },
      { label: 'Blog', href: '#' },
      { label: 'Events', href: '#' },
    ],
  },
  {
    h: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Trust center', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
];
