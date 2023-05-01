import { eventEmitter } from '@/core/eventEmitter';

export const toast = (message: string, delay?: number | null, variant?: ToastVariant) => {
  eventEmitter.emit('show', { variant, message, delay });
};
