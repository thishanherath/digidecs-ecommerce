import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState("login"); // 'login' or 'register'

  const openLoginModal = () => {
    setAuthModalType("login");
    setIsAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthModalType("register");
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isAuthModalOpen,
        authModalType,
        openLoginModal,
        openRegisterModal,
        closeAuthModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
