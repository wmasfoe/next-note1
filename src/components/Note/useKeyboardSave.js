import { useEffect } from "react";
function keydownHandler(event, callback) {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const isWindows = navigator.platform.toUpperCase().indexOf('WIN') >= 0;
  
  if (isMac && event.metaKey && event.key === 's') {
    event.preventDefault();
    event.stopPropagation();
    callback();
  } else if (isWindows && event.ctrlKey && event.key === 's') {
    event.preventDefault();
    event.stopPropagation();
    callback();
  }
}

export default function useKeyboardSave(callback) {

  function handler(e) {
    keydownHandler(e, callback);
  }

  useEffect(() => {
    document.addEventListener('keydown', handler)
    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [])
}