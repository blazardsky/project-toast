import React from "react";

function useKeyDown(key, callback) {
  return React.useEffect(() => {
    function onKeyDown(event) {
      if (event.key === key) {
        callback();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [key, callback]);
}

export default useKeyDown;
