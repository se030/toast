declare interface Toast {
  id: number;
  variant?: ToastVariant;
  message: string;
  delay?: number | null;
}
type ToastVariant = 'default' | 'success' | 'warning' | 'error';

declare type ToastEvent = 'show' | 'close';
declare type ToastEventParams<T extends ToastEvent> = T extends 'show'
  ? Omit<Toast, 'id'>
  : { id: number };

type PositionY = 'top' | 'bottom';
type PositionX = 'left' | 'center' | 'right';
type PositionVariant = `${PositionY}-${PositionX}`;
