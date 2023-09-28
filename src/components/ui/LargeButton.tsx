type LargeButtonPropsType = {
  text: string;
  color: string;
  textColor?: string;
  onClick?: () => void;
}

const LargeButton: React.FC<LargeButtonPropsType> = ( {text, color, textColor, onClick} ) => {
  return (
    <div onClick={onClick} style={{backgroundColor: color, color: textColor}} className={`text-white flex justify-center items-center h-12 md:h-[70px] hover:opacity-75 w-full text-[1.125rem] md:text-[2rem] font-bold rounded-[26px] md:rounded-[35px] cursor-pointer`}>
      {text}
    </div>
  )
}

export default LargeButton