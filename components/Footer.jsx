export default function Footer(props) {
  return (
    <footer>
      {!props.isAgainButtonVisible && props.isCheckButtonVisible && (
        <div className="check-answer">
          <button className="btn-footer" onClick={props.checkAnswer}>
            Check answers
          </button>
        </div>
      )}

      {props.isAgainButtonVisible && (
        <div className="play-again">
          <h4>
            You scored {props.correctAnswers}/{props.totalQuiz} correct answers
          </h4>
          <button className="btn-footer" onClick={props.playAgain}>
            Play again
          </button>
        </div>
      )}

      <a href="mailto: abrarzahed6986@gmail.com" className="footer-link">
        abrarzahed6986@gmail.com
      </a>
    </footer>
  );
}
