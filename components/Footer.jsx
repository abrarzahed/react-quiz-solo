export default function Footer() {
  return (
    <footer>
      <div className="check-answer">
        <button className="btn-footer">Check answers</button>
      </div>
      <div className="play-again">
        <h4>You scored 3/5 correct answers</h4>
        <button className="btn-footer">Play again</button>
      </div>
    </footer>
  );
}
