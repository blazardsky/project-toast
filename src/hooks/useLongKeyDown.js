import React from "react";

function useLongKeyDown(key, callback, duration = 2000) {
  const [startTime, setStartTime] = React.useState(0);

  const onKeyDown = React.useCallback(
    (event) => {
      if (event.key === key) {
        setStartTime(Date.now());
      }
    },
    [key, setStartTime]
  );

  const onKeyUp = React.useCallback(
    (event) => {
      if (event.key === key) {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime >= duration) {
          callback();
        }
        setStartTime(0);
      }
    },
    [startTime, setStartTime, callback, duration, key]
  );

  return React.useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [onKeyUp, onKeyDown]);
}

export default useLongKeyDown;
