import "./calculator.scss";

const Calculator = () => {
  return (
    <>
      <main>
        <div className="calculator-wrapper">
          <div className="buttons-wrapper">
            <div className="buttons-left-side">
              <div className="special-buttons-side">
                <div className="clear-btn">AC</div>
                <div className="change-btn">+/-</div>
                <div className="percentage-btn">%</div>
              </div>
              <div className="number-buttons-side">
                <div className="box">
                  <div className="box-1">1</div>
                  <div className="box-2">2</div>
                  <div className="box-3">3</div>
                </div>
                <div className="box">
                  <div className="box-4">4</div>
                  <div className="box-5">5</div>
                  <div className="box-6">6</div>
                </div>
                <div className="box">
                  <div className="box-7">7</div>
                  <div className="box-8">8</div>
                  <div className="box-9">9</div>
                </div>
                <div className="box">
                  <div className="box-point">.</div>
                  <div className="box-0">0</div>
                  <div className="box-00">00</div>
                </div>
              </div>
            </div>
            <div className="buttons-right-side">
              <div className="division-btn">/</div>
              <div className="multiplication-btn">x</div>
              <div className="subtraction-btn">-</div>
              <div className="addition-btn">+</div>
              <div className="calculation-btn">=</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Calculator;
