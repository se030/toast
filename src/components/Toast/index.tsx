import { css } from '@emotion/react';
import { MouseEventHandler, useEffect } from 'react';
import useToast from './useToast';

const Toast = ({ id, message, delay }: Toast) => {
  const { onClose } = useToast(id);

  useEffect(() => {
    if (delay === null) return;

    const timer = setTimeout(onClose, delay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div css={toastStyle}>
      <span>{message}</span>
      <CloseButton onClose={onClose} />
    </div>
  );
};

const CloseButton = ({ onClose }: { onClose: MouseEventHandler }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onClick={onClose}
    >
      <path
        d='M12 2C17.53 2 22 6.47 22 12C22 17.53 17.53 22 12 22C6.47 22 2 17.53 2 12C2 6.47 6.47 2 12 2ZM15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z'
        fill='black'
      />
    </svg>
  );
};

export const TOAST_SIZE = {
  WIDTH: 300,
  HEIGHT: 80,
};

const toastStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${TOAST_SIZE.WIDTH}px;
  min-height: ${TOAST_SIZE.HEIGHT}px;
  height: fit-content;
  padding: 15px 30px;
  background-color: white;
  border: 2px solid black;
  z-index: 999;
  white-space: pre-line;

  @keyframes bounce {
    from,
    20%,
    53%,
    80%,
    to {
      transform: translate3d(0, 0, 0);
    }
    40%,
    43% {
      transform: translate3d(0, -30px, 0);
    }
    70% {
      transform: translate3d(0, -15px, 0);
    }
    90% {
      transform: translate3d(0, -4px, 0);
    }
  }
  animation: bounce 1s ease;
`;

export default Toast;
