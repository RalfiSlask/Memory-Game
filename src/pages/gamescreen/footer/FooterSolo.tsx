import SoloContainer from "./SoloContainer";

const FooterSolo = () => {
  return (
    <div className='w-full md:w-[540px] flex justify-between items-end'>
        <SoloContainer title="Time"/>
        <SoloContainer title="Moves"/>
    </div>
  )
}

export default FooterSolo