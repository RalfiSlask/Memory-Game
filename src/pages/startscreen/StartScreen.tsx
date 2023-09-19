import StartContainer from "./StartContainer"

const StartScreen = () => {
  return (
    <div className="w-full h-full bg-[#152938] flex flex-col items-center">
        <div className="flex flex-col gap-11 md:gap-[78px] mt-20 md:mt-[160px]">
            <h1 className='text-[#FCFCFC] text-center text-[2rem] md:text-[2.5rem] font-bold'>memory</h1>
            <StartContainer />
        </div>
    </div>
  )
}

export default StartScreen
