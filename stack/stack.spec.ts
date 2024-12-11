// stack/stack.spec.ts
import { Stack } from './stack';

describe('Stack', () => {
  let stack: Stack;

  beforeEach(() => {
    stack = new Stack();
  });

  describe('push', () => {
    test('should add an item to an empty stack', () => {
      stack.push(1);
      expect(stack.peek()).toBe(1);
      expect(stack.size()).toBe(1);
    });

    test('should add multiple items in correct order', () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      expect(stack.peek()).toBe(3);
      expect(stack.size()).toBe(3);
    });
  });

  describe('pop', () => {
    test('should return and remove the last item', () => {
      stack.push(1);
      stack.push(2);
      expect(stack.pop()).toBe(2);
      expect(stack.size()).toBe(1);
    });

    test('should return undefined when popping empty stack', () => {
      expect(stack.pop()).toBeUndefined();
    });

    test('should maintain LIFO order when popping multiple items', () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);

      expect(stack.pop()).toBe(3);
      expect(stack.pop()).toBe(2);
      expect(stack.pop()).toBe(1);
      expect(stack.pop()).toBeUndefined();
    });
  });

  describe('peek', () => {
    test('should return last item without removing it', () => {
      stack.push(1);
      stack.push(2);
      expect(stack.peek()).toBe(2);
      expect(stack.size()).toBe(2);
    });

    test('should return undefined when peeking empty stack', () => {
      expect(stack.peek()).toBeUndefined();
    });
  });

  describe('isEmpty', () => {
    test('should return true for new stack', () => {
      expect(stack.isEmpty()).toBe(true);
    });

    test('should return false after pushing item', () => {
      stack.push(1);
      expect(stack.isEmpty()).toBe(false);
    });

    test('should return true after pushing and popping all items', () => {
      stack.push(1);
      stack.push(2);
      stack.pop();
      stack.pop();
      expect(stack.isEmpty()).toBe(true);
    });
  });

  describe('size', () => {
    test('should return 0 for new stack', () => {
      expect(stack.size()).toBe(0);
    });

    test('should return correct size after pushing items', () => {
      stack.push(1);
      stack.push(2);
      expect(stack.size()).toBe(2);
    });

    test('should return correct size after pushing and popping', () => {
      stack.push(1);
      stack.push(2);
      stack.pop();
      expect(stack.size()).toBe(1);
    });
  });
});
