import questions from "./assets/questions.json";

type Question = {
  question: string;
  possibleAnswers: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: string;
};

type QuestionState = {
  status: "question" | "correct" | "wrong";
  question: Question;
  level: number;
};

type QuestionAction = { type: "answer"; answer: string } | { type: "next" };

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
        ? newState.level++ && (newState.status = "correct")
        : (newState.status = "wrong");
      break;
    case "next":
      newState.status = "question";
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
