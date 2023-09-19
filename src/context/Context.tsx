import { createContext, ReactNode, useState } from "react";
import { gameSettingsType } from "../types/types";

const Context = createContext({});

type ContextValueTypes = {
    gameSettings: gameSettingsType;
};

type ContextType = {
    children: ReactNode;
};

export const ContextProvider: React.FC<ContextType> = ( {children} ) => {
    const [gameSettings, setGameSettings] = useState({theme: "Numbers", players: 1, grid: 4});

    const contextValue = {
        gameSettings: gameSettings
    }

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

export default Context;