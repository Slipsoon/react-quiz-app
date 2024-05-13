import { Fragment, useContext, useEffect, useState } from "react";
import { QuestionsContext } from "../store/questions-cart-context.jsx";
import ProgressBar from "./ProgressBar.jsx";

const ANSWER_TIMER = 1000;
const NEXT_QUESTION_TIMER = 3000;

export default function Questions({ onSummaryDisplay }) {
  const { question, answerQuestion, getNextQuestion } =
    useContext(QuestionsContext);
  const [answerState, setAnswerState] = useState({});

  useEffect(() => {
    if (question.question.id === undefined) {
      onSummaryDisplay();
    } else if (question.questionStatus) {
      setAnswerState((prevAnswerState) => {
        return {
          timer: NEXT_QUESTION_TIMER,
          state: question.questionStatus,
          answer: prevAnswerState.answer,
        };
      });
    }
  }, [question]);

  function handleAnswer(answer) {
    if (answer) {
      setAnswerState((prevAnswerState) => {
        return {
          timer: ANSWER_TIMER,
          state: "selected",
          answer,
        };
      });

      setTimeout(() => {
        answerQuestion(answer);
      }, ANSWER_TIMER);

      setTimeout(() => {
        getNextQuestion();
        setAnswerState({});
      }, ANSWER_TIMER + NEXT_QUESTION_TIMER);
    } else {
      getNextQuestion();
      setAnswerState({});
    }
  }

  return (
    <>
      {question.question.id && (
        <>
          <ProgressBar answer={answerState} onAnswerTimeout={handleAnswer} />
          <h2>{question.question.text}</h2>
          <div id="answers">
            {question.question.answers.map((answer) => (
              <div key={answer} className="answer">
                <button
                  disabled={answerState.state}
                  className={
                    answerState.answer === answer ? answerState.state : ""
                  }
                  onClick={() => handleAnswer(answer)}
                >
                  {answer}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
