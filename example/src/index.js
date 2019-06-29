import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import useCustomHook from './useCustomHook';

const ExampleComponent = props => {
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
        onChange={event => setValue(event.target.value)}
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
