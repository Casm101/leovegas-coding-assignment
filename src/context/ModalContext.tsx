// Module imports
import { useState, useContext, createContext } from "react";


// Provider context props declaration
interface ModalContextProps {
  showModal: (id: string) => void;
  hideModal: () => void;
  modalId: string | null;
  isModalOpen: boolean;
}

// Context declaration
const ModalContext = createContext<ModalContextProps | undefined>(undefined);

// Provider declaration
export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  // Modal states
  const [modalId, setModalId] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const showModal = (id: string) => {
    setModalId(id);
    setModalOpen(true);
  };

  const hideModal = () => {
    setModalId(null);
    setModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal, modalId, isModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

// Hook declaration
export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used withing the ModalProvider');
  return context;
};