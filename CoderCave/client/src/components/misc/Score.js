const Score = ({ score, isSelected }) => {

  //* When hovering over the arrow give it a fill
  const handleMouseOver = (e) => {
    if (e.target.closest("[class*='bi-arrow']") && e.target.closest("[class$='square']")) {
      const el = e.target.closest("[class*='bi-arrow']");
      const className = el.classList[1];
      const hoverClass = "bi " + className + "-fill";
      el.attributes[0].value = hoverClass;
      el.style.cursor = "pointer";
    }
  };

  //* When mouse leaves put back to it's original icon
  const handleMouseLeave = (e) => {
    if (e.target.closest("[class$='fill']")) {
      const el = e.target.closest("[class$='fill']");
      const className = el.classList[1].split("-").filter(v => v !== "fill").join("-");
      el.attributes[0].value = "bi " + className;
    }
  };

  return (
    <div className="text-center">
      { isSelected && <i className="selected-answer bi bi-check-lg"></i> }
      <h3 ><i onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className="bi bi-arrow-up-square"></i></h3>
      <div className="score text-center">{score}</div>
      <h3 className="mt-2"><i onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className="bi bi-arrow-down-square"></i></h3>
    </div>
  );
};

export default Score;