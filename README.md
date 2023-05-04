# @se030/toast

## Usage

```tsx
const App = () => (
  <>
    // ...
    <ToastContainer />
  </>
);
```

```tsx
declare const toast: (
  message: string,
  delay?: number | null,
  variant?: 'default' | 'success' | 'warning' | 'error'
) => void;

// anywhere in your app
<button onClick={() => toast('I am a toast message')}>Show Toast</button>;
```
