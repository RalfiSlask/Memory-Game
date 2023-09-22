import Lightbox from "../../../components/ui/Lightbox";
import GameHeader from "../header/GameHeader";
import UIContext from "../../../context/UIContext";
import { useContext } from "react";
import MenuModal from "../MenuModal";
import FooterSolo from "../footer/FooterSolo";
import FooterMultiplayer from "../footer/FooterMultiplayer";
import Context from "../../../context/Context";
import MemoryContainer from "../MemoryContainer";


const GameScreen = () => {
    const uiContext = useContext(UIContext);
    const context = useContext(Context);

    if(!uiContext || !context) {
        throw new Error("Does not exist in contextProvider")
    }

    const { modals } = uiContext;
    const { selectedSettings } = context;

  return (
    <div className="flex flex-col items-center">
        <div className="w-[327px] md:w-[689px] xl:w-[1110px] mt-6 md:mt-[37px] xl:mt-[67px] flex flex-col items-center">
            <GameHeader />
            <main>
                <MemoryContainer />
            </main>
            <footer className='flex justify-center'>
                {selectedSettings.playerNumbers === 1 ? <FooterSolo /> : <FooterMultiplayer />}
            </footer>
        </div>
        {modals.menu && <MenuModal />}
        {modals.lightbox && <Lightbox />}
   
    </div>
  )
}

export default GameScreen