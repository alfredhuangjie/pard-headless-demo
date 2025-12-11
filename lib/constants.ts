export const NAV_ITEMS = [
  { 
    name: 'Store', 
    href: '/store', 
    type: 'dropdown', 
    columns: [
      {
        title: 'Shop by Category',
        items: ['New Arrivals', 'Best Sellers', 'Thermal Imaging Scopes', 'Night Vision Scopes', 'Night Vision Clip-on', 'Accessories']
      },
      {
        title: 'Quick Links',
        items: ['Find a Dealer', 'Order Status', 'Financing', 'Returns & Warranty']
      },
      {
        title: 'Special Offers',
        items: ['Certified Refurbished', 'Education Program', 'Government & L.E.', 'Clearance Sale']
      }
    ]
  },
  { 
    name: 'Thermal Imaging', 
    href: '/thermal-imaging', 
    type: 'dropdown',
    columns: [
      {
        title: 'Explore Thermal',
        items: ['PARD TA32', 'PARD TS3x', 'PARD FT32', 'Compare All Models']
      },
      {
        title: 'Shop Thermal',
        items: ['Shop Thermal Imaging', 'Accessories', 'Financing', 'Order Status']
      },
      {
        title: 'More from Thermal',
        items: ['Thermal Support', 'PARD Care+', 'Manuals & Downloads']
      }
    ]
  },
  { 
    name: 'Night Vision', 
    href: '/night-vision', 
    type: 'dropdown',
    columns: [
      {
        title: 'Explore NV',
        items: ['PARD NV007', 'PARD NV008', 'Digital Night Vision', 'Clip-on Scopes']
      },
      {
        title: 'Shop NV',
        items: ['Shop Night Vision', 'IR Illuminators', 'Mounts', 'Batteries']
      },
      {
        title: 'Learn More',
        items: ['How NV Works', 'NV vs Thermal', 'Hunting Tips']
      }
    ]
  },
  { name: 'Multi-Spectral', href: '/multi-spectral', type: 'link' },
  { name: 'Accessories', href: '/accessories', type: 'link' },
  { name: 'Dealer Locator', href: '/dealers', type: 'link' },
  { name: 'Support', href: '/support', type: 'link' },
];