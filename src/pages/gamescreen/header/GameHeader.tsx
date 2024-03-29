import HeaderButton from "./HeaderButton";
import UIContext from "../../../context/UIContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../../context/Context";

const GameHeader = () => {
  const uiContext = useContext(UIContext);
  const context = useContext(Context);

  if (!uiContext || !context) {
    throw new Error("Does not exist in contextProvider");
  }

  const { screenSize, openModal } = uiContext;
  const { restartGame, navigateToMainMenu, pauseGame } = context;
  const navigate = useNavigate();

  const handleClickOnNewGame = () => {
    navigateToMainMenu(navigate);
  };

  const openMenuModal = () => {
    openModal("menu");
    pauseGame();
  };

  return (
    <header className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-[#152938] font-bold text-[1.5rem] md:text-[2.5rem]">
          memory
        </h1>
        <div className="w-[78px] md:w-[292px] flex justify-between items-center">
          {screenSize === "small" ? (
            <HeaderButton
              text="Menu"
              width="w-[78px]"
              color="FDA214"
              onClick={openMenuModal}
            />
          ) : (
            <>
              <HeaderButton
                text="Restart"
                width="w-[127px]"
                color="FDA214"
                onClick={restartGame}
              />
              <HeaderButton
                text="New Game"
                width="w-[149px]"
                color="#DFE7EC"
                textColor="#304859"
                onClick={handleClickOnNewGame}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
