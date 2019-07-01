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
