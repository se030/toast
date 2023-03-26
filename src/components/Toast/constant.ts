import { CSSProperties } from 'react';

export const TOAST_SIZE = {
  WIDTH: 360,
  HEIGHT: 100,
};

export const TOAST_COLOR: Record<ToastVariant, CSSProperties['backgroundColor']> = {
  default: '#87CEEB',
  success: '#158000',
  warning: '#FFBF00',
  error: '#CC0000',
};

export const TOAST_ICON: Record<ToastVariant, string> = {
  default: '✨',
  success: '🎉',
  warning: '⚠️',
  error: '❌',
};
