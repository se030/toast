import { StoryFn, Meta } from '@storybook/react';

import ToastContainer from './components/ToastContainer';
import { toast } from './utils/toast';
import { clearToast } from './utils/clearToast';

import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { css } from '@emotion/react';
import { ChangeEvent, useState } from 'react';

export default {
  title: 'Toast',
  component: ToastContainer,
  parameters: {
    componentSubtitle: 'Toast message example with <ToastContainer /> and toast()',
  },
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
    },
  },
  args: {
    position: 'top-right',
  },
} as Meta<typeof ToastContainer>;

export const Default: StoryFn<typeof ToastContainer> = (args) => {
  return (
    <>
      <h4>🧑🏻‍🍳 기본 Toast 컴포넌트입니다.</h4>
      <p>
        Toast 컴포넌트와 독립적인 인터페이스 toast()와 clearToast() 메서드로
        ToastContainer 내부 토스트를 관리합니다.
      </p>
      <p>아래쪽의 Controls 탭에서 ToastContainer position props를 조정할 수 있습니다. </p>

      <div css={buttonContainerStyle}>
        <button onClick={() => toast('This is a default toast')}>
          🥪 toast('This is a default toast')
        </button>
        <button onClick={() => clearToast()}>❌ clearToast()</button>
      </div>
      <ToastContainer {...args} />
    </>
  );
};

export const Custom: StoryFn<typeof ToastContainer> = (args) => {
  const [message, setMessage] = useState('This is a custom toast');
  const [duration, setDuration] = useState<number | null>(3000);
  const [variant, setVariant] = useState<ToastVariant>('default');

  const TOAST_VARIANTS: ToastVariant[] = ['default', 'success', 'warning', 'error'];

  const onDurationChange = (e: ChangeEvent) => {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;

    const value = Number(target.value);
    setDuration(isNaN(value) ? null : value);
  };

  return (
    <>
      <h4>
        🧑🏻‍🍳 toast() 사용처에서는 메세지, 지속 시간, 메세지의 종류를 선택할 수 있습니다.
      </h4>
      <p> 아래 입력을 통해 커스텀 토스트의 동작을 확인할 수 있습니다.</p>

      <fieldset css={fieldsetStyle}>
        <label>
          <p>message</p>
          <input
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <label>
          <p>
            duration (ms)
            <br />
            <span>
              숫자가 아닌 경우 toast delay 값은 'null'이 되며 자동으로 닫히지 않습니다.
            </span>
          </p>
          <input type='text' defaultValue={duration ?? ''} onChange={onDurationChange} />
        </label>
        <div className='radio-group'>
          <p>variant</p>
          {TOAST_VARIANTS.map((v) => (
            <label key={v}>
              <input
                type='radio'
                name='variant'
                value={v}
                defaultChecked={v === 'default'}
                onChange={() => setVariant(v)}
              />
              {v}
            </label>
          ))}
        </div>
      </fieldset>

      <div css={buttonContainerStyle}>
        <button onClick={() => toast(message, duration, variant)}>🥪 Toast</button>
        <button onClick={() => clearToast()}>❌ Clear</button>
      </div>
      <ToastContainer {...args} />
    </>
  );
};

export const InteractionTest: StoryFn<typeof ToastContainer> = (args) => {
  const visuallyHiddenStyle = css`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: '1px';
    overflow: 'hidden';
    position: 'absolute';
    white-space: 'nowrap';
    width: '1px';
  `;

  return (
    <>
      <h4>
        🧪 toast()와 clearToast() 실행 핸들러가 등록된 요소와의 상호작용 테스트를 위한
        스토리입니다.
      </h4>
      <p>
        toast() 실행 버튼은 안정적인 테스트를 위해 UI를 통한 접근이 불가능하도록
        되어있습니다.
      </p>
      <p>테스트는 아래쪽의 Interactions 탭에서 실행하고 결과를 확인할 수 있습니다.</p>
      <button
        tabIndex={-1}
        css={visuallyHiddenStyle}
        onClick={() => toast('This is a toast')}
      ></button>
      <ToastContainer {...args} />
    </>
  );
};
InteractionTest.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const showToastButton = await canvas.findByRole('button');

  // toast method
  await userEvent.click(showToastButton);

  const toastElement = canvas.getByRole('status');
  await expect(toastElement).toBeInTheDocument();

  // close button
  const closeToastButton = await within(toastElement).findByRole('button');
  await userEvent.click(closeToastButton);

  // wait for fade-out animation
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 600));

  await expect(toastElement).not.toBeInTheDocument();
};

const buttonContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;

  button {
    width: 500px;
    padding: 1rem;
    border: 1px solid black;
    border-radius: 0.5rem;
    background: white;
    cursor: pointer;

    &:hover {
      transform: scale(1.01);
      font-weight: bold;
    }
  }
`;

const fieldsetStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 500px;
  padding: 1rem 0;
  margin-bottom: 1rem;
  box-sizing: border-box;
  border: none;

  p {
    color: gray;
    line-height: 1rem;
    margin: 0.2rem;

    span {
      font-size: 0.8rem;
    }
  }

  input[type='text'] {
    width: 100%;
    font-size: 1rem;
    padding: 0.5rem;
    box-sizing: border-box;
  }

  .radio-group > label {
    margin-right: 1rem;
  }
`;
