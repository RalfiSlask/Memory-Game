import { createContext, ReactNode, useState, useEffect} from "react";
import { SelectedSettingsType, StartMenuSettingsType, MemoryPieceType, PlayersType } from "../types/types";
import { getRandomArrayFromIconArray, getDoubledAndShuffledArray } from "../utils/HelperFuntioncs";

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
    const [selectedSettings, setSelectedSettings] = useState<SelectedSettingsType>({theme: "Numbers", playerNumbers: 1, grid: "4x4"});
    const [playersList, setPlayersList] = useState<PlayersType[]>([]);
    const [memoryPiecesList, setMemoryPiecesList] = useState<MemoryPieceType[]>([])

    const iconArray = ["anchor.svg", "car.svg", "chemistry.svg", "chinese.svg", "hand.svg", "moon.svg", "snow.svg", "soccer.svg", "sun.svg", "flower.svg", "horse.svg", "key.svg", "rectangle.svg", "rhombus.svg", "star.svg", "triangle.svg", "circle.svg", "leaf.svg"];

    useEffect(() => {
      // setting array length according to number of players selected, and then using the map method to set the player numbers 
      const playerArray = Array.from( {length: selectedSettings.playerNumbers}, (item, index) => item = {player: index + 1, score: 0, selected: false});
      playerArray[0].selected = true;
      setPlayersList(playerArray)
    }, [selectedSettings.playerNumbers])

    useEffect(() => {
      if(selectedSettings.theme === "Icons") {
        let emptyArray: string[] = [];
        // get 8 random items from the original iconArray
        const randomArray = getRandomArrayFromIconArray(iconArray, 8, emptyArray);
        // double each item in the array and then shuffle the order
        const fourByfourRandomArray = getDoubledAndShuffledArray(randomArray);
        const sixBysixRandomArray = getDoubledAndShuffledArray(iconArray);
        // add active and isClicked to each item to keep track of user interactions
        const fourByfourFinalArray = fourByfourRandomArray.map(icon => {return {memoryPiece: icon, active: false, isClicked: false}});
        const sixBysixFinalArray = sixBysixRandomArray.map(icon => {return {memoryPiece: icon, active: false, isClicked: false}});
  
        selectedSettings.grid === "4x4" ? setMemoryPiecesList(fourByfourFinalArray) : setMemoryPiecesList(sixBysixFinalArray)
      } else {
        let count = 0;
        const gridSize = selectedSettings.grid === "4x4" ? 8 : 18
        const numberArray = Array.from( {length: gridSize} , 
          (item) => {if(count < gridSize) {count += 1;} return item = count;})
          // double each item in the array
          .flatMap(item => [item, item])
          // randomize each location of the item in the array
          .sort((a, b) => 0.5 - Math.random())
          // add active and isClicked to keep track of user interactions
          .map(number => {return {memoryPiece: number, active: false, isClicked: false}})
        setMemoryPiecesList(numberArray)
      }
    }, [selectedSettings.grid, selectedSettings.theme])

    const handleClickOnPiece = (id: number) => {
      const numberOfClickedPieces = memoryPiecesList.filter(piece => piece.isClicked).length;
      const updatedMemoryArray = memoryPiecesList.map((piece, index) => {
        if(index !== id || numberOfClickedPieces > 1 || piece.active) return piece;
          
        return {...piece, isClicked: true}
      })
      setMemoryPiecesList(updatedMemoryArray)
    };

    useEffect(() => {
      const numberOfClickedPieces = memoryPiecesList.filter(piece => piece.isClicked).length;
      let clickedPiecesArray: any[] = [];
      // if two items have been clicked
      if(numberOfClickedPieces > 1) {
        const updatedArray = [...memoryPiecesList];
        updatedArray.forEach(piece => {
          if(piece.isClicked) {
            clickedPiecesArray.push(piece.memoryPiece)
          } 
        })
        // if the two pieces clicked are the same
        if(clickedPiecesArray.every(piece => piece === clickedPiecesArray[0])) {
          const newArray = updatedArray.map(piece => {
            if(!piece.isClicked) return piece;
            
            // set the pieces as active and give the player a point


            return {...piece, isClicked: false, active: true}
          }); 
          setMemoryPiecesList(newArray)
        } else {
          const newArray = updatedArray.map(piece => {
            if(!piece.isClicked) return piece;
            
            // should switch user here

            
            return {...piece, isClicked: false, active: false}
          }); 
          setMemoryPiecesList(newArray)
        }
      } 
    }, [memoryPiecesList])

    useEffect(() => {
      const updatedArray = [...playersList]
      const findIndex = updatedArray.findIndex(player => player.selected)
      updatedArray.forEach((obj, index) => {
        updatedArray[index].selected = false;
      })
      if(findIndex > playersList.length) {
        updatedArray[0].selected = true;
      } else {
        if(updatedArray[findIndex + 1]) {
          updatedArray[findIndex + 1].selected = true;
        }
      }
      console.log(updatedArray) 
    })

    const changePlayersTurn = (playersList: PlayersType[]) => {
      const updatedArray = [...playersList];
      const activePlayerIndex = updatedArray.findIndex(player => player.selected);
      // starting with removing each players selection
      updatedArray.forEach((player, index) => {
        updatedArray[index].selected = false;
      });
      console.log(activePlayerIndex, playersList.length)
      if(activePlayerIndex > playersList.length) {
        updatedArray[0].selected = true;
      } else {
        if(updatedArray[activePlayerIndex + 1]) {
          updatedArray[activePlayerIndex + 1].selected = true;
        }
      }
      console.log(updatedArray)
    }

    useEffect(() => {

    }, [playersList])
    
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