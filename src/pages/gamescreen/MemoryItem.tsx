import { useEffect } from "react";

type MemoryItemPropsType = {
    pieceLarge: boolean;
    memoryItem: number;
}

const MemoryItem: React.FC<MemoryItemPropsType> = ( {pieceLarge, memoryItem} ) => {

    return (
        <div className={`${pieceLarge ? "text-[2.5rem] md:text-[2.75rem]" : "text-[1.5rem] md:text-[3.5rem]"} font-bold text-white`}>{memoryItem}</div>
    )
}

export default MemoryItem