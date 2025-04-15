import { create } from 'zustand'

// Типы услуг
export type ServiceType = 'weightLoss' | 'muscleGain' | 'recovery' | 'generalFitness' | null;

interface ServiceDetailModalStore {
  isOpen: boolean;
  serviceType: ServiceType;
  openModal: (type: ServiceType) => void;
  closeModal: () => void;
}

// Создаем отдельное хранилище для модального окна услуг
const useServiceDetailModal = create<ServiceDetailModalStore>((set, get) => ({
  isOpen: false,
  serviceType: null,
  openModal: (type) => {
    console.log('useServiceDetailModal: opening modal for', type);
    // Устанавливаем значения
    set({ 
      isOpen: true, 
      serviceType: type 
    });
    
    // Логируем текущее состояние после установки
    const state = get();
    console.log('Updated state:', state);
  },
  closeModal: () => {
    console.log('useServiceDetailModal: closing modal');
    set({ isOpen: false, serviceType: null });
  }
}));

export default useServiceDetailModal; 