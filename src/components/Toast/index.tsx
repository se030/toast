import { css } from '@emotion/react';
import { MouseEventHandler } from 'react';
import useToast from './useToast';
import { TOAST_COLOR, TOAST_ICON, TOAST_SIZE } from './constant';
import useTimer from './useTimer';

const Toast = ({ id, variant = 'default', message, delay = 3000 }: Toast) => {
  const { onClose } = useToast(id);
  const { onMouseEnter, onMouseLeave, progressBarRef } = useTimer(delay, onClose);

  return (
    <div css={toastStyle} {...{ onMouseEnter, onMouseLeave }}>
      <div css={toastContentStyle}>
        <span>{`${TOAST_ICON[variant]} ${message}`}</span>
        <CloseButton onClose={onClose} />
      </div>
      <div css={progressBarStyle(variant, delay)}>
        <span ref={progressBarRef}></span>
      </div>
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

const toastStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  width: ${TOAST_SIZE.WIDTH}px;
  min-height: ${TOAST_SIZE.HEIGHT}px;
  height: fit-content;
  padding: 15px 30px;
  background-color: white;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
  z-index: 999;
  white-space: pre-line;

  @keyframes bounce {
    from,
    20%,
    53%,
    80%,
    to {
      transform: translateY(0);
    }
    40%,
    43% {
      transform: translateY(-30px);
    }
    70% {
      transform: translateY(-15px);
    }
    90% {
      transform: translateY(-4px);
    }
  }
  animation: bounce 1s ease;
`;

const toastContentStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const progressBarStyle = (variant: ToastVariant, delay: number | null) => css`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;

  @keyframes progress {
    0% {
      width: 100%;
    }
    100% {
      width: 0;
    }
  }
  & > span {
    display: block;
    width: 0%;
    height: 5px;
    background: ${TOAST_COLOR[variant]};
    animation: ${delay === null ? 'none' : `progress ${delay}ms`};
  }
  & > span.paused {
    animation-play-state: paused;
  }
`;

export default Toast;
