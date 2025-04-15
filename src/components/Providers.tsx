'use client';

import { ReactNode } from 'react';
import MobileContactButtons from './MobileContactButtons';
import ContactModal from "./ContactModal";
import useContactModal from "../hooks/useContactModal";
import ServiceDetailModalWrapper from './ServiceDetailModalWrapper';
import ScrollReset from './ScrollReset';

export default function Providers({ children }: { children: ReactNode }) {
  const { isOpen, onClose } = useContactModal();

  return (
    <>
      <ScrollReset />
      {children}
      <MobileContactButtons />
      <ContactModal isOpen={isOpen} onClose={onClose} />
      <ServiceDetailModalWrapper />
    </>
  );
} 