import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MouseEventHandler, useRef, useState } from 'react';
import { css } from '@emotion/react';
import ToastContainer from './components/ToastContainer';
import { showToastMessage } from './utils/showToastMessage';

export default {
  title: 'Toast',
  component: ToastContainer,
  parameters: {
    componentSubtitle:
      'Toast message example with <ToastContainer /> and showToastMessage()',
  },
} as ComponentMeta<typeof ToastContainer>;

export const Example: ComponentStory<typeof ToastContainer> = () => {
  const [position, setPosition] = useState<PositionVariant>('top-right');
  const delayInputRef = useRef<HTMLInputElement>(null);

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    const delayInputValue = delayInputRef.current?.value;
    switch (delayInputValue) {
      case undefined:
      case '':
        showToastMessage('This toast lasts for 3s');
        return;
      case 'null':
        showToastMessage('This toast does not close automatically', null);
        return;
      default:
        const delay = +delayInputValue;

        if (isNaN(delay)) {
          showToastMessage(
            "This toast lasts for 3s\nDelay input should be number or 'null'"
          );
          return;
        }
        showToastMessage(`This toast lasts for ${delay}ms`, delay);
    }
  };

  return (
    <>
      <form css={formStyle}>
        <fieldset css={fieldsetStyle}>
          <legend>Options</legend>
          <div>
            <p>Position</p>
            {TOAST_POSITIONS.map((pos) => (
              <p key={pos}>
                <input
                  type='radio'
                  name='position'
                  value={pos}
                  defaultChecked={pos === 'top-right'}
                  onChange={() => setPosition(pos)}
                />
                {pos}
              </p>
            ))}
          </div>
          <div>
            <p>Delay(ms)</p>
            <input id='delay' name='delay' ref={delayInputRef} />
          </div>
        </fieldset>
        <button onClick={onClick}>Show Toast</button>
      </form>
      <ToastContainer position={position} />
    </>
  );
};

const TOAST_POSITIONS: PositionVariant[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

const formStyle = css`
  ${flexColumn}
  gap: 1rem;
  width: 500px;

  button {
    height: 48px;
  }
`;

const fieldsetStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 32px;
  padding-top: 16px;

  #delay {
    width: 180px;
  }
`;
