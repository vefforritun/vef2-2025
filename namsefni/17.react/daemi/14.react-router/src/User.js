import React from 'react';
import { useParams } from 'react-router-dom';

export function User() {
  let { user } = useParams();

  return (
    <div>
      <h1>Notendasíða fyrir {user}</h1>
    </div>
  );
}
