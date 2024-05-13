import { useContext } from "react";
import quizCompleted from "../assets/quiz-complete.png";
import { QuestionsContext } from "../store/questions-cart-context";

export default function Summary() {
  const { summaryStats } = useContext(QuestionsContext);
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let skippedAnswers = 0;

  summaryStats.forEach((stat) => {
    switch (stat.result) {
      case "correct":
        correctAnswers++;
        break;
      case "wrong":
        incorrectAnswers++;
        break;
      case "skipped":
        skippedAnswers++;
        break;
    }
  });

  return (
    <div id="summary">
      <img src={quizCompleted} alt="quiz completed goblet" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">
            {Math.floor((skippedAnswers / summaryStats.length) * 100) + "%"}
          </span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">
            {Math.floor((correctAnswers / summaryStats.length) * 100) + "%"}
          </span>
          <span className="text">Answered correctly</span>
        </p>
        <p>
          <span className="number">
            {Math.floor((incorrectAnswers / summaryStats.length) * 100) + "%"}
          </span>
          <span className="text">Answered incorrectly</span>
        </p>
      </div>
      <ol>
        {summaryStats.map((stat) => (
          <li key={summaryStats.indexOf(stat) + 1}>
            <h3>{summaryStats.indexOf(stat) + 1}</h3>
            <p className="question">{stat.question}</p>
            <p className={"user-answer " + stat.result}>{stat.answer}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
