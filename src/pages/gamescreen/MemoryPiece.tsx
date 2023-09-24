import { useState, useContext, useEffect } from "react";
import { MemoryPieceType } from "../../types/types";
import Context from "../../context/Context";
import MemoryItem from "./MemoryItem";

type MemoryPiecePropsType = {
    index: number;
    dimensions: string;
    memoryPiece: MemoryPieceType;
    pieceLarge: boolean;
};

const MemoryPiece: React.FC<MemoryPiecePropsType> = ( {index, dimensions, memoryPiece, pieceLarge} ) => {
    const context = useContext(Context);
  
    if(!context) {
        throw new Error("Does not exist in contextProvider")
    };

    if(!memoryPiece) {
        return null;
    };

    const { handleClickOnPiece } = context;

    const memoryPieceBackgroundColor = memoryPiece.isClicked ? "bg-[#FDA214]" : memoryPiece.active ? "bg-[#BCCED9]" : "bg-[#304859] hover:bg-[#6395B8]";

    return (
        <div onClick={() => {handleClickOnPiece(index)}} className={`${dimensions} ${memoryPieceBackgroundColor} cursor-pointer flex justify-center items-center`}>
            { (memoryPiece.isClicked || memoryPiece.active) &&
            <MemoryItem 
                memoryPiece={memoryPiece} 
                pieceLarge={pieceLarge} 
            />
            }
        </div>
    )
}

export default MemoryPiece