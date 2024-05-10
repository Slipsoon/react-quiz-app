import { useState, useEffect } from "react";

const TIMER = 3000;
const TIMER_REFRESH = 10;

export default function ProgressBar() {
  const [progressValue, setProgressValue] = useState(TIMER);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgressValue((prevProgressValue) => {
        if (prevProgressValue <= 0) {
          clearInterval(progressInterval);
        }

        return prevProgressValue - TIMER_REFRESH;
      });
    }, TIMER_REFRESH);

    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  return <progress value={progressValue} max={TIMER}></progress>;
}
