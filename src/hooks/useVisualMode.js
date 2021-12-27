import { useState } from "react";

const useVisualMode = (initialMode) => {

  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    
    setMode(newMode);
    
    if (replace) {   
      setHistory(prev => {
        prev[prev.length - 1] = newMode;
        return prev;
      });    
    }

    if (!replace) {
      setHistory(prev => ([...prev, newMode]));
    }

  };

  const back = () => {

    setHistory(prev => {

      if (prev.length > 1) {
        setMode(prev[prev.length - 2]);
        return [...prev.slice(0, -1)];
      }
      return prev;
    }); 
    
  };

  return { mode, transition, back };
};

export default useVisualMode;