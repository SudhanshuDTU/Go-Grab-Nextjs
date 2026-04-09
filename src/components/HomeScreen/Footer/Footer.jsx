// src/components/HomeScreen/Footer/Footer.jsx
// ─────────────────────────────────────────────────────────────
//  Footer — "use client" only because of the openModal button.
//  All <Link> from react-router-dom → next/link
//  All <img> for logos → next/image
// ─────────────────────────────────────────────────────────────
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ToastContainer } from 'react-toastify';
import footerLogo from '@/assets/go_grab_footer.png';
import mailLogo   from '@/assets/mail.png';
import instagram  from '@/assets/instagram.png';
import './Footer.css';

const Footer = ({ openModal }) => {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* ── Brand ── */}
        <div className="footer-section">
          <div style={{ display: 'flex', justifySelf: 'center', marginBottom: '10px' }}>
            <Image
              src={footerLogo}
              alt="Go-Grab Smart Vending Machine Company Logo"
              className="footerlogo"
              loading="lazy"
            />
          </div>
          <p className="centerINMob" style={{ color: 'white', fontWeight: 400 }}>
            Your Snack. Your Moment. Instantly
          </p>
        </div>

        {/* ── Explore ── */}
        <div className="footer-section">
          <h3 className="centerINMob" style={{ fontWeight: 700, color: 'white' }}>
            Explore
          </h3>
          <ul>
            <li className="centerINMob">
              <Link href="/" style={{ fontWeight: 400, color: 'white' }}>
                Home
              </Link>
            </li>
            <li className="centerINMob">
              <Link href="/products" style={{ fontWeight: 400, color: 'white' }}>
                Products
              </Link>
            </li>
            <li className="centerINMob">
              <Link href="/collaborations" style={{ fontWeight: 400, color: 'white' }}>
                Collaborations
              </Link>
            </li>
            <li className="centerINMob">
              <Link href="/blog" style={{ fontWeight: 400, color: 'white' }}>
                Blog
              </Link>
            </li>
            <li className="centerINMob">
              <Link href="/support" style={{ fontWeight: 400, color: 'white' }}>
                Support
              </Link>
            </li>
          </ul>
          <ToastContainer />
        </div>

        {/* ── Let's Connect ── */}
        <div className="footer-section">
          <h3 className="centerINMob" style={{ fontWeight: 700, color: 'white' }}>
            Let's Connect
          </h3>
          <ul>
            <li className="centerINMob" style={{ display: 'flex' }}>
              <Image
                src={mailLogo}
                alt="Email Go-Grab"
                title="Email Go-Grab Support"
                loading="lazy"
                style={{ alignSelf: 'center', paddingRight: '2px', width: '20px', height: '20px' }}
              />
              <a
                href="mailto:team@go-grab.in"
                style={{ fontWeight: 400, color: 'white' }}
                aria-label="Send an email to Go-Grab team"
              >
                team@go-grab.in
              </a>
            </li>
            <li className="centerINMob" style={{ display: 'flex' }}>
              <Image
                src={instagram}
                alt="Go-Grab Instagram"
                title="Follow Go-Grab on Instagram"
                loading="lazy"
                style={{ alignSelf: 'center', paddingRight: '2px', width: '20px', height: '20px' }}
              />
              <a
                href="https://instagram.com/gograb_india/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontWeight: 400, color: 'white' }}
                aria-label="Follow Go-Grab on Instagram"
              >
                gograb_india
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <p style={{ color: 'white' }}>© 2026 Go-Grab, All rights reserved.</p>
        <div className="centerINMob">
          <Link
            href="/privacy-policy"
            style={{ color: 'white', textDecoration: 'underline' }}
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;