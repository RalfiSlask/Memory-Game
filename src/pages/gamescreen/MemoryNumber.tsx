type MemoryNumberPropsType = {
    pieceLarge: boolean;
    number: number;
};

const MemoryNumber: React.FC<MemoryNumberPropsType> = ( {pieceLarge, number} ) => {

    return (
        <div className={`${pieceLarge ? "text-[2.5rem] md:text-[2.75rem]" : "text-[1.5rem] md:text-[3.5rem]"} font-bold text-white`}>{number}</div>
    )
}

export default MemoryNumber