import { MemoryPieceType, PlayersType } from "../types/types";

export const getRandomArrayFromIconArray = (iconArray: string[], length: number, array: string[]) => {
    // keeping track of used Indices in an array
    const usedIndices: number[] = [];

    while(array.length < length) {
      // generate randomIndex from icon Array
      let randomIndex = Math.floor(Math.random() * iconArray.length);
      // if randomIndex has not already been generated push it into the array
      if(!usedIndices.includes(randomIndex)) {
        usedIndices.push(randomIndex)
        array.push(iconArray[randomIndex])
      }
    } return array;
};

export const getDoubledAndShuffledArray = (array: string[]) => {
    return array.flatMap(item => [item, item]).sort((a, b) => 0.5 - Math.random())
};

export const getResetMemoryList = (piecesList: MemoryPieceType[]) => {
  return piecesList.map(piece => ({...piece, isClicked: false, taken: false}));
};

export const getResetPlayersList = (playersList: PlayersType[]) => {
  return playersList.map(player => {
    if(player === playersList[0]) return {...player, score: 0, selected: true, winner: false}

    return {...player, score: 0, selected: false, winner: false}
  })
};

export const createNumberArray = (gridSize: number) => {
  let count = 0;
  return Array.from( {length: gridSize} , 
    (item) => {if(count < gridSize) {count += 1;} return item = count;})
    // double each item in the array
    .flatMap(item => [item, item])
    // randomize each location of the item in the array
    .sort((a, b) => 0.5 - Math.random())
    // add taken and isClicked to keep track of user interactions
    .map(number => {return {memoryPiece: number, taken: false, isClicked: false}})
};

export const createFourByFourArray = (originalArray: any[], iconArray: any[]) => {
  // get 8 random items from the original iconArray
  const randomArray = getRandomArrayFromIconArray(iconArray, 8, originalArray);
        // double each item in the array and then shuffle the order
  const fourByfourRandomArray = getDoubledAndShuffledArray(randomArray);
   // add taken and isClicked to each item to keep track of user interactions
  return fourByfourRandomArray.map(icon => ( {memoryPiece: icon, taken: false, isClicked: false}));
};

export const createSixbySixArray = (iconArray: any[]) => {
  const sixBysixRandomArray = getDoubledAndShuffledArray(iconArray);
  return sixBysixRandomArray.map(icon => ( {memoryPiece: icon, taken: false, isClicked: false}))
};

export const areTwoPiecesClicked = (piecesList: MemoryPieceType[]) => {
  return piecesList.filter(piece => piece.isClicked).length === 2
};

export const getListBackWithUntouchedPieces = (piecesList: MemoryPieceType[]) => {
  return piecesList.map(piece => piece.isClicked ? {...piece, isClicked: false, taken: false} : piece); 
};

export const getListBackWithActivePieces = (piecesList: MemoryPieceType[]) => {
  return piecesList.map(piece => (
    piece.isClicked ? {...piece, isClicked: false, taken: true} : piece
  ))
};

export const displayTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60;
  return `${String(minutes)}:${String(remainingSeconds).padStart(2, "0")}`
};