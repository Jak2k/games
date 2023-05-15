import { useEffect, useState } from "react";

const FPS = 60;

const MIN_SPEED = 0.01;
const MAX_SPEED = 0.05;

const FRAME_OFFSET = 5 * FPS;
const TARGET_Y_SPREAD = 80;
const TARGET_Y_SIN_SPREAD = 20;

const NUMBER_OF_TARGETS = 10;
const TARGET_SIZE = 32;
const SCORE_PER_HIT = 1;

type Target = {
  id: number;
  speed: number;
  y: number;
  frameOffset: number;
};

function App() {
  const [targets, setTargets] = useState<Target[]>([]);
  const [frame, setFrame] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

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
      setScore(score + SCORE_PER_HIT);
    };
  }

  return (
    <>
      <header>
        <h1>Kill the circle</h1>
        <p>Score: {score}</p>
        <p>Frame: {frame}</p>
        <button onClick={initGame}>Restart</button>
      </header>
      <main>
        {gameStarted ? (
          targets.map((target) => (
            <div
              className="circle"
              style={{
                height: TARGET_SIZE,
                width: TARGET_SIZE,
                left: (frame + target.frameOffset) * target.speed + "%",
                top:
                  target.y * TARGET_Y_SPREAD +
                  TARGET_Y_SIN_SPREAD *
                    Math.sin((frame + target.frameOffset) / FPS) +
                  "%",
              }}
              key={target.id}
              onClick={hit(target.id)}
            ></div>
          ))
        ) : (
          <>Start Game by clicking restart</>
        )}
      </main>
    </>
  );
}

export default App;
