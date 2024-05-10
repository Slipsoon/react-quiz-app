import { Fragment } from "react";
import QUESTIONS from "../questions.js";

export default function Answers() {
  return (
    <Fragment>
      <h2>{QUESTIONS[0].text}</h2>
      <div id="answers">
        {QUESTIONS[0].answers.map((answer) => (
          <div key={answer} className="answer">
            <button>{answer}</button>
          </div>
        ))}
      </div>
    </Fragment>
  );
}
