import React from 'react';
import { useInterval } from './useInterval';

export function Clock({ timeZone = 'Atlantic/Reykjavik' }) {
  const [date, setDate] = React.useState(new Date());

  // Smá svindl að nota `useInterval` hook, en...
  // Leyfir okkur að búa til declerative API ofan á setInterval
  useInterval(() => {
    setDate(new Date());
  }, 1000);

  return (
    <p>{date.toLocaleString('is-IS', { timeZone })}</p>
  );
}
