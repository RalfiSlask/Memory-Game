import { useState, useEffect } from "react";

type MemoryPiecePropsType = {
    id: number;
    dimensions: string;
};

const MemoryPiece: React.FC<MemoryPiecePropsType> = ( {id, dimensions} ) => {
    const [isClicked, setIsClicked] = useState(false)

    return (
        <div className={`${dimensions} bg-[#304859] hover:bg-[#6395B8] cursor-pointer`}></div>
    )
}

export default MemoryPiece