import Answers from "./components/Answers";
import ProgressBar from "./components/ProgressBar";

function App() {
  return (
    <div id="quiz">
      <div id="question">
        <ProgressBar />
        <Answers />
      </div>
    </div>
  );
}

export default App;
