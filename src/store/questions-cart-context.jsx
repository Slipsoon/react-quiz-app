import { createContext, useReducer } from "react";
import QUESTIONS from "../questions.js";

const CORRECT_ANSWERS = [
  {
    id: "q1",
    answer: "A library to build user interfaces with help of declarative code.",
  },
  {
    id: "q2",
    answer:
      "Enabling the use of state and other React features in functional components.",
  },
  {
    id: "q3",
    answer: "A specific HTML version that was explicitly created for React.",
  },
  {
    id: "q4",
    answer:
      "By defining a JavaScript function that returns a renderable value.",
  },
  {
    id: "q5",
    answer:
      "An object in a component that holds values and may cause the component to render on change.",
  },
  {
    id: "q6",
    answer:
      "By using the map() method to iterate over an array of data and returning JSX.",
  },
  {
    id: "q7",
    answer: "Using a the #if template syntax.",
  },
];

export const QuestionsContext = createContext({
  question: {},
  questionStatus: "",
  summaryStats: [],
  answerQuestion: () => {},
  getNextQuestion: () => {},
});

function questionReducer(state, action) {
  const currentQuestionObj = QUESTIONS.find(
    (question) => question.id === state.question.id
  );
  const currentQuestionIndex = QUESTIONS.indexOf(currentQuestionObj);

  if (action.type === "ANSWER") {
    if (action.answer === undefined) {
      return {
        question: QUESTIONS[currentQuestionIndex],
        questionStatus: "",
        summaryStats: [
          ...state.summaryStats,
          {
            question: state.question.text,
            answer: undefined,
            result: "skipped",
          },
        ],
      };
    }

    const isAnswerCorrect =
      CORRECT_ANSWERS.find(
        (correctAnswer) => correctAnswer.id === state.question.id
      ).answer === action.answer;

    if (isAnswerCorrect) {
      return {
        question: QUESTIONS[currentQuestionIndex],
        questionStatus: "correct",
        summaryStats: [
          ...state.summaryStats,
          {
            question: state.question.text,
            answer: action.answer,
            result: "correct",
          },
        ],
      };
    } else {
      return {
        question: QUESTIONS[currentQuestionIndex],
        questionStatus: "wrong",
        summaryStats: [
          ...state.summaryStats,
          {
            question: state.question.text,
            answer: action.answer,
            result: "wrong",
          },
        ],
      };
    }
  }

  if (action.type === "GET_NEXT_QUESTION") {
    if (QUESTIONS.length > currentQuestionIndex + 1) {
      return {
        question: QUESTIONS[currentQuestionIndex + 1],
        questionStatus: "",
        summaryStats: [...state.summaryStats],
      };
    } else {
      return {
        question: {},
        questionStatus: "",
        summaryStats: [...state.summaryStats],
      };
    }
  }
}

export default function QuestionsContextProvider({ children }) {
  const [questionState, questionDispatch] = useReducer(questionReducer, {
    question: QUESTIONS[0],
    questionStatus: "",
    summaryStats: [],
  });

  function handleAnswerQuestion(answer) {
    questionDispatch({
      type: "ANSWER",
      answer,
    });
  }

  function handleGetNextQuestion() {
    questionDispatch({
      type: "GET_NEXT_QUESTION",
    });
  }

  const ctxValue = {
    question: questionState.question,
    questionStatus: questionState.questionStatus,
    summaryStats: questionState.summaryStats,
    answerQuestion: handleAnswerQuestion,
    getNextQuestion: handleGetNextQuestion,
  };

  return (
    <QuestionsContext.Provider value={ctxValue}>
      {children}
    </QuestionsContext.Provider>
  );
}
