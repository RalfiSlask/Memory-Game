import { createContext, ReactNode, useState, useEffect, useRef, useCallback} from "react";
import { SelectedSettingsType, StartMenuSettingsType, MemoryPieceType, PlayersType } from "../types/types";
import { 
    createNumberArray, 
    createSixbySixArray, 
    createFourByFourArray, 
    areTwoPiecesClicked, 
    getListBackWithUntouchedPieces,
    getListBackWithActivePieces,
    getResetMemoryList,
    getResetPlayersList,
    displayTime, } from "../utils/HelperFuntioncs";
import { NavigateFunction } from "react-router-dom";
import menuSettingsData from "../data/menuSettingsData.json";
import useLocalStorage from "../utils/useLocalStorage";

const Context = createContext<ContextValueTypes | undefined>(undefined);

type ContextValueTypes = {
    startMenuSettings: StartMenuSettingsType[];
    selectedSettings: SelectedSettingsType;
    memoryPiecesList: MemoryPieceType[];
    playersList: PlayersType[];
    isSolo: boolean;
    moves: number;
    countdown: string;
    handleClickOnStartMenuButtons: (buttonLabel: string, panelId: number) => void;
    handleClickOnPiece: (id: number) => void;
    restartGame: () => void;
    navigateToMainMenu: (navigate: NavigateFunction) => void;
    pauseGame: () => void;
    resumeGame: () => void;
};

type ContextType = {
    children: ReactNode;
};



export const ContextProvider: React.FC<ContextType> = ( {children} ) => {
    const [startMenuSettings, setStartMenuSettings] = useLocalStorage<StartMenuSettingsType[]>("menuSettings", menuSettingsData);
    const [selectedSettings, setSelectedSettings] = useLocalStorage<SelectedSettingsType>("selectedSettings", {theme: "Numbers", playerNumbers: 1, grid: "4x4"});
    const [playersList, setPlayersList] = useLocalStorage<PlayersType[]>("players", []);
    const [memoryPiecesList, setMemoryPiecesList] = useLocalStorage<MemoryPieceType[]>("memorySettings", []);
    const [countdown, setCountdown] = useState("0:00");
    const [moves, setMoves] = useState(0);
    const [isCountDownActive, setIsCountDownActive] = useState(false);
    const [isSolo, setIsSolo] = useState(false);

    const winningSoundRef = useRef(new Audio("/win.mp3"));
    const totalSecondsRef = useRef(0);
    const ICON_ARRAY = ["anchor.svg", "car.svg", "chemistry.svg", "chinese.svg", "hand.svg", "moon.svg", "snow.svg", "soccer.svg", "sun.svg", "flower.svg", "horse.svg", "key.svg", "rectangle.svg", "rhombus.svg", "star.svg", "triangle.svg", "circle.svg", "leaf.svg"];

    const handleClickOnPiece = (id: number) => {
      if(isSolo) {
        setMoves(prev => prev + 1)
        setIsCountDownActive(true);
      }; 
     
      const numberOfClickedPieces = memoryPiecesList.filter(piece => piece.isClicked).length;
      const updatedMemoryArray = memoryPiecesList.map((piece, index) => {
          if(index !== id || numberOfClickedPieces > 1 || piece.taken) return piece;
            
          return {...piece, isClicked: true}
      });
      
      setMemoryPiecesList(updatedMemoryArray);
    };

    useEffect(() => {
      if(isCountDownActive) {
        const interval = setInterval(() => {
          totalSecondsRef.current ++;
          setCountdown(displayTime(totalSecondsRef.current))
        }, 1000);

        return () => clearInterval(interval)
      }
    }, [isCountDownActive]);

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
    
    const updatePlayersTurn = useCallback((playersList: PlayersType[]) => {
      const updatedPlayersList = [...playersList];
      const PlayerIndex = updatedPlayersList.findIndex(player => player.selected);
      // start with turning off each player's selection
      updatedPlayersList.forEach((_, index) => {
          updatedPlayersList[index].selected = false;
      });
      // Move to next player, and using modulus to check if we should go back to player 1
      const nextIndex = (PlayerIndex + 1) % updatedPlayersList.length;
      if(updatedPlayersList[nextIndex]) {
        updatedPlayersList[nextIndex].selected = true;
      }
      setPlayersList(updatedPlayersList)
    }, [setPlayersList]);

    const updatePlayersScore = useCallback((playersList: PlayersType[]) => {
      const updatedPlayersList = [...playersList]
      updatedPlayersList.forEach((player, index) => {
        if(player.selected) {
          updatedPlayersList[index].score = updatedPlayersList[index].score  + 1;
        }
      })
      setPlayersList(updatedPlayersList)
    }, [setPlayersList]);

    const restartGame = () => {
      if(isSolo) {
        setMoves(0);
        setCountdown("0:00")
        setIsCountDownActive(false)
        totalSecondsRef.current = 0;
      };
      setMemoryPiecesList(getResetMemoryList(memoryPiecesList))
      setPlayersList(getResetPlayersList(playersList)) 
    };

    const pauseGame = () => {
      if(!isSolo) return;
      setIsCountDownActive(false)
    };

    const resumeGame = () => {
      if(!isSolo) return;
      setIsCountDownActive(true)
    };

    const navigateToMainMenu = (navigate: NavigateFunction) => {
      restartGame();
      setStartMenuSettings(menuSettingsData)
      navigate("/")
    };

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
          try {
            const audioElement = winningSoundRef.current;
            audioElement.addEventListener("canplaythrough", () => {
              audioElement.play();
            })
          } catch (error) {
            console.error("Error playing audio", error)
          }
          updatePlayersScore(playersList)
          setMemoryPiecesList(getListBackWithActivePieces(piecesList)) 
        } else {
          // update players turn and reset clicked pieces to untouched state
          updatePlayersTurn(playersList)
          setMemoryPiecesList(getListBackWithUntouchedPieces(piecesList)) 
        }
      } 
    }, [memoryPiecesList, playersList, updatePlayersScore, updatePlayersTurn, setMemoryPiecesList]);

    useEffect(() => {
      const everyPieceTaken = memoryPiecesList.every(piece => piece.taken)
      if(everyPieceTaken) {
        // get the highest score from the players
        const mostPairs = Math.max.apply(null, playersList.map(player => player.score))
        const updatedPlayersList = [...playersList]
        updatedPlayersList.forEach((player, index) => {
          if(player.score === mostPairs) {
            updatedPlayersList[index].winner = true;
          }
        });
        setPlayersList(updatedPlayersList)
      }
    }, [memoryPiecesList, setPlayersList, playersList])

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
      if(JSON.stringify(updatedSettings) !== JSON.stringify(selectedSettings)) {
        setSelectedSettings(updatedSettings)
      }
    }, [startMenuSettings, setSelectedSettings, selectedSettings]);

    useEffect(() => {
      if(selectedSettings.playerNumbers === 1) {
        setIsSolo(true)
      } else {
        // setting array length according to number of players selected, and then using the map method to set the player numbers 
        const playerArray = Array.from( {length: selectedSettings.playerNumbers}, (item, index) => item = {player: index + 1, score: 0, selected: false});
        playerArray[0].selected = true;
        setIsSolo(false)
        setPlayersList(playerArray)
      };
    }, [selectedSettings.playerNumbers, setPlayersList]);

    useEffect(() => {
      // updating memory pieces depnding on theme and gridsize
      if(selectedSettings.theme === "Icons") {
        let emptyArray: string[] = [];
        const finalArray = selectedSettings.grid === "4x4" ? createFourByFourArray(emptyArray, ICON_ARRAY) : createSixbySixArray(ICON_ARRAY);
        setMemoryPiecesList(finalArray)
      } else {
        const gridSize = selectedSettings.grid === "4x4" ? 8 : 18
        setMemoryPiecesList(createNumberArray(gridSize))
      }
    }, [selectedSettings.grid, selectedSettings.theme, setMemoryPiecesList]);

    const contextValue = {
        startMenuSettings: startMenuSettings,
        selectedSettings: selectedSettings,
        memoryPiecesList: memoryPiecesList,
        playersList: playersList,
        isSolo: isSolo,
        moves: moves,
        countdown: countdown,
        handleClickOnStartMenuButtons: handleClickOnStartMenuButtons,
        handleClickOnPiece: handleClickOnPiece,
        restartGame: restartGame,
        navigateToMainMenu: navigateToMainMenu,
        pauseGame: pauseGame,
        resumeGame: resumeGame,
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

export default Context;