'use client';

import useContactModal from "@/hooks/useContactModal";

interface QuestionButtonProps {
  className?: string;
}

const QuestionButton = ({ className = "" }: QuestionButtonProps) => {
  const { onOpen } = useContactModal();

  return (
    <button 
      onClick={onOpen} 
      className={`btn-primary ${className}`}
    >
      Задать вопрос
    </button>
  );
};

export default QuestionButton; 