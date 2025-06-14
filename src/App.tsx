import React, { useState, useEffect, useCallback } from 'react';

type Operation = '+' | '-' | '×' | '÷' | '';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState('');
  const [operation, setOperation] = useState<Operation>('');
  const [newNumber, setNewNumber] = useState(true);

  const calculate = useCallback((a: string, b: string, op: Operation): string => {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);
    switch (op) {
      case '+':
        return (num1 + num2).toString();
      case '-':
        return (num1 - num2).toString();
      case '×':
        return (num1 * num2).toString();
      case '÷':
        return num2 !== 0 ? (num1 / num2).toString() : 'Error';
      default:
        return b;
    }
  }, []);

  const handleNumber = (num: string) => {
    if (display === '0' || newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperation = (op: Operation) => {
    if (operation && !newNumber) {
      const result = calculate(firstNumber, display, operation);
      setDisplay(result);
      setFirstNumber(result);
    } else {
      setFirstNumber(display);
    }
    setOperation(op);
    setNewNumber(true);
  };

  const handleEqual = () => {
    if (!operation || newNumber) return;
    const result = calculate(firstNumber, display, operation);
    setDisplay(result);
    setFirstNumber('');
    setOperation('');
    setNewNumber(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setFirstNumber('');
    setOperation('');
    setNewNumber(true);
  };

  const handleKeyboard = useCallback((e: KeyboardEvent) => {
    if (e.key >= '0' && e.key <= '9') handleNumber(e.key);
    if (e.key === '+') handleOperation('+');
    if (e.key === '-') handleOperation('-');
    if (e.key === '*') handleOperation('×');
    if (e.key === '/') handleOperation('÷');
    if (e.key === 'Enter') handleEqual();
    if (e.key === 'Escape') handleClear();
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [handleKeyboard]);

  const Button: React.FC<{
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
  }> = ({ onClick, className = '', children }) => (
    <button
      onClick={onClick}
      className={`p-4 text-xl font-semibold rounded-lg hover:bg-opacity-80 transition-colors ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs">
        <div className="p-4">
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <div className="text-right text-3xl font-bold truncate">{display}</div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <Button onClick={handleClear} className="bg-red-500 text-white col-span-2">C</Button>
            <Button onClick={() => handleOperation('÷')} className="bg-gray-200">÷</Button>
            <Button onClick={() => handleOperation('×')} className="bg-gray-200">×</Button>
            
            {['7', '8', '9'].map(num => (
              <Button key={num} onClick={() => handleNumber(num)} className="bg-gray-100">{num}</Button>
            ))}
            <Button onClick={() => handleOperation('-')} className="bg-gray-200">-</Button>
            
            {['4', '5', '6'].map(num => (
              <Button key={num} onClick={() => handleNumber(num)} className="bg-gray-100">{num}</Button>
            ))}
            <Button onClick={() => handleOperation('+')} className="bg-gray-200">+</Button>
            
            {['1', '2', '3'].map(num => (
              <Button key={num} onClick={() => handleNumber(num)} className="bg-gray-100">{num}</Button>
            ))}
            <Button onClick={handleEqual} className="bg-blue-500 text-white row-span-2">=</Button>
            
            <Button onClick={() => handleNumber('0')} className="bg-gray-100 col-span-2">0</Button>
            <Button onClick={() => handleNumber('.')} className="bg-gray-100">.</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
