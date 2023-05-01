import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MouseEventHandler, useRef, useState } from 'react';
import { css } from '@emotion/react';
import ToastContainer from './components/ToastContainer';
import { toast } from './utils/toast';
import { clearToast } from './utils/clearToast';

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
  const formRef = useRef<HTMLFormElement>(null);

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const variantInput = formData.get('variant');
    const delayInput = formData.get('delay')!;
    const messageInput = formData.get('message') as string;

    let message, delay;

    switch (delayInput) {
      case undefined:
      case '':
        message = 'This toast lasts for 3s';
        break;
      case 'null':
        message = 'This toast does not close automatically';
        delay = null;
        break;
      default:
        delay = +delayInput;
        message = isNaN(delay)
          ? "This toast lasts for 3s\nDelay input should be number or 'null'"
          : `This toast lasts for ${delay}ms`;
    }

    toast(
      messageInput.length ? messageInput : message,
      delay,
      variantInput as ToastVariant
    );
  };

  return (
    <>
      <form ref={formRef} css={formStyle}>
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
            <p>Variant</p>
            {TOAST_VARIANTS.map((variant) => (
              <p key={variant}>
                <input
                  type='radio'
                  name='variant'
                  value={variant}
                  defaultChecked={variant === 'default'}
                />
                {variant}
              </p>
            ))}
          </div>
          <div>
            <p>Delay(ms)</p>
            <input type='text' name='delay' />
            <p>Message (Optional)</p>
            <input type='text' name='message' />
          </div>
        </fieldset>
        <button onClick={onClick}>Show Toast</button>
        <button type='button' onClick={() => clearToast()}>
          Clear All
        </button>
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

const TOAST_VARIANTS: ToastVariant[] = ['default', 'success', 'warning', 'error'];

const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

const formStyle = css`
  ${flexColumn}
  gap: 1rem;
  width: 700px;

  button {
    height: 48px;
  }
`;

const fieldsetStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 32px;
  padding-top: 16px;

  input[type='text'] {
    width: 180px;
  }
`;
