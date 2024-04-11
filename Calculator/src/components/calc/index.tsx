import { useState } from "react"; // You can create a CSS file for styling
import "./calc.scss";

function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleInput = (value: any) => {
    setInput(input + value);
  };

  const clearInput = () => {
    setInput("");
    setResult("");
  };

  const calculateResult = () => {
    try {
      const calculatedResult = eval(input);
      setResult(calculatedResult);
    } catch (error) {
      setResult("Error");
    }
  };

  return (
    <div className="calculator">
      <div className="input">{input}</div>
      <div className="result">{result}</div>
      <div className="buttons">
        <button onClick={clearInput}>AC</button>
        <button onClick={() => handleInput("(")}>(</button>
        <button onClick={() => handleInput(")")}>)</button>
        <button onClick={() => handleInput("/")}>/</button>
        <button onClick={() => handleInput("7")}>7</button>
        <button onClick={() => handleInput("8")}>8</button>
        <button onClick={() => handleInput("9")}>9</button>
        <button onClick={() => handleInput("*")}>*</button>
        <button onClick={() => handleInput("4")}>4</button>
        <button onClick={() => handleInput("5")}>5</button>
        <button onClick={() => handleInput("6")}>6</button>
        <button onClick={() => handleInput("-")}>-</button>
        <button onClick={() => handleInput("1")}>1</button>
        <button onClick={() => handleInput("2")}>2</button>
        <button onClick={() => handleInput("3")}>3</button>
        <button onClick={() => handleInput("+")}>+</button>
        <button onClick={() => handleInput("0")}>0</button>
        <button onClick={() => handleInput(".")}>.</button>
        <button onClick={calculateResult}>=</button>
      </div>
    </div>
  );
}

export default Calculator;
