export const metadata = {
  title: 'Collaborate with Go-Grab | Vending Machine in India',
  description:
    "Partner with Go-Grab and place your brand's products in our smart vending machines across India. Direct access to 100k+ users. Let's grow together!",
  alternates: {
    canonical: 'https://www.go-grab.in/collaborations',
  },
  openGraph: {
    title: 'Collaborate with Go-Grab | Vending Machine Partnerships',
    description:
      "Place your brand's products in Go-Grab's smart vending machines. Reach 100k+ users across campuses and offices in India.",
    url: 'https://www.go-grab.in/collaborations',
    images: [
      {
        url: 'https://www.go-grab.in/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Go-Grab Vending Machine Partnership',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Collaborate with Go-Grab | Vending Machine Partnerships',
    description:
      "Place your brand in Go-Grab's smart vending machines across India.",
  },
};
 
import CollaborationsClient from './CollaborationsClient';
 
export default function CollaborationsPage() {
  return <CollaborationsClient />;
}