import { css } from '@emotion/react';
import useToastContainer from './useToastContainer';
import Toast, { TOAST_SIZE } from '@/components/Toast';

export interface ToastContainerProps {
  position?: PositionVariant;
}

const ToastContainer = ({ position = 'top-right' }: ToastContainerProps) => {
  const { toastList } = useToastContainer();
  const { positionX, positionY } = parsePosition(position);

  return (
    <div css={containerStyle(positionX, positionY, toastList.length)}>
      {toastList.map(({ id, ...props }) => (
        <Toast key={id} {...{ id, ...props }} />
      ))}
    </div>
  );
};

const parsePosition = (position: PositionVariant) => {
  const [positionY, positionX] = position.split('-');
  return { positionX: positionX as PositionX, positionY: positionY as PositionY };
};

const getHorizontalPosition = (x: PositionX) => {
  switch (x) {
    case 'center':
      return `left: calc((100vw - ${TOAST_SIZE.WIDTH}px) / 2)`;
    default:
      return `${x}: 0;`;
  }
};

const containerStyle = (
  positionX: PositionX,
  positionY: PositionY,
  length: number
) => css`
  position: fixed;
  ${positionY}: 0;
  ${getHorizontalPosition(positionX)};
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: ${TOAST_SIZE.WIDTH}px;
  height: ${TOAST_SIZE.HEIGHT * length}px;
`;

export default ToastContainer;
