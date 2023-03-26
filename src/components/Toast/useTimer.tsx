import { useEffect, useRef } from 'react';

const useTimer = (delay: number | null, onClose: () => void) => {
  const timer = useRef<{ object: NodeJS.Timer; timestamp: number } | null>(null);
  const duration = useRef<number | null>(delay);
  const progressBarRef = useRef<HTMLSpanElement>(null);

  const onMouseEnter = () => {
    if (!timer.current || !duration.current) return;

    clearTimeout(timer.current.object);

    const elapsed = Date.now() - timer.current.timestamp;
    duration.current -= elapsed;

    timer.current = null;

    progressBarRef.current?.classList.add('paused');
  };

  const onMouseLeave = () => {
    if (!duration.current) return;

    timer.current = {
      object: setTimeout(onClose, duration.current),
      timestamp: Date.now(),
    };

    progressBarRef.current?.classList.remove('paused');
  };

  useEffect(() => {
    if (duration.current === null) return;

    timer.current = {
      object: setTimeout(onClose, duration.current),
      timestamp: Date.now(),
    };

    return () => {
      timer.current && clearTimeout(timer.current.object);
    };
  }, [timer]);

  return {
    onMouseEnter,
    onMouseLeave,
    progressBarRef,
  };
};

export default useTimer;
