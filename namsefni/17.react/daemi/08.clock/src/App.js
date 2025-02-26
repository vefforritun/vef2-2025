import React from 'react';

import { Clock as ClassClock } from './Clock.class';
import { Clock } from './Clock';

export default function App() {
  return (
    <div>
      <ClassClock />
      <ClassClock timeZone="America/New_York" />
      <ClassClock timeZone="America/Los_Angeles" />
      <Clock />
      <Clock timeZone="America/New_York" />
      <Clock timeZone="America/Los_Angeles" />
    </div>
  );
}
