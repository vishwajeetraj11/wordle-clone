import { ReactNode } from "react";
import classnames from "classnames";

type Props = {
  children?: ReactNode;
  value: string;
  width?: number;
  onClick: (value: string) => void;
};

export const Key = ({ children, width = 40, value, onClick }: Props) => {
  const classes = classnames(
    "flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none text-white",
    {
      "bg-slate-400 bg-slate-800 text-white": false,
      "bg-slate-200 bg-slate-600 hover:bg-slate-500 active:bg-slate-400": true,
    }
  );

  const styles = {
    width: `${width}px`,
    height: "58px",
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value);
    event.currentTarget.blur();
  };

  return (
    <button style={styles} className={classes} onClick={handleClick}>
      {children || value}
    </button>
  );
};
