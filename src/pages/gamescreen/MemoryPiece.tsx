import { useState, useContext, useEffect, memo } from "react";
import MemoryNumber from "./MemoryNumber";
import Context from "../../context/Context";
import MemoryIcon from "./MemoryIcon";


type MemoryPiecePropsType = {
    index: number;
    dimensions: string;
    memoryItem: number | string;
    pieceLarge: boolean;
    icon?: string;
};

const MemoryPiece: React.FC<MemoryPiecePropsType> = ( {index, dimensions, memoryItem, pieceLarge} ) => {
    const context = useContext(Context);

    if(!context) {
        throw new Error("Does not exist in contextProvider")
    };

    const { numbersList } = context;

    useEffect(() => {
        console.log(numbersList[index])
    })

    return (
        <div className={`${dimensions} bg-[#304859] hover:bg-[#6395B8] cursor-pointer flex justify-center items-center`}>
            {typeof memoryItem === "number" ? 
            <MemoryNumber 
                pieceLarge={pieceLarge} 
                number={memoryItem}
            /> : 
            <MemoryIcon 
                pieceLarge={pieceLarge} 
                icon={memoryItem}
            />
            }
        </div>
    )
}

export default MemoryPiece