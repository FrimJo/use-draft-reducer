import useDraftReducer from 'use-draft-reducer';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return { ...prevState, value: prevState.value + 1 };
    }
    case 'DECREMENT': {
      return { ...prevState, value: prevState.value - 1 };
    }
    case 'SET': {
      return { ...prevState, value: action.payload };
    }
    default:
      throw Error(`No action with typ ${action.type} was found.`);
  }
};

const useCustomHook = ({ draftReducer }) => {
  const [state, dispatch] = useDraftReducer(
    reducer,
    { value: 834 },
    draftReducer
  );

  const increment = () => dispatch({ type: 'INCREMENT' });
  const decrement = () => dispatch({ type: 'DECREMENT' });
  const setValue = value => dispatch({ type: 'SET', payload: value });

  return { value: state.value, increment, decrement, setValue };
};

export default useCustomHook;
