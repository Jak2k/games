import questions from "./assets/questions.json";
import { Level } from "./components/LevelDisplay";

export type Answer = "A" | "B" | "C" | "D";

type Question = {
  question: string;
  possibleAnswers: {
    [K in Answer]: string;
  };
  correctAnswer: string;
};

type QuestionState = {
  status: "question" | "correct" | "wrong" | "won";
  question: Question;
  level: Level;
};

type QuestionAction = { type: "answer"; answer: Answer } | { type: "next" };

function getRandomQuestion(level: number): Question {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const levelQuestions = questions[level.toString()];

  const randomIndex = Math.round(Math.random() * levelQuestions.length);

  return levelQuestions[randomIndex];
}

export default function questionReducer(
  state: QuestionState,
  action: QuestionAction
): QuestionState {
  const newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "answer":
      newState.question.correctAnswer === action.answer
        ? (newState.status = "correct")
        : (newState.status = "wrong");
      break;
    case "next":
      newState.status = "question";
      newState.level++;
      if (newState.level > 15) {
        newState.status = "won";
        break;
      }
      newState.question = getRandomQuestion(newState.level);
      break;
  }

  return newState;
}

export const initialState: QuestionState = {
  status: "question",
  question: getRandomQuestion(1),
  level: 1,
};
