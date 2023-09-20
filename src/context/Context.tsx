import { createContext, ReactNode, useState } from "react";
import { startMenuSettingsType } from "../types/types";

const Context = createContext<ContextValueTypes | undefined>(undefined);

type ContextValueTypes = {
    startMenuSettings: startMenuSettingsType[];
    handleClickOnStartMenuButtons: (buttonLabel: string, panelId: number) => void;
};

type ContextType = {
    children: ReactNode;
};

export const ContextProvider: React.FC<ContextType> = ( {children} ) => {
    const [startMenuSettings, setStartMenuSettings] = useState([
        {
          id: 1,
          title: "Select Theme",
          buttons: [
            { type: "large", label: "Numbers", selected: true},
            { type: "large", label: "Icons", selected: false},
          ]
        },
        {
          id: 2,
          title: "Numbers of Players",
          buttons: [
            { type: "small", label: "1", selected: true},
            { type: "small", label: "2", selected: false},
            { type: "small", label: "3", selected: false},
            { type: "small", label: "4", selected: false},
          ]
        },  
        {
          id: 3,
          title: "Grid Size",
          buttons: [
            { type: "large", label: "4x4", selected: true},
            { type: "large", label: "6x6", selected: false},
          ]
        },  
      ]);
      
    const handleClickOnStartMenuButtons = (buttonLabel: string, panelId: number) => {
        const updatedStartMenuSettings = startMenuSettings.map(panel => {
            if(panel.id !== panelId) return panel;
            const updatedButtons = panel.buttons.map(button => {
                if(button.label !== buttonLabel) {
                    button.selected = false
                } else {
                    button.selected = true
                }
                return button;
            })
            return {...panel, buttons: updatedButtons}
        })
        setStartMenuSettings(updatedStartMenuSettings)
    };  



    const contextValue = {
        startMenuSettings: startMenuSettings,
        handleClickOnStartMenuButtons: handleClickOnStartMenuButtons
    }

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

export default Context;