type ButtonPropsType = {
    text: string;
    id: number;
    width: string;
};

const StartSelectButton: React.FC<ButtonPropsType> = ( {text, id, width} ) => {
  return (
    <div className={`${width} h-10 md:h-[52px]`}>{text}</div>
  )
}

export default StartSelectButton