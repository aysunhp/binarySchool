import "../calculator/calculator.scss";
import { clearHistory } from "../../redux/slice/calcSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/calc";
import Button from "@mui/joy/Button";

const ClearHistoryButton = () => {
  const dispatch: AppDispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.calc.mode);
  return (
    <div className="clear-history-btn">
      <Button
        variant="outlined"
        style={{
          borderColor: mode ? "#373737" : "white",
          color: mode ? "#373737" : "white",
        }}
        onClick={() => {
          dispatch(clearHistory());
        }}
      >
        Clear history
      </Button>
    </div>
  );
};

export default ClearHistoryButton;
