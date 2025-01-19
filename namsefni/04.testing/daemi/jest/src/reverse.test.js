import { describe, expect, it } from '@jest/globals';
import { reverse } from './reverse.js';

describe('main.js', () => {
  it('should reverse a string', () => {
    const input = 'bar';

    const result = reverse(input);

    expect(result).toBe('rab');
  });

  it('should have a failing test', () => {
    expect(1).toBe(2);
  });
});
