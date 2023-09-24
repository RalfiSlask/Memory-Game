

const ContainerHeading: React.FC< {text: string, selected?: boolean} > = ( {text, selected} ) => {
  return (
    <div className={`${selected ? "text-white" : "text-[#7191A5]"} font-bold text-[0.9375rem] md:text-[1.125rem] `}>{text}</div>
  )
}

export default ContainerHeading