import { useCallback, useEffect, useRef, useState } from "react";
import useSdk, { GameState } from "../../../packages/useSdk";

type CustomData = {
  message: string;
  numbers: string;
};

type GState = GameState<CustomData>;

function App() {
  const [numbers, setNumbers] = useState("");
  const numberDisplayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("Remember the Numbers");
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore") || "0")
  );

  const recoverGame = useCallback((gameState: GState) => {
    setMessage(gameState.customData.message || "Remember the Numbers");
    setHighScore(gameState.highScore || 0);
    setNumbers(gameState.customData.numbers || "");
  }, []);

  const { updateGameState } = useSdk<CustomData>(recoverGame);

  useEffect(() => {
    localStorage.setItem("highScore", highScore.toString());
  }, [highScore]);

  const showNumbers = () => {
    if (!numberDisplayRef.current) return;

    numberDisplayRef.current.style.opacity = "1";

    setTimeout(() => {
      if (!numberDisplayRef.current) return;

      numberDisplayRef.current.style.opacity = "0";
    }, 1000);
  };

  useEffect(
    () =>
      updateGameState({
        customData: {
          message,
          numbers,
        },
        highScore,
        score: numbers.length - 1,
      }),
    [numbers, message, highScore, updateGameState]
  );

  const gameOver = () => {
    const score = numbers.length - 1;
    if (score > highScore) {
      setHighScore(score);
    }
    setMessage(`Game Over! Score: ${score} Correct answer: ${numbers}`);
    setNumbers("");
    if (!inputRef.current) return;
    inputRef.current.value = "";
  };

  const nextStep = () => {
    const newNumber = Math.floor(Math.random() * 10);

    if (!inputRef.current) return;

    if (numbers.length > 0) {
      if (inputRef.current.value !== numbers) {
        gameOver();
        return;
      }
    }

    setNumbers((numbers) => numbers + newNumber);
    showNumbers();
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
    <>
      <h1>{message}</h1>
      <p>
        Score: {numbers.length}/{highScore}
      </p>
      <div
        ref={numberDisplayRef}
        style={{
          opacity: 0,
        }}
      >
        Numbers: {numbers}
      </div>
      <div className="inputWrapper">
        <input
          ref={inputRef}
          type="text"
          onSubmit={nextStep}
          onKeyUp={(e) => e.key === "Enter" && nextStep()}
        />
        <button onClick={nextStep}>
          {numbers.length === 0 ? "Start" : "Submit"}
        </button>
      </div>
    </>
  );
}

export default App;
