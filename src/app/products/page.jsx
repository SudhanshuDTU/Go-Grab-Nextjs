// ═══════════════════════════════════════════════════════════════
//  src/app/products/page.jsx
// ═══════════════════════════════════════════════════════════════
// Save this block as:  src/app/products/page.jsx

export const metadata = {
    title: 'Vending Machine Products | Go-Grab',
    description:
      'Explore Go-Grab\'s range of smart vending machines — snack vending machines, beverage dispensers, and combo units for campuses and offices across India.',
    alternates: { canonical: 'https://www.go-grab.in/products' },
    keywords: [
      'vending machine',
      'Vending machine',
      'Vending Machine',
      'vending machine india',
      'smart vending machine India',
      'snack vending machine',
      'beverage vending machine',
      'combo vending machine',
      'vending machine with UPI payment',
      'buy vending machine India',
    ],
    openGraph: {
      title: 'Vending Machine Products | Go-Grab',
      description:
        'Discover our smart, cashless vending machines for snacks, beverages & daily essentials. Perfect for campuses, offices and public spaces.',
      url: 'https://www.go-grab.in/products',
    },
  };
  
  import ProductsClient from './ProductsClient';
  
  export default function ProductsPage() {
    return <ProductsClient />;
  }