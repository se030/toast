import { useCallback, useEffect, useRef, useState } from 'react';
import { eventEmitter } from '@/core/eventEmitter';

const useToastContainer = () => {
  const [toastList, setToastList] = useState<Array<Toast>>([]);

  const id = useRef(0);
  const createToast = ({ message, delay = 3000 }: ToastEventParams<'show'>) => {
    setToastList((prev) => [...prev, { id: id.current, message, delay }]);
    id.current += 1;
  };

  const removeToast = ({ id }: ToastEventParams<'close'>) => {
    setToastList((prev) => prev.filter(({ id: toastId }) => toastId !== id));
  };

  useEffect(() => {
    eventEmitter.on('show', createToast).on('close', removeToast);

    return () => {
      eventEmitter.off('show').off('close');
    };
  }, []);

  return { toastList };
};

export default useToastContainer;
