
export const metadata = {
    title: 'Privacy Policy | Go-Grab',
    description: 'Read Go-Grab\'s privacy policy to understand how we collect, use, and protect your data.',
    alternates: { canonical: 'https://www.go-grab.in/privacy-policy' },
    robots: { index: false },  // Don't index legal pages — keeps SEO juice on main pages
  };
   
  import PrivacyPolicy from '@/components/HomeScreen/PrivacyPolicy/PrivacyPolicy';
  export default function PrivacyPolicyPage() {
    return <PrivacyPolicy />;
  }