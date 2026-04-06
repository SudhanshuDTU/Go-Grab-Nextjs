'use client';
import { useModal } from '@/context/ModalContext';
import Collaborations from '@/components/CollaborationScreen/Collaborations';
 
export default function CollaborationsClient() {
  const { openModal } = useModal();
  return <Collaborations openModal={openModal} />;
}