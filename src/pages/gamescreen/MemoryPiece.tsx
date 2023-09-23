import MemoryNumber from "./MemoryNumber";
import MemoryIcon from "./MemoryIcon";
import { useState, useContext } from "react";
import { IconsListType, NumbersListType } from "../../types/types";
import Context from "../../context/Context";

type MemoryPiecePropsType = {
    index: number;
    dimensions: string;
    number: NumbersListType;
    icon: IconsListType;
    pieceLarge: boolean;
};

const MemoryPiece: React.FC<MemoryPiecePropsType> = ( {index, dimensions, number, icon, pieceLarge} ) => {
    const context = useContext(Context);
  
    if(!context) {
        throw new Error("Does not exist in contextProvider")
    };

    const { selectedSettings } = context;
  
    const [isClicked, SetIsClicked] = useState(false);

    return (
        <div className={`${dimensions} bg-[#304859] hover:bg-[#6395B8] cursor-pointer flex justify-center items-center`}>
            {selectedSettings.theme === "Numbers" ? 
            <MemoryNumber 
                pieceLarge={pieceLarge} 
                number={number}
            /> : 
            <MemoryIcon 
                pieceLarge={pieceLarge} 
                icon={icon}
            />
            }
        </div>
    )
}

export default MemoryPiece