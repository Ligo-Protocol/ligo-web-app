import React, { useState } from 'react';

function TestArea({ onMessage }) {
  const [state, setState] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    onMessage(state);
    setState('');
  }

  function onChange(event) {
    const value = event.target.value;

    setState(value);
  }

  return (
    <div className="demo-test-area--wrapper">
      <form className="demo-test-area" onSubmit={handleSubmit}>
        <div className="demo-test-area--preamble">Test the chat window by sending a message:</div>
        <textarea
          className="demo-test-area--text"
          placeholder="Write a test message...."
          value={state}
          onChange={onChange}
        />
        <button className="demo-test-area--button"> Send Message! </button>
      </form>
    </div>
  );
}

export default TestArea;