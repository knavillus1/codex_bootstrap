import React, { useState } from 'react';

function Calculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [op, setOp] = useState('add');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculate = () => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (Number.isNaN(numA) || Number.isNaN(numB)) {
      setError('Both inputs must be numbers');
      setResult(null);
      return;
    }
    let res;
    switch (op) {
      case 'add':
        res = numA + numB;
        break;
      case 'subtract':
        res = numA - numB;
        break;
      case 'multiply':
        res = numA * numB;
        break;
      case 'divide':
        if (numB === 0) {
          setError('Division by zero');
          setResult(null);
          return;
        }
        res = numA / numB;
        break;
      default:
        res = null;
    }
    setError('');
    setResult(res);
  };

  return (
    <div>
      <input
        aria-label="input-a"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      <input
        aria-label="input-b"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />
      <select
        aria-label="operation"
        value={op}
        onChange={(e) => setOp(e.target.value)}
      >
        <option value="add">+</option>
        <option value="subtract">-</option>
        <option value="multiply">*</option>
        <option value="divide">/</option>
      </select>
      <button onClick={calculate}>Calculate</button>
      {error && <div role="alert">{error}</div>}
      {result !== null && <div aria-label="result">{result}</div>}
    </div>
  );
}

export default Calculator;
