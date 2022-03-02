import { useEffect } from "react";
import { Key } from "./Key";

interface Props {
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  guesses: string[];
  isRevealing?: boolean;
}

export const Keyboard: React.FC<Props> = ({ onChar, onDelete, onEnter }) => {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        onEnter();
      } else if (e.code === "Backspace") {
        onDelete();
      } else {
        const key = e.key.toUpperCase();
        if (key.length === 1 && key >= "A" && key <= "Z") {
          onChar(key);
        }
      }
    };
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [onEnter, onDelete, onChar]);

  const onClick = (value: string) => {
    if (value === "ENTER") {
      console.log("enter");
    } else if (value === "DELETE") {
      console.log("delete");
    } else {
      console.log("key");
    }
  };

  return (
    <div>
      <div className="flex justify-center mb-1">
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
          <Key value={key} key={key} onClick={onClick} />
        ))}
      </div>
      <div className="flex justify-center mb-1">
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
          <Key value={key} key={key} onClick={onClick} />
        ))}
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          {"Enter"}
        </Key>
        {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
          <Key value={key} key={key} onClick={onClick} />
        ))}
        <Key width={65.4} value="DELETE" onClick={onClick}>
          {"Delete"}
        </Key>
      </div>
    </div>
  );
};
