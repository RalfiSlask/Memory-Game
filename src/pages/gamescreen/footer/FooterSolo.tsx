import SoloContainer from "./SoloContainer";
import Context from "../../../context/Context";
import { useContext } from "react";

const FooterSolo = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Does not exist in Provider");
  }

  const { moves, countdown } = context;

  return (
    <div className="w-full md:w-[540px]  flex justify-between items-end">
      <SoloContainer title="Time" gameMetric={countdown} />
      <SoloContainer title="Moves" gameMetric={moves.toString()} />
    </div>
  );
};

export default FooterSolo;
