import "./calculator.scss";
import { addText, resetCalculate } from "../../redux/slice/calcSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/calc";
import ModeChanger from "../modeChanger";
import HistoryButton from "../historyButton";
import CustomDrawer from "../customDrawer";
import OperationButtons from "../operationButtons";

const Calculator = () => {
  const dispatch: AppDispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.calc.mode);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    console.log(name);
    dispatch(addText(name));
  };

  return (
    <>
      <main>
        <div
          className="calculator-wrapper"
          style={{ backgroundColor: mode ? "#f7f7f7" : "#2a2b2c" }}
        >
          <div
            className="buttons-wrapper"
            style={{
              background: mode
                ? "linear-gradient(45deg, hsla(215, 67%, 85%, 1) 8%, hsla(210, 76%, 89%, 1) 39%, hsla(201, 96%, 78%, 1) 80%)"
                : "linear-gradient(45deg, hsla(209, 69%, 16%, 1) 14%, hsla(204, 60%, 19%, 1) 29%, hsla(201, 55%, 30%, 1) 85%)",
            }}
          >
            <div className="buttons-left-side">
              <div className="number-buttons-side">
                <div
                  className="special-buttons-side"
                  style={{ backgroundColor: mode ? "#cbeaffe0" : "#12374cc5" }}
                >
                  <button
                    className="clear-btn"
                    style={{ color: mode ? "#373737" : "white" }}
                    onClick={() => {
                      dispatch(resetCalculate());
                    }}
                  >
                    AC
                  </button>
                  <button
                    className="change-btn"
                    style={{ color: mode ? "#373737" : "white" }}
                  >
                    +/-
                  </button>
                  <button
                    className="percentage-btn"
                    style={{ color: mode ? "#373737" : "white" }}
                  >
                    %
                  </button>
                </div>
                <div className="box">
                  <button
                    className="box-1"
                    style={{
                      backgroundColor: mode ? "#d1e6face" : "#0d2337c2",
                      color: mode ? "#373737" : "white",
                    }}
                    name="1"
                    onClick={handleClick}
                  >
                    1
                  </button>
                  <button
                    className="box-2"
                    style={{
                      backgroundColor: mode ? "#d1e6face" : "#0d2337c2",
                      color: mode ? "#373737" : "white",
                    }}
                    name="2"
                    onClick={handleClick}
                  >
                    2
                  </button>
                  <button
                    className="box-3"
                    name="3"
                    style={{
                      backgroundColor: mode ? "#d1e6face" : "#0d2337c2",
                      color: mode ? "#373737" : "white",
                    }}
                    onClick={handleClick}
                  >
                    3
                  </button>
                </div>
                <div className="box">
                  <button
                    className="box-4"
                    name="4"
                    style={{
                      backgroundColor: mode ? "#d1e6face" : "#0d2337c2",
                      color: mode ? "#373737" : "white",
                    }}
                    onClick={handleClick}
                  >
                    4
                  </button>
                  <button
                    className="box-5"
                    name="5"
                    style={{
                      backgroundColor: mode ? "#d1e6face" : "#0d2337c2",
                      color: mode ? "#373737" : "white",
                    }}
                    onClick={handleClick}
                  >
                    5
                  </button>
                  <button
                    className="box-6"
                    name="6"
                    style={{
                      backgroundColor: mode ? "#d1e6face" : "#0d2337c2",
                      color: mode ? "#373737" : "white",
                    }}
                    onClick={handleClick}
                  >
                    6
                  </button>
                </div>
                <div className="box">
                  <button
                    className="box-7"
                    name="7"
                    style={{
                      backgroundColor: mode ? "#d1e6face" : "#0d2337c2",
                      color: mode ? "#373737" : "white",
                    }}
                    onClick={handleClick}
                  >
                    7
                  </button>
                  <button
                    className="box-8"
                    name="8"
                    style={{
                      backgroundColor: mode ? "#d1e6face" : "#0d2337c2",
                      color: mode ? "#373737" : "white",
                    }}
                    onClick={handleClick}
                  >
                    8
                  </button>
                  <button
                    className="box-9"
                    name="9"
                    style={{
                      backgroundColor: mode ? "#d1e6face" : "#0d2337c2",
                      color: mode ? "#373737" : "white",
                    }}
                    onClick={handleClick}
                  >
                    9
                  </button>
                </div>
                <div className="box">
                  <button
                    className="box-point"
                    name="."
                    style={{
                      backgroundColor: mode ? "#d1e6face" : "#0d2337c2",
                      color: mode ? "#373737" : "white",
                    }}
                  >
                    .
                  </button>
                  <button
                    className="box-0"
                    name="0"
                    style={{
                      backgroundColor: mode ? "#d1e6face" : "#0d2337c2",
                      color: mode ? "#373737" : "white",
                    }}
                    onClick={handleClick}
                  >
                    0
                  </button>
                  <button
                    className="box-00"
                    name="00"
                    style={{
                      backgroundColor: mode ? "#d1e6face" : "#0d2337c2",
                      color: mode ? "#373737" : "white",
                    }}
                  >
                    00
                  </button>
                </div>
              </div>
            </div>
            <OperationButtons />
          </div>
          <ModeChanger />
          <HistoryButton />
          <CustomDrawer />
        </div>
      </main>
    </>
  );
};

export default Calculator;
