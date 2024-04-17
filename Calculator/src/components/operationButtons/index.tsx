import "./operationButtons.scss";
import { addText, toCalculate } from "../../redux/slice/calcSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/calc";

const OperationButtons = () => {
  const dispatch: AppDispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.calc.mode);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    let obj = {
      type: "operation",
      name: name,
    };
    dispatch(addText(obj));
  };

  return (
    <div
      className="buttons-right-side"
      style={{
        backgroundColor: mode ? "#cbeaffc0" : "#12374cc5",
      }}
    >
      <button
        className="multiplication-btn"
        name="*"
        style={{ color: mode ? "#373737" : "white" }}
        onClick={handleClick}
      >
        x
      </button>
      <button
        className="division-btn"
        name="/"
        style={{ color: mode ? "#373737" : "white" }}
        onClick={handleClick}
      >
        /
      </button>
      <button
        className="subtraction-btn"
        name="-"
        style={{ color: mode ? "#373737" : "white" }}
        onClick={handleClick}
      >
        -
      </button>
      <button
        className="addition-btn"
        name="+"
        style={{ color: mode ? "#373737" : "white" }}
        onClick={handleClick}
      >
        +
      </button>
      <button
        className="calculation-btn"
        style={{
          backgroundColor: mode ? "#d6e9fc" : "#0d2337c2",
          color: mode ? "#373737" : "white",
        }}
        onClick={() => {
          dispatch(toCalculate());
        }}
      >
        =
      </button>
    </div>
  );
};

export default OperationButtons;
