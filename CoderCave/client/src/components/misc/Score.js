const Score = ({ score, isSelected }) => {
  return (
    <div className="text-center">
      { isSelected && <i className="selected-answer bi bi-check-lg"></i> }
      <h3><i className="bi bi-arrow-up-square"></i></h3>
      <div className="score text-center">{score}</div>
      <h3 className="mt-2"><i className="bi bi-arrow-down-square"></i></h3>
    </div>
  );
};

export default Score;