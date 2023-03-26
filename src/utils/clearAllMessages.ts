import { eventEmitter } from '@/core/eventEmitter';

export const clearAllMessages = () => {
  eventEmitter.emit('clearAll', undefined);
};
