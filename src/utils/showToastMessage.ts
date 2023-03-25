import { eventEmitter } from '@/core/eventEmitter';

export const showToastMessage = (message: string, delay: number | null = 3000) => {
  eventEmitter.emit('show', { message, delay });
};
