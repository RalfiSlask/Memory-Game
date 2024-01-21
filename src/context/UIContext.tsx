import { createContext, ReactNode, useState, useEffect } from "react";
import { ModalsType } from "../types/types";

type UIContextValueTypes = {
  screenSize: string;
  modals: ModalsType;
  setModals: React.Dispatch<React.SetStateAction<ModalsType>>;
  openModal: (modal: keyof ModalsType) => void;
  closeModal: (modal: keyof ModalsType) => void;
};

type UIContextType = {
  children: ReactNode;
};

const UIContext = createContext<UIContextValueTypes | undefined>(undefined);

export const UIContextProvider: React.FC<UIContextType> = ({ children }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenSize, setScreenSize] = useState("");
  const [modals, setModals] = useState({
    lightbox: false,
    menu: false,
    winner: false,
  });

  const openModal = (modal: keyof ModalsType) => {
    setModals((prev) => ({ ...prev, lightbox: true, [modal]: true }));
  };

  const closeModal = (modal: keyof ModalsType) => {
    setModals((prev) => ({ ...prev, lightbox: false, [modal]: false }));
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenWidth < 768) {
      setScreenSize("small");
    } else if (screenWidth < 1280) {
      closeModal("menu");
      setScreenSize("large");
    }
  }, [screenWidth]);

  const UIContextValue = {
    screenSize: screenSize,
    modals: modals,
    openModal: openModal,
    closeModal: closeModal,
    setModals: setModals,
  };

  return (
    <UIContext.Provider value={UIContextValue}>{children}</UIContext.Provider>
  );
};

export default UIContext;
