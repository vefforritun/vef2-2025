import assert from 'node:assert';
import { describe, it } from 'node:test';

import { reverse } from './reverse.js';

describe('main.js', () => {
  it('should reverse a string', () => {
    const input = 'bar';

    const result = reverse(input);

    assert.strictEqual(result, 'rab');
  });

  it('should have a failing test', () => {
    assert.strictEqual(1, 2);
  });
});
