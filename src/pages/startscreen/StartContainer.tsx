import StartSelectionPanel from "./StartSelectionPanel";
import MediumButton from "./ui/MediumButton";
import SmallButton from "./ui/SmallButton";
import Context from "../../context/Context";
import { useContext } from "react";
import LargeButton from "./ui/LargeButton";
import { useNavigate } from "react-router-dom";

const StartContainer = () => {
  const context = useContext(Context);
  const navigate = useNavigate();

  if(!context) {
    throw new Error("Does not exist in Provider")
  }

  const { startMenuSettings, handleClickOnStartMenuButtons } = context;

  const handleClickOnStartGame = () => {
      navigate("./game")
  };

  return (
     <div className='bg-white w-[327px] md:w-[654px] h-[386px] md:h-[559px] p-6 md:p-14 rounded-[20px] flex flex-col gap-8'>
      <div className="flex flex-col gap-6 md:gap-[26px]">
        {startMenuSettings.map(section => {
          const { id, title, buttons } = section;
          return (
            <StartSelectionPanel key={id} title={title}>
              <div className="flex justify-between">
                {buttons.map((button, index) => {
                  const { label, type, selected } = button;
                  const ButtonType = type === "large" ? MediumButton : SmallButton;
                  return <ButtonType key={index} label={label} selected={selected} onClick={() => {handleClickOnStartMenuButtons(label, id)}}/>;
                })}
              </div>
            </StartSelectionPanel>
            )
        })}
      </div>
        <LargeButton text="Start Button" color="#FFB84A" onClick={handleClickOnStartGame}/>
     </div>
  )
}

export default StartContainer