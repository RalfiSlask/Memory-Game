import { createContext, ReactNode, useState, useEffect } from "react";

type ModalsType = {
    lightbox: boolean;
    menu: boolean;
}

type UIContextValueTypes = {
    screenSize: string;
    modals: ModalsType;
    openMenuModal: () => void;
    closeMenuModal: () => void;
}

type UIContextType = {
    children: ReactNode;
}

const UIContext = createContext<UIContextValueTypes | undefined>(undefined);

export const UIContextProvider: React.FC<UIContextType> = ( {children} ) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenSize, setScreenSize] = useState("");
    const [modals, setModals] = useState({lightbox: false, menu: false})

    const openMenuModal = () => {
        setModals(prev => ({...prev, lightbox: true, menu: true}))
    };

    const closeMenuModal = () => {
        setModals(prev => ({...prev, lightbox: false, menu: false}))
    };

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth)
        };

        window.addEventListener("resize", handleResize);

        return () => { 
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    useEffect(() => {
        if(screenWidth < 768) {
            setScreenSize("small")
        } else if(screenWidth < 1280) {
            closeMenuModal();
            setScreenSize("large")
        }
    }, [screenWidth]);

    const UIContextValue = {
        screenSize: screenSize,
        modals: modals,
        openMenuModal: openMenuModal,
        closeMenuModal: closeMenuModal,
    };

    return (
        <UIContext.Provider value={UIContextValue}>
            {children}
        </UIContext.Provider>
    )

}

export default UIContext;