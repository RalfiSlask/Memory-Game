
import { useContext } from "react";
import Context from "../../../context/Context";

const FooterMultiplayer = () => {
  const context = useContext(Context);

  if(!context) {
      throw new Error("Does not exist in contextProvider")
  }

  const { selectedSettings } = context;

  return (
    <div>
      {Array.from({ length: Number(selectedSettings.playerNumbers)}).map((_, index) => (
        <FooterMultiplayer />
      ))}
    </div>
  )
}

export default FooterMultiplayer