import Questions from "./components/Questions.jsx";
import QuestionsContextProvider from "./store/questions-cart-context";

function App() {
  return (
    <div id="quiz">
      <div id="question">
        <QuestionsContextProvider>
          <Questions />
        </QuestionsContextProvider>
      </div>
    </div>
  );
}

export default App;
