import { MemoryPieceType } from "../../types/types";

type MemoryNumberPropsType = {
    pieceLarge: boolean;
    memoryPiece: MemoryPieceType;
};

const MemoryItem: React.FC<MemoryNumberPropsType> = ( {pieceLarge, memoryPiece} ) => {

    return (
        <>
        { typeof memoryPiece.memoryPiece === "number" ? 
            <div className={`${pieceLarge ? "text-[2.5rem] md:text-[2.75rem]" : "text-[1.5rem] md:text-[3.5rem]"} font-bold text-white`}>
                {memoryPiece.memoryPiece}
            </div> : 
            <div className={`${pieceLarge ? "w-10 h-10 md:w-14 md:h-14" : "w-[24px] h-[24px] md:h-10 md:w-10"} flex justify-center items-center`}>
                <img src={`/assets/${memoryPiece.memoryPiece}`} alt="icon" className="object-cover w-full h-auto"/>
            </div>}
        </>
    )
}

export default MemoryItem