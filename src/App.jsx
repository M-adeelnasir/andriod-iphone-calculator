import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

function App() {
  document.title = 'Calculator';
  const inputs = [
    'AC',
    '+/-',
    '%',
    '/',
    '7',
    '8',
    '9',
    '*',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '0',
    '.',
    '=',
  ];
  const [answer, setAnswer] = useState('');
  const [evaluate, setEvaluate] = useState('');

  const handleChange = (e) => {
    if (!e.target.value) return;
    setEvaluate(e.target.value);
  };

  const handleClick = (val) => {
    if (val == 'AC') {
      setEvaluate('');
      setAnswer('');
      return;
    }
    if (val == '+/-') {
      if (!answer) return;
      setAnswer((prv) => prv * -1);
      setEvaluate((prv) => prv * -1);
      return;
    }
    if (val == '=') {
      setEvaluate(answer);
      return;
    }

    setEvaluate((prv) => prv + val?.toString());
  };

  useEffect(() => {
    if (!evaluate) return;
    try {
      const result = eval(evaluate);
      if (isNaN(result)) return;
      setAnswer(result);
    } catch (error) {}
  }, [evaluate]);

  return (
    <div className="container">
      <div className="calculator">
        <div className="answer">{answer}</div>
        <input
          value={evaluate}
          onKeyDown={(e) => {
            console.log(e.key);
            if (
              ![...inputs, 'Backspace', 'ArrowRight', 'ArrowLeft'].includes(
                e.key
              )
            )
              e.preventDefault();
          }}
          onChange={handleChange}
          type="text"
          placeholder="0"
        />
        <div className="inputs">
          {inputs.map((item, i) => (
            <div
              className={`input ${item == 0 ? 'span2' : ''} ${
                ['/', '*', '-', '+', '='].includes(item) ? 'orange' : ''
              }`}
              key={i}
              onClick={() => handleClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
