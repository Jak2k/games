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
            <ul className="answers">
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
                <ul className="answers">
                  {["A", "B", "C", "D"].map((answer) => (
                    <li key={answer}>
                      <button
                        className="answer"
                        disabled
                        style={
                          questionState.question.correctAnswer === answer
                            ? {
                                backgroundColor: "green",
                              }
                            : {}
                        }
                      >
                        {
                          questionState.question.possibleAnswers[
                            answer as Answer
                          ]
                        }
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => dispatch({ type: "next" })}
                  className="next"
                >
                  Next
                </button>
                <p>{questionState.question.explanation || ""}</p>
              </>
            ) : (
              <>
                <ul className="answers">
                  {["A", "B", "C", "D"].map((answer) => (
                    <li key={answer}>
                      <button
                        className="answer"
                        disabled
                        style={
                          questionState.question.correctAnswer === answer
                            ? {
                                backgroundColor: "green",
                              }
                            : {}
                        }
                      >
                        {
                          questionState.question.possibleAnswers[
                            answer as Answer
                          ]
                        }
                      </button>
                    </li>
                  ))}
                </ul>
              </>
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
