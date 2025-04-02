import { test, expect, vi, type Mock } from 'vitest';
import { add } from '@ui/package-a';
import { multiply } from '../src/index';

// Package-b is unable to mock packages within workspaces if the root is not set to the project directory
vi.mock('@ui/package-a', () => ({
  add: vi.fn(),
}));

test('multiplies two numbers correctly using mocked add', () => {
  console.log('??add', add);
  (add as Mock).mockImplementation((...args: number[]) => args.reduce((sum, num) => sum + num, 0));

  expect(multiply(2, 3)).toBe(6); // 2 + 2 + 2 = 6
  expect(multiply(-2, 3)).toBe(-6); // -2 + -2 + -2 = -6
  expect(multiply(0, 5)).toBe(0); // 0 + 0 + 0 + 0 + 0 = 0

  expect(add).toHaveBeenCalledWith(2, 2, 2);
  expect(add).toHaveBeenCalledWith(-2, -2, -2);
  expect(add).toHaveBeenCalledWith(0, 0, 0, 0, 0);
});
