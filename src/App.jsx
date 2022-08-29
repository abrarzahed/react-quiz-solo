import { useState } from "react";
import Quiz from "../components/Quiz";
import Header from "../components/Header";
import Footer from "../components/Footer";

function App() {
  const [quizzes, setQuizzes] = useState(false);

  function startQuiz() {
    setQuizzes(true);
  }

  return (
    <main className="app">
      {quizzes && <Header />}
      <img className="blob blob1" src="../images/blob1.png" alt="" />

      {!quizzes && (
        <div className="interface">
          <h2>Quizzical</h2>
          <p>Are you ready to answer some random quiz questions?</p>
          <button onClick={startQuiz} className="btn-footer">
            Start Quiz
          </button>
        </div>
      )}

      {quizzes && (
        <div className="quiz-container">
          <Quiz />
          <Quiz />
          <Quiz />
          <Quiz />
          <Quiz />
        </div>
      )}

      <img className="blob blob2" src="../images/blob2.png" alt="" />

      {quizzes && <Footer />}
    </main>
  );
}

export default App;
