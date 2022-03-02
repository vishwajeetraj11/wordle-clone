import { useState } from "react";
import { Grid } from "./components/Grid";
import { AiFillInfoCircle } from "react-icons/ai";
import { Keyboard } from "./components/Keyboard";
import {
  ALERT_TIME_MS,
  CORRECT_WORD_MESSAGE,
  MAX_CHALLENGES,
  MAX_WORD_LENGTH,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
} from "./shared/constants";
import { isWinningWord, isWordInWordList, solution } from "./shared/word";
import { Alert } from "./components/Alert";

function App() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isRevealing, setIsRevealing] = useState(false);

  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false);
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false);

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };
  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return;
    }
    if (!(currentGuess.length === MAX_WORD_LENGTH)) {
      setIsNotEnoughLetters(true);
      return setTimeout(() => {
        setIsNotEnoughLetters(false);
      }, ALERT_TIME_MS);
    }

    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true);
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false);
      }, ALERT_TIME_MS);
    }

    const winningWord = isWinningWord(currentGuess);

    if (
      currentGuess.length === MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess("");

      if (winningWord) {
        return setIsGameWon(true);
      }

      if (guesses.length === MAX_CHALLENGES - 1) {
        setIsGameLost(true);
      }
    }
  };

  const onChar = (value: string) => {
    if (
      currentGuess.length < MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  return (
    <div className="App bg-gray-900 min-h-screen">
      <div className="pt-2 pb-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex w-80 mx-auto items-center mb-8 mt-4">
          <h1 className="text-2xl ml-2.5 grow font-bold text-white">Wordle</h1>
          <AiFillInfoCircle
            fill={"#ffffff"}
            className="cursor-pointer"
            size={24}
          />
        </div>
        <Grid
          guesses={guesses}
          currentGuess={currentGuess}
          isRevealing={isRevealing}
        />
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          guesses={guesses}
          isRevealing={isRevealing}
        />
        <Alert message={CORRECT_WORD_MESSAGE(solution)} isOpen={isGameLost} />
        <Alert
          message={NOT_ENOUGH_LETTERS_MESSAGE}
          isOpen={isNotEnoughLetters}
        />
        <Alert
          message={WORD_NOT_FOUND_MESSAGE}
          isOpen={isWordNotFoundAlertOpen}
        />
        <Alert
          message={"Congratulations!"}
          isOpen={isGameWon}
          variant="success"
        />
      </div>
    </div>
  );
}

export default App;
