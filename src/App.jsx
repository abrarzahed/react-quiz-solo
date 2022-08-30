// React imports
import { useEffect, useState } from "react";

import { nanoid } from "nanoid";
import Confetti from "react-confetti";

// Components imports
import Quiz from "../components/Quiz";
import Header from "../components/Header";
import Footer from "../components/Footer";

function App() {
  // states
  const [quizzes, setQuizzes] = useState(() => []);
  const [isChecking, setIsChecking] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [isAgainButtonVisible, setIsAgainButtonVisible] = useState(false);
  const [isCheckButtonVisible, setIsCheckButtonVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [isRunning, setIsRunning] = useState(true);

  // Effects

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.results);
        setQuizzes(
          data.results.map((quiz) => {
            const randomIndex = Math.floor(Math.random() * 4);

            let answers = [...quiz.incorrect_answers];
            answers.splice(randomIndex, 0, quiz.correct_answer);

            answers = answers.map((answer) => ({
              id: nanoid(),
              value: answer,
              isSelected: false,
            }));
            return {
              id: nanoid(),
              question: quiz.question,
              correct_answer: quiz.correct_answer,
              answers: answers,
            };
          })
        );
      });
  }, [isRunning]);

  // Select answer
  function selectAnswer(quizID, answerId) {
    setQuizzes((prev) => {
      return prev.map((quiz) => {
        if (quiz.id !== quizID) {
          return quiz;
        }
        const selectedAnswerArray = quiz.answers.map((answer) => ({
          ...answer,
          isSelected: answer.id === answerId ? true : false,
        }));

        return {
          id: quiz.id,
          question: quiz.question,
          correct_answer: quiz.correct_answer,
          answers: selectedAnswerArray,
        };
      });
    });
    const selectedLength = quizzes.filter((item) =>
      item.answers.some((i) => i.isSelected)
    ).length;
    if (selectedLength >= 4) {
      setIsCheckButtonVisible(true);
    } else {
      setIsCheckButtonVisible(false);
    }
  }

  // Check quiz answers
  function checkAnswer() {
    setIsChecking(true);

    const correctAnswersArray = [];
    if (!quizzes && !quizzes.length > 0) return;

    quizzes.forEach((quiz) => {
      const correctAnswer = quiz.correct_answer;
      const selectedAnswer = quiz.answers.find(
        (answer) => answer.isSelected
      ).value;

      if (selectedAnswer === correctAnswer) {
        correctAnswersArray.push(selectedAnswer);
      }
    });

    setCorrectAnswer(correctAnswersArray.length);
    if (correctAnswersArray.length > 4) {
      setShowConfetti(true);
    }

    setIsAgainButtonVisible((prev) => !prev);
  }

  // play Again
  function playAgain() {
    setShowConfetti(false);
    setQuizzes([]);
    setIsChecking(false);
    setIsRunning((prev) => !prev);
    setIsAgainButtonVisible(false);
    setIsCheckButtonVisible(false);
  }

  // Quiz jsx
  const quizzesJSX = quizzes.map((quiz) => {
    return (
      <Quiz
        isChecking={isChecking}
        key={quiz.id}
        id={quiz.id}
        question={quiz.question}
        answers={quiz.answers}
        correct_answer={quiz.correct_answer}
        selectAnswer={selectAnswer}
      />
    );
  });

  return (
    <main className="app">
      {showConfetti && <Confetti />}
      <Header />
      <img className="blob blob1" src="../images/blob1.png" alt="" />

      {!showConfetti && <div className="quiz-container">{quizzesJSX}</div>}

      {showConfetti && (
        <div className="congrats">
          <h4>WOW 😲</h4>
          <h2>You scored: 5/5</h2>
          <h4>Looks like a BOSS 😎</h4>
        </div>
      )}

      <img className="blob blob2" src="../images/blob2.png" alt="" />

      <Footer
        isCheckButtonVisible={isCheckButtonVisible}
        isAgainButtonVisible={isAgainButtonVisible}
        isChecking={isChecking}
        checkAnswer={checkAnswer}
        totalQuiz={quizzes.length}
        correctAnswers={correctAnswer}
        playAgain={playAgain}
      />
    </main>
  );
}

export default App;
