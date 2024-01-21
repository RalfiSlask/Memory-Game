import WinningModalButton from "./WinningModalButton";
import UIContext from "../../../context/UIContext";
import Context from "../../../context/Context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WinningHeadings from "./WinningHeadings";
import ModalPlayerContainer from "./ModalPlayerContainer";
import { PlayersType } from "../../../types/types";
import ModalSoloContainer from "./ModalSoloContainer";

const WinningModal = () => {
  const [winnerList, setWinnerList] = useState<PlayersType[]>([]);
  const uiContext = useContext(UIContext);
  const context = useContext(Context);

  if (!uiContext || !context) {
    throw new Error("Does not exist in contextProvider");
  }

  const { closeModal } = uiContext;
  const {
    navigateToMainMenu,
    restartGame,
    playersList,
    isSolo,
    moves,
    countdown,
  } = context;
  const navigate = useNavigate();

  const handleClickOnRestart = () => {
    closeModal("winner");
    restartGame();
  };

  const handleClickOnNewGame = () => {
    navigateToMainMenu(navigate);
    closeModal("winner");
  };

  useEffect(() => {
    const winnerOrWinners = playersList.filter((player) => player.winner);
    setWinnerList(winnerOrWinners);
  }, [playersList]);

  const winningText =
    winnerList.length > 1
      ? "It’s a tie!"
      : `Player ${winnerList[0] ? winnerList[0].player : ""} Wins!`;
  const gameOverText = isSolo
    ? "Game over! Here’s how you got on…"
    : "Game over! Here are the results...";

  return (
    <div
      className={`bg-[#F2F2F2] rounded-[10px] w-[327px] md:w-[654px] px-6 md:px-14 pb-6 md:pb-[69px] md:pt-[51px] pt-8 absolute z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
    >
      <WinningHeadings
        winnerText={isSolo ? "You did it!" : winningText}
        gameOverText={gameOverText}
      />
      <div className="flex flex-col gap-2 md:gap-4 my-6">
        {isSolo ? (
          <>
            <ModalSoloContainer label="Time Elapsed" gameMetric={countdown} />
            <ModalSoloContainer
              label="Moves Taken"
              gameMetric={moves.toString()}
            />
          </>
        ) : (
          playersList.map((playerObject, index) => {
            const { player, score, winner } = playerObject;
            return (
              <ModalPlayerContainer
                key={index}
                player={player}
                score={score}
                winner={winner}
              />
            );
          })
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-[14px]">
        <WinningModalButton
          text="Restart"
          color="#FDA214"
          onClick={handleClickOnRestart}
        />
        <WinningModalButton
          text="Setup New Game"
          color="#DFE7EC"
          textColor="#304859"
          onClick={handleClickOnNewGame}
        />
      </div>
    </div>
  );
};

export default WinningModal;
