import { useState } from "react";
import Questions from "./components/Questions.jsx";
import QuestionsContextProvider from "./store/questions-cart-context";
import Summary from "./components/Summary.jsx";

function App() {
  const [displaySummary, setDisplaySummary] = useState(false);
  const contentToDisplay = displaySummary ? (
    <Summary />
  ) : (
    <Questions onSummaryDisplay={handleSetDisplaySummary} />
  );

  function handleSetDisplaySummary() {
    setDisplaySummary(true);
  }

  return (
    <div id="quiz">
      <div id="question">
        <QuestionsContextProvider>{contentToDisplay}</QuestionsContextProvider>
      </div>
    </div>
  );
}

export default App;
