'use client';
import { useModal } from '@/context/ModalContext';
import ProductsScreen from '@/components/ProductScreen/ProductsScreen';
 
export default function ProductsClient() {
  const { openModal } = useModal();
  return <ProductsScreen openModal={openModal} />;
}