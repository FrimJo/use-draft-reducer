# useDraftReducer

`useDraftReducer` is a React hook that wraps the regular `React.useReducer` and takes an optional second reducer, a draft reducer. This to enable people to make changes to how your components updates state internally.

This `useReducer` gets called with a draft of the internal state for people to override, using their draft reducer.

It is based off the blog post [The State Reducer Pattern with React Hooks](https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks) written by [Kent C. Dodds](https://kentcdodds.com/about/).

## Install

### With Yarn

```
yarn add use-draft-reducer
```

### With NPM

```
npm install use-draft-reducer --save
```

## Example

> Working example can be foud under `/example`, To run it, just run `yarn install` or `npm install` then `yarn start` or `npm start`.

Your custom hook returns a state and some actions for people using this hook to take advantage of.

```ts
// useCustomHook.ts
import React from 'react';
import useDraftReducer, { DraftReducer } from '../src';

type State = Readonly<{ value: number }>;

type Action = Readonly<
  { type: 'INCREMENT' } | { type: 'DECREMENT' } | { type: 'SET'; value: number }
>;

const reducer: React.Reducer<State, Action> = (prevState, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return { ...prevState, value: prevState.value + 1 };
    }
    case 'DECREMENT': {
      return { ...prevState, value: prevState.value - 1 };
    }
    case 'SET': {
      return { ...prevState, value: action.value };
    }
  }
};

const useCustomHook = (draftReducer: DraftReducer<State, Action>) => {
  const [state, dispatch] = useDraftReducer(
    reducer,
    { value: 834 },
    draftReducer
  );

  const increment = () => dispatch({ type: 'INCREMENT' });
  const decrement = () => dispatch({ type: 'DECREMENT' });
  const setValue = (value: number) => dispatch({ type: 'SET', value });

  return { value: state.value, increment, decrement, setValue };
};

export default useCustomHook;
```

Someone else using your hook can now pass one of their own reducer, and make som changes to the draft if they wish, or just return action.draft if no changes needs to be done.

```ts
// index.tsx
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import useCustomHook from './useCustomHook';

const ExampleComponent: React.FunctionComponent = props => {
  const { value, increment, decrement, setValue } = useCustomHook(
    (prevState, action) => {
      if (action.type === 'INCREMENT') {
        // We want to increment by two instead by one
        return { ...prevState, value: prevState.value + 2 };
      }
      return action.draft;
    }
  );

  return (
    <div>
      <p>value: {value}</p>
      <button type="button" onClick={increment}>
        increment
      </button>
      <button type="button" onClick={decrement}>
        decrement
      </button>
      <input
        type="number"
        value={value}
        onChange={event => setValue(+event.target.value)}
      ></input>
    </div>
  );
};

const App = () => (
  <StrictMode>
    <ExampleComponent />
  </StrictMode>
);

ReactDOM.render(<App />, document.getElementById('root'));
```
