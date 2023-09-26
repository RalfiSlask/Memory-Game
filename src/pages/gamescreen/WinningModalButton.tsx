type WinningModalButtonPropsType = {
    text: string;
    color: string;
    textColor?: string;
    onClick?: () => void;
  }
  
  const WinningModalButton: React.FC<WinningModalButtonPropsType> = ( {text, color, textColor, onClick} ) => {
    return (
      <div onClick={onClick} style={{backgroundColor: color, color: textColor}} className={`text-white flex justify-center items-center h-12 md:h-[52px] hover:opacity-75 w-full text-[1.125rem] md:text-[1.25rem] font-bold rounded-[26px] md:rounded-[35px] cursor-pointer`}>
        {text}
      </div>
    )
  }
  
  export default WinningModalButton