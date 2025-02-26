import React, { useState, useEffect, useRef } from 'react';

function FocusedTextInput() {
  const inputRef = useRef(null);

  const onClick = () => {
    inputRef.current.focus();
  }

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={onClick}>Fókus!</button>
    </div>
  );
}

function TitleChanger() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState('');
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      console.log('Fyrsta render! Mun aldrei keyra aftur');
      firstRender.current = false;
    }
  });

  // Getum haft fleiri en eitt useEffect per component
  useEffect(() => {
    console.log('Effect keyrði');
    document.title = `You clicked ${count} times`;
    return () => { /* cleanup, ef þyrfti */ };
  });
  // Ef við bætum við [count] að ofan svo línan yrði
  // }, [count]);
  // Mun effect aðeins keyra ef count breytist, ekki hin state breyta
  // Ef við setjum sem [] mun effect aðeins keyra í byrjun
  // eslint reglan react-hooks/exhaustive-deps mun þá skila warning

  console.log('Annað state:', otherState);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={() => { setOtherState(otherState + 'a') }}>Setjum eitthvað annað state...</button>
    </div>
  );
}

function Video() {
  const videoRef = useRef(null);

  const onMouseOver = () => {
    videoRef.current.play();
  }

  const onMouseOut = () => {
    videoRef.current.pause();
  }

  return (
    <video
      src="/bunny.mp4"
      paused="true"
      ref={videoRef}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    />
  );
}

export default function App() {
  console.log('render App')
  return (
    <div>
      <TitleChanger />
      <hr />
      <FocusedTextInput />
      <hr />
      <Video />
    </div>
  );
}
