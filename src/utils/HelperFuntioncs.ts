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

