type HeaderButtonPropsType = {
  color: string;
  text: string;
  width: string;
  textColor?: string;
  onClick?: () => void;
};

const HeaderButton: React.FC<HeaderButtonPropsType> = ({
  color,
  text,
  width,
  textColor,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: color, color: textColor }}
      className={`${width} text-white h-10 md:h-[52px] bg-[#FDA214] hover:opacity-75 flex justify-center items-center rounded-[26px] cursor-pointer font-bold text-[1rem] md:text-[1.250rem]`}
    >
      {text}
    </div>
  );
};

export default HeaderButton;
