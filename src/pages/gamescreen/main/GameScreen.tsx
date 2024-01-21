import Lightbox from "../../../components/ui/Lightbox";
import GameHeader from "../header/GameHeader";
import UIContext from "../../../context/UIContext";
import { useContext, useEffect } from "react";
import MenuModal from "../modals/MenuModal";
import FooterSolo from "../footer/FooterSolo";
import FooterMultiplayer from "../footer/FooterMultiplayer";
import Context from "../../../context/Context";
import MemoryContainer from "../MemoryContainer";
import WinningModal from "../modals/WinningModal";

const GameScreen = () => {
  const uiContext = useContext(UIContext);
  const context = useContext(Context);

  if (!uiContext || !context) {
    throw new Error("Does not exist in contextProvider");
  }

  const { modals, setModals } = uiContext;
  const { selectedSettings, memoryPiecesList, pauseGame } = context;
  const everyPieceTaken = memoryPiecesList.every((piece) => piece.taken);

  useEffect(() => {
    if (!everyPieceTaken) return;
    const updatedModals = { ...modals };
    setModals({ ...updatedModals, lightbox: true, winner: true });
    pauseGame();
  }, [memoryPiecesList]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-[327px] md:w-[689px] xl:w-[1110px] mt-6 md:mt-[37px] xl:mt-[67px] flex flex-col items-center">
        <GameHeader />
        <main>
          <MemoryContainer />
        </main>
        <footer className="flex justify-center w-[327px] md:w-[540px]">
          {selectedSettings.playerNumbers === 1 ? (
            <FooterSolo />
          ) : (
            <FooterMultiplayer />
          )}
        </footer>
      </div>
      {modals.menu && <MenuModal />}
      {modals.lightbox && <Lightbox />}
      {modals.winner && <WinningModal />}
    </div>
  );
};

export default GameScreen;
