'use client';
// src/app/HomeClient.jsx
// ─────────────────────────────────────────────────────────────
//  Thin client wrapper — only exists to pass openModal down
//  to sections that have interactive buttons.
//  Keep this file as small as possible.
// ─────────────────────────────────────────────────────────────

import { useModal } from '@/context/ModalContext';
import HeroSection from '@/components/HomeScreen/HeroSection/HeroSection';
import WhyGoGrab   from '@/components/HomeScreen/WhyGoGrab/WhyGoGrab';
import HowItWorks from '@/components/HomeScreen/HowItWorks/HowItWorks';

import TrustedByUsers from "@/components/HomeScreen/TrustedByUsers/TrustedByUsers";
import EmpoweringCampuses from "@/components/HomeScreen/EmpoweringCampuses/EmpoweringCampuses";

export default function HomeClient() {
  const { openModal } = useModal();

  return (
    <>
      <HeroSection openModal={openModal} />
      <HowItWorks/>
      <TrustedByUsers />
      <EmpoweringCampuses />
      <WhyGoGrab openModal={openModal}/>
    
    </>
  );
}