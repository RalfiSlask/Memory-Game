type WinnerTextPropType = {
    winnerText: string;
    gameOverText: string;
};

const WinningHeadings: React.FC<WinnerTextPropType> = ( {winnerText, gameOverText} ) => {
  return (
    <div className="flex flex-col gap-2 md:gap-3 items-center">
        <h1 className="font-bold text-[1.5rem] md:text-[3rem] text-[#152938]">{winnerText}</h1>
        <h3 className="font-bold text-[0.875rem] md:text-[1.125rem] text-[#7191A5]">{gameOverText}</h3>
    </div>

  )
}

export default WinningHeadings