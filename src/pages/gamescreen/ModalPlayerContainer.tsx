
const ModalPlayerContainer: React.FC<{player: number, score: number, winner?: boolean}> = ( {player, score, winner} ) => {
  return (
    <div className={`${winner ? "bg-[#152938]" : "bg-[#DFE7EC] "} w-full h-[48px] md:h-[72px] px-4 md:px-8 flex items-center justify-between font-bold rounded-[5px] md:rounded-[10px]`}>
        <p className={`${winner ? "text-white" : "text-[#7191A5]"} text-[0.8125rem] md:text-[1.125rem] `}>{`Player ${player} ${winner ? "(Winner!)" : ""}`}</p>
        <p className={`${winner ? "text-white" : "text-[#304859]"} text-[1.25rem] md:text-[2rem] `}>{`${score} Pairs`}</p>
    </div>
  )
}

export default ModalPlayerContainer