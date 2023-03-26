import { eventEmitter } from '@/core/eventEmitter';

export const showToastMessage = (
  message: string,
  delay?: number | null,
  variant?: ToastVariant
) => {
  eventEmitter.emit('show', { variant, message, delay });
};
