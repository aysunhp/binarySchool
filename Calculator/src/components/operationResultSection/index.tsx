import "../calculator/calculator.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/calc";

const OperationResultSection = () => {
  const mode = useSelector((state: RootState) => state.calc.mode);
  const lastOperation = useSelector(
    (state: RootState) => state.calc.lastOperation
  );
  const operation = useSelector((state: RootState) => state.calc.operation);
  const result = useSelector((state: RootState) => state.calc.result);

  return (
    <div className="operation-result-view-sect">
      <div className="operation-after-result">
        {result != 0 ? lastOperation : null}
      </div>
      <div className="operation-result">
        <div className="equal-to" style={{ color: mode ? "#373737" : "white" }}>
          {result != 0 ? "=" : ""}
        </div>
        <div className="result" style={{ color: mode ? "#373737" : "white" }}>
          {result != 0 ? result : operation}
        </div>
      </div>
    </div>
  );
};

export default OperationResultSection;
