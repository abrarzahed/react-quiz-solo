export default function Quiz(props) {
  const answersJsx = props.answers.map((answer) => {
    let styles;
    if (answer.isSelected) {
      styles = {
        background: "#D6DBF5",
      };
    } else {
      styles = {
        background: "white",
      };
    }
    return (
      <button
        style={styles}
        className={
          props.isChecking && props.correct_answer === answer.value
            ? "correct-answer option"
            : "option"
        }
        key={answer.id}
        onClick={() => props.selectAnswer(props.id, answer.id)}
      >
        {answer.value}
      </button>
    );
  });
  return (
    <section className="quiz">
      <h3 className="question">{props.question}</h3>
      <div className="options">{answersJsx}</div>
    </section>
  );
}
