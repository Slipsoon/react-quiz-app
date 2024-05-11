import { useState, useEffect } from "react";

const TIMER = 10000;
const TIMER_REFRESH = 10;

export default function ProgressBar({ answer }) {
  const [progressValue, setProgressValue] = useState(TIMER);

  useEffect(() => {
    if (answer.timer) {
      setProgressValue(answer.timer);
    } else {
      setProgressValue(TIMER);
    }

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
  }, [answer]);

  return (
    <progress
      className={answer.state === "selected" ? "answered" : ""}
      value={progressValue}
      max={answer.timer ? answer.timer : TIMER}
    ></progress>
  );
}
