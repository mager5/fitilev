'use client';

import useContactModal from "@/hooks/useContactModal";

interface ConsultationButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const ConsultationButton = ({ 
  className = "", 
  children = "Получить консультацию"
}: ConsultationButtonProps) => {
  const { onOpen } = useContactModal();

  return (
    <button 
      onClick={onOpen} 
      className={`btn-primary ${className}`}
    >
      {children}
    </button>
  );
};

export default ConsultationButton; 