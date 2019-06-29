import { act, renderHook } from '@testing-library/react-hooks';
import useDraftReducer, { DraftReducer } from '../src';

type State = Readonly<{
  name: string;
  age: number;
}>;

type Action = Readonly<
  | {
      type: 'SET_AGE';
      age: number;
    }
  | {
      type: 'SET_NAME';
      name: string;
    }
>;

const exampleReducer: React.Reducer<State, Action> = (prevState, action) => {
  switch (action.type) {
    case 'SET_AGE': {
      return { ...prevState, age: action.age };
    }
    case 'SET_NAME': {
      return { ...prevState, name: action.name };
    }
  }
  return { ...prevState };
};

describe('useDraftReducer()', () => {
  test('runs without draft reducer', () => {
    const initialState: State = { name: '', age: 0 };
    renderHook(() => useDraftReducer(exampleReducer, initialState));
  });

  test('reducer state is initial state after initialization', () => {
    const initialState: State = { name: '', age: 0 };
    const { result } = renderHook(() =>
      useDraftReducer(exampleReducer, initialState)
    );

    const [value] = result.current;
    expect(value.name).toBe('');
    expect(value.age).toBe(0);
  });

  test('sets name to Lisa on SET_NAME dispatch', () => {
    const initialState: State = { name: '', age: 0 };
    const { result } = renderHook(() =>
      useDraftReducer(exampleReducer, initialState)
    );

    const [, dispatch] = result.current;

    const name = 'Lisa';
    act(() => dispatch({ type: 'SET_NAME', name }));
    const [value] = result.current;
    expect(value.name).toBe(name);
  });

  test('sets age to 7 on SET_AGE dispatch', () => {
    const initialState: State = { name: '', age: 0 };
    const { result } = renderHook(() =>
      useDraftReducer(exampleReducer, initialState)
    );
    const [, dispatch] = result.current;

    const age = 7;
    act(() => dispatch({ type: 'SET_AGE', age }));
    const [value] = result.current;
    expect(value.age).toBe(age);
  });

  test('uses draft reducer, override SET_AGE dispatch to set age to 10', () => {
    const age = 10;
    const draftReducer: DraftReducer<State, Action> = (prevState, action) => {
      if (action.type === 'SET_AGE') {
        return { ...prevState, age };
      }
      return action.draft;
    };

    const initialState: State = { name: '', age: 0 };
    const { result } = renderHook(() =>
      useDraftReducer(exampleReducer, initialState, draftReducer)
    );
    const [, dispatch] = result.current;

    const wrongAge = 43;
    act(() => dispatch({ type: 'SET_AGE', age: wrongAge }));
    const [value] = result.current;
    expect(value.age).not.toBe(wrongAge);
    expect(value.age).toBe(age);
  });

  test('uses draft reducer, override SET_NAME dispatch to set name to Steven', () => {
    const name = 'Steven';
    const draftReducer: DraftReducer<State, Action> = (prevState, action) => {
      if (action.type === 'SET_NAME') {
        return { ...prevState, name };
      }
      return action.draft;
    };

    const initialState: State = { name: '', age: 0 };
    const { result } = renderHook(() =>
      useDraftReducer(exampleReducer, initialState, draftReducer)
    );
    const [, dispatch] = result.current;

    const wrongName = 'Lisa';
    act(() => dispatch({ type: 'SET_NAME', name: wrongName }));
    const [value] = result.current;
    expect(value.name).not.toBe(wrongName);
    expect(value.name).toBe(name);
  });
});
