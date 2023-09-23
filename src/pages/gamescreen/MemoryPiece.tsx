import { useState } from "react";
import MemoryItem from "./MemoryItem";

type MemoryPiecePropsType = {
    id: number;
    dimensions: string;
    memoryItem: number;
    pieceLarge: boolean;
};

const MemoryPiece: React.FC<MemoryPiecePropsType> = ( {id, dimensions, memoryItem, pieceLarge} ) => {

    const [isClicked, setIsClicked] = useState(false)

    return (
        <div className={`${dimensions} bg-[#304859] hover:bg-[#6395B8] cursor-pointer flex justify-center items-center`}>
            <MemoryItem pieceLarge={pieceLarge} memoryItem={memoryItem}/>
            <img src={"/assets/key.svg"} alt="anchor" />
        </div>
    )
}

export default MemoryPiece