import ContainerHeading from "../../../components/ui/ContainerHeading";
import UIContext from "../../../context/UIContext";
import { useContext } from "react";
import { PlayersType } from "../../../types/types";

const MultiplayerContainer: React.FC<{
  label: string;
  player: PlayersType;
}> = ({ label, player }) => {
  const uiContext = useContext(UIContext);

  if (!uiContext) {
    throw new Error("Does not exist in contextProvider");
  }

  const { screenSize } = uiContext;
  const { selected, score } = player;

  return (
    <>
      <div className="relative flex flex-col items-center gap-6">
        {selected && (
          <div className="absolute triangle-small md:triangle-medium xl:triangle-big top-[-10px] md:top-[-15px] xl:top-[-20px] left-1/2 -translate-x-1/2"></div>
        )}
        <div
          className={`${
            selected ? "bg-[#FDA214]" : "bg-[#DFE7EC]"
          } rounded-[5px] h-[70px] md:h-20 w-[64px] xl:h-20 md:w-[164px] xl:w-[255px] flex flex-col xl:flex-row items-center md:items-start xl:items-center justify-center md:px-4 xl:px-6 xl:justify-between`}
        >
          <ContainerHeading text={label} selected={selected} />
          <p
            className={`${
              selected ? "text-white" : "text-[#304859]"
            } font-bold  text-[1.5rem] xl:text-[2rem]`}
          >
            {score}
          </p>
        </div>
        {screenSize !== "small" && selected && (
          <p className="uppercase font-bold text-[0.625rem] xl:text-[0.8125rem] tracking-[5px]">
            current turn
          </p>
        )}
      </div>
    </>
  );
};

export default MultiplayerContainer;
