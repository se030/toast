import { css } from '@emotion/react';
import { CSSProperties } from '@emotion/serialize';
import useToastContainer from './useToastContainer';
import Toast, { TOAST_SIZE } from '@/components/Toast';

export interface ToastContainerProps {
  position?: PositionVariant;
}

const ToastContainer = ({ position = 'top-right' }: ToastContainerProps) => {
  const { toastList } = useToastContainer();
  const { positionX, positionY } = parsePosition(position);

  return (
    <div css={containerStyle(positionX, positionY)}>
      <div css={toastContainerStyle(toastList.length)}>
        {toastList.map(({ id, ...props }) => (
          <Toast key={id} {...{ id, ...props }} />
        ))}
      </div>
    </div>
  );
};

const parsePosition = (position: PositionVariant) => {
  const [positionY, positionX] = position.split('-');
  return { positionX: positionX as PositionX, positionY: positionY as PositionY };
};

const ALIGN_TOASTS: Record<PositionX, CSSProperties['alignItems']> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const JUSTIFY_TOASTS: Record<PositionY, CSSProperties['justifyContent']> = {
  top: 'flex-start',
  bottom: 'flex-end',
};

const containerStyle = (positionX: PositionX, positionY: PositionY) => css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  display: flex;
  flex-direction: column;
  align-items: ${ALIGN_TOASTS[positionX]};
  justify-content: ${JUSTIFY_TOASTS[positionY]};
`;

const toastContainerStyle = (length: number) => css`
  width: ${TOAST_SIZE.WIDTH};
  height: ${TOAST_SIZE.HEIGHT * length}px;
`;

export default ToastContainer;
