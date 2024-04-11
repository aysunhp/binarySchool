import "../calculator/calculator.scss";
import { toggleDrawer } from "../../redux/slice/calcSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/calc";
import ClearHistoryButton from "../clearHistoryButton";

const CustomDrawer = () => {
  const dispatch: AppDispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.calc.mode);
  const open = useSelector((state: RootState) => state.calc.open);
  const history = useSelector((state: RootState) => state.calc.history);

  return (
    <div
      className="custom-drawer"
      style={{
        backgroundColor: mode ? "#f7f7f7" : "#2a2b2c",
        color: mode ? "#373737" : "white",
        display: open ? "block" : "none",
      }}
    >
      <div
        className="close-btn"
        onClick={() => {
          dispatch(toggleDrawer(false));
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          style={{ backgroundColor: "transparent" }}
        >
          <path
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            fill={mode ? "#373737" : "white"}
          />
        </svg>
      </div>
      <ClearHistoryButton />
      <div className="history-items">
        {history &&
          history.map((item, idx) => {
            return (
              <div className="item" key={idx}>
                <p>{item.operation}</p>
                <span>{item.result}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CustomDrawer;
