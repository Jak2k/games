import { useReducer } from "react";
import LevelDisplay from "./components/LevelDisplay";
import questionReducer, { Answer, initialState } from "./questionReducer";

function App() {
  const [questionState, dispatch] = useReducer(questionReducer, initialState);
  return (
    <>
      <header>
        <h1>Who gets rich?</h1>
      </header>
      <main>
        {questionState.status === "question" && questionState.question ? (
          <>
            <h2>{questionState.question.question}</h2>
            <ul>
              {["A", "B", "C", "D"].map((answer) => (
                <li key={answer}>
                  <button
                    className="answer"
                    onClick={() =>
                      dispatch({
                        type: "answer",
                        answer: answer as Answer,
                      })
                    }
                  >
                    {questionState.question.possibleAnswers[answer as Answer]}
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h2>Result</h2>
            {questionState.status === "correct" ? (
              <>
                Correct!
                <button onClick={() => dispatch({ type: "next" })}>Next</button>
              </>
            ) : (
              <>Wrong!</>
            )}
            {questionState.status === "won" && <>You won!</>}
          </>
        )}
      </main>
      <LevelDisplay level={questionState.level || 1} />
    </>
  );
}

export default App;
