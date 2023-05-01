import { eventEmitter } from '@/core/eventEmitter';

export const clearToast = () => {
  eventEmitter.emit('clearAll', undefined);
};
