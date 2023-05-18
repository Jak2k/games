import { useCallback, useEffect, useState } from "react";
import useSdk, { GameState } from "../../../packages/useSdk";

const FPS = 60;

const MIN_SPEED = 0.01;
const MAX_SPEED = 0.05;

const FRAME_OFFSET = 5 * FPS;
const TARGET_Y_SPREAD = 80;
const TARGET_Y_SIN_SPREAD = 20;

const NUMBER_OF_TARGETS = 10;
const TARGET_SIZE = 32;

const SCORE_PER_HIT = 1;
const MISS_PUNISHMENT = 1;

type Target = {
  id: number;
  speed: number;
  y: number;
  frameOffset: number;
};

type GState = GameState<object>;

function App() {
  const [targets, setTargets] = useState<Target[]>([]);
  const [frame, setFrame] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const recoverGame = useCallback((gameState: GState) => {
    setHighScore(gameState.highScore);
  }, []);

  const { updateGameState } = useSdk<object>(recoverGame);

  useEffect(() => {
    console.log("Sending", {
      highScore,
      score,
      customData: {},
    });
    updateGameState({
      highScore,
      score,
      customData: {},
    });
  }, [highScore, score, updateGameState]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  const initGame = () => {
    const newTargets = [];
    for (let i = 0; i < NUMBER_OF_TARGETS; i++) {
      newTargets.push({
        id: i,
        speed: Math.random() * MIN_SPEED + MAX_SPEED,
        y: Math.random(),
        frameOffset: Math.random() * FRAME_OFFSET,
      });
    }
    setTargets(newTargets);
    setFrame(0);
    setScore(0);
    setGameStarted(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((frame) => frame + 1);
    }, 1000 / FPS);
    return () => clearInterval(interval);
  }, []);

  function hit(id: number) {
    return () => {
      console.log(id);
      const newTargets = targets.filter((target) => target.id !== id);
      setTargets(newTargets);
      setScore((score) => score + SCORE_PER_HIT);
    };
  }

  useEffect(() => {
    if (targets.length === 0) {
      setGameStarted(false);
    }
  }, [targets]);

  return (
    <>
      <header>
        <p>
          {score !== 0 && (
            <>
              {score !== 0 && !gameStarted ? "Score of last match" : "Score"}:{" "}
              {score}/{NUMBER_OF_TARGETS * SCORE_PER_HIT} High Sore: {highScore}
            </>
          )}
        </p>
        {gameStarted && <p>Frame: {frame}</p>}
      </header>
      <main>
        {gameStarted ? (
          targets.map((target) => {
            const xPosition = (frame + target.frameOffset) * target.speed;

            const yPosition =
              target.y * TARGET_Y_SPREAD +
              TARGET_Y_SIN_SPREAD *
                Math.sin((frame + target.frameOffset) / FPS);

            if (xPosition > 100) {
              setScore((score) => score - MISS_PUNISHMENT);
              setTargets((targets) =>
                targets.filter((t) => t.id !== target.id)
              );
            }

            return (
              <div
                className="circle"
                style={{
                  height: TARGET_SIZE,
                  width: TARGET_SIZE,
                  left: xPosition + "%",
                  top: yPosition + "%",
                }}
                key={target.id}
                onClick={hit(target.id)}
              ></div>
            );
          })
        ) : (
          <>
            <h1>Kill the circle</h1>
            <p>
              Click on the button below, to start the game. Then click on the
              circles to kill them.
            </p>
            <p>
              On kill you get {SCORE_PER_HIT} point{SCORE_PER_HIT > 1 && "s"}.
              On miss you lose {MISS_PUNISHMENT} point
              {MISS_PUNISHMENT > 1 && "s"}.
            </p>
            <p>
              FPS: {FPS} <br />
              Number of Targets: {NUMBER_OF_TARGETS}
            </p>
            <button onClick={initGame}>Start Game</button>
          </>
        )}
      </main>
    </>
  );
}

export default App;
