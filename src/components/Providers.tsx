'use client';

import { ReactNode, useEffect } from 'react';
import MobileContactButtons from './MobileContactButtons';
import ContactModal from "./ContactModal";
import useContactModal from "../hooks/useContactModal";
import ServiceDetailModalWrapper from './ServiceDetailModalWrapper';
import ScrollReset from './ScrollReset';
// import { initEmailJS } from '../utils/emailjs';

export default function Providers({ children }: { children: ReactNode }) {
  const { isOpen, onClose } = useContactModal();

  // Больше не нужно инициализировать EmailJS, так как мы используем Formspree
  // useEffect(() => {
  //   initEmailJS();
  // }, []);

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