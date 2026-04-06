'use client';
// src/app/ClientLayout.jsx
// Wraps every page with Navbar + Modal + Footer
// Also provides ModalContext so any component can call openModal()

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { databases, APPWRITE_CONFIG } from '@/lib/appwriteConfig';
import { ID } from 'appwrite';
import emailjs from 'emailjs-com';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { trackPageView, trackEvent } from '@/utils/googleAnalytics';
import { ModalProvider } from '@/context/ModalContext';
import Footer from '@/components/HomeScreen/Footer/Footer';
import navLogo from '@/assets/navLogo.png';
import '@/styles/App.css'

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const router   = useRouter();

  const [isMenuOpen,    setIsMenuOpen]    = useState(false);
  const [isModalOpen,   setIsModalOpen]   = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isMobile,      setIsMobile]      = useState(false);
  const [errors,        setErrors]        = useState({});

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isModalOpen]);

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  const openModal = () => {
    setIsModalOpen(true);
    trackEvent('modal_open', { modal_name: 'Partner_With_Us_Form' });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormSubmitted(false);
    trackEvent('modal_close', { modal_name: 'Partner_With_Us_Form' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      'what-brings-here': form.reason.value,
      name: form.name.value,
      email: form.email.value || '',
      'phone-number': parseInt(form['phone-number'].value),
      location: form.location.value,
      'other-info': form['other-info'].value || '',
    };

    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData['phone-number']) {
      newErrors.phone = 'Phone number is required';
    } else if (formData['phone-number'].toString().length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }
    if (!formData.location) newErrors.location = 'Location is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await databases.createDocument(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.collectionPartnerId,
        ID.unique(),
        formData
      );
      setFormSubmitted(true);
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          name:     formData.name,
          email:    formData.email,
          phone:    formData['phone-number'],
          location: formData.location,
          reason:   formData['what-brings-here'],
          message:  formData['other-info'],
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      trackEvent('form_submission', { form_name: 'Partner_With_Us', reason: formData['what-brings-here'] });
    } catch (error) {
      console.error('Appwrite Error:', error);
      alert('Something went wrong. Please try again.');
      trackEvent('form_submission_error', { form_name: 'Partner_With_Us', error_message: error.message });
    }
  };

  const s = {
    overlay: {
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 9999, display: 'flex',
      justifyContent: isMobile ? 'center' : 'flex-end',
      alignItems: 'flex-start', overflow: 'hidden',
      paddingTop: isMobile ? '70px' : '0px',
    },
    modal: {
      backgroundColor: '#fff', width: '100%',
      maxWidth: isMobile ? '100%' : '500px',
      height: isMobile ? '100%' : '100vh',
      padding: isMobile ? '10px 16px' : '10px 20px',
      margin: isMobile ? '0 0px 40px' : '0',
      borderRadius: isMobile ? '16px' : '0px',
      borderTopLeftRadius: isMobile ? '24px' : '16px',
      borderTopRightRadius: isMobile ? '24px' : '0px',
      boxSizing: 'border-box', overflowY: 'auto',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'flex-start', position: 'relative',
    },
    closeBtn: {
      position: 'absolute', top: isMobile ? '12px' : '16px',
      right: isMobile ? '12px' : '16px', fontSize: '20px',
      background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 2,
    },
    h2: {
      fontSize: isMobile ? '20px' : '25px', fontWeight: '700',
      marginBottom: '20px', textAlign: 'left',
      marginLeft: '12px', marginTop: isMobile ? '10px' : '40px',
    },
    sub: { fontSize: '14px', color: '#666', marginBottom: isMobile ? '12px' : '20px', marginLeft: '12px', textAlign: 'left' },
    form: { display: 'flex', flexDirection: 'column', gap: isMobile ? '10px' : '16px', paddingBottom: '20px', overflowY: 'auto' },
    group: { display: 'flex', flexDirection: 'column' },
    label: { fontSize: '16px', fontWeight: '500', marginBottom: '6px', textAlign: 'left', marginLeft: '12px' },
    input: { padding: '5px 0px', fontSize: '15px', border: 'none', borderBottom: '1px solid #ccc', outline: 'none', borderRadius: '0', backgroundColor: 'transparent', transition: 'border-color 0.3s ease', marginLeft: '12px', marginRight: '12px' },
    radioGroup: { display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', paddingLeft: '12px', paddingRight: '12px' },
    radioLabel: { display: 'flex', alignItems: 'center', gap: '8px', color: 'gray', textAlign: 'left' },
    submitBtn: { marginTop: '12px', backgroundColor: '#22c55e', color: '#fff', padding: isMobile ? '10px 14px' : '12px 20px', fontSize: '14px', border: 'none', borderRadius: '4px', cursor: 'pointer', alignSelf: 'flex-start', marginLeft: '12px', marginBottom: '30px' },
    successBox: { marginTop: isMobile ? '50px' : '80px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', width: '100%', boxSizing: 'border-box', overflowX: 'hidden' },
    successIcon: { width: '70px', height: '80px', marginBottom: '20px' },
    successText: { fontSize: '15px', color: '#333' },
    note: { fontSize: '12px', display: 'block', color: 'red', marginLeft: '12px', marginTop: '4px' },
  };

  const radioOptions = [
    'I want to install your vending machines',
    'I want to buy vending machines / start a business',
    "I want to place my brand's products in your vending machines",
    'Need refund for failed order',
    'Others',
  ];

  return (
    <ModalProvider openModal={openModal} closeModal={closeModal}>

      {/* NAVBAR */}
      <header className="App-header">
        <nav className="navbar" >
          <div className="logo">
            <Image
              onClick={() => router.push('/')}
              src={navLogo}
              alt="Go-Grab Vending Machine Company Logo"
              title="Go-Grab Smart Vending Machine Company"
              height={30}
              priority
              style={{ cursor: 'pointer' }}
            />
          </div>

          <button className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation menu">
            {isMenuOpen ? '✕' : '☰'}
          </button>

          <div className={`nav-container ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-links">
              <li><Link href="/"              onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              <li><Link href="/products"      onClick={() => setIsMenuOpen(false)}>Products</Link></li>
              <li><Link href="/collaborations"onClick={() => setIsMenuOpen(false)}>Collaborations</Link></li>
              <li><Link href="/blog"          onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
            </ul>
            <div className="partner-button">
              <button onClick={openModal} className="button">Get A Go-Grab Machine</button>
            </div>
          </div>

         
        </nav>
        <ToastContainer />
      </header>
       {/* MODAL */}
       {isModalOpen && (
            <div style={s.overlay}>
              <div style={s.modal}>
                <button onClick={closeModal} style={s.closeBtn}>✕</button>
                {!formSubmitted ? (
                  <>
                    <h2 style={s.h2}>Partner With Us</h2>
                    <p style={s.sub}>We're excited to hear from you! Let us know how we can collaborate.</p>
                    <form onSubmit={handleSubmit} style={s.form}>
                      <div style={s.group}>
                        <label style={s.label}>What brings you here?</label>
                        <div style={s.radioGroup}>
                          {radioOptions.map((option) => (
                            <label key={option} style={s.radioLabel}>
                              <input type="radio" name="reason" value={option} required={option === radioOptions[0]} />
                              {option}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div style={s.group}>
                        <label style={s.label}>Your Name*</label>
                        <input name="name" type="text" required style={s.input} />
                        {errors.name && <span style={s.note}>{errors.name}</span>}
                      </div>
                      <div style={s.group}>
                        <label style={s.label}>E-Mail Address</label>
                        <input name="email" type="email" style={s.input} />
                      </div>
                      <div style={s.group}>
                        <label style={s.label}>Phone Number*</label>
                        <input name="phone-number" minLength={10} type="tel" required style={s.input}
                          onInput={(e) => { e.target.value = e.target.value.replace(/\D/g, ''); }} />
                        {errors.phone && <span style={s.note}>{errors.phone}</span>}
                      </div>
                      <div style={s.group}>
                        <label style={s.label}>City / Location*</label>
                        <input name="location" type="text" required style={s.input} />
                        {errors.location && <span style={s.note}>{errors.location}</span>}
                      </div>
                      <div style={s.group}>
                        <label style={s.label}>Anything You'd like to add</label>
                        <textarea name="other-info" style={{ ...s.input, resize: 'none', overflow: 'hidden' }} rows={1}
                          onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = `${e.target.scrollHeight}px`; }} />
                      </div>
                      <button type="submit" style={s.submitBtn}>Send My Request ➜</button>
                    </form>
                  </>
                ) : (
                  <div style={s.successBox}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://img.icons8.com/color/96/000000/ok--v1.png" alt="Success" style={s.successIcon} loading="lazy" />
                    <p style={s.successText}>Thank you! Our team will be in touch within 24 hours.</p>
                  </div>
                )}
              </div>
            </div>
          )}

      {/* PAGE CONTENT */}
      <main>{children}</main>

      {/* FOOTER */}
      <footer>
        <Footer openModal={openModal} />
      </footer>

    </ModalProvider>
  );
}