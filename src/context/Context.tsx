import { createContext, ReactNode, useState, useEffect} from "react";
import { SelectedSettingsType, StartMenuSettingsType, MemoryPieceType, PlayersType } from "../types/types";
import { 
    createNumberArray, 
    createSixbySixArray, 
    createFourByFourArray, 
    areTwoPiecesClicked, 
    getListBackWithUntouchedPieces,
    getListBackWithActivePieces, } from "../utils/HelperFuntioncs";

const Context = createContext<ContextValueTypes | undefined>(undefined);

type ContextValueTypes = {
    startMenuSettings: StartMenuSettingsType[];
    selectedSettings: SelectedSettingsType;
    memoryPiecesList: MemoryPieceType[];
    playersList: PlayersType[];
    handleClickOnStartMenuButtons: (buttonLabel: string, panelId: number) => void;
    handleClickOnPiece: (id: number) => void;
};

type ContextType = {
    children: ReactNode;
};

const initialStoredSettings = localStorage.getItem("settings");
const initialStoredPlayers = localStorage.getItem("players");
const initialStoredMenuSettings = localStorage.getItem("menuSettings");

export const ContextProvider: React.FC<ContextType> = ( {children} ) => {
  const [startMenuSettings, setStartMenuSettings] = useState<StartMenuSettingsType[]>(initialStoredMenuSettings ? JSON.parse(initialStoredMenuSettings) : [
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
    const [countdown, setCountdown] = useState("1:59");
    const [moves, setMoves] = useState("0");
    const [selectedSettings, setSelectedSettings] = useState<SelectedSettingsType>(initialStoredSettings ? JSON.parse(initialStoredSettings) : {theme: "Numbers", playerNumbers: 1, grid: "4x4"});
    const [playersList, setPlayersList] = useState<PlayersType[]>(initialStoredPlayers ? JSON.parse(initialStoredPlayers) : []);
    const [memoryPiecesList, setMemoryPiecesList] = useState<MemoryPieceType[]>([])

    const iconArray = ["anchor.svg", "car.svg", "chemistry.svg", "chinese.svg", "hand.svg", "moon.svg", "snow.svg", "soccer.svg", "sun.svg", "flower.svg", "horse.svg", "key.svg", "rectangle.svg", "rhombus.svg", "star.svg", "triangle.svg", "circle.svg", "leaf.svg"];

    const handleClickOnPiece = (id: number) => {
      const numberOfClickedPieces = memoryPiecesList.filter(piece => piece.isClicked).length;
      const updatedMemoryArray = memoryPiecesList.map((piece, index) => {
        if(index !== id || numberOfClickedPieces > 1 || piece.taken) return piece;
          
        return {...piece, isClicked: true}
      })
      setMemoryPiecesList(updatedMemoryArray)
    };

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

    const updatePlayersTurn = (playersList: PlayersType[]) => {
      const updatedPlayersList = [...playersList];
      const PlayerIndex = updatedPlayersList.findIndex(player => player.selected);
      // start with turning off each player's selection
      updatedPlayersList.forEach((_, index) => {
          updatedPlayersList[index].selected = false;
      });
      // Move to next player, and using modulus to check if we should go back to player 1
      const nextIndex = (PlayerIndex + 1) % updatedPlayersList.length;
      updatedPlayersList[nextIndex].selected = true;
      setPlayersList(updatedPlayersList)
    };

    const updatePlayersScore = (playersList: PlayersType[]) => {
      const updatedPlayersList = [...playersList]
      updatedPlayersList.forEach((player, index) => {
        if(player.selected) {
          updatedPlayersList[index].score = updatedPlayersList[index].score  + 1;
        }
      })
      setPlayersList(updatedPlayersList)
    };

    useEffect(() => {
      // setting array length according to number of players selected, and then using the map method to set the player numbers 
      const playerArray = Array.from( {length: selectedSettings.playerNumbers}, (item, index) => item = {player: index + 1, score: 0, selected: false});
      playerArray[0].selected = true;
      setPlayersList(playerArray)
    }, [selectedSettings.playerNumbers])

    useEffect(() => {
      // updating memory pieces depnding on theme and gridsize
      if(selectedSettings.theme === "Icons") {
        let emptyArray: string[] = [];
        const finalArray = selectedSettings.grid === "4x4" ? createFourByFourArray(emptyArray, iconArray) : createSixbySixArray(iconArray);
        setMemoryPiecesList(finalArray)
      } else {
        const gridSize = selectedSettings.grid === "4x4" ? 8 : 18
        setMemoryPiecesList(createNumberArray(gridSize))
      }
    }, [selectedSettings.grid, selectedSettings.theme])
 
    useEffect(() => {
      // array to keep track of clicked pieces
      let clickedPiecesArray: any[] = [];
      // if two items have been clicked
      if(areTwoPiecesClicked(memoryPiecesList)) {
        const piecesList = [...memoryPiecesList];
        piecesList.forEach(piece => {
          if(piece.isClicked) {
            clickedPiecesArray.push(piece.memoryPiece)
          } 
        })
        // if the two pieces clicked are the same
        if(clickedPiecesArray.every(piece => piece === clickedPiecesArray[0])) {
          // update the playerscore and set the pieces as taken
          updatePlayersScore(playersList)
          setMemoryPiecesList(getListBackWithActivePieces(piecesList)) 
        } else {
          // update players turn and reset clicked pieces to untouched state
          updatePlayersTurn(playersList)
          setMemoryPiecesList(getListBackWithUntouchedPieces(piecesList)) 
        }
      } 
    }, [memoryPiecesList, playersList])

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
      localStorage.setItem("menuSettings", JSON.stringify(startMenuSettings))
    }, [startMenuSettings]);

    useEffect(() => {
      localStorage.setItem("settings", JSON.stringify(selectedSettings))
    }, [selectedSettings]);

    useEffect(() => {
      localStorage.setItem("players", JSON.stringify(playersList))
    }, [playersList]);

    const contextValue = {
        startMenuSettings: startMenuSettings,
        selectedSettings: selectedSettings,
        memoryPiecesList: memoryPiecesList,
        playersList: playersList,
        handleClickOnStartMenuButtons: handleClickOnStartMenuButtons,
        handleClickOnPiece: handleClickOnPiece,
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

export default Context;