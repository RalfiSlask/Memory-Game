
const ModalSoloContainer: React.FC< {label: string, gameMetric: string}> = ( {label, gameMetric} ) => {
  return (
    <div className="bg-[#DFE7EC] w-full h-[48px] md:h-[72px] px-4 md:px-8 flex items-center justify-between font-bold rounded-[5px] md:rounded-[10px]">
        <p className="text-[#7191A5] text-[0.8125rem] md:text-[1.125rem]">{label}</p>
        <p className="text-[#304859] text-[1.25rem] md:text-[2rem]">{gameMetric}</p>
    </div>
  )
}

export default ModalSoloContainer