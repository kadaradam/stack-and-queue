import { Queue } from './queue';

describe('Queue', () => {
 let queue: Queue;

 beforeEach(() => {
   queue = new Queue();
 });

 describe('enqueue', () => {
   test('should add an item to an empty queue', () => {
     queue.enqueue(1);
     expect(queue.peek()).toBe(1);
     expect(queue.size()).toBe(1);
   });

   test('should add multiple items in correct order', () => {
     queue.enqueue(1);
     queue.enqueue(2);
     queue.enqueue(3);
     expect(queue.peek()).toBe(1);  // First item should still be 1 (FIFO)
     expect(queue.size()).toBe(3);
   });
 });

 describe('dequeue', () => {
   test('should return and remove the first item', () => {
     queue.enqueue(1);
     queue.enqueue(2);
     expect(queue.dequeue()).toBe(1);
     expect(queue.size()).toBe(1);
   });

   test('should return undefined when dequeuing empty queue', () => {
     expect(queue.dequeue()).toBeUndefined();
   });

   test('should maintain FIFO order when dequeuing multiple items', () => {
     queue.enqueue(1);
     queue.enqueue(2);
     queue.enqueue(3);

     expect(queue.dequeue()).toBe(1);
     expect(queue.dequeue()).toBe(2);
     expect(queue.dequeue()).toBe(3);
     expect(queue.dequeue()).toBeUndefined();
   });
 });

 describe('peek', () => {
   test('should return first item without removing it', () => {
     queue.enqueue(1);
     queue.enqueue(2);
     expect(queue.peek()).toBe(1);  // Should see first item (FIFO)
     expect(queue.size()).toBe(2);
   });

   test('should return undefined when peeking empty queue', () => {
     expect(queue.peek()).toBeUndefined();
   });
 });

 describe('isEmpty', () => {
   test('should return true for new queue', () => {
     expect(queue.isEmpty()).toBe(true);
   });

   test('should return false after enqueueing item', () => {
     queue.enqueue(1);
     expect(queue.isEmpty()).toBe(false);
   });

   test('should return true after enqueueing and dequeuing all items', () => {
     queue.enqueue(1);
     queue.enqueue(2);
     queue.dequeue();
     queue.dequeue();
     expect(queue.isEmpty()).toBe(true);
   });
 });

 describe('size', () => {
   test('should return 0 for new queue', () => {
     expect(queue.size()).toBe(0);
   });

   test('should return correct size after enqueueing items', () => {
     queue.enqueue(1);
     queue.enqueue(2);
     expect(queue.size()).toBe(2);
   });

   test('should return correct size after enqueueing and dequeuing', () => {
     queue.enqueue(1);
     queue.enqueue(2);
     queue.dequeue();
     expect(queue.size()).toBe(1);
   });

   test('should return 0 after enqueueing and dequeuing all items', () => {
     queue.enqueue(1);
     queue.enqueue(2);
     queue.dequeue();
     queue.dequeue();
     expect(queue.size()).toBe(0);
   });
 });
});
