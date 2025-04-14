'use client';

import { ReactNode } from 'react';
import MobileContactButtons from './MobileContactButtons';
import ContactModal from "./ContactModal";
import useContactModal from "../hooks/useContactModal";

export default function Providers({ children }: { children: ReactNode }) {
  const { isOpen, onClose } = useContactModal();

  return (
    <>
      {children}
      <MobileContactButtons />
      <ContactModal isOpen={isOpen} onClose={onClose} />
    </>
  );
} 