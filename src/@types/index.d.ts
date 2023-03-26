interface Toast {
  id: number;
  variant?: ToastVariant;
  message: string;
  delay?: number | null;
}
type ToastVariant = 'default' | 'success' | 'warning' | 'error';

type ToastEvent = 'show' | 'close' | 'clearAll';
type ToastEventParams<T extends ToastEvent> = {
  show: Omit<Toast, 'id'>;
  close: { id: number };
  clearAll: undefined;
}[T];

type PositionY = 'top' | 'bottom';
type PositionX = 'left' | 'center' | 'right';
type PositionVariant = `${PositionY}-${PositionX}`;
