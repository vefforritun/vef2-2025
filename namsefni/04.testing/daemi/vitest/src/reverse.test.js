import { describe, expect, test } from 'vitest';

import { reverse } from './reverse.js';

describe('main.js', () => {
  test('should reverse a string', () => {
    const input = 'bar';

    const result = reverse(input);

    expect(result).toBe('rab');
  });

  /*
  test('should have a failing test', () => {
    expect(1).toBe(2);
  });
  */
});
