type MemoryIconPropsType = {
    pieceLarge: boolean;
    icon: string;
};

const MemoryIcon: React.FC<MemoryIconPropsType> = ( {pieceLarge, icon} ) => {
  return (
    <div className={`${pieceLarge ? "w-10 h-10 md:w-14 md:h-14" : "w-[24px] h-[24px] md:h-10 md:w-10"} flex justify-center items-center`}>
        <img src={`/assets/${icon}`} alt="icon" className="object-cover w-full h-auto"/>
    </div>
  )
}

export default MemoryIcon