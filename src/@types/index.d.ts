declare interface Toast {
  id: number;
  message: string;
  delay: number | null;
}

declare type ToastEvent = 'show' | 'close';
declare type ToastEventParams<T extends ToastEvent> = T extends 'show'
  ? Omit<Toast, 'id'>
  : { id: number };

type PositionY = 'top' | 'bottom';
type PositionX = 'left' | 'center' | 'right';
type PositionVariant = `${PositionY}-${PositionX}`;