'use client';

import { ServiceType } from '@/hooks/useServiceDetailModal';
import useServiceDetailModal from '@/hooks/useServiceDetailModal';
import { ReactNode } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  serviceType: ServiceType;
  features: string[];
  icon?: ReactNode;
}

const ServiceCard = ({ title, description, serviceType, features, icon }: ServiceCardProps) => {
  const { openModal } = useServiceDetailModal();

  const handleOpenModal = () => {
    console.log('Opening modal for service:', serviceType);
    openModal(serviceType);
  };

  return (
    <article className="bg-[var(--card-bg)] rounded-lg p-8 shadow-lg hover:shadow-xl transition-all flex flex-col h-full">
      <div className="flex-grow">
        {icon && <div className="text-[var(--accent)] text-3xl mb-4" aria-hidden="true">{icon}</div>}
        <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">{title}</h3>
        <p className="text-[var(--text-secondary)] mb-6">{description}</p>
        
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-[var(--accent)] flex-shrink-0 mt-1" aria-hidden="true">
                ✓
              </span>
              <span className="text-[var(--text-secondary)]">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <button 
        onClick={handleOpenModal}
        className="w-full py-3 px-4 bg-[var(--accent)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-colors text-center font-medium mt-auto focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
        aria-label={`Узнать подробнее о услуге: ${title}`}
      >
        Узнать подробнее
      </button>
    </article>
  );
};

export default ServiceCard; 