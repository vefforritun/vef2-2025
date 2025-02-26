import React, { useState } from 'react';

export function Toggle() {
  const [toggled, setToggled] = useState(false);

  const handleClick = () => {
    setToggled(!toggled);
  }

  return (
    <button onClick={handleClick}>
      {toggled ? 'ON' : 'OFF'}
    </button>
  );
}
