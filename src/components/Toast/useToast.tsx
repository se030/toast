import { eventEmitter } from '@/core/eventEmitter';

const useToast = (id: number) => {
  const onClose = () => eventEmitter.emit('close', { id });

  return {
    onClose,
  };
};

export default useToast;
