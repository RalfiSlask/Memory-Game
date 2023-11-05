import { MemoryPieceType } from "../../types/types";
import { useEffect, useState } from "react";
const Logo = require("../../assets/key.svg");

const importImage = (name: string) => {
    return require(`../../assets/${name}`)
};

type MemoryNumberPropsType = {
    pieceLarge: boolean;
    memoryPiece: MemoryPieceType;
};

const MemoryItem: React.FC<MemoryNumberPropsType> = ( {pieceLarge, memoryPiece} ) => {
    const [logo, setLogo] = useState(Logo);

    useEffect(() => {
        if(typeof memoryPiece.memoryPiece === "string") {
            setLogo(importImage(memoryPiece.memoryPiece))
        }
    }, [memoryPiece.memoryPiece])

    return (
        <>
        { typeof memoryPiece.memoryPiece === "number" ? 
            <div className={`${pieceLarge ? "text-[2.5rem] md:text-[2.75rem]" : "text-[1.5rem] md:text-[3.5rem]"} font-bold text-white`}>
                {memoryPiece.memoryPiece}
            </div> : 
            <div className={`${pieceLarge ? "w-10 h-10 md:w-14 md:h-14" : "w-[24px] h-[24px] md:h-10 md:w-10"} flex justify-center items-center`}>
                <img src={logo} alt="icon" className="object-cover w-full h-auto"/>
            </div>}
        </>
    )
}

export default MemoryItem