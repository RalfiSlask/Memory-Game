import { createContext, ReactNode, useState, useEffect } from "react";
import { SelectedSettingsType, StartMenuSettingsType } from "../types/types";

const Context = createContext<ContextValueTypes | undefined>(undefined);

type ContextValueTypes = {
    startMenuSettings: StartMenuSettingsType[];
    selectedSettings: SelectedSettingsType;
    handleClickOnStartMenuButtons: (buttonLabel: string, panelId: number) => void;
};

type ContextType = {
    children: ReactNode;
};

export const ContextProvider: React.FC<ContextType> = ( {children} ) => {
  const [countdown, setCountdown] = useState("1:59");
  const [moves, setMoves] = useState("0");


  const [numbersList, setNumbersList] = useState<number[]>([]);  
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
          title: "Number of Players",
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
    const [selectedSettings, setSelectedSettings] = useState<SelectedSettingsType>({theme: "", playerNumbers: 1, grid: ""})

    useEffect(() => {
      let updatedSettings = {...selectedSettings}
      startMenuSettings.forEach(setting => {
        setting.buttons.forEach(button => {
          if(button.selected) {
            if(setting.title === "Select Theme") {
              updatedSettings.theme = button.label;
            } else if(setting.title === "Number of Players") {
              updatedSettings.playerNumbers = Number(button.label);
            } else if(setting.title === "Grid Size") {
              updatedSettings.grid = button.label;
            }
          }
        });
      }); 
      setSelectedSettings(updatedSettings)
    }, [startMenuSettings]);

    useEffect(() => {
      let count = 0;
      console.log(selectedSettings)
      const gridSize = selectedSettings.grid === "4x4" ? 8 : 16
      const numberArray = Array.from( {length: gridSize} , 
        // map function in Array.from that sets the numbers according to gridSize
        (item) => {if(count < gridSize) {count += 1;} return item = count;})
        // double each item in the array
        .flatMap(item => [item, item])
        // randomize each location of the item in the array
        .sort((a, b) => 0.5 - Math.random());
      setNumbersList(numberArray)
    }, [selectedSettings.grid]);

    useEffect(() => {
      console.log(numbersList)
      console.log(selectedSettings)
    }, [selectedSettings])
    
  
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
        selectedSettings: selectedSettings,
        handleClickOnStartMenuButtons: handleClickOnStartMenuButtons,
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

export default Context;